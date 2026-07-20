import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar } from 'lucide-react'
import useFetch from '../../hooks/useFetch'
import announcementService from '../../services/announcementService'
import PageLoader from '../../components/common/PageLoader'
import { EXAMPLE_ANNOUNCEMENTS } from '../../utils/exampleContent'

export default function PengumumanDetail() {
  const { id } = useParams()
  const { data: apiItem, loading } = useFetch(() => announcementService.detail(id), [id])
  const item = apiItem || EXAMPLE_ANNOUNCEMENTS.find((a) => String(a.id) === String(id))

  if (loading) return <PageLoader />
  if (!item) {
    return (
      <div className="container-page py-20 text-center">
        <p className="text-ink/50 mb-4">Pengumuman tidak ditemukan.</p>
        <Link to="/pengumuman" className="btn-primary inline-flex">Kembali ke Pengumuman</Link>
      </div>
    )
  }

  return (
    <div className="container-page py-12 max-w-3xl">
      <Link to="/pengumuman" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-700 mb-6 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Pengumuman
      </Link>
      <h1 className="font-display text-3xl font-extrabold mb-3">{item.title}</h1>
      <div className="flex items-center gap-2 text-sm text-ink/50 mb-8">
        <Calendar className="w-4 h-4" /> {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
      </div>
      <div className="prose max-w-none text-ink/80 leading-relaxed whitespace-pre-line">{item.content}</div>
    </div>
  )
}
