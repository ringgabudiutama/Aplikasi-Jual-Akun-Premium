import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import useToast from '../../hooks/useToast'

export default function Kontak() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const toast = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Pesan Anda telah dicatat. Tim kami akan segera merespons.')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div>
      <PageHeader eyebrow="Hubungi Kami" title="Kontak" description="Kami siap membantu Anda." breadcrumbs={[{ label: 'Kontak' }]} />
      <div className="container-page py-12 grid lg:grid-cols-2 gap-10">
        <div>
          <div className="space-y-5 mb-8">
            <div className="flex gap-4"><div className="w-11 h-11 rounded-lg bg-primary-50 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-primary" /></div>
              <div><p className="font-semibold text-sm">Alamat</p><p className="text-sm text-ink/60">Jl. Dr. Sutomo, Bareng, Kec. Bareng, Kabupaten Jombang, Jawa Timur 61474</p></div></div>
            <div className="flex gap-4"><div className="w-11 h-11 rounded-lg bg-primary-50 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-primary" /></div>
              <div><p className="font-semibold text-sm">Telepon</p><p className="text-sm text-ink/60">(0321) 123-456</p></div></div>
            <div className="flex gap-4"><div className="w-11 h-11 rounded-lg bg-primary-50 flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-primary" /></div>
              <div><p className="font-semibold text-sm">Email</p><p className="text-sm text-ink/60">desatebel@jombangkab.go.id</p></div></div>
            <div className="flex gap-4"><div className="w-11 h-11 rounded-lg bg-primary-50 flex items-center justify-center shrink-0"><Clock className="w-5 h-5 text-primary" /></div>
              <div><p className="font-semibold text-sm">Jam Operasional</p><p className="text-sm text-ink/60">Senin–Jumat, 08.00–15.00 WIB</p></div></div>
          </div>
          <div className="rounded-xl2 overflow-hidden shadow-soft h-64">
            <iframe title="Peta Kantor Desa Tebel" src="https://maps.google.com/maps?q=Desa%20Tebel%20Jombang&t=&z=14&ie=UTF8&iwloc=&output=embed" className="w-full h-full border-0" loading="lazy" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-5 h-fit">
          <h3 className="font-display text-xl font-bold mb-1">Kirim Pesan</h3>
          <div>
            <label className="label-field">Nama</label>
            <input className="input-field" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="label-field">Email</label>
            <input type="email" className="input-field" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="label-field">Pesan</label>
            <textarea rows={5} className="input-field resize-none" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>
          <button type="submit" className="btn-primary w-full"><Send className="w-4 h-4" /> Kirim Pesan</button>
        </form>
      </div>
    </div>
  )
}
