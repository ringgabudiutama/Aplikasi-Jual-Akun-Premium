/* =========================================================
   RIFORA PREMIUM — products.js
   Data layer: default seed data + localStorage persistence
   ========================================================= */

const RIFORA_KEYS = {
  brands: 'rifora_brands',
  banners: 'rifora_banners',
  promos: 'rifora_promos',
  faqs: 'rifora_faqs',
  aiKnowledge: 'rifora_ai_knowledge',
  settings: 'rifora_settings',
  favorites: 'rifora_favorites',
  profile: 'rifora_profile',
  testimonials: 'rifora_testimonials',
  admins: 'rifora_admins',
};

/* ---------- Placeholder logo generator (SVG data URL) ---------- */
function riforaPlaceholderLogo(letter, colorA, colorB) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${colorA}"/>
        <stop offset="100%" stop-color="${colorB}"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="26" fill="url(#g)"/>
    <text x="50" y="62" font-family="Poppins, sans-serif" font-size="42" font-weight="700"
      text-anchor="middle" fill="#fff">${letter}</text>
  </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(svg);
}

/* ---------- Default seed data ---------- */
function riforaDefaultBrands() {
  const uid = () => 'b_' + Math.random().toString(36).slice(2, 9);
  const pid = () => 'p_' + Math.random().toString(36).slice(2, 9);

  return [
    {
      id: uid(), name: 'Canva', category: 'Desain Grafis', icon: '🎨',
      description: 'Rancang konten visual profesional dengan Canva Pro — template premium, background remover, dan penyimpanan luas.',
      logo: riforaPlaceholderLogo('C', '#7d2ae8', '#00c4cc'),
      badge: 'BEST SELLER', status: 'aktif',
      packages: [
        { id: pid(), name: 'Canva Pro Admin 1 Bulan', price: 10000, warranty: '1 Bulan', note: 'Akses via Admin' },
        { id: pid(), name: 'Canva Pro Invite 1 Bulan', price: 5000, warranty: '1 Bulan', note: 'Via Invite Email' },
      ]
    },
    {
      id: uid(), name: 'ChatGPT', category: 'AI Assistant', icon: '🤖',
      description: 'Asisten AI ChatGPT Go untuk produktivitas, riset, dan brainstorming tanpa batas.',
      logo: riforaPlaceholderLogo('G', '#10a37f', '#1a7f64'),
      badge: 'HOT', status: 'aktif',
      packages: [
        { id: pid(), name: 'ChatGPT Go Sharing 1 Bulan', price: 23000, warranty: '3 Hari', note: 'Akun Sharing' },
        { id: pid(), name: 'ChatGPT Go Privat 1 Bulan', price: 75000, warranty: '20 Hari', note: 'Akun Privat' },
      ]
    },
    {
      id: uid(), name: 'Gemini', category: 'AI Assistant', icon: '💎',
      description: 'Gemini AI dengan bonus Google Drive 2TB dan akses Veo 3 untuk generate video AI.',
      logo: riforaPlaceholderLogo('G', '#4285f4', '#9b72cb'),
      badge: 'NEW', status: 'aktif',
      packages: [
        { id: pid(), name: 'Gemini AI + Drive 2TB + Veo 3 (1 Tahun Private)', price: 25000, warranty: '1 Tahun', note: 'Private' },
      ]
    },
    {
      id: uid(), name: 'Grok', category: 'AI Assistant', icon: '⚫',
      description: 'Grok AI dari xAI — jawaban cepat, tajam, dan tanpa banyak batasan.',
      logo: riforaPlaceholderLogo('X', '#000000', '#3a3a3a'),
      badge: '', status: 'aktif',
      packages: [
        { id: pid(), name: 'Grok AI 1 Minggu', price: 25000, warranty: '7 Hari', note: '' },
      ]
    },
    {
      id: uid(), name: 'CapCut', category: 'Editing Video', icon: '✂️',
      description: 'CapCut Pro untuk editing video tanpa watermark, efek premium, dan cloud storage.',
      logo: riforaPlaceholderLogo('C', '#000000', '#2ee6d6'),
      badge: '', status: 'aktif',
      packages: [
        { id: pid(), name: 'CapCut Pro 7 Hari', price: 12000, warranty: '7 Hari', note: '' },
        { id: pid(), name: 'CapCut Pro 1 Bulan', price: 35000, warranty: '1 Bulan', note: '' },
      ]
    },
    {
      id: uid(), name: 'Claude AI', category: 'AI Assistant', icon: '🧠',
      description: 'Claude AI dari Anthropic — asisten AI andal untuk menulis, koding, dan analisis.',
      logo: riforaPlaceholderLogo('C', '#d97757', '#b45f43'),
      badge: 'BEST SELLER', status: 'aktif',
      packages: [
        { id: pid(), name: 'Sharing 5 User 7 Hari', price: 65000, warranty: '7 Hari', note: 'Sharing 5 User' },
        { id: pid(), name: 'Sharing 5 User 1 Bulan', price: 100000, warranty: '1 Bulan', note: 'Sharing 5 User' },
        { id: pid(), name: 'Sharing 3 User 1 Bulan', price: 145000, warranty: '1 Bulan', note: 'Sharing 3 User' },
      ]
    },
    {
      id: uid(), name: 'Spotify', category: 'Musik & Hiburan', icon: '🎵',
      description: 'Streaming musik tanpa iklan dengan Spotify Premium — Individual & Family.',
      logo: riforaPlaceholderLogo('S', '#1DB954', '#169c46'),
      badge: 'BEST SELLER', status: 'aktif',
      packages: [
        { id: pid(), name: 'Individual 1 Bulan', price: 20000, warranty: '1 Bulan', note: 'Individual' },
        { id: pid(), name: 'Individual 2 Bulan', price: 28000, warranty: '2 Bulan', note: 'Individual' },
        { id: pid(), name: 'Individual 3 Bulan', price: 38000, warranty: '3 Bulan', note: 'Individual' },
        { id: pid(), name: 'Family 1 Bulan', price: 25500, warranty: '1 Bulan', note: 'Family' },
        { id: pid(), name: 'Family 2 Bulan', price: 33500, warranty: '2 Bulan', note: 'Family' },
        { id: pid(), name: 'Family 3 Bulan', price: 50000, warranty: '3 Bulan', note: 'Family' },
      ]
    },
    {
      id: uid(), name: 'Netflix', category: 'Film & Series', icon: '🎬',
      description: 'Nonton film & series favorit tanpa batas dengan kualitas terbaik.',
      logo: riforaPlaceholderLogo('N', '#E50914', '#8b0710'),
      badge: 'HOT', status: 'aktif',
      packages: [
        { id: pid(), name: 'Sharing 1 Hari', price: 5000, warranty: '1 Hari', note: 'Sharing' },
        { id: pid(), name: 'Sharing 3 Hari', price: 10000, warranty: '3 Hari', note: 'Sharing' },
        { id: pid(), name: 'Sharing 7 Hari', price: 20000, warranty: '7 Hari', note: 'Sharing' },
        { id: pid(), name: 'Sharing 1 Bulan', price: 25000, warranty: '1 Bulan', note: 'Sharing' },
        { id: pid(), name: 'Privat 7 Hari', price: 55000, warranty: '7 Hari', note: 'Privat' },
        { id: pid(), name: 'Privat 1 Bulan', price: 180000, warranty: '1 Bulan', note: 'Privat' },
        { id: pid(), name: 'Privat 1 Bulan No Garansi', price: 110000, warranty: 'Tanpa Garansi', note: 'Privat' },
      ]
    },
  ];
}

