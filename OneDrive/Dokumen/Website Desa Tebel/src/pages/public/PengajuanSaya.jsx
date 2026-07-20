import { Link } from 'react-router-dom'
import { FileText, Printer } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import EmptyState from '../../components/common/EmptyState'
import { SkeletonLine } from '../../components/common/Skeleton'
import useFetch from '../../hooks/useFetch'
import serviceRequestService from '../../services/serviceRequestService'
import { REQUEST_STATUS, SURAT_TYPES } from '../../utils/constants'

export default function PengajuanSaya() {
  const { data, loading } = useFetch(() => serviceRequestService.myRequests(), [])
  const items = data?.data || data || []

  return (
    <div>
      <PageHeader eyebrow="Akun Saya" title="Pengajuan Surat Saya" description="Riwayat pengajuan surat yang pernah Anda ajukan." breadcrumbs={[{ label: 'Pengajuan Saya' }]} />
      <div className="container-page py-12 max-w-3xl">
        {loading ? (
          <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <SkeletonLine key={i} className="h-20 w-full rounded-xl" />)}</div>
        ) : items.length === 0 ? (
          <EmptyState icon={FileText} title="Belum ada pengajuan" description="Anda belum pernah mengajukan surat." action={<Link to="/layanan/pengajuan-surat" className="btn-primary">Ajukan Surat</Link>} />
        ) : (
          <div className="space-y-3">
            {items.map((r) => (
              <div key={r.id} className="card p-5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold text-sm">{SURAT_TYPES.find((t) => t.value === r.type)?.label || r.type}</p>
                  <p className="text-xs text-ink/50 mt-1">{r.tracking_number} · {new Date(r.created_at).toLocaleDateString('id-ID')}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={REQUEST_STATUS[r.status]?.className}>{REQUEST_STATUS[r.status]?.label}</span>
                  {r.status === 'selesai' && (
                    <a href={r.file_url} target="_blank" rel="noopener noreferrer" className="text-primary" title="Unduh Surat"><Printer className="w-4 h-4" /></a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
