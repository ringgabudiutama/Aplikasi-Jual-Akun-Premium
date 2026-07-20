import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import EmptyState from '../../components/common/EmptyState'
import { SkeletonLine } from '../../components/common/Skeleton'
import useFetch from '../../hooks/useFetch'
import faqService from '../../services/faqService'

function FaqItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="card">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between p-5 text-left">
        <span className="font-semibold text-sm sm:text-base pr-4">{item.question}</span>
        <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-5 pb-5 text-sm text-ink/60 leading-relaxed whitespace-pre-line">{item.answer}</div>}
    </div>
  )
}

export default function Faq() {
  const { data, loading } = useFetch(() => faqService.list(), [])
  const items = data?.data || data || []

  return (
    <div>
      <PageHeader
        eyebrow="Layanan Warga"
        title="Pertanyaan Umum (FAQ)"
        description="Jawaban atas pertanyaan yang paling sering diajukan warga."
        breadcrumbs={[{ label: 'Layanan', to: '/layanan' }, { label: 'FAQ' }]}
      />
      <div className="container-page py-12 max-w-2xl space-y-3">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonLine key={i} className="h-14 w-full rounded-xl" />)
        ) : items.length === 0 ? (
          <EmptyState title="Belum ada pertanyaan" />
        ) : (
          items.map((f) => <FaqItem key={f.id} item={f} />)
        )}
      </div>
    </div>
  )
}
