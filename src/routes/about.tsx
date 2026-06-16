import { createFileRoute, Link } from "@tanstack/react-router";
import { Linkedin, MapPin, Stethoscope, PawPrint, Star, Heart, Building2 } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FadeUp, Counter } from "@/components/site/Motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Birds and Pet Animal Clinic" },
      {
        name: "description",
        content:
          "Bangladesh's first complete pet care platform — meet the team behind BPAC and our mission to give every pet the best care.",
      },
      { property: "og:title", content: "About — Birds and Pet Animal Clinic" },
      {
        property: "og:description",
        content: "Meet the people behind Bangladesh's first complete pet care platform.",
      },
    ],
  }),
  component: AboutPage,
});

const team = [
  {
    name: "Dr. Farhan Ahmed",
    role: "Chief Veterinary Officer",
    bio: "15+ years caring for pets across Dhaka and Chittagong.",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop",
  },
  {
    name: "Rashida Khanom",
    role: "Co-Founder & CEO",
    bio: "On a mission to make pet care accessible to every Bangladeshi family.",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop",
  },
  {
    name: "Tanvir Hassan",
    role: "Head of Technology",
    bio: "Builds the tech that connects pets, vets and owners across BD.",
    photo: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&auto=format&fit=crop",
  },
  {
    name: "Sadia Islam",
    role: "Head of Grooming Services",
    bio: "Certified groomer with a soft spot for street rescues.",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop",
  },
];

const facilities = [
  "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606425271399-abf3f5ce5374?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559190394-df5a28aab5c5?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&auto=format&fit=crop",
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-[color:var(--background)] text-[color:var(--charcoal)]">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[color:var(--teal)] via-[#5fd6ce] to-[#7ee0d8] py-20 text-white sm:py-28">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          <FadeUp>
            <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur">
              আমাদের গল্প
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
              Bangladesh's First Complete <br className="hidden sm:block" />
              Pet Care Platform
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/90 sm:text-lg">
              Started in 2024 in Dhaka, we are on a mission to give every pet in Bangladesh the
              best care possible.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeUp>
            <span className="text-sm font-semibold uppercase tracking-wider text-[color:var(--coral)]">
              Our Story
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
              Built by pet parents, for pet parents
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[color:var(--gray-soft)] sm:text-lg">
              We started Birds and Pet Animal Clinic after struggling to find good veterinary
              care for our own pets in Dhaka. We realized pet owners across Bangladesh faced the
              same problem — scattered services, no trusted platform, no easy booking system.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[color:var(--gray-soft)] sm:text-lg">
              So we built everything in one place.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&auto=format&fit=crop"
                alt="Veterinarian with a happy dog"
                className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)]"
              />
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white p-4 shadow-xl md:block">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--pink-soft)] text-[color:var(--coral)]">
                    <Heart className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-[color:var(--gray-soft)]">Since</p>
                    <p className="font-display text-lg font-extrabold">2024</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[color:var(--pink-soft)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Our Mission</h2>
              <p className="mt-3 text-[color:var(--gray-soft)]">
                Three promises we make to every pet parent in Bangladesh.
              </p>
            </div>
          </FadeUp>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: "🐾", text: "Make pet care accessible to every pet owner in Bangladesh" },
              { icon: "🏥", text: "Connect pets with qualified vets available 24/7" },
              { icon: "💚", text: "Build Bangladesh's largest pet health record system" },
            ].map((m, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="h-full rounded-3xl bg-white p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[color:var(--pink-soft)] text-3xl">
                    {m.icon}
                  </div>
                  <p className="mt-5 text-base font-semibold leading-relaxed">{m.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              The People Who Care
            </h2>
            <p className="mt-3 text-[color:var(--gray-soft)]">
              A small team of vets, technologists and pet lovers based in Dhaka.
            </p>
          </div>
        </FadeUp>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((p, i) => (
            <FadeUp key={p.name} delay={i * 0.08}>
              <div className="group rounded-3xl bg-white p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                <div className="mx-auto h-24 w-24 overflow-hidden rounded-full ring-4 ring-[color:var(--pink-soft)]">
                  <img src={p.photo} alt={p.name} className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-4 font-display text-lg font-extrabold">{p.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--coral)]">
                  {p.role}
                </p>
                <p className="mt-2 text-sm text-[color:var(--gray-soft)]">{p.bio}</p>
                <a
                  href="#"
                  aria-label={`${p.name} on LinkedIn`}
                  className="mt-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0a66c2]/10 text-[#0a66c2] transition hover:bg-[#0a66c2] hover:text-white"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-br from-[color:var(--coral)] to-[color:var(--coral-light)] py-16 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            { icon: MapPin, value: 3, suffix: "", label: "Cities" },
            { icon: Stethoscope, value: 50, suffix: "+", label: "Vets" },
            { icon: PawPrint, value: 10000, suffix: "+", label: "Pets" },
            { icon: Star, value: 4.9, suffix: "★", label: "Rating" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <s.icon className="mx-auto h-7 w-7 opacity-90" />
              <div className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">
                {s.value === 4.9 ? "4.9" : <Counter to={s.value} suffix={s.suffix} />}
                {s.value === 4.9 && <span>★</span>}
              </div>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide opacity-90">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="mx-auto max-w-2xl text-center">
            <Building2 className="mx-auto h-8 w-8 text-[color:var(--teal)]" />
            <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
              Our Facilities
            </h2>
            <p className="mt-3 text-[color:var(--gray-soft)]">
              A peek inside our clinic, lab and grooming center in Dhanmondi.
            </p>
          </div>
        </FadeUp>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((src, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={src}
                  alt={`Facility ${i + 1}`}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
            </FadeUp>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/contact"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[color:var(--coral)] px-8 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--coral-dark)]"
          >
            Schedule a Visit
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
