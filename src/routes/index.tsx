import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
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
  Bird,
  PawPrint,
  CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Birds and Pet Animal Clinic — BPAC Vet | Dhaka, Bangladesh" },
      {
        name: "description",
        content:
          "Expert veterinary care for birds and all pet animals in Bangladesh. Our primary goal is to serve your animals. Visit BPAC Vet.",
      },
      { property: "og:title", content: "BPAC Vet — Birds and Pet Animal Clinic" },
      {
        property: "og:description",
        content: "Expert veterinary care for birds, exotic pets, dogs and cats in Bangladesh.",
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

const services = [
  { Icon: Stethoscope, title: "Bird & Exotic Pet Care", desc: "Specialized treatment for birds, reptiles, and exotic animals." },
  { Icon: Heart, title: "Dog & Cat Consultation", desc: "Complete health checkups, vaccinations and diagnosis." },
  { Icon: Scissors, title: "Surgical Procedures", desc: "Safe, skilled surgeries for all pet types." },
  { Icon: AlertCircle, title: "Emergency Treatment", desc: "24/7 emergency care when your pet needs it most." },
  { Icon: Shield, title: "Vaccinations & Deworming", desc: "Full vaccination schedules to keep your pet protected." },
  { Icon: Leaf, title: "Pet Nutrition Advice", desc: "Expert dietary guidance for healthy, happy animals." },
];

const stats = [
  { num: "10+ Years", label: "Experience" },
  { num: "5,000+", label: "Animals Treated" },
  { num: "Birds & All Pets", label: "Comprehensive Care" },
  { num: "Experienced", label: "Vet Team" },
];

const steps = [
  { n: "01", title: "Call or Walk In", desc: "Contact us or visit our clinic at your convenience." },
  { n: "02", title: "Vet Consultation", desc: "Our vet examines your pet fully and discusses care." },
  { n: "03", title: "Treatment & Follow-up", desc: "Receive expert care and recovery guidance." },
];

const testimonials = [
  {
    text: "Dr. saheb treated my parrot with such care and expertise. My bird recovered fully. Highly recommended!",
    name: "Kamal Hossain",
    role: "Parrot Owner",
    avatar: "https://i.pravatar.cc/80?img=47",
  },
  {
    text: "Best vet clinic I've visited in Dhaka. Professional staff, thorough examination, and fair pricing.",
    name: "Nusrat Jahan",
    role: "Cat Owner",
    avatar: "https://i.pravatar.cc/80?img=33",
  },
  {
    text: "They handled my dog's surgery perfectly. The follow-up care was excellent. BPAC Vet is our family vet forever.",
    name: "Arif Rahman",
    role: "Dog Owner",
    avatar: "https://i.pravatar.cc/80?img=60",
  },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-clinic)]">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <TrustStrip />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* HERO */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={HERO_IMG} alt="Veterinarian caring for a pet" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/[0.52]" />
      </div>

      <div className="mx-auto flex max-w-[1180px] flex-col px-6 py-24 sm:py-28 lg:min-h-[640px] lg:py-32">
        <span className="inline-flex w-fit items-center rounded-sm border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
          Trusted Veterinary Care in Bangladesh
        </span>
        <h1 className="mt-6 max-w-3xl font-display text-[44px] font-extrabold leading-[1.08] text-white sm:text-[56px] lg:text-[68px]">
          Expert Care for<br />Birds &amp; Pet Animals.
        </h1>
        <p className="mt-5 max-w-xl text-lg italic leading-relaxed text-white/90">
          Our primary goal is to serve your animals.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[var(--teal)] px-7 text-[15px] font-semibold text-white transition hover:bg-[var(--teal-dark)]"
          >
            Book an Appointment <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/services"
            className="inline-flex h-12 items-center justify-center rounded-md border-2 border-white bg-transparent px-7 text-[15px] font-semibold text-white transition hover:bg-white/10"
          >
            Our Services
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/55 backdrop-blur">
        <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-4 px-6 py-5 text-sm text-white/95 sm:grid-cols-4">
          <TrustItem Icon={Bird} label="Birds Specialist" />
          <TrustItem Icon={PawPrint} label="All Pet Animals" />
          <TrustItem Icon={Phone} label="Emergency Care" />
          <TrustItem Icon={CheckCircle2} label="Experienced Vets" />
        </div>
      </div>
    </section>
  );
}

function TrustItem({ Icon, label }: { Icon: typeof Bird; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="h-5 w-5 text-[var(--gold)]" />
      <span className="font-medium">{label}</span>
    </div>
  );
}

/* SERVICES */
function Services() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--teal)]">What we offer</p>
        <h2 className="mt-3 font-display text-[34px] font-bold leading-tight text-[var(--ink)] sm:text-[40px]">
          Our Veterinary Services
        </h2>
        <p className="mt-3 text-base text-[var(--gray-cool)]">
          Specialized care for birds and all pet animals.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.title}
            className="group flex flex-col rounded-[10px] border border-transparent bg-white p-7 shadow-[0_4px_18px_rgba(0,0,0,0.07)] transition-all duration-[250ms] hover:-translate-y-[5px] hover:border-[var(--teal)]"
          >
            <div className="grid h-14 w-14 place-items-center rounded-full bg-[var(--teal-tint)] text-[var(--teal)]">
              <s.Icon className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <h3 className="mt-5 text-[17px] font-semibold text-[var(--ink)]">{s.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--gray-cool)]">{s.desc}</p>
            <Link
              to="/services"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--teal)] transition-all group-hover:gap-2.5"
            >
              Learn More <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ABOUT */
