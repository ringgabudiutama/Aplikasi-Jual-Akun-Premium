import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Trash2, Pencil } from 'lucide-react'
import Modal from '../../components/common/Modal'
import EmptyState from '../../components/common/EmptyState'
import { SkeletonGrid } from '../../components/common/Skeleton'
import { TextField, FileField } from '../../components/common/FormField'
import useFetch from '../../hooks/useFetch'
import useToast from '../../hooks/useToast'
import { bannerService } from '../../services/galleryService'
import { STORAGE_BASE_URL } from '../../utils/constants'

export default function KelolaBanner() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()

  const { data, loading, refetch } = useFetch(() => bannerService.list(), [])
  const items = data?.data || data || []

  const openCreate = () => { setEditing(null); reset({ title: '' }); setModalOpen(true) }
  const openEdit = (row) => { setEditing(row); reset({ title: row.title }); setModalOpen(true) }

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('title', values.title || '')
      if (values.image?.[0]) formData.append('image', values.image[0])
      if (editing) {
        await bannerService.update(editing.id, formData)
        toast.success('Banner berhasil diperbarui.')
      } else {
        await bannerService.create(formData)
        toast.success('Banner berhasil ditambahkan.')
      }
      setModalOpen(false)
      refetch()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menyimpan banner.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (item) => {
    const confirm = await toast.confirm({ title: 'Hapus banner ini?' })
    if (!confirm.isConfirmed) return
    try {
      await bannerService.remove(item.id)
      toast.success('Banner berhasil dihapus.')
      refetch()
    } catch {
      toast.error('Gagal menghapus banner.')
    }
  }

  return (
    <div>
      <div className="flex justify-end mb-5">
        <button onClick={openCreate} className="btn-primary">Tambah Banner</button>
      </div>
      {loading ? (
        <SkeletonGrid count={3} />
      ) : items.length === 0 ? (
        <EmptyState title="Belum ada banner" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((b) => (
            <div key={b.id} className="card">
              <div className="h-36 bg-primary-50 overflow-hidden">
                <img src={`${STORAGE_BASE_URL}/${b.image}`} alt={b.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <p className="text-sm font-semibold truncate">{b.title || 'Banner Beranda'}</p>
                <div className="flex gap-1.5 shrink-0">
                  <button onClick={() => openEdit(b)} className="p-1.5 rounded-lg hover:bg-primary-50 text-primary"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(b)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Banner' : 'Tambah Banner'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <TextField label="Judul (opsional)" name="title" error={errors.title} {...register('title')} />
          <FileField label="Gambar Banner" name="image" required={!editing} accept="image/*" error={errors.image} {...register('image', { required: !editing && 'Gambar wajib diunggah' })} />
          <button type="submit" disabled={submitting} className="btn-primary w-full">{submitting ? 'Menyimpan...' : 'Simpan Banner'}</button>
        </form>
      </Modal>
    </div>
  )
}
