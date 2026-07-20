import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Trash2, FileDown } from 'lucide-react'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/common/Modal'
import { TextField, TextareaField, FileField } from '../../components/common/FormField'
import useFetch from '../../hooks/useFetch'
import useToast from '../../hooks/useToast'
import downloadService from '../../services/downloadService'
import { STORAGE_BASE_URL } from '../../utils/constants'

export default function KelolaUnduhan() {
  const [page, setPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()

  const { data, loading, refetch } = useFetch(() => downloadService.list({ page, per_page: 10 }), [page])
  const items = data?.data || data || []
  const meta = data?.meta || { current_page: 1, last_page: 1 }

  const openCreate = () => { reset({ title: '', description: '' }); setModalOpen(true) }

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('description', values.description || '')
      if (values.file?.[0]) formData.append('file', values.file[0])
      await downloadService.create(formData)
      toast.success('Dokumen berhasil ditambahkan.')
      setModalOpen(false)
      refetch()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal mengunggah dokumen.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (row) => {
    const confirm = await toast.confirm({ title: `Hapus dokumen "${row.title}"?` })
    if (!confirm.isConfirmed) return
    try {
      await downloadService.remove(row.id)
      toast.success('Dokumen berhasil dihapus.')
      refetch()
    } catch {
      toast.error('Gagal menghapus dokumen.')
    }
  }

  const columns = [
    { key: 'title', label: 'Judul', render: (r) => <span className="font-semibold">{r.title}</span> },
    { key: 'description', label: 'Deskripsi' },
    { key: 'file', label: 'File', render: (r) => (
      <a href={`${STORAGE_BASE_URL}/${r.file}`} target="_blank" rel="noopener noreferrer" className="text-primary inline-flex items-center gap-1 text-xs font-semibold"><FileDown className="w-3.5 h-3.5" /> Lihat</a>
    ) },
    { key: 'actions', label: 'Aksi', render: (r) => (
      <button onClick={() => handleDelete(r)} className="p-2 rounded-lg hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button>
    ) },
  ]

  return (
    <div>
      <DataTable columns={columns} data={items} loading={loading} onAdd={openCreate} addLabel="Tambah Dokumen"
        currentPage={meta.current_page} lastPage={meta.last_page} onPageChange={setPage} emptyTitle="Belum ada dokumen unduhan" />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Tambah Dokumen Unduhan">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <TextField label="Judul Dokumen" name="title" required error={errors.title} {...register('title', { required: 'Judul wajib diisi' })} />
          <TextareaField label="Deskripsi" name="description" rows={3} {...register('description')} />
          <FileField label="File Dokumen" name="file" required accept=".pdf,.doc,.docx" error={errors.file} {...register('file', { required: 'File wajib diunggah' })} />
          <button type="submit" disabled={submitting} className="btn-primary w-full">{submitting ? 'Mengunggah...' : 'Unggah Dokumen'}</button>
        </form>
      </Modal>
    </div>
  )
}
