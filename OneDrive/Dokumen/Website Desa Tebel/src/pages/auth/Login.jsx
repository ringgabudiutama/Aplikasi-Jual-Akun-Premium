import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LogIn, Eye, EyeOff } from 'lucide-react'
import useAuth from '../../hooks/useAuth'
import useToast from '../../hooks/useToast'

export default function Login({ adminMode = false }) {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const user = await login(values)
      toast.success(`Selamat datang, ${user.name}!`)
      if (adminMode || user.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate(location.state?.from?.pathname || '/')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Email atau kata sandi salah.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-1">{adminMode ? 'Masuk Admin' : 'Masuk ke Akun Anda'}</h1>
      <p className="text-sm text-ink/60 mb-8">{adminMode ? 'Khusus untuk perangkat desa dan administrator.' : 'Akses seluruh layanan digital Desa Tebel.'}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="label-field" htmlFor="email">Email <span className="text-red-500">*</span></label>
          <input
            id="email"
            type="email"
            className="input-field"
            {...register('email', { required: 'Email wajib diisi' })}
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        <div>
          <label className="label-field" htmlFor="password">Kata Sandi <span className="text-red-500">*</span></label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="input-field pr-11"
              {...register('password', { required: 'Kata sandi wajib diisi' })}
            />
            <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/40" tabIndex={-1}>
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="error-text">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-ink/60">
            <input type="checkbox" className="rounded border-primary-200 text-primary focus:ring-primary" {...register('remember')} />
            Ingat saya
          </label>
          <Link to={adminMode ? '/admin/lupa-password' : '/lupa-password'} className="text-primary font-semibold hover:underline">Lupa kata sandi?</Link>
        </div>

        <button type="submit" disabled={submitting} className="btn-primary w-full">
          <LogIn className="w-4 h-4" /> {submitting ? 'Memproses...' : 'Masuk'}
        </button>
      </form>

      {!adminMode && (
        <p className="text-sm text-ink/60 text-center mt-6">
          Belum punya akun? <Link to="/daftar" className="text-primary font-semibold hover:underline">Daftar sekarang</Link>
        </p>
      )}
    </div>
  )
}
