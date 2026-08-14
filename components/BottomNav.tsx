"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingCart, Bot } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const items = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/produk", label: "Produk", icon: LayoutGrid },
  { href: "/keranjang", label: "Keranjang", icon: ShoppingCart, cart: true },
  { href: "/ai", label: "AI Assistant", icon: Bot },
];

export function BottomNav() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {items.map(({ href, label, icon: Icon, cart }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition ${
                active ? "text-primary" : "text-muted"
              }`}
            >
              <span className="relative">
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                {cart && count > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-coral px-1 text-[9px] font-bold text-white">
                    {count}
                  </span>
                )}
              </span>
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
