"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Tag,
  GalleryHorizontal,
  Gift,
  CircleHelp,
  Bot,
  Settings,
  Menu,
  X,
  LogOut,
  Store,
} from "lucide-react";
import { logout } from "@/app/admin/login/actions";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/brands", label: "Brand", icon: Tag },
  { href: "/admin/banners", label: "Banner", icon: GalleryHorizontal },
  { href: "/admin/promo", label: "Promo", icon: Gift },
  { href: "/admin/faq", label: "FAQ", icon: CircleHelp },
  { href: "/admin/ai", label: "AI Knowledge", icon: Bot },
  { href: "/admin/settings", label: "Pengaturan", icon: Settings },
];

export function AdminSidebar({ logoUrl }: { logoUrl?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-card shadow-card md:hidden"
        aria-label="Buka menu"
      >
        <Menu size={18} />
      </button>

      {open && (
        <div className="fixed inset-0 z-40 bg-ink/40 md:hidden" onClick={() => setOpen(false)} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-line bg-card p-5 transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary-dark font-display text-sm font-extrabold text-white">
              {logoUrl ? (
                <Image src={logoUrl} alt="Logo" fill sizes="36px" className="object-cover" unoptimized />
              ) : (
                "R"
              )}
            </div>
            <div>
              <div className="text-sm font-bold leading-none">Rifora</div>
              <div className="mt-0.5 text-[10px] text-muted">Admin Panel</div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="p-1 md:hidden" aria-label="Tutup menu">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {items.map(({ href, label, icon: Icon }) => {
            const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  active ? "bg-primary-light text-primary" : "text-muted hover:bg-bg hover:text-ink"
                }`}
              >
                <Icon size={17} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-line pt-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted hover:bg-bg hover:text-ink"
          >
            <Store size={17} />
            Lihat Toko
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-coral hover:bg-coral/10"
            >
              <LogOut size={17} />
              Keluar
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
