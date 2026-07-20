import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown, User, LogOut, FileText, LayoutDashboard, Phone, Mail, MapPin, Clock } from 'lucide-react'
import useAuth from '../../hooks/useAuth'
import { APP_NAME } from '../../utils/constants'

const NAV_LINKS = [
  { to: '/', label: 'Beranda' },
  { to: '/profil-desa', label: 'Profil Desa' },
  { to: '/berita', label: 'Berita' },
  { to: '/pengumuman', label: 'Pengumuman' },
  {
    label: 'Layanan',
    children: [
      { to: '/layanan/pengajuan-surat', label: 'Pengajuan Surat' },
      { to: '/layanan/cek-status', label: 'Cek Status Pengajuan' },
      { to: '/layanan/laporan', label: 'Laporan Masyarakat' },
      { to: '/layanan/bantuan-sosial', label: 'Cek Bantuan Sosial' },
      { to: '/layanan/unduhan', label: 'Download Formulir' },
      { to: '/layanan/faq', label: 'FAQ' },
    ],
  },
  { to: '/galeri', label: 'Galeri' },
  { to: '/kontak', label: 'Kontak' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [userMenu, setUserMenu] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div>
      <div className="hidden sm:block bg-primary-900 text-white/70 text-xs">
        <div className="container-page flex items-center justify-between h-9">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5"><Phone className="w-3 h-3" /> (0321) 123-456</span>
            <span className="inline-flex items-center gap-1.5"><Mail className="w-3 h-3" /> desatebel@jombangkab.go.id</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="w-3 h-3" /> Kec. Bareng, Kabupaten Jombang</span>
          </div>
          <span className="inline-flex items-center gap-1.5"><Clock className="w-3 h-3" /> Senin–Jumat, 08.00–15.00 WIB</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white border-b border-primary-50">
        <div className="container-page flex items-center justify-between h-[76px]">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img src="/images/logo-jombang.png" alt="Logo Kabupaten Jombang" className="w-10 h-11 object-contain" />
            <div className="leading-tight">
              <p className="font-display font-extrabold text-primary-700 text-lg">{APP_NAME}</p>
              <p className="text-[10px] text-ink/50 -mt-0.5">Desa Tebel, Kab. Jombang</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button className="flex items-center gap-1 px-4 py-2.5 text-sm font-semibold text-ink/60 hover:text-primary-700 rounded-full transition">
                    {link.label} <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white rounded-xl shadow-soft border border-primary-50 py-2 w-64">
                      {link.children.map((c) => (
                        <NavLink key={c.to} to={c.to} className="block px-4 py-2.5 text-sm text-ink/70 hover:bg-primary-50 hover:text-primary-700 transition">
                          {c.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2.5 text-sm font-semibold rounded-full transition ${
                      isActive ? 'bg-primary-800 text-white' : 'text-ink/60 hover:text-primary-700'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenu((v) => !v)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-primary-100 hover:bg-primary-50 transition"
                >
                  <span className="w-7 h-7 rounded-full bg-primary-700 text-white flex items-center justify-center text-xs font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                  <span className="text-sm font-semibold text-ink/80 max-w-[100px] truncate">{user?.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-ink/50" />
                </button>
                {userMenu && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-soft border border-primary-50 py-2" onMouseLeave={() => setUserMenu(false)}>
                    {user?.role === 'admin' && (
                      <Link to="/admin/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink/70 hover:bg-primary-50 hover:text-primary-700">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard Admin
                      </Link>
                    )}
                    <Link to="/akun/pengajuan-saya" className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink/70 hover:bg-primary-50 hover:text-primary-700">
                      <FileText className="w-4 h-4" /> Pengajuan Saya
                    </Link>
                    <Link to="/akun/profil" className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink/70 hover:bg-primary-50 hover:text-primary-700">
                      <User className="w-4 h-4" /> Akun Saya
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                      <LogOut className="w-4 h-4" /> Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/masuk" className="btn-line">Masuk</Link>
                <Link to="/layanan/pengajuan-surat" className="btn-dark">Ajukan Surat</Link>
              </>
            )}
          </div>

          <button className="lg:hidden p-2 text-primary-700" onClick={() => setOpen((v) => !v)} aria-label="Buka menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden bg-white border-t border-primary-50 px-5 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label} className="py-1">
                  <p className="px-2 py-2 text-xs font-bold uppercase tracking-wide text-ink/40">{link.label}</p>
                  {link.children.map((c) => (
                    <NavLink key={c.to} to={c.to} onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm rounded-lg text-ink/70 hover:bg-primary-50">
                      {c.label}
                    </NavLink>
                  ))}
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `block px-4 py-2.5 text-sm rounded-lg font-semibold ${isActive ? 'text-primary-700 bg-primary-50' : 'text-ink/70'}`}
                >
                  {link.label}
                </NavLink>
              )
            )}
            <div className="pt-3 flex gap-2 border-t border-primary-50 mt-2">
              {isAuthenticated ? (
                <button onClick={handleLogout} className="btn-line w-full">Keluar</button>
              ) : (
                <>
                  <Link to="/masuk" className="btn-line flex-1" onClick={() => setOpen(false)}>Masuk</Link>
                  <Link to="/layanan/pengajuan-surat" className="btn-dark flex-1" onClick={() => setOpen(false)}>Ajukan Surat</Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  )
}
