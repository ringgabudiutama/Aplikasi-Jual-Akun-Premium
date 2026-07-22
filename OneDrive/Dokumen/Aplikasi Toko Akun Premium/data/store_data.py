"""
Data toko Rifora Premium.
Semua data bersifat LOCAL (tidak ada backend/API/database) sesuai requirement.
Ganti / tambah item di list-list berikut untuk mengelola katalog produk.
"""
import flet as ft

# ---------------------------------------------------------------------------
# ADMIN WHATSAPP — dipakai bottom sheet "Pilih Admin" saat checkout
# ---------------------------------------------------------------------------
ADMINS = [
    {"name": "Admin 1", "phone": "082230659448"},
    {"name": "Admin 2", "phone": "081336987899"},
]

STORE_INFO = {
    "operating_hours": "Setiap hari, 08.00 - 23.00 WIB",
    "activation_time": "1 - 15 menit setelah pembayaran dikonfirmasi",
}

# ---------------------------------------------------------------------------
# KATEGORI — ditampilkan sebagai icon bulat horizontal di Dashboard
# ---------------------------------------------------------------------------
CATEGORIES = [
    {"id": "canva", "name": "Canva", "icon": ft.icons.PALETTE_OUTLINED},
    {"id": "chatgpt", "name": "ChatGPT", "icon": ft.icons.CHAT_BUBBLE_OUTLINE},
    {"id": "gemini", "name": "Gemini", "icon": ft.icons.AUTO_AWESOME_OUTLINED},
    {"id": "grok", "name": "Grok", "icon": ft.icons.BOLT_OUTLINED},
    {"id": "netflix", "name": "Netflix", "icon": ft.icons.MOVIE_OUTLINED},
    {"id": "capcut", "name": "CapCut", "icon": ft.icons.MOVIE_CREATION_OUTLINED},
    {"id": "spotify", "name": "Spotify", "icon": ft.icons.MUSIC_NOTE_OUTLINED},
    {"id": "youtube", "name": "YouTube", "icon": ft.icons.PLAY_CIRCLE_OUTLINE},
    {"id": "disney", "name": "Disney+", "icon": ft.icons.CASTLE_OUTLINED},
    {"id": "adobe", "name": "Adobe", "icon": ft.icons.BRUSH_OUTLINED},
    {"id": "microsoft", "name": "Microsoft", "icon": ft.icons.WINDOW_OUTLINED},
]

