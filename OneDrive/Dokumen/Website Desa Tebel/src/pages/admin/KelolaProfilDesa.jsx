import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Trash2, Save } from 'lucide-react'
import Modal from '../../components/common/Modal'
import { TextField, TextareaField, FileField } from '../../components/common/FormField'
import PageLoader from '../../components/common/PageLoader'
import useFetch from '../../hooks/useFetch'
import useToast from '../../hooks/useToast'
import profileService from '../../services/profileService'
import { STORAGE_BASE_URL } from '../../utils/constants'

const TABS = [
  { key: 'umum', label: 'Umum & Sejarah' },
  { key: 'visimisi', label: 'Visi & Misi' },
  { key: 'struktur', label: 'Struktur Organisasi' },
  { key: 'perangkat', label: 'Perangkat Desa' },
]

function GeneralForm({ profile, refetch }) {
  const { register, handleSubmit, reset } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()

  useEffect(() => {
    if (profile) reset({ population: profile.population, total_families: profile.total_families, area: profile.area, hamlets_count: profile.hamlets_count, history: profile.history })
  }, [profile, reset])

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      await profileService.update(values)
      toast.success('Profil desa berhasil diperbarui.')
      refetch()
    } catch {
      toast.error('Gagal memperbarui profil desa.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-5 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-5">
        <TextField label="Jumlah Penduduk" name="population" type="number" {...register('population')} />
        <TextField label="Jumlah KK" name="total_families" type="number" {...register('total_families')} />
        <TextField label="Luas Wilayah (km²)" name="area" type="number" step="0.01" {...register('area')} />
        <TextField label="Jumlah Dusun" name="hamlets_count" type="number" {...register('hamlets_count')} />
      </div>
      <TextareaField label="Sejarah Desa" name="history" rows={8} {...register('history')} />
      <button type="submit" disabled={submitting} className="btn-primary"><Save className="w-4 h-4" /> Simpan</button>
    </form>
  )
}

function VisiMisiForm({ profile, refetch }) {
  const { register, handleSubmit, reset } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()

  useEffect(() => { if (profile) reset({ vision: profile.vision, mission: profile.mission }) }, [profile, reset])

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      await profileService.update(values)
      toast.success('Visi & misi berhasil diperbarui.')
      refetch()
    } catch {
      toast.error('Gagal memperbarui visi & misi.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-5 max-w-2xl">
      <TextareaField label="Visi" name="vision" rows={4} {...register('vision')} />
      <TextareaField label="Misi" name="mission" rows={6} {...register('mission')} />
      <button type="submit" disabled={submitting} className="btn-primary"><Save className="w-4 h-4" /> Simpan</button>
    </form>
  )
}

function StrukturForm({ profile, refetch }) {
  const { register, handleSubmit } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()

  const onSubmit = async (values) => {
    if (!values.structure_image?.[0]) return
    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('structure_image', values.structure_image[0])
      await profileService.update(formData)
      toast.success('Bagan struktur berhasil diperbarui.')
      refetch()
    } catch {
      toast.error('Gagal mengunggah bagan struktur.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-5">
      {profile?.structure_image && (
        <div className="card p-4">
          <img src={`${STORAGE_BASE_URL}/${profile.structure_image}`} alt="Struktur Organisasi" className="w-full rounded-lg" />
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-5">
        <FileField label="Unggah Bagan Struktur Baru" name="structure_image" accept="image/*" {...register('structure_image')} />
        <button type="submit" disabled={submitting} className="btn-primary"><Save className="w-4 h-4" /> Simpan</button>
      </form>
    </div>
  )
}

function PerangkatTab() {
  const { data: officials, loading, refetch } = useFetch(() => profileService.officials(), [])
  const [modalOpen, setModalOpen] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()

  const openCreate = () => { reset({ name: '', position: '' }); setModalOpen(true) }

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const updated = [...(officials || []), { ...values, id: Date.now() }]
      await profileService.updateOfficials({ officials: updated })
      toast.success('Perangkat desa berhasil ditambahkan.')
      setModalOpen(false)
      refetch()
    } catch {
      toast.error('Gagal menambahkan data.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (official) => {
    const confirm = await toast.confirm({ title: `Hapus data "${official.name}"?` })
    if (!confirm.isConfirmed) return
    try {
      const updated = (officials || []).filter((o) => o.id !== official.id)
      await profileService.updateOfficials({ officials: updated })
      toast.success('Data berhasil dihapus.')
      refetch()
    } catch {
      toast.error('Gagal menghapus data.')
    }
  }

  if (loading) return <PageLoader />

  return (
    <div>
      <div className="flex justify-end mb-5">
        <button onClick={openCreate} className="btn-primary"><Plus className="w-4 h-4" /> Tambah Perangkat</button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(officials || []).map((o) => (
          <div key={o.id} className="card p-5 flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm">{o.name}</p>
              <p className="text-xs text-gold-600 font-semibold mt-1">{o.position}</p>
            </div>
            <button onClick={() => handleDelete(o)} className="text-red-600"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Tambah Perangkat Desa">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <TextField label="Nama" name="name" required error={errors.name} {...register('name', { required: true })} />
          <TextField label="Jabatan" name="position" required error={errors.position} {...register('position', { required: true })} />
          <button type="submit" disabled={submitting} className="btn-primary w-full">{submitting ? 'Menyimpan...' : 'Simpan'}</button>
        </form>
      </Modal>
    </div>
  )
}

export default function KelolaProfilDesa() {
  const [tab, setTab] = useState('umum')
  const { data: profile, loading, refetch } = useFetch(() => profileService.get(), [])

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto mb-6 border-b border-primary-100">
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition ${tab === t.key ? 'border-primary text-primary' : 'border-transparent text-ink/50'}`}>
            {t.label}
          </button>
        ))}
      </div>
      {loading ? <PageLoader /> : (
        <>
          {tab === 'umum' && <GeneralForm profile={profile} refetch={refetch} />}
          {tab === 'visimisi' && <VisiMisiForm profile={profile} refetch={refetch} />}
          {tab === 'struktur' && <StrukturForm profile={profile} refetch={refetch} />}
          {tab === 'perangkat' && <PerangkatTab />}
        </>
      )}
    </div>
  )
}
