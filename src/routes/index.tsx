import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Stethoscope,
  Heart,
  Scissors,
  AlertCircle,
  Shield,
  Leaf,
  ArrowRight,
  Star,
  Phone,
  MapPin,
  Globe,
  Clock,
  ShoppingBag,
  FlaskConical,
  BookOpen,
  Hospital,
  Sparkles,
  Users,
  PawPrint,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BPAC Vet — Birds and Pet Animal Clinic | Dhaka, Bangladesh" },
      {
        name: "description",
        content:
          "Expert veterinary care, pet shop, lab and grooming for birds and all pet animals in Bangladesh. Our primary goal is to serve your animals.",
      },
      { property: "og:title", content: "BPAC Vet — Birds and Pet Animal Clinic" },
      {
        property: "og:description",
        content:
          "Veterinary clinic, pet shop, lab and grooming — all under one trusted platform in Bangladesh.",
      },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1600&q=85",
      },
    ],
  }),
  component: HomePage,
});

const HERO_IMG =
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1600&q=85";
const ABOUT_IMG =
  "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=900&q=80";

const MODULES = [
  {
    icon: ShoppingBag,
    emoji: "🛒",
    title: "Pet Shop",
    desc: "Premium food, medicine & accessories delivered across Bangladesh",
    cta: "Shop Now",
    href: "/shop",
    border: "var(--gold)",
    internal: true,
  },
  {
    icon: Hospital,
    emoji: "🏥",
    title: "Vet Clinic",
    desc: "Book appointments with BPAC Vet's certified veterinary team in Dhaka",
    cta: "Book Vet",
    href: "/clinic",
    border: "var(--teal)",
    badge: "⭐ Most Visited",
  },
  {
    icon: FlaskConical,
    emoji: "🔬",
    title: "Pet Lab",
    desc: "Blood tests, X-rays & health reports with home sample collection in Dhaka",
    cta: "Book Test",
    href: "/lab",
    border: "var(--gold)",
  },
  {
    icon: Sparkles,
    emoji: "✂️",
    title: "Grooming",
    desc: "Professional grooming at our salon or at your home in Dhaka",
    cta: "Book Grooming",
    href: "/grooming",
    border: "var(--teal)",
  },
  {
    icon: BookOpen,
    emoji: "📖",
    title: "Pet Blog",
    desc: "Expert tips on bird and pet health, nutrition and care in Bangladesh",
    cta: "Read Blog",
    href: "/blog",
    border: "var(--teal-dark)",
    internal: true,
  },
];

const SERVICES = [
  { icon: Stethoscope, emoji: "🐦", title: "Bird & Exotic Pet Care", desc: "Specialized treatment for birds, reptiles, and exotic animals." },
  { icon: Heart, emoji: "❤️", title: "Dog & Cat Consultation", desc: "Complete health checkups, vaccinations and diagnosis." },
  { icon: Scissors, emoji: "✂️", title: "Surgical Procedures", desc: "Safe, skilled surgeries for all pet types." },
  { icon: AlertCircle, emoji: "🚨", title: "Emergency Treatment", desc: "24/7 emergency care when your pet needs it most." },
  { icon: Shield, emoji: "💉", title: "Vaccinations & Deworming", desc: "Full vaccination schedules to keep your pet protected." },
  { icon: Leaf, emoji: "🌿", title: "Pet Nutrition Advice", desc: "Expert dietary guidance for healthy, happy animals." },
];

