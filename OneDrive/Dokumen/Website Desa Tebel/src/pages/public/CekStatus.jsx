import { useState } from 'react'
import { Search, CheckCircle2, Clock, XCircle, Loader2 } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import useToast from '../../hooks/useToast'
import serviceRequestService from '../../services/serviceRequestService'
import { REQUEST_STATUS } from '../../utils/constants'

const STEPS = ['menunggu', 'diproses', 'selesai']

function Timeline({ status, history = [] }) {
  if (status === 'ditolak') {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
        <XCircle className="w-6 h-6 text-red-600 shrink-0" />
        <div>
          <p className="font-semibold text-red-700">Pengajuan Ditolak</p>
          {history.find((h) => h.status === 'ditolak')?.note && (
            <p className="text-sm text-red-600 mt-0.5">{history.find((h) => h.status === 'ditolak').note}</p>
          )}
        </div>
      </div>
    )
  }

  const currentIndex = STEPS.indexOf(status)

  return (
    <div className="flex items-start justify-between relative">
      {STEPS.map((step, i) => {
        const done = i <= currentIndex
        const Icon = i < currentIndex ? CheckCircle2 : i === currentIndex ? Loader2 : Clock
        return (
          <div key={step} className="flex-1 flex flex-col items-center text-center relative z-10">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-2 ${done ? 'bg-primary text-white' : 'bg-primary-50 text-primary-300'}`}>
              <Icon className={`w-5 h-5 ${i === currentIndex && status !== 'selesai' ? 'animate-spin' : ''}`} />
            </div>
            <p className={`text-xs font-semibold ${done ? 'text-ink' : 'text-ink/40'}`}>{REQUEST_STATUS[step].label}</p>
            {i < STEPS.length - 1 && (
              <div className={`absolute top-5 left-1/2 w-full h-0.5 ${i < currentIndex ? 'bg-primary' : 'bg-primary-100'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function CekStatus() {
  const [mode, setMode] = useState('tracking')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const toast = useToast()

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setNotFound(false)
    setResult(null)
    try {
      const params = mode === 'tracking' ? { tracking_number: query } : { nik: query }
      const { data } = await serviceRequestService.checkStatus(params)
      const items = Array.isArray(data.data) ? data.data : [data.data]
      if (!items.length || !items[0]) {
        setNotFound(true)
      } else {
        setResult(items)
      }
    } catch {
      setNotFound(true)
      toast.error('Data pengajuan tidak ditemukan.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Layanan Surat"
        title="Cek Status Pengajuan"
        description="Masukkan nomor pengajuan atau NIK untuk melihat progres surat Anda."
        breadcrumbs={[{ label: 'Layanan', to: '/layanan' }, { label: 'Cek Status' }]}
      />

      <div className="container-page py-12 max-w-2xl">
        <div className="flex gap-2 mb-5">
          <button onClick={() => setMode('tracking')} className={`btn ${mode === 'tracking' ? 'btn-primary' : 'btn-outline'}`}>Nomor Pengajuan</button>
          <button onClick={() => setMode('nik')} className={`btn ${mode === 'nik' ? 'btn-primary' : 'btn-outline'}`}>NIK</button>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <input
            className="input-field"
            placeholder={mode === 'tracking' ? 'Contoh: STB-20260717-0001' : 'Masukkan 16 digit NIK'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" disabled={loading} className="btn-primary shrink-0">
            <Search className="w-4 h-4" /> Cari
          </button>
        </form>

        {notFound && (
          <div className="card p-6 text-center text-ink/60">Data pengajuan tidak ditemukan. Periksa kembali nomor atau NIK Anda.</div>
        )}

        {result && (
          <div className="space-y-5">
            {result.map((item) => (
              <div key={item.id} className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="font-display font-bold text-lg">{item.tracking_number}</p>
                    <p className="text-sm text-ink/50">{item.type_label || item.type} — {item.name}</p>
                  </div>
                  <span className={REQUEST_STATUS[item.status]?.className}>{REQUEST_STATUS[item.status]?.label}</span>
                </div>
                <Timeline status={item.status} history={item.history} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
