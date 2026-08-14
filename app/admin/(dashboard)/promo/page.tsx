import { getPromos } from "@/lib/data";
import { Field, inputCls } from "@/components/admin/Field";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { createPromo, deletePromo, togglePromo } from "./actions";

export const dynamic = "force-dynamic";

export default async function PromoPage() {
  const promos = await getPromos();

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="font-display text-xl font-bold">Promo</h1>
      <p className="mt-1 mb-6 text-sm text-muted">Promo aktif tampil di halaman utama.</p>

      <div className="space-y-2.5">
        {promos.map((p) => (
          <div key={p.id} className="flex items-center justify-between rounded-xl2 border border-line bg-card p-4 shadow-card">
            <div className="min-w-0">
              <div className="truncate text-sm font-bold">{p.title}</div>
              <div className="truncate text-[11px] text-muted">{p.desc}</div>
            </div>
            <div className="flex items-center gap-1">
              <form action={togglePromo}>
                <input type="hidden" name="id" value={p.id} />
                <input type="hidden" name="active" value={(!p.active).toString()} />
                <button
                  type="submit"
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                    p.active ? "bg-mint/15 text-mint" : "bg-muted/15 text-muted"
                  }`}
                >
                  {p.active ? "Aktif" : "Nonaktif"}
                </button>
              </form>
              <DeleteButton action={deletePromo} hiddenFields={{ id: p.id }} />
            </div>
          </div>
        ))}
        {promos.length === 0 && <p className="text-sm text-muted">Belum ada promo.</p>}
      </div>

      <form action={createPromo} className="mt-6 space-y-3 rounded-xl2 border border-line bg-card p-5 shadow-card">
        <h2 className="font-display text-sm font-bold">Tambah Promo</h2>
        <Field label="Judul Promo">
          <input name="title" required className={inputCls} placeholder="Promo Akhir Bulan" />
        </Field>
        <Field label="Deskripsi">
          <textarea name="desc" rows={2} className={inputCls} placeholder="Diskon tambahan untuk..." />
        </Field>
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input type="checkbox" name="active" defaultChecked className="h-4 w-4 accent-primary" />
          Aktifkan sekarang
        </label>
        <button type="submit" className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary-dark">
          Simpan Promo
        </button>
      </form>
    </div>
  );
}
