import Link from "next/link";
import Image from "next/image";

export function TopBar({
  title,
  subtitle,
  compact = false,
  logoUrl,
}: {
  title: string;
  subtitle?: string;
  compact?: boolean;
  logoUrl?: string;
}) {
  return (
    <header className={`flex items-center gap-3 px-5 ${compact ? "pt-5 pb-3" : "pt-7 pb-4"}`}>
      <Link
        href="/"
        className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl2 bg-gradient-to-br from-primary to-primary-dark font-display text-lg font-extrabold text-white shadow-card"
      >
        {logoUrl ? (
          <Image src={logoUrl} alt={title} fill sizes="44px" className="object-cover" unoptimized />
        ) : (
          "R"
        )}
      </Link>
      <div className="min-w-0">
        <div className="font-display text-[15px] font-bold leading-tight">{title}</div>
        {subtitle && <div className="truncate text-xs text-muted">{subtitle}</div>}
      </div>
    </header>
  );
}
