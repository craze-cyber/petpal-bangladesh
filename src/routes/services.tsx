import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag, Stethoscope, FlaskConical, Scissors, BookOpen, Check } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FadeUp } from "@/components/site/Motion";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Birds and Pet Animal Clinic" },
      {
        name: "description",
        content:
          "Pet shop, vet clinic, lab tests, grooming and pet education — all five BPAC services in one place.",
      },
      { property: "og:title", content: "Services — BPAC" },
      {
        property: "og:description",
        content: "Shop, Clinic, Lab, Grooming and Blog services for pets across Bangladesh.",
      },
    ],
  }),
  component: ServicesPage,
});

type Module = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  bnName: string;
  tint: string;
  features: string[];
  pricing: string;
  cta: { label: string; to: "/" | "/contact" };
  faqs: { q: string; a: string }[];
};

const modules: Module[] = [
  {
    id: "shop",
    icon: ShoppingBag,
    name: "Pet Shop",
    bnName: "পেট শপ",
    tint: "var(--coral)",
    features: [
      "Premium food brands — Royal Canin, Pedigree, Whiskas",
      "Toys, beds, carriers and accessories",
      "Vet-prescribed supplements and medicine",
      "Same-day delivery in Dhaka, 2-day to Chittagong & Sylhet",
    ],
    pricing: "From ৳150 • Free delivery over ৳1,500",
    cta: { label: "Shop Now", to: "/" },
    faqs: [
      { q: "Do you offer Cash on Delivery?", a: "Yes — COD is available everywhere in Bangladesh, along with bKash, Nagad, Rocket and card payments." },
      { q: "Are your products authentic?", a: "All food and medicine are sourced directly from authorized importers with batch verification." },
      { q: "How fast is delivery in Dhaka?", a: "Orders placed before 4 PM are delivered the same day inside Dhaka city." },
    ],
  },
  {
    id: "clinic",
    icon: Stethoscope,
    name: "Vet Clinic",
    bnName: "ভেট ক্লিনিক",
    tint: "var(--teal)",
    features: [
      "In-clinic and home visit consultations",
      "Vaccinations, deworming and surgery",
      "24/7 emergency hotline",
      "Digital health records for every pet",
    ],
    pricing: "Consultation from ৳500 • Home visit from ৳1,200",
    cta: { label: "Book Now", to: "/contact" },
    faqs: [
      { q: "Can I book a home visit?", a: "Yes — home visits are available across Dhaka. Sylhet and Chittagong launching soon." },
      { q: "Do you treat birds and exotic pets?", a: "Absolutely. Our team specializes in birds, rabbits, hamsters and reptiles in addition to cats and dogs." },
      { q: "What if it's an emergency at night?", a: "Call our 24/7 emergency line at +880 1700-000000 — a vet will respond within minutes." },
    ],
  },
  {
    id: "lab",
    icon: FlaskConical,
    name: "Diagnostic Lab",
    bnName: "ল্যাব",
    tint: "#9b7bd4",
    features: [
      "Blood tests, urinalysis and microbiology",
      "X-ray, ultrasound and ECG",
      "Sample pickup from home",
      "Reports delivered digitally in 24 hours",
    ],
    pricing: "Tests from ৳400 • Home sample pickup ৳200",
    cta: { label: "Book Now", to: "/contact" },
    faqs: [
      { q: "Do I need a vet prescription?", a: "Not for basic tests. For specialized panels we'll route you to a vet first to make sure we run the right tests." },
      { q: "Can I get reports on WhatsApp?", a: "Yes — all reports are delivered via WhatsApp and email within 24 hours." },
      { q: "Is sample pickup safe for my pet?", a: "Our trained technicians come to your home and collect samples with minimal stress for your pet." },
    ],
  },
  {
    id: "grooming",
    icon: Scissors,
    name: "Grooming",
    bnName: "গ্রুমিং",
    tint: "var(--yellow)",
    features: [
      "Bath, blow-dry and styling",
      "Nail trim, ear cleaning, teeth brushing",
      "Breed-specific haircuts",
      "Mobile grooming van for home service",
    ],
    pricing: "Basic from ৳800 • Full grooming from ৳1,800",
    cta: { label: "Book Now", to: "/contact" },
    faqs: [
      { q: "How long does a grooming session take?", a: "Basic grooming takes 45–60 minutes; full grooming with styling can take up to 2 hours." },
      { q: "Do you handle aggressive or anxious pets?", a: "Yes — our groomers are trained in low-stress handling and we can sedate when medically advised." },
      { q: "Is mobile grooming more expensive?", a: "Home service adds ৳500 to the standard package — well worth it for an anxious pet." },
    ],
  },
  {
    id: "blog",
    icon: BookOpen,
    name: "Pet Education",
    bnName: "শিক্ষা",
    tint: "var(--coral-light)",
    features: [
      "Care guides written by Bangladeshi vets",
      "Bilingual content — English and বাংলা",
      "Breed guides for popular BD pets",
      "Free weekly newsletter",
    ],
    pricing: "Always free",
    cta: { label: "Read Blog", to: "/" },
    faqs: [
      { q: "Who writes the articles?", a: "All content is written or reviewed by licensed veterinarians on the BPAC team." },
      { q: "Can I request a topic?", a: "Yes — email hello@bpacvet.com and we'll cover it in an upcoming post." },
      { q: "Is the content in Bangla?", a: "Most articles are bilingual — toggle at the top of each post to switch between English and বাংলা." },
    ],
  },
];

