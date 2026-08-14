"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "./types";

const STORAGE_KEY = "rifora_cart";

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (packageId: string) => void;
  setQty: (packageId: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore corrupt cart data */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.packageId === item.packageId);
      if (existing) {
        return prev.map((i) =>
          i.packageId === item.packageId ? { ...i, qty: i.qty + item.qty } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (packageId: string) =>
    setItems((prev) => prev.filter((i) => i.packageId !== packageId));

  const setQty = (packageId: string, qty: number) =>
    setItems((prev) =>
      prev.map((i) => (i.packageId === packageId ? { ...i, qty: Math.max(1, qty) } : i))
    );

  const clear = () => setItems([]);

  const { count, total } = useMemo(
    () => ({
      count: items.reduce((s, i) => s + i.qty, 0),
      total: items.reduce((s, i) => s + i.qty * i.price, 0),
    }),
    [items]
  );

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, setQty, clear, count, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
