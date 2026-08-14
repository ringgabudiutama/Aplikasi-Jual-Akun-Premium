import Link from "next/link";

export function TopBar({
  title,
  subtitle,
  compact = false,
}: {
  title: string;
  subtitle?: string;
  compact?: boolean;
}) {
  return (
    <header className={`flex items-center gap-3 px-5 ${compact ? "pt-5 pb-3" : "pt-7 pb-4"}`}>
      <Link
        href="/"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl2 bg-gradient-to-br from-primary to-primary-dark font-display text-lg font-extrabold text-white shadow-card"
      >
        R
      </Link>
      <div className="min-w-0">
        <div className="font-display text-[15px] font-bold leading-tight">{title}</div>
        {subtitle && <div className="truncate text-xs text-muted">{subtitle}</div>}
      </div>
    </header>
  );
}
