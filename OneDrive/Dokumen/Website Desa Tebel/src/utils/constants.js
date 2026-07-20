export const APP_NAME = 'SI TEBEL'
export const APP_FULL_NAME = 'Sistem Informasi Terpadu Desa Tebel'
export const APP_TAGLINE = 'Mudah, Cepat, Transparan.'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
export const STORAGE_BASE_URL = import.meta.env.VITE_STORAGE_BASE_URL || '/storage'

export const SURAT_TYPES = [
  { value: 'domisili', label: 'Surat Keterangan Domisili' },
  { value: 'skck', label: 'Surat Pengantar SKCK' },
  { value: 'tidak_mampu', label: 'Surat Keterangan Tidak Mampu' },
  { value: 'usaha', label: 'Surat Keterangan Usaha' },
  { value: 'kelahiran', label: 'Surat Keterangan Kelahiran' },
  { value: 'kematian', label: 'Surat Keterangan Kematian' },
  { value: 'pindah', label: 'Surat Keterangan Pindah' },
  { value: 'nikah', label: 'Surat Pengantar Nikah' },
  { value: 'lainnya', label: 'Surat Lainnya' },
]

export const REQUEST_STATUS = {
  menunggu: { label: 'Menunggu', className: 'badge-menunggu' },
  diproses: { label: 'Diproses', className: 'badge-diproses' },
  selesai: { label: 'Selesai', className: 'badge-selesai' },
  ditolak: { label: 'Ditolak', className: 'badge-ditolak' },
}

export const REPORT_CATEGORIES = [
  { value: 'jalan_rusak', label: 'Jalan Rusak' },
  { value: 'lampu_mati', label: 'Lampu Mati' },
  { value: 'sampah', label: 'Sampah' },
  { value: 'banjir', label: 'Banjir' },
  { value: 'keamanan', label: 'Keamanan' },
  { value: 'pelayanan', label: 'Pelayanan' },
  { value: 'lainnya', label: 'Lainnya' },
]

export const REPORT_STATUS = {
  pending: { label: 'Pending', className: 'badge-pending' },
  diproses: { label: 'Diproses', className: 'badge-diproses' },
  selesai: { label: 'Selesai', className: 'badge-selesai' },
}

export const BANTUAN_LINKS = [
  { code: 'PKH', name: 'Program Keluarga Harapan', url: 'https://cekbansos.kemensos.go.id' },
  { code: 'BPNT', name: 'Bantuan Pangan Non Tunai', url: 'https://cekbansos.kemensos.go.id' },
  { code: 'KIP', name: 'Kartu Indonesia Pintar', url: 'https://kip.kemdikbud.go.id' },
  { code: 'PIP', name: 'Program Indonesia Pintar', url: 'https://pip.kemdikbud.go.id' },
  { code: 'BLT', name: 'Bantuan Langsung Tunai Desa', url: 'https://cekbansos.kemensos.go.id' },
]

export const ROLES = {
  ADMIN: 'admin',
  MASYARAKAT: 'masyarakat',
}
