import { useState } from 'react'
import { Eye, Printer, CheckCircle2, XCircle, Download } from 'lucide-react'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/common/Modal'
import useFetch from '../../hooks/useFetch'
import useDebounce from '../../hooks/useDebounce'
import useToast from '../../hooks/useToast'
import serviceRequestService from '../../services/serviceRequestService'
import { REQUEST_STATUS, SURAT_TYPES, STORAGE_BASE_URL } from '../../utils/constants'

export default function KelolaSurat() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebounce(search)
  const [detail, setDetail] = useState(null)
  const [rejectNote, setRejectNote] = useState('')
  const [showReject, setShowReject] = useState(false)
  const toast = useToast()

  const { data, loading, refetch } = useFetch(
    () => serviceRequestService.list({ search: debouncedSearch, status, page, per_page: 10 }),
    [debouncedSearch, status, page]
  )
  const items = data?.data || []
  const meta = data?.meta || { current_page: 1, last_page: 1 }

  const openDetail = async (row) => {
    try {
      const { data: full } = await serviceRequestService.detail(row.id)
      setDetail(full.data)
    } catch {
      toast.error('Gagal memuat detail pengajuan.')
    }
  }

  const updateStatus = async (id, newStatus, note) => {
    try {
      await serviceRequestService.updateStatus(id, { status: newStatus, note })
      toast.success('Status pengajuan berhasil diperbarui.')
      setDetail(null)
      setShowReject(false)
      setRejectNote('')
      refetch()
    } catch {
      toast.error('Gagal memperbarui status.')
    }
  }

  const handlePrint = async (row) => {
    try {
      const response = await serviceRequestService.print(row.id)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      window.open(url, '_blank')
    } catch {
      toast.error('Gagal mencetak surat. Pastikan pengajuan sudah selesai diverifikasi.')
    }
  }

  const columns = [
    { key: 'tracking_number', label: 'No. Pengajuan', render: (r) => <span className="font-mono text-xs font-semibold">{r.tracking_number}</span> },
    { key: 'name', label: 'Pemohon' },
    { key: 'type', label: 'Jenis Surat', render: (r) => SURAT_TYPES.find((t) => t.value === r.type)?.label || r.type },
    { key: 'created_at', label: 'Tanggal', render: (r) => new Date(r.created_at).toLocaleDateString('id-ID') },
    { key: 'status', label: 'Status', render: (r) => <span className={REQUEST_STATUS[r.status]?.className}>{REQUEST_STATUS[r.status]?.label}</span> },
    { key: 'actions', label: 'Aksi', render: (r) => (
      <div className="flex gap-2">
        <button onClick={() => openDetail(r)} className="p-2 rounded-lg hover:bg-primary-50 text-primary" title="Detail"><Eye className="w-4 h-4" /></button>
        {r.status === 'selesai' && (
          <button onClick={() => handlePrint(r)} className="p-2 rounded-lg hover:bg-primary-50 text-primary" title="Cetak"><Printer className="w-4 h-4" /></button>
        )}
      </div>
    ) },
  ]

  const statusFilter = (
    <select className="input-field sm:w-48" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1) }}>
      <option value="">Semua Status</option>
      {Object.entries(REQUEST_STATUS).map(([key, val]) => <option key={key} value={key}>{val.label}</option>)}
    </select>
  )

  return (
    <div>
      <DataTable
        columns={columns} data={items} loading={loading}
        search={search} onSearchChange={(v) => { setSearch(v); setPage(1) }}
        filters={statusFilter}
        currentPage={meta.current_page} lastPage={meta.last_page} onPageChange={setPage}
        emptyTitle="Belum ada pengajuan surat"
      />

      <Modal open={!!detail} onClose={() => setDetail(null)} title="Detail Pengajuan Surat" size="lg">
        {detail && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <p className="font-mono font-bold text-primary">{detail.tracking_number}</p>
              <span className={REQUEST_STATUS[detail.status]?.className}>{REQUEST_STATUS[detail.status]?.label}</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div><p className="text-ink/40 text-xs mb-1">Nama Pemohon</p><p className="font-semibold">{detail.name}</p></div>
              <div><p className="text-ink/40 text-xs mb-1">NIK</p><p className="font-semibold">{detail.nik}</p></div>
              <div><p className="text-ink/40 text-xs mb-1">No. HP</p><p className="font-semibold">{detail.phone}</p></div>
              <div><p className="text-ink/40 text-xs mb-1">Jenis Surat</p><p className="font-semibold">{SURAT_TYPES.find((t) => t.value === detail.type)?.label || detail.type}</p></div>
              <div className="sm:col-span-2"><p className="text-ink/40 text-xs mb-1">Alamat</p><p className="font-semibold">{detail.address}</p></div>
              <div className="sm:col-span-2"><p className="text-ink/40 text-xs mb-1">Keperluan</p><p className="font-semibold">{detail.purpose}</p></div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {detail.ktp_file && <a href={`${STORAGE_BASE_URL}/${detail.ktp_file}`} target="_blank" rel="noopener noreferrer" className="btn-outline text-xs justify-center"><Download className="w-3.5 h-3.5" /> KTP</a>}
              {detail.kk_file && <a href={`${STORAGE_BASE_URL}/${detail.kk_file}`} target="_blank" rel="noopener noreferrer" className="btn-outline text-xs justify-center"><Download className="w-3.5 h-3.5" /> KK</a>}
              {detail.supporting_file && <a href={`${STORAGE_BASE_URL}/${detail.supporting_file}`} target="_blank" rel="noopener noreferrer" className="btn-outline text-xs justify-center"><Download className="w-3.5 h-3.5" /> Dokumen Lain</a>}
            </div>

            {detail.status === 'menunggu' && (
              <div className="flex gap-3 pt-4 border-t border-primary-50">
                <button onClick={() => updateStatus(detail.id, 'diproses')} className="btn-primary flex-1">Proses Pengajuan</button>
                <button onClick={() => setShowReject(true)} className="btn-outline flex-1 border-red-300 text-red-600 hover:bg-red-50">Tolak</button>
              </div>
            )}
            {detail.status === 'diproses' && (
              <div className="pt-4 border-t border-primary-50">
                <button onClick={() => updateStatus(detail.id, 'selesai')} className="btn-primary w-full"><CheckCircle2 className="w-4 h-4" /> Tandai Selesai</button>
              </div>
            )}

            {showReject && (
              <div className="space-y-3 pt-3 border-t border-primary-50">
                <textarea className="input-field resize-none" rows={3} placeholder="Alasan penolakan..." value={rejectNote} onChange={(e) => setRejectNote(e.target.value)} />
                <button onClick={() => updateStatus(detail.id, 'ditolak', rejectNote)} className="btn bg-red-600 text-white hover:bg-red-700 w-full"><XCircle className="w-4 h-4" /> Konfirmasi Tolak</button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
