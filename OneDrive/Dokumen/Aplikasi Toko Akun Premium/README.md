# Rifora Premium

Aplikasi mobile jual beli akun premium digital. Dibangun 100% dengan Python
menggunakan [Flet](https://flet.dev) (framework Python untuk membuat aplikasi
Flutter tanpa menulis Dart). Semua data (favorit & profil) disimpan secara
LOCAL di perangkat menggunakan `page.client_storage` (setara localStorage) —
tidak ada backend, database, maupun API eksternal.

## Fitur

- Splash screen animasi
- Dashboard: search bar, banner promo auto-slide, kategori, produk populer,
  produk terbaru, promo hari ini, kenapa memilih kami, testimoni auto-slide, FAQ
- Halaman Produk: pencarian realtime + filter (harga, kategori, terbaru, terlaris)
- Detail Produk: galeri foto swipe, pilihan paket, jumlah, total otomatis,
  tombol ORDER SEKARANG -> bottom sheet pilih admin -> WhatsApp otomatis
- AI Assistant: chat bergaya ChatGPT, menjawab pertanyaan seputar toko
  (harga, garansi, cara order, cara aktivasi, produk, jam operasional)
- Favorit, Profil (avatar, data diri, menu kartu, logout)
- Skeleton loading, animasi fade/slide/scale, glassmorphism ringan,
  animated mesh gradient di dashboard
- Font Poppins, warna merah-putih premium sesuai brand

## Struktur Project

```
rifora_premium/
├── main.py                  # Entry point + routing/navigasi
├── theme/colors.py          # Palet warna & style global
├── data/store_data.py       # Data statis: produk, kategori, testimoni, FAQ
├── state/app_state.py       # State management (favorit, profil, chat, dsb)
├── services/
│   ├── storage.py           # Local storage (client_storage) helper
│   ├── whatsapp.py          # Generator link wa.me
│   └── ai_engine.py         # Rule-based AI Assistant (tanpa API eksternal)
├── components/               # Widget reusable (card, skeleton, bottom nav, dst)
└── pages/                    # Halaman aplikasi
```

## Cara Menjalankan (Desktop / Dev Preview)

```bash
pip install -r requirements.txt
flet run main.py
```

## Build ke Android (APK/AAB)

```bash
pip install flet
flet build apk
# atau
flet build aab
```

## Build ke iOS

```bash
flet build ipa
```

## Catatan

- Ikon menggunakan Material Icons bawaan Flet (`ft.Icons`) sebagai pengganti
  Lucide — set ikon paling mirip secara visual (outline, minim, konsisten).
  Bisa diganti ke paket `lucide-icons` custom font bila dibutuhkan 1:1.
- Nomor admin & pesan WhatsApp otomatis diatur di `data/store_data.py` dan
  `services/whatsapp.py`.
- Ganti path gambar di `data/store_data.py` (`image` field) dengan aset asli
  sebelum rilis ke Play Store — saat ini menggunakan placeholder ikon.
