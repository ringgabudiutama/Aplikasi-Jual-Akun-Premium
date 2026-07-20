# SI TEBEL — Frontend

**Sistem Informasi Terpadu Desa Tebel, Kabupaten Jombang**
*"Mudah, Cepat, Transparan."*

Frontend aplikasi ini dibangun dengan **React + Vite + Tailwind CSS**, mengonsumsi REST API dari backend Laravel (lihat project `backend/` yang terpisah).

---

## 1. Teknologi

- React 18 + Vite 5
- React Router DOM v6
- Tailwind CSS 3
- Axios (HTTP client + interceptor auth token)
- React Hook Form (validasi form)
- SweetAlert2 (notifikasi & konfirmasi)
- Framer Motion (animasi)
- Recharts (grafik dashboard admin)
- Lucide React (ikon)

## 2. Struktur Folder

```
frontend/
├── public/                  # Aset statis (favicon, pattern SVG)
├── src/
│   ├── components/
│   │   ├── common/          # Komponen umum: FormField, Modal, Pagination, Skeleton, dll
│   │   ├── public/           # Navbar & Footer situs publik
│   │   └── admin/            # Sidebar, Topbar, DataTable, StatCard admin
│   ├── context/
│   │   └── AuthContext.jsx   # State autentikasi global
│   ├── hooks/                 # useAuth, useFetch, useToast, useDebounce
│   ├── layouts/               # PublicLayout, AuthLayout, AdminLayout
│   ├── pages/
│   │   ├── public/            # Semua halaman publik (Beranda, Berita, Layanan, dll)
│   │   ├── auth/               # Login, Register, Forgot/Reset Password
│   │   └── admin/              # Dashboard & seluruh modul Kelola (CRUD)
│   ├── services/                # Layer pemanggilan API (1 file per resource)
│   ├── utils/constants.js        # Konstanta (jenis surat, status, warna, dsb)
│   ├── App.jsx                    # Definisi seluruh routing
│   ├── main.jsx                    # Entry point React
│   └── index.css                    # Tailwind base + komponen kelas kustom
├── index.html
├── tailwind.config.js
├── vite.config.js
├── package.json
└── .env.example
```

## 3. Instalasi

```bash
cd frontend
npm install
cp .env.example .env
```

Sesuaikan isi `.env`:

```
VITE_API_BASE_URL=http://localhost:8000/api
VITE_STORAGE_BASE_URL=http://localhost:8000/storage
VITE_APP_NAME="SI TEBEL"
```

> Pastikan backend Laravel sudah berjalan di `http://localhost:8000` (lihat README backend) sebelum menjalankan frontend, karena seluruh data diambil dari REST API.

## 4. Menjalankan (Development)

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`.

- Situs publik: `http://localhost:5173/`
- Login warga: `http://localhost:5173/masuk`
- Login admin: `http://localhost:5173/admin/login`
- Dashboard admin: `http://localhost:5173/admin/dashboard` (memerlukan login role admin)

## 5. Build Production

```bash
npm run build
```

Hasil build akan berada di folder `dist/`. Untuk preview hasil build secara lokal:

```bash
npm run preview
```

Deploy folder `dist/` ke web server (Nginx/Apache) atau hosting statis. Pastikan environment variable `VITE_API_BASE_URL` mengarah ke domain API produksi saat proses build dijalankan.

## 6. Koneksi ke Backend (API)

Semua pemanggilan API terpusat di folder `src/services/`. Instance Axios (`src/services/api.js`) otomatis:

- Menyisipkan header `Authorization: Bearer <token>` dari `localStorage` (`sitebel_token`) pada setiap request.
- Melakukan auto-logout dan redirect ke halaman login saat menerima respons `401 Unauthorized`.

Jika struktur response API backend Anda berbeda dari asumsi di file service (`response.data.data`, `response.data.meta`), sesuaikan bagian tersebut di masing-masing file `src/services/*.js` maupun di halaman terkait.

## 7. Role & Alur Autentikasi

- **Masyarakat**: daftar via `/daftar`, login via `/masuk`, dapat mengajukan surat, membuat laporan, dan memantau riwayat pengajuan di `/akun/pengajuan-saya`.
- **Admin**: login via `/admin/login`. Setelah login, akan diarahkan ke `/admin/dashboard`. Rute admin dilindungi oleh `ProtectedRoute` yang memvalidasi `role === 'admin'` dari data user yang tersimpan di context autentikasi.

## 8. Catatan Desain

- Palet warna: Hijau `#1F6E43` (primary), Emas `#D4A017` (gold/secondary), latar `#F7F7F7`.
- Tipografi: **Fraunces** (display/heading) dipadukan dengan **Plus Jakarta Sans** (body), dimuat via Google Fonts di `index.html`.
- Elemen signature: motif garis lengkung "ukir" (`.ukir-divider`, `bg-ukir-pattern`) terinspirasi dari ukiran kayu khas pedesaan Jawa, digunakan sebagai pembatas antar-section alih-alih gradient generik.

## 9. Lint

```bash
npm run lint
```
