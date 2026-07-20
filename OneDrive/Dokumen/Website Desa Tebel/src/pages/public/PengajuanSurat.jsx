import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Send, CheckCircle2 } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import { TextField, TextareaField, SelectField, FileField } from '../../components/common/FormField'
import useToast from '../../hooks/useToast'
import serviceRequestService from '../../services/serviceRequestService'
import { SURAT_TYPES } from '../../utils/constants'

export default function PengajuanSurat() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const toast = useToast()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('nik', values.nik)
      formData.append('phone', values.phone)
      formData.append('address', values.address)
      formData.append('type', values.type)
      formData.append('purpose', values.purpose)
      if (values.ktp?.[0]) formData.append('ktp_file', values.ktp[0])
      if (values.kk?.[0]) formData.append('kk_file', values.kk[0])
      if (values.supporting?.[0]) formData.append('supporting_file', values.supporting[0])

      const { data } = await serviceRequestService.submit(formData)
      setResult(data.data)
      toast.success('Pengajuan surat berhasil dikirim!')
      reset()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal mengirim pengajuan. Periksa kembali data Anda.')
    } finally {
      setSubmitting(false)
    }
  }

  if (result) {
    return (
      <div className="container-page py-16 max-w-lg text-center">
        <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h1 className="font-display text-2xl font-bold mb-2">Pengajuan Berhasil Dikirim</h1>
        <p className="text-ink/60 mb-6">Simpan nomor pengajuan Anda untuk memantau status surat.</p>
        <div className="card p-6 mb-6">
          <p className="text-xs text-ink/50 uppercase tracking-wide mb-1">Nomor Pengajuan</p>
          <p className="font-display text-2xl font-bold text-primary tracking-wider">{result.tracking_number}</p>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate('/layanan/cek-status')} className="btn-primary">Cek Status</button>
          <button onClick={() => setResult(null)} className="btn-outline">Ajukan Surat Lain</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        eyebrow="Layanan Surat"
        title="Pengajuan Surat"
        description="Lengkapi formulir berikut untuk mengajukan surat keterangan. Berkas akan diverifikasi oleh admin desa."
        breadcrumbs={[{ label: 'Layanan', to: '/layanan' }, { label: 'Pengajuan Surat' }]}
      />

      <div className="container-page py-12 max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="card p-6 sm:p-8 space-y-5">
          <SelectField
            label="Jenis Surat" name="type" required options={SURAT_TYPES}
            error={errors.type}
            {...register('type', { required: 'Jenis surat wajib dipilih' })}
          />
          <div className="grid sm:grid-cols-2 gap-5">
            <TextField label="Nama Lengkap" name="name" required placeholder="Sesuai KTP" error={errors.name}
              {...register('name', { required: 'Nama wajib diisi' })} />
            <TextField label="NIK" name="nik" required placeholder="16 digit NIK" error={errors.nik}
              {...register('nik', { required: 'NIK wajib diisi', minLength: { value: 16, message: 'NIK harus 16 digit' }, maxLength: { value: 16, message: 'NIK harus 16 digit' } })} />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <TextField label="Nomor HP / WhatsApp" name="phone" required placeholder="08xxxxxxxxxx" error={errors.phone}
              {...register('phone', { required: 'Nomor HP wajib diisi' })} />
          </div>
          <TextareaField label="Alamat" name="address" required placeholder="Alamat lengkap sesuai domisili" error={errors.address}
            {...register('address', { required: 'Alamat wajib diisi' })} />
          <TextareaField label="Keperluan" name="purpose" required placeholder="Jelaskan keperluan surat ini" error={errors.purpose}
            {...register('purpose', { required: 'Keperluan wajib diisi' })} />

          <div className="grid sm:grid-cols-2 gap-5">
            <FileField label="Upload KTP" name="ktp" required accept="image/*,.pdf" error={errors.ktp}
              {...register('ktp', { required: 'File KTP wajib diunggah' })} />
            <FileField label="Upload KK" name="kk" required accept="image/*,.pdf" error={errors.kk}
              {...register('kk', { required: 'File KK wajib diunggah' })} />
          </div>
          <FileField label="Dokumen Pendukung (opsional)" name="supporting" accept="image/*,.pdf"
            hint="Contoh: surat pengantar RT/RW, jika ada" {...register('supporting')} />

          <button type="submit" disabled={submitting} className="btn-primary w-full">
            <Send className="w-4 h-4" /> {submitting ? 'Mengirim...' : 'Kirim Pengajuan'}
          </button>
        </form>
      </div>
    </div>
  )
}
