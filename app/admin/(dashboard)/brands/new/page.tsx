import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandFormFields } from "@/components/admin/BrandFormFields";
import { createBrand } from "../actions";

export default function NewBrandPage() {
  return (
    <div className="mx-auto max-w-lg">
      <Link href="/admin/brands" className="mb-4 flex items-center gap-1.5 text-sm font-semibold text-muted">
        <ArrowLeft size={16} /> Kembali
      </Link>
      <h1 className="font-display text-xl font-bold">Tambah Brand</h1>
      <p className="mt-1 mb-6 text-sm text-muted">Paket harga bisa ditambahkan setelah brand dibuat.</p>

      <form action={createBrand} className="rounded-xl2 border border-line bg-card p-5 shadow-card">
        <BrandFormFields />
        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary-dark"
        >
          Simpan & Lanjut Atur Paket
        </button>
      </form>
    </div>
  );
}
