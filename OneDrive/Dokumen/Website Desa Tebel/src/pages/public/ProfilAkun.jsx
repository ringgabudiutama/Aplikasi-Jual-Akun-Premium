import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Save } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import { TextField } from '../../components/common/FormField'
import useAuth from '../../hooks/useAuth'
import useToast from '../../hooks/useToast'
import api from '../../services/api'

export default function ProfilAkun() {
  const { user, setUser } = useAuth()
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()

  useEffect(() => {
    if (user) reset({ name: user.name, email: user.email, phone: user.phone, nik: user.nik, address: user.address })
  }, [user, reset])

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const { data } = await api.put('/auth/profile', values)
      setUser(data.data)
      localStorage.setItem('sitebel_user', JSON.stringify(data.data))
      toast.success('Profil berhasil diperbarui.')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal memperbarui profil.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <PageHeader eyebrow="Akun Saya" title="Profil Saya" description="Kelola informasi akun Anda." breadcrumbs={[{ label: 'Profil Saya' }]} />
      <div className="container-page py-12 max-w-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="card p-6 sm:p-8 space-y-5">
          <TextField label="Nama Lengkap" name="name" required error={errors.name} {...register('name', { required: true })} />
          <TextField label="NIK" name="nik" required error={errors.nik} {...register('nik', { required: true })} />
          <TextField label="Email" name="email" type="email" required error={errors.email} {...register('email', { required: true })} />
          <TextField label="Nomor HP" name="phone" required error={errors.phone} {...register('phone', { required: true })} />
          <TextField label="Alamat" name="address" error={errors.address} {...register('address')} />
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            <Save className="w-4 h-4" /> {submitting ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>
      </div>
    </div>
  )
}
