import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, ShoppingBag, Stethoscope, FlaskConical, Scissors, BookOpen } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FadeUp } from "@/components/site/Motion";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — BPAC Vet" },
      {
        name: "description",
        content:
          "Explore BPAC Vet's five services for Bangladesh pet parents: clinic, shop, lab, grooming and the BPAC blog.",
      },
      { property: "og:title", content: "BPAC Vet Services" },
      {
        property: "og:description",
        content: "Clinic, shop, lab, grooming and expert care guides — all in one platform.",
      },
    ],
  }),
  component: ServicesPage,
});

type Module = {
  id: string;
  name: string;
  tagline: string;
  Icon: React.ComponentType<{ className?: string }>;
  offerings: string[];
  pricing: string;
  ctaLabel: string;
  ctaTo: "/shop" | "/contact" | "/blog";
  faq: { q: string; a: string }[];
};

const modules: Module[] = [
  {
    id: "clinic",
    name: "Veterinary Clinic",
    tagline: "Expert care for birds, dogs, cats and exotic pets.",
    Icon: Stethoscope,
    offerings: [
      "General consultations & wellness checks",
      "Vaccinations (DHPP, anti-rabies, FVRCP)",
      "Surgery & post-op care",
      "24/7 emergency line",
    ],
    pricing: "Consultations from ৳800 · Vaccinations from ৳1,200",
    ctaLabel: "Book Now",
    ctaTo: "/contact",
    faq: [
      { q: "Do you treat birds and exotic pets?", a: "Yes — BPAC Vet's specialty is birds and exotic animals alongside dogs and cats." },
      { q: "Is there an emergency line?", a: "We operate a 24/7 emergency line on +880 1700-000000." },
      { q: "Do you do home visits?", a: "Yes, home visits within Dhaka are available with prior booking." },
    ],
  },
  {
    id: "shop",
    name: "Pet Shop",
    tagline: "Quality food, accessories and supplements delivered across Bangladesh.",
    Icon: ShoppingBag,
    offerings: [
      "Premium bird, dog and cat food",
      "Cages, beds, leashes and toys",
      "Vet-recommended supplements",
      "Free delivery on orders above ৳999",
    ],
    pricing: "Starting from ৳150 · Cash on Delivery available",
    ctaLabel: "Shop Now",
    ctaTo: "/shop",
    faq: [
      { q: "Which areas do you deliver to?", a: "All of Dhaka next-day, and 1–3 days nationwide across Bangladesh." },
      { q: "Do you accept bKash and Nagad?", a: "Yes — bKash, Nagad, Rocket, Card and Cash on Delivery." },
      { q: "Are the products genuine?", a: "Every product is sourced directly from authorised distributors in Bangladesh." },
    ],
  },
  {
    id: "lab",
    name: "Pet Laboratory",
    tagline: "Diagnostic tests with vet-reviewed reports.",
    Icon: FlaskConical,
    offerings: [
      "Blood work (CBC, biochemistry)",
      "Stool & urine analysis",
      "X-ray and ultrasound",
      "Sample collection at home in Dhaka",
    ],
    pricing: "Tests from ৳600 · Home collection ৳300",
    ctaLabel: "Book Now",
    ctaTo: "/contact",
    faq: [
      { q: "How fast do I get the report?", a: "Most reports are ready within 24 hours and delivered via WhatsApp." },
      { q: "Is home sample collection available?", a: "Yes, anywhere in Dhaka with prior booking." },
      { q: "Will a vet explain the report?", a: "Yes — every report includes a free 10-minute consultation." },
    ],
  },
  {
    id: "grooming",
    name: "Grooming Services",
    tagline: "Professional grooming by trained pet stylists.",
    Icon: Scissors,
    offerings: [
      "Bath, brush and blow-dry",
      "Nail trim and ear cleaning",
      "Breed-specific haircuts",
      "Bird wing & beak trimming",
    ],
    pricing: "Packages from ৳1,500 · Membership 20% off",
    ctaLabel: "Book Now",
    ctaTo: "/contact",
    faq: [
      { q: "Do you groom birds?", a: "Yes — our groomers are trained for safe wing, nail and beak care." },
      { q: "How long does a session take?", a: "Most sessions take 45–90 minutes depending on the pet." },
      { q: "Can I stay during grooming?", a: "Absolutely — we welcome owners to wait in our lounge." },
    ],
  },
  {
    id: "blog",
    name: "BPAC Vet Blog",
    tagline: "Vet-written care guides for Bangladesh pet parents.",
    Icon: BookOpen,
    offerings: [
      "Bird care guides (Cockatiel, Budgie, African Grey)",
      "Vaccination & nutrition schedules",
      "Emergency warning signs",
      "Bangla and English content",
    ],
    pricing: "Free — read anytime",
    ctaLabel: "Read Articles",
    ctaTo: "/blog",
    faq: [
      { q: "Who writes the articles?", a: "Articles are written and reviewed by BPAC Vet's in-house veterinary team." },
      { q: "Can I request a topic?", a: "Yes — email info@bpacvet.com with the topic you'd like covered." },
      { q: "Is the content in Bangla?", a: "Several articles are published in Bangla, with more added every month." },
    ],
  },
];

