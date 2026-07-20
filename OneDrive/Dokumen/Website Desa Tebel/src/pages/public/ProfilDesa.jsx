import { useState } from 'react'
import { BookOpen, Target, Users2, UserSquare2, Map, MapPin, Users, Ruler, Home as HomeIcon, Quote } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import Reveal from '../../components/common/Reveal'
import PhotoOrIllustration from '../../components/public/PhotoOrIllustration'
import { RiceFieldScene, GapuraScene, PersonAvatarScene } from '../../components/public/VillageScene'
import useFetch from '../../hooks/useFetch'
import profileService from '../../services/profileService'
import { STORAGE_BASE_URL } from '../../utils/constants'

const TABS = [
  { key: 'sejarah', label: 'Sejarah', icon: BookOpen },
  { key: 'visimisi', label: 'Visi & Misi', icon: Target },
  { key: 'struktur', label: 'Struktur Organisasi', icon: Users2 },
  { key: 'perangkat', label: 'Perangkat Desa', icon: UserSquare2 },
  { key: 'peta', label: 'Peta Desa', icon: Map },
]

const DUSUN_LIST = ['Tebel', 'Kupang', 'Jlopo', 'Larangan']

// Fallback content shown until the admin fills in real data via the dashboard.
// The history summary below is paraphrased from the village's own published
// legend (Legenda Desa Tebel, tebel.id) rather than quoted verbatim.
const FALLBACK = {
  population: '4.812',
  total_families: '1.340',
  area: '6,2',
  hamlets_count: '4',
  history:
    'Menurut cerita turun-temurun warga, asal-usul Desa Tebel bermula dari akhir tahun 1800-an, ketika seorang tokoh dari kawasan bekas Kerajaan Majapahit di Trowulan datang membuka hutan di sebelah barat Bareng untuk dijadikan tanah perdikan. Warga memanggilnya Mbah Awal, karena beliaulah orang pertama yang menemukan dan mendirikan permukiman di wilayah tersebut.\n\nKarena kawasan itu ditumbuhi hutan yang sangat lebat dan tebal, warga kemudian menamainya "Tebal", yang lambat laun disebut sebagai "Tebel" — nama yang bertahan hingga sekarang. Makam Mbah Awal masih dijaga dan dilestarikan warga Desa Tebel hingga hari ini.\n\nSeiring bertambahnya penduduk dan meluasnya permukiman, wilayah tanah perdikan ini berkembang menjadi empat dusun: Tebel, Kupang, Jlopo, dan Larangan — yang menjadi cikal bakal struktur wilayah Desa Tebel seperti sekarang.',
  vision: 'Terwujudnya Desa Tebel yang mandiri, sejahtera, dan berbudaya melalui tata kelola pemerintahan yang transparan, partisipatif, dan berkelanjutan.',
  mission: [
    'Meningkatkan kualitas pelayanan publik yang cepat, transparan, dan mudah diakses oleh seluruh warga.',
    'Mendorong pertumbuhan ekonomi desa melalui pemberdayaan UMKM, pertanian, dan potensi lokal.',
    'Membangun dan memelihara infrastruktur desa yang merata di keempat dusun.',
    'Melestarikan nilai gotong royong dan budaya lokal sebagai identitas Desa Tebel.',
    'Meningkatkan kualitas pendidikan, kesehatan, dan kesejahteraan sosial masyarakat.',
  ],
}
const FALLBACK_NOTE = 'Konten di bawah ini masih berupa draf awal. Silakan sesuaikan melalui menu Kelola Profil Desa di Dashboard Admin.'

const FALLBACK_OFFICIALS = [
  { id: 1, position: 'Kepala Desa', tone: 'green' },
  { id: 2, position: 'Sekretaris Desa', tone: 'gold' },
  { id: 3, position: 'Kaur Keuangan', tone: 'maroon' },
  { id: 4, position: 'Kaur Pemerintahan', tone: 'green' },
  { id: 5, position: 'Kasun Tebel', tone: 'gold' },
  { id: 6, position: 'Kasun Kupang', tone: 'maroon' },
  { id: 7, position: 'Kasun Jlopo', tone: 'green' },
  { id: 8, position: 'Kasun Larangan', tone: 'gold' },
]

function StatPill({ icon: Icon, value, label }) {
  return (
    <div className="card px-5 py-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="font-display text-lg font-extrabold leading-none">{value}</p>
        <p className="text-[11px] text-ink/50 mt-1">{label}</p>
      </div>
    </div>
  )
}

