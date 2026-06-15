import { Fragment } from 'react'
import styles from './dashboard.module.css'
import { Card } from '@/components/ui/candy'
import type { SkillNodeData } from './types'

interface SkillPathProps {
  nodes: SkillNodeData[]
}

const STATUS_CLASS: Record<SkillNodeData['status'], string> = {
  done: styles['pn-done'],
  current: styles['pn-current'],
  locked: styles['pn-lock'],
}

export function SkillPath({ nodes }: SkillPathProps) {
  return (
    <Card className={styles['path-card']}>
      <div className={styles.path}>
        {nodes.map((node, i) => (
          <Fragment key={node.id}>
            <button type="button" className={`${styles['path-node']} ${STATUS_CLASS[node.status]}`}>
              {node.status !== 'done' && node.emoji}
            </button>
            {i < nodes.length - 1 && (
              <div className={`${styles['path-connector']} ${node.status === 'done' ? styles.done : ''}`} />
            )}
          </Fragment>
        ))}
      </div>
    </Card>
  )
}
