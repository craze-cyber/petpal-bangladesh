import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ShoppingBag,
  Stethoscope,
  FlaskConical,
  Scissors,
  BookOpen,
  ArrowRight,
  Star,
  Check,
  Smartphone,
  Apple,
  Home as HomeIcon,
  Calendar,
  User,
  MessageCircle,
  PawPrint,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Counter, FadeUp } from "@/components/site/Motion";
import heroPets from "@/assets/hero-pets.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Birds and Pet Animal Clinic — Bangladesh's All-in-One Pet Care" },
      {
        name: "description",
        content:
          "Shop pet supplies, book vets, lab tests and grooming across Bangladesh. Bengali & English support, bKash · Nagad · Rocket payments.",
      },
      { property: "og:title", content: "Birds and Pet Animal Clinic — BPAC" },
      {
        property: "og:description",
        content: "Bangladesh's first all-in-one pet care platform — Shop, Clinic, Lab & Grooming.",
      },
    ],
  }),
  component: HomePage,
});

const modules = [
  {
    emoji: "🛒",
    Icon: ShoppingBag,
    title: "Pet Shop",
    desc: "Premium food, toys & accessories delivered to your door in Dhaka.",
    cta: "Shop Now",
    href: "/shop",
  },
  {
    emoji: "🏥",
    Icon: Stethoscope,
    title: "Vet Clinic",
    desc: "Book appointments with Bangladesh's best certified veterinarians.",
    cta: "Book Vet",
    href: "/clinic",
  },
  {
    emoji: "🔬",
    Icon: FlaskConical,
    title: "Pet Lab",
    desc: "Blood tests, X-rays & health reports with home sample collection.",
    cta: "Book Test",
    href: "/lab",
  },
  {
    emoji: "✂️",
    Icon: Scissors,
    title: "Grooming",
    desc: "Professional grooming at our salon or at your home in Dhaka.",
    cta: "Book Grooming",
    href: "/grooming",
  },
  {
    emoji: "📖",
    Icon: BookOpen,
    title: "Pet Blog",
    desc: "Expert tips on pet health, nutrition and care in Bengali & English.",
    cta: "Read Blog",
    href: "/blog",
  },
];

const vets = [
  {
    name: "Dr. Farhan Ahmed",
    qual: "BVSc · Dhaka Vet College",
    spec: "Small Animals & Surgery",
    exp: "10 yrs",
    rating: 4.9,
    color: "from-[#FFD6D6] to-[#FFE9DD]",
  },
  {
    name: "Dr. Nusrat Jahan",
    qual: "BVSc & AH",
    spec: "Cats & Exotic Animals",
    exp: "7 yrs",
    rating: 4.8,
    color: "from-[#D6F5F2] to-[#E6FBF8]",
  },
  {
    name: "Dr. Kamal Hossain",
    qual: "PhD Veterinary",
    spec: "Dogs & Internal Medicine",
    exp: "15 yrs",
    rating: 5.0,
    color: "from-[#FFF3C7] to-[#FFF8DC]",
  },
  {
    name: "Dr. Tahmina Begum",
    qual: "BVSc",
    spec: "Birds & Small Pets",
    exp: "5 yrs",
    rating: 4.7,
    color: "from-[#E8DDF7] to-[#F4ECFD]",
  },
];

const products = [
  { name: "Royal Canin Adult Dog Food 3kg", price: 1850, emoji: "🐕", rating: 4.8 },
  { name: "Whiskas Tuna Cat Food 12 Pack", price: 960, emoji: "🐈", rating: 4.7 },
  { name: "Premium Dog Leash & Collar Set", price: 450, emoji: "🦮", rating: 4.6 },
  { name: "Automatic Water Fountain for Pets", price: 1200, emoji: "💧", rating: 4.9 },
];

