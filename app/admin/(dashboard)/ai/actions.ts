"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function createKnowledge(formData: FormData) {
  const topic = String(formData.get("topic") || "").trim();
  if (!topic) return;
  await db.aiKnowledge.create({
    data: { topic, content: String(formData.get("content") || "") },
  });
  revalidatePath("/admin/ai");
}

export async function deleteKnowledge(formData: FormData) {
  await db.aiKnowledge.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/ai");
}
