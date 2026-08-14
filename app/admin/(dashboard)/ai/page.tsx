import { getAiKnowledge } from "@/lib/data";
import { Field, inputCls } from "@/components/admin/Field";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { createKnowledge, deleteKnowledge } from "./actions";

export const dynamic = "force-dynamic";

export default async function AiKnowledgePage() {
  const knowledge = await getAiKnowledge();

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="font-display text-xl font-bold">AI Knowledge</h1>
      <p className="mt-1 mb-6 text-sm text-muted">
        Dipakai AI Assistant untuk menjawab pertanyaan pembeli di luar topik harga & nama produk.
      </p>

      <div className="space-y-2.5">
        {knowledge.map((k) => (
          <div key={k.id} className="flex items-start justify-between gap-3 rounded-xl2 border border-line bg-card p-4 shadow-card">
            <div className="min-w-0">
              <div className="text-sm font-bold">{k.topic}</div>
              <div className="mt-1 text-[12px] text-muted">{k.content}</div>
            </div>
            <DeleteButton action={deleteKnowledge} hiddenFields={{ id: k.id }} />
          </div>
        ))}
        {knowledge.length === 0 && <p className="text-sm text-muted">Belum ada data.</p>}
      </div>

      <form action={createKnowledge} className="mt-6 space-y-3 rounded-xl2 border border-line bg-card p-5 shadow-card">
        <h2 className="font-display text-sm font-bold">Tambah Pengetahuan</h2>
        <Field label="Topik">
          <input name="topic" required className={inputCls} placeholder="Cara Order" />
        </Field>
        <Field label="Konten Jawaban">
          <textarea name="content" rows={3} required className={inputCls} />
        </Field>
        <button type="submit" className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary-dark">
          Simpan
        </button>
      </form>
    </div>
  );
}
