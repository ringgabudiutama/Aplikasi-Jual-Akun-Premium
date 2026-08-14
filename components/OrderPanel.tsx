"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { AdminPickerSheet } from "@/components/AdminPickerSheet";
import { useCart } from "@/lib/cart-context";
import { formatRupiah } from "@/lib/format";
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
  const [pkgId, setPkgId] = useState(brand.packages[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [toast, setToast] = useState("");

  const pkg = brand.packages.find((p) => p.id === pkgId) ?? brand.packages[0];
  const total = (pkg?.price ?? 0) * qty;

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  }

  function handleAddToCart() {
    if (!pkg) return;
    addItem({
      brandSlug: brand.slug,
      brandName: brand.name,
      brandIcon: brand.icon,
      logoUrl: brand.logoUrl,
      packageId: pkg.id,
      packageName: pkg.name,
      price: pkg.price,
      warranty: pkg.warranty,
      qty,
    });
    showToast("Ditambahkan ke keranjang ✓");
  }

  const message = pkg
    ? buildOrderMessage({
        storeName,
        brandName: brand.name,
        packageName: pkg.name,
        warranty: pkg.warranty,
        qty,
        total,
      })
    : "";

  return (
    <div>
      <div className="space-y-2.5 px-5">
        {brand.packages.map((p) => (
          <button
            key={p.id}
            onClick={() => setPkgId(p.id)}
            className={`flex w-full items-center justify-between rounded-xl2 border px-4 py-3.5 text-left transition ${
              p.id === pkgId
                ? "border-primary bg-primary-light"
                : "border-line bg-card hover:border-primary/50"
            }`}
          >
            <div>
              <div className="text-sm font-bold">{p.name}</div>
              <div className="mt-0.5 text-[11px] text-muted">Garansi {p.warranty}</div>
            </div>
            <div className="font-mono text-sm font-bold text-primary">{formatRupiah(p.price)}</div>
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between px-5">
        <span className="text-sm font-semibold">Jumlah</span>
        <div className="flex items-center gap-3 rounded-full border border-line bg-card px-2 py-1">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted hover:bg-bg"
            aria-label="Kurangi"
          >
            <Minus size={14} />
          </button>
          <span className="w-5 text-center font-mono text-sm font-bold">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted hover:bg-bg"
            aria-label="Tambah"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-16 z-30 mx-auto max-w-lg border-t border-line bg-card/95 px-5 py-3.5 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] text-muted">Total Pembayaran</div>
            <div className="truncate font-mono text-base font-extrabold text-primary">
              {formatRupiah(total)}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-ink transition hover:border-primary hover:text-primary"
            aria-label="Tambah ke keranjang"
          >
            <ShoppingCart size={18} />
          </button>
          <button
            onClick={() => setSheetOpen(true)}
            className="shrink-0 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-primary-dark"
          >
            Beli Sekarang
          </button>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-32 left-1/2 z-40 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white shadow-soft">
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
