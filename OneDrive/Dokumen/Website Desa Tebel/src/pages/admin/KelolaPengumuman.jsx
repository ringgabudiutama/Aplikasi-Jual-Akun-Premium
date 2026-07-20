import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Pencil, Trash2 } from 'lucide-react'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/common/Modal'
import { TextField, TextareaField } from '../../components/common/FormField'
import useFetch from '../../hooks/useFetch'
import useDebounce from '../../hooks/useDebounce'
import useToast from '../../hooks/useToast'
import announcementService from '../../services/announcementService'

export default function KelolaPengumuman() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebounce(search)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()

  const { data, loading, refetch } = useFetch(() => announcementService.list({ search: debouncedSearch, page, per_page: 10 }), [debouncedSearch, page])
  const items = data?.data || []
  const meta = data?.meta || { current_page: 1, last_page: 1 }

  const openCreate = () => { setEditing(null); reset({ title: '', content: '' }); setModalOpen(true) }
  const openEdit = (row) => { setEditing(row); reset({ title: row.title, content: row.content }); setModalOpen(true) }

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      if (editing) {
        await announcementService.update(editing.id, values)
        toast.success('Pengumuman berhasil diperbarui.')
      } else {
        await announcementService.create(values)
        toast.success('Pengumuman berhasil ditambahkan.')
      }
      setModalOpen(false)
      refetch()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menyimpan pengumuman.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (row) => {
    const confirm = await toast.confirm({ title: `Hapus pengumuman "${row.title}"?` })
    if (!confirm.isConfirmed) return
    try {
      await announcementService.remove(row.id)
      toast.success('Pengumuman berhasil dihapus.')
      refetch()
    } catch {
      toast.error('Gagal menghapus pengumuman.')
    }
  }

  const columns = [
    { key: 'title', label: 'Judul', render: (r) => <span className="font-semibold">{r.title}</span> },
    { key: 'created_at', label: 'Tanggal', render: (r) => new Date(r.created_at).toLocaleDateString('id-ID') },
    { key: 'actions', label: 'Aksi', render: (r) => (
      <div className="flex gap-2">
        <button onClick={() => openEdit(r)} className="p-2 rounded-lg hover:bg-primary-50 text-primary"><Pencil className="w-4 h-4" /></button>
        <button onClick={() => handleDelete(r)} className="p-2 rounded-lg hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button>
      </div>
    ) },
  ]

  return (
    <div>
      <DataTable columns={columns} data={items} loading={loading} search={search} onSearchChange={(v) => { setSearch(v); setPage(1) }}
        onAdd={openCreate} addLabel="Tambah Pengumuman" currentPage={meta.current_page} lastPage={meta.last_page} onPageChange={setPage}
        emptyTitle="Belum ada pengumuman" />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Pengumuman' : 'Tambah Pengumuman'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <TextField label="Judul" name="title" required error={errors.title} {...register('title', { required: 'Judul wajib diisi' })} />
          <TextareaField label="Isi Pengumuman" name="content" rows={7} required error={errors.content} {...register('content', { required: 'Isi wajib diisi' })} />
          <button type="submit" disabled={submitting} className="btn-primary w-full">{submitting ? 'Menyimpan...' : 'Simpan Pengumuman'}</button>
        </form>
      </Modal>
    </div>
  )
}
