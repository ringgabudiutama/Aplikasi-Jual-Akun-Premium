import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminTopbar from '../components/admin/AdminTopbar'

const TITLES = {
  '/admin/dashboard': 'Dashboard',
  '/admin/berita': 'Kelola Berita',
  '/admin/pengumuman': 'Kelola Pengumuman',
  '/admin/galeri': 'Kelola Galeri',
  '/admin/banner': 'Kelola Banner',
  '/admin/agenda': 'Kelola Agenda',
  '/admin/profil-desa': 'Kelola Profil Desa',
  '/admin/surat': 'Kelola Surat',
  '/admin/laporan': 'Kelola Laporan',
  '/admin/unduhan': 'Kelola Download',
  '/admin/faq': 'Kelola FAQ',
  '/admin/pengguna': 'Kelola User',
  '/admin/pengaturan': 'Pengaturan',
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const title = TITLES[location.pathname] || 'Admin'

  return (
    <div className="flex min-h-screen bg-canvas">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col">
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="flex-1 p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
