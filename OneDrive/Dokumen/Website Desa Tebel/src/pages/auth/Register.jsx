import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import authService from '../../services/authService'
import useToast from '../../hooks/useToast'
import { TextField } from '../../components/common/FormField'

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()
  const password = watch('password')

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      await authService.register(values)
      toast.success('Pendaftaran berhasil! Silakan masuk.')
      navigate('/masuk')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Pendaftaran gagal. Periksa kembali data Anda.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-1">Buat Akun Baru</h1>
      <p className="text-sm text-ink/60 mb-8">Daftar sebagai warga untuk mengakses layanan digital desa.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <TextField label="Nama Lengkap" name="name" required error={errors.name} {...register('name', { required: 'Nama wajib diisi' })} />
        <TextField label="NIK" name="nik" required error={errors.nik}
          {...register('nik', { required: 'NIK wajib diisi', minLength: { value: 16, message: 'NIK harus 16 digit' }, maxLength: { value: 16, message: 'NIK harus 16 digit' } })} />
        <TextField label="Email" name="email" type="email" required error={errors.email} {...register('email', { required: 'Email wajib diisi' })} />
        <TextField label="Nomor HP" name="phone" required error={errors.phone} {...register('phone', { required: 'Nomor HP wajib diisi' })} />
        <TextField label="Kata Sandi" name="password" type="password" required error={errors.password}
          {...register('password', { required: 'Kata sandi wajib diisi', minLength: { value: 8, message: 'Minimal 8 karakter' } })} />
        <TextField label="Konfirmasi Kata Sandi" name="password_confirmation" type="password" required error={errors.password_confirmation}
          {...register('password_confirmation', { required: 'Konfirmasi kata sandi wajib diisi', validate: (v) => v === password || 'Konfirmasi tidak cocok' })} />

        <button type="submit" disabled={submitting} className="btn-primary w-full">
          <UserPlus className="w-4 h-4" /> {submitting ? 'Memproses...' : 'Daftar'}
        </button>
      </form>

      <p className="text-sm text-ink/60 text-center mt-6">
        Sudah punya akun? <Link to="/masuk" className="text-primary font-semibold hover:underline">Masuk di sini</Link>
      </p>
    </div>
  )
}
