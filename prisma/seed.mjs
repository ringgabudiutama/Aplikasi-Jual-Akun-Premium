import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

function placeholderLogo(letter, colorA, colorB) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${colorA}"/><stop offset="100%" stop-color="${colorB}"/>
    </linearGradient></defs>
    <rect width="100" height="100" rx="26" fill="url(#g)"/>
    <text x="50" y="62" font-family="sans-serif" font-size="42" font-weight="700"
      text-anchor="middle" fill="#fff">${letter}</text>
  </svg>`;
  return "data:image/svg+xml;base64," + Buffer.from(svg).toString("base64");
}

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-");
}

const brands = [
  {
    name: "Canva", category: "Desain Grafis", icon: "🎨",
    description: "Rancang konten visual profesional dengan Canva Pro — template premium, background remover, dan penyimpanan luas.",
    logoUrl: placeholderLogo("C", "#7d2ae8", "#00c4cc"), badge: "BEST SELLER",
    packages: [
      { name: "Canva Pro Admin 1 Bulan", price: 10000, warranty: "1 Bulan", note: "Akses via Admin" },
      { name: "Canva Pro Invite 1 Bulan", price: 5000, warranty: "1 Bulan", note: "Via Invite Email" },
    ],
  },
  {
    name: "ChatGPT", category: "AI Assistant", icon: "🤖",
    description: "Asisten AI ChatGPT Go untuk produktivitas, riset, dan brainstorming tanpa batas.",
    logoUrl: placeholderLogo("G", "#10a37f", "#1a7f64"), badge: "HOT",
    packages: [
      { name: "ChatGPT Go Sharing 1 Bulan", price: 23000, warranty: "3 Hari", note: "Akun Sharing" },
      { name: "ChatGPT Go Privat 1 Bulan", price: 75000, warranty: "20 Hari", note: "Akun Privat" },
    ],
  },
  {
    name: "Gemini", category: "AI Assistant", icon: "💎",
    description: "Gemini AI dengan bonus Google Drive 2TB dan akses Veo 3 untuk generate video AI.",
    logoUrl: placeholderLogo("G", "#4285f4", "#9b72cb"), badge: "NEW",
    packages: [
      { name: "Gemini AI + Drive 2TB + Veo 3 (1 Tahun Private)", price: 25000, warranty: "1 Tahun", note: "Private" },
    ],
  },
  {
    name: "Grok", category: "AI Assistant", icon: "⚫",
    description: "Grok AI dari xAI — jawaban cepat, tajam, dan tanpa banyak batasan.",
    logoUrl: placeholderLogo("X", "#000000", "#3a3a3a"), badge: "",
    packages: [{ name: "Grok AI 1 Minggu", price: 25000, warranty: "7 Hari", note: "" }],
  },
  {
    name: "CapCut", category: "Editing Video", icon: "✂️",
    description: "CapCut Pro untuk editing video tanpa watermark, efek premium, dan cloud storage.",
    logoUrl: placeholderLogo("C", "#000000", "#2ee6d6"), badge: "",
    packages: [
      { name: "CapCut Pro 7 Hari", price: 12000, warranty: "7 Hari", note: "" },
      { name: "CapCut Pro 1 Bulan", price: 35000, warranty: "1 Bulan", note: "" },
    ],
  },
  {
    name: "Claude AI", category: "AI Assistant", icon: "🧠",
    description: "Claude AI dari Anthropic — asisten AI andal untuk menulis, koding, dan analisis.",
    logoUrl: placeholderLogo("C", "#d97757", "#b45f43"), badge: "BEST SELLER",
    packages: [
      { name: "Sharing 5 User 7 Hari", price: 65000, warranty: "7 Hari", note: "Sharing 5 User" },
      { name: "Sharing 5 User 1 Bulan", price: 100000, warranty: "1 Bulan", note: "Sharing 5 User" },
      { name: "Sharing 3 User 1 Bulan", price: 145000, warranty: "1 Bulan", note: "Sharing 3 User" },
    ],
  },
  {
    name: "Spotify", category: "Musik & Hiburan", icon: "🎵",
    description: "Streaming musik tanpa iklan dengan Spotify Premium — Individual & Family.",
    logoUrl: placeholderLogo("S", "#1DB954", "#169c46"), badge: "BEST SELLER",
    packages: [
      { name: "Individual 1 Bulan", price: 20000, warranty: "1 Bulan", note: "Individual" },
      { name: "Individual 2 Bulan", price: 28000, warranty: "2 Bulan", note: "Individual" },
      { name: "Individual 3 Bulan", price: 38000, warranty: "3 Bulan", note: "Individual" },
      { name: "Family 1 Bulan", price: 25500, warranty: "1 Bulan", note: "Family" },
      { name: "Family 2 Bulan", price: 33500, warranty: "2 Bulan", note: "Family" },
      { name: "Family 3 Bulan", price: 50000, warranty: "3 Bulan", note: "Family" },
    ],
  },
  {
    name: "Netflix", category: "Film & Series", icon: "🎬",
    description: "Nonton film & series favorit tanpa batas dengan kualitas terbaik.",
    logoUrl: placeholderLogo("N", "#E50914", "#8b0710"), badge: "HOT",
    packages: [
      { name: "Sharing 1 Hari", price: 5000, warranty: "1 Hari", note: "Sharing" },
      { name: "Sharing 3 Hari", price: 10000, warranty: "3 Hari", note: "Sharing" },
      { name: "Sharing 7 Hari", price: 20000, warranty: "7 Hari", note: "Sharing" },
      { name: "Sharing 1 Bulan", price: 25000, warranty: "1 Bulan", note: "Sharing" },
      { name: "Privat 7 Hari", price: 55000, warranty: "7 Hari", note: "Privat" },
      { name: "Privat 1 Bulan", price: 180000, warranty: "1 Bulan", note: "Privat" },
      { name: "Privat 1 Bulan No Garansi", price: 110000, warranty: "Tanpa Garansi", note: "Privat" },
    ],
  },
];

const banners = [
  { title: "Akun Premium Diskon Spesial", subtitle: "Hemat hingga 50% untuk semua brand favoritmu", color: "a" },
  { title: "Garansi Resmi Setiap Pembelian", subtitle: "Aman, cepat, dan terpercaya", color: "b" },
  { title: "AI Assistant Siap Bantu 24 Jam", subtitle: "Tanya apa saja soal produk kami", color: "c" },
];

const promos = [
  { title: "Promo Akhir Bulan", desc: "Diskon tambahan untuk paket 1 bulan ke atas", active: true },
];

const faqs = [
  { question: "Berapa lama proses order?", answer: "Setelah konfirmasi via WhatsApp, akun akan diproses maksimal 10–30 menit." },
  { question: "Apakah ada garansi?", answer: "Ya, setiap paket memiliki masa garansi sesuai keterangan pada produk." },
  { question: "Bagaimana cara pembayaran?", answer: "Pembayaran dikonfirmasi langsung dengan admin melalui WhatsApp." },
  { question: "Apakah akun bisa dipakai di banyak perangkat?", answer: "Tergantung jenis paket (Sharing/Privat), silakan cek keterangan tiap paket." },
];

const aiKnowledge = [
  { topic: "Jam Operasional", content: "Admin melayani order setiap hari pukul 08.00 - 23.00 WIB." },
  { topic: "Cara Order", content: "Pilih brand, pilih paket, klik Order Sekarang, pilih admin, lalu lanjutkan ke WhatsApp." },
  { topic: "Garansi", content: "Garansi berlaku selama masa yang tertera pada tiap paket, di luar itu tidak termasuk tanggung jawab kami." },
];

const testimonials = [
  { name: "Dimas", text: "Prosesnya cepat banget, harga juga bersahabat!", rating: 5 },
  { name: "Anisa", text: "Admin fast response, akun aman dan bergaransi.", rating: 5 },
  { name: "Rangga", text: "Udah langganan Netflix di sini dari lama, gak pernah kecewa.", rating: 5 },
];

const adminNumbers = [
  { name: "Admin 1", phone: "0895615310706" },
  { name: "Admin 2", phone: "081336987899" },
];

async function main() {
  console.log("Seeding...");

  await db.settings.upsert({
    where: { id: "settings" },
    update: {},
    create: { id: "settings", storeName: "Rifora Premium", tagline: "Your Trusted Premium Account Store" },
  });

  for (const [i, b] of banners.entries()) {
    await db.banner.create({ data: { ...b, order: i } });
  }
  for (const [i, p] of promos.entries()) {
    await db.promo.create({ data: { ...p, order: i } });
  }
  for (const [i, f] of faqs.entries()) {
    await db.faq.create({ data: { ...f, order: i } });
  }
  for (const k of aiKnowledge) {
    await db.aiKnowledge.create({ data: k });
  }
  for (const [i, t] of testimonials.entries()) {
    await db.testimonial.create({ data: { ...t, order: i } });
  }
  for (const [i, a] of adminNumbers.entries()) {
    await db.adminNumber.create({ data: { ...a, order: i } });
  }

  for (const [i, brand] of brands.entries()) {
    const { packages, ...brandData } = brand;
    await db.brand.create({
      data: {
        ...brandData,
        slug: slugify(brand.name),
        order: i,
        status: "aktif",
        packages: {
          create: packages.map((p, j) => ({ ...p, order: j })),
        },
      },
    });
  }

  console.log("Seed selesai ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