export default function ProfilDesa() {
  const [tab, setTab] = useState('sejarah')
  const { data: profile, loading } = useFetch(() => profileService.get(), [])
  const { data: officials } = useFetch(() => profileService.officials(), [])

  const usingFallback = !loading && !profile?.history
  const data = { ...FALLBACK, ...(profile || {}) }
  const officialsList = officials?.length ? officials : FALLBACK_OFFICIALS

  return (
    <div>
      <PageHeader
        eyebrow="Mengenal Kami"
        title="Profil Desa Tebel"
        description="Sejarah, visi misi, struktur pemerintahan, dan peta wilayah Desa Tebel, Kecamatan Bareng, Kabupaten Jombang."
        breadcrumbs={[{ label: 'Profil Desa' }]}
      />

      <div className="container-page py-4 -mt-10 relative z-10">
        <Reveal className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatPill icon={Users} value={data.population} label="Jumlah Penduduk" />
          <StatPill icon={HomeIcon} value={data.total_families} label="Jumlah KK" />
          <StatPill icon={Ruler} value={`${data.area} km²`} label="Luas Wilayah" />
          <StatPill icon={MapPin} value={data.hamlets_count} label="Dusun" />
        </Reveal>
      </div>

      <div className="container-page py-12">
        {usingFallback && (
          <p className="text-xs text-gold-600 bg-gold-50 border border-gold-100 rounded-lg px-4 py-2.5 mb-8 inline-block">
            {FALLBACK_NOTE}
          </p>
        )}

        <div className="flex gap-2 overflow-x-auto pb-1 mb-10 border-b border-primary-50">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-bold whitespace-nowrap rounded-t-lg transition ${
                tab === t.key ? 'text-primary-700 border-b-2 border-primary-700' : 'text-ink/45 hover:text-primary-700'
              }`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {tab === 'sejarah' && (
          <Reveal className="grid lg:grid-cols-[1fr_0.8fr] gap-12 items-start">
            <article>
              <p className="section-eyebrow mb-3">Legenda & Asal-usul</p>
              <h2 className="text-2xl font-extrabold mb-5">Sejarah Desa Tebel</h2>
              <div className="text-ink/70 leading-relaxed whitespace-pre-line text-[15px]">{data.history}</div>
            </article>
            <div className="rounded-2xl overflow-hidden shadow-soft h-80">
              <PhotoOrIllustration src="sejarah-desa.jpg" alt="Suasana Desa Tebel" className="w-full h-full object-cover" fallback={<RiceFieldScene className="w-full h-full" />} />
            </div>
          </Reveal>
        )}

        {tab === 'visimisi' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Reveal className="card p-8 bg-primary-800 text-white">
              <Quote className="w-8 h-8 text-gold-400 mb-4 fill-current" />
              <p className="section-eyebrow text-gold-400 mb-3">Visi</p>
              <p className="text-lg font-semibold leading-relaxed">{data.vision}</p>
            </Reveal>
            <Reveal delay={0.1} className="card p-8">
              <p className="section-eyebrow mb-4">Misi</p>
              <ol className="space-y-4">
                {(Array.isArray(data.mission) ? data.mission : FALLBACK.mission).map((m, i) => (
                  <li key={i} className="flex gap-3.5">
                    <span className="w-7 h-7 rounded-full bg-primary-50 text-primary-700 font-bold text-xs flex items-center justify-center shrink-0">{i + 1}</span>
                    <span className="text-sm text-ink/70 leading-relaxed">{m}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        )}

        {tab === 'struktur' && (
          <Reveal className="card p-6 sm:p-10 text-center max-w-3xl mx-auto">
            {profile?.structure_image ? (
              <img src={`${STORAGE_BASE_URL}/${profile.structure_image}`} alt="Struktur Organisasi Desa Tebel" className="w-full rounded-lg" />
            ) : (
              <div className="py-16">
                <Users2 className="w-12 h-12 text-primary-200 mx-auto mb-4" />
                <p className="text-ink/50 text-sm max-w-sm mx-auto">Bagan struktur organisasi belum diunggah. Admin dapat mengunggahnya melalui menu Kelola Profil Desa.</p>
              </div>
            )}
          </Reveal>
        )}

        {tab === 'perangkat' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {officialsList.map((o, i) => (
              <Reveal key={o.id} delay={i * 0.05} className="card p-5 text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden">
                  {o.photo ? (
                    <img src={`${STORAGE_BASE_URL}/${o.photo}`} alt={o.name} className="w-full h-full object-cover" />
                  ) : (
                    <PersonAvatarScene tone={o.tone || 'green'} className="w-full h-full" />
                  )}
                </div>
                <h4 className="font-bold text-sm">{o.name || 'Nama belum diisi'}</h4>
                <p className="text-xs text-gold-600 font-bold mt-1">{o.position}</p>
              </Reveal>
            ))}
          </div>
        )}

        {tab === 'peta' && (
          <Reveal className="rounded-2xl overflow-hidden shadow-soft h-96">
            <iframe
              title="Peta Wilayah Desa Tebel"
              src="https://maps.google.com/maps?q=Desa%20Tebel%20Bareng%20Jombang&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </Reveal>
        )}
      </div>
    </div>
  )
}