function riforaDefaultBanners() {
  return [
    { id: 'bn_1', title: 'Akun Premium Diskon Spesial', subtitle: 'Hemat hingga 50% untuk semua brand favoritmu', color: 'a' },
    { id: 'bn_2', title: 'Garansi Resmi Setiap Pembelian', subtitle: 'Aman, cepat, dan terpercaya', color: 'b' },
    { id: 'bn_3', title: 'AI Assistant Siap Bantu 24 Jam', subtitle: 'Tanya apa saja soal produk kami', color: 'c' },
  ];
}

function riforaDefaultPromos() {
  return [
    { id: 'pr_1', title: 'Promo Akhir Bulan', desc: 'Diskon tambahan untuk paket 1 bulan ke atas', active: true },
  ];
}

function riforaDefaultFaqs() {
  return [
    { id: 'f_1', q: 'Berapa lama proses order?', a: 'Setelah konfirmasi via WhatsApp, akun akan diproses maksimal 10–30 menit.' },
    { id: 'f_2', q: 'Apakah ada garansi?', a: 'Ya, setiap paket memiliki masa garansi sesuai keterangan pada produk.' },
    { id: 'f_3', q: 'Bagaimana cara pembayaran?', a: 'Pembayaran dikonfirmasi langsung dengan admin melalui WhatsApp.' },
    { id: 'f_4', q: 'Apakah akun bisa dipakai di banyak perangkat?', a: 'Tergantung jenis paket (Sharing/Privat), silakan cek keterangan tiap paket.' },
  ];
}

