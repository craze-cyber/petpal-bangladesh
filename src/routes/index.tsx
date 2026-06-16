import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Stethoscope,
  Scissors,
  Heart,
  Home as HomeIcon,
  GraduationCap,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Users,
  Star,
  MessageCircle,
  Calendar,
  User,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pet Bond BD — Bangladesh's #1 Pet Care Platform" },
      {
        name: "description",
        content:
          "Connect with trusted vets, groomers, and pet lovers across Bangladesh. Veterinary care, grooming, adoption, training and pet shop in one place.",
      },
      { property: "og:title", content: "Pet Bond BD — Where Every Pet Finds Their Bond" },
      {
        property: "og:description",
        content: "Bangladesh's premium pet care platform connecting families with verified vets, groomers and the pet community.",
      },
    ],
  }),
  component: HomePage,
});

const HERO_IMG =
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1600&q=80";

const services = [
  {
    Icon: Stethoscope,
    title: "Veterinary Care",
    desc: "Connect with 500+ certified vets across Bangladesh for checkups, surgery and emergency care.",
    to: "/services",
  },
  {
    Icon: Scissors,
    title: "Pet Grooming",
    desc: "Professional grooming at our salon or in the comfort of your home in Dhaka.",
    to: "/services",
  },
  {
    Icon: Heart,
    title: "Adoption",
    desc: "Give a forever home to pets in need through our verified adoption partners.",
    to: "/about",
  },
  {
    Icon: HomeIcon,
    title: "Pet Boarding",
    desc: "Safe, loving boarding for your pet while you travel. Trusted hosts and 24/7 care.",
    to: "/services",
  },
  {
    Icon: GraduationCap,
    title: "Training",
    desc: "Positive-reinforcement training programs for puppies, adult dogs and cats.",
    to: "/services",
  },
  {
    Icon: ShoppingBag,
    title: "Pet Shop",
    desc: "Premium food, accessories, and supplies delivered across Bangladesh.",
    to: "/shop",
  },
];

const stats = [
  { num: "10,000+", label: "Happy Pets" },
  { num: "500+", label: "Verified Vets" },
  { num: "64", label: "Districts" },
  { num: "4.9★", label: "Average Rating" },
];

const steps = [
  { n: "01", title: "Create Profile", desc: "Register your pet or service in minutes." },
  { n: "02", title: "Connect", desc: "Find vets, groomers, and adopters near you." },
  { n: "03", title: "Bond", desc: "Build lasting relationships with your pet community." },
];

const testimonials = [
  {
    text: "Pet Bond BD saved my cat Luna's life. The vet diagnosed her perfectly and medicines arrived the same day.",
    name: "Fatima Khanom",
    loc: "Gulshan, Dhaka",
    avatar: "https://i.pravatar.cc/120?img=47",
  },
  {
    text: "Booked grooming for my Golden Retriever right from home. Professional, on time, and Max came back happy.",
    name: "Rahim Uddin",
    loc: "Dhanmondi, Dhaka",
    avatar: "https://i.pravatar.cc/120?img=12",
  },
  {
    text: "Adopted my first puppy through Pet Bond BD. The process was thoughtful and the support afterwards was incredible.",
    name: "Sarah Ahmed",
    loc: "Chittagong",
    avatar: "https://i.pravatar.cc/120?img=32",
  },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--cream)] pb-20 lg:pb-0">
      <Header />
      <main>
        <Hero />
        <Services />
        <Stats />
        <HowItWorks />
        <Testimonials />
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
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO_IMG}
          alt="Golden retriever — Pet Bond BD"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
      </div>

      <div className="mx-auto flex max-w-[1200px] flex-col justify-center px-5 py-24 sm:px-8 sm:py-32 lg:min-h-[640px] lg:py-40">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-white backdrop-blur">
          Bangladesh's #1 Pet Care Platform
        </span>
        <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.1] text-white sm:text-6xl lg:text-7xl">
          Where Every Pet<br />Finds Their Bond.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
          Connect with trusted vets, groomers, and pet lovers across Bangladesh.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            to="/shop"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[var(--gold)] px-7 text-[15px] font-semibold text-[var(--ink)] transition hover:bg-[var(--gold-dark)]"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/services"
            className="inline-flex h-12 items-center justify-center rounded-md border-2 border-white/80 bg-transparent px-7 text-[15px] font-semibold text-white transition hover:bg-white/10"
          >
            Explore Services
          </Link>
        </div>

        <div className="mt-14 grid max-w-2xl grid-cols-1 gap-6 border-t border-white/15 pt-8 text-white sm:grid-cols-3">
          <TrustItem Icon={ShieldCheck} label="500+ Verified Vets" />
          <TrustItem Icon={Users} label="10,000+ Happy Pets" />
          <TrustItem Icon={MessageCircle} label="24/7 Support" />
        </div>
      </div>
    </section>
  );
}

