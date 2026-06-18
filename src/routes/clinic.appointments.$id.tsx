import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Download, ShoppingBag, Calendar } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import logoAsset from "@/assets/bpac-logo-real.png.asset.json";
import { PRESCRIPTIONS, getDoctor, getPet, getAppointment } from "@/lib/clinic-data";

export const Route = createFileRoute("/clinic/appointments/$id")({
  head: ({ params }) => ({ meta: [{ title: `Prescription #${params.id} — BPAC Vet` }] }),
  component: RxView,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-[var(--surface,#F5F7F8)]">
      <p className="text-[var(--ink,#0F172A)]">Prescription not found.</p>
    </div>
  ),
});

function RxView() {
  const { id } = Route.useParams();
  const rx = PRESCRIPTIONS[id];
  if (!rx) throw notFound();
  const doctor = getDoctor(rx.doctorId);
  const pet = getPet(rx.petId);
  const appt = getAppointment(id);

  return (
    <div className="min-h-screen bg-[var(--surface,#F5F7F8)] pb-20 lg:pb-0">
      <Header />
      <div className="mx-auto max-w-3xl px-5 py-8 sm:px-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-10">
          {/* Letterhead */}
          <div className="flex items-center justify-between border-b-2 border-[var(--teal)] pb-5">
            <div className="flex items-center gap-3">
              <img src={logoAsset.url} alt="BPAC Vet" className="h-14 w-auto object-contain" style={{ mixBlendMode: "multiply" }} />
              <div>
                <div className="font-display text-lg font-extrabold text-[var(--teal)]">BPAC Vet</div>
                <div className="text-xs text-[var(--gray-cool,#64748B)]">Birds & Pet Animal Clinic, Dhaka</div>
              </div>
            </div>
            <div className="text-right text-xs text-[var(--gray-cool,#64748B)]">
              <div>Rx #{id}</div>
              <div>{rx.date}</div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-wider text-[var(--gray-cool,#64748B)]">Doctor</div>
              <div className="font-semibold text-[var(--ink,#0F172A)]">{doctor?.name}</div>
              <div className="text-xs text-[var(--gray-cool,#64748B)]">{doctor?.degrees} · Reg. {doctor?.regNumber}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-[var(--gray-cool,#64748B)]">Patient</div>
              <div className="font-semibold text-[var(--ink,#0F172A)]">{pet?.name} ({pet?.species})</div>
              <div className="text-xs text-[var(--gray-cool,#64748B)]">{pet?.breed} · {pet?.age}</div>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-[var(--teal-tint)] p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--teal)]">Diagnosis</div>
            <p className="mt-1 text-[var(--ink,#0F172A)]">{rx.diagnosis}</p>
          </div>

          <h2 className="mt-6 font-display text-lg font-bold text-[var(--ink,#0F172A)]">Medications</h2>
          <div className="mt-3 overflow-hidden rounded-lg border border-black/10">
            <table className="w-full text-sm">
              <thead className="bg-[var(--surface,#F5F7F8)] text-left text-xs uppercase tracking-wider text-[var(--gray-cool,#64748B)]">
                <tr>
                  <th className="px-3 py-2">Medicine</th>
                  <th className="px-3 py-2">Dosage</th>
                  <th className="px-3 py-2">Frequency</th>
                  <th className="px-3 py-2">Days</th>
                </tr>
              </thead>
              <tbody>
                {rx.meds.map((m, i) => (
                  <tr key={i} className="border-t border-black/5">
                    <td className="px-3 py-3 font-medium text-[var(--ink,#0F172A)]">{m.name}</td>
                    <td className="px-3 py-3 text-[var(--ink,#0F172A)]">{m.dosage}</td>
                    <td className="px-3 py-3 text-[var(--ink,#0F172A)]">{m.frequency}</td>
                    <td className="px-3 py-3 text-[var(--ink,#0F172A)]">{m.days}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mt-6 font-display text-lg font-bold text-[var(--ink,#0F172A)]">Instructions</h2>
          <p className="mt-2 leading-relaxed text-[var(--ink,#0F172A)]">{rx.notes}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-[var(--ink,#0F172A)] hover:bg-[var(--teal-tint)]">
              <Download className="h-4 w-4" /> Download PDF
            </button>
            <Link to="/shop" className="inline-flex items-center gap-2 rounded-lg bg-[var(--gold)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--gold-dark)]">
              <ShoppingBag className="h-4 w-4" /> Buy medicines from Shop →
            </Link>
            <Link to="/clinic/book" search={{ doctorId: rx.doctorId }} className="inline-flex items-center gap-2 rounded-lg bg-[var(--teal)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--teal-dark)]">
              <Calendar className="h-4 w-4" /> Book Follow-up
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
