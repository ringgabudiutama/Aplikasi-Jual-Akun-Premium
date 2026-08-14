# Rifora Premium — Next.js + Database Asli

Rebuild total dari versi localStorage lama. Sekarang semua data (brand, paket,
harga, banner, promo, FAQ, AI knowledge, nomor admin) tersimpan di **Postgres
sungguhan**, bukan localStorage — jadi data tidak hilang tiap deploy ulang,
dan bisa diakses/diedit dari device manapun lewat panel admin.

Cart (keranjang belanja) sengaja TETAP disimpan di browser pembeli
(localStorage), karena itu data sesi sementara per-pengunjung — bukan data
toko. Ini standar di semua e-commerce, bukan pelanggaran syarat "database
asli" (itu soal data katalog yang dikelola admin).

## Struktur

- **Pembeli**: `/` (beranda), `/produk` (browse), `/produk/[slug]` (detail +
  pilih paket + beli), `/keranjang`, `/ai` (AI assistant)
- **Admin**: `/admin` (login dilindungi middleware), kelola brand & paket
  (dengan upload foto), banner, promo, FAQ, AI knowledge, dan nomor WA admin

Stack: **Next.js 15 (App Router) + TypeScript + Tailwind + Prisma + Postgres
+ Vercel Blob**. Semua gratis di tier Hobby Vercel.

---

## 1. Install & jalankan di lokal

```bash
npm install
cp .env.example .env
```

Isi `.env` (lihat cara dapat `DATABASE_URL` & `BLOB_READ_WRITE_TOKEN` di
langkah 2 & 3 — untuk coba di lokal, kamu tetap butuh database Postgres yang
sudah dibuat, jadi kerjakan langkah 2 dulu baru balik ke sini).

Generate `ADMIN_SESSION_SECRET` acak:

```bash
openssl rand -base64 32
```

Setelah `.env` terisi:

```bash
npx prisma generate
npm run db:push      # bikin semua tabel di database
npm run db:seed      # isi data awal (brand, admin WA, dll — boleh diedit lewat panel admin nanti)
npm run dev
```

Buka `http://localhost:3000` untuk toko, `http://localhost:3000/admin` untuk
panel admin (password = `ADMIN_PASSWORD` di `.env`).

---

## 2. Bikin database Postgres gratis di Vercel

1. Buka [vercel.com/dashboard](https://vercel.com/dashboard) → tab **Storage**
2. **Create Database** → pilih **Neon** (Postgres, ada di tier gratis)
3. Kasih nama (misal `rifora-db`), buat
4. Masuk ke database yang baru dibuat → tab **.env.local** / **Quickstart**
   → copy value `DATABASE_URL` (mulai dari `postgres://...`)
5. Paste ke `.env` (lokal) — nanti waktu deploy tinggal **Connect Project**
   dari Storage tab dan Vercel otomatis isi env var ini ke project kamu

> Kalau lebih suka Supabase, tinggal ganti `DATABASE_URL` dengan connection
> string dari Supabase (Project Settings → Database → Connection string →
> pilih mode **Transaction** untuk serverless). Schema Prisma-nya sama saja.

---

## 3. Bikin Vercel Blob Storage (buat upload foto produk)

1. Masih di tab **Storage** → **Create Database** → pilih **Blob**
2. Kasih nama, buat
3. Buka tab **.env.local** → copy `BLOB_READ_WRITE_TOKEN` → paste ke `.env`

---

## 4. Push ke GitHub

```bash
git init
git add .
git commit -m "Rifora Premium — rebuild dengan database asli"
git branch -M main
git remote add origin https://github.com/USERNAME/rifora-premium.git
git push -u origin main
```

---

## 5. Deploy ke Vercel

1. [vercel.com/new](https://vercel.com/new) → import repo GitHub di atas
2. Sebelum klik Deploy, buka **Environment Variables**, isi:
   - `DATABASE_URL` — bisa juga otomatis lewat **Connect Store** kalau
     database dari langkah 2 satu akun Vercel
   - `BLOB_READ_WRITE_TOKEN` — sama, otomatis lewat Connect Store
   - `ADMIN_PASSWORD` — password login admin, **ganti dari default**
   - `ADMIN_SESSION_SECRET` — hasil `openssl rand -base64 32`
   - `NEXT_PUBLIC_SITE_URL` — isi setelah tahu URL Vercel-nya (boleh update
     lagi belakangan)
3. Klik **Deploy**

Build otomatis menjalankan `prisma generate && next build` (sudah diatur di
`package.json`). Setelah deploy pertama sukses, tabel database masih kosong —
push schema & seed dari lokal (arahkan `.env` lokal ke `DATABASE_URL`
produksi sebentar) atau lewat **Vercel CLI**:

```bash
npx vercel env pull .env.production.local
npx dotenv -e .env.production.local -- npm run db:push
npx dotenv -e .env.production.local -- npm run db:seed
```

---

## 6. Setelah deploy — checklist admin

Login ke `/admin` pakai `ADMIN_PASSWORD`, lalu:

- **Pengaturan** → nomor admin WhatsApp sudah keisi otomatis dari seed
  (Admin 1: `0895-6153-10706`, Admin 2: `081336987899`) — cek/ubah kalau perlu
- **Brand** → edit satu-satu untuk upload foto produk asli (logo brand
  placeholder yang ada sekarang cuma inisial warna-warni)
- Ganti `ADMIN_PASSWORD` di Environment Variables Vercel ke password yang
  cuma kamu tahu, lalu **Redeploy**

## Kenapa nggak ada limit "berapa produk boleh dibuat"?

Karena datanya di Postgres (Neon free tier: 0.5 GB storage, cukup untuk
ribuan produk teks+harga) dan foto di Vercel Blob (free tier: 1 GB — logo
produk kecil, muat ratusan foto). Kalau nanti toko berkembang besar, tinggal
upgrade tier storage-nya, kode tidak perlu diubah.

## Regenerate ikon PWA

Kalau logo toko diganti, generate ulang ikon (192/512/apple-touch):

```bash
node scripts/generate-icons.mjs
```
