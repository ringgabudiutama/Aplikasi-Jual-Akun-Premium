import { FileDown, File } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import EmptyState from '../../components/common/EmptyState'
import { SkeletonLine } from '../../components/common/Skeleton'
import useFetch from '../../hooks/useFetch'
import downloadService from '../../services/downloadService'
import { STORAGE_BASE_URL } from '../../utils/constants'

export default function Unduhan() {
  const { data, loading } = useFetch(() => downloadService.list(), [])
  const items = data?.data || data || []

  return (
    <div>
      <PageHeader
        eyebrow="Layanan Warga"
        title="Download Formulir & Dokumen"
        description="Unduh formulir dan berkas persyaratan pelayanan desa."
        breadcrumbs={[{ label: 'Layanan', to: '/layanan' }, { label: 'Download' }]}
      />
      <div className="container-page py-12 max-w-3xl">
        {loading ? (
          <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <SkeletonLine key={i} className="h-16 w-full rounded-xl" />)}</div>
        ) : items.length === 0 ? (
          <EmptyState title="Belum ada dokumen unduhan" />
        ) : (
          <div className="space-y-3">
            {items.map((d) => (
              <a key={d.id} href={`${STORAGE_BASE_URL}/${d.file}`} target="_blank" rel="noopener noreferrer" download
                className="card p-4 flex items-center justify-between hover:shadow-soft transition group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center"><File className="w-5 h-5 text-primary" /></div>
                  <div>
                    <p className="font-semibold text-sm">{d.title}</p>
                    <p className="text-xs text-ink/50">{d.description}</p>
                  </div>
                </div>
                <FileDown className="w-4 h-4 text-ink/30 group-hover:text-primary transition" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
