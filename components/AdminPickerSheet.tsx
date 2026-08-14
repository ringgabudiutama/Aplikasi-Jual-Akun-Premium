"use client";

import { MessageCircle, X } from "lucide-react";
import type { AdminNumber } from "@/lib/types";
import { buildWaLink } from "@/lib/whatsapp";

export function AdminPickerSheet({
  open,
  onClose,
  admins,
  message,
}: {
  open: boolean;
  onClose: () => void;
  admins: AdminNumber[];
  message: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-t-xl2 bg-card p-6 pb-8 shadow-soft">
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-line" />
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold">Pilih Admin</h3>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-bg" aria-label="Tutup">
            <X size={20} />
          </button>
        </div>
        <p className="mb-4 text-sm text-muted">
          Kamu akan diarahkan ke WhatsApp dengan detail pesanan yang sudah terisi otomatis.
        </p>
        <div className="space-y-3">
          {admins.length === 0 && (
            <p className="rounded-xl bg-bg p-4 text-sm text-muted">
              Belum ada nomor admin yang diatur. Admin bisa menambahkannya di Pengaturan.
            </p>
          )}
          {admins.map((a) => (
            <a
              key={a.id}
              href={buildWaLink(a.phone, message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center justify-between rounded-xl border border-line bg-bg px-4 py-3.5 transition hover:border-primary hover:bg-primary-light"
            >
              <div>
                <div className="text-sm font-semibold">{a.name}</div>
                <div className="text-xs text-muted">{a.phone}</div>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint/15 text-mint">
                <MessageCircle size={18} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
