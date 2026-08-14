import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Plus } from "lucide-react";
import { db } from "@/lib/db";
import { formatRupiah } from "@/lib/format";
import { BrandFormFields } from "@/components/admin/BrandFormFields";
import { Field, inputCls } from "@/components/admin/Field";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { updateBrand, addPackage, deletePackage } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditBrandPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const brand = await db.brand.findUnique({ where: { id }, include: { packages: { orderBy: { order: "asc" } } } });
  if (!brand) notFound();

  const updateBrandWithId = updateBrand.bind(null, id);
  const addPackageWithId = addPackage.bind(null, id);

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <Link href="/admin/brands" className="flex items-center gap-1.5 text-sm font-semibold text-muted">
        <ArrowLeft size={16} /> Kembali
      </Link>

      <div>
        <h1 className="font-display text-xl font-bold">Edit {brand.name}</h1>
        <p className="mt-1 text-sm text-muted">/produk/{brand.slug}</p>
      </div>

      <form action={updateBrandWithId} className="rounded-xl2 border border-line bg-card p-5 shadow-card">
        <BrandFormFields brand={brand} />
        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary-dark"
        >
          Simpan Perubahan
        </button>
      </form>

      <div className="rounded-xl2 border border-line bg-card p-5 shadow-card">
        <h2 className="mb-4 font-display text-sm font-bold">Paket & Harga</h2>

        <div className="space-y-2.5">
          {brand.packages.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-xl border border-line bg-bg px-3.5 py-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{p.name}</div>
                <div className="text-[11px] text-muted">
                  {formatRupiah(p.price)} · Garansi {p.warranty} {p.note && `· ${p.note}`}
                </div>
              </div>
              <DeleteButton
                action={deletePackage}
                hiddenFields={{ id: p.id, brandId: brand.id }}
                confirmText="Hapus paket ini?"
              />
            </div>
          ))}
          {brand.packages.length === 0 && (
            <p className="text-sm text-muted">Belum ada paket. Tambahkan di bawah.</p>
          )}
        </div>

        <form action={addPackageWithId} className="mt-5 space-y-3 border-t border-line pt-5">
          <Field label="Nama Paket">
            <input name="name" required placeholder="Contoh: Sharing 1 Bulan" className={inputCls} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Harga (Rp)">
              <input name="price" type="number" required min={0} placeholder="25000" className={inputCls} />
            </Field>
            <Field label="Garansi">
              <input name="warranty" required placeholder="1 Bulan" className={inputCls} />
            </Field>
          </div>
          <Field label="Keterangan (opsional)">
            <input name="note" placeholder="Contoh: Sharing 5 User" className={inputCls} />
          </Field>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-primary py-2.5 text-sm font-bold text-primary hover:bg-primary-light"
          >
            <Plus size={15} /> Tambah Paket
          </button>
        </form>
      </div>
    </div>
  );
}