function ServicesPage() {
  return (
    <div className="min-h-screen bg-[color:var(--background)] text-[color:var(--charcoal)]">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[color:var(--pink-soft)] via-white to-[#f0fbfa] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <FadeUp>
            <span className="inline-block rounded-full bg-[color:var(--coral)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--coral)]">
              Our Services
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              Everything your pet needs, <br className="hidden sm:block" />
              under one roof
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[color:var(--gray-soft)] sm:text-lg">
              Five connected services so you never have to juggle vendors for your pet's care.
            </p>
          </FadeUp>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {modules.map((m) => (
              <a
                key={m.id}
                href={`#${m.id}`}
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow"
              >
                <m.icon className="mr-1.5 inline h-4 w-4" style={{ color: m.tint }} />
                {m.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <div className="mx-auto max-w-7xl space-y-24 px-4 py-20 sm:px-6 lg:px-8">
        {modules.map((m, idx) => (
          <section key={m.id} id={m.id} className="scroll-mt-24">
            <FadeUp>
              <div className="grid items-start gap-10 lg:grid-cols-[1fr,1.3fr] lg:gap-16">
                <div>
                  <div
                    className="grid h-20 w-20 place-items-center rounded-3xl text-white shadow-lg"
                    style={{ backgroundColor: m.tint }}
                  >
                    <m.icon className="h-10 w-10" />
                  </div>
                  <h2 className="mt-5 font-display text-3xl font-extrabold sm:text-4xl">
                    {m.name}
                  </h2>
                  <p className="font-bn text-base text-[color:var(--gray-soft)]">{m.bnName}</p>

                  <ul className="mt-6 space-y-3">
                    {m.features.map((f) => (
                      <li key={f} className="flex gap-3 text-sm">
                        <span
                          className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-white"
                          style={{ backgroundColor: m.tint }}
                        >
                          <Check className="h-3 w-3" />
                        </span>
                        <span className="text-[color:var(--charcoal)]">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-2xl bg-[color:var(--pink-soft)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--gray-soft)]">
                      Pricing
                    </p>
                    <p className="mt-1 font-display text-lg font-extrabold">{m.pricing}</p>
                  </div>

                  <Link
                    to={m.cta.to}
                    className="mt-6 inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                    style={{ backgroundColor: m.tint }}
                  >
                    {m.cta.label}
                  </Link>
                </div>

                <div>
                  <h3 className="font-display text-xl font-extrabold">
                    Frequently asked questions
                  </h3>
                  <div className="mt-3 rounded-3xl bg-white p-2 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                    <Accordion type="single" collapsible className="w-full">
                      {m.faqs.map((f, i) => (
                        <AccordionItem
                          key={i}
                          value={`${m.id}-${i}`}
                          className="border-b border-[color:var(--pink-soft)] px-4 last:border-b-0"
                        >
                          <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline">
                            {f.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-sm text-[color:var(--gray-soft)]">
                            {f.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </div>
            </FadeUp>
            {idx < modules.length - 1 && (
              <div className="mx-auto mt-20 h-px max-w-2xl bg-gradient-to-r from-transparent via-[color:var(--border)] to-transparent" />
            )}
          </section>
        ))}
      </div>

      <Footer />
    </div>
  );
}