function About() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-6 py-24 lg:grid-cols-2">
        <div>
          <img
            src={ABOUT_IMG}
            alt="Caring veterinarian with a small pet"
            className="aspect-[5/4] w-full rounded-[12px] object-cover shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
          />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--teal)]">About Us</p>
          <h2 className="mt-3 font-display text-[34px] font-bold leading-tight text-[var(--ink)] sm:text-[40px]">
            Dedicated to the Health of Every Animal
          </h2>
          <p className="mt-5 text-base leading-[1.75] text-[var(--gray-cool)]">
            Birds and Pet Animal Clinic (BPAC Vet) provides expert veterinary care for birds, exotic pets, dogs, cats, and all companion animals in Bangladesh. Our experienced veterinary team combines clinical excellence with genuine compassion — because your animal deserves the very best.
          </p>
          <blockquote className="mt-6 border-l-4 border-[var(--gold)] bg-[var(--teal-tint)] px-5 py-4 font-display italic text-[var(--ink)]">
            "Our primary goal is to serve your animals."
          </blockquote>
          <Link
            to="/about"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--teal)] hover:gap-2.5"
          >
            Meet Our Team <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* TRUST STRIP */
function TrustStrip() {
  return (
    <section className="bg-[var(--teal)] text-white">
      <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-10 px-6 py-16 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-[26px] font-bold leading-tight text-white sm:text-[30px]">{s.num}</div>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.12em] text-white/75">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* PROCESS */
function Process() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--teal)]">How it works</p>
        <h2 className="mt-3 font-display text-[34px] font-bold leading-tight text-[var(--ink)] sm:text-[40px]">
          Getting Care Is Easy
        </h2>
      </div>

      <div className="relative mt-14 grid gap-12 lg:grid-cols-3 lg:gap-8">
        <div
          aria-hidden
          className="absolute left-[16%] right-[16%] top-7 hidden border-t-2 border-dashed lg:block"
          style={{ borderColor: "rgba(200,150,60,0.25)" }}
        />
        {steps.map((s) => (
          <div key={s.n} className="relative flex flex-col items-center text-center">
            <div className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-[var(--gold)] font-display text-lg font-bold text-white">
              {s.n}
            </div>
            <h3 className="mt-5 font-display text-[18px] font-bold text-[var(--ink)]">{s.title}</h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--gray-cool)]">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* TESTIMONIALS */
function Testimonials() {
  return (
    <section className="bg-[var(--bg-clinic)]">
      <div className="mx-auto max-w-[1180px] px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--teal)]">Reviews</p>
          <h2 className="mt-3 font-display text-[34px] font-bold leading-tight text-[var(--ink)] sm:text-[40px]">
            What Pet Owners Say
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-[10px] bg-white p-7 shadow-[0_4px_18px_rgba(0,0,0,0.07)]">
              <div className="flex gap-1 text-[var(--gold)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] italic leading-relaxed text-[var(--ink)]">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-11 w-11 rounded-full object-cover" loading="lazy" />
                <div>
                  <div className="text-sm font-semibold text-[var(--ink)]">{t.name}</div>
                  <div className="text-xs text-[var(--gray-cool)]">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* CONTACT */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1180px] gap-12 px-6 py-24 lg:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--teal)]">Get in touch</p>
          <h2 className="mt-3 font-display text-[34px] font-bold leading-tight text-[var(--ink)] sm:text-[40px]">
            Visit or Contact Us
          </h2>
          <p className="mt-4 font-semibold text-[var(--ink)]">Birds and Pet Animal Clinic (BPAC Vet)</p>
          <p className="text-sm italic text-[var(--gray-cool)]">"Our primary goal is to serve your animals."</p>

          <ul className="mt-7 space-y-4 text-[15px] text-[var(--ink)]">
            <li className="flex items-start gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0 text-[var(--teal)]" /> Dhaka, Bangladesh</li>
            <li className="flex items-start gap-3"><Globe className="mt-1 h-5 w-5 shrink-0 text-[var(--teal)]" /> <a href="https://www.bpacvet.com" className="hover:text-[var(--teal)]">www.bpacvet.com</a></li>
            <li className="flex items-start gap-3"><Phone className="mt-1 h-5 w-5 shrink-0 text-[var(--teal)]" /> <a href="tel:+8801700000000" className="hover:text-[var(--teal)]">+880 1XXX-XXXXXX</a></li>
            <li className="flex items-start gap-3"><Clock className="mt-1 h-5 w-5 shrink-0 text-[var(--teal)]" /> Sat–Thu: 9 AM – 8 PM <span className="ml-1 text-[var(--gray-cool)]">| Emergency: 24/7</span></li>
          </ul>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="space-y-4 rounded-[10px] border border-black/[0.06] bg-[var(--bg-clinic)] p-7"
        >
          <Field label="Name">
            <input required type="text" className="w-full rounded-md border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--teal)]" />
          </Field>
          <Field label="Phone Number">
            <input required type="tel" placeholder="+880 1XXX-XXXXXX" className="w-full rounded-md border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--teal)]" />
          </Field>
          <Field label="Pet Type">
            <select className="w-full rounded-md border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--teal)]">
              <option>Bird</option><option>Dog</option><option>Cat</option><option>Other</option>
            </select>
          </Field>
          <Field label="Message">
            <textarea required rows={4} className="w-full rounded-md border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--teal)]" />
          </Field>
          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[var(--teal)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--teal-dark)] sm:w-auto"
          >
            {sent ? "Message Sent ✓" : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-[var(--ink)]">{label}</span>
      {children}
    </label>
  );
}