# ---------------------------------------------------------------------------
# PRODUK
# ---------------------------------------------------------------------------
# badge: "BEST SELLER" | "HOT" | "NEW" | None
# packages: pilihan paket dengan harga masing-masing
PRODUCTS = [
    {
        "id": "p001",
        "category": "canva",
        "name": "Canva Pro",
        "icon": ft.icons.PALETTE_OUTLINED,
        "price_from": 15000,
        "rating": 4.9,
        "sold": 1240,
        "badge": "BEST SELLER",
        "is_new": False,
        "warranty": "Garansi full 30 hari (garansi replace jika akun error)",
        "description": (
            "Akses penuh Canva Pro dengan seluruh template premium, "
            "background remover, Magic Resize, dan penyimpanan cloud besar."
        ),
        "includes": [
            "Akses semua template & elemen premium",
            "Background Remover tanpa batas",
            "Magic Resize & Brand Kit",
            "Penyimpanan cloud 1TB",
        ],
        "terms": [
            "Dilarang mengganti email & password akun",
            "1 akun hanya untuk 1 pengguna (invite/join)",
            "Tidak untuk aktivitas ilegal",
        ],
        "activation": "Invite email kamu ke Team Canva dalam 1-15 menit setelah order.",
        "packages": [
            {"name": "Canva Invite 1 Bulan", "price": 15000},
            {"name": "Canva Admin 1 Bulan", "price": 25000},
            {"name": "Canva Invite 1 Tahun", "price": 90000},
        ],
    },
    {
        "id": "p002",
        "category": "chatgpt",
        "name": "ChatGPT Plus",
        "icon": ft.icons.CHAT_BUBBLE_OUTLINE,
        "price_from": 55000,
        "rating": 4.8,
        "sold": 860,
        "badge": "HOT",
        "is_new": False,
        "warranty": "Garansi 30 hari full replace",
        "description": "Akses ChatGPT Plus dengan model tercepat, tanpa limit antrian saat sibuk.",
        "includes": ["Akses prioritas saat traffic tinggi", "Model & fitur terbaru", "Voice & image tools"],
        "terms": ["Tidak share ke pihak ketiga", "Dilarang ganti password"],
        "activation": "Login akun dikirim admin 1-15 menit setelah pembayaran.",
        "packages": [
            {"name": "Sharing 1 Bulan", "price": 55000},
            {"name": "Private 1 Bulan", "price": 150000},
        ],
    },
    {
        "id": "p003",
        "category": "netflix",
        "name": "Netflix Premium 4K",
        "icon": ft.icons.MOVIE_OUTLINED,
        "price_from": 45000,
        "rating": 4.9,
        "sold": 2100,
        "badge": "BEST SELLER",
        "is_new": False,
        "warranty": "Garansi 30 hari, full replace jika kena kick",
        "description": "Nonton sepuasnya kualitas Ultra HD 4K, bisa di 2 perangkat sekaligus.",
        "includes": ["Kualitas Ultra HD 4K", "2 layar bersamaan", "Semua judul & region"],
        "terms": ["Dilarang ganti profil orang lain", "Dilarang ubah bahasa/negara akun"],
        "activation": "Profil kamu langsung aktif dalam 1-10 menit.",
        "packages": [
            {"name": "Sharing 1 Profil", "price": 45000},
            {"name": "Private Full Akun", "price": 120000},
        ],
    },
    {
        "id": "p004",
        "category": "capcut",
        "name": "CapCut Pro",
        "icon": ft.icons.MOVIE_CREATION_OUTLINED,
        "price_from": 20000,
        "rating": 4.7,
        "sold": 530,
        "badge": "NEW",
        "is_new": True,
        "warranty": "Garansi 30 hari",
        "description": "Semua efek, template, dan aset premium CapCut untuk konten tanpa watermark.",
        "includes": ["Export tanpa watermark", "Template & efek premium", "Cloud storage tambahan"],
        "terms": ["1 akun 1 device aktif"],
        "activation": "Login dikirim admin maksimal 15 menit.",
        "packages": [{"name": "1 Bulan", "price": 20000}, {"name": "3 Bulan", "price": 50000}],
    },
    {
        "id": "p005",
        "category": "spotify",
        "name": "Spotify Premium",
        "icon": ft.icons.MUSIC_NOTE_OUTLINED,
        "price_from": 18000,
        "rating": 4.9,
        "sold": 1780,
        "badge": "BEST SELLER",
        "is_new": False,
        "warranty": "Garansi full 30 hari",
        "description": "Streaming musik tanpa iklan, kualitas tinggi, unlimited skip & offline mode.",
        "includes": ["Tanpa iklan", "Kualitas Very High", "Download offline unlimited"],
        "terms": ["Dilarang ganti email akun"],
        "activation": "Invite family plan 1-10 menit setelah order.",
        "packages": [{"name": "Individual 1 Bulan", "price": 18000}, {"name": "Family Slot 1 Bulan", "price": 12000}],
    },
    {
        "id": "p006",
        "category": "youtube",
        "name": "YouTube Premium",
        "icon": ft.icons.PLAY_CIRCLE_OUTLINE,
        "price_from": 20000,
        "rating": 4.8,
        "sold": 940,
        "badge": None,
        "is_new": False,
        "warranty": "Garansi 30 hari",
        "description": "Nonton YouTube tanpa iklan + akses YouTube Music Premium.",
        "includes": ["Bebas iklan", "Background play", "YouTube Music Premium termasuk"],
        "terms": ["Tidak boleh ganti lokasi akun"],
        "activation": "Invite family 1-10 menit.",
        "packages": [{"name": "Family Slot 1 Bulan", "price": 20000}],
    },
    {
        "id": "p007",
        "category": "disney",
        "name": "Disney+ Hotstar",
        "icon": ft.icons.CASTLE_OUTLINED,
        "price_from": 25000,
        "rating": 4.6,
        "sold": 410,
        "badge": "NEW",
        "is_new": True,
        "warranty": "Garansi 30 hari",
        "description": "Semua film & series Disney, Marvel, Pixar, Star Wars kualitas HD.",
        "includes": ["Kualitas Full HD", "Semua konten eksklusif", "2 perangkat"],
        "terms": ["Dilarang ubah profil lain"],
        "activation": "Profil aktif dalam 10 menit.",
        "packages": [{"name": "1 Bulan", "price": 25000}],
    },
    {
        "id": "p008",
        "category": "adobe",
        "name": "Adobe Creative Cloud",
        "icon": ft.icons.BRUSH_OUTLINED,
        "price_from": 65000,
        "rating": 4.7,
        "sold": 320,
        "badge": "HOT",
        "is_new": False,
        "warranty": "Garansi 30 hari full replace",
        "description": "Akses penuh Photoshop, Illustrator, Premiere Pro, dan seluruh aplikasi Adobe.",
        "includes": ["Semua aplikasi Adobe CC", "Cloud storage 100GB", "Update fitur terbaru"],
        "terms": ["1 device aktif", "Dilarang share ke luar"],
        "activation": "Login dikirim admin 15-30 menit.",
        "packages": [{"name": "1 Bulan", "price": 65000}],
    },
    {
        "id": "p009",
        "category": "microsoft",
        "name": "Microsoft 365",
        "icon": ft.icons.WINDOW_OUTLINED,
        "price_from": 35000,
        "rating": 4.8,
        "sold": 275,
        "badge": None,
        "is_new": False,
        "warranty": "Garansi 30 hari",
        "description": "Word, Excel, PowerPoint, Outlook, dan OneDrive 1TB dalam satu paket.",
        "includes": ["Aplikasi Office lengkap", "OneDrive 1TB", "Update otomatis"],
        "terms": ["1 akun 1 pengguna"],
        "activation": "Invite email 1-15 menit.",
        "packages": [{"name": "1 Bulan", "price": 35000}, {"name": "1 Tahun", "price": 300000}],
    },
    {
        "id": "p010",
        "category": "gemini",
        "name": "Gemini Advanced",
        "icon": ft.icons.AUTO_AWESOME_OUTLINED,
        "price_from": 50000,
        "rating": 4.7,
        "sold": 190,
        "badge": "NEW",
        "is_new": True,
        "warranty": "Garansi 30 hari",
        "description": "Model Gemini paling canggih dengan integrasi Google Workspace 2TB.",
        "includes": ["Akses model tercanggih", "Google One 2TB", "Prioritas fitur baru"],
        "terms": ["Dilarang ganti password"],
        "activation": "Login dikirim 1-15 menit.",
        "packages": [{"name": "1 Bulan", "price": 50000}],
    },
]

