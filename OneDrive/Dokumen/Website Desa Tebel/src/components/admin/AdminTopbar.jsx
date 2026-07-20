import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, LogOut, ExternalLink, ChevronDown } from 'lucide-react'
import useAuth from '../../hooks/useAuth'

export default function AdminTopbar({ onMenuClick, title }) {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-primary-50 flex items-center justify-between px-5 sm:px-8">
      <div className="flex items-center gap-3">
        <button className="lg:hidden text-ink" onClick={onMenuClick} aria-label="Buka menu"><Menu className="w-5 h-5" /></button>
        <h1 className="font-display font-semibold text-lg text-ink">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <a href="/" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
          Lihat Situs <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <div className="relative">
          <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-primary-50 transition">
            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </span>
            <span className="text-sm font-semibold hidden sm:inline">{user?.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-ink/40" />
          </button>
          {open && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-soft border border-primary-50 py-2" onMouseLeave={() => setOpen(false)}>
              <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                <LogOut className="w-4 h-4" /> Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
