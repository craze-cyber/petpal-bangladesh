export type BlogPost = {
  slug: string;
  title: string;
  category: "Nutrition" | "Health" | "Grooming" | "Training" | "News";
  excerpt: string;
  author: { name: string; credentials: string; avatar: string };
  date: string;
  readTime: string;
  cover: string;
  content: { type: "h2" | "p" | "ul" | "quote"; text?: string; items?: string[] }[];
};

export const posts: BlogPost[] = [
  {
    slug: "10-popular-dog-breeds-bangladesh",
    title: "বাংলাদেশে জনপ্রিয় ১০টি কুকুরের জাত",
    category: "News",
    excerpt:
      "From the loyal German Shepherd to the playful Pomeranian — discover the top 10 dog breeds Bangladeshi families love in 2024.",
    author: {
      name: "Dr. Farhan Ahmed",
      credentials: "DVM, Chief Veterinary Officer",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop",
    },
    date: "June 10, 2026",
    readTime: "8 min read",
    cover: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1600&auto=format&fit=crop",
    content: [
      { type: "p", text: "Bangladesh's pet community has grown rapidly over the last five years, with Dhaka, Chittagong and Sylhet leading the trend. We surveyed 2,000 BPAC customers to find which dog breeds are winning hearts." },
      { type: "h2", text: "1. German Shepherd" },
      { type: "p", text: "Loyal, protective and easy to train — the #1 pick for Bangladeshi families looking for both a companion and a guardian." },
      { type: "h2", text: "2. Pomeranian" },
      { type: "p", text: "Tiny, fluffy and perfect for apartments in Dhaka. Just be ready for daily brushing in our humid climate." },
      { type: "h2", text: "What to consider before choosing" },
      { type: "ul", items: [
        "Climate tolerance — many heavy-coat breeds suffer in BD summers",
        "Apartment vs. house living",
        "Time available for exercise and training",
        "Local availability of vet care for the breed",
      ] },
      { type: "quote", text: "The best breed is the one that fits your lifestyle — not the one that's trending." },
    ],
  },
  {
    slug: "keep-cat-healthy-in-heat",
    title: "গরমে আপনার বিড়ালকে সুস্থ রাখার উপায়",
    category: "Health",
    excerpt:
      "Dhaka summers can hit 38°C. Here's how to keep your indoor cat cool, hydrated and happy through the hottest months.",
    author: {
      name: "Dr. Farhan Ahmed",
      credentials: "DVM, Chief Veterinary Officer",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop",
    },
    date: "May 28, 2026",
    readTime: "5 min read",
    cover: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=1600&auto=format&fit=crop",
    content: [
      { type: "p", text: "Cats don't sweat like humans — they release heat through their paw pads and by grooming. In Bangladesh's summer, that's often not enough." },
      { type: "h2", text: "Signs of heatstroke" },
      { type: "ul", items: ["Heavy panting", "Drooling", "Bright red gums", "Lethargy or vomiting"] },
      { type: "h2", text: "Simple steps to stay cool" },
      { type: "p", text: "Keep a fan on low near (not on) the cat, leave fresh water in two or three locations, and avoid heavy meals during the hottest hours." },
    ],
  },
  {
    slug: "pet-vaccination-schedule-dogs-bd",
    title: "Pet Vaccination Schedule for Dogs in BD",
    category: "Health",
    excerpt:
      "A vet-approved timeline of every vaccine your dog needs in Bangladesh — from puppyhood through adulthood.",
    author: {
      name: "Dr. Farhan Ahmed",
      credentials: "DVM, Chief Veterinary Officer",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop",
    },
    date: "May 15, 2026",
    readTime: "6 min read",
    cover: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1600&auto=format&fit=crop",
    content: [
      { type: "p", text: "Vaccination is the cheapest insurance you can give your dog. Here is the standard BPAC schedule." },
      { type: "h2", text: "6 – 8 weeks" },
      { type: "p", text: "First DHPP shot (Distemper, Hepatitis, Parainfluenza, Parvovirus)." },
      { type: "h2", text: "12 weeks onwards" },
      { type: "ul", items: ["Second DHPP booster", "Anti-rabies (mandatory in BD)", "Leptospirosis"] },
    ],
  },
  {
    slug: "best-pet-foods-dhaka-2024",
    title: "Best Pet Foods Available in Dhaka 2024",
    category: "Nutrition",
    excerpt:
      "We ranked 15 pet food brands available in Dhaka by quality, value and availability — here are our top picks.",
    author: {
      name: "Rashida Khanom",
      credentials: "Co-Founder, BPAC",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop",
    },
    date: "April 22, 2026",
    readTime: "7 min read",
    cover: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=1600&auto=format&fit=crop",
    content: [
      { type: "p", text: "Walk into any pet store in Dhaka and you'll see dozens of brands — not all are worth your money." },
      { type: "h2", text: "Top dry foods" },
      { type: "ul", items: ["Royal Canin Maxi Adult", "Pedigree Pro Adult", "Drools Focus Adult"] },
    ],
  },
  {
    slug: "introduce-new-pet-to-home",
    title: "How to Introduce a New Pet to Your Home",
    category: "Training",
    excerpt:
      "Bringing home a new puppy or kitten? Follow this 7-day plan to make the transition smooth for everyone.",
    author: {
      name: "Sadia Islam",
      credentials: "Head of Grooming, BPAC",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop",
    },
    date: "April 5, 2026",
    readTime: "4 min read",
    cover: "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=1600&auto=format&fit=crop",
    content: [
      { type: "p", text: "The first week sets the tone for years of behavior. Take it slow." },
      { type: "h2", text: "Day 1 – 2: Quiet zone" },
      { type: "p", text: "Set up one room with food, water and bed. Let the pet decompress." },
    ],
  },
];

export const categories = [
  { id: "all", label: "All", icon: "✨" },
  { id: "Nutrition", label: "Nutrition", icon: "🍖" },
  { id: "Health", label: "Health", icon: "🏥" },
  { id: "Grooming", label: "Grooming", icon: "✂️" },
  { id: "Training", label: "Training", icon: "🎓" },
  { id: "News", label: "News", icon: "📰" },
] as const;
