import { ExternalLink, ShieldAlert } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import { BANTUAN_LINKS } from '../../utils/constants'

export default function BantuanSosial() {
  return (
    <div>
      <PageHeader
        eyebrow="Layanan Warga"
        title="Cek Bantuan Sosial"
        description="Portal informasi program bantuan sosial pemerintah pusat."
        breadcrumbs={[{ label: 'Layanan', to: '/layanan' }, { label: 'Cek Bantuan Sosial' }]}
      />
      <div className="container-page py-12 max-w-3xl">
        <div className="flex items-start gap-3 bg-gold-50 border border-gold-100 rounded-xl p-4 mb-8 text-sm text-gold-700">
          <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
          <p>Website ini <strong>tidak menyimpan data bantuan sosial</strong>. Halaman ini hanya menjadi portal penghubung ke situs resmi pemerintah untuk masing-masing program.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {BANTUAN_LINKS.map((b) => (
            <a
              key={b.code}
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-5 flex items-center justify-between hover:shadow-soft transition group"
            >
              <div>
                <p className="font-display font-bold text-primary text-lg">{b.code}</p>
                <p className="text-sm text-ink/60 mt-0.5">{b.name}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-ink/30 group-hover:text-primary transition" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
