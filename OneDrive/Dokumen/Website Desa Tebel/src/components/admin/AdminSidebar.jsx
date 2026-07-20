import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Newspaper, Megaphone, Images, GalleryHorizontal, CalendarDays,
  Landmark, FileStack, MessageSquareWarning, FileDown, HelpCircle, Users, Settings, X,
} from 'lucide-react'
import { APP_NAME } from '../../utils/constants'

const MENU = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/berita', label: 'Kelola Berita', icon: Newspaper },
  { to: '/admin/pengumuman', label: 'Kelola Pengumuman', icon: Megaphone },
  { to: '/admin/galeri', label: 'Kelola Galeri', icon: Images },
  { to: '/admin/banner', label: 'Kelola Banner', icon: GalleryHorizontal },
  { to: '/admin/agenda', label: 'Kelola Agenda', icon: CalendarDays },
  { to: '/admin/profil-desa', label: 'Kelola Profil Desa', icon: Landmark },
  { to: '/admin/surat', label: 'Kelola Surat', icon: FileStack },
  { to: '/admin/laporan', label: 'Kelola Laporan', icon: MessageSquareWarning },
  { to: '/admin/unduhan', label: 'Kelola Download', icon: FileDown },
  { to: '/admin/faq', label: 'Kelola FAQ', icon: HelpCircle },
  { to: '/admin/pengguna', label: 'Kelola User', icon: Users },
  { to: '/admin/pengaturan', label: 'Pengaturan', icon: Settings },
]

export default function AdminSidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-primary-900 text-white z-50 flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <img src="/favicon.svg" alt="Logo" className="w-8 h-8" />
            <div>
              <p className="font-display font-bold text-sm leading-none">{APP_NAME}</p>
              <p className="text-[10px] text-white/40 mt-0.5">Admin Panel</p>
            </div>
          </div>
          <button className="lg:hidden text-white/60" onClick={onClose} aria-label="Tutup menu"><X className="w-5 h-5" /></button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {MENU.map((m) => (
            <NavLink
              key={m.to}
              to={m.to}
              end={m.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive ? 'bg-gold text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <m.icon className="w-4.5 h-4.5 shrink-0" /> {m.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
