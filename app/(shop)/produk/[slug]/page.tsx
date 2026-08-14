import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { OrderPanel } from "@/components/OrderPanel";
import { getBrandBySlug, getAdminNumbers, getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ProdukDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [brand, admins, settings] = await Promise.all([
    getBrandBySlug(slug),
    getAdminNumbers(),
    getSettings(),
  ]);

  if (!brand || brand.status !== "aktif") notFound();

  return (
    <div className="pb-28">
      <div className="flex items-center gap-3 px-5 pt-5">
        <Link
          href="/produk"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-card"
          aria-label="Kembali"
        >
          <ArrowLeft size={17} />
        </Link>
      </div>

      <div className="flex flex-col items-center px-5 pt-2 text-center">
        <div className="relative h-24 w-24 overflow-hidden rounded-xl2 bg-primary-light shadow-card">
          <Image src={brand.logoUrl} alt={brand.name} fill sizes="96px" className="object-cover" unoptimized />
        </div>
        <h1 className="mt-3 font-display text-xl font-extrabold">{brand.name}</h1>
        <span className="mt-1 rounded-full bg-primary-light px-3 py-1 text-[11px] font-bold text-primary">
          {brand.category}
        </span>
        {brand.description && (
          <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-muted">{brand.description}</p>
        )}
      </div>

      <div className="mt-6">
        <h2 className="px-5 pb-3 font-display text-sm font-bold">Pilih Paket</h2>
        <OrderPanel brand={brand} admins={admins} storeName={settings.storeName} />
      </div>
    </div>
  );
}
