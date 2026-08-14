import { getFaqs } from "@/lib/data";
import { Field, inputCls } from "@/components/admin/Field";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { createFaq, deleteFaq } from "./actions";

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="font-display text-xl font-bold">FAQ</h1>
      <p className="mt-1 mb-6 text-sm text-muted">Pertanyaan yang sering ditanyakan pembeli.</p>

      <div className="space-y-2.5">
        {faqs.map((f) => (
          <div key={f.id} className="flex items-start justify-between gap-3 rounded-xl2 border border-line bg-card p-4 shadow-card">
            <div className="min-w-0">
              <div className="text-sm font-bold">{f.question}</div>
              <div className="mt-1 text-[12px] text-muted">{f.answer}</div>
            </div>
            <DeleteButton action={deleteFaq} hiddenFields={{ id: f.id }} />
          </div>
        ))}
        {faqs.length === 0 && <p className="text-sm text-muted">Belum ada FAQ.</p>}
      </div>

      <form action={createFaq} className="mt-6 space-y-3 rounded-xl2 border border-line bg-card p-5 shadow-card">
        <h2 className="font-display text-sm font-bold">Tambah FAQ</h2>
        <Field label="Pertanyaan">
          <input name="question" required className={inputCls} placeholder="Berapa lama proses order?" />
        </Field>
        <Field label="Jawaban">
          <textarea name="answer" rows={3} required className={inputCls} />
        </Field>
        <button type="submit" className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary-dark">
          Simpan FAQ
        </button>
      </form>
    </div>
  );
}
