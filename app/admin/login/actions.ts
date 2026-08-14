"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, signAdminToken } from "@/lib/auth";

export async function login(_prevState: { error: string } | undefined, formData: FormData) {
  const password = String(formData.get("password") || "");

  if (!process.env.ADMIN_PASSWORD) {
    return { error: "ADMIN_PASSWORD belum diset di environment variables." };
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: "Password salah, coba lagi." };
  }

  const token = await signAdminToken();
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function logout() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}
