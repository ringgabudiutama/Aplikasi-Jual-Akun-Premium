import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { getBrands } from "@/lib/data";
import { deleteBrand, toggleBrandStatus } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-bold">Brand</h1>
          <p className="mt-1 text-sm text-muted">{brands.length} brand terdaftar</p>
        </div>
        <Link
          href="/admin/brands/new"
          className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white"
        >
          <Plus size={16} /> Tambah
        </Link>
      </div>

      <div className="mt-6 space-y-2.5 md:hidden">
        {brands.map((b) => (
          <div key={b.id} className="flex items-center gap-3 rounded-xl2 border border-line bg-card p-3 shadow-card">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-primary-light">
              <Image src={b.logoUrl} alt={b.name} fill sizes="48px" className="object-cover" unoptimized />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold">{b.name}</div>
              <div className="truncate text-[11px] text-muted">{b.category} · {b.packages.length} paket</div>
            </div>
            <StatusToggle id={b.id} status={b.status} />
            <Link href={`/admin/brands/${b.id}`} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-bg">
              <Pencil size={15} />
            </Link>
            <DeleteButton action={deleteBrand} hiddenFields={{ id: b.id }} />
          </div>
        ))}
      </div>

      <div className="mt-6 hidden overflow-hidden rounded-xl2 border border-line bg-card shadow-card md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs text-muted">
              <th className="p-3 font-semibold">Logo</th>
              <th className="p-3 font-semibold">Nama</th>
              <th className="p-3 font-semibold">Kategori</th>
              <th className="p-3 font-semibold">Badge</th>
              <th className="p-3 font-semibold">Paket</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((b) => (
              <tr key={b.id} className="border-b border-line last:border-0">
                <td className="p-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-primary-light">
                    <Image src={b.logoUrl} alt={b.name} fill sizes="40px" className="object-cover" unoptimized />
                  </div>
                </td>
                <td className="p-3 font-semibold">{b.name}</td>
                <td className="p-3 text-muted">{b.category}</td>
                <td className="p-3 text-muted">{b.badge || "—"}</td>
                <td className="p-3 text-muted">{b.packages.length}</td>
                <td className="p-3">
                  <StatusToggle id={b.id} status={b.status} />
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <Link href={`/admin/brands/${b.id}`} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-bg">
                      <Pencil size={15} />
                    </Link>
                    <DeleteButton action={deleteBrand} hiddenFields={{ id: b.id }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusToggle({ id, status }: { id: string; status: string }) {
  const next = status === "aktif" ? "nonaktif" : "aktif";
  return (
    <form action={toggleBrandStatus}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={next} />
      <button
        type="submit"
        className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
          status === "aktif" ? "bg-mint/15 text-mint" : "bg-muted/15 text-muted"
        }`}
      >
        {status}
      </button>
    </form>
  );
}
