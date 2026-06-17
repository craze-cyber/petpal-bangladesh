export type BlogCategory = "Bird Care" | "Nutrition" | "Health" | "Grooming" | "Training";

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  author: { name: string; credentials: string; avatar: string };
  date: string;
  readTime: string;
  cover: string;
  featured?: boolean;
  content: { type: "h2" | "p" | "ul" | "quote"; text?: string; items?: string[] }[];
};

const drFarhan = {
  name: "Dr. Farhan Ahmed",
  credentials: "DVM, Chief Veterinary Officer — BPAC Vet",
  avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop",
};
const rashida = {
  name: "Rashida Khanom",
  credentials: "Founder & CEO — BPAC Vet",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop",
};
const sadia = {
  name: "Sadia Islam",
  credentials: "Head of Grooming Services — BPAC Vet",
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop",
};

export const posts: BlogPost[] = [
  {
    slug: "top-10-pet-birds-bangladesh",
    title: "Top 10 Pet Birds Popular in Bangladesh",
    category: "Bird Care",
    excerpt:
      "From the talkative Cockatiel to the majestic African Grey — discover the 10 pet birds Bangladeshi families love most in 2025.",
    author: drFarhan,
    date: "June 12, 2026",
    readTime: "9 min read",
    cover: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=1600&auto=format&fit=crop",
    featured: true,
    content: [
      { type: "p", text: "Bird keeping has a long tradition in Bangladesh, and in the last five years pet birds have become a serious part of urban homes in Dhaka, Chittagong and Sylhet. Here are the ten most popular companions we see at BPAC Vet." },
      { type: "h2", text: "1. Budgerigar (Budgie)" },
      { type: "p", text: "Small, affordable, full of personality — and the gateway bird for most Bangladeshi families." },
      { type: "h2", text: "2. Cockatiel" },
      { type: "p", text: "Friendly, easy to tame and a strong whistler. Perfect for apartment living in Dhaka." },
      { type: "h2", text: "3. Lovebird" },
      { type: "p", text: "Colourful, bonded pairs that thrive in our climate when given proper shade and nutrition." },
      { type: "h2", text: "4. African Grey Parrot" },
      { type: "p", text: "The most intelligent of all pet birds. Requires experienced owners and routine vet care." },
      { type: "h2", text: "Other top picks" },
      { type: "ul", items: ["Alexandrine Parakeet", "Finches & Java Sparrows", "Cockatoo", "Ringneck Parrot", "Conure", "Macaw"] },
      { type: "quote", text: "Birds are not low-maintenance pets. A good vet relationship is non-negotiable." },
    ],
  },
  {
    slug: "popular-pet-birds-care-bn",
    title: "বাংলাদেশে জনপ্রিয় পোষা পাখির যত্ন",
    category: "Bird Care",
    excerpt:
      "বাংলাদেশের আবহাওয়ায় বাজরিগার, ককাটিয়েল ও লাভবার্ড ভালো রাখার জন্য খাবার, খাঁচা ও স্বাস্থ্য সংক্রান্ত পূর্ণ গাইড।",
    author: drFarhan,
    date: "June 5, 2026",
    readTime: "7 min read",
    cover: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=1600&auto=format&fit=crop",
    content: [
      { type: "p", text: "বাংলাদেশে পোষা পাখির সংখ্যা প্রতি বছর বাড়ছে। সঠিক যত্ন ছাড়া এরা সহজেই অসুস্থ হয়ে পড়ে।" },
      { type: "h2", text: "খাবার ও পানি" },
      { type: "p", text: "শুধু বীজ যথেষ্ট নয় — তাজা ফল, সবজি ও পেলেট মিশিয়ে দিন। প্রতিদিন বিশুদ্ধ পানি পরিবর্তন করুন।" },
      { type: "h2", text: "খাঁচা ও পরিবেশ" },
      { type: "ul", items: ["বড় ও বায়ুচলাচলযোগ্য খাঁচা", "সরাসরি রোদ এড়িয়ে চলুন", "প্রতিদিন কিছু সময় খাঁচার বাইরে উড়তে দিন"] },
      { type: "h2", text: "নিয়মিত স্বাস্থ্য পরীক্ষা" },
      { type: "p", text: "বছরে অন্তত একবার পশু চিকিৎসকের কাছে নিয়ে যান। BPAC Vet পাখি বিশেষজ্ঞ চিকিৎসা সেবা দিচ্ছে।" },
    ],
  },
  {
    slug: "cockatiel-care-dhaka",
    title: "How to Care for Your Cockatiel in Dhaka",
    category: "Bird Care",
    excerpt:
      "Dhaka's heat, humidity and apartment living create unique challenges for cockatiels. Here is the complete BPAC Vet care guide.",
    author: drFarhan,
    date: "May 28, 2026",
    readTime: "6 min read",
    cover: "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=1600&auto=format&fit=crop",
    content: [
      { type: "p", text: "Cockatiels are the second most popular pet bird in Bangladesh — and one of the most misunderstood." },
      { type: "h2", text: "Diet" },
      { type: "ul", items: ["70% pellets, 20% fresh vegetables, 10% seeds", "Avoid avocado, chocolate and onion", "Filtered water, changed twice daily"] },
      { type: "h2", text: "Climate" },
      { type: "p", text: "Keep the cage out of direct sun and away from AC vents. Aim for 24–28°C ambient temperature." },
      { type: "h2", text: "Health signs to watch" },
      { type: "ul", items: ["Ruffled feathers all day", "Tail bobbing while breathing", "Loss of appetite for more than 24 hours"] },
    ],
  },
  {
    slug: "dog-vaccination-schedule-bd-2025",
    title: "Dog Vaccination Schedule for Bangladesh 2025",
    category: "Health",
    excerpt:
      "A vet-approved 2025 vaccination timeline for dogs in Bangladesh — from puppyhood through adulthood, including anti-rabies.",
    author: drFarhan,
    date: "May 15, 2026",
    readTime: "6 min read",
    cover: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1600&auto=format&fit=crop",
    content: [
      { type: "p", text: "Vaccination is the cheapest insurance you can give your dog. Here is the standard BPAC Vet schedule for 2025." },
      { type: "h2", text: "6 – 8 weeks" },
      { type: "p", text: "First DHPP shot (Distemper, Hepatitis, Parainfluenza, Parvovirus)." },
      { type: "h2", text: "12 weeks onwards" },
      { type: "ul", items: ["Second DHPP booster", "Anti-rabies (mandatory in Bangladesh)", "Leptospirosis"] },
      { type: "h2", text: "Annual boosters" },
      { type: "p", text: "Once a year for the rest of your dog's life. Book at the BPAC Vet clinic in Dhaka." },
    ],
  },
  {
    slug: "best-bird-food-dhaka-2025",
    title: "Best Bird Food Available in Dhaka 2025",
    category: "Nutrition",
    excerpt:
      "We ranked 12 bird food brands available in Dhaka by quality, value and availability — here are the BPAC Vet top picks.",
    author: rashida,
    date: "April 22, 2026",
    readTime: "7 min read",
    cover: "https://images.unsplash.com/photo-1518882179400-2d3327c8e9b1?w=1600&auto=format&fit=crop",
    content: [
      { type: "p", text: "Walk into any pet store in Dhaka and you will see dozens of brands. Not all are formulated for the species you keep." },
      { type: "h2", text: "Top pellets" },
      { type: "ul", items: ["Harrison's Adult Lifetime", "Roudybush Daily Maintenance", "Vetafarm Nutriblend"] },
      { type: "h2", text: "Top seed mixes" },
      { type: "ul", items: ["Versele-Laga Prestige", "Vitakraft Menu Vital"] },
    ],
  },
  {
    slug: "bird-emergency-signs",
    title: "Signs Your Pet Bird Needs a Vet Immediately",
    category: "Health",
    excerpt:
      "Birds hide illness until they are critically sick. Learn the warning signs every bird owner in Bangladesh must recognise.",
    author: drFarhan,
    date: "April 5, 2026",
    readTime: "5 min read",
    cover: "https://images.unsplash.com/photo-1538439907460-1596cafd4eff?w=1600&auto=format&fit=crop",
    content: [
      { type: "p", text: "In the wild, a sick bird is a target. They mask illness instinctively — by the time you notice, hours matter." },
      { type: "h2", text: "Emergency signs" },
      { type: "ul", items: [
        "Fluffed feathers all day",
        "Sitting at the bottom of the cage",
        "Tail bobbing while breathing",
        "Discharge from eyes or nostrils",
        "Blood in droppings",
        "Sudden loss of voice",
      ] },
      { type: "quote", text: "If you are unsure — call us. BPAC Vet runs a 24/7 emergency line." },
    ],
  },
];

export const categories = [
  { id: "all", label: "All", icon: "✨" },
  { id: "Bird Care", label: "Bird Care", icon: "🐦" },
  { id: "Nutrition", label: "Nutrition", icon: "🍖" },
  { id: "Health", label: "Health", icon: "🏥" },
  { id: "Grooming", label: "Grooming", icon: "✂️" },
  { id: "Training", label: "Training", icon: "🎓" },
] as const;
