"""
AI Assistant — rule-based, hanya menjawab seputar informasi toko
(harga, garansi, cara order, cara aktivasi, produk, jam operasional).
Tidak memanggil API eksternal apa pun, sesuai requirement "JANGAN menggunakan API".
"""
from data.store_data import PRODUCTS, STORE_INFO
from services.whatsapp import format_rupiah

GREETINGS = ("halo", "hai", "hi", "hello", "pagi", "siang", "sore", "malam")


def _find_product(text: str):
    text_lower = text.lower()
    for product in PRODUCTS:
        if product["name"].lower() in text_lower or product["category"] in text_lower:
            return product
    return None


def get_ai_response(user_text: str) -> str:
    text = user_text.lower().strip()

    if not text:
        return "Silakan tanyakan sesuatu ya, aku siap bantu seputar produk Rifora Premium 😊"

    if any(g in text for g in GREETINGS):
        return (
            "Halo! Selamat datang di Rifora Premium 👋\n"
            "Aku bisa bantu jawab soal harga, garansi, cara order, cara aktivasi, "
            "daftar produk, atau jam operasional. Mau tanya yang mana?"
        )

    product = _find_product(text)

    if "harga" in text or "berapa" in text:
        if product:
            return (
                f"Harga {product['name']} mulai dari {format_rupiah(product['price_from'])}. "
                f"Ada {len(product['packages'])} pilihan paket, cek halaman detail produk untuk rincian lengkapnya ya."
            )
        return "Harga tiap produk berbeda-beda, mulai dari Rp15.000. Sebutkan nama produknya biar aku kasih harga pastinya!"

    if "garansi" in text:
        if product:
            return f"{product['name']} memiliki: {product['warranty']}."
        return "Semua produk di Rifora Premium bergaransi replace 30 hari apabila akun bermasalah."

    if "cara order" in text or "order" in text or "beli" in text or "cara beli" in text:
        return (
            "Cara order gampang banget:\n"
            "1. Pilih produk yang kamu mau\n"
            "2. Pilih paket & jumlah\n"
            "3. Tekan tombol ORDER SEKARANG\n"
            "4. Pilih admin\n"
            "5. Kamu akan diarahkan ke WhatsApp dengan pesan otomatis — tinggal kirim!"
        )

    if "aktivasi" in text or "aktif" in text:
        if product:
            return f"Cara aktivasi {product['name']}: {product['activation']}"
        return f"Aktivasi biasanya {STORE_INFO['activation_time']}, tergantung produknya."

    if "produk" in text or "jual apa" in text or "list" in text or "katalog" in text:
        names = ", ".join(p["name"] for p in PRODUCTS[:8])
        return f"Beberapa produk kami: {names}, dan masih banyak lagi. Cek tab Produk untuk lihat semua!"

    if "jam" in text or "operasional" in text or "buka" in text:
        return f"Kami melayani order setiap hari, jam operasional: {STORE_INFO['operating_hours']}."

    if product:
        return (
            f"{product['name']}: {product['description']} "
            f"Harga mulai {format_rupiah(product['price_from'])}, {product['warranty']}."
        )

    return (
        "Maaf, aku hanya bisa bantu jawab seputar info toko Rifora Premium "
        "(harga, garansi, cara order, cara aktivasi, produk, jam operasional). "
        "Coba tanyakan itu ya!"
    )
