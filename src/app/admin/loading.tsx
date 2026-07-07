import { Card } from '@/components/ui/candy'

export default function AdminLoading() {
  return (
    <div style={{ maxWidth: 960 }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ width: 180, height: 24, borderRadius: 8, background: 'var(--candy-shadow)', marginBottom: 8 }} />
        <div style={{ width: 260, height: 14, borderRadius: 6, background: 'var(--candy-shadow)' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
        {[0, 1].map((i) => (
          <Card key={i} style={{ padding: 20, height: 76 }} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} style={{ padding: 20, height: 80 }} />
        ))}
      </div>
    </div>
  )
}
