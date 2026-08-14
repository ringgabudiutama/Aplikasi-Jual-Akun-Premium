"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { slugify } from "@/lib/format";
import { uploadImage } from "@/lib/blob";

async function uniqueSlug(name: string, ignoreId?: string) {
  const base = slugify(name) || "brand";
  let slug = base;
  let i = 2;
  while (
    await db.brand.findFirst({ where: { slug, ...(ignoreId ? { id: { not: ignoreId } } : {}) } })
  ) {
    slug = `${base}-${i++}`;
  }
  return slug;
}

export async function createBrand(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  if (!name) return;

  const file = formData.get("logo") as File | null;
  const logoUrl = file && file.size > 0 ? await uploadImage(file, "brands") : "";

  const brand = await db.brand.create({
    data: {
      name,
      slug: await uniqueSlug(name),
      category: String(formData.get("category") || ""),
      icon: String(formData.get("icon") || ""),
      description: String(formData.get("description") || ""),
      badge: String(formData.get("badge") || ""),
      status: String(formData.get("status") || "aktif"),
      logoUrl: logoUrl || "https://placehold.co/200x200/4B3AF0/FFFFFF?text=" + encodeURIComponent(name[0] || "?"),
    },
  });

  revalidatePath("/admin/brands");
  revalidatePath("/");
  redirect(`/admin/brands/${brand.id}`);
}

export async function updateBrand(id: string, formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  if (!name) return;

  const file = formData.get("logo") as File | null;
  const uploadedUrl = file && file.size > 0 ? await uploadImage(file, "brands") : null;

  const current = await db.brand.findUnique({ where: { id } });
  const slug = current && current.name !== name ? await uniqueSlug(name, id) : current?.slug;

  await db.brand.update({
    where: { id },
    data: {
      name,
      slug,
      category: String(formData.get("category") || ""),
      icon: String(formData.get("icon") || ""),
      description: String(formData.get("description") || ""),
      badge: String(formData.get("badge") || ""),
      status: String(formData.get("status") || "aktif"),
      ...(uploadedUrl ? { logoUrl: uploadedUrl } : {}),
    },
  });

  revalidatePath("/admin/brands");
  revalidatePath(`/admin/brands/${id}`);
  revalidatePath("/");
  revalidatePath(`/produk/${slug}`);
}

export async function deleteBrand(formData: FormData) {
  const id = String(formData.get("id") || "");
  await db.brand.delete({ where: { id } });
  revalidatePath("/admin/brands");
  revalidatePath("/");
}

export async function toggleBrandStatus(formData: FormData) {
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  await db.brand.update({ where: { id }, data: { status } });
  revalidatePath("/admin/brands");
  revalidatePath("/");
}

/* ---------- Packages (price, warranty, spec note) ---------- */

export async function addPackage(brandId: string, formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const price = Number(formData.get("price") || 0);
  if (!name) return;

  const count = await db.package.count({ where: { brandId } });
  await db.package.create({
    data: {
      brandId,
      name,
      price,
      warranty: String(formData.get("warranty") || ""),
      note: String(formData.get("note") || ""),
      order: count,
    },
  });
  revalidatePath(`/admin/brands/${brandId}`);
  revalidatePath("/");
}

export async function deletePackage(formData: FormData) {
  const id = String(formData.get("id") || "");
  const brandId = String(formData.get("brandId") || "");
  await db.package.delete({ where: { id } });
  revalidatePath(`/admin/brands/${brandId}`);
  revalidatePath("/");
}
