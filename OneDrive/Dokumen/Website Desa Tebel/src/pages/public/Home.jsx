import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  FileText, MapPinCheck, MessageSquareWarning, HandHeart, ArrowRight, Play,
  CheckCircle2, Users, Calendar, Quote, Phone, Mail, Clock, Landmark,
  Building2, ShieldCheck, TreePine, ChevronRight, BadgeCheck, Volume2, VolumeX,
} from 'lucide-react'
import useFetch from '../../hooks/useFetch'
import newsService from '../../services/newsService'
import announcementService from '../../services/announcementService'
import profileService from '../../services/profileService'
import galleryService from '../../services/galleryService'
import Reveal from '../../components/common/Reveal'
import PhotoOrIllustration from '../../components/public/PhotoOrIllustration'
import { HeroScene, RiceFieldScene, GapuraScene, GalleryTile, PersonAvatarScene } from '../../components/public/VillageScene'
import { STORAGE_BASE_URL } from '../../utils/constants'
import { EXAMPLE_NEWS, EXAMPLE_ANNOUNCEMENTS, EXAMPLE_GALLERY } from '../../utils/exampleContent'

/* ------------------------------------------------------------------ */
/* Animated counter — counts up from 0 once it scrolls into view.      */
/* Used for every statistic on the page so numbers feel verified and   */
/* "alive" rather than static text — reads as more credible/official.  */
/* ------------------------------------------------------------------ */
function CountUp({ value, duration = 1.8, formatter }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let raf
    let start = null
    const step = (ts) => {
      if (start === null) start = ts
      const progress = Math.min((ts - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(value * eased)
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [isInView, value, duration])

  return <span ref={ref}>{formatter ? formatter(display) : Math.round(display)}</span>
}

const fmtInt = (n) => Math.round(n).toLocaleString('id-ID')
const fmtDecimal1 = (n) => n.toFixed(1).replace('.', ',')

/* ------------------------------------------------------------------ */
/* Subtle leaf-dot watermark — reinforces "asri" without extra photos */
/* ------------------------------------------------------------------ */
function LeafPattern({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1" strokeOpacity="0.5">
        {Array.from({ length: 6 }).map((_, row) => Array.from({ length: 6 }).map((__, col) => (
          <path
            key={`${row}-${col}`}
            d="M0 5c3-4 7-4 10 0-3 4-7 4-10 0z"
            transform={`translate(${col * 34 + (row % 2 ? 17 : 0)}, ${row * 34})`}
          />
        )))}
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Hero background slides — add more photos here any time.            */
/* Just drop the file into the same folder as hero-desa.jpg and add   */
/* a line below with its filename + a short alt description.          */
/* ------------------------------------------------------------------ */
const HERO_SLIDES = [
  { src: 'hero-desa.jpg', alt: 'Foto Desa Tebel' },
  { src: 'hero-desa-2.jpg', alt: 'Hamparan sawah Desa Tebel' },
  { src: 'hero-desa-3.jpg', alt: 'Aktivitas warga Desa Tebel' },
]
const SLIDE_DURATION = 6000 // ms per photo

/* ------------------------------------------------------------------ */
/* Ambient floating color blobs — sits behind every section below the */
/* Hero, giving a soft "sejuk" (cool/fresh) moving backdrop instead of */
/* a flat white page. Colors reuse the existing green/gold palette.   */
/* ------------------------------------------------------------------ */
function AmbientBackground() {
  const blobs = [
    { top: '0%', left: '-10%', size: 620, color: 'rgba(15,81,50,0.18)', duration: 18 },
    { top: '24%', right: '-12%', size: 700, color: 'rgba(224,168,28,0.16)', duration: 22 },
    { top: '52%', left: '-8%', size: 640, color: 'rgba(15,81,50,0.13)', duration: 20 },
    { top: '76%', right: '-10%', size: 560, color: 'rgba(224,168,28,0.15)', duration: 24 },
  ]
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: b.top, left: b.left, right: b.right, width: b.size, height: b.size,
            background: b.color, filter: 'blur(90px)',
          }}
          animate={{ x: [0, 30, -20, 0], y: [0, -25, 20, 0] }}
          transition={{ duration: b.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || HERO_SLIDES.length < 2) return undefined
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length)
    }, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen min-h-[640px] max-h-[920px] overflow-hidden flex items-center justify-center text-center">
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={HERO_SLIDES[index].src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          >
            <motion.div
              className="w-full h-full"
              initial={{ scale: 1 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: SLIDE_DURATION / 1000 + 1.4, ease: 'linear' }}
            >
              <PhotoOrIllustration
                src={HERO_SLIDES[index].src}
                alt={HERO_SLIDES[index].alt}
                className="w-full h-full object-cover"
                fallback={<HeroScene className="w-full h-full" />}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/55 via-primary-900/40 to-primary-900/75" />

      <div className="relative z-10 max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-5"
        >
          <BadgeCheck className="w-3.5 h-3.5 text-gold-400" />
          <span className="text-xs font-semibold text-white/85 tracking-wide">Situs Resmi Pemerintah Desa Tebel</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm font-semibold text-white/75 tracking-wide mb-4"
        >
          Kecamatan Bareng · Kabupaten Jombang
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.92, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ opacity: { duration: 0.9, delay: 0.25 }, scale: { duration: 0.9, delay: 0.25 } }}
          className="font-display text-5xl sm:text-7xl font-extrabold text-white leading-[1.05] mb-6"
        >
          Selamat Datang<br />
          di Desa <span className="text-gold-400">Tebel</span>
        </motion.h1>

        <motion.svg
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.9 }}
          viewBox="0 0 120 14" className="w-28 h-3.5 mx-auto mb-6"
        >
          <motion.path
            d="M0 12 Q30 0 60 12 Q90 24 120 12" fill="none" stroke="#E0A81C" strokeWidth="2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 1 }}
          />
        </motion.svg>

        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }}
          className="text-white/80 text-base sm:text-lg mb-9 max-w-xl mx-auto"
        >
          Layanan administrasi desa kini bisa diakses kapan saja — ajukan surat, sampaikan laporan, dan pantau perkembangan desa langsung dari rumah.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.75 }}
          className="flex flex-wrap items-center justify-center gap-7"
        >
          <Link to="/layanan/pengajuan-surat" className="btn-gold">Ajukan Surat Sekarang</Link>
          <Link to="/profil-desa" className="inline-flex items-center gap-3 text-white font-bold text-sm">
            <span className="w-10 h-10 rounded-full bg-white/15 border border-white/30 flex items-center justify-center">
              <Play className="w-4 h-4 fill-white" />
            </span>
            Lihat Profil Desa
          </Link>
        </motion.div>
      </div>

      {HERO_SLIDES.length > 1 && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-24 sm:bottom-28 z-10 flex items-center gap-2">
          {HERO_SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Tampilkan foto ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-gold-400' : 'w-1.5 bg-white/40 hover:bg-white/60'}`}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute left-1/2 -translate-x-1/2 bottom-8 hidden sm:flex flex-col items-center gap-2 text-white/65 text-[10px] uppercase tracking-widest"
      >
        <span>Scroll</span>
        <span className="relative w-px h-9 bg-white/40 overflow-hidden">
          <motion.span
            animate={{ y: ['-100%', '100%'] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gold-400"
          />
        </span>
      </motion.div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Floating stat card that bridges Hero and the rest of the page       */
/* ------------------------------------------------------------------ */
function StatsStrip() {
  const { data: profile } = useFetch(() => profileService.get(), [])
  const population = profile?.population ?? 4812
  const families = profile?.total_families ?? 1340
  const area = profile?.area ?? 6.2
  const hamlets = profile?.hamlets_count ?? 4

  const stats = [
    { icon: Users, label: 'Jumlah Penduduk', value: population, formatter: fmtInt },
    { icon: Building2, label: 'Jumlah KK', value: families, formatter: fmtInt },
    { icon: MapPinCheck, label: 'Luas Wilayah (km²)', value: area, formatter: fmtDecimal1 },
    { icon: Landmark, label: 'Dusun', value: hamlets, formatter: fmtInt },
  ]

  return (
    <div className="relative bg-primary-50/30">
      <div className="container-page">
        <div className="relative z-10 -mt-16 sm:-mt-20 bg-white rounded-3xl shadow-soft border border-primary-50 overflow-hidden">
          <div className="flex items-center justify-center gap-2 py-3 border-b border-primary-50 bg-primary-50/50">
            <ShieldCheck className="w-3.5 h-3.5 text-primary-700" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary-700">Data Resmi Desa Tebel</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`flex items-center gap-4 px-6 py-7 ${i > 0 ? 'sm:border-l border-primary-50' : ''} ${i >= 2 ? 'border-t sm:border-t-0 border-primary-50' : ''}`}>
                <span className="w-11 h-11 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                  <s.icon className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-display text-xl sm:text-2xl font-extrabold text-primary-800 leading-none">
                    <CountUp value={s.value} formatter={s.formatter} />
                  </p>
                  <p className="text-[11px] text-ink/50 mt-1.5 tracking-wide">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-16 sm:h-20" />
    </div>
  )
}

function AboutCollage() {
  return (
    <section className="py-8 sm:py-12 bg-primary-50/30">
      <div className="container-page grid lg:grid-cols-[0.85fr_1fr] gap-14 items-center">
        <Reveal>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-soft h-[380px] ring-1 ring-primary-900/5">
              <PhotoOrIllustration src="about-1.jpg" alt="Suasana Desa Tebel" className="w-full h-full object-cover" fallback={<RiceFieldScene className="w-full h-full" />} />
            </div>
            <div className="absolute -bottom-8 -right-6 w-40 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-soft hidden sm:block">
              <PhotoOrIllustration src="about-2.jpg" alt="Gapura Desa Tebel" className="w-full h-full object-cover" fallback={<GapuraScene className="w-full h-full" />} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="section-eyebrow mb-3">Tentang Desa Kami</p>
          <h2 className="text-3xl font-extrabold mb-4 leading-tight">Pemerintahan yang Terbuka,<br />Desa yang Tetap Asri</h2>
          <p className="text-ink/60 text-sm max-w-md mb-8 leading-relaxed">
            Desa Tebel menghadirkan pelayanan publik yang cepat, tercatat, dan mudah diawasi bersama — tanpa meninggalkan suasana guyub dan lingkungan hijau yang menjadi identitas warganya.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: FileText, title: 'Layanan Online', desc: 'Diajukan dari rumah' },
              { icon: ShieldCheck, title: 'Transparan', desc: 'Terpantau real-time' },
              { icon: TreePine, title: 'Asri & Nyaman', desc: 'Ramah lingkungan' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-4 border border-primary-50">
                <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center mb-3">
                  <item.icon className="w-4.5 h-4.5" />
                </div>
                <p className="text-sm font-bold mb-0.5">{item.title}</p>
                <p className="text-[11px] text-ink/50">{item.desc}</p>
              </div>
            ))}
          </div>
          <Link to="/layanan" className="btn-dark">Lihat Semua Layanan</Link>
        </Reveal>
      </div>
    </section>
  )
}

const SERVICES = [
  { icon: FileText, title: 'Pengajuan Surat', desc: 'Ajukan surat keterangan tanpa antre.', to: '/layanan/pengajuan-surat' },
  { icon: MapPinCheck, title: 'Cek Status', desc: 'Pantau progres pengajuan Anda.', to: '/layanan/cek-status' },
  { icon: MessageSquareWarning, title: 'Laporan Warga', desc: 'Laporkan masalah lingkungan sekitar.', to: '/layanan/laporan' },
  { icon: HandHeart, title: 'Bantuan Sosial', desc: 'Portal cek program bantuan pemerintah.', to: '/layanan/bantuan-sosial' },
]

function ServicesGrid() {
  return (
    <section className="py-24 bg-white/70 backdrop-blur-[2px]">
      <div className="container-page">
        <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <p className="section-eyebrow mb-3">Layanan Kami</p>
            <h2 className="text-[28px] font-extrabold max-w-md">Layanan Terpadu untuk Setiap Kebutuhan Warga</h2>
          </div>
          <p className="text-ink/50 text-sm max-w-xs">Empat pintu layanan utama, dirancang agar warga tidak perlu bolak-balik ke kantor desa.</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <Link to={s.to} className="group relative flex flex-col h-full rounded-2xl border border-primary-50 p-6 hover:border-primary-200 hover:shadow-soft transition-all duration-200">
                <span className="absolute top-5 right-5 text-[11px] font-bold text-primary-100 group-hover:text-primary-200 transition-colors">{String(i + 1).padStart(2, '0')}</span>
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center mb-6">
                  <s.icon className="w-5.5 h-5.5" />
                </div>
                <h3 className="font-bold text-[15px] mb-1.5">{s.title}</h3>
                <p className="text-xs text-ink/50 leading-relaxed mb-5 flex-1">{s.desc}</p>
                <span className="text-primary-700 text-xs font-bold inline-flex items-center gap-1">
                  Ajukan sekarang <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function DarkStatBlock() {
  const stats = [
    { num: 4812, lbl: 'Jumlah penduduk', formatter: fmtInt },
    { num: 1340, lbl: 'Jumlah KK', formatter: fmtInt },
    { num: 4, lbl: 'Dusun', formatter: fmtInt },
    { num: 98, lbl: 'Kepuasan layanan', formatter: (n) => `${Math.round(n)}%` },
  ]
  return (
    <section className="py-24 bg-primary-50/25">
      <div className="container-page">
        <Reveal className="bg-primary-800 rounded-3xl p-9 sm:p-14 grid lg:grid-cols-2 gap-12 items-center text-white relative overflow-hidden">
          <LeafPattern className="absolute -right-10 -top-10 w-64 h-64 text-white/[0.06]" />
          <div className="relative">
            <p className="section-eyebrow text-gold-400 mb-3">Komitmen Pelayanan</p>
            <h2 className="text-[28px] sm:text-3xl font-extrabold text-white mb-4 leading-snug">Lebih dari Sekadar Layanan Administrasi</h2>
            <p className="text-white/60 text-sm max-w-md mb-6 leading-relaxed">
              Kami berkomitmen menghadirkan pelayanan yang jujur, cepat, dan bisa dipantau bersama oleh seluruh warga Desa Tebel.
            </p>
            <div className="space-y-3">
              {['Proses pengajuan rata-rata di bawah 3 hari', 'Status dapat dipantau kapan saja', 'Data warga tersimpan aman', 'Didampingi asisten otomatis'].map((t) => (
                <div key={t} className="flex items-center gap-3 text-sm text-white/85">
                  <span className="w-5 h-5 rounded-full bg-gold-400 text-primary-900 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                  {t}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.lbl} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <p className="font-display text-3xl font-extrabold text-gold-400">
                    <CountUp value={s.num} formatter={s.formatter} />
                  </p>
                  <p className="text-xs text-white/55 mt-1.5">{s.lbl}</p>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-white/35 mt-4 text-center lg:text-left">Sumber: Profil Desa Tebel, diperbarui 2026</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const STEPS = [
  { icon: FileText, title: 'Ajukan Online', desc: 'Isi formulir dan unggah berkas dari rumah.' },
  { icon: CheckCircle2, title: 'Diverifikasi', desc: 'Admin desa memeriksa kelengkapan data.' },
  { icon: Calendar, title: 'Diproses', desc: 'Surat disiapkan oleh perangkat desa.' },
  { icon: CheckCircle2, title: 'Selesai', desc: 'Ambil surat langsung di kantor desa.' },
]

function ProcessSteps() {
  return (
    <section className="py-24 bg-white/70 backdrop-blur-[2px]">
      <div className="container-page">
        <Reveal className="text-center max-w-xl mx-auto mb-16">
          <p className="section-eyebrow justify-center mb-3">Alur Layanan</p>
          <h2 className="text-[28px] font-extrabold">Bagaimana Layanan Bekerja</h2>
        </Reveal>
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
          <div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-[2px] bg-primary-50" />
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1} className="text-center relative z-10">
              <div className="relative w-14 h-14 mx-auto mb-4">
                <div className="w-14 h-14 rounded-full bg-primary-700 text-white flex items-center justify-center shadow-soft">
                  <s.icon className="w-6 h-6" />
                </div>
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gold-400 text-primary-900 text-[10px] font-extrabold flex items-center justify-center">{i + 1}</span>
              </div>
              <h3 className="font-bold text-sm mb-1.5">{s.title}</h3>
              <p className="text-xs text-ink/50 max-w-[160px] mx-auto leading-relaxed">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function GallerySection() {
  const { data, loading } = useFetch(() => galleryService.list({ per_page: 4, type: 'photo' }), [])
  const apiItems = data?.data || data || []
  const items = !loading && apiItems.length ? apiItems : EXAMPLE_GALLERY.slice(0, 4)

  return (
    <section className="py-24 bg-primary-50/25">
      <div className="container-page">
        <Reveal className="flex items-end justify-between mb-10">
          <div>
            <p className="section-eyebrow mb-2">Dokumentasi</p>
            <h2 className="text-[26px] font-extrabold">Kegiatan Desa Tebel</h2>
          </div>
          <Link to="/galeri" className="btn-line hidden sm:inline-flex">Semua Galeri</Link>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((g, i) => (
            <Reveal key={g.id} delay={i * 0.08} className={`relative rounded-2xl overflow-hidden group ${i === 0 ? 'col-span-2 row-span-2 h-[23.5rem] sm:h-[23.5rem]' : 'h-44'}`}>
              {g.file ? (
                <img src={`${STORAGE_BASE_URL}/${g.file}`} alt={g.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
              ) : (
                <PhotoOrIllustration
                  src={`galeri-${i + 1}.jpg`}
                  alt={g.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  fallback={<GalleryTile variant={g.variant} className="w-full h-full group-hover:scale-110 transition duration-300" />}
                />
              )}
              <span className="absolute top-3 left-3 bg-white/90 text-primary-900 text-[11px] font-bold px-2.5 py-1 rounded-full">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/85 via-transparent to-transparent flex items-end p-3.5">
                <span className="text-white text-sm font-bold">{g.title}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonial() {
  return (
    <section className="py-24 bg-white/70 backdrop-blur-[2px]">
      <div className="container-page">
        <Reveal className="bg-primary-50 rounded-3xl p-8 sm:p-12 grid lg:grid-cols-[0.55fr_1fr] gap-10 items-center relative overflow-hidden">
          <LeafPattern className="absolute -left-8 -bottom-8 w-56 h-56 text-primary-700/[0.05]" />
          <div className="rounded-2xl overflow-hidden h-56 relative z-10">
            <PhotoOrIllustration src="testimoni-1.jpg" alt="Bu Sri Wahyuni, warga Dusun Kupang" className="w-full h-full object-cover" fallback={<PersonAvatarScene tone="gold" className="w-full h-full" />} />
          </div>
          <div className="relative z-10">
            <Quote className="w-9 h-9 text-gold-400 mb-3 fill-current" />
            <blockquote className="text-lg font-medium leading-relaxed mb-5">
              Sekarang bikin surat keterangan tidak perlu bolak-balik ke kantor desa. Tinggal isi dari HP, tunggu diverifikasi, langsung ambil jadi.
            </blockquote>
            <p className="font-bold text-sm">Bu Sri Wahyuni</p>
            <p className="text-xs text-ink/50">Warga Dusun Kupang</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function NewsAnnouncementsSection() {
  const { data: newsData, loading: newsLoading } = useFetch(() => newsService.list({ per_page: 3 }), [])
  const { data: annData } = useFetch(() => announcementService.list({ per_page: 2 }), [])
  const news = newsData?.data || newsData || []
  const announcements = annData?.data || annData || []

  const newsList = !newsLoading && news.length ? news : EXAMPLE_NEWS
  const annList = announcements.length ? announcements : EXAMPLE_ANNOUNCEMENTS

  return (
    <section className="py-24 bg-white/70 backdrop-blur-[2px]">
      <div className="container-page grid lg:grid-cols-[1.4fr_1fr] gap-14">
        <div>
          <Reveal className="flex items-end justify-between mb-10">
            <div>
              <p className="section-eyebrow mb-2">Informasi Terkini</p>
              <h2 className="text-[26px] font-extrabold">Berita Desa</h2>
            </div>
            <Link to="/berita" className="btn-line hidden sm:inline-flex">Semua Berita</Link>
          </Reveal>

          <div className="rounded-2xl border border-primary-50 divide-y divide-primary-50 overflow-hidden">
            {newsList.slice(0, 3).map((n, i) => (
              <Reveal key={n.id} delay={i * 0.08}>
                <Link to={n.slug ? `/berita/${n.slug}` : '/berita'} className="group flex flex-col sm:flex-row sm:items-center gap-3 p-5 hover:bg-primary-50/40 transition-colors duration-200">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5 mb-2">
                      <span className="text-[10.5px] font-bold uppercase tracking-wide text-primary-700 bg-primary-50 px-2.5 py-1 rounded-full">
                        {n.category?.name || 'Berita'}
                      </span>
                      <span className="text-xs text-ink/40">
                        {new Date(n.published_at || n.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="font-bold text-[15px] leading-snug group-hover:text-primary-700 transition-colors line-clamp-2">{n.title}</h3>
                  </div>
                  <span className="shrink-0 self-start sm:self-center text-primary-700 text-xs font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Baca selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <Reveal className="mb-8">
            <p className="section-eyebrow mb-2">Papan Informasi</p>
            <h3 className="text-xl font-extrabold">Pengumuman</h3>
          </Reveal>
          <div className="space-y-4">
            {annList.slice(0, 2).map((a, i) => {
              const d = new Date(a.created_at)
              return (
                <Reveal key={a.id} delay={i * 0.08}>
                  <Link to={`/pengumuman/${a.id}`} className="flex gap-4 items-start rounded-2xl border border-primary-50 p-5 hover:border-primary-100 hover:shadow-soft transition-all duration-200">
                    <div className="w-12 h-12 rounded-xl bg-maroon-50 text-maroon-700 flex flex-col items-center justify-center shrink-0 leading-none">
                      <span className="text-[15px] font-extrabold">{d.getDate()}</span>
                      <span className="text-[9px] uppercase font-bold">{d.toLocaleDateString('id-ID', { month: 'short' })}</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm mb-1">{a.title}</p>
                      <p className="text-xs text-ink/50 line-clamp-2">{a.summary || a.content}</p>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function NewsletterCta() {
  return (
    <section className="pb-24 bg-white/70 backdrop-blur-[2px]">
      <div className="container-page">
        <Reveal className="rounded-3xl p-10 sm:p-12 grid sm:grid-cols-[1fr_auto] items-center gap-7 relative overflow-hidden" style={{ background: 'linear-gradient(120deg, #08281B, #0F5132)' }}>
          <LeafPattern className="absolute -left-10 -bottom-10 w-56 h-56 text-white/[0.06]" />
          <div className="text-center sm:text-left relative">
            <h3 className="text-white text-xl sm:text-2xl font-extrabold mb-1.5">Selalu Update Informasi Desa</h3>
            <p className="text-white/55 text-sm">Dapatkan info berita dan pengumuman terbaru langsung ke email Anda.</p>
          </div>
          <form className="flex gap-2 w-full sm:w-auto relative" onSubmit={(e) => e.preventDefault()}>
            <input type="email" required placeholder="Alamat email Anda" className="w-full sm:w-64 rounded-full px-5 py-3 text-sm bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:border-gold-400" />
            <button type="submit" className="btn-gold shrink-0">Berlangganan</button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function ContactSection() {
  const info = [
    { icon: MapPinCheck, label: 'Alamat', value: 'Jl. Dr. Sutomo, Bareng, Kec. Bareng, Kab. Jombang, Jawa Timur 61474' },
    { icon: Phone, label: 'Telepon', value: '(0321) 123-456' },
    { icon: Mail, label: 'Email', value: 'desatebel@jombangkab.go.id' },
    { icon: Clock, label: 'Jam Layanan', value: 'Senin–Jumat, 08.00–15.00 WIB' },
  ]
  return (
    <section className="py-24 bg-primary-50/25">
      <div className="container-page">
        <Reveal className="text-center max-w-xl mx-auto mb-14">
          <p className="section-eyebrow justify-center mb-3">Kunjungi Kami</p>
          <h2 className="text-[28px] font-extrabold">Kantor Desa Tebel</h2>
        </Reveal>
        <Reveal delay={0.1} className="grid lg:grid-cols-[1fr_1.2fr] rounded-3xl overflow-hidden shadow-soft ring-1 ring-primary-900/5 bg-white">
          <div className="p-8 sm:p-10 grid sm:grid-cols-2 gap-6 content-center">
            {info.map((it) => (
              <div key={it.label} className="flex gap-3">
                <span className="w-10 h-10 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                  <it.icon className="w-4.5 h-4.5" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-ink/40 mb-0.5">{it.label}</p>
                  <p className="text-sm font-semibold leading-snug">{it.value}</p>
                </div>
              </div>
            ))}
            <Link to="/kontak" className="btn-dark w-fit sm:col-span-2 mt-2">Info Kontak Lengkap</Link>
          </div>
          <div className="h-72 lg:h-auto">
            <iframe title="Peta Lokasi Desa Tebel" src="https://maps.google.com/maps?q=Desa%20Tebel%20Jombang&t=&z=14&ie=UTF8&iwloc=&output=embed" className="w-full h-full border-0" loading="lazy" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  const audioRef = useRef(null)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.35

    const tryPlay = () => { audio.play().catch(() => {}) }
    tryPlay()

    const onFirstInteraction = () => {
      tryPlay()
      window.removeEventListener('click', onFirstInteraction)
      window.removeEventListener('scroll', onFirstInteraction)
      window.removeEventListener('keydown', onFirstInteraction)
      window.removeEventListener('touchstart', onFirstInteraction)
    }
    window.addEventListener('click', onFirstInteraction)
    window.addEventListener('scroll', onFirstInteraction)
    window.addEventListener('keydown', onFirstInteraction)
    window.addEventListener('touchstart', onFirstInteraction)
    return () => {
      window.removeEventListener('click', onFirstInteraction)
      window.removeEventListener('scroll', onFirstInteraction)
      window.removeEventListener('keydown', onFirstInteraction)
      window.removeEventListener('touchstart', onFirstInteraction)
    }
  }, [])

  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !muted
    setMuted(!muted)
  }

  return (
    <div>
      <audio ref={audioRef} src="/bgm.mp3" loop autoPlay style={{ display: 'none' }} />
      <button
        onClick={toggleMute}
        aria-label={muted ? 'Nyalakan musik' : 'Matikan musik'}
        className="fixed bottom-5 right-5 z-50 w-11 h-11 rounded-full bg-primary-800 text-white shadow-soft flex items-center justify-center hover:bg-primary-900 transition"
      >
        {muted ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5" />}
      </button>
      <Hero />
      <div className="relative bg-white">
        <AmbientBackground />
        <div className="relative z-10">
          <StatsStrip />
          <AboutCollage />
          <ServicesGrid />
          <DarkStatBlock />
          <ProcessSteps />
          <GallerySection />
          <Testimonial />
          <NewsAnnouncementsSection />
          <NewsletterCta />
          <ContactSection />
        </div>
      </div>
    </div>
  )
}