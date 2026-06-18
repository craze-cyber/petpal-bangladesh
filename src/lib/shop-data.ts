// Shop data for Birds and Pet Animal Clinic (BPAC Vet)
export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  categoryLabel: string;
  petType: "bird" | "dog" | "cat" | "rabbit" | "fish" | "reptile";
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images?: string[];
  stock: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  variants?: { label: string; value: string; price?: number }[];
  description: string;
  ingredients: { key: string; value: string }[];
  howToUse: string;
};

const img = (q: string) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=800&q=70`;

// Bird-first — BPAC Vet specialty
export const CATEGORIES = [
  { slug: "bird-food", label: "Bird Food", icon: "🐦", bg: "bg-[color:var(--teal-tint)]" },
  { slug: "dog-food", label: "Dog Food", icon: "🐕", bg: "bg-amber-50" },
  { slug: "cat-food", label: "Cat Food", icon: "🐈", bg: "bg-rose-50" },
  { slug: "medicine", label: "Medicine", icon: "💊", bg: "bg-teal-50" },
  { slug: "toys", label: "Toys", icon: "🧸", bg: "bg-yellow-50" },
  { slug: "cages", label: "Cages & Habitat", icon: "🏠", bg: "bg-lime-50" },
  { slug: "grooming", label: "Grooming Kits", icon: "✂️", bg: "bg-sky-50" },
  { slug: "combo", label: "Combo Packs", icon: "🎁", bg: "bg-orange-50" },
];

// Bird-first
export const PET_TYPES = [
  { slug: "bird", label: "For Birds", icon: "🐦", color: "from-yellow-200 to-yellow-50" },
  { slug: "dog", label: "For Dogs", icon: "🐕", color: "from-orange-200 to-orange-50" },
  { slug: "cat", label: "For Cats", icon: "🐈", color: "from-rose-200 to-rose-50" },
  { slug: "rabbit", label: "For Rabbits", icon: "🐰", color: "from-pink-200 to-pink-50" },
  { slug: "fish", label: "For Fish", icon: "🐟", color: "from-blue-200 to-blue-50" },
  { slug: "reptile", label: "For Reptiles", icon: "🦎", color: "from-emerald-200 to-emerald-50" },
];

export const BRANDS = [
  "Versele-Laga", "Trill", "Kaytee", "ZuPreem",
  "Royal Canin", "Whiskas", "Pedigree", "Purina",
];

const baseProducts: Omit<Product, "ingredients" | "howToUse" | "description" | "images">[] = [
  // Best sellers (per spec)
  { id: "p1", name: "Premium Cockatiel Seed Mix 1kg", brand: "Versele-Laga", category: "bird-food", categoryLabel: "Bird Food", petType: "bird", price: 450, originalPrice: 560, rating: 4.8, reviewCount: 142, image: img("photo-1555169062-013468b47731"), stock: 22, isBestSeller: true, variants: [{ label: "1kg", value: "1kg" }, { label: "3kg", value: "3kg", price: 1250 }] },
  { id: "p2", name: "Royal Canin Adult Dog Food 3kg", brand: "Royal Canin", category: "dog-food", categoryLabel: "Dog Food", petType: "dog", price: 1850, originalPrice: 2200, rating: 4.7, reviewCount: 124, image: img("photo-1601758228041-f3b2795255f1"), stock: 15, isBestSeller: true },
  { id: "p3", name: "Whiskas Tuna Cat Food 12 Pack", brand: "Whiskas", category: "cat-food", categoryLabel: "Cat Food", petType: "cat", price: 960, rating: 4.6, reviewCount: 88, image: img("photo-1574144611937-0df059b5ef3e"), stock: 30, isBestSeller: true },
  { id: "p4", name: "Parrot Mineral Block & Cuttlefish", brand: "Kaytee", category: "bird-food", categoryLabel: "Bird Food", petType: "bird", price: 220, rating: 4.5, reviewCount: 56, image: img("photo-1452570053594-1b985d6ea890"), stock: 40, isBestSeller: true },

  // New arrivals
  { id: "p5", name: "ZuPreem FruitBlend Parrot Food 1.5kg", brand: "ZuPreem", category: "bird-food", categoryLabel: "Bird Food", petType: "bird", price: 1450, originalPrice: 1700, rating: 4.7, reviewCount: 34, image: img("photo-1522858547137-f1dcec554f55"), stock: 8, isNew: true },
  { id: "p6", name: "Premium Bird Cage Stainless Steel — Medium", brand: "Kaytee", category: "cages", categoryLabel: "Cages & Habitat", petType: "bird", price: 3450, rating: 4.8, reviewCount: 22, image: img("photo-1583337130417-3346a1be7dee"), stock: 5, isNew: true },
  { id: "p7", name: "Trill Budgie Seed Mix 500g", brand: "Trill", category: "bird-food", categoryLabel: "Bird Food", petType: "bird", price: 380, originalPrice: 460, rating: 4.6, reviewCount: 41, image: img("photo-1535930891776-0c2dfb7fda1a"), stock: 18, isNew: true },
  { id: "p8", name: "Puppy Starter Combo Pack", brand: "Royal Canin", category: "combo", categoryLabel: "Combo Packs", petType: "dog", price: 2890, originalPrice: 3500, rating: 4.9, reviewCount: 47, image: img("photo-1587300003388-59208cc962cb"), stock: 7, isNew: true, isBestSeller: true },

  // Catalog
  { id: "p9", name: "Pedigree Adult Dry Dog Food — Chicken & Veg", brand: "Pedigree", category: "dog-food", categoryLabel: "Dog Food", petType: "dog", price: 1290, originalPrice: 1490, rating: 4.5, reviewCount: 88, image: img("photo-1583511655826-05700d52f4d9"), stock: 32 },
  { id: "p10", name: "Multi-Vitamin Drops for Birds — 30ml", brand: "Versele-Laga", category: "medicine", categoryLabel: "Medicine", petType: "bird", price: 420, rating: 4.6, reviewCount: 17, image: img("photo-1535241749838-299277b6305f"), stock: 12 },
  { id: "p11", name: "Interactive Feather Wand Cat Toy", brand: "Purina", category: "toys", categoryLabel: "Toys", petType: "cat", price: 350, rating: 4.4, reviewCount: 41, image: img("photo-1545249390-6bdfa286032f"), stock: 50 },
  { id: "p12", name: "Rope Chew Toy for Dogs — Large", brand: "Pedigree", category: "toys", categoryLabel: "Toys", petType: "dog", price: 480, originalPrice: 620, rating: 4.3, reviewCount: 33, image: img("photo-1583337130417-3346a1be7dee"), stock: 24 },
  { id: "p13", name: "Rabbit Pellet Food — Premium 2kg", brand: "Kaytee", category: "combo", categoryLabel: "Combo Packs", petType: "rabbit", price: 780, originalPrice: 950, rating: 4.5, reviewCount: 19, image: img("photo-1535241749838-299277b6305f"), stock: 18 },
  { id: "p14", name: "Aquarium Fish Flakes 100g", brand: "Purina", category: "combo", categoryLabel: "Combo Packs", petType: "fish", price: 320, rating: 4.2, reviewCount: 28, image: img("photo-1520637836862-4d197d17c55a"), stock: 60 },
  { id: "p15", name: "Dog Shampoo & Conditioner Kit", brand: "Royal Canin", category: "grooming", categoryLabel: "Grooming Kits", petType: "dog", price: 1150, originalPrice: 1400, rating: 4.7, reviewCount: 64, image: img("photo-1583511655826-05700d52f4d9"), stock: 0 },
  { id: "p16", name: "Reptile Basking Lamp & Habitat Kit", brand: "ZuPreem", category: "cages", categoryLabel: "Cages & Habitat", petType: "reptile", price: 2150, rating: 4.6, reviewCount: 14, image: img("photo-1452570053594-1b985d6ea890"), stock: 6, isNew: true },
];

const desc = "Premium quality formulated for the Bangladeshi climate, vet-approved and trusted by thousands of pet families across Dhaka, Chittagong, Sylhet and Rajshahi. Selected ingredients support overall health, plumage/coat shine, and digestive balance.";
const ingredients = [
  { key: "Protein", value: "32% min" },
  { key: "Fat", value: "14% min" },
  { key: "Fiber", value: "3% max" },
  { key: "Moisture", value: "10% max" },
  { key: "Origin", value: "Imported" },
];
const howToUse = "Serve the recommended daily portion based on your pet's weight (see chart on pack). Always provide fresh, clean water. Transition gradually over 7 days when switching from another brand.";

export const PRODUCTS: Product[] = baseProducts.map((p) => ({
  ...p,
  description: desc,
  ingredients,
  howToUse,
  images: [p.image, img("photo-1601758228041-f3b2795255f1"), img("photo-1583337130417-3346a1be7dee"), img("photo-1545249390-6bdfa286032f")],
}));

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const bestSellers = () => ["p1", "p2", "p3", "p4"].map((id) => PRODUCTS.find((p) => p.id === id)!).filter(Boolean);
export const newArrivals = () => PRODUCTS.filter((p) => p.isNew).slice(0, 4);
export const flashSale = () => PRODUCTS.filter((p) => p.originalPrice).slice(0, 4);

export const formatBDT = (n: number) => `৳${n.toLocaleString("en-BD")}`;
