import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Trash2, Image as ImageIcon, Video } from 'lucide-react'
import Modal from '../../components/common/Modal'
import EmptyState from '../../components/common/EmptyState'
import { SkeletonGrid } from '../../components/common/Skeleton'
import { TextField, FileField, SelectField } from '../../components/common/FormField'
import useFetch from '../../hooks/useFetch'
import useToast from '../../hooks/useToast'
import galleryService from '../../services/galleryService'
import { STORAGE_BASE_URL } from '../../utils/constants'

const TYPE_OPTIONS = [{ value: 'photo', label: 'Foto' }, { value: 'video', label: 'Video' }]

export default function KelolaGaleri() {
  const [type, setType] = useState('photo')
  const [modalOpen, setModalOpen] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()

  const { data, loading, refetch } = useFetch(() => galleryService.list({ type, per_page: 24 }), [type])
  const items = data?.data || data || []

  const openCreate = () => { reset({ title: '', type }); setModalOpen(true) }

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('type', values.type)
      if (values.file?.[0]) formData.append('file', values.file[0])
      await galleryService.create(formData)
      toast.success('Media berhasil ditambahkan.')
      setModalOpen(false)
      refetch()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal mengunggah media.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (item) => {
    const confirm = await toast.confirm({ title: 'Hapus media ini?' })
    if (!confirm.isConfirmed) return
    try {
      await galleryService.remove(item.id)
      toast.success('Media berhasil dihapus.')
      refetch()
    } catch {
      toast.error('Gagal menghapus media.')
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-5">
        <div className="flex gap-2">
          <button onClick={() => setType('photo')} className={`btn ${type === 'photo' ? 'btn-primary' : 'btn-outline'}`}><ImageIcon className="w-4 h-4" /> Foto</button>
          <button onClick={() => setType('video')} className={`btn ${type === 'video' ? 'btn-primary' : 'btn-outline'}`}><Video className="w-4 h-4" /> Video</button>
        </div>
        <button onClick={openCreate} className="btn-primary">Tambah Media</button>
      </div>

      {loading ? (
        <SkeletonGrid count={8} />
      ) : items.length === 0 ? (
        <EmptyState title="Belum ada media" />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((g) => (
            <div key={g.id} className="card group relative">
              <div className="aspect-square bg-primary-50 overflow-hidden">
                {type === 'photo' ? (
                  <img src={`${STORAGE_BASE_URL}/${g.file}`} alt={g.title} className="w-full h-full object-cover" />
                ) : (
                  <video src={`${STORAGE_BASE_URL}/${g.file}`} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="p-3 flex items-center justify-between">
                <p className="text-xs font-semibold truncate">{g.title}</p>
                <button onClick={() => handleDelete(g)} className="text-red-600 shrink-0" aria-label="Hapus"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Tambah Media Galeri">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <TextField label="Judul" name="title" required error={errors.title} {...register('title', { required: 'Judul wajib diisi' })} />
          <SelectField label="Tipe Media" name="type" required options={TYPE_OPTIONS} error={errors.type} {...register('type', { required: true })} />
          <FileField label="File" name="file" required accept="image/*,video/*" error={errors.file} {...register('file', { required: 'File wajib diunggah' })} />
          <button type="submit" disabled={submitting} className="btn-primary w-full">{submitting ? 'Mengunggah...' : 'Unggah'}</button>
        </form>
      </Modal>
    </div>
  )
}
