import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Save } from 'lucide-react'
import { TextField, TextareaField } from '../../components/common/FormField'
import PageLoader from '../../components/common/PageLoader'
import useFetch from '../../hooks/useFetch'
import useToast from '../../hooks/useToast'
import settingsService from '../../services/settingsService'

export default function Pengaturan() {
  const { data: settings, loading, refetch } = useFetch(() => settingsService.get(), [])
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()

  useEffect(() => {
    if (settings) reset(settings)
  }, [settings, reset])

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      await settingsService.update(values)
      toast.success('Pengaturan berhasil disimpan.')
      refetch()
    } catch {
      toast.error('Gagal menyimpan pengaturan.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <PageLoader />

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-6 sm:p-8 space-y-5 max-w-2xl">
      <h3 className="font-display font-semibold text-lg mb-2">Informasi Desa</h3>
      <TextField label="Nama Desa" name="village_name" error={errors.village_name} {...register('village_name')} />
      <TextField label="Nama Kecamatan" name="district_name" error={errors.district_name} {...register('district_name')} />
      <TextField label="Nama Kabupaten" name="regency_name" error={errors.regency_name} {...register('regency_name')} />
      <TextareaField label="Alamat Kantor Desa" name="office_address" rows={3} error={errors.office_address} {...register('office_address')} />
      <div className="grid sm:grid-cols-2 gap-5">
        <TextField label="Nomor Telepon" name="phone" error={errors.phone} {...register('phone')} />
        <TextField label="Email Resmi" name="email" type="email" error={errors.email} {...register('email')} />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <TextField label="Jam Operasional" name="office_hours" placeholder="Senin–Jumat, 08.00–15.00 WIB" error={errors.office_hours} {...register('office_hours')} />
        <TextField label="Link Google Maps" name="maps_url" error={errors.maps_url} {...register('maps_url')} />
      </div>

      <h3 className="font-display font-semibold text-lg mb-2 pt-4 border-t border-primary-50">Media Sosial</h3>
      <div className="grid sm:grid-cols-3 gap-5">
        <TextField label="Facebook" name="facebook_url" error={errors.facebook_url} {...register('facebook_url')} />
        <TextField label="Instagram" name="instagram_url" error={errors.instagram_url} {...register('instagram_url')} />
        <TextField label="YouTube" name="youtube_url" error={errors.youtube_url} {...register('youtube_url')} />
      </div>

      <button type="submit" disabled={submitting} className="btn-primary"><Save className="w-4 h-4" /> {submitting ? 'Menyimpan...' : 'Simpan Pengaturan'}</button>
    </form>
  )
}
