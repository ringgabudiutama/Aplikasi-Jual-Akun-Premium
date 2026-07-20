export default function StatCard({ icon: Icon, label, value, accent = 'primary' }) {
  const accents = {
    primary: 'bg-primary-50 text-primary',
    gold: 'bg-gold-50 text-gold-600',
  }
  return (
    <div className="card p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${accents[accent]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="min-w-0">
        <p className="font-display text-2xl font-bold text-ink leading-none">{value ?? '—'}</p>
        <p className="text-xs text-ink/50 mt-1.5">{label}</p>
      </div>
    </div>
  )
}
