"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { uploadImage } from "@/lib/blob";

export async function updateSettings(formData: FormData) {
  const storeName = String(formData.get("storeName") || "Rifora Premium");
  const tagline = String(formData.get("tagline") || "");

  const file = formData.get("logo") as File | null;
  const uploadedUrl = file && file.size > 0 ? await uploadImage(file, "store") : null;

  await db.settings.upsert({
    where: { id: "settings" },
    update: { storeName, tagline, ...(uploadedUrl ? { logoUrl: uploadedUrl } : {}) },
    create: { id: "settings", storeName, tagline, logoUrl: uploadedUrl || "" },
  });
  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");
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
