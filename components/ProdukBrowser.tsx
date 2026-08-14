"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { BrandCard } from "@/components/BrandCard";
import type { Brand } from "@/lib/types";

export function ProdukBrowser({
  brands,
  categories,
  initialCategory,
}: {
  brands: Brand[];
  categories: string[];
  initialCategory: string;
}) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState(initialCategory);

  const filtered = useMemo(() => {
    return brands.filter((b) => {
      const matchQ = b.name.toLowerCase().includes(q.toLowerCase());
      const matchCat = category === "Semua" || b.category === category;
      return matchQ && matchCat;
    });
  }, [brands, q, category]);

  return (
    <div>
      <div className="px-5">
        <div className="flex items-center gap-3 rounded-xl2 border border-line bg-card px-4 py-3 shadow-card">
          <Search size={17} className="text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari brand..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </div>
      </div>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto px-5 pb-1">
        {["Semua", ...categories].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
              category === c
                ? "border-primary bg-primary text-white"
                : "border-line bg-card text-ink hover:border-primary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 px-5">
        {filtered.map((b) => (
          <BrandCard key={b.id} brand={b} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="px-5 pt-10 text-center text-sm text-muted">
          Brand tidak ditemukan. Coba kata kunci lain.
        </p>
      )}
    </div>
  );
}
