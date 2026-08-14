import { TopBar } from "@/components/TopBar";
import { ProdukBrowser } from "@/components/ProdukBrowser";
import { getBrands, getCategories } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ProdukPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>;
}) {
  const { kategori } = await searchParams;
  const [brands, categories] = await Promise.all([
    getBrands({ activeOnly: true }),
    getCategories(),
  ]);

  return (
    <div>
      <TopBar title="Produk" subtitle={`${brands.length} layanan tersedia`} compact />
      <ProdukBrowser brands={brands} categories={categories} initialCategory={kategori || "Semua"} />
    </div>
  );
}
