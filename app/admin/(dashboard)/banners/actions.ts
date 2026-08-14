"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function createBanner(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  if (!title) return;
  const count = await db.banner.count();
  await db.banner.create({
    data: {
      title,
      subtitle: String(formData.get("subtitle") || ""),
      color: String(formData.get("color") || "a"),
      order: count,
    },
  });
  revalidatePath("/admin/banners");
  revalidatePath("/");
}

export async function deleteBanner(formData: FormData) {
  await db.banner.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/banners");
  revalidatePath("/");
}
