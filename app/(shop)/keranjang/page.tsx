import { TopBar } from "@/components/TopBar";
import { CartView } from "@/components/CartView";
import { getAdminNumbers, getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function KeranjangPage() {
  const [admins, settings] = await Promise.all([getAdminNumbers(), getSettings()]);

  return (
    <div>
      <TopBar title="Keranjang" compact />
      <CartView admins={admins} storeName={settings.storeName} />
    </div>
  );
}
