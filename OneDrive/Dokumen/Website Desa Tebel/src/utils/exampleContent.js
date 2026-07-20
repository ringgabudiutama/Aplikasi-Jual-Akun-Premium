/**
 * Shared example/demo content used as a fallback across pages until the
 * Laravel backend is connected. Home.jsx, BeritaList/Detail,
 * PengumumanList/Detail, and Galeri.jsx all read from this single source —
 * so the gallery teaser on the homepage always matches the full gallery
 * page, and news cards link through to matching detail pages.
 *
 * Once the API returns real data, every page prefers that over this file
 * automatically (see the `use...OrExample` pattern in each page).
 */

export const EXAMPLE_NEWS = [
  {
    id: 1,
    slug: 'perbaikan-jalan-dusun-kupang-rampung',
    title: 'Perbaikan Jalan Dusun Kupang Rampung 90 Persen',
    category: { name: 'Pembangunan', slug: 'pembangunan' },
    published_at: '2026-07-14',
    tone: 'primary',
    excerpt: 'Proyek betonisasi jalan penghubung Dusun Kupang menuju balai desa memasuki tahap akhir dan ditargetkan rampung akhir bulan ini.',
    content:
      'Proyek betonisasi jalan penghubung Dusun Kupang menuju balai desa yang dimulai sejak awal Juni 2026 kini telah mencapai progres 90 persen. Pekerjaan meliputi pengecoran sepanjang 1,2 kilometer serta perbaikan saluran drainase di kanan-kiri jalan.\n\nKepala Desa menyampaikan bahwa proyek ini merupakan bagian dari alokasi Dana Desa tahun anggaran 2026 yang difokuskan pada peningkatan akses jalan antar-dusun. Warga menyambut baik pembangunan ini karena selama musim hujan jalan tersebut kerap tergenang dan menyulitkan akses kendaraan.\n\nProyek ditargetkan selesai sepenuhnya pada akhir Juli 2026, termasuk pengecatan marka dan pemasangan penerangan jalan tambahan di titik-titik rawan.',
  },
  {
    id: 2,
    slug: 'posyandu-balita-serentak-4-dusun',
    title: 'Posyandu Balita Serentak Digelar di 4 Dusun',
    category: { name: 'Kegiatan', slug: 'kegiatan' },
    published_at: '2026-07-10',
    tone: 'gold',
    excerpt: 'Kegiatan Posyandu balita bulan ini digelar serentak di Dusun Tebel, Kupang, Jlopo, dan Larangan dengan fokus pemantauan gizi dan imunisasi.',
    content:
      'Pemerintah Desa Tebel bersama kader Posyandu menggelar kegiatan Posyandu balita serentak di keempat dusun — Tebel, Kupang, Jlopo, dan Larangan — pada minggu ini. Kegiatan meliputi penimbangan berat badan, pengukuran tinggi badan, pemberian vitamin A, serta pemantauan status gizi balita.\n\nBidan desa turut hadir untuk memberikan konsultasi kesehatan ibu dan anak, termasuk sosialisasi pencegahan stunting. Warga diimbau membawa Kartu Menuju Sehat (KMS) anak masing-masing saat kegiatan berlangsung.\n\nKegiatan ini rutin dilaksanakan setiap bulan sebagai bagian dari program prioritas desa dalam upaya penurunan angka stunting.',
  },
  {
    id: 3,
    slug: 'musyawarah-desa-anggaran-dana-desa-2027',
    title: 'Musyawarah Desa Bahas Anggaran Dana Desa 2027',
    category: { name: 'Pemerintahan', slug: 'pemerintahan' },
    published_at: '2026-07-05',
    tone: 'maroon',
    excerpt: 'Musyawarah Desa (Musdes) digelar untuk membahas prioritas penggunaan Dana Desa tahun anggaran 2027 bersama tokoh masyarakat dan perwakilan dusun.',
    content:
      'Balai Desa Tebel menjadi lokasi pelaksanaan Musyawarah Desa (Musdes) yang membahas rancangan prioritas penggunaan Dana Desa untuk tahun anggaran 2027. Musyawarah ini dihadiri oleh perangkat desa, Badan Permusyawaratan Desa (BPD), tokoh masyarakat, serta perwakilan dari keempat dusun.\n\nBeberapa usulan yang mengemuka antara lain lanjutan pembangunan infrastruktur jalan, peningkatan fasilitas Posyandu, serta program pemberdayaan ekonomi warga melalui BUMDes. Seluruh usulan akan dirangkum menjadi Rancangan Kerja Pemerintah Desa (RKPDes) untuk diajukan ke tingkat kabupaten.\n\nKepala Desa mengajak seluruh warga untuk aktif mengawal proses ini demi transparansi penggunaan anggaran desa.',
  },
  {
    id: 4,
    slug: 'pelatihan-umkm-olahan-pangan-lokal',
    title: 'Pelatihan UMKM Olahan Pangan Lokal untuk Ibu-ibu PKK',
    category: { name: 'Kegiatan', slug: 'kegiatan' },
    published_at: '2026-06-28',
    tone: 'primary',
    excerpt: 'PKK Desa Tebel menggelar pelatihan pengolahan hasil pertanian lokal menjadi produk bernilai jual bagi warga.',
    content:
      'Dalam rangka mendorong perekonomian keluarga, Tim Penggerak PKK Desa Tebel menyelenggarakan pelatihan pengolahan hasil pertanian lokal menjadi produk makanan bernilai jual, seperti keripik dan aneka camilan berbahan dasar singkong dan pisang.\n\nPelatihan ini diikuti puluhan ibu rumah tangga dari empat dusun dan menghadirkan narasumber dari Dinas Koperasi dan UMKM Kabupaten Jombang. Peserta juga diberikan materi seputar pengemasan dan pemasaran produk melalui media sosial.\n\nDiharapkan pelatihan ini dapat menumbuhkan unit usaha rumahan baru yang mendukung perekonomian desa.',
  },
  {
    id: 5,
    slug: 'gotong-royong-bersih-desa',
    title: 'Gotong Royong Bersih Desa Sambut Musim Kemarau',
    category: { name: 'Kegiatan', slug: 'kegiatan' },
    published_at: '2026-06-20',
    tone: 'gold',
    excerpt: 'Warga bersama perangkat desa melakukan kerja bakti membersihkan saluran irigasi dan lingkungan menjelang musim kemarau.',
    content:
      'Warga Desa Tebel bersama perangkat desa dan karang taruna menggelar kegiatan gotong royong membersihkan saluran irigasi serta lingkungan sekitar rumah masing-masing. Kegiatan ini dilaksanakan menjelang musim kemarau untuk memastikan saluran air tidak tersumbat dan siap menghadapi kondisi kekeringan.\n\nSelain membersihkan saluran, warga juga menanam pohon di beberapa titik sebagai upaya konservasi lingkungan. Kegiatan gotong royong seperti ini menjadi tradisi rutin yang terus dijaga sebagai wujud kebersamaan warga Desa Tebel.',
  },
]

