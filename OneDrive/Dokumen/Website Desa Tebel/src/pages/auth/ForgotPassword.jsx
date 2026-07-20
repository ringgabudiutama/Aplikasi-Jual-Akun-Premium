import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Mail, CheckCircle2 } from 'lucide-react'
import authService from '../../services/authService'
import useToast from '../../hooks/useToast'
import { TextField } from '../../components/common/FormField'

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const toast = useToast()

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      await authService.forgotPassword(values)
      setSent(true)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal mengirim tautan reset.')
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) {
    return (
      <div className="text-center">
        <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold mb-2">Periksa Email Anda</h1>
        <p className="text-sm text-ink/60 mb-6">Kami telah mengirimkan tautan reset kata sandi ke email Anda.</p>
        <Link to="/masuk" className="btn-outline">Kembali ke Halaman Masuk</Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-1">Lupa Kata Sandi</h1>
      <p className="text-sm text-ink/60 mb-8">Masukkan email Anda untuk menerima tautan reset kata sandi.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <TextField label="Email" name="email" type="email" required error={errors.email} {...register('email', { required: 'Email wajib diisi' })} />
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          <Mail className="w-4 h-4" /> {submitting ? 'Mengirim...' : 'Kirim Tautan Reset'}
        </button>
      </form>
      <p className="text-sm text-ink/60 text-center mt-6">
        <Link to="/masuk" className="text-primary font-semibold hover:underline">Kembali ke halaman masuk</Link>
      </p>
    </div>
  )
}
