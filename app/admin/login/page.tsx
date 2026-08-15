import Image from "next/image";
import { getSettings } from "@/lib/data";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const settings = await getSettings();

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm rounded-xl2 border border-line bg-card p-7 shadow-soft">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl2 bg-gradient-to-br from-primary to-primary-dark font-display text-xl font-extrabold text-white">
            {settings.logoUrl ? (
              <Image src={settings.logoUrl} alt="Logo" fill sizes="48px" className="object-cover" unoptimized />
            ) : (
              "R"
            )}
          </div>
          <h1 className="mt-3 font-display text-lg font-bold">Admin {settings.storeName}</h1>
          <p className="mt-1 text-xs text-muted">Masuk untuk mengelola toko</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
