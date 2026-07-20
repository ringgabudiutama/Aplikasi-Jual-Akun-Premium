import { Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import AuthLayout from './layouts/AuthLayout'
import AdminLayout from './layouts/AdminLayout'
import ProtectedRoute from './components/common/ProtectedRoute'

// Public pages
import Home from './pages/public/Home'
import ProfilDesa from './pages/public/ProfilDesa'
import BeritaList from './pages/public/BeritaList'
import BeritaDetail from './pages/public/BeritaDetail'
import PengumumanList from './pages/public/PengumumanList'
import PengumumanDetail from './pages/public/PengumumanDetail'
import Galeri from './pages/public/Galeri'
import LayananIndex from './pages/public/LayananIndex'
import PengajuanSurat from './pages/public/PengajuanSurat'
import CekStatus from './pages/public/CekStatus'
import LaporanMasyarakat from './pages/public/LaporanMasyarakat'
import BantuanSosial from './pages/public/BantuanSosial'
import Unduhan from './pages/public/Unduhan'
import Faq from './pages/public/Faq'
import Kontak from './pages/public/Kontak'
import PengajuanSaya from './pages/public/PengajuanSaya'
import ProfilAkun from './pages/public/ProfilAkun'
import NotFound from './pages/public/NotFound'

// Auth pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import AdminLogin from './pages/auth/AdminLogin'

// Admin pages
import Dashboard from './pages/admin/Dashboard'
import KelolaBerita from './pages/admin/KelolaBerita'
import KelolaPengumuman from './pages/admin/KelolaPengumuman'
import KelolaGaleri from './pages/admin/KelolaGaleri'
import KelolaBanner from './pages/admin/KelolaBanner'
import KelolaAgenda from './pages/admin/KelolaAgenda'
import KelolaProfilDesa from './pages/admin/KelolaProfilDesa'
import KelolaSurat from './pages/admin/KelolaSurat'
import KelolaLaporan from './pages/admin/KelolaLaporan'
import KelolaUnduhan from './pages/admin/KelolaUnduhan'
import KelolaFaq from './pages/admin/KelolaFaq'
import KelolaUser from './pages/admin/KelolaUser'
import Pengaturan from './pages/admin/Pengaturan'

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profil-desa" element={<ProfilDesa />} />
        <Route path="/berita" element={<BeritaList />} />
        <Route path="/berita/:slug" element={<BeritaDetail />} />
        <Route path="/pengumuman" element={<PengumumanList />} />
        <Route path="/pengumuman/:id" element={<PengumumanDetail />} />
        <Route path="/galeri" element={<Galeri />} />
        <Route path="/layanan" element={<LayananIndex />} />
        <Route path="/layanan/pengajuan-surat" element={<PengajuanSurat />} />
        <Route path="/layanan/cek-status" element={<CekStatus />} />
        <Route path="/layanan/laporan" element={<LaporanMasyarakat />} />
        <Route path="/layanan/bantuan-sosial" element={<BantuanSosial />} />
        <Route path="/layanan/unduhan" element={<Unduhan />} />
        <Route path="/layanan/faq" element={<Faq />} />
        <Route path="/kontak" element={<Kontak />} />

        <Route path="/akun/pengajuan-saya" element={<ProtectedRoute><PengajuanSaya /></ProtectedRoute>} />
        <Route path="/akun/profil" element={<ProtectedRoute><ProfilAkun /></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Auth (masyarakat) */}
      <Route element={<AuthLayout />}>
        <Route path="/masuk" element={<Login />} />
        <Route path="/daftar" element={<Register />} />
        <Route path="/lupa-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/lupa-password" element={<ForgotPassword />} />
      </Route>

      {/* Admin dashboard */}
      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="berita" element={<KelolaBerita />} />
        <Route path="pengumuman" element={<KelolaPengumuman />} />
        <Route path="galeri" element={<KelolaGaleri />} />
        <Route path="banner" element={<KelolaBanner />} />
        <Route path="agenda" element={<KelolaAgenda />} />
        <Route path="profil-desa" element={<KelolaProfilDesa />} />
        <Route path="surat" element={<KelolaSurat />} />
        <Route path="laporan" element={<KelolaLaporan />} />
        <Route path="unduhan" element={<KelolaUnduhan />} />
        <Route path="faq" element={<KelolaFaq />} />
        <Route path="pengguna" element={<KelolaUser />} />
        <Route path="pengaturan" element={<Pengaturan />} />
      </Route>

      {/*
        TEMPORARY — local preview only, no login required.
        Lets you see the admin UI before the Laravel backend exists.
        DELETE this whole block before deploying to production —
        it is NOT protected by ProtectedRoute.
      */}
      <Route path="/admin-preview" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="berita" element={<KelolaBerita />} />
        <Route path="pengumuman" element={<KelolaPengumuman />} />
        <Route path="galeri" element={<KelolaGaleri />} />
        <Route path="banner" element={<KelolaBanner />} />
        <Route path="agenda" element={<KelolaAgenda />} />
        <Route path="profil-desa" element={<KelolaProfilDesa />} />
        <Route path="surat" element={<KelolaSurat />} />
        <Route path="laporan" element={<KelolaLaporan />} />
        <Route path="unduhan" element={<KelolaUnduhan />} />
        <Route path="faq" element={<KelolaFaq />} />
        <Route path="pengguna" element={<KelolaUser />} />
        <Route path="pengaturan" element={<Pengaturan />} />
      </Route>
      {/* END TEMPORARY BLOCK */}
    </Routes>
  )
}
