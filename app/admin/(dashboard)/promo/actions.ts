"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function createPromo(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  if (!title) return;
  const count = await db.promo.count();
  await db.promo.create({
    data: {
      title,
      desc: String(formData.get("desc") || ""),
      active: formData.get("active") === "on",
      order: count,
    },
  });
  revalidatePath("/admin/promo");
  revalidatePath("/");
}

export async function togglePromo(formData: FormData) {
  const id = String(formData.get("id"));
  const active = String(formData.get("active")) === "true";
  await db.promo.update({ where: { id }, data: { active } });
  revalidatePath("/admin/promo");
  revalidatePath("/");
}

export async function deletePromo(formData: FormData) {
  await db.promo.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/promo");
  revalidatePath("/");
}
