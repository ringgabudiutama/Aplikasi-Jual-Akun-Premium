import { formatRupiah } from "./format";

/** Normalizes an Indonesian phone number ("0822...", "+62822...", "62822...") to bare 62xxxxxxxxxx for wa.me links. */
export function toWaNumber(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return "62" + digits.slice(1);
  return "62" + digits;
}

export function buildOrderMessage(opts: {
  storeName: string;
  brandName: string;
  packageName: string;
  warranty: string;
  qty: number;
  total: number;
}) {
  const { storeName, brandName, packageName, warranty, qty, total } = opts;
  return [
    `Halo Admin *${storeName}* 👋`,
    ``,
    `Saya ingin order:`,
    `🛍️ Produk: *${brandName}*`,
    `📦 Paket: ${packageName}`,
    `🛡️ Garansi: ${warranty}`,
    `🔢 Jumlah: ${qty}`,
    `💰 Total: *${formatRupiah(total)}*`,
    ``,
    `Mohon info langkah selanjutnya untuk pembayaran ya, terima kasih 🙏`,
  ].join("\n");
}

export function buildWaLink(phone: string, message: string) {
  return `https://wa.me/${toWaNumber(phone)}?text=${encodeURIComponent(message)}`;
}
