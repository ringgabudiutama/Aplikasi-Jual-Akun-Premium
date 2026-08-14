"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { aiReply } from "@/lib/ai-reply";
import type { AiKnowledge, Brand } from "@/lib/types";

type Msg = { who: "bot" | "user"; text: string };

export function ChatWidget({ brands, knowledge }: { brands: Brand[]; knowledge: AiKnowledge[] }) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      who: "bot",
      text: "Halo! Saya AI Assistant Rifora 🤖\nAda yang bisa saya bantu? Tanyakan soal harga, cara order, garansi, produk, atau jam operasional.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function handleSend() {
    const val = input.trim();
    if (!val) return;
    setMessages((m) => [...m, { who: "user", text: val }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { who: "bot", text: aiReply(val, brands, knowledge) }]);
    }, 600);
  }

  return (
    <div className="flex h-[calc(100vh-9.5rem)] flex-col">
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
              m.who === "bot"
                ? "rounded-tl-sm bg-card border border-line"
                : "ml-auto rounded-tr-sm bg-primary text-white"
            }`}
          >
            {m.text}
          </div>
        ))}
        {typing && (
          <div className="flex w-fit gap-1 rounded-2xl rounded-tl-sm border border-line bg-card px-4 py-3">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 border-t border-line bg-card px-4 py-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Tanya sesuatu..."
          className="flex-1 rounded-full border border-line bg-bg px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        <button
          onClick={handleSend}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white"
          aria-label="Kirim"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
