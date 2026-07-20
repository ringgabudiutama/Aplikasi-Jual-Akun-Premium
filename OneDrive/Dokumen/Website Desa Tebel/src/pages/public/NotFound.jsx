import { Link } from 'react-router-dom'
import { Home, MapPinOff } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5">
      <MapPinOff className="w-16 h-16 text-primary-200 mb-5" />
      <h1 className="font-display text-5xl font-bold text-primary mb-2">404</h1>
      <p className="text-ink/60 mb-1">Halaman yang Anda cari tidak ditemukan.</p>
      <p className="text-ink/40 text-sm mb-8">Mungkin tautan sudah berpindah atau tidak lagi tersedia.</p>
      <Link to="/" className="btn-primary"><Home className="w-4 h-4" /> Kembali ke Beranda</Link>
    </div>
  )
}
