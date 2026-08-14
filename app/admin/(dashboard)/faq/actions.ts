"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function createFaq(formData: FormData) {
  const question = String(formData.get("question") || "").trim();
  if (!question) return;
  const count = await db.faq.count();
  await db.faq.create({
    data: { question, answer: String(formData.get("answer") || ""), order: count },
  });
  revalidatePath("/admin/faq");
  revalidatePath("/");
}

export async function deleteFaq(formData: FormData) {
  await db.faq.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/faq");
  revalidatePath("/");
}
