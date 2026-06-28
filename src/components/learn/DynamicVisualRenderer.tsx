'use client'

/**
 * Renders LLM-generated visualization code (src/lib/teaching/visuals/
 * generateVisualizationCode.ts) inside a sandboxed, opaque-origin iframe —
 * sandbox="allow-scripts" with NO allow-same-origin, so the generated code
 * can never read this document, the user's cookies/localStorage/session,
 * or call fetch()/XHR against this origin (an opaque-origin iframe has no
 * origin to attach credentials to). Communication back to this component
 * is postMessage-only, validated by event.source.
 *
 * React/ReactDOM/react-is/Recharts/d3/mathjs are loaded inside the iframe
 * from same-origin static files (public/vendor/dynamic-visuals/, copied
 * from node_modules at install time by scripts/copy-dynamic-visual-vendor.mjs)
 * rather than a third-party CDN, since the iframe is a separate browsing
 * context with no access to the parent's JS heap.
 *
 * Silent fallback on ANY error or timeout: renders nothing rather than a
 * broken iframe or an error message, per the dynamic-engine build spec.
 */

import { useEffect, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Card, Pill } from '@/components/ui/candy'

const RENDER_TIMEOUT_MS = 8000

const VENDOR_SCRIPTS = [
  '/vendor/dynamic-visuals/react.production.min.js',
  '/vendor/dynamic-visuals/react-dom.production.min.js',
  '/vendor/dynamic-visuals/react-is.production.min.js',
  '/vendor/dynamic-visuals/recharts.production.js',
  '/vendor/dynamic-visuals/d3.min.js',
  '/vendor/dynamic-visuals/mathjs.js',
]

function buildSandboxDocument(code: string): string {
  const transformed = code.replace(/export\s+default/, 'return')
  const scriptTags = VENDOR_SCRIPTS.map((src) => `<script src="${src}"></script>`).join('\n')

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body>
<div id="root"></div>
${scriptTags}
<script>
(function () {
  function fail(message) {
    parent.postMessage({ type: 'dynamic-visual-error', message: String(message) }, '*')
  }
  try {
    var factory = new Function('React', 'recharts', 'd3', 'mathjs', ${JSON.stringify(transformed)})
    var Component = factory(window.React, window.Recharts, window.d3, window.math)
    if (typeof Component !== 'function') { fail('generated code did not return a component'); return }
    var root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(React.createElement(Component))
    parent.postMessage({ type: 'dynamic-visual-rendered' }, '*')
  } catch (err) {
    fail(err && err.message ? err.message : 'render failed')
  }
})()
</script>
</body>
</html>`
}

export interface DynamicVisualRendererProps {
  code: string
}

type Status = 'loading' | 'ready' | 'error'

export function DynamicVisualRenderer({ code }: DynamicVisualRendererProps) {
  const [status, setStatus] = useState<Status>('loading')
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    setStatus('loading')

    const timeout = window.setTimeout(() => setStatus('error'), RENDER_TIMEOUT_MS)

    function onMessage(event: MessageEvent) {
      if (event.source !== iframeRef.current?.contentWindow) return
      const data = event.data as { type?: string } | undefined
      if (data?.type === 'dynamic-visual-rendered') {
        window.clearTimeout(timeout)
        setStatus('ready')
      } else if (data?.type === 'dynamic-visual-error') {
        window.clearTimeout(timeout)
        setStatus('error')
      }
    }

    window.addEventListener('message', onMessage)
    return () => {
      window.clearTimeout(timeout)
      window.removeEventListener('message', onMessage)
    }
  }, [code])

  if (status === 'error') return null

  return (
    <Card style={{ padding: 16, position: 'relative' }}>
      <Pill style={{ position: 'absolute', top: 12, right: 12, fontSize: 11 }}>AI Generated Visual</Pill>
      {status === 'loading' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '24px 0', color: 'var(--candy-text-muted, #888)' }}>
          <Loader2 size={18} className="animate-spin" />
          <span>Generating visualization…</span>
        </div>
      )}
      <iframe
        ref={iframeRef}
        title="AI generated visualization"
        sandbox="allow-scripts"
        srcDoc={buildSandboxDocument(code)}
        style={{
          width: '100%',
          height: status === 'ready' ? 320 : 0,
          border: 'none',
          display: 'block',
          opacity: status === 'ready' ? 1 : 0,
        }}
      />
    </Card>
  )
}
