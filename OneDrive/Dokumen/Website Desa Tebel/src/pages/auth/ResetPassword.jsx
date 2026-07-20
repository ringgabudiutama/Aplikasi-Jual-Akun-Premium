import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { KeyRound } from 'lucide-react'
import authService from '../../services/authService'
import useToast from '../../hooks/useToast'
import { TextField } from '../../components/common/FormField'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { token: searchParams.get('token') || '', email: searchParams.get('email') || '' },
  })
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()
  const password = watch('password')

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      await authService.resetPassword(values)
      toast.success('Kata sandi berhasil diperbarui. Silakan masuk.')
      navigate('/masuk')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal mereset kata sandi. Tautan mungkin telah kedaluwarsa.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-1">Atur Ulang Kata Sandi</h1>
      <p className="text-sm text-ink/60 mb-8">Buat kata sandi baru untuk akun Anda.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <input type="hidden" {...register('token')} />
        <TextField label="Email" name="email" type="email" required error={errors.email} {...register('email', { required: true })} />
        <TextField label="Kata Sandi Baru" name="password" type="password" required error={errors.password}
          {...register('password', { required: 'Kata sandi wajib diisi', minLength: { value: 8, message: 'Minimal 8 karakter' } })} />
        <TextField label="Konfirmasi Kata Sandi" name="password_confirmation" type="password" required error={errors.password_confirmation}
          {...register('password_confirmation', { validate: (v) => v === password || 'Konfirmasi tidak cocok' })} />
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          <KeyRound className="w-4 h-4" /> {submitting ? 'Memproses...' : 'Simpan Kata Sandi'}
        </button>
      </form>
    </div>
  )
}
