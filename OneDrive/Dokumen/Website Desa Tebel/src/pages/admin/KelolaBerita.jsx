import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Pencil, Trash2 } from 'lucide-react'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/common/Modal'
import { TextField, TextareaField, FileField, SelectField } from '../../components/common/FormField'
import useFetch from '../../hooks/useFetch'
import useDebounce from '../../hooks/useDebounce'
import useToast from '../../hooks/useToast'
import newsService from '../../services/newsService'
import { STORAGE_BASE_URL } from '../../utils/constants'

const CATEGORY_OPTIONS = [
  { value: 'pemerintahan', label: 'Pemerintahan' },
  { value: 'pembangunan', label: 'Pembangunan' },
  { value: 'kegiatan', label: 'Kegiatan Warga' },
  { value: 'umum', label: 'Umum' },
]

export default function KelolaBerita() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebounce(search)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()

  const { data, loading, refetch } = useFetch(() => newsService.list({ search: debouncedSearch, page, per_page: 10 }), [debouncedSearch, page])
  const items = data?.data || []
  const meta = data?.meta || { current_page: 1, last_page: 1 }

  const openCreate = () => { setEditing(null); reset({ title: '', category: '', content: '' }); setModalOpen(true) }
  const openEdit = (row) => { setEditing(row); reset({ title: row.title, category: row.category?.slug, content: row.content }); setModalOpen(true) }

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('category', values.category)
      formData.append('content', values.content)
      if (values.thumbnail?.[0]) formData.append('thumbnail', values.thumbnail[0])

      if (editing) {
        await newsService.update(editing.id, formData)
        toast.success('Berita berhasil diperbarui.')
      } else {
        await newsService.create(formData)
        toast.success('Berita berhasil ditambahkan.')
      }
      setModalOpen(false)
      refetch()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menyimpan berita.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (row) => {
    const confirm = await toast.confirm({ title: `Hapus berita "${row.title}"?`, text: 'Tindakan ini tidak dapat dibatalkan.' })
    if (!confirm.isConfirmed) return
    try {
      await newsService.remove(row.id)
      toast.success('Berita berhasil dihapus.')
      refetch()
    } catch {
      toast.error('Gagal menghapus berita.')
    }
  }

  const columns = [
    { key: 'thumbnail', label: '', render: (r) => (
      <div className="w-14 h-10 rounded-md bg-primary-50 overflow-hidden">
        {r.thumbnail && <img src={`${STORAGE_BASE_URL}/${r.thumbnail}`} alt={r.title} className="w-full h-full object-cover" />}
      </div>
    ) },
    { key: 'title', label: 'Judul', render: (r) => <span className="font-semibold">{r.title}</span> },
    { key: 'category', label: 'Kategori', render: (r) => r.category?.name || '-' },
    { key: 'created_at', label: 'Tanggal', render: (r) => new Date(r.created_at).toLocaleDateString('id-ID') },
    { key: 'actions', label: 'Aksi', render: (r) => (
      <div className="flex gap-2">
        <button onClick={() => openEdit(r)} className="p-2 rounded-lg hover:bg-primary-50 text-primary" aria-label="Edit"><Pencil className="w-4 h-4" /></button>
        <button onClick={() => handleDelete(r)} className="p-2 rounded-lg hover:bg-red-50 text-red-600" aria-label="Hapus"><Trash2 className="w-4 h-4" /></button>
      </div>
    ) },
  ]

  return (
    <div>
      <DataTable
        columns={columns} data={items} loading={loading}
        search={search} onSearchChange={(v) => { setSearch(v); setPage(1) }}
        onAdd={openCreate} addLabel="Tambah Berita"
        currentPage={meta.current_page} lastPage={meta.last_page} onPageChange={setPage}
        emptyTitle="Belum ada berita"
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Berita' : 'Tambah Berita'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <TextField label="Judul Berita" name="title" required error={errors.title} {...register('title', { required: 'Judul wajib diisi' })} />
          <SelectField label="Kategori" name="category" required options={CATEGORY_OPTIONS} error={errors.category} {...register('category', { required: 'Kategori wajib dipilih' })} />
          <FileField label="Thumbnail" name="thumbnail" accept="image/*" hint={editing ? 'Kosongkan jika tidak ingin mengubah gambar' : undefined} {...register('thumbnail')} />
          <TextareaField label="Konten" name="content" rows={8} required error={errors.content} {...register('content', { required: 'Konten wajib diisi' })} />
          <button type="submit" disabled={submitting} className="btn-primary w-full">{submitting ? 'Menyimpan...' : 'Simpan Berita'}</button>
        </form>
      </Modal>
    </div>
  )
}
