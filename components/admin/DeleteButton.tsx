"use client";

import { Trash2 } from "lucide-react";

export function DeleteButton({
  action,
  hiddenFields = {},
  confirmText = "Hapus data ini? Tindakan ini tidak dapat dibatalkan.",
}: {
  action: (formData: FormData) => void;
  hiddenFields?: Record<string, string>;
  confirmText?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      {Object.entries(hiddenFields).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      <button
        type="submit"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-coral/10 hover:text-coral"
        aria-label="Hapus"
      >
        <Trash2 size={15} />
      </button>
    </form>
  );
}
