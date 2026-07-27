'use client'
import { useTransition } from 'react'
import { approveAsset, rejectAsset, deprecateAsset, approveAllDraftForSubject } from '../_actions/assets'

type Family = 'explanation' | 'probe'
type Status = 'DRAFT' | 'REVIEW' | 'ACTIVE' | 'DEPRECATED' | 'RETIRED'

function Btn({
  label,
  color,
  onClick,
  pending,
  confirmMsg,
}: {
  label: string
  color: string
  onClick: () => void
  pending: boolean
  confirmMsg?: string
}) {
  const handle = () => {
    if (confirmMsg && !window.confirm(confirmMsg)) return
    onClick()
  }
  return (
    <button
      onClick={handle}
      disabled={pending}
      style={{
        fontSize: 11,
        fontWeight: 700,
        padding: '3px 8px',
        borderRadius: 6,
        border: `1px solid ${color}44`,
        background: `${color}18`,
        color,
        cursor: pending ? 'not-allowed' : 'pointer',
        opacity: pending ? 0.6 : 1,
        transition: 'opacity .15s',
      }}
    >
      {label}
    </button>
  )
}

export function AssetActions({
  assetId,
  family,
  status,
}: {
  assetId: string
  family: Family
  status: Status
}) {
  const [pending, startTransition] = useTransition()

  const approve = () => startTransition(() => approveAsset(assetId, family))
  const reject  = () => startTransition(() => rejectAsset(assetId, family))
  const depr    = () => startTransition(() => deprecateAsset(assetId))

  return (
    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
      {(status === 'DRAFT' || status === 'REVIEW') && (
        <>
          <Btn label="Approve" color="var(--green)" onClick={approve} pending={pending} />
          <Btn label="Reject"  color="#F85149"       onClick={reject}  pending={pending}
            confirmMsg="Reject this asset? It will be marked RETIRED and cannot be served." />
        </>
      )}
      {status === 'ACTIVE' && (
        <Btn label="Deprecate" color="var(--candy-orange, #FF9600)" onClick={depr} pending={pending}
          confirmMsg="Deprecate this ACTIVE asset? It will no longer be served to learners." />
      )}
      {(status === 'DEPRECATED' || status === 'RETIRED') && (
        <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>—</span>
      )}
    </div>
  )
}

export function BulkApproveButton({ subjectPrefix, label }: { subjectPrefix: string; label: string }) {
  const [pending, startTransition] = useTransition()

  const handle = () => {
    if (!window.confirm(
      `Approve ALL DRAFT assets for ${label}?\n\nThis will promote every DRAFT in ${label} to ACTIVE. This action cannot be undone in bulk. Proceed?`
    )) return
    startTransition(async () => {
      const res = await approveAllDraftForSubject(subjectPrefix)
      alert(`Done. ${(res as { approved: number }).approved} asset(s) approved.`)
    })
  }

  return (
    <button
      onClick={handle}
      disabled={pending}
      style={{
        fontSize: 12,
        fontWeight: 700,
        padding: '6px 14px',
        borderRadius: 8,
        border: '1px solid var(--green)44',
        background: 'var(--green)18',
        color: 'var(--green)',
        cursor: pending ? 'not-allowed' : 'pointer',
        opacity: pending ? 0.6 : 1,
      }}
    >
      {pending ? 'Approving…' : `Approve all DRAFT — ${label}`}
    </button>
  )
}
