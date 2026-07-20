import { useState } from 'react'
import { Eye } from 'lucide-react'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/common/Modal'
import useFetch from '../../hooks/useFetch'
import useDebounce from '../../hooks/useDebounce'
import useToast from '../../hooks/useToast'
import reportService from '../../services/reportService'
import { REPORT_STATUS, REPORT_CATEGORIES, STORAGE_BASE_URL } from '../../utils/constants'

export default function KelolaLaporan() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebounce(search)
  const [detail, setDetail] = useState(null)
  const [comment, setComment] = useState('')
  const toast = useToast()

  const { data, loading, refetch } = useFetch(
    () => reportService.list({ search: debouncedSearch, status, page, per_page: 10 }),
    [debouncedSearch, status, page]
  )
  const items = data?.data || []
  const meta = data?.meta || { current_page: 1, last_page: 1 }

  const openDetail = async (row) => {
    try {
      const { data: full } = await reportService.detail(row.id)
      setDetail(full.data)
      setComment(full.data.admin_comment || '')
    } catch {
      toast.error('Gagal memuat detail laporan.')
    }
  }

  const updateStatus = async (newStatus) => {
    try {
      await reportService.updateStatus(detail.id, { status: newStatus, admin_comment: comment })
      toast.success('Status laporan berhasil diperbarui.')
      setDetail(null)
      refetch()
    } catch {
      toast.error('Gagal memperbarui status laporan.')
    }
  }

  const columns = [
    { key: 'tracking_number', label: 'No. Laporan', render: (r) => <span className="font-mono text-xs font-semibold">{r.tracking_number}</span> },
    { key: 'category', label: 'Kategori', render: (r) => REPORT_CATEGORIES.find((c) => c.value === r.category)?.label || r.category },
    { key: 'name', label: 'Pelapor' },
    { key: 'location', label: 'Lokasi' },
    { key: 'status', label: 'Status', render: (r) => <span className={REPORT_STATUS[r.status]?.className}>{REPORT_STATUS[r.status]?.label}</span> },
    { key: 'actions', label: 'Aksi', render: (r) => (
      <button onClick={() => openDetail(r)} className="p-2 rounded-lg hover:bg-primary-50 text-primary" title="Detail"><Eye className="w-4 h-4" /></button>
    ) },
  ]

  const statusFilter = (
    <select className="input-field sm:w-48" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1) }}>
      <option value="">Semua Status</option>
      {Object.entries(REPORT_STATUS).map(([key, val]) => <option key={key} value={key}>{val.label}</option>)}
    </select>
  )

  return (
    <div>
      <DataTable columns={columns} data={items} loading={loading} search={search} onSearchChange={(v) => { setSearch(v); setPage(1) }}
        filters={statusFilter} currentPage={meta.current_page} lastPage={meta.last_page} onPageChange={setPage} emptyTitle="Belum ada laporan" />

      <Modal open={!!detail} onClose={() => setDetail(null)} title="Detail Laporan Masyarakat" size="lg">
        {detail && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <p className="font-mono font-bold text-primary">{detail.tracking_number}</p>
              <span className={REPORT_STATUS[detail.status]?.className}>{REPORT_STATUS[detail.status]?.label}</span>
            </div>
            {detail.photo && <img src={`${STORAGE_BASE_URL}/${detail.photo}`} alt="Bukti laporan" className="w-full rounded-lg max-h-64 object-cover" />}
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div><p className="text-ink/40 text-xs mb-1">Pelapor</p><p className="font-semibold">{detail.name}</p></div>
              <div><p className="text-ink/40 text-xs mb-1">No. HP</p><p className="font-semibold">{detail.phone}</p></div>
              <div><p className="text-ink/40 text-xs mb-1">Kategori</p><p className="font-semibold">{REPORT_CATEGORIES.find((c) => c.value === detail.category)?.label}</p></div>
              <div><p className="text-ink/40 text-xs mb-1">Lokasi</p><p className="font-semibold">{detail.location}</p></div>
              <div className="sm:col-span-2"><p className="text-ink/40 text-xs mb-1">Deskripsi</p><p className="font-semibold">{detail.description}</p></div>
            </div>

            <div>
              <label className="label-field">Komentar / Tanggapan Admin</label>
              <textarea className="input-field resize-none" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>

            <div className="flex gap-3 pt-3 border-t border-primary-50">
              {detail.status === 'pending' && <button onClick={() => updateStatus('diproses')} className="btn-primary flex-1">Proses Laporan</button>}
              {detail.status !== 'selesai' && <button onClick={() => updateStatus('selesai')} className="btn bg-primary-600 text-white flex-1">Tandai Selesai</button>}
              {detail.status === 'selesai' && <button onClick={() => updateStatus('selesai')} className="btn-primary flex-1">Simpan Komentar</button>}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
