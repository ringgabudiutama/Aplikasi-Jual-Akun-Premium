"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function updateSettings(formData: FormData) {
  await db.settings.upsert({
    where: { id: "settings" },
    update: {
      storeName: String(formData.get("storeName") || "Rifora Premium"),
      tagline: String(formData.get("tagline") || ""),
    },
    create: {
      id: "settings",
      storeName: String(formData.get("storeName") || "Rifora Premium"),
      tagline: String(formData.get("tagline") || ""),
    },
  });
  revalidatePath("/admin/settings");
  revalidatePath("/");
}

export async function addAdminNumber(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  if (!name || !phone) return;
  const count = await db.adminNumber.count();
  await db.adminNumber.create({ data: { name, phone, order: count } });
  revalidatePath("/admin/settings");
  revalidatePath("/produk", "layout");
}

export async function deleteAdminNumber(formData: FormData) {
  await db.adminNumber.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/settings");
  revalidatePath("/produk", "layout");
}
