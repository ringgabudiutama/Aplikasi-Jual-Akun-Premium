export interface PackageItem {
  id: string;
  brandId: string;
  name: string;
  price: number;
  warranty: string;
  note: string;
  order: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  category: string;
  icon: string;
  description: string;
  logoUrl: string;
  badge: string;
  status: string;
  order: number;
  packages: PackageItem[];
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  color: string;
  order: number;
}

export interface Promo {
  id: string;
  title: string;
  desc: string;
  active: boolean;
  order: number;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  order: number;
}

export interface AdminNumber {
  id: string;
  name: string;
  phone: string;
  order: number;
}

export interface AiKnowledge {
  id: string;
  topic: string;
  content: string;
}

export interface Settings {
  id: string;
  storeName: string;
  tagline: string;
  logoUrl: string;
}

export interface CartItem {
  brandSlug: string;
  brandName: string;
  brandIcon: string;
  logoUrl: string;
  packageId: string;
  packageName: string;
  price: number;
  warranty: string;
  qty: number;
}
