import { LoginForm } from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm rounded-xl2 border border-line bg-card p-7 shadow-soft">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl2 bg-gradient-to-br from-primary to-primary-dark font-display text-xl font-extrabold text-white">
            R
          </div>
          <h1 className="mt-3 font-display text-lg font-bold">Admin Rifora Premium</h1>
          <p className="mt-1 text-xs text-muted">Masuk untuk mengelola toko</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
