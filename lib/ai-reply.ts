import { formatRupiah } from "./format";
import type { AiKnowledge, Brand } from "./types";

export function aiReply(question: string, brands: Brand[], knowledge: AiKnowledge[]): string {
  const q = question.toLowerCase();

  const foundBrand = brands.find((b) => q.includes(b.name.toLowerCase()));
  if (foundBrand && foundBrand.packages.length) {
    const cheapest = [...foundBrand.packages].sort((a, b) => a.price - b.price)[0];
    return `${foundBrand.name} tersedia mulai dari ${formatRupiah(cheapest.price)} (${cheapest.name}, garansi ${cheapest.warranty}). Total ada ${foundBrand.packages.length} pilihan paket. Buka tab Produk untuk lihat semua paketnya ya!`;
  }

  if (q.includes("harga") || q.includes("berapa")) {
    return "Harga tiap brand berbeda-beda tergantung paket dan masa aktifnya. Silakan buka tab Produk lalu pilih brand yang kamu mau untuk melihat daftar harga lengkapnya.";
  }
  if (q.includes("order") || q.includes("beli") || q.includes("cara")) {
    const k = knowledge.find((k) => k.topic.toLowerCase().includes("cara order"));
    return k
      ? k.content
      : "Pilih brand di tab Produk, pilih paket, klik Beli Sekarang, lalu pilih admin — kamu akan diarahkan ke WhatsApp untuk konfirmasi.";
  }
  if (q.includes("garansi")) {
    const k = knowledge.find((k) => k.topic.toLowerCase().includes("garansi"));
    return k ? k.content : "Setiap paket punya masa garansi berbeda, cek keterangan di halaman detail produk ya.";
  }
  if (q.includes("jam") || q.includes("operasional") || q.includes("buka")) {
    const k = knowledge.find((k) => k.topic.toLowerCase().includes("jam operasional"));
    return k ? k.content : "Admin kami melayani setiap hari pukul 08.00 - 23.00 WIB.";
  }
  if (q.includes("produk") || q.includes("brand") || q.includes("apa saja")) {
    return `Kami menyediakan ${brands.map((b) => b.name).join(", ")}. Cek tab Produk untuk detail lengkapnya!`;
  }
  if (q.includes("halo") || q.includes("hai") || q.includes("hi")) {
    return "Halo juga! Ada yang bisa saya bantu seputar produk kami?";
  }

  for (const k of knowledge) {
    if (q.includes(k.topic.toLowerCase())) return k.content;
  }

  return "Maaf, saya belum menemukan jawaban pastinya. Untuk info lebih lanjut, silakan hubungi admin kami langsung lewat tombol Beli Sekarang atau menu Keranjang.";
}