export const EXAMPLE_ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'Jadwal Pelayanan Selama Libur Nasional 17 Agustus',
    summary: 'Kantor desa tetap membuka pelayanan setengah hari pada tanggal 17 Agustus 2026 untuk keperluan mendesak warga.',
    content:
      'Sehubungan dengan peringatan Hari Kemerdekaan Republik Indonesia, Kantor Desa Tebel akan tetap membuka pelayanan terbatas (setengah hari, pukul 08.00–11.00 WIB) pada tanggal 17 Agustus 2026 khusus untuk keperluan mendesak seperti surat kematian dan surat keterangan darurat lainnya.\n\nUntuk pengajuan surat non-mendesak, warga dapat mengajukan melalui layanan online di website ini dan akan diproses kembali secara normal pada 18 Agustus 2026.',
    created_at: '2026-07-15',
  },
  {
    id: 2,
    title: 'Vaksinasi Massal Tahap II',
    summary: 'Dilaksanakan di Balai Desa mulai pukul 08.00 WIB, warga diimbau membawa KTP dan kartu vaksinasi sebelumnya.',
    content:
      'Dinas Kesehatan Kabupaten Jombang bekerja sama dengan Pemerintah Desa Tebel akan menyelenggarakan vaksinasi massal tahap II bagi warga yang belum melengkapi dosis vaksinasi. Kegiatan akan dilaksanakan di Balai Desa Tebel mulai pukul 08.00 WIB sampai selesai.\n\nWarga yang ingin mengikuti vaksinasi diimbau membawa KTP asli dan kartu vaksinasi sebelumnya (jika ada). Kegiatan ini terbuka untuk seluruh warga dari keempat dusun tanpa dipungut biaya.',
    created_at: '2026-07-12',
  },
  {
    id: 3,
    title: 'Pendaftaran Bantuan Rumah Tidak Layak Huni (RTLH) 2027',
    summary: 'Warga yang memenuhi kriteria dapat mendaftar program bantuan RTLH melalui Kaur Kesejahteraan mulai minggu depan.',
    content:
      'Pemerintah Desa Tebel membuka pendaftaran calon penerima manfaat Program Bantuan Rumah Tidak Layak Huni (RTLH) untuk tahun anggaran 2027. Warga yang memenuhi kriteria (rumah tidak layak huni, berpenghasilan rendah, dan berdomisili tetap di Desa Tebel) dapat mendaftarkan diri melalui Kaur Kesejahteraan Rakyat mulai minggu depan dengan membawa fotokopi KTP, KK, dan foto kondisi rumah.\n\nProses verifikasi akan dilakukan oleh tim desa bersama pendamping dari Dinas Perumahan Kabupaten Jombang.',
    created_at: '2026-07-08',
  },
]

export const EXAMPLE_GALLERY = [
  { id: 1, variant: 'gotong_royong', title: 'Gotong Royong Bersih Desa', type: 'photo' },
  { id: 2, variant: 'panen', title: 'Panen Raya Padi Dusun Jlopo', type: 'photo' },
  { id: 3, variant: 'balai', title: 'Suasana Balai Desa Tebel', type: 'photo' },
  { id: 4, variant: 'posyandu', title: 'Kegiatan Posyandu Balita', type: 'photo' },
  { id: 5, variant: 'gotong_royong', title: 'Kerja Bakti Saluran Irigasi', type: 'photo' },
  { id: 6, variant: 'panen', title: 'Panen Jagung Dusun Larangan', type: 'photo' },
  { id: 7, variant: 'balai', title: 'Musyawarah Desa', type: 'photo' },
  { id: 8, variant: 'posyandu', title: 'Pelatihan UMKM Ibu PKK', type: 'photo' },
]
