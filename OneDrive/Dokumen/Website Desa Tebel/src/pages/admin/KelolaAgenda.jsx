import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Pencil, Trash2 } from 'lucide-react'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/common/Modal'
import { TextField, TextareaField } from '../../components/common/FormField'
import useFetch from '../../hooks/useFetch'
import useToast from '../../hooks/useToast'
import { agendaService } from '../../services/galleryService'

export default function KelolaAgenda() {
  const [page, setPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()

  const { data, loading, refetch } = useFetch(() => agendaService.list({ page, per_page: 10 }), [page])
  const items = data?.data || []
  const meta = data?.meta || { current_page: 1, last_page: 1 }

  const openCreate = () => { setEditing(null); reset({ title: '', date: '', location: '', description: '' }); setModalOpen(true) }
  const openEdit = (row) => { setEditing(row); reset({ title: row.title, date: row.date?.slice(0, 10), location: row.location, description: row.description }); setModalOpen(true) }

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      if (editing) {
        await agendaService.update(editing.id, values)
        toast.success('Agenda berhasil diperbarui.')
      } else {
        await agendaService.create(values)
        toast.success('Agenda berhasil ditambahkan.')
      }
      setModalOpen(false)
      refetch()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menyimpan agenda.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (row) => {
    const confirm = await toast.confirm({ title: `Hapus agenda "${row.title}"?` })
    if (!confirm.isConfirmed) return
    try {
      await agendaService.remove(row.id)
      toast.success('Agenda berhasil dihapus.')
      refetch()
    } catch {
      toast.error('Gagal menghapus agenda.')
    }
  }

  const columns = [
    { key: 'title', label: 'Kegiatan', render: (r) => <span className="font-semibold">{r.title}</span> },
    { key: 'date', label: 'Tanggal', render: (r) => new Date(r.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) },
    { key: 'location', label: 'Lokasi' },
    { key: 'actions', label: 'Aksi', render: (r) => (
      <div className="flex gap-2">
        <button onClick={() => openEdit(r)} className="p-2 rounded-lg hover:bg-primary-50 text-primary"><Pencil className="w-4 h-4" /></button>
        <button onClick={() => handleDelete(r)} className="p-2 rounded-lg hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button>
      </div>
    ) },
  ]

  return (
    <div>
      <DataTable columns={columns} data={items} loading={loading} onAdd={openCreate} addLabel="Tambah Agenda"
        currentPage={meta.current_page} lastPage={meta.last_page} onPageChange={setPage} emptyTitle="Belum ada agenda" />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Agenda' : 'Tambah Agenda'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <TextField label="Nama Kegiatan" name="title" required error={errors.title} {...register('title', { required: 'Judul wajib diisi' })} />
          <TextField label="Tanggal" name="date" type="date" required error={errors.date} {...register('date', { required: 'Tanggal wajib diisi' })} />
          <TextField label="Lokasi" name="location" required error={errors.location} {...register('location', { required: 'Lokasi wajib diisi' })} />
          <TextareaField label="Deskripsi" name="description" rows={4} error={errors.description} {...register('description')} />
          <button type="submit" disabled={submitting} className="btn-primary w-full">{submitting ? 'Menyimpan...' : 'Simpan Agenda'}</button>
        </form>
      </Modal>
    </div>
  )
}