function ServicesPage() {
  return (
    <div className="min-h-screen bg-[color:var(--bg-clinic)] text-[color:var(--charcoal)]">
      <Header />

      <section className="bg-gradient-to-br from-[color:var(--teal)] to-[color:var(--teal-dark)] py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <FadeUp>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[color:var(--gold)]">Our Services</p>
            <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
              Five services. One trusted platform.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-white/85">
              From the clinic floor to your doorstep — BPAC Vet covers everything your pet needs in Bangladesh.
            </p>
          </FadeUp>
        </div>
      </section>

      <main className="mx-auto max-w-5xl space-y-16 px-4 py-20 sm:px-6">
        {modules.map((m, i) => (
          <FadeUp key={m.id} delay={i * 0.04}>
            <ModuleCard m={m} />
          </FadeUp>
        ))}
      </main>

      <Footer />
    </div>
  );
}

function ModuleCard({ m }: { m: Module }) {
  return (
    <section
      id={m.id}
      className="overflow-hidden rounded-3xl bg-white shadow-[0_10px_40px_rgba(11,110,110,0.08)]"
    >
      <div className="grid gap-8 p-8 md:grid-cols-[auto,1fr] md:gap-10 md:p-12">
        <div className="grid h-20 w-20 place-items-center rounded-2xl bg-[color:var(--teal-tint)] text-[color:var(--teal)]">
          <m.Icon className="h-10 w-10" />
        </div>
        <div>
          <h2 className="font-display text-3xl font-extrabold">{m.name}</h2>
          <p className="mt-2 text-[color:var(--gray-soft)]">{m.tagline}</p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {m.offerings.map((o) => (
              <li key={o} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 text-[color:var(--gold)]">✓</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl bg-[color:var(--bg-clinic)] p-4 text-sm font-semibold text-[color:var(--teal-dark)]">
            {m.pricing}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={m.ctaTo}
              className="inline-flex h-12 items-center justify-center rounded-full bg-[color:var(--teal)] px-7 text-sm font-bold text-white shadow transition hover:bg-[color:var(--teal-dark)]"
            >
              {m.ctaLabel}
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[color:var(--teal)] px-7 text-sm font-bold text-[color:var(--teal)] transition hover:bg-[color:var(--teal-tint)]"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-[color:var(--bg-clinic)] bg-[color:var(--bg-clinic)]/40 p-8 md:p-12">
        <h3 className="font-display text-xl font-extrabold">Frequently Asked Questions</h3>
        <div className="mt-4 divide-y divide-black/5 rounded-2xl bg-white">
          {m.faq.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className="flex w-full flex-col items-stretch px-5 py-4 text-left transition hover:bg-[color:var(--teal-tint)]/40"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-semibold">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[color:var(--teal)] transition ${open ? "rotate-180" : ""}`}
        />
      </div>
      {open && <p className="mt-3 text-sm text-[color:var(--gray-soft)]">{a}</p>}
    </button>
  );
}
