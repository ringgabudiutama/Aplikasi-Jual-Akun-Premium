import { Phone, Plus } from "lucide-react";
import { getSettings, getAdminNumbers } from "@/lib/data";
import { Field, inputCls } from "@/components/admin/Field";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { updateSettings, addAdminNumber, deleteAdminNumber } from "./actions";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const [settings, admins] = await Promise.all([getSettings(), getAdminNumbers()]);

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="font-display text-xl font-bold">Pengaturan</h1>
        <p className="mt-1 text-sm text-muted">Identitas toko & nomor admin WhatsApp.</p>
      </div>

      <form action={updateSettings} className="space-y-4 rounded-xl2 border border-line bg-card p-5 shadow-card">
        <Field label="Nama Toko">
          <input name="storeName" defaultValue={settings.storeName} required className={inputCls} />
        </Field>
        <Field label="Tagline">
          <input name="tagline" defaultValue={settings.tagline} className={inputCls} />
        </Field>
        <button type="submit" className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary-dark">
          Simpan Pengaturan
        </button>
      </form>

      <div className="rounded-xl2 border border-line bg-card p-5 shadow-card">
        <h2 className="mb-4 font-display text-sm font-bold">Nomor Admin WhatsApp</h2>
        <p className="mb-4 text-xs text-muted">
          Muncul sebagai pilihan admin saat pembeli menekan &ldquo;Beli Sekarang&rdquo; atau checkout keranjang.
        </p>

        <div className="space-y-2.5">
          {admins.map((a) => (
            <div key={a.id} className="flex items-center justify-between rounded-xl border border-line bg-bg px-3.5 py-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mint/15 text-mint">
                  <Phone size={14} />
                </span>
                <div>
                  <div className="text-sm font-semibold">{a.name}</div>
                  <div className="text-[11px] text-muted">{a.phone}</div>
                </div>
              </div>
              <DeleteButton action={deleteAdminNumber} hiddenFields={{ id: a.id }} confirmText="Hapus nomor admin ini?" />
            </div>
          ))}
          {admins.length === 0 && <p className="text-sm text-muted">Belum ada nomor admin.</p>}
        </div>

        <form action={addAdminNumber} className="mt-5 space-y-3 border-t border-line pt-5">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nama Admin">
              <input name="name" required placeholder="Admin 1" className={inputCls} />
            </Field>
            <Field label="Nomor WhatsApp">
              <input name="phone" required placeholder="08xxxxxxxxxx" className={inputCls} />
            </Field>
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-primary py-2.5 text-sm font-bold text-primary hover:bg-primary-light"
          >
            <Plus size={15} /> Tambah Nomor Admin
          </button>
        </form>
      </div>
    </div>
  );
}
