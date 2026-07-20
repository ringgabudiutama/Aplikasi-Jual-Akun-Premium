import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Pencil, Trash2 } from 'lucide-react'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/common/Modal'
import { TextField, TextareaField } from '../../components/common/FormField'
import useFetch from '../../hooks/useFetch'
import useToast from '../../hooks/useToast'
import faqService from '../../services/faqService'

export default function KelolaFaq() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()

  const { data, loading, refetch } = useFetch(() => faqService.list(), [])
  const items = data?.data || data || []

  const openCreate = () => { setEditing(null); reset({ question: '', answer: '' }); setModalOpen(true) }
  const openEdit = (row) => { setEditing(row); reset({ question: row.question, answer: row.answer }); setModalOpen(true) }

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      if (editing) {
        await faqService.update(editing.id, values)
        toast.success('FAQ berhasil diperbarui.')
      } else {
        await faqService.create(values)
        toast.success('FAQ berhasil ditambahkan.')
      }
      setModalOpen(false)
      refetch()
    } catch {
      toast.error('Gagal menyimpan FAQ.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (row) => {
    const confirm = await toast.confirm({ title: 'Hapus pertanyaan ini?' })
    if (!confirm.isConfirmed) return
    try {
      await faqService.remove(row.id)
      toast.success('FAQ berhasil dihapus.')
      refetch()
    } catch {
      toast.error('Gagal menghapus FAQ.')
    }
  }

  const columns = [
    { key: 'question', label: 'Pertanyaan', render: (r) => <span className="font-semibold">{r.question}</span> },
    { key: 'answer', label: 'Jawaban', render: (r) => <span className="line-clamp-1 max-w-xs block">{r.answer}</span> },
    { key: 'actions', label: 'Aksi', render: (r) => (
      <div className="flex gap-2">
        <button onClick={() => openEdit(r)} className="p-2 rounded-lg hover:bg-primary-50 text-primary"><Pencil className="w-4 h-4" /></button>
        <button onClick={() => handleDelete(r)} className="p-2 rounded-lg hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button>
      </div>
    ) },
  ]

  return (
    <div>
      <DataTable columns={columns} data={items} loading={loading} onAdd={openCreate} addLabel="Tambah FAQ" emptyTitle="Belum ada FAQ" />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit FAQ' : 'Tambah FAQ'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <TextField label="Pertanyaan" name="question" required error={errors.question} {...register('question', { required: 'Pertanyaan wajib diisi' })} />
          <TextareaField label="Jawaban" name="answer" rows={5} required error={errors.answer} {...register('answer', { required: 'Jawaban wajib diisi' })} />
          <button type="submit" disabled={submitting} className="btn-primary w-full">{submitting ? 'Menyimpan...' : 'Simpan FAQ'}</button>
        </form>
      </Modal>
    </div>
  )
}
