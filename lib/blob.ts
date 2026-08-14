import { put } from "@vercel/blob";

/** Uploads an image File from a <form> submission to Vercel Blob and returns its public URL. */
export async function uploadImage(file: File, folder: string) {
  if (!file || file.size === 0) return "";
  const ext = file.name.split(".").pop() || "png";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const blob = await put(path, file, {
    access: "public",
    addRandomSuffix: false,
  });
  return blob.url;
}
