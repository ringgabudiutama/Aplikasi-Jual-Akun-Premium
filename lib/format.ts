export function formatRupiah(n: number) {
  return "Rp" + Number(n || 0).toLocaleString("id-ID");
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
