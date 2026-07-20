import { Link, Outlet } from 'react-router-dom'
import { APP_NAME, APP_TAGLINE } from '../utils/constants'

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-primary-900 text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-ukir-pattern opacity-30" />
        <Link to="/" className="relative flex items-center gap-2.5">
          <img src="/favicon.svg" alt="Logo Desa Tebel" className="w-10 h-10" />
          <div>
            <p className="font-display font-bold text-xl">{APP_NAME}</p>
            <p className="text-xs text-white/50">Desa Tebel, Jombang</p>
          </div>
        </Link>
        <div className="relative">
          <h2 className="font-display text-3xl font-bold leading-tight mb-3">{APP_TAGLINE}</h2>
          <p className="text-white/60 max-w-sm">Satu akun untuk mengakses seluruh layanan digital Desa Tebel — mulai dari pengajuan surat hingga pelaporan masyarakat.</p>
        </div>
        <p className="relative text-xs text-white/30">© {new Date().getFullYear()} Pemerintah Desa Tebel</p>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-10 bg-canvas">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
