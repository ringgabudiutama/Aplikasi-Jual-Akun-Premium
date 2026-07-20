import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Megaphone } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import Pagination from '../../components/common/Pagination'
import EmptyState from '../../components/common/EmptyState'
import Reveal from '../../components/common/Reveal'
import { SkeletonLine } from '../../components/common/Skeleton'
import useFetch from '../../hooks/useFetch'
import announcementService from '../../services/announcementService'
import { EXAMPLE_ANNOUNCEMENTS } from '../../utils/exampleContent'

export default function PengumumanList() {
  const [page, setPage] = useState(1)
  const { data, loading } = useFetch(() => announcementService.list({ page, per_page: 10 }), [page])
  const apiItems = data?.data || []
  const meta = data?.meta || { current_page: 1, last_page: 1 }
  const usingExample = !loading && apiItems.length === 0
  const items = useMemo(() => (usingExample ? EXAMPLE_ANNOUNCEMENTS : apiItems), [usingExample, apiItems])

  return (
    <div>
      <PageHeader eyebrow="Papan Informasi" title="Pengumuman" description="Informasi resmi dan pengumuman dari Pemerintah Desa Tebel." breadcrumbs={[{ label: 'Pengumuman' }]} />
      <div className="container-page py-12 max-w-3xl">
        {usingExample && (
          <p className="text-xs text-gold-600 bg-gold-50 border border-gold-100 rounded-lg px-4 py-2.5 mb-6 inline-block">
            Menampilkan pengumuman contoh. Kelola pengumuman sungguhan melalui Dashboard Admin.
          </p>
        )}
        {loading ? (
          <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <SkeletonLine key={i} className="h-20 w-full rounded-xl" />)}</div>
        ) : items.length === 0 ? (
          <EmptyState title="Belum ada pengumuman" icon={Megaphone} />
        ) : (
          <>
            <div className="space-y-3">
              {items.map((a, i) => (
                <Reveal key={a.id} delay={i * 0.05}>
                  <Link to={`/pengumuman/${a.id}`} className="card p-5 flex items-start gap-4 hover:shadow-soft transition">
                    <div className="w-11 h-11 rounded-lg bg-maroon-50 flex items-center justify-center shrink-0">
                      <Megaphone className="w-5 h-5 text-maroon-700" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold">{a.title}</h3>
                      <p className="text-sm text-ink/60 line-clamp-1 mt-1">{a.summary || a.content}</p>
                      <p className="text-xs text-ink/40 mt-2">{new Date(a.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
            {!usingExample && <Pagination currentPage={meta.current_page} lastPage={meta.last_page} onChange={setPage} />}
          </>
        )}
      </div>
    </div>
  )
}
