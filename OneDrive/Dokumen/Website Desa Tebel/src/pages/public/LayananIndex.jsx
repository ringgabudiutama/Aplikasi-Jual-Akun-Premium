import { Link } from 'react-router-dom'
import { FileText, ClipboardCheck, MessageSquareWarning, HandHeart, Download, HelpCircle, ArrowRight } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'

const SERVICES = [
  { icon: FileText, title: 'Pengajuan Surat', desc: 'Ajukan berbagai jenis surat keterangan secara online.', to: '/layanan/pengajuan-surat' },
  { icon: ClipboardCheck, title: 'Cek Status Pengajuan', desc: 'Lacak status pengajuan surat Anda dengan nomor pengajuan atau NIK.', to: '/layanan/cek-status' },
  { icon: MessageSquareWarning, title: 'Laporan Masyarakat', desc: 'Sampaikan laporan terkait infrastruktur dan lingkungan desa.', to: '/layanan/laporan' },
  { icon: HandHeart, title: 'Cek Bantuan Sosial', desc: 'Portal informasi program bantuan sosial pemerintah.', to: '/layanan/bantuan-sosial' },
  { icon: Download, title: 'Download Formulir', desc: 'Unduh formulir dan berkas persyaratan pelayanan.', to: '/layanan/unduhan' },
  { icon: HelpCircle, title: 'FAQ', desc: 'Jawaban atas pertanyaan yang sering diajukan warga.', to: '/layanan/faq' },
]

export default function LayananIndex() {
  return (
    <div>
      <PageHeader eyebrow="Pelayanan Digital" title="Layanan Desa Tebel" description="Pilih layanan yang Anda butuhkan." breadcrumbs={[{ label: 'Layanan' }]} />
      <div className="container-page py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s) => (
          <Link key={s.title} to={s.to} className="card p-6 hover:shadow-soft hover:-translate-y-1 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary transition">
              <s.icon className="w-6 h-6 text-primary group-hover:text-white" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-1.5">{s.title}</h3>
            <p className="text-sm text-ink/60 mb-3">{s.desc}</p>
            <span className="text-sm font-semibold text-primary inline-flex items-center gap-1">Buka Layanan <ArrowRight className="w-3.5 h-3.5" /></span>
          </Link>
        ))}
      </div>
    </div>
  )
}
