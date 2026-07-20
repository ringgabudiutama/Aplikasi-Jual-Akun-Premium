import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Send, CheckCircle2, Search } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import { TextField, TextareaField, SelectField, FileField } from '../../components/common/FormField'
import useToast from '../../hooks/useToast'
import reportService from '../../services/reportService'
import { REPORT_CATEGORIES, REPORT_STATUS } from '../../utils/constants'

function ReportForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const toast = useToast()

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const formData = new FormData()
      Object.entries(values).forEach(([key, val]) => {
        if (key === 'photo') {
          if (val?.[0]) formData.append('photo', val[0])
        } else {
          formData.append(key, val)
        }
      })
      const { data } = await reportService.submit(formData)
      setResult(data.data)
      toast.success('Laporan berhasil dikirim!')
      reset()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal mengirim laporan.')
    } finally {
      setSubmitting(false)
    }
  }

  if (result) {
    return (
      <div className="card p-8 text-center">
        <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-3" />
        <h3 className="font-display text-xl font-bold mb-1">Laporan Terkirim</h3>
        <p className="text-ink/60 mb-4">Nomor laporan Anda:</p>
        <p className="font-display text-xl font-bold text-primary mb-6">{result.tracking_number}</p>
        <button onClick={() => setResult(null)} className="btn-outline">Buat Laporan Lain</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-6 sm:p-8 space-y-5">
      <SelectField label="Kategori Laporan" name="category" required options={REPORT_CATEGORIES} error={errors.category}
        {...register('category', { required: 'Kategori wajib dipilih' })} />
      <div className="grid sm:grid-cols-2 gap-5">
        <TextField label="Nama Pelapor" name="name" required error={errors.name}
          {...register('name', { required: 'Nama wajib diisi' })} />
        <TextField label="Nomor HP" name="phone" required error={errors.phone}
          {...register('phone', { required: 'Nomor HP wajib diisi' })} />
      </div>
      <TextField label="Lokasi Kejadian" name="location" required placeholder="Contoh: RT 03 / RW 02, Dusun Krajan" error={errors.location}
        {...register('location', { required: 'Lokasi wajib diisi' })} />
      <TextareaField label="Deskripsi" name="description" required rows={5} placeholder="Jelaskan detail kejadian atau masalah yang ditemukan"
        error={errors.description} {...register('description', { required: 'Deskripsi wajib diisi' })} />
      <FileField label="Foto Bukti (opsional)" name="photo" accept="image/*" {...register('photo')} />
      <button type="submit" disabled={submitting} className="btn-primary w-full">
        <Send className="w-4 h-4" /> {submitting ? 'Mengirim...' : 'Kirim Laporan'}
      </button>
    </form>
  )
}

function ReportCheck() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const toast = useToast()

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setNotFound(false)
    setResult(null)
    try {
      const { data } = await reportService.checkStatus({ tracking_number: query })
      setResult(data.data)
    } catch {
      setNotFound(true)
      toast.error('Laporan tidak ditemukan.')
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input className="input-field" placeholder="Masukkan nomor laporan" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit" className="btn-primary shrink-0"><Search className="w-4 h-4" /> Cari</button>
      </form>
      {notFound && <div className="card p-6 text-center text-ink/60">Laporan tidak ditemukan.</div>}
      {result && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="font-display font-bold text-lg">{result.tracking_number}</p>
            <span className={REPORT_STATUS[result.status]?.className}>{REPORT_STATUS[result.status]?.label}</span>
          </div>
          <p className="text-sm text-ink/60 mb-2"><strong>Kategori:</strong> {result.category}</p>
          <p className="text-sm text-ink/60 mb-2"><strong>Lokasi:</strong> {result.location}</p>
          <p className="text-sm text-ink/60">{result.description}</p>
          {result.admin_comment && (
            <div className="mt-4 p-3 bg-primary-50 rounded-lg text-sm text-primary-700">
              <strong>Tanggapan Admin:</strong> {result.admin_comment}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function LaporanMasyarakat() {
  const [tab, setTab] = useState('lapor')

  return (
    <div>
      <PageHeader
        eyebrow="Layanan Warga"
        title="Laporan Masyarakat"
        description="Sampaikan laporan terkait infrastruktur, lingkungan, atau keamanan di sekitar Anda."
        breadcrumbs={[{ label: 'Layanan', to: '/layanan' }, { label: 'Laporan Masyarakat' }]}
      />
      <div className="container-page py-12 max-w-2xl">
        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab('lapor')} className={`btn ${tab === 'lapor' ? 'btn-primary' : 'btn-outline'}`}>Buat Laporan</button>
          <button onClick={() => setTab('cek')} className={`btn ${tab === 'cek' ? 'btn-primary' : 'btn-outline'}`}>Cek Status Laporan</button>
        </div>
        {tab === 'lapor' ? <ReportForm /> : <ReportCheck />}
      </div>
    </div>
  )
}
