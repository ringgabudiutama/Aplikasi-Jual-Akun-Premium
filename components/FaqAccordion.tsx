"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/types";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="space-y-2.5">
      {faqs.map((f) => {
        const open = openId === f.id;
        return (
          <div key={f.id} className="overflow-hidden rounded-xl2 border border-line bg-card">
            <button
              onClick={() => setOpenId(open ? null : f.id)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
              aria-expanded={open}
            >
              <span className="text-sm font-semibold">{f.question}</span>
              <ChevronDown
                size={17}
                className={`shrink-0 text-muted transition-transform ${open ? "rotate-180 text-primary" : ""}`}
              />
            </button>
            {open && (
              <p className="px-4 pb-4 text-[13px] leading-relaxed text-muted">{f.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
