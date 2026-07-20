import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ currentPage = 1, lastPage = 1, onChange }) {
  if (lastPage <= 1) return null

  const pages = []
  const start = Math.max(1, currentPage - 2)
  const end = Math.min(lastPage, start + 4)
  for (let p = start; p <= end; p++) pages.push(p)

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-8" aria-label="Navigasi halaman">
      <button
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-primary-100 text-primary disabled:opacity-30 hover:bg-primary-50 transition"
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-9 h-9 rounded-lg text-sm font-semibold transition ${
            p === currentPage ? 'bg-primary text-white' : 'text-ink/70 hover:bg-primary-50'
          }`}
          aria-current={p === currentPage ? 'page' : undefined}
        >
          {p}
        </button>
      ))}
      <button
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-primary-100 text-primary disabled:opacity-30 hover:bg-primary-50 transition"
        disabled={currentPage === lastPage}
        onClick={() => onChange(currentPage + 1)}
        aria-label="Halaman berikutnya"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  )
}
