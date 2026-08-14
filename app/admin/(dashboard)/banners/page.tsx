import { getBanners } from "@/lib/data";
import { Field, inputCls } from "@/components/admin/Field";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { createBanner, deleteBanner } from "./actions";

export const dynamic = "force-dynamic";

const colorLabel: Record<string, string> = { a: "Ungu Terang", b: "Ungu Gelap", c: "Pink Lembut" };

export default async function BannersPage() {
  const banners = await getBanners();

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="font-display text-xl font-bold">Banner</h1>
      <p className="mt-1 mb-6 text-sm text-muted">Banner tampil di carousel halaman utama.</p>

      <div className="space-y-2.5">
        {banners.map((b) => (
          <div key={b.id} className="flex items-center justify-between rounded-xl2 border border-line bg-card p-4 shadow-card">
            <div className="min-w-0">
              <div className="truncate text-sm font-bold">{b.title}</div>
              <div className="truncate text-[11px] text-muted">{b.subtitle} · {colorLabel[b.color] || b.color}</div>
            </div>
            <DeleteButton action={deleteBanner} hiddenFields={{ id: b.id }} />
          </div>
        ))}
        {banners.length === 0 && <p className="text-sm text-muted">Belum ada banner.</p>}
      </div>

      <form action={createBanner} className="mt-6 space-y-3 rounded-xl2 border border-line bg-card p-5 shadow-card">
        <h2 className="font-display text-sm font-bold">Tambah Banner</h2>
        <Field label="Judul">
          <input name="title" required className={inputCls} placeholder="Akun Premium Diskon Spesial" />
        </Field>
        <Field label="Subjudul">
          <input name="subtitle" className={inputCls} placeholder="Hemat hingga 50%" />
        </Field>
        <Field label="Warna Gradient">
          <select name="color" defaultValue="a" className={inputCls}>
            <option value="a">Ungu Terang</option>
            <option value="b">Ungu Gelap</option>
            <option value="c">Pink Lembut</option>
          </select>
        </Field>
        <button type="submit" className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary-dark">
          Simpan Banner
        </button>
      </form>
    </div>
  );
}
