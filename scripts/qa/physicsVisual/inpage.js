/**
 * In-page measurement for the Physics visual audit. Plain JS on purpose: it is
 * injected into Chromium with `addInitScript`, and tsx/esbuild helper wrappers
 * (`__name`) do not survive serialization into a page.
 *
 * Everything here MEASURES what the browser actually laid out and painted — it
 * never reads the SceneSpec. Verdicts are decided in node (validate.ts), so the
 * same measurement can be re-judged against a changed threshold without
 * re-rendering.
 *
 *   window.__audit.measure()          DOM geometry + computed style of every
 *                                     visible text node, controls, scene box
 *   window.__audit.hideText(true)     make text transparent (labels' halo too)
 *                                     so the NEXT screenshot is the background
 *   window.__audit.pixels(pngB64, spec)  decode a screenshot and sample the
 *                                     pixels behind each text rect
 */
(function () {
  var FRAME = '[data-audit-frame]'

  function parseColor(str) {
    // Normalises ANY CSS colour (rgb, rgba, color(srgb…), named) to [r,g,b,a].
    var c = document.createElement('canvas')
    c.width = c.height = 1
    var ctx = c.getContext('2d', { willReadFrequently: true })
    ctx.clearRect(0, 0, 1, 1)
    ctx.fillStyle = '#000'
    ctx.fillStyle = str
    ctx.fillRect(0, 0, 1, 1)
    var d = ctx.getImageData(0, 0, 1, 1).data
    // getImageData returns premultiplied-then-unpremultiplied bytes; alpha is exact.
    return [d[0], d[1], d[2], d[3] / 255]
  }

  function rectOf(r) {
    return { x: r.left, y: r.top, w: r.width, h: r.height }
  }

  function isVisible(el, frame) {
    if (el.checkVisibility && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true, contentVisibilityAuto: true })) return false
    var opacity = 1
    for (var a = el; a && a !== frame.parentElement; a = a.parentElement) {
      var cs = getComputedStyle(a)
      if (cs.display === 'none' || cs.visibility === 'hidden') return false
      opacity *= parseFloat(cs.opacity || '1')
      // The visually-hidden idiom used for screen-reader-only text.
      var r = a.getBoundingClientRect()
      if (cs.overflow === 'hidden' && r.width <= 1.5 && r.height <= 1.5) return false
      if (cs.clip && cs.clip !== 'auto' && /rect\(0(px)?,? 0(px)?,? 0(px)?,? 0(px)?\)/.test(cs.clip)) return false
    }
    return opacity > 0.05 ? opacity : false
  }

  function transformScale(el) {
    // Product of the scale of every ancestor transform up to the document.
    var s = 1
    for (var a = el; a && a.nodeType === 1; a = a.parentElement) {
      if (a instanceof SVGElement && !(a instanceof SVGSVGElement)) continue
      var t = getComputedStyle(a).transform
      if (t && t !== 'none') {
        var m = new DOMMatrixReadOnly(t)
        s *= Math.sqrt(m.a * m.a + m.b * m.b) || 1
      }
    }
    return s
  }

  function clipRectFor(el, frame) {
    // The visible region an element is allowed to paint in: viewport ∩ every
    // overflow-clipping ancestor.
    // Vertical extent is NOT clipped to the viewport: a figure taller than the
    // fold is scrolled, not cut. Horizontal overflow beyond the viewport is real.
    var x0 = 0, y0 = -Infinity, x1 = window.innerWidth, y1 = Infinity
    for (var a = el.parentElement; a; a = a.parentElement) {
      var cs = getComputedStyle(a)
      var clips = cs.overflowX !== 'visible' || cs.overflowY !== 'visible'
      if (clips && a !== document.documentElement && a !== document.body) {
        var r = a.getBoundingClientRect()
        x0 = Math.max(x0, r.left); y0 = Math.max(y0, r.top)
        x1 = Math.min(x1, r.right); y1 = Math.min(y1, r.bottom)
      }
    }
    return { x0: x0, y0: y0, x1: x1, y1: y1 }
  }

  function intersectArea(a, b) {
    var w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)
    var h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y)
    return w > 0 && h > 0 ? w * h : 0
  }

  function collectText(frame, sceneBox) {
    var out = []
    var walker = document.createTreeWalker(frame, NodeFilter.SHOW_TEXT)
    var n
    while ((n = walker.nextNode())) {
      var text = (n.nodeValue || '').replace(/\s+/g, ' ').trim()
      if (!text) continue
      var el = n.parentElement
      if (!el || el.closest('script,style,noscript,title')) continue
      var vis = isVisible(el, frame)
      var range = document.createRange()
      range.selectNodeContents(n)
      var lines = Array.prototype.slice.call(range.getClientRects()).filter(function (r) { return r.width > 0 && r.height > 0 }).map(rectOf)
      if (!vis || lines.length === 0) {
        // Present in the DOM but not painted: only interesting when it is NOT a
        // deliberately hidden node (sr-only / aria-hidden twins), so it is dropped.
        continue
      }
      var svg = el.closest('svg')
      var cs = getComputedStyle(el)
      var fontPx = parseFloat(cs.fontSize)
      var color = cs.color
      if (svg) {
        var ctm = el.getScreenCTM ? el.getScreenCTM() : null
        var scale = ctm ? Math.sqrt(ctm.a * ctm.a + ctm.b * ctm.b) : 1
        fontPx = fontPx * scale
        color = cs.fill && cs.fill !== 'none' ? cs.fill : cs.color
      } else {
        fontPx = fontPx * transformScale(el)
      }
      var clip0 = clipRectFor(el, frame)
      // The part of each line box that is actually PAINTED (inside every
      // clipping ancestor). Text fully outside its clip is not on screen at all.
      var visibleLines = []
      lines.forEach(function (l) {
        var vx0 = Math.max(l.x, clip0.x0), vy0 = Math.max(l.y, clip0.y0)
        var vx1 = Math.min(l.x + l.w, clip0.x1), vy1 = Math.min(l.y + l.h, clip0.y1)
        if (vx1 > vx0 && vy1 > vy0) visibleLines.push({ x: vx0, y: vy0, w: vx1 - vx0, h: vy1 - vy0 })
      })
      var inCtl = el.closest('button, [role="button"], input, select, textarea, a')
      var inDisabled = !!el.closest('button:disabled, input:disabled, select:disabled, [aria-disabled="true"], fieldset:disabled')
      var x0 = Math.min.apply(null, lines.map(function (l) { return l.x }))
      var y0 = Math.min.apply(null, lines.map(function (l) { return l.y }))
      var x1 = Math.max.apply(null, lines.map(function (l) { return l.x + l.w }))
      var y1 = Math.max.apply(null, lines.map(function (l) { return l.y + l.h }))
      var box = { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }
      var clip = clipRectFor(el, frame)
      var visibleArea = 0, total = 0
      lines.forEach(function (l) {
        total += l.w * l.h
        var w = Math.min(l.x + l.w, clip.x1) - Math.max(l.x, clip.x0)
        var h = Math.min(l.y + l.h, clip.y1) - Math.max(l.y, clip.y0)
        if (w > 0 && h > 0) visibleArea += w * h
      })
      var region = svg ? 'svg-text' : (sceneBox && sceneBox.contains(el) ? 'scene-label' : 'chrome')
      if (sceneBox && sceneBox.contains(el)) region = 'scene-label'
      // Ellipsis / hard truncation by the element itself or its block ancestor.
      var truncated = false
      for (var a = el; a && a !== frame.parentElement; a = a.parentElement) {
        var s2 = getComputedStyle(a)
        if (a.closest('[data-scene-box]')) break  // labels over the canvas are judged by visibleFraction
        if ((s2.overflowX === 'hidden' || s2.textOverflow === 'ellipsis') && a.scrollWidth > a.clientWidth + 1 && !(a instanceof SVGElement) && s2.display !== 'inline') {
          // A scroll container that is meant to scroll is not truncation.
          if (s2.overflowX === 'auto' || s2.overflowX === 'scroll') continue
          // The WebGL host clips by design; its labels are judged by visibleFraction.
          if (a.hasAttribute('data-scene-box')) continue
          truncated = true
          break
        }
      }
      out.push({
        text: text,
        region: region,
        tag: el.tagName.toLowerCase(),
        cls: typeof el.className === 'string' ? el.className.slice(0, 60) : '',
        box: box,
        lines: lines,
        visibleLines: visibleLines,
        inControl: !!inCtl,
        inDisabled: inDisabled,
        fontPx: fontPx,
        weight: cs.fontWeight,
        family: cs.fontFamily.slice(0, 80),
        color: color,
        opacity: vis,
        shadow: cs.textShadow === 'none' ? '' : cs.textShadow.slice(0, 80),
        visibleFraction: total > 0 ? visibleArea / total : 1,
        outsideViewportX: box.x < -0.5 || box.x + box.w > window.innerWidth + 0.5,
        truncated: truncated,
      })
    }
    return out
  }

  function measure() {
    var frame = document.querySelector(FRAME)
    if (!frame) return { error: 'no-frame' }
    var sceneBox = frame.querySelector('[data-scene-box]')
    var canvas = frame.querySelector('canvas')
    var figure = frame.querySelector('figure, [role="figure"]')
    var texts = collectText(frame, sceneBox)

    // Controls
    var controls = Array.prototype.slice.call(frame.querySelectorAll('button, input, select, textarea, [role="slider"], [role="button"]'))
      .map(function (c) {
        var r = c.getBoundingClientRect()
        var cs = getComputedStyle(c)
        if (cs.display === 'none' || cs.visibility === 'hidden' || r.width === 0 || r.height === 0) return null
        var name = c.getAttribute('aria-label') || (c.labels && c.labels[0] && c.labels[0].textContent) || c.textContent || c.getAttribute('title') || ''
        return { tag: c.tagName.toLowerCase(), type: c.getAttribute('type') || '', name: name.trim().slice(0, 60), box: rectOf(r), disabled: !!c.disabled }
      }).filter(Boolean)

    // Empty badges / chips (collapsed pills).
    var emptyBadges = Array.prototype.slice.call(frame.querySelectorAll('[class*="badge"], [class*="chip"], [class*="pill"]'))
      .filter(function (b) {
        var r = b.getBoundingClientRect()
        return r.width > 0 && r.height > 0 && !(b.textContent || '').trim() && !b.querySelector('svg, img')
      }).length

    var frameRect = rectOf(frame.getBoundingClientRect())
    var figRect = figure ? rectOf(figure.getBoundingClientRect()) : frameRect
    var sceneRect = sceneBox ? rectOf(sceneBox.getBoundingClientRect()) : null
    var canvasRect = canvas ? rectOf(canvas.getBoundingClientRect()) : null

    // Children that leave the figure's own box on the right/left (not scroll containers).
    var overflowing = []
    var all = figure ? figure.querySelectorAll('*') : []
    var fr = figure ? figure.getBoundingClientRect() : null
    for (var i = 0; fr && i < all.length; i++) {
      var e = all[i]
      if (e instanceof SVGElement && !(e instanceof SVGSVGElement)) continue
      var r = e.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) continue
      var cs2 = getComputedStyle(e)
      if (cs2.position === 'fixed' || cs2.visibility === 'hidden' || cs2.display === 'none') continue
      if (e.closest('[data-scene-box]')) continue
      if (r.right > fr.right + 1.5 || r.left < fr.left - 1.5) {
        // inside a deliberately scrollable region?
        var scrolls = false
        for (var a = e.parentElement; a && a !== figure; a = a.parentElement) {
          var o = getComputedStyle(a).overflowX
          if (o === 'auto' || o === 'scroll') { scrolls = true; break }
        }
        if (!scrolls) overflowing.push({ tag: e.tagName.toLowerCase(), cls: typeof e.className === 'string' ? e.className.slice(0, 40) : '', box: rectOf(r) })
      }
    }

    var de = document.documentElement
    return {
      viewport: { w: window.innerWidth, h: window.innerHeight, dpr: window.devicePixelRatio },
      theme: de.getAttribute('data-theme'),
      docScrollW: de.scrollWidth,
      docClientW: de.clientWidth,
      horizontalOverflow: de.scrollWidth > de.clientWidth + 1,
      frameRect: frameRect,
      figureRect: figRect,
      sceneRect: sceneRect,
      canvasRect: canvasRect,
      sceneBg: sceneBox ? getComputedStyle(sceneBox).backgroundColor : null,
      renderer: document.querySelector('[data-audit-renderer]') ? document.querySelector('[data-audit-renderer]').getAttribute('data-audit-renderer') : null,
      provenance: document.querySelector('[data-audit-provenance]') ? document.querySelector('[data-audit-provenance]').getAttribute('data-audit-provenance') : null,
      noFigure: !!document.querySelector('[data-audit-nofigure]'),
      svgCount: frame.querySelectorAll('svg').length,
      hasCanvas: !!canvas,
      texts: texts,
      controls: controls,
      emptyBadges: emptyBadges,
      overflowing: overflowing.slice(0, 10),
      sliders: frame.querySelectorAll('input[type="range"]').length,
    }
  }

  // Make every glyph transparent so the next screenshot shows only what is
  // BEHIND the text (geometry, boxes, the surface). Layout is untouched.
  function hideText(on) {
    var id = '__audit-hide-text'
    var prev = document.getElementById(id)
    if (prev) prev.remove()
    if (!on) return
    var st = document.createElement('style')
    st.id = id
    st.textContent =
      '[data-audit-frame] *{-webkit-text-fill-color:transparent !important;text-shadow:none !important;text-decoration-color:transparent !important}' +
      '[data-audit-frame] svg text, [data-audit-frame] svg tspan{fill:transparent !important;stroke:transparent !important}'
    document.head.appendChild(st)
  }

  function lum(rgb) {
    function f(v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4) }
    return 0.2126 * f(rgb[0]) + 0.7152 * f(rgb[1]) + 0.0722 * f(rgb[2])
  }
  function ratio(a, b) {
    var la = lum(a), lb = lum(b)
    var hi = Math.max(la, lb), lo = Math.min(la, lb)
    return (hi + 0.05) / (lo + 0.05)
  }
  function over(fg, a, bg) {
    return [fg[0] * a + bg[0] * (1 - a), fg[1] * a + bg[1] * (1 - a), fg[2] * a + bg[2] * (1 - a)]
  }
  function median(arr) {
    var s = arr.slice().sort(function (x, y) { return x - y })
    return s[Math.floor(s.length / 2)]
  }

  /**
   * spec = { dpr, clip:{x,y,w,h}, bg:[r,g,b], texts:[{box,color,opacity}], sceneRect }
   * `png` is a screenshot taken with hideText(true) and clipped to spec.clip.
   * Returns per-text background statistics and figure-level ink statistics.
   */
  function pixels(png, spec) {
    return new Promise(function (resolve, reject) {
      var img = new Image()
      img.onload = function () {
        var c = document.createElement('canvas')
        c.width = img.width; c.height = img.height
        var ctx = c.getContext('2d', { willReadFrequently: true })
        ctx.drawImage(img, 0, 0)
        var W = c.width, H = c.height
        var sx = W / spec.clip.w, sy = H / spec.clip.h
        var res = { texts: [], scene: null }
        var surface = spec.bg
        spec.texts.forEach(function (t) {
          var x0 = Math.max(0, Math.floor((t.box.x - spec.clip.x) * sx))
          var y0 = Math.max(0, Math.floor((t.box.y - spec.clip.y) * sy))
          var x1 = Math.min(W, Math.ceil((t.box.x + t.box.w - spec.clip.x) * sx))
          var y1 = Math.min(H, Math.ceil((t.box.y + t.box.h - spec.clip.y) * sy))
          if (x1 <= x0 || y1 <= y0) { res.texts.push(null); return }
          var d = ctx.getImageData(x0, y0, x1 - x0, y1 - y0).data
          var rs = [], gs = [], bs = [], lums = []
          var inkPx = 0, n = 0
          for (var i = 0; i < d.length; i += 4) {
            rs.push(d[i]); gs.push(d[i + 1]); bs.push(d[i + 2])
            lums.push(lum([d[i], d[i + 1], d[i + 2]]))
            n++
          }
          var med = [median(rs), median(gs), median(bs)]
          // "ink under the label": pixels that differ from the MEDIAN backdrop,
          // i.e. a line / arrow / curve crossing the text rather than a box
          // the text sits inside.
          for (var j = 0; j < d.length; j += 4) {
            var diff = Math.max(Math.abs(d[j] - med[0]), Math.abs(d[j + 1] - med[1]), Math.abs(d[j + 2] - med[2]))
            if (diff > 24) inkPx++
          }
          var fg = parseColor(t.color)
          var a = fg[3] * (t.opacity || 1)
          var fgOver = over([fg[0], fg[1], fg[2]], a, med)
          var cMedian = ratio(fgOver, med)
          // Worst realistic backdrop under the glyphs: the pixel luminance
          // percentile that sits closest to the text's own luminance.
          var lf = lum(fgOver)
          var worst = Infinity
          var sorted = lums.slice().sort(function (p, q) { return p - q })
          var picks = [sorted[Math.floor(sorted.length * 0.05)], sorted[Math.floor(sorted.length * 0.95)], sorted[Math.floor(sorted.length * 0.5)]]
          picks.forEach(function (lb) {
            var hi = Math.max(lf, lb), lo = Math.min(lf, lb)
            worst = Math.min(worst, (hi + 0.05) / (lo + 0.05))
          })
          res.texts.push({
            bgMedian: med,
            fgEffective: [Math.round(fgOver[0]), Math.round(fgOver[1]), Math.round(fgOver[2])],
            contrast: cMedian,
            contrastWorst: worst,
            inkFraction: inkPx / n,
            area: n,
          })
        })
        // Figure-level ink in the scene box (curve/trace visibility, edge clipping).
        if (spec.sceneRect) {
          var sr = spec.sceneRect
          var ax0 = Math.max(0, Math.floor((sr.x - spec.clip.x) * sx))
          var ay0 = Math.max(0, Math.floor((sr.y - spec.clip.y) * sy))
          var ax1 = Math.min(W, Math.ceil((sr.x + sr.w - spec.clip.x) * sx))
          var ay1 = Math.min(H, Math.ceil((sr.y + sr.h - spec.clip.y) * sy))
          var sw = ax1 - ax0, sh = ay1 - ay0
          if (sw > 4 && sh > 4) {
            var dd = ctx.getImageData(ax0, ay0, sw, sh).data
            var ink = 0, edgeInk = 0, edgeN = 0, minX = sw, maxX = 0, minY = sh, maxY = 0
            var inkContrastSum = 0
            var EDGE = 2
            for (var yy = 0; yy < sh; yy++) {
              for (var xx = 0; xx < sw; xx++) {
                var k = (yy * sw + xx) * 4
                var df = Math.max(Math.abs(dd[k] - surface[0]), Math.abs(dd[k + 1] - surface[1]), Math.abs(dd[k + 2] - surface[2]))
                var isInk = df > 24
                var onEdge = xx < EDGE || yy < EDGE || xx >= sw - EDGE || yy >= sh - EDGE
                if (onEdge) { edgeN++; if (isInk) edgeInk++ }
                if (isInk) {
                  ink++
                  if (xx < minX) minX = xx; if (xx > maxX) maxX = xx
                  if (yy < minY) minY = yy; if (yy > maxY) maxY = yy
                  inkContrastSum += ratio([dd[k], dd[k + 1], dd[k + 2]], surface)
                }
              }
            }
            res.scene = {
              w: sw, h: sh,
              inkFraction: ink / (sw * sh),
              edgeInkFraction: edgeN ? edgeInk / edgeN : 0,
              edgeInkPx: edgeInk,
              inkBox: ink ? { x: minX / sx, y: minY / sy, w: (maxX - minX + 1) / sx, h: (maxY - minY + 1) / sy } : null,
              meanInkContrast: ink ? inkContrastSum / ink : 0,
            }
          }
        }
        resolve(res)
      }
      img.onerror = function () { reject(new Error('png decode failed')) }
      img.src = 'data:image/png;base64,' + png
    })
  }

  // Characters whose glyph is missing render as the browser's .notdef box. A
  // glyph is "missing" when it paints the same pixels as a private-use
  // codepoint that no font covers.
  function missingGlyphs(chars, fontCss) {
    var c = document.createElement('canvas')
    c.width = 40; c.height = 40
    var ctx = c.getContext('2d', { willReadFrequently: true })
    function paint(ch) {
      ctx.clearRect(0, 0, 40, 40)
      ctx.font = fontCss
      ctx.fillStyle = '#000'
      ctx.textBaseline = 'top'
      ctx.fillText(ch, 4, 4)
      var d = ctx.getImageData(0, 0, 40, 40).data
      var s = ''
      for (var i = 3; i < d.length; i += 4) s += d[i] > 128 ? '1' : '0'
      return s
    }
    var notdef = paint(String.fromCodePoint(0x10FFFF))
    var missing = []
    chars.forEach(function (ch) { if (paint(ch) === notdef) missing.push(ch) })
    return missing
  }

  window.__audit = { measure: measure, hideText: hideText, pixels: pixels, parseColor: parseColor, missingGlyphs: missingGlyphs }
})()
