import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { KeyRound, Ban, CheckCircle2, Trash2, Pencil } from 'lucide-react'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/common/Modal'
import { TextField, SelectField } from '../../components/common/FormField'
import useFetch from '../../hooks/useFetch'
import useDebounce from '../../hooks/useDebounce'
import useToast from '../../hooks/useToast'
import userService from '../../services/userService'

const ROLE_OPTIONS = [{ value: 'admin', label: 'Admin' }, { value: 'masyarakat', label: 'Masyarakat' }]

export default function KelolaUser() {
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('')
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebounce(search)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()

  const { data, loading, refetch } = useFetch(() => userService.list({ search: debouncedSearch, role, page, per_page: 10 }), [debouncedSearch, role, page])
  const items = data?.data || []
  const meta = data?.meta || { current_page: 1, last_page: 1 }

  const openCreate = () => { setEditing(null); reset({ name: '', email: '', role: 'masyarakat', password: '' }); setModalOpen(true) }
  const openEdit = (row) => { setEditing(row); reset({ name: row.name, email: row.email, role: row.role, password: '' }); setModalOpen(true) }

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      if (editing) {
        await userService.update(editing.id, values)
        toast.success('User berhasil diperbarui.')
      } else {
        await userService.create(values)
        toast.success('User berhasil ditambahkan.')
      }
      setModalOpen(false)
      refetch()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menyimpan user.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (row) => {
    const confirm = await toast.confirm({ title: `Hapus user "${row.name}"?` })
    if (!confirm.isConfirmed) return
    try {
      await userService.remove(row.id)
      toast.success('User berhasil dihapus.')
      refetch()
    } catch {
      toast.error('Gagal menghapus user.')
    }
  }

  const handleResetPassword = async (row) => {
    const confirm = await toast.confirm({ title: `Reset kata sandi "${row.name}"?`, text: 'Kata sandi baru akan dikirim ke email user.' })
    if (!confirm.isConfirmed) return
    try {
      await userService.resetPassword(row.id)
      toast.success('Kata sandi berhasil direset.')
    } catch {
      toast.error('Gagal mereset kata sandi.')
    }
  }

  const handleToggleActive = async (row) => {
    try {
      await userService.toggleActive(row.id)
      toast.success(row.is_active ? 'User dinonaktifkan.' : 'User diaktifkan kembali.')
      refetch()
    } catch {
      toast.error('Gagal mengubah status user.')
    }
  }

  const columns = [
    { key: 'name', label: 'Nama', render: (r) => <span className="font-semibold">{r.name}</span> },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', render: (r) => (
      <span className={`badge ${r.role === 'admin' ? 'bg-primary-100 text-primary-700' : 'bg-gold-50 text-gold-600'}`}>{r.role === 'admin' ? 'Admin' : 'Masyarakat'}</span>
    ) },
    { key: 'is_active', label: 'Status', render: (r) => (
      <span className={`badge ${r.is_active ? 'bg-primary-100 text-primary-700' : 'bg-red-100 text-red-600'}`}>{r.is_active ? 'Aktif' : 'Nonaktif'}</span>
    ) },
    { key: 'actions', label: 'Aksi', render: (r) => (
      <div className="flex gap-1.5">
        <button onClick={() => openEdit(r)} className="p-2 rounded-lg hover:bg-primary-50 text-primary" title="Edit"><Pencil className="w-4 h-4" /></button>
        <button onClick={() => handleResetPassword(r)} className="p-2 rounded-lg hover:bg-gold-50 text-gold-600" title="Reset Password"><KeyRound className="w-4 h-4" /></button>
        <button onClick={() => handleToggleActive(r)} className="p-2 rounded-lg hover:bg-primary-50 text-primary" title={r.is_active ? 'Nonaktifkan' : 'Aktifkan'}>
          {r.is_active ? <Ban className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
        </button>
        <button onClick={() => handleDelete(r)} className="p-2 rounded-lg hover:bg-red-50 text-red-600" title="Hapus"><Trash2 className="w-4 h-4" /></button>
      </div>
    ) },
  ]

  const roleFilter = (
    <select className="input-field sm:w-48" value={role} onChange={(e) => { setRole(e.target.value); setPage(1) }}>
      <option value="">Semua Role</option>
      <option value="admin">Admin</option>
      <option value="masyarakat">Masyarakat</option>
    </select>
  )

  return (
    <div>
      <DataTable columns={columns} data={items} loading={loading} search={search} onSearchChange={(v) => { setSearch(v); setPage(1) }}
        filters={roleFilter} onAdd={openCreate} addLabel="Tambah User"
        currentPage={meta.current_page} lastPage={meta.last_page} onPageChange={setPage} emptyTitle="Belum ada user" />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit User' : 'Tambah User'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <TextField label="Nama" name="name" required error={errors.name} {...register('name', { required: 'Nama wajib diisi' })} />
          <TextField label="Email" name="email" type="email" required error={errors.email} {...register('email', { required: 'Email wajib diisi' })} />
          <SelectField label="Role" name="role" required options={ROLE_OPTIONS} error={errors.role} {...register('role', { required: true })} />
          {!editing && (
            <TextField label="Kata Sandi" name="password" type="password" required error={errors.password}
              {...register('password', { required: 'Kata sandi wajib diisi', minLength: { value: 8, message: 'Minimal 8 karakter' } })} />
          )}
          <button type="submit" disabled={submitting} className="btn-primary w-full">{submitting ? 'Menyimpan...' : 'Simpan User'}</button>
        </form>
      </Modal>
    </div>
  )
}
