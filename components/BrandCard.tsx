import Link from "next/link";
import Image from "next/image";
import type { Brand } from "@/lib/types";

const badgeStyle: Record<string, string> = {
  "BEST SELLER": "bg-coral text-white",
  HOT: "bg-amber text-ink",
  NEW: "bg-mint text-white",
};

export function BrandCard({ brand, wide = false }: { brand: Brand; wide?: boolean }) {
  return (
    <Link
      href={`/produk/${brand.slug}`}
      className={`group flex shrink-0 flex-col overflow-hidden rounded-xl2 border border-line bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-soft ${
        wide ? "w-36" : "w-full"
      }`}
    >
      <div className="relative flex aspect-square items-center justify-center bg-primary-light p-5">
        <Image
          src={brand.logoUrl}
          alt={brand.name}
          fill
          sizes="200px"
          className="object-cover"
          unoptimized
        />
        {brand.badge && (
          <span
            className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-bold ${
              badgeStyle[brand.badge] || "bg-primary text-white"
            }`}
          >
            {brand.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-0.5 p-3">
        <div className="truncate text-sm font-bold">{brand.name}</div>
        <div className="truncate text-[11px] text-muted">{brand.category}</div>
      </div>
    </Link>
  );
}
