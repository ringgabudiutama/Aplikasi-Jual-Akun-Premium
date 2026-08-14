import Image from "next/image";
import { Field, inputCls } from "@/components/admin/Field";
import type { Brand } from "@/lib/types";

export function BrandFormFields({ brand }: { brand?: Brand }) {
  return (
    <div className="space-y-4">
      <Field
        label="Foto / Logo Produk"
        hint="Upload gambar produk (opsional untuk brand baru, JPG/PNG). Kosongkan saat edit jika tidak ingin mengganti."
      >
        <input
          type="file"
          name="logo"
          accept="image/*"
          className="w-full rounded-xl border border-dashed border-line bg-bg px-3.5 py-3 text-xs file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white"
        />
        {brand?.logoUrl && (
          <div className="relative mt-3 h-16 w-16 overflow-hidden rounded-xl bg-primary-light">
            <Image src={brand.logoUrl} alt={brand.name} fill sizes="64px" className="object-cover" unoptimized />
          </div>
        )}
      </Field>

      <Field label="Icon Emoji (opsional)">
        <input name="icon" defaultValue={brand?.icon} placeholder="🎨" className={inputCls} />
      </Field>

      <Field label="Nama Produk">
        <input name="name" defaultValue={brand?.name} required placeholder="Contoh: Canva" className={inputCls} />
      </Field>

      <Field label="Kategori">
        <input
          name="category"
          defaultValue={brand?.category}
          required
          placeholder="Contoh: Desain Grafis"
          className={inputCls}
        />
      </Field>

      <Field label="Deskripsi / Spesifikasi Singkat">
        <textarea
          name="description"
          defaultValue={brand?.description}
          rows={3}
          placeholder="Deskripsi singkat produk, fitur, atau spesifikasi"
          className={inputCls}
        />
      </Field>

      <Field label="Badge">
        <select name="badge" defaultValue={brand?.badge || ""} className={inputCls}>
          <option value="">Tidak Ada</option>
          <option value="BEST SELLER">BEST SELLER</option>
          <option value="HOT">HOT</option>
          <option value="NEW">NEW</option>
        </select>
      </Field>

      <Field label="Status">
        <select name="status" defaultValue={brand?.status || "aktif"} className={inputCls}>
          <option value="aktif">Aktif</option>
          <option value="nonaktif">Nonaktif</option>
        </select>
      </Field>
    </div>
  );
}
