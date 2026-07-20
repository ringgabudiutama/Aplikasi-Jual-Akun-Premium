import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export default function PageHeader({ eyebrow, title, description, breadcrumbs = [] }) {
  return (
    <section className="relative bg-primary-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-ukir-pattern opacity-40" />
      <div className="container-page relative py-14 sm:py-16">
        {eyebrow && <p className="section-eyebrow text-gold-300 mb-3">{eyebrow}</p>}
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3">{title}</h1>
        {description && <p className="text-white/70 max-w-2xl text-sm sm:text-base">{description}</p>}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-white/50 mt-5" aria-label="Breadcrumb">
            <Link to="/" className="flex items-center gap-1 hover:text-white transition"><Home className="w-3.5 h-3.5" /> Beranda</Link>
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3" />
                {b.to ? <Link to={b.to} className="hover:text-white transition">{b.label}</Link> : <span className="text-white/80">{b.label}</span>}
              </span>
            ))}
          </nav>
        )}
      </div>
    </section>
  )
}