function riforaDefaultAiKnowledge() {
  return [
    { id: 'k_1', topic: 'Jam Operasional', content: 'Admin melayani order setiap hari pukul 08.00 - 23.00 WIB.' },
    { id: 'k_2', topic: 'Cara Order', content: 'Pilih brand, pilih paket, klik Order Sekarang, pilih admin, lalu lanjutkan ke WhatsApp.' },
    { id: 'k_3', topic: 'Garansi', content: 'Garansi berlaku selama masa yang tertera pada tiap paket, di luar itu tidak termasuk tanggung jawab kami.' },
  ];
}

function riforaDefaultSettings() {
  return {
    admins: [
      { name: 'Admin 1', phone: '082230659448' },
      { name: 'Admin 2', phone: '081336987899' },
    ],
    storeName: 'Rifora Premium',
    tagline: 'Your Trusted Premium Account Store',
  };
}

function riforaDefaultTestimonials() {
  return [
    { id: 't_1', name: 'Dimas', text: 'Prosesnya cepat banget, harga juga bersahabat!', rating: 5 },
    { id: 't_2', name: 'Anisa', text: 'Admin fast response, akun aman dan bergaransi.', rating: 5 },
    { id: 't_3', name: 'Rangga', text: 'Udah langganan Netflix di sini dari lama, gak pernah kecewa.', rating: 5 },
  ];
}

function riforaDefaultProfile() {
  return {
    name: 'Pengguna Rifora',
    phone: '',
    address: '',
    photo: '',
  };
}

/* ---------- Generic get/set with auto-seed ---------- */
function riforaGet(key, fallbackFn) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
    const seed = fallbackFn();
    localStorage.setItem(key, JSON.stringify(seed));
    return seed;
  } catch (e) {
    console.error('riforaGet error', key, e);
    return fallbackFn();
  }
}

function riforaSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* ---------- Public data API ---------- */
const RiforaData = {
  getBrands() { return riforaGet(RIFORA_KEYS.brands, riforaDefaultBrands); },
  setBrands(v) { riforaSet(RIFORA_KEYS.brands, v); },

  getBanners() { return riforaGet(RIFORA_KEYS.banners, riforaDefaultBanners); },
  setBanners(v) { riforaSet(RIFORA_KEYS.banners, v); },

  getPromos() { return riforaGet(RIFORA_KEYS.promos, riforaDefaultPromos); },
  setPromos(v) { riforaSet(RIFORA_KEYS.promos, v); },

  getFaqs() { return riforaGet(RIFORA_KEYS.faqs, riforaDefaultFaqs); },
  setFaqs(v) { riforaSet(RIFORA_KEYS.faqs, v); },

  getAiKnowledge() { return riforaGet(RIFORA_KEYS.aiKnowledge, riforaDefaultAiKnowledge); },
  setAiKnowledge(v) { riforaSet(RIFORA_KEYS.aiKnowledge, v); },

  getSettings() { return riforaGet(RIFORA_KEYS.settings, riforaDefaultSettings); },
  setSettings(v) { riforaSet(RIFORA_KEYS.settings, v); },

  getTestimonials() { return riforaGet(RIFORA_KEYS.testimonials, riforaDefaultTestimonials); },
  setTestimonials(v) { riforaSet(RIFORA_KEYS.testimonials, v); },

  getFavorites() { return riforaGet(RIFORA_KEYS.favorites, () => []); },
  setFavorites(v) { riforaSet(RIFORA_KEYS.favorites, v); },

  getProfile() { return riforaGet(RIFORA_KEYS.profile, riforaDefaultProfile); },
  setProfile(v) { riforaSet(RIFORA_KEYS.profile, v); },

  formatRupiah(n) {
    return 'Rp' + Number(n || 0).toLocaleString('id-ID');
  },

  uid(prefix) {
    return (prefix || 'id') + '_' + Math.random().toString(36).slice(2, 9);
  }
};