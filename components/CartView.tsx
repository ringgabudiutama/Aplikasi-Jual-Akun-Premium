"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { buildCartMessage } from "@/lib/whatsapp";
import { AdminPickerSheet } from "@/components/AdminPickerSheet";
import type { AdminNumber } from "@/lib/types";

export function CartView({ admins, storeName }: { admins: AdminNumber[]; storeName: string }) {
  const { items, setQty, removeItem } = useCart();
  const [sheetOpen, setSheetOpen] = useState(false);

  const message = buildCartMessage({
    storeName,
    items: items.map((i) => ({ brandName: i.brandName, qty: i.qty })),
  });

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center px-8 pt-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light text-primary">
          <ShoppingBag size={26} />
        </span>
        <p className="mt-4 text-sm text-muted">
          Keranjang kamu masih kosong.
          <br />
          Yuk cari layanan premium favoritmu.
        </p>
        <Link
          href="/produk"
          className="mt-5 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white"
        >
          Lihat Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-28">
      <div className="space-y-3 px-5">
        {items.map((i) => (
          <div key={i.brandSlug} className="flex gap-3 rounded-xl2 border border-line bg-card p-3 shadow-card">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-primary-light">
              <Image src={i.logoUrl} alt={i.brandName} fill sizes="56px" className="object-cover" unoptimized />
            </div>
            <div className="flex min-w-0 flex-1 items-center justify-between">
              <div className="truncate text-sm font-bold">{i.brandName}</div>
              <div className="flex items-center gap-2 rounded-full border border-line px-1.5 py-0.5">
                <button
                  onClick={() => setQty(i.brandSlug, i.qty - 1)}
                  className="flex h-6 w-6 items-center justify-center text-muted"
                  aria-label="Kurangi"
                >
                  <Minus size={12} />
                </button>
                <span className="w-4 text-center font-mono text-xs font-bold">{i.qty}</span>
                <button
                  onClick={() => setQty(i.brandSlug, i.qty + 1)}
                  className="flex h-6 w-6 items-center justify-center text-muted"
                  aria-label="Tambah"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
            <button
              onClick={() => removeItem(i.brandSlug)}
              className="h-fit shrink-0 rounded-full p-1.5 text-muted hover:bg-bg hover:text-coral"
              aria-label="Hapus"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="fixed inset-x-0 bottom-16 z-30 mx-auto max-w-lg border-t border-line bg-card/95 px-5 py-3.5 backdrop-blur">
        <button
          onClick={() => setSheetOpen(true)}
          className="w-full rounded-full bg-primary py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-primary-dark"
        >
          Checkout via WhatsApp ({items.length} produk)
        </button>
      </div>

      <AdminPickerSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        admins={admins}
        message={message}
      />
    </div>
  );
}
