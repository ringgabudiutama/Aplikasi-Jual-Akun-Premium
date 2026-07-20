import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import Pagination from '../../components/common/Pagination'
import EmptyState from '../../components/common/EmptyState'
import Reveal from '../../components/common/Reveal'
import { SkeletonGrid } from '../../components/common/Skeleton'
import useFetch from '../../hooks/useFetch'
import useDebounce from '../../hooks/useDebounce'
import newsService from '../../services/newsService'
import { STORAGE_BASE_URL } from '../../utils/constants'
import { EXAMPLE_NEWS } from '../../utils/exampleContent'

const TONE_BG = { primary: 'bg-primary-700', gold: 'bg-gold-400', maroon: 'bg-maroon-700' }
const CATEGORY_OPTIONS = [
  { id: 1, name: 'Pembangunan', slug: 'pembangunan' },
  { id: 2, name: 'Kegiatan', slug: 'kegiatan' },
  { id: 3, name: 'Pemerintahan', slug: 'pemerintahan' },
]

export default function BeritaList() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebounce(search)

  const { data: categories } = useFetch(() => newsService.categories(), [])
  const { data, loading } = useFetch(
    () => newsService.list({ search: debouncedSearch, category, page, per_page: 9 }),
    [debouncedSearch, category, page]
  )

  const apiItems = data?.data || []
  const meta = data?.meta || { current_page: 1, last_page: 1 }
  const usingExample = !loading && apiItems.length === 0

  const items = useMemo(() => {
    if (!usingExample) return apiItems
    return EXAMPLE_NEWS.filter((n) => {
      const matchesSearch = !debouncedSearch || n.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      const matchesCategory = !category || n.category.slug === category
      return matchesSearch && matchesCategory
    })
  }, [usingExample, apiItems, debouncedSearch, category])

  const categoryList = categories?.length ? categories : CATEGORY_OPTIONS

  return (
    <div>
      <PageHeader eyebrow="Informasi Terkini" title="Berita Desa Tebel" description="Kumpulan berita dan kegiatan terbaru dari Desa Tebel." breadcrumbs={[{ label: 'Berita' }]} />

      <div className="container-page py-12">
        {usingExample && (
          <p className="text-xs text-gold-600 bg-gold-50 border border-gold-100 rounded-lg px-4 py-2.5 mb-6 inline-block">
            Menampilkan berita contoh. Kelola berita sungguhan melalui Dashboard Admin.
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
            <input
              className="input-field pl-10"
              placeholder="Cari berita..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            />
          </div>
          <select className="input-field sm:w-56" value={category} onChange={(e) => { setCategory(e.target.value); setPage(1) }}>
            <option value="">Semua Kategori</option>
            {categoryList.map((c) => (
              <option key={c.id} value={c.slug || c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <SkeletonGrid count={9} />
        ) : items.length === 0 ? (
          <EmptyState title="Berita tidak ditemukan" description="Coba ubah kata kunci pencarian atau kategori." />
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((n, i) => (
                <Reveal key={n.id} delay={i * 0.05}>
                  <Link to={`/berita/${n.slug}`} className="card group block h-full">
                    <div className={`h-44 overflow-hidden relative ${n.thumbnail ? 'bg-primary-50' : TONE_BG[n.tone] || 'bg-primary-700'}`}>
                      {n.thumbnail && <img src={`${STORAGE_BASE_URL}/${n.thumbnail}`} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />}
                      <span className="absolute top-3 left-3 bg-white/95 text-primary-900 text-[10.5px] font-bold px-2.5 py-1 rounded-full">
                        {n.category?.name || 'Berita'}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-base mb-2 line-clamp-2">{n.title}</h3>
                      {n.excerpt && <p className="text-xs text-ink/50 line-clamp-2 mb-2.5">{n.excerpt}</p>}
                      <p className="text-xs text-ink/40">{new Date(n.published_at || n.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
            {!usingExample && <Pagination currentPage={meta.current_page} lastPage={meta.last_page} onChange={setPage} />}
          </>
        )}
      </div>
    </div>
  )
}
