import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MapPin, Clock, Car, Globe, Calendar, Star, Stethoscope } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SERVICES, DOCTORS, formatBDT } from "@/lib/clinic-data";

export const Route = createFileRoute("/clinic/")({
  head: () => ({
    meta: [
      { title: "Veterinary Clinic — BPAC Vet | Book a vet in Dhaka" },
      { name: "description", content: "Book appointments with BPAC Vet's certified team — birds, dogs, cats and all pets. Emergency line +880 1700-111111." },
      { property: "og:title", content: "BPAC Vet Clinic — Expert Veterinary Care in Bangladesh" },
      { property: "og:description", content: "Bird, dog, cat & exotic pet care. Book online, video consultations, vaccinations and surgery." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1600&q=85" },
    ],
  }),
  component: ClinicHome,
});

const HERO_IMG = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1600&q=85";

function ClinicHome() {
  return (
    <div className="min-h-screen bg-[var(--surface,#F5F7F8)] pb-20 lg:pb-0">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src={HERO_IMG} alt="Veterinarian examining a pet" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.50)" }} />
        <div className="relative mx-auto max-w-[1200px] px-5 py-20 sm:px-6 sm:py-28">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--emergency)] px-4 py-2 text-sm font-semibold text-white shadow-lg">
            🚨 Emergency: <a href="tel:+8801700111111" className="underline-offset-2 hover:underline">+880 1700-111111</a>
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight text-white sm:text-6xl">
            Expert Veterinary Care in Bangladesh
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Book appointments with BPAC Vet's certified team — birds, dogs, cats & all pets.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/clinic/book" className="inline-flex h-12 items-center gap-2 rounded-lg bg-[var(--teal)] px-6 text-base font-semibold text-white shadow-lg transition hover:bg-[var(--teal-dark)]">
              <Calendar className="h-5 w-5" /> Book Appointment
            </Link>
            <Link to="/clinic/doctors" className="inline-flex h-12 items-center gap-2 rounded-lg bg-white px-6 text-base font-semibold text-[var(--teal)] shadow hover:bg-white/90">
              <Stethoscope className="h-5 w-5" /> Meet our Vets
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-[1200px] px-5 py-14 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-[var(--ink,#0F172A)]">Our Services</h2>
        <p className="mt-1 text-[var(--gray-cool,#64748B)]">Compassionate, modern veterinary care across every species.</p>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link key={s.id} to="/clinic/book" className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="grid h-14 w-14 place-items-center rounded-xl bg-[var(--teal-tint)] text-3xl">{s.icon}</div>
              <h3 className="mt-4 font-display text-xl font-bold text-[var(--ink,#0F172A)]">{s.name}</h3>
              <p className="mt-1 text-sm text-[var(--gray-cool,#64748B)]">{s.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[var(--teal)] font-bold">
                  {formatBDT(s.priceFrom)}{s.priceTo ? `–${s.priceTo.toLocaleString()}` : "+"}
                </span>
                <span className="text-sm font-semibold text-[var(--gold)] group-hover:text-[var(--gold-dark)]">Book →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Vets preview */}
      <section className="mx-auto max-w-[1200px] px-5 py-10 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-[var(--ink,#0F172A)]">Meet our Vets</h2>
            <p className="mt-1 text-[var(--gray-cool,#64748B)]">Board-certified, experienced and pet-friendly.</p>
          </div>
          <Link to="/clinic/doctors" className="hidden text-sm font-semibold text-[var(--teal)] hover:underline sm:inline">View all Vets →</Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DOCTORS.slice(0, 4).map((d) => (
            <Link key={d.id} to="/clinic/doctors/$id" params={{ id: d.id }} className="rounded-2xl bg-white p-5 text-center shadow-sm transition hover:shadow-lg">
              <img src={d.photo} alt={d.name} className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-[var(--teal-tint)]" />
              <h3 className="mt-3 font-display text-lg font-bold text-[var(--ink,#0F172A)]">{d.name}</h3>
              <p className="text-xs text-[var(--gray-cool,#64748B)]">{d.degrees}</p>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {d.specs.slice(0, 2).map((sp) => (
                  <span key={sp} className="rounded-full bg-[var(--teal-tint)] px-2.5 py-0.5 text-xs font-medium text-[var(--teal)]">{sp}</span>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-center gap-1 text-sm font-semibold text-[var(--ink,#0F172A)]">
                <Star className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" /> {d.rating} · {d.experience} yrs
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link to="/clinic/doctors" className="text-sm font-semibold text-[var(--teal)] hover:underline">View all Vets →</Link>
        </div>
      </section>

      {/* Clinic info */}
      <section className="mx-auto max-w-[1200px] px-5 py-14 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <iframe
              title="BPAC Vet location"
              src="https://www.google.com/maps?q=Dhaka%2C+Bangladesh&output=embed"
              className="h-72 w-full border-0"
              loading="lazy"
            />
          </div>
          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-[var(--ink,#0F172A)]">Visit our Clinic</h2>
            <ul className="mt-5 space-y-4 text-[var(--ink,#0F172A)]">
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 text-[var(--teal)]" /> Dhaka, Bangladesh</li>
              <li className="flex items-start gap-3"><Clock className="mt-0.5 h-5 w-5 text-[var(--teal)]" /> Sat–Thu: 9 AM – 8 PM &nbsp;|&nbsp; Fri: 2 PM – 8 PM</li>
              <li className="flex items-start gap-3"><Car className="mt-0.5 h-5 w-5 text-[var(--teal)]" /> Parking available on-site</li>
              <li className="flex items-start gap-3"><Globe className="mt-0.5 h-5 w-5 text-[var(--teal)]" /> www.bpacvet.com</li>
              <li className="flex items-start gap-3"><Phone className="mt-0.5 h-5 w-5 text-[var(--emergency)]" /> Emergency: +880 1700-111111</li>
            </ul>
            <Link to="/clinic/book" className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-[var(--teal)] px-5 text-sm font-semibold text-white hover:bg-[var(--teal-dark)]">
              <Calendar className="h-4 w-4" /> Book an appointment
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
