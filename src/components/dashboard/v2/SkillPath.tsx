'use client'

import { Fragment } from 'react'
import { useRouter } from 'next/navigation'
import styles from './dashboard.module.css'
import { Card } from '@/components/ui/candy'
import type { SkillNodeData } from './types'

interface SkillPathProps {
  nodes: SkillNodeData[]
  currentHref?: string
}

const STATUS_CLASS: Record<SkillNodeData['status'], string> = {
  done: styles['pn-done'],
  current: styles['pn-current'],
  locked: styles['pn-lock'],
}

export function SkillPath({ nodes, currentHref }: SkillPathProps) {
  const router = useRouter()

  return (
    <Card className={styles['path-card']}>
      <div className={styles.path}>
        {nodes.map((node, i) => (
          <Fragment key={node.id}>
            <div className={styles['path-node-wrap']}>
              <button
                type="button"
                className={`${styles['path-node']} ${STATUS_CLASS[node.status]}`}
                disabled={node.status === 'locked'}
                onClick={node.status === 'current' && currentHref ? () => router.push(currentHref) : undefined}
              >
                {node.status !== 'done' && node.emoji}
              </button>
              {node.label && (
                <span className={[
                  styles['path-node-label'],
                  node.status === 'current' ? styles['path-node-label-current'] : '',
                  node.status === 'done' ? styles['path-node-label-done'] : '',
                ].filter(Boolean).join(' ')}>
                  {node.label}
                </span>
              )}
            </div>
            {i < nodes.length - 1 && (
              <div className={`${styles['path-connector']} ${node.status === 'done' ? styles.done : ''}`} />
            )}
          </Fragment>
        ))}
      </div>
    </Card>
  )
}
