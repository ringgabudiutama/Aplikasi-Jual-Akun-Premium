import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Zap } from "lucide-react";

export function Hero({
  storeName,
  tagline,
  brandCount,
  logoUrl,
}: {
  storeName: string;
  tagline: string;
  brandCount: number;
  logoUrl?: string;
}) {
  return (
    <section className="relative overflow-hidden px-5 pt-2">
      <div className="pointer-events-none absolute -left-24 -top-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-24 h-48 w-48 rounded-full bg-coral/20 blur-3xl" />

      <span className="relative inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1 text-[11px] font-bold text-primary">
        <Zap size={12} fill="currentColor" /> {brandCount}+ layanan premium tersedia
      </span>

      <h1 className="relative mt-4 font-display text-[28px] font-extrabold leading-[1.15] tracking-tight">
        Satu Tempat Untuk
        <br />
        Semua <span className="text-primary">Akun Premium</span> Favoritmu
      </h1>
      <p className="relative mt-3 max-w-xs text-sm leading-relaxed text-muted">{tagline}</p>

      <div className="relative mt-5 flex items-center gap-3">
        <Link
          href="/produk"
          className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-primary-dark"
        >
          Lihat Produk
        </Link>
        <Link
          href="/ai"
          className="rounded-full border border-line px-5 py-3 text-sm font-bold text-ink transition hover:border-primary hover:text-primary"
        >
          Tanya AI
        </Link>
      </div>

      {/* Signature: orbiting constellation representing the many apps under one roof */}
      <div className="relative mx-auto mb-6 mt-8 h-60 w-60">
        <div className="absolute inset-0 animate-orbit">
          <Dot className="left-1/2 top-0 -translate-x-1/2 bg-coral" />
          <Dot className="right-0 top-1/2 -translate-y-1/2 bg-mint" size={16} />
          <Dot className="bottom-0 left-1/2 -translate-x-1/2 bg-amber" />
          <Dot className="left-0 top-1/2 -translate-y-1/2 bg-primary" size={14} />
        </div>
        <div className="absolute inset-6 rounded-full border-2 border-dashed border-primary/25 animate-orbit-rev" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary-dark font-display text-3xl font-extrabold text-white shadow-soft">
            {logoUrl ? (
              <Image src={logoUrl} alt={storeName} fill sizes="96px" className="object-cover" unoptimized />
            ) : (
              "R"
            )}
          </div>
        </div>

        <div className="absolute -left-3 top-2 animate-float rounded-2xl bg-card px-3 py-2.5 shadow-soft">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mint/15 text-mint">
              <ShieldCheck size={15} />
            </span>
            <div>
              <div className="text-[13px] font-extrabold leading-none">Bergaransi</div>
              <div className="text-[10px] text-muted">Setiap pembelian</div>
            </div>
          </div>
        </div>

        <div
          className="absolute -right-2 bottom-4 animate-float rounded-2xl bg-card px-3 py-2.5 shadow-soft"
          style={{ animationDelay: "1.2s" }}
        >
          <div className="text-[13px] font-extrabold leading-none">24/7</div>
          <div className="text-[10px] text-muted">Admin fast response</div>
        </div>
      </div>
    </section>
  );
}

function Dot({ className, size = 12 }: { className: string; size?: number }) {
  return (
    <span
      className={`absolute rounded-full shadow-soft ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
