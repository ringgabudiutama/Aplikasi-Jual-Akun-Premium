"use client";

import { useActionState } from "react";
import { login } from "./actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-muted">Password Admin</label>
        <input
          type="password"
          name="password"
          required
          autoFocus
          className="w-full rounded-xl border border-line bg-bg px-4 py-2.5 text-sm outline-none focus:border-primary"
          placeholder="••••••••"
        />
      </div>
      {state?.error && <p className="text-xs font-semibold text-coral">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white transition hover:bg-primary-dark disabled:opacity-60"
      >
        {pending ? "Memproses..." : "Masuk"}
      </button>
    </form>
  );
}
