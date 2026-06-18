import { createFileRoute } from "@tanstack/react-router";
import { Download, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PETS, VACCINATIONS } from "@/lib/clinic-data";

export const Route = createFileRoute("/clinic/vaccinations")({
  head: () => ({ meta: [{ title: "Vaccination Records — BPAC Vet" }] }),
  component: VaccinationsPage,
});

function VaccinationsPage() {
  return (
    <div className="min-h-screen bg-[var(--surface,#F5F7F8)] pb-20 lg:pb-0">
      <Header />
      <div className="mx-auto max-w-4xl px-5 py-10 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-[var(--ink,#0F172A)] sm:text-4xl">Vaccination Records</h1>
        <p className="mt-2 text-[var(--gray-cool,#64748B)]">Track your pets' vaccines and get reminders for upcoming doses.</p>

        <div className="mt-8 space-y-6">
          {PETS.map((p) => {
            const vacs = VACCINATIONS[p.id] ?? [];
            return (
              <div key={p.id} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={p.photo} alt={p.name} className="h-14 w-14 rounded-full object-cover" />
                    <div>
                      <h2 className="font-display text-xl font-bold text-[var(--ink,#0F172A)]">{p.name}</h2>
                      <div className="text-sm text-[var(--gray-cool,#64748B)]">{p.species} · {p.breed} · {p.age}</div>
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-lg border border-[var(--teal)] px-4 py-2 text-sm font-semibold text-[var(--teal)] hover:bg-[var(--teal-tint)]">
                    <Download className="h-4 w-4" /> Certificate
                  </button>
                </div>

                <ol className="mt-5 space-y-3 border-l-2 border-[var(--teal-tint)] pl-5">
                  {vacs.map((v, i) => (
                    <li key={i} className="relative">
                      <span className="absolute -left-[27px] top-1 grid h-4 w-4 place-items-center rounded-full bg-[var(--teal)] ring-4 ring-white">
                        <CheckCircle2 className="h-3 w-3 text-white" />
                      </span>
                      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-black/5 bg-[var(--surface,#F5F7F8)] p-3">
                        <div>
                          <div className="font-semibold text-[var(--ink,#0F172A)]">{v.name}</div>
                          <div className="text-xs text-[var(--gray-cool,#64748B)]">Given: {v.given} · Next due: {v.nextDue}</div>
                        </div>
                        {v.soon && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                            <AlertTriangle className="h-3 w-3" /> Due soon
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
