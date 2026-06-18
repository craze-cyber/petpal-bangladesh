import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Video, Star, RefreshCw, X, FileText } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { APPOINTMENTS, getDoctor, getService, getPet, formatBDT, PRESCRIPTIONS } from "@/lib/clinic-data";

export const Route = createFileRoute("/clinic/appointments/")({
  head: () => ({ meta: [{ title: "My Appointments — BPAC Vet" }] }),
  component: AppointmentsPage,
});

type Tab = "upcoming" | "past" | "cancelled";

function AppointmentsPage() {
  const [tab, setTab] = useState<Tab>("upcoming");
  const list = APPOINTMENTS.filter((a) => a.status === tab);

  return (
    <div className="min-h-screen bg-[var(--surface,#F5F7F8)] pb-20 lg:pb-0">
      <Header />
      <div className="mx-auto max-w-4xl px-5 py-10 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-[var(--ink,#0F172A)] sm:text-4xl">My Appointments</h1>
        <div className="mt-6 flex gap-2 border-b border-black/10">
          {(["upcoming", "past", "cancelled"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-4 py-3 text-sm font-semibold capitalize transition ${tab === t ? "text-[var(--teal)]" : "text-[var(--gray-cool,#64748B)] hover:text-[var(--ink,#0F172A)]"}`}
            >
              {t}
              {tab === t && <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[var(--teal)]" />}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {list.length === 0 && (
            <div className="rounded-2xl bg-white p-10 text-center text-[var(--gray-cool,#64748B)]">No {tab} appointments yet.</div>
          )}
          {list.map((a) => {
            const doctor = getDoctor(a.doctorId);
            const service = getService(a.serviceId);
            const pet = getPet(a.petId);
            const hasRx = !!PRESCRIPTIONS[a.id];
            return (
              <div key={a.id} className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img src={doctor?.photo} alt="" className="h-14 w-14 rounded-full object-cover ring-2 ring-[var(--teal-tint)]" />
                    <div>
                      <div className="font-display font-bold text-[var(--ink,#0F172A)]">{service?.name}</div>
                      <div className="text-sm text-[var(--gray-cool,#64748B)]">{doctor?.name} · for {pet?.name}</div>
                      <div className="mt-1 text-sm text-[var(--ink,#0F172A)]">{a.date} · {a.time}</div>
                      <div className="mt-1 text-xs font-mono text-[var(--gray-cool,#64748B)]">#{a.id}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[var(--teal)]">{formatBDT(a.fee)}</div>
                    <div className="text-xs text-[var(--gray-cool,#64748B)]">{a.type === "video" ? "Video Call" : "In-Person"}</div>
                  </div>
                </div>

                {tab === "upcoming" && <Countdown date={a.date} />}

                <div className="mt-4 flex flex-wrap gap-2">
                  {tab === "upcoming" && (
                    <>
                      {a.type === "video" && (
                        <a href="#" className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--teal)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--teal-dark)]"><Video className="h-4 w-4" /> Join Video</a>
                      )}
                      <button className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[var(--ink,#0F172A)] hover:bg-[var(--teal-tint)]"><RefreshCw className="h-4 w-4" /> Reschedule</button>
                      <button className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--emergency)]/30 bg-white px-4 py-2 text-sm font-semibold text-[var(--emergency)] hover:bg-red-50"><X className="h-4 w-4" /> Cancel</button>
                    </>
                  )}
                  {tab === "past" && (
                    <>
                      {hasRx && (
                        <Link to="/clinic/appointments/$id" params={{ id: a.id }} className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--teal)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--teal-dark)]"><FileText className="h-4 w-4" /> View Prescription</Link>
                      )}
                      <Link to="/clinic/book" search={{ doctorId: a.doctorId }} className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[var(--ink,#0F172A)] hover:bg-[var(--teal-tint)]">Rebook</Link>
                      <button className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[var(--ink,#0F172A)] hover:bg-[var(--teal-tint)]"><Star className="h-4 w-4" /> Rate</button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <Link to="/clinic/vaccinations" className="text-sm font-semibold text-[var(--teal)] hover:underline">View vaccination records →</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Countdown({ date }: { date: string }) {
  const [delta, setDelta] = useState<string>("");
  useEffect(() => {
    const tick = () => {
      const t = new Date(date + "T10:00:00").getTime() - Date.now();
      if (t < 0) return setDelta("Starts soon");
      const d = Math.floor(t / 86400000);
      const h = Math.floor((t % 86400000) / 3600000);
      const m = Math.floor((t % 3600000) / 60000);
      setDelta(`${d}d ${h}h ${m}m`);
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, [date]);
  return <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--teal-tint)] px-3 py-1 text-xs font-semibold text-[var(--teal)]">⏱ Starts in {delta}</div>;
}
