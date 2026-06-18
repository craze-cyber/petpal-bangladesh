import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/shop/ProductCard";
import {
  CATEGORIES,
  PET_TYPES,
  bestSellers,
  newArrivals,
  flashSale,
} from "@/lib/shop-data";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Pet Shop — Birds and Pet Animal Clinic" },
      { name: "description", content: "Shop premium pet food, medicine, toys & accessories. Cash on Delivery across Bangladesh." },
    ],
  }),
  component: ShopHome,
});

const BANNERS = [
  { title: "Bird Food Sale — 20% off this week", sub: "Premium seed mixes, pellets & treats for your bird", bg: "linear-gradient(135deg,#0B6E6E,#0E8A8A)", fg: "text-white" },
  { title: "Free delivery on orders above ৳999", sub: "Across Dhaka, Chittagong, Sylhet & Rajshahi", bg: "linear-gradient(135deg,#084F4F,#0B6E6E)", fg: "text-white" },
  { title: "New arrival: Premium Bird Cages", sub: "Stainless steel cages — built for comfort and safety", bg: "linear-gradient(135deg,#C8963C,#E0B05A)", fg: "text-white" },
];

function BannerCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % BANNERS.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative overflow-hidden rounded-3xl">
      <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${i * 100}%)` }}>
        {BANNERS.map((b, idx) => (
          <div key={idx} className="min-w-full px-8 py-12 sm:px-14 sm:py-20" style={{ background: b.bg }}>
            <p className={`text-xs font-semibold uppercase tracking-widest opacity-90 ${b.fg}`}>BPAC Shop</p>
            <h2 className={`mt-2 max-w-2xl font-display text-3xl font-extrabold leading-tight sm:text-5xl ${b.fg}`}>{b.title}</h2>
            <p className={`mt-3 text-base opacity-90 ${b.fg}`}>{b.sub}</p>
          </div>
        ))}
      </div>
      <button onClick={() => setI((i - 1 + BANNERS.length) % BANNERS.length)} className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 hover:bg-white" aria-label="Previous">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={() => setI((i + 1) % BANNERS.length)} className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 hover:bg-white" aria-label="Next">
        <ChevronRight className="h-5 w-5" />
      </button>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {BANNERS.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)} className={`h-2 rounded-full transition-all ${idx === i ? "w-8 bg-white" : "w-2 bg-white/50"}`} aria-label={`slide ${idx + 1}`} />
        ))}
      </div>
    </div>
  );
}

function Countdown() {
  const [end] = useState(() => Date.now() + 5 * 3600 * 1000 + 32 * 60 * 1000);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, end - now);
  const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
  const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
  const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
  return (
    <div className="flex items-center gap-2 font-display text-2xl font-extrabold tabular-nums">
      {[h, m, s].map((v, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-[#C0392B] shadow-inner">{v}</span>
          {i < 2 && <span className="text-white/80">:</span>}
        </span>
      ))}
    </div>
  );
}

function Section({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="font-display text-2xl font-extrabold text-[color:var(--charcoal)] sm:text-3xl">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function ShopHome() {
  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <BannerCarousel />

        <Section title="Shop by Category">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/shop/category/$slug"
                params={{ slug: c.slug }}
                className={`flex flex-col items-center justify-center gap-2 rounded-2xl ${c.bg} p-5 text-center transition hover:-translate-y-1 hover:shadow-md`}
              >
                <span className="text-3xl">{c.icon}</span>
                <span className="font-display text-sm font-bold text-[color:var(--charcoal)]">{c.label}</span>
              </Link>
            ))}
          </div>
        </Section>

        <section className="mt-14">
          <div className="rounded-3xl bg-gradient-to-r from-[#C0392B] to-[#E04A3A] p-6 sm:p-8">
            <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
              <div className="flex items-center gap-3 text-white">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-white/20"><Zap className="h-6 w-6" /></div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest opacity-90">⚡ Limited Time</p>
                  <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Flash Sale — Ends in:</h2>
                </div>
              </div>
              <Countdown />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {flashSale().map((p) => (<ProductCard key={p.id} product={p} />))}
            </div>
          </div>
        </section>

        <Section
          title="Best Sellers"
          action={<Link to="/shop/category/$slug" params={{ slug: "food" }} className="text-sm font-semibold text-[color:var(--coral)] hover:underline">View all →</Link>}
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {bestSellers().map((p) => (<ProductCard key={p.id} product={p} />))}
          </div>
        </Section>

        <Section title="New Arrivals">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {newArrivals().map((p) => (<ProductCard key={p.id} product={p} />))}
          </div>
        </Section>

        <Section title="Shop by Pet">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 sm:gap-4">
            {PET_TYPES.map((p) => (
              <Link
                key={p.slug}
                to="/shop/category/$slug"
                params={{ slug: p.slug }}
                className={`group flex flex-col items-center justify-center gap-3 rounded-3xl bg-gradient-to-br ${p.color} p-6 text-center transition hover:-translate-y-1 hover:shadow-lg`}
              >
                <span className="text-5xl transition group-hover:scale-110">{p.icon}</span>
                <span className="font-display text-base font-extrabold text-[color:var(--charcoal)]">{p.label}</span>
              </Link>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