const testimonials = [
  {
    text: "BPAC saved my cat Luna's life when she was sick. Dr. Farhan diagnosed her perfectly and the medicines arrived same day!",
    name: "Fatima Khanom",
    loc: "Gulshan, Dhaka",
    bn: false,
  },
  {
    text: "আমার কুকুর Max এর গ্রুমিং এত সুন্দর হয়েছে! Home service এ এসে এত ভালো কাজ করেছে।",
    name: "Rahim Uddin",
    loc: "Dhanmondi, Dhaka",
    bn: true,
  },
  {
    text: "Lab report came within 24 hours and the vet could see it directly. Amazing service for pet owners in Bangladesh!",
    name: "Sarah Ahmed",
    loc: "Chittagong",
    bn: false,
  },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-[color:var(--background)] pb-20 lg:pb-0">
      <Header />
      <main>
        <Hero />
        <Modules />
        <Stats />
        <Steps />
        <Vets />
        <Products />
        <Testimonials />
        <AppDownload />
        <Newsletter />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileBottomNav />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FF6B6B] via-[#FF7A5C] to-[#FF8E53] text-white">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-[color:var(--yellow)]/30 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-6 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-1"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold backdrop-blur">
            <PawPrint className="h-3.5 w-3.5" /> 10,000+ Happy Pets in BD
          </span>
          <h1 className="mt-5 font-bn text-4xl font-extrabold leading-[1.15] sm:text-5xl lg:text-6xl">
            আপনার পোষা প্রাণীর<br />সেরা যত্ন
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            Bangladesh's First All-in-One Pet Care Platform — Shop, Clinic, Lab &amp; Grooming in one place.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-[color:var(--coral)] shadow-lg shadow-black/10 transition hover:bg-[color:var(--pink-soft)] sm:text-base">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-full border-2 border-white/80 bg-transparent px-7 text-sm font-bold text-white transition hover:bg-white/10 sm:text-base">
              Explore Services
            </button>
          </div>
          <div className="mt-8 flex items-center gap-5 text-xs text-white/85">
            <div className="flex items-center gap-1.5"><Check className="h-4 w-4" /> bKash · Nagad · Rocket</div>
            <div className="flex items-center gap-1.5"><Check className="h-4 w-4" /> Cash on Delivery</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2"
        >
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="absolute inset-6 rounded-[40%_60%_55%_45%/55%_45%_60%_40%] bg-white/15 blur-2xl" />
            <img
              src={heroPets}
              alt="Happy pet family in Bangladesh"
              width={1024}
              height={1024}
              className="relative mx-auto w-full max-w-md drop-shadow-2xl animate-float"
            />
            <div className="absolute -left-2 top-6 hidden rounded-2xl bg-white px-4 py-3 text-[color:var(--charcoal)] shadow-xl sm:flex sm:items-center sm:gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--teal)]/20 text-[color:var(--teal)]">
                <Stethoscope className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold">Vet on call</p>
                <p className="text-[10px] text-[color:var(--gray-soft)]">24/7 in Dhaka</p>
              </div>
            </div>
            <div className="absolute -right-2 bottom-10 hidden rounded-2xl bg-white px-4 py-3 text-[color:var(--charcoal)] shadow-xl sm:flex sm:items-center sm:gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--yellow)]/40 text-[color:var(--charcoal)]">
                <Star className="h-4 w-4 fill-current" />
              </div>
              <div>
                <p className="text-xs font-bold">4.9 / 5</p>
                <p className="text-[10px] text-[color:var(--gray-soft)]">2,500+ reviews</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- MODULES ---------------- */
function Modules() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <FadeUp className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-[color:var(--coral)]">Our Services</p>
        <h2 className="mt-2 text-3xl font-extrabold text-[color:var(--charcoal)] sm:text-4xl">
          Everything Your Pet Needs
        </h2>
        <p className="mt-3 text-[color:var(--gray-soft)]">
          One platform for every pet parent in Bangladesh — from daily food to emergency vet care.
        </p>
      </FadeUp>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5">
        {modules.map((m, i) => (
          <FadeUp
            key={m.title}
            delay={i * 0.07}
            className={i === 4 ? "col-span-2 lg:col-span-1" : ""}
          >
            <motion.a
              href={m.href}
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group flex h-full flex-col rounded-2xl border-t-4 border-[color:var(--coral)] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition hover:shadow-[0_12px_30px_rgba(255,107,107,0.18)] sm:p-6"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--pink-soft)] text-2xl">
                <span aria-hidden>{m.emoji}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-extrabold text-[color:var(--charcoal)]">
                {m.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[color:var(--gray-soft)]">
                {m.desc}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[color:var(--coral)] transition group-hover:gap-2.5">
                {m.cta} <ArrowRight className="h-4 w-4" />
              </span>
            </motion.a>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ---------------- STATS ---------------- */
function Stats() {
  const stats = [
    { emoji: "🐾", num: 10000, suffix: "+", label: "Pets Registered" },
    { emoji: "👨‍⚕️", num: 50, suffix: "+", label: "Certified Vets" },
    { emoji: "🛒", num: 5000, suffix: "+", label: "Products Available" },
    { emoji: "⭐", num: 49, suffix: "", label: "Average Rating", divide: 10 },
  ];
  return (
    <section className="bg-[color:var(--teal)] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-14 sm:gap-6 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.07}>
            <div className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur sm:p-7">
              <div className="text-3xl">{s.emoji}</div>
              <div className="mt-2 font-display text-3xl font-black sm:text-4xl">
                {s.divide ? (
                  <>
                    <Counter to={s.num / s.divide} />.<Counter to={s.num % s.divide} />
                  </>
                ) : (
                  <Counter to={s.num} suffix={s.suffix} />
                )}
              </div>
              <p className="mt-1 text-sm font-medium text-white/90">{s.label}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ---------------- STEPS ---------------- */
function Steps() {
  const steps = [
    { emoji: "📱", title: "Create Account & Add Your Pet", desc: "Sign up free, add your pet's profile and health history." },
    { emoji: "🔍", title: "Choose Any Service You Need", desc: "Shop, vet, lab or grooming — pick what your pet needs today." },
    { emoji: "🎉", title: "Get Care Delivered or Visit Us", desc: "Same-day delivery in Dhaka, or visit our clinic in Dhanmondi." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <FadeUp className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-[color:var(--coral)]">How it works</p>
        <h2 className="mt-2 text-3xl font-extrabold text-[color:var(--charcoal)] sm:text-4xl">
          Start in 3 Easy Steps
        </h2>
      </FadeUp>

      <div className="relative mt-12 grid gap-8 lg:grid-cols-3 lg:gap-6">
        <div
          aria-hidden
          className="absolute left-1/2 top-10 hidden h-px w-2/3 -translate-x-1/2 border-t-2 border-dashed border-[color:var(--coral)]/40 lg:block"
        />
        {steps.map((s, i) => (
          <FadeUp key={s.title} delay={i * 0.1}>
            <div className="relative flex flex-col items-center text-center">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-[color:var(--coral)] text-3xl text-white shadow-[0_10px_30px_rgba(255,107,107,0.35)]">
                {s.emoji}
              </div>
              <span className="absolute -top-2 left-1/2 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full bg-white text-xs font-extrabold text-[color:var(--coral)] shadow ring-2 ring-[color:var(--coral)]">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-xl font-extrabold text-[color:var(--charcoal)]">{s.title}</h3>
              <p className="mt-2 max-w-xs text-sm text-[color:var(--gray-soft)]">{s.desc}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ---------------- VETS ---------------- */
function Vets() {
  return (
    <section className="bg-[color:var(--pink-soft)]/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <FadeUp className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-[color:var(--coral)]">Our Vets</p>
            <h2 className="mt-2 text-3xl font-extrabold text-[color:var(--charcoal)] sm:text-4xl">
              Meet Our Expert Vets
            </h2>
          </div>
          <a href="/clinic" className="text-sm font-bold text-[color:var(--coral)] hover:underline">
            View all vets →
          </a>
        </FadeUp>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {vets.map((v, i) => (
            <FadeUp key={v.name} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)]"
              >
                <div className={`relative grid h-44 place-items-center bg-gradient-to-br ${v.color}`}>
                  <div className="grid h-24 w-24 place-items-center rounded-full bg-white text-4xl shadow-md">
                    👨‍⚕️
                  </div>
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-[color:var(--charcoal)] shadow">
                    <Star className="h-3 w-3 fill-[color:var(--yellow)] text-[color:var(--yellow)]" />
                    {v.rating}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-extrabold text-[color:var(--charcoal)]">{v.name}</h3>
                  <p className="mt-0.5 text-xs text-[color:var(--gray-soft)]">{v.qual}</p>
                  <p className="mt-3 text-sm font-semibold text-[color:var(--charcoal)]">{v.spec}</p>
                  <p className="text-xs text-[color:var(--gray-soft)]">{v.exp} experience</p>
                  <button className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-full bg-[color:var(--coral)] text-sm font-bold text-white transition hover:bg-[color:var(--coral-dark)]">
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRODUCTS ---------------- */
function Products() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <FadeUp className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-[color:var(--coral)]">Pet Shop</p>
          <h2 className="mt-2 text-3xl font-extrabold text-[color:var(--charcoal)] sm:text-4xl">
            Top Products This Week
          </h2>
        </div>
        <a href="/shop" className="text-sm font-bold text-[color:var(--coral)] hover:underline">
          View all products →
        </a>
      </FadeUp>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p, i) => (
          <FadeUp key={p.name} delay={i * 0.06}>
            <motion.div
              whileHover={{ y: -4 }}
              className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)]"
            >
              <div className="relative grid h-44 place-items-center bg-gradient-to-br from-[#FFF5F5] to-[#FFEDE0] text-6xl">
                {p.emoji}
                <span className="absolute left-3 top-3 rounded-full bg-[color:var(--coral)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  Bestseller
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-display text-sm font-extrabold text-[color:var(--charcoal)]">{p.name}</h3>
                <div className="mt-1 flex items-center gap-1 text-xs text-[color:var(--gray-soft)]">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star
                      key={s}
                      className={`h-3 w-3 ${s < Math.round(p.rating) ? "fill-[color:var(--yellow)] text-[color:var(--yellow)]" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-1">{p.rating}</span>
                </div>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="font-display text-lg font-extrabold text-[color:var(--charcoal)]">
                      ৳{p.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <button
                    aria-label={`Add ${p.name} to cart`}
                    className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[color:var(--coral)] px-4 text-xs font-bold text-white transition hover:bg-[color:var(--coral-dark)]"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" /> Add
                  </button>
                </div>
              </div>
            </motion.div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="bg-[color:var(--pink-soft)]">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <FadeUp className="text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-[color:var(--coral)]">Stories</p>
          <h2 className="mt-2 text-3xl font-extrabold text-[color:var(--charcoal)] sm:text-4xl">
            What Pet Parents Say
          </h2>
        </FadeUp>

        <div className="relative mt-10 overflow-hidden">
          <motion.div
            animate={{ x: `-${idx * 100}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex"
          >
            {testimonials.map((t) => (
              <div key={t.name} className="w-full shrink-0 px-2">
                <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] sm:p-10">
                  <div className="flex justify-center gap-1">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Star key={s} className="h-5 w-5 fill-[color:var(--yellow)] text-[color:var(--yellow)]" />
                    ))}
                  </div>
                  <p className={`mt-5 text-base leading-relaxed text-[color:var(--charcoal)] sm:text-lg ${t.bn ? "font-bn" : ""}`}>
                    "{t.text}"
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--coral)] font-bold text-white">
                      {t.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-[color:var(--charcoal)]">{t.name}</p>
                      <p className="text-xs text-[color:var(--gray-soft)]">{t.loc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-2 rounded-full transition-all ${
                i === idx ? "w-8 bg-[color:var(--coral)]" : "w-2 bg-[color:var(--coral)]/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- APP DOWNLOAD ---------------- */
function AppDownload() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8">
        <FadeUp>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            Take BPAC Everywhere
          </h2>
          <p className="mt-3 max-w-md text-white/90">
            Download our app — coming soon on Android &amp; iOS. Manage your pet's health, orders and appointments on the go.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex h-14 items-center gap-3 rounded-2xl bg-black/90 px-5 text-left text-white transition hover:bg-black">
              <Smartphone className="h-6 w-6" />
              <div>
                <p className="text-[10px] uppercase tracking-wide text-white/70">Coming soon on</p>
                <p className="font-display text-base font-extrabold leading-none">Google Play</p>
              </div>
            </button>
            <button className="inline-flex h-14 items-center gap-3 rounded-2xl bg-black/90 px-5 text-left text-white transition hover:bg-black">
              <Apple className="h-6 w-6" />
              <div>
                <p className="text-[10px] uppercase tracking-wide text-white/70">Coming soon on</p>
                <p className="font-display text-base font-extrabold leading-none">App Store</p>
              </div>
            </button>
          </div>
        </FadeUp>
        <FadeUp delay={0.1} className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute inset-0 -m-6 rounded-[3rem] bg-white/15 blur-2xl" />
            <div className="relative h-[440px] w-[220px] rounded-[2.2rem] border-[10px] border-black/80 bg-white shadow-2xl">
              <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-black/80" />
              <div className="flex h-full flex-col gap-3 overflow-hidden rounded-[1.4rem] bg-[color:var(--pink-soft)] p-3 pt-8">
                <div className="rounded-2xl bg-[color:var(--coral)] p-3 text-white">
                  <p className="text-[10px] opacity-80">Hi, Fatima 👋</p>
                  <p className="font-display text-sm font-extrabold">How's Luna today?</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { e: "🛒", t: "Shop" },
                    { e: "🏥", t: "Vet" },
                    { e: "🔬", t: "Lab" },
                    { e: "✂️", t: "Groom" },
                  ].map((x) => (
                    <div key={x.t} className="rounded-xl bg-white p-2 text-center">
                      <div className="text-lg">{x.e}</div>
                      <p className="text-[10px] font-bold text-[color:var(--charcoal)]">{x.t}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-white p-3">
                  <p className="text-[10px] font-bold text-[color:var(--gray-soft)]">Next Visit</p>
                  <p className="font-display text-xs font-extrabold text-[color:var(--charcoal)]">Dr. Farhan · Sat 4pm</p>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ---------------- NEWSLETTER ---------------- */
function Newsletter() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <FadeUp className="rounded-3xl border border-[color:var(--coral)]/20 bg-white p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] sm:p-12">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[color:var(--pink-soft)] text-2xl">
          📬
        </div>
        <h2 className="mt-4 text-2xl font-extrabold text-[color:var(--charcoal)] sm:text-3xl">
          Get Weekly Pet Care Tips in Your Inbox
        </h2>
        <p className="mt-2 text-sm text-[color:var(--gray-soft)]">Join 5,000+ pet parents in Bangladesh.</p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="your@email.com"
            className="h-12 flex-1 rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-5 text-sm outline-none ring-[color:var(--coral)] focus:ring-2"
          />
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[color:var(--coral)] px-6 text-sm font-bold text-white transition hover:bg-[color:var(--coral-dark)]"
          >
            Subscribe
          </button>
        </form>
      </FadeUp>
    </section>
  );
}

/* ---------------- WHATSAPP FLOATING ---------------- */
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/8801700000000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-24 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg animate-wa-pulse lg:bottom-6"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-[color:var(--charcoal)] px-3 py-1.5 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100 sm:block">
        Chat on WhatsApp
      </span>
    </a>
  );
}

/* ---------------- MOBILE BOTTOM NAV ---------------- */
function MobileBottomNav() {
  const items = [
    { Icon: HomeIcon, label: "Home", active: true },
    { Icon: ShoppingBag, label: "Shop" },
    { Icon: Calendar, label: "Book" },
    { Icon: User, label: "Profile" },
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--border)] bg-white/95 backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4">
        {items.map(({ Icon, label, active }) => (
          <button
            key={label}
            className={`flex h-16 flex-col items-center justify-center gap-1 text-xs font-semibold ${
              active ? "text-[color:var(--coral)]" : "text-[color:var(--gray-soft)]"
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
