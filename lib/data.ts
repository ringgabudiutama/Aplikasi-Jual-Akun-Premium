import { db } from "./db";

export async function getBrands(opts: { activeOnly?: boolean } = {}) {
  return db.brand.findMany({
    where: opts.activeOnly ? { status: "aktif" } : undefined,
    include: { packages: { orderBy: { order: "asc" } } },
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });
}

export async function getBrandBySlug(slug: string) {
  return db.brand.findUnique({
    where: { slug },
    include: { packages: { orderBy: { order: "asc" } } },
  });
}

export async function getCategories() {
  const brands = await db.brand.findMany({
    where: { status: "aktif" },
    select: { category: true },
    distinct: ["category"],
  });
  return brands.map((b) => b.category).filter(Boolean);
}

export async function getBanners() {
  return db.banner.findMany({ orderBy: { order: "asc" } });
}

export async function getPromos(opts: { activeOnly?: boolean } = {}) {
  return db.promo.findMany({
    where: opts.activeOnly ? { active: true } : undefined,
    orderBy: { order: "asc" },
  });
}

export async function getFaqs() {
  return db.faq.findMany({ orderBy: { order: "asc" } });
}

export async function getTestimonials() {
  return db.testimonial.findMany({ orderBy: { order: "asc" } });
}

export async function getAdminNumbers() {
  return db.adminNumber.findMany({ orderBy: { order: "asc" } });
}

export async function getAiKnowledge() {
  return db.aiKnowledge.findMany({ orderBy: { topic: "asc" } });
}

/** Settings is a singleton row; create it with defaults on first read. */
export async function getSettings() {
  return db.settings.upsert({
    where: { id: "settings" },
    update: {},
    create: { id: "settings" },
  });
}

export async function getStats() {
  const [brandCount, packageCount] = await Promise.all([
    db.brand.count({ where: { status: "aktif" } }),
    db.package.count(),
  ]);
  return { brandCount, packageCount };
}
