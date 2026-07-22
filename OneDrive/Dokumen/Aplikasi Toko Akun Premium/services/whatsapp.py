"""
Generator link wa.me untuk fitur "WhatsApp Auto Order".
Tidak ada payment gateway / checkout — order difinalisasi manual oleh admin
lewat chat WhatsApp sesuai requirement.
"""
from urllib.parse import quote


def format_rupiah(amount: int) -> str:
    return f"Rp{amount:,.0f}".replace(",", ".")


def build_order_message(product_name: str, package_name: str, qty: int, total: int) -> str:
    """Susun pesan otomatis persis sesuai template yang diminta."""
    message = (
        "Halo Admin Rifora Premium,\n\n"
        "Saya ingin membeli:\n\n"
        f"Produk : {product_name}\n"
        f"Paket : {package_name}\n"
        f"Jumlah : {qty}\n"
        f"Total : {format_rupiah(total)}\n\n"
        "Mohon diproses.\n\n"
        "Terima kasih."
    )
    return message


def build_wa_link(phone: str, message: str) -> str:
    """phone harus format internasional tanpa '+' atau '0' di depan (mis. 62...)."""
    clean_phone = phone.strip()
    if clean_phone.startswith("0"):
        clean_phone = "62" + clean_phone[1:]
    return f"https://wa.me/{clean_phone}?text={quote(message)}"
