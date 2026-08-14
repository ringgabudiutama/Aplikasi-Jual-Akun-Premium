import Link from "next/link";
import { Tag, Package, GalleryHorizontal, Gift } from "lucide-react";
import { getBrands, getBanners, getPromos, getStats } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [brands, banners, promos, stats] = await Promise.all([
    getBrands(),
    getBanners(),
    getPromos(),
    getStats(),
  ]);

  const cards = [
    { label: "Total Brand", value: stats.brandCount, icon: Tag, color: "bg-primary-light text-primary" },
    { label: "Total Paket", value: stats.packageCount, icon: Package, color: "bg-mint/15 text-mint" },
    { label: "Banner Aktif", value: banners.length, icon: GalleryHorizontal, color: "bg-amber/15 text-amber" },
    { label: "Promo", value: promos.length, icon: Gift, color: "bg-coral/15 text-coral" },
  ];

  return (
    <div>
      <h1 className="font-display text-xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Ringkasan toko Rifora Premium</p>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-xl2 border border-line bg-card p-4 shadow-card">
            <span className={`flex h-9 w-9 items-center justify-center rounded-full ${color}`}>
              <Icon size={17} />
            </span>
            <div className="mt-3 font-display text-2xl font-extrabold">{value}</div>
            <div className="text-xs text-muted">{label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-xl2 border border-line bg-card shadow-card">
        <div className="flex items-center justify-between border-b border-line p-4">
          <h2 className="font-display text-sm font-bold">Daftar Brand</h2>
          <Link href="/admin/brands" className="text-xs font-bold text-primary">
            Kelola semua →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs text-muted">
                <th className="p-3 font-semibold">Brand</th>
                <th className="p-3 font-semibold">Kategori</th>
                <th className="p-3 font-semibold">Paket</th>
                <th className="p-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((b) => (
                <tr key={b.id} className="border-b border-line last:border-0">
                  <td className="p-3 font-semibold">{b.name}</td>
                  <td className="p-3 text-muted">{b.category}</td>
                  <td className="p-3 text-muted">{b.packages.length} paket</td>
                  <td className="p-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                        b.status === "aktif" ? "bg-mint/15 text-mint" : "bg-muted/15 text-muted"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
