import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react'
import { APP_NAME, APP_FULL_NAME } from '../../utils/constants'

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="container-page py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <img src="/images/logo-jombang.png" alt="Logo Kabupaten Jombang" className="w-10 h-11 object-contain" />
            <p className="font-display font-extrabold text-lg">{APP_NAME}</p>
          </div>
          <p className="text-sm text-white/50 leading-relaxed">{APP_FULL_NAME}. Portal pelayanan resmi masyarakat Desa Tebel, Kabupaten Jombang.</p>
          <div className="flex gap-3 mt-5">
            <a href="#" aria-label="Facebook Desa Tebel" className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold-400 flex items-center justify-center transition"><Facebook className="w-4 h-4" /></a>
            <a href="#" aria-label="Instagram Desa Tebel" className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold-400 flex items-center justify-center transition"><Instagram className="w-4 h-4" /></a>
            <a href="#" aria-label="Youtube Desa Tebel" className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold-400 flex items-center justify-center transition"><Youtube className="w-4 h-4" /></a>
          </div>
        </div>

        <div>
          <p className="font-bold mb-4 text-xs uppercase tracking-widest text-gold-400">Navigasi</p>
          <ul className="space-y-2.5 text-sm text-white/55">
            <li><Link to="/profil-desa" className="hover:text-white transition">Profil Desa</Link></li>
            <li><Link to="/berita" className="hover:text-white transition">Berita</Link></li>
            <li><Link to="/pengumuman" className="hover:text-white transition">Pengumuman</Link></li>
            <li><Link to="/galeri" className="hover:text-white transition">Galeri</Link></li>
            <li><Link to="/kontak" className="hover:text-white transition">Kontak</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-bold mb-4 text-xs uppercase tracking-widest text-gold-400">Layanan</p>
          <ul className="space-y-2.5 text-sm text-white/55">
            <li><Link to="/layanan/pengajuan-surat" className="hover:text-white transition">Pengajuan Surat</Link></li>
            <li><Link to="/layanan/cek-status" className="hover:text-white transition">Cek Status</Link></li>
            <li><Link to="/layanan/laporan" className="hover:text-white transition">Laporan Masyarakat</Link></li>
            <li><Link to="/layanan/unduhan" className="hover:text-white transition">Download Formulir</Link></li>
            <li><Link to="/layanan/faq" className="hover:text-white transition">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-bold mb-4 text-xs uppercase tracking-widest text-gold-400">Kontak</p>
          <ul className="space-y-3 text-sm text-white/55">
            <li className="flex gap-2.5"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold-400" /> Jl. Dr. Sutomo, Bareng, Kec. Bareng, Kabupaten Jombang, Jawa Timur 61474</li>
            <li className="flex gap-2.5"><Phone className="w-4 h-4 mt-0.5 shrink-0 text-gold-400" /> (0321) 123-456</li>
            <li className="flex gap-2.5"><Mail className="w-4 h-4 mt-0.5 shrink-0 text-gold-400" /> desatebel@jombangkab.go.id</li>
            <li className="flex gap-2.5"><Clock className="w-4 h-4 mt-0.5 shrink-0 text-gold-400" /> Senin–Jumat, 08.00–15.00 WIB</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <p className="text-center text-xs text-white/35">© {new Date().getFullYear()} Pemerintah Desa Tebel, Kabupaten Jombang. Seluruh hak cipta dilindungi.</p>
      </div>
    </footer>
  )
}
