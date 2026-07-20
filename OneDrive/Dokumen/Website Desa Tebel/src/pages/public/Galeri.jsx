import { useState, useMemo } from 'react'
import { X, Image as ImageIcon, Video } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import { SkeletonGrid } from '../../components/common/Skeleton'
import EmptyState from '../../components/common/EmptyState'
import Reveal from '../../components/common/Reveal'
import PhotoOrIllustration from '../../components/public/PhotoOrIllustration'
import { GalleryTile } from '../../components/public/VillageScene'
import useFetch from '../../hooks/useFetch'
import galleryService from '../../services/galleryService'
import { STORAGE_BASE_URL } from '../../utils/constants'
import { EXAMPLE_GALLERY } from '../../utils/exampleContent'

export default function Galeri() {
  const [type, setType] = useState('photo')
  const [preview, setPreview] = useState(null)
  const { data, loading } = useFetch(() => galleryService.list({ type, per_page: 24 }), [type])
  const apiItems = data?.data || data || []
  const usingExample = !loading && apiItems.length === 0 && type === 'photo'
  const items = useMemo(() => (usingExample ? EXAMPLE_GALLERY : apiItems), [usingExample, apiItems])

  return (
    <div>
      <PageHeader eyebrow="Dokumentasi" title="Galeri Desa" description="Kumpulan foto dan video kegiatan Desa Tebel." breadcrumbs={[{ label: 'Galeri' }]} />
      <div className="container-page py-12">
        {usingExample && (
          <p className="text-xs text-gold-600 bg-gold-50 border border-gold-100 rounded-lg px-4 py-2.5 mb-6 inline-block">
            Menampilkan galeri contoh — sama seperti pratinjau di Beranda. Kelola foto/video sungguhan melalui Dashboard Admin.
          </p>
        )}
        <div className="flex gap-2 mb-8">
          <button onClick={() => setType('photo')} className={`btn ${type === 'photo' ? 'btn-dark' : 'btn-line'}`}>
            <ImageIcon className="w-4 h-4" /> Foto
          </button>
          <button onClick={() => setType('video')} className={`btn ${type === 'video' ? 'btn-dark' : 'btn-line'}`}>
            <Video className="w-4 h-4" /> Video
          </button>
        </div>

        {loading ? (
          <SkeletonGrid count={8} />
        ) : items.length === 0 ? (
          <EmptyState title={type === 'video' ? 'Belum ada video' : 'Belum ada foto'} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((g, i) =>
              type === 'photo' ? (
                <Reveal key={g.id} delay={i * 0.04}>
                  <button onClick={() => setPreview(g)} className="aspect-square rounded-xl overflow-hidden bg-primary-50 w-full group relative">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent flex items-end p-3 opacity-0 group-hover:opacity-100 transition">
                      <span className="text-white text-xs font-bold text-left">{g.title}</span>
                    </div>
                  </button>
                </Reveal>
              ) : (
                <div key={g.id} className="aspect-video rounded-xl overflow-hidden bg-black col-span-2">
                  <video src={`${STORAGE_BASE_URL}/${g.file}`} controls className="w-full h-full" />
                </div>
              )
            )}
          </div>
        )}
      </div>

      {preview && (
        <div className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-6" onClick={() => setPreview(null)}>
          <button className="absolute top-6 right-6 text-white" onClick={() => setPreview(null)} aria-label="Tutup"><X className="w-8 h-8" /></button>
          <div className="max-h-[85vh] max-w-2xl w-full aspect-video rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {preview.file ? (
              <img src={`${STORAGE_BASE_URL}/${preview.file}`} alt={preview.title} className="w-full h-full object-contain" />
            ) : (
              <GalleryTile variant={preview.variant} className="w-full h-full" />
            )}
          </div>
          <p className="absolute bottom-8 text-white text-sm font-bold">{preview.title}</p>
        </div>
      )}
    </div>
  )
}
