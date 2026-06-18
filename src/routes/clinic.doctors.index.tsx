import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Calendar } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { DOCTORS, SPEC_FILTERS, formatBDT } from "@/lib/clinic-data";

export const Route = createFileRoute("/clinic/doctors/")({
  head: () => ({
    meta: [
      { title: "Our Veterinarians — BPAC Vet" },
      { name: "description", content: "Meet BPAC Vet's certified veterinarians specialising in birds, dogs, cats, exotics, surgery and dental care." },
    ],
  }),
  component: DoctorsPage,
});

function DoctorsPage() {
  const [filter, setFilter] = useState<string>("All");
  const list = filter === "All" ? DOCTORS : DOCTORS.filter((d) => d.specs.includes(filter));

  return (
    <div className="min-h-screen bg-[var(--surface,#F5F7F8)] pb-20 lg:pb-0">
      <Header />
      <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-[var(--ink,#0F172A)] sm:text-4xl">Our Veterinarians</h1>
        <p className="mt-2 text-[var(--gray-cool,#64748B)]">Filter by specialization to find the right vet for your pet.</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {SPEC_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === s
                  ? "bg-[var(--teal)] text-white shadow"
                  : "bg-white text-[var(--ink,#0F172A)] hover:bg-[var(--teal-tint)] hover:text-[var(--teal)]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((d) => (
            <div key={d.id} className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-lg">
              <div className="flex items-start gap-4">
                <img src={d.photo} alt={d.name} className="h-20 w-20 shrink-0 rounded-full object-cover ring-4 ring-[var(--teal-tint)]" />
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-bold text-[var(--ink,#0F172A)]">{d.name}</h3>
                  <p className="text-xs text-[var(--gray-cool,#64748B)]">{d.degrees}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {d.specs.map((sp) => (
                      <span key={sp} className="rounded-full bg-[var(--teal-tint)] px-2.5 py-0.5 text-xs font-medium text-[var(--teal)]">{sp}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-[var(--gray-cool,#64748B)]">{d.langs.join(" | ")}</div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 text-[var(--ink,#0F172A)]">
                  <span className="inline-flex items-center gap-1 font-semibold"><Star className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" /> {d.rating}</span>
                  <span>{d.experience} yrs</span>
                </div>
                <span className="font-bold text-[var(--teal)]">{formatBDT(d.fee)}</span>
              </div>
              <div className={`mt-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${d.nextToday ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"}`}>
                <Calendar className="h-3.5 w-3.5" /> Next: {d.nextSlot}
              </div>
              <div className="mt-5 flex gap-2">
                <Link to="/clinic/doctors/$id" params={{ id: d.id }} className="flex-1 rounded-lg border border-[var(--teal)] py-2 text-center text-sm font-semibold text-[var(--teal)] hover:bg-[var(--teal-tint)]">
                  View Profile
                </Link>
                <Link to="/clinic/book" search={{ doctorId: d.id }} className="flex-1 rounded-lg bg-[var(--teal)] py-2 text-center text-sm font-semibold text-white hover:bg-[var(--teal-dark)]">
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