function TrustItem({ Icon, label }: { Icon: typeof ShieldCheck; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5 text-[var(--gold)]" />
      <span className="text-sm font-medium text-white/90">{label}</span>
    </div>
  );
}

/* ---------------- SERVICES ---------------- */
function Services() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--gold)]">
          What we offer
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-[var(--ink)] sm:text-5xl">
          Comprehensive care for every pet
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[var(--gray-cool)] sm:text-lg">
          From routine checkups to lifelong companionship, every service is delivered by people who treat pets like family.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Link
            key={s.title}
            to={s.to}
            className="group flex flex-col rounded-xl bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
          >
            <div className="grid h-14 w-14 place-items-center rounded-full bg-[var(--forest-soft)] text-[var(--forest)]">
              <s.Icon className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-[var(--ink)]">
              {s.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--gray-cool)]">
              {s.desc}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--gold)] transition-all group-hover:gap-2.5">
              Learn More <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ---------------- STATS ---------------- */
function Stats() {
  return (
    <section className="bg-[var(--forest)] text-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center sm:text-left">
            <div className="font-display text-5xl font-bold leading-none text-white sm:text-6xl">
              {s.num}
            </div>
            <p className="mt-3 text-sm font-medium uppercase tracking-[0.12em] text-white/70">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--gold)]">
          How it works
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold text-[var(--ink)] sm:text-5xl">
          Three steps to a stronger bond
        </h2>
      </div>

      <div className="relative mt-16 grid gap-12 lg:grid-cols-3 lg:gap-8">
        <div
          aria-hidden
          className="absolute left-[16%] right-[16%] top-7 hidden border-t-2 border-dashed border-[var(--gold)]/40 lg:block"
        />
        {steps.map((s) => (
          <div key={s.n} className="relative flex flex-col items-center text-center">
            <div className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-[var(--gold)] font-display text-lg font-bold text-[var(--ink)]">
              {s.n}
            </div>
            <h3 className="mt-6 font-display text-2xl font-semibold text-[var(--ink)]">
              {s.title}
            </h3>
            <p className="mt-3 max-w-xs text-base leading-relaxed text-[var(--gray-cool)]">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  return (
    <section className="bg-[var(--cream)]">
      <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--gold)]">
            Voices from our community
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-[var(--ink)] sm:text-5xl">
            Loved by pet parents across Bangladesh
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-xl bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            >
              <div className="flex gap-1 text-[var(--gold)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-display text-lg italic leading-relaxed text-[var(--ink)]">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-12 w-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <div className="font-semibold text-[var(--ink)]">{t.name}</div>
                  <div className="text-sm text-[var(--gray-cool)]">{t.loc}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
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
      className="fixed bottom-24 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 lg:bottom-6"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

/* ---------------- MOBILE BOTTOM NAV ---------------- */
function MobileBottomNav() {
  const pathname = useRouterPath();
  const items = [
    { Icon: HomeIcon, label: "Home", to: "/" as const },
    { Icon: ShoppingBag, label: "Shop", to: "/shop" as const },
    { Icon: Calendar, label: "Book", to: "/services" as const },
    { Icon: User, label: "Profile", to: "/login" as const },
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/95 backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4">
        {items.map(({ Icon, label, to }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={label}
              to={to}
              className={`flex h-16 flex-col items-center justify-center gap-1 text-xs font-semibold ${
                active ? "text-[var(--forest)]" : "text-[var(--gray-cool)]"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function useRouterPath() {
  const [path, setPath] = useState("/");
  useEffect(() => {
    setPath(window.location.pathname);
  }, []);
  return path;
}