# ---------------------------------------------------------------------------
# BANNER PROMO — auto slider di Dashboard
# ---------------------------------------------------------------------------
PROMO_BANNERS = [
    {"title": "Diskon 20% Semua Produk AI", "subtitle": "Khusus hari ini", "icon": ft.icons.AUTO_AWESOME},
    {"title": "Netflix & Spotify Bundling", "subtitle": "Hemat hingga 30rb", "icon": ft.icons.LOCAL_FIRE_DEPARTMENT},
    {"title": "Member Baru Diskon 10%", "subtitle": "Pakai kode: RIFORA10", "icon": ft.icons.CARD_GIFTCARD},
]

# ---------------------------------------------------------------------------
# TESTIMONI
# ---------------------------------------------------------------------------
TESTIMONIALS = [
    {"name": "Dimas A.", "rating": 5, "text": "Proses order cepat banget, admin fast response. Recommended!"},
    {"name": "Sarah K.", "rating": 5, "text": "Akun Canva Pro aktif dalam 5 menit, harga juga murah."},
    {"name": "Budi S.", "rating": 4, "text": "Netflix lancar 4K, garansinya juga jelas. Puas!"},
    {"name": "Nadia R.", "rating": 5, "text": "Udah langganan 6 bulan, selalu aman dan terpercaya."},
]

# ---------------------------------------------------------------------------
# FAQ
# ---------------------------------------------------------------------------
FAQS = [
    {"q": "Apakah akun yang dijual aman?", "a": "Aman. Semua akun melalui proses pengecekan sebelum dikirim ke pembeli."},
    {"q": "Berapa lama proses aktivasi?", "a": "Rata-rata 1-15 menit setelah pembayaran dikonfirmasi admin."},
    {"q": "Apakah ada garansi jika akun bermasalah?", "a": "Ada, setiap produk memiliki garansi replace sesuai ketentuan masing-masing produk."},
    {"q": "Metode pembayaran apa saja yang tersedia?", "a": "Pembayaran dikonfirmasi langsung dengan admin melalui WhatsApp setelah order."},
    {"q": "Bagaimana cara order?", "a": "Pilih produk, pilih paket, tekan ORDER SEKARANG, lalu pilih admin — otomatis diarahkan ke WhatsApp."},
]

WHY_CHOOSE_US = [
    {"icon": ft.icons.VERIFIED_OUTLINED, "title": "Akun Terjamin", "desc": "Semua akun original & terpercaya"},
    {"icon": ft.icons.BOLT_OUTLINED, "title": "Proses Cepat", "desc": "Aktivasi rata-rata di bawah 15 menit"},
    {"icon": ft.icons.SUPPORT_AGENT_OUTLINED, "title": "CS Responsif", "desc": "Admin siap bantu 08.00 - 23.00"},
    {"icon": ft.icons.SHIELD_OUTLINED, "title": "Bergaransi", "desc": "Garansi replace di setiap produk"},
]
