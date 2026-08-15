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
    <div className="pb-10">
      <div className="flex items-center gap-3 px-5 pt-5">
        <Link
          href="/produk"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-card"
          aria-label="Kembali"
        >
          <ArrowLeft size={17} />
        </Link>
      </div>

      <div className="px-5 pt-3">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl2 bg-primary-light shadow-card">
          <Image src={brand.logoUrl} alt={brand.name} fill sizes="480px" className="object-cover" unoptimized />
        </div>
      </div>

      <div className="px-5 pt-5 text-center">
        <h1 className="font-display text-xl font-extrabold">{brand.name}</h1>
        <span className="mt-1 inline-block rounded-full bg-primary-light px-3 py-1 text-[11px] font-bold text-primary">
          {brand.category}
        </span>
        {brand.description && (
          <p className="mx-auto mt-3 max-w-sm text-[13px] leading-relaxed text-muted">{brand.description}</p>
        )}
      </div>

      <div className="mt-8">
        <OrderPanel brand={brand} admins={admins} storeName={settings.storeName} />
      </div>
    </div>
  );
}
