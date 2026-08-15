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
  qty: number;
}) {
  const { storeName, brandName, qty } = opts;
  return [
    `Halo Admin *${storeName}* 👋`,
    ``,
    `Saya ingin order:`,
    `🛍️ Produk: *${brandName}*`,
    `🔢 Jumlah: ${qty}`,
    ``,
    `Mohon info paket, harga, dan langkah pembayarannya ya, terima kasih 🙏`,
  ].join("\n");
}

export function buildCartMessage(opts: {
  storeName: string;
  items: { brandName: string; qty: number }[];
}) {
  const { storeName, items } = opts;
  return [
    `Halo Admin *${storeName}* 👋`,
    ``,
    `Saya ingin order beberapa produk sekaligus:`,
    ``,
    ...items.map((i, idx) => `${idx + 1}. *${i.brandName}* (x${i.qty})`),
    ``,
    `Mohon info paket, harga, dan langkah pembayarannya ya, terima kasih 🙏`,
  ].join("\n");
}

export function buildWaLink(phone: string, message: string) {
  return `https://wa.me/${toWaNumber(phone)}?text=${encodeURIComponent(message)}`;
}
