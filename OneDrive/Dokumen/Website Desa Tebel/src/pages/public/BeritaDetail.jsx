import { useParams, Link } from 'react-router-dom'
import { Calendar, ArrowLeft } from 'lucide-react'
import useFetch from '../../hooks/useFetch'
import newsService from '../../services/newsService'
import PageLoader from '../../components/common/PageLoader'
import { GalleryTile } from '../../components/public/VillageScene'
import { STORAGE_BASE_URL } from '../../utils/constants'
import { EXAMPLE_NEWS } from '../../utils/exampleContent'

const TONE_VARIANT = { primary: 'balai', gold: 'posyandu', maroon: 'panen' }

export default function BeritaDetail() {
  const { slug } = useParams()
  const { data: apiNews, loading } = useFetch(() => newsService.detail(slug), [slug])

  const news = apiNews || EXAMPLE_NEWS.find((n) => n.slug === slug)

  if (loading) return <PageLoader />
  if (!news) {
    return (
      <div className="container-page py-20 text-center">
        <p className="text-ink/50 mb-4">Berita tidak ditemukan.</p>
        <Link to="/berita" className="btn-primary inline-flex">Kembali ke Berita</Link>
      </div>
    )
  }

  return (
    <div className="container-page py-12 max-w-3xl">
      <Link to="/berita" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-700 mb-6 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Berita
      </Link>
      <p className="text-xs text-gold-600 font-bold uppercase tracking-wide mb-2">{news.category?.name || 'Berita'}</p>
      <h1 className="font-display text-3xl font-extrabold mb-3">{news.title}</h1>
      <div className="flex items-center gap-2 text-sm text-ink/50 mb-6">
        <Calendar className="w-4 h-4" />
        {new Date(news.published_at || news.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
      </div>
      <div className="w-full h-72 rounded-xl2 overflow-hidden mb-8 shadow-card">
        {news.thumbnail ? (
          <img src={`${STORAGE_BASE_URL}/${news.thumbnail}`} alt={news.title} className="w-full h-full object-cover" />
        ) : (
          <GalleryTile variant={TONE_VARIANT[news.tone] || 'balai'} className="w-full h-full" />
        )}
      </div>
      <div className="prose max-w-none text-ink/80 leading-relaxed whitespace-pre-line">{news.content}</div>
    </div>
  )
}
