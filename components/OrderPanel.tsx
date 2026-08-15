"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { AdminPickerSheet } from "@/components/AdminPickerSheet";
import { useCart } from "@/lib/cart-context";
import { buildOrderMessage } from "@/lib/whatsapp";
import type { AdminNumber, Brand } from "@/lib/types";

export function OrderPanel({
  brand,
  admins,
  storeName,
}: {
  brand: Brand;
  admins: AdminNumber[];
  storeName: string;
}) {
  const { addItem } = useCart();
  const [qty, setQtyState] = useState(1);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [toast, setToast] = useState("");

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  }

  function handleAddToCart() {
    addItem({
      brandSlug: brand.slug,
      brandName: brand.name,
      brandIcon: brand.icon,
      logoUrl: brand.logoUrl,
      qty,
    });
    showToast("Ditambahkan ke keranjang ✓");
  }

  const message = buildOrderMessage({ storeName, brandName: brand.name, qty });

  return (
    <div>
      <div className="flex items-center justify-between px-5">
        <span className="text-sm font-semibold">Jumlah</span>
        <div className="flex items-center gap-3 rounded-full border border-line bg-card px-2 py-1">
          <button
            onClick={() => setQtyState((q) => Math.max(1, q - 1))}
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted hover:bg-bg"
            aria-label="Kurangi"
          >
            <Minus size={14} />
          </button>
          <span className="w-5 text-center font-mono text-sm font-bold">{qty}</span>
          <button
            onClick={() => setQtyState((q) => q + 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted hover:bg-bg"
            aria-label="Tambah"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="mt-8 flex gap-3 px-5">
        <button
          onClick={handleAddToCart}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-line text-sm font-bold text-ink transition hover:border-primary hover:text-primary"
        >
          <ShoppingCart size={17} />
          Keranjang
        </button>
        <button
          onClick={() => setSheetOpen(true)}
          className="h-12 flex-1 rounded-full bg-primary text-sm font-bold text-white shadow-soft transition hover:bg-primary-dark"
        >
          Order Sekarang
        </button>
      </div>

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white shadow-soft">
          {toast}
        </div>
      )}

      <AdminPickerSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        admins={admins}
        message={message}
      />
    </div>
  );
}