const VETS = [
  { name: "Dr. Farhan Ahmed", credentials: "BVSc | DAV", spec: "Birds & Exotic Animals", exp: "10 years", rating: 4.9, img: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=400&q=80" },
  { name: "Dr. Nusrat Jahan", credentials: "BVSc & AH", spec: "Cats & Small Animals", exp: "7 years", rating: 4.8, img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80" },
  { name: "Dr. Kamal Hossain", credentials: "PhD Veterinary", spec: "Dogs & Internal Medicine", exp: "15 years", rating: 5.0, img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80" },
  { name: "Dr. Tahmina Begum", credentials: "BVSc", spec: "Birds & Poultry", exp: "5 years", rating: 4.7, img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80" },
];

const TESTIMONIALS = [
  { quote: "Dr. saheb treated my parrot with such care. My bird recovered fully. Highly recommended!", name: "Kamal Hossain", role: "Parrot Owner, Dhaka" },
  { quote: "Best vet clinic in Dhaka. Professional staff, thorough examination, and fair pricing.", name: "Nusrat Jahan", role: "Cat Owner, Dhanmondi" },
  { quote: "They handled my dog's surgery perfectly. BPAC Vet is our family vet forever.", name: "Arif Rahman", role: "Dog Owner, Gulshan" },
];

function useCountUp(target: number, start: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
}

function Stat({ value, suffix, label, decimals = 0, start }: { value: number; suffix?: string; label: string; decimals?: number; start: boolean }) {
  const v = useCountUp(value, start);
  return (
    <div className="text-center">
      <div className="font-display text-4xl font-extrabold text-white sm:text-5xl">
        {decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-white/80">{label}</div>
    </div>
  );
}

function ModuleCardInner({ m }: { m: (typeof MODULES)[number] }) {
  const Icon = m.icon;
  return (
    <div
      className="group relative flex h-full flex-col rounded-[10px] bg-white p-7 shadow-[0_4px_18px_rgba(0,0,0,0.07)] transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_10px_28px_rgba(11,110,110,0.18)]"
      style={{ borderTop: `3px solid ${m.border}` }}
    >
      {m.badge && (
        <span className="absolute right-4 top-4 rounded-full bg-[var(--gold)] px-2.5 py-1 text-[11px] font-bold text-white">{m.badge}</span>
      )}
      <div className="grid h-14 w-14 place-items-center rounded-full bg-[var(--teal-tint)] text-2xl">
        <Icon className="h-7 w-7 text-[var(--teal)]" />
      </div>
      <h3 className="mt-5 font-display text-xl font-bold text-[var(--ink)]">{m.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--gray-cool)]">{m.desc}</p>
      <span className="mt-5 inline-flex items-center gap-2 font-semibold text-[var(--teal)] group-hover:gap-3 transition-all">
        {m.cta} <ArrowRight className="h-4 w-4" />
      </span>
    </div>
  );
}

function HomePage() {
  // Counters
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [statsIn, setStatsIn] = useState(false);
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && setStatsIn(true)),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Testimonial carousel
  const [tIdx, setTIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTIdx((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-clinic)] pb-16 lg:pb-0">
      <Header />

      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-24">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
            Trusted Veterinary Care in Bangladesh
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[58px]">
            Expert Care for<br />Birds &amp; Pet Animals.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85 sm:text-xl">
            Our primary goal is to serve your animals.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/clinic"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--teal)] px-7 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-[var(--teal-dark)]"
            >
              Book an Appointment <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#modules"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-7 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-[var(--teal)]"
            >
              Explore Platform
            </a>
          </div>
        </div>

        {/* Bottom trust strip */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/45 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-3 text-center text-sm text-white">
            <span>🐦 Birds Specialist</span>
            <span className="hidden text-white/30 sm:inline">|</span>
            <span>🐾 All Pet Animals</span>
            <span className="hidden text-white/30 sm:inline">|</span>
            <span>📞 Emergency 24/7</span>
            <span className="hidden text-white/30 sm:inline">|</span>
            <span>🛒 Online Pet Shop</span>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="py-20 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center">
            <h2 className="font-display text-3xl font-extrabold text-[var(--ink)] sm:text-4xl">
              Everything Your Pet Needs
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[var(--gray-cool)]">
              Veterinary clinic, pet shop, lab &amp; grooming — all under one trusted platform in Bangladesh
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {MODULES.map((m) =>
              m.internal ? (
                <Link key={m.title} to={m.href as "/shop"} className="block h-full">
                  <ModuleCardInner m={m} />
                </Link>
              ) : (
                <a key={m.title} href={m.href} className="block h-full">
                  <ModuleCardInner m={m} />
                </a>
              ),
            )}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="bg-[var(--teal)] py-16">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-8 px-6 lg:grid-cols-4">
          <Stat value={5000} suffix="+" label="🐦 Animals Treated" start={statsIn} />
          <Stat value={12} suffix="+" label="👨‍⚕️ Expert Vet Team" start={statsIn} />
          <Stat value={1000} suffix="+" label="🛒 Products Available" start={statsIn} />
          <Stat value={4.9} decimals={1} label="⭐ Average Rating" start={statsIn} />
        </div>
      </section>

      {/* CLINIC SERVICES */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center">
            <h2 className="font-display text-3xl font-extrabold text-[var(--ink)] sm:text-4xl">Our Veterinary Services</h2>
            <p className="mt-3 text-base text-[var(--gray-cool)]">Specialized care for birds and all pet animals</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="group rounded-[10px] border border-transparent bg-white p-7 shadow-[0_4px_18px_rgba(0,0,0,0.07)] transition-all duration-200 hover:-translate-y-1.5 hover:border-[var(--teal)] hover:border-[1.5px]"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-[var(--teal-tint)]">
                    <Icon className="h-7 w-7 text-[var(--teal)]" />
                  </div>
                  <h3 className="mt-5 font-display text-[17px] font-bold text-[var(--ink)]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--gray-cool)]">{s.desc}</p>
                  <a href="#" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--teal)] hover:text-[var(--teal-dark)]">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VETS */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center">
            <h2 className="font-display text-3xl font-extrabold text-[var(--ink)] sm:text-4xl">Meet Our Expert Vets</h2>
            <p className="mt-3 text-base text-[var(--gray-cool)]">Caring professionals dedicated to your pet's wellbeing</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VETS.map((v) => (
              <div key={v.name} className="overflow-hidden rounded-[10px] bg-[var(--bg-clinic)] shadow-[0_4px_18px_rgba(0,0,0,0.07)] transition-all duration-200 hover:-translate-y-1.5">
                <div className="aspect-[4/3] w-full overflow-hidden bg-[var(--teal-tint)]">
                  <img src={v.img} alt={v.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-[var(--ink)]">{v.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--gold)]">{v.credentials}</p>
                  <p className="mt-2 text-sm text-[var(--gray-cool)]">{v.spec}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-[var(--gray-cool)]">
                    <span>{v.exp} experience</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[var(--ink)]">
                      <Star className="h-3.5 w-3.5 fill-[var(--gold)] text-[var(--gold)]" /> {v.rating}
                    </span>
                  </div>
                  <a href="/clinic" className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-[var(--teal)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--teal-dark)]">
                    Book Appointment
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[12px] shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
            <img src={ABOUT_IMG} alt="Vet caring for pet" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--teal)]">About BPAC Vet</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-[var(--ink)] sm:text-4xl">
              Dedicated to the Health of Every Animal
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--gray-cool)]">
              Birds and Pet Animal Clinic (BPAC Vet) provides expert veterinary care for birds,
              exotic pets, dogs, cats, and all companion animals in Bangladesh. Our experienced
              veterinary team combines clinical excellence with genuine compassion — because your
              animal deserves the very best.
            </p>
            <blockquote className="my-7 border-l-4 border-[var(--gold)] pl-5 font-display italic text-lg text-[var(--ink)]">
              "Our primary goal is to serve your animals."
            </blockquote>
            <Link to="/about" className="inline-flex items-center gap-2 font-semibold text-[var(--teal)] hover:text-[var(--teal-dark)]">
              Meet Our Team <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[var(--bg-clinic)] py-20 sm:py-24">
        <div className="mx-auto max-w-[900px] px-6 text-center">
          <h2 className="font-display text-3xl font-extrabold text-[var(--ink)] sm:text-4xl">What Pet Owners Say</h2>
          <div className="mt-10 overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${tIdx * 100}%)` }}
            >
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="w-full shrink-0 px-2">
                  <div className="rounded-[10px] bg-white p-8 shadow-[0_4px_18px_rgba(0,0,0,0.07)]">
                    <div className="flex justify-center gap-1 text-[var(--gold)]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-[var(--gold)]" />
                      ))}
                    </div>
                    <p className="mt-5 font-display text-xl italic leading-relaxed text-[var(--ink)]">
                      "{t.quote}"
                    </p>
                    <p className="mt-5 text-sm font-semibold text-[var(--teal)]">— {t.name}</p>
                    <p className="text-xs text-[var(--gray-cool)]">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTIdx(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === tIdx ? "w-8 bg-[var(--teal)]" : "w-2 bg-[var(--gray-cool)]/30"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20">
        <div className="mx-auto max-w-[720px] rounded-[14px] bg-white px-6 py-12 text-center shadow-[0_4px_18px_rgba(0,0,0,0.07)] sm:px-12">
          <h2 className="font-display text-3xl font-extrabold text-[var(--ink)]">Get Weekly Pet Care Tips</h2>
          <p className="mt-3 text-sm text-[var(--gray-cool)]">Join 5,000+ pet parents in Bangladesh</p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="h-12 flex-1 rounded-md border border-black/10 bg-white px-4 text-sm outline-none focus:border-[var(--teal)] focus:ring-2 focus:ring-[var(--teal)]/20"
            />
            <button
              type="submit"
              className="h-12 rounded-md bg-[var(--teal)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--teal-dark)]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
