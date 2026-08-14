import { CartProvider } from "@/lib/cart-context";
import { BottomNav } from "@/components/BottomNav";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="mx-auto min-h-screen max-w-lg pb-24">{children}</div>
      <BottomNav />
    </CartProvider>
  );
}
