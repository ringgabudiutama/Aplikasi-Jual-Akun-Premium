import Link from "next/link";
import { Search, Sparkles, Gift, Bot, Star, ArrowRight } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Hero } from "@/components/Hero";
import { BrandCard } from "@/components/BrandCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { getBrands, getPromos, getFaqs, getTestimonials, getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [brands, promos, faqs, testimonials, settings] = await Promise.all([
    getBrands({ activeOnly: true }),
    getPromos({ activeOnly: true }),
    getFaqs(),
    getTestimonials(),
    getSettings(),
  ]);

  const categories = [...new Set(brands.map((b) => b.category))];
  const popular = brands.filter((b) => b.badge === "BEST SELLER" || b.badge === "HOT");
  const newest = [...brands].reverse().slice(0, 8);

  return (
    <div>
      <TopBar title={settings.storeName} logoUrl={settings.logoUrl} />
      <Hero
        storeName={settings.storeName}
        tagline={settings.tagline}
        brandCount={brands.length}
        logoUrl={settings.logoUrl}
      />

      <div className="px-5">
        <Link
          href="/produk"
          className="flex items-center gap-3 rounded-xl2 border border-line bg-card px-4 py-3 text-sm text-muted shadow-card"
        >
          <Search size={17} />
          Cari Canva, Netflix, ChatGPT...
        </Link>
      </div>

      {categories.length > 0 && (
        <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto px-5 pb-1">
          {categories.map((c) => (
            <Link
              key={c}
              href={`/produk?kategori=${encodeURIComponent(c)}`}
              className="shrink-0 rounded-full border border-line bg-card px-3.5 py-1.5 text-xs font-semibold text-ink transition hover:border-primary hover:text-primary"
            >
              {c}
            </Link>
          ))}
        </div>
      )}

      {popular.length > 0 && (
        <Section icon={<Sparkles size={16} className="text-coral" />} title="Produk Populer">
          <Row>
            {popular.map((b) => (
              <BrandCard key={b.id} brand={b} wide />
            ))}
          </Row>
        </Section>
      )}

      <Section icon={<Star size={16} className="text-amber" />} title="Produk Terbaru">
        <Row>
          {newest.map((b) => (
            <BrandCard key={b.id} brand={b} wide />
          ))}
        </Row>
      </Section>

      {promos.length > 0 && (
        <Section icon={<Gift size={16} className="text-mint" />} title="Promo">
          <div className="space-y-3 px-5">
            {promos.map((p) => (
              <div
                key={p.id}
                className="rounded-xl2 bg-gradient-to-br from-primary to-primary-dark p-4 text-white shadow-soft"
              >
                <div className="font-display text-sm font-bold">{p.title}</div>
                <div className="mt-1 text-[13px] text-white/80">{p.desc}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {testimonials.length > 0 && (
        <Section title="Kata Mereka">
          <div className="no-scrollbar flex gap-3 overflow-x-auto px-5 pb-1">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="w-56 shrink-0 rounded-xl2 border border-line bg-card p-4 shadow-card"
              >
                <div className="mb-1.5 flex gap-0.5 text-amber">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </div>
                <p className="text-[12.5px] leading-relaxed text-ink/80">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-2 text-xs font-bold">{t.name}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {faqs.length > 0 && (
        <Section title="FAQ">
          <div className="px-5">
            <FaqAccordion faqs={faqs} />
          </div>
        </Section>
      )}

      <div className="px-5 pb-2 pt-3">
        <Link
          href="/ai"
          className="flex items-center gap-3 rounded-xl2 border border-line bg-card p-4 shadow-card transition hover:border-primary"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
            <Bot size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold">Tanya AI Assistant Kami</div>
            <div className="truncate text-xs text-muted">Siap bantu jawab harga, garansi & cara order</div>
          </div>
          <ArrowRight size={16} className="text-muted" />
        </Link>
      </div>

      <footer className="px-5 pb-8 pt-6 text-center">
        <p className="text-[11px] leading-relaxed text-muted">
          © {new Date().getFullYear()} {settings.storeName}. Semua akun bergaransi resmi.
          <br />
          Belanja aman, cepat, dan terpercaya.
        </p>
      </footer>
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-7">
      <div className="mb-3 flex items-center gap-1.5 px-5">
        {icon}
        <h2 className="font-display text-[15px] font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="no-scrollbar flex gap-3 overflow-x-auto px-5 pb-1">{children}</div>;
}
