// Shop mock data for Birds and Pet Animal Clinic (BPAC)
export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string; // slug
  categoryLabel: string;
  petType: "dog" | "cat" | "bird" | "rabbit" | "fish";
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

export const CATEGORIES = [
  { slug: "food", label: "Pet Food", icon: "🍖", bg: "bg-rose-50" },
  { slug: "medicine", label: "Medicine", icon: "💊", bg: "bg-teal-50" },
  { slug: "toys", label: "Toys", icon: "🧸", bg: "bg-amber-50" },
  { slug: "accessories", label: "Accessories", icon: "👗", bg: "bg-purple-50" },
  { slug: "grooming", label: "Grooming Kits", icon: "🛁", bg: "bg-sky-50" },
  { slug: "furniture", label: "Pet Furniture", icon: "🏠", bg: "bg-lime-50" },
  { slug: "combo", label: "Combo Packs", icon: "📦", bg: "bg-orange-50" },
  { slug: "gifts", label: "Gifts", icon: "🎁", bg: "bg-pink-50" },
];

export const PET_TYPES = [
  { slug: "dog", label: "For Dogs", icon: "🐕", color: "from-orange-200 to-orange-50" },
  { slug: "cat", label: "For Cats", icon: "🐈", color: "from-teal-200 to-teal-50" },
  { slug: "bird", label: "For Birds", icon: "🐦", color: "from-yellow-200 to-yellow-50" },
  { slug: "rabbit", label: "For Rabbits", icon: "🐰", color: "from-pink-200 to-pink-50" },
  { slug: "fish", label: "For Fish", icon: "🐟", color: "from-blue-200 to-blue-50" },
];

export const BRANDS = [
  "Royal Canin", "Whiskas", "Pedigree", "Purina", "Me-O",
  "Drools", "Farmina", "Iams", "Hills", "Orijen",
];

const baseProducts: Omit<Product, "ingredients" | "howToUse" | "description" | "images">[] = [
  { id: "p1", name: "Royal Canin Adult Cat Food — Chicken", brand: "Royal Canin", category: "food", categoryLabel: "Food", petType: "cat", price: 1850, originalPrice: 2200, rating: 4.7, reviewCount: 124, image: img("photo-1606214174585-fe31582dc6ee"), stock: 15, isBestSeller: true, variants: [{ label: "1kg", value: "1kg" }, { label: "3kg", value: "3kg", price: 4900 }, { label: "7kg", value: "7kg", price: 10500 }] },
  { id: "p2", name: "Pedigree Adult Dry Dog Food — Chicken & Veg", brand: "Pedigree", category: "food", categoryLabel: "Food", petType: "dog", price: 1290, originalPrice: 1490, rating: 4.5, reviewCount: 88, image: img("photo-1601758228041-f3b2795255f1"), stock: 32, isBestSeller: true },
  { id: "p3", name: "Whiskas Tuna Wet Pouch (Pack of 12)", brand: "Whiskas", category: "food", categoryLabel: "Food", petType: "cat", price: 960, rating: 4.6, reviewCount: 56, image: img("photo-1574144611937-0df059b5ef3e"), stock: 8, isNew: true },
  { id: "p4", name: "Interactive Feather Wand Cat Toy", brand: "Me-O", category: "toys", categoryLabel: "Toys", petType: "cat", price: 350, rating: 4.4, reviewCount: 41, image: img("photo-1545249390-6bdfa286032f"), stock: 50 },
  { id: "p5", name: "Rope Chew Toy for Dogs — Large", brand: "Drools", category: "toys", categoryLabel: "Toys", petType: "dog", price: 480, originalPrice: 620, rating: 4.3, reviewCount: 33, image: img("photo-1583337130417-3346a1be7dee"), stock: 24, isBestSeller: true },
  { id: "p6", name: "Bird Cage Stainless Steel — Medium", brand: "Farmina", category: "furniture", categoryLabel: "Furniture", petType: "bird", price: 3450, rating: 4.8, reviewCount: 22, image: img("photo-1452570053594-1b985d6ea890"), stock: 5, isNew: true },
  { id: "p7", name: "Multi-Vitamin Drops for Birds — 30ml", brand: "Hills", category: "medicine", categoryLabel: "Medicine", petType: "bird", price: 420, rating: 4.6, reviewCount: 17, image: img("photo-1535930891776-0c2dfb7fda1a"), stock: 12 },
  { id: "p8", name: "Rabbit Pellet Food — Premium 2kg", brand: "Iams", category: "food", categoryLabel: "Food", petType: "rabbit", price: 780, originalPrice: 950, rating: 4.5, reviewCount: 19, image: img("photo-1535241749838-299277b6305f"), stock: 18, isNew: true },
  { id: "p9", name: "Aquarium Fish Flakes 100g", brand: "Purina", category: "food", categoryLabel: "Food", petType: "fish", price: 320, rating: 4.2, reviewCount: 28, image: img("photo-1520637836862-4d197d17c55a"), stock: 60 },
  { id: "p10", name: "Dog Shampoo & Conditioner Kit", brand: "Orijen", category: "grooming", categoryLabel: "Grooming", petType: "dog", price: 1150, originalPrice: 1400, rating: 4.7, reviewCount: 64, image: img("photo-1583511655826-05700d52f4d9"), stock: 0, isBestSeller: true },
  { id: "p11", name: "Cat Collar with Bell — Pink", brand: "Me-O", category: "accessories", categoryLabel: "Accessories", petType: "cat", price: 220, rating: 4.1, reviewCount: 12, image: img("photo-1592194996308-7b43878e84a6"), stock: 40 },
  { id: "p12", name: "Puppy Starter Combo Pack", brand: "Royal Canin", category: "combo", categoryLabel: "Combo", petType: "dog", price: 2890, originalPrice: 3500, rating: 4.9, reviewCount: 47, image: img("photo-1587300003388-59208cc962cb"), stock: 7, isNew: true, isBestSeller: true },
];

const desc = "Premium quality formulated for Bangladeshi climate, vet-approved and trusted by thousands of pet families across Dhaka, Chittagong, Sylhet and Rajshahi. Made from carefully selected ingredients to support overall health, coat shine, and digestive balance.";
const ingredients = [
  { key: "Protein", value: "32% min" },
  { key: "Fat", value: "14% min" },
  { key: "Fiber", value: "3% max" },
  { key: "Moisture", value: "10% max" },
  { key: "Made in", value: "France" },
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
export const bestSellers = () => PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
export const newArrivals = () => PRODUCTS.filter((p) => p.isNew).slice(0, 4);
export const flashSale = () => PRODUCTS.filter((p) => p.originalPrice).slice(0, 4);

export const formatBDT = (n: number) => `৳${n.toLocaleString("en-BD")}`;
