import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Plus, Video, Hospital, Phone, CheckCircle2, Calendar as CalIcon, MapPin } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  SERVICES, DOCTORS, PETS, TIME_SLOTS, BOOKED_SLOTS,
  formatBDT, getDoctor, getService, getPet,
} from "@/lib/clinic-data";

type Search = { doctorId?: string };

export const Route = createFileRoute("/clinic/book")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    doctorId: typeof s.doctorId === "string" ? s.doctorId : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book Appointment — BPAC Vet Clinic" },
      { name: "description", content: "Book a veterinary appointment in 5 quick steps. Choose your pet, service, doctor, date and time." },
    ],
  }),
  component: BookingFlow,
});

const STEPS = ["Pet", "Service", "Doctor", "Date & Time", "Confirm"];

function BookingFlow() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [step, setStep] = useState(1);
  const [petId, setPetId] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [doctorId, setDoctorId] = useState<string | null>(search.doctorId ?? null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [visitType, setVisitType] = useState<"in-person" | "video">("in-person");
  const [symptoms, setSymptoms] = useState("");
  const [payment, setPayment] = useState<"bkash" | "card" | "clinic">("bkash");
  const [confirmedId, setConfirmedId] = useState<string | null>(null);

  const pet = petId ? getPet(petId) : null;
  const service = serviceId ? getService(serviceId) : null;
  const doctor = doctorId ? getDoctor(doctorId) : null;

  const canNext = useMemo(() => {
    if (step === 1) return !!petId;
    if (step === 2) return !!serviceId;
    if (step === 3) return !!doctorId || doctorId === "any";
    if (step === 4) return !!date && !!time;
    return true;
  }, [step, petId, serviceId, doctorId, date, time]);

  function submit() {
    const id = `CLI-2025-${Math.floor(10000 + Math.random() * 90000)}`;
    setConfirmedId(id);
  }

  if (confirmedId) {
    return (
      <div className="min-h-screen bg-[var(--surface,#F5F7F8)] pb-20 lg:pb-0">
        <Header />
        <div className="mx-auto max-w-2xl px-5 py-16 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-100 animate-in zoom-in duration-500">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-extrabold text-[var(--ink,#0F172A)]">Appointment Confirmed!</h1>
          <p className="mt-2 text-[var(--gray-cool,#64748B)]">Booking ID</p>
          <p className="font-display text-xl font-bold tracking-wider text-[var(--teal)]">#{confirmedId}</p>

          <div className="mt-8 rounded-2xl bg-white p-6 text-left shadow-sm">
            <Row label="Pet" value={pet?.name} />
            <Row label="Service" value={service?.name} />
            <Row label="Doctor" value={doctor?.name ?? "Any available"} />
            <Row label="Date" value={date ?? ""} />
            <Row label="Time" value={time ?? ""} />
            <Row label="Type" value={visitType === "video" ? "Video Call" : "In-Person"} />
            <Row label="Fee" value={formatBDT(doctor?.fee ?? service?.priceFrom ?? 0)} />
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="#" className="inline-flex h-11 items-center gap-2 rounded-lg bg-[var(--teal)] px-5 text-sm font-semibold text-white hover:bg-[var(--teal-dark)]">
              <CalIcon className="h-4 w-4" /> Add to Google Calendar
            </a>
            <a href="#" className="inline-flex h-11 items-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-[var(--teal)] shadow hover:bg-[var(--teal-tint)]">
              <MapPin className="h-4 w-4" /> Get Directions
            </a>
          </div>
          <p className="mt-4 text-sm text-[var(--gray-cool,#64748B)]">📩 Confirmation sent to your WhatsApp.</p>

          <div className="mt-8">
            <button onClick={() => navigate({ to: "/clinic/appointments" })} className="text-sm font-semibold text-[var(--teal)] hover:underline">
              View my appointments →
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--surface,#F5F7F8)] pb-32 lg:pb-0">
      <Header />
      <div className="mx-auto max-w-3xl px-5 py-8 sm:px-6">
        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {STEPS.map((label, idx) => {
            const n = idx + 1;
            const active = n === step;
            const done = n < step;
            return (
              <div key={label} className="flex flex-1 items-center gap-2">
                <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${done ? "bg-[var(--teal)] text-white" : active ? "bg-[var(--teal)] text-white ring-4 ring-[var(--teal-tint)]" : "bg-white text-[var(--gray-cool,#64748B)] ring-1 ring-black/10"}`}>
                  {done ? <Check className="h-4 w-4" /> : n}
                </div>
                {idx < STEPS.length - 1 && <div className={`h-1 flex-1 rounded-full ${done ? "bg-[var(--teal)]" : "bg-black/10"}`} />}
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[var(--gray-cool,#64748B)]">Step {step} of 5 · {STEPS[step - 1]}</p>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          {step === 1 && (
            <>
              <h2 className="font-display text-2xl font-bold text-[var(--ink,#0F172A)]">Which pet needs care? 🐾</h2>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {PETS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPetId(p.id)}
                    className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition ${petId === p.id ? "border-[var(--teal)] shadow-[0_0_0_4px_var(--teal-tint)]" : "border-black/10 hover:border-[var(--teal)]/50"}`}
                  >
                    <img src={p.photo} alt={p.name} className="h-14 w-14 rounded-full object-cover" />
                    <div>
                      <div className="font-display font-bold text-[var(--ink,#0F172A)]">{p.name}</div>
                      <div className="text-sm text-[var(--gray-cool,#64748B)]">{p.breed} · {p.age}</div>
                    </div>
                  </button>
                ))}
                <button className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-black/15 p-4 text-sm font-semibold text-[var(--teal)] hover:border-[var(--teal)] hover:bg-[var(--teal-tint)]">
                  <Plus className="h-4 w-4" /> Add new pet
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-display text-2xl font-bold text-[var(--ink,#0F172A)]">Select a service</h2>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setServiceId(s.id)}
                    className={`flex items-start gap-4 rounded-xl border-2 p-4 text-left transition ${serviceId === s.id ? "border-[var(--teal)] shadow-[0_0_0_4px_var(--teal-tint)]" : "border-black/10 hover:border-[var(--teal)]/50"}`}
                  >
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[var(--teal-tint)] text-2xl">{s.icon}</div>
                    <div>
                      <div className="font-display font-bold text-[var(--ink,#0F172A)]">{s.name}</div>
                      <div className="text-sm font-semibold text-[var(--teal)]">{formatBDT(s.priceFrom)}{s.priceTo ? `–${s.priceTo.toLocaleString()}` : "+"}</div>
                    </div>
                  </button>
                ))}
                <a href="tel:+8801700111111" className="flex items-center gap-3 rounded-xl border-2 border-[var(--emergency)]/30 bg-red-50 p-4 text-left hover:border-[var(--emergency)]">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-[var(--emergency)] text-2xl">🚨</div>
                  <div>
                    <div className="font-display font-bold text-[var(--emergency)]">Emergency</div>
                    <div className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--emergency)]"><Phone className="h-3.5 w-3.5" /> Call us now</div>
                  </div>
                </a>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="font-display text-2xl font-bold text-[var(--ink,#0F172A)]">Choose your doctor</h2>
              <div className="mt-5 space-y-3">
                <button
                  onClick={() => setDoctorId("any")}
                  className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition ${doctorId === "any" ? "border-[var(--teal)] shadow-[0_0_0_4px_var(--teal-tint)]" : "border-black/10 hover:border-[var(--teal)]/50"}`}
                >
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-[var(--gold)] text-white font-bold">⚡</div>
                  <div>
                    <div className="font-display font-bold text-[var(--ink,#0F172A)]">Any Available</div>
                    <div className="text-sm text-[var(--gray-cool,#64748B)]">Auto-assigned — fastest booking</div>
                  </div>
                </button>
                {DOCTORS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDoctorId(d.id)}
                    className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition ${doctorId === d.id ? "border-[var(--teal)] shadow-[0_0_0_4px_var(--teal-tint)]" : "border-black/10 hover:border-[var(--teal)]/50"}`}
                  >
                    <img src={d.photo} alt={d.name} className="h-12 w-12 rounded-full object-cover" />
                    <div className="flex-1">
                      <div className="font-display font-bold text-[var(--ink,#0F172A)]">{d.name}</div>
                      <div className="text-xs text-[var(--gray-cool,#64748B)]">{d.specs.join(" · ")}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[var(--teal)]">{formatBDT(d.fee)}</div>
                      <div className={`text-xs ${d.nextToday ? "text-green-700 font-semibold" : "text-[var(--gray-cool,#64748B)]"}`}>{d.nextSlot}</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="font-display text-2xl font-bold text-[var(--ink,#0F172A)]">Pick a date & time</h2>
              <SimpleCalendar selected={date} onSelect={setDate} />

              <h3 className="mt-6 font-semibold text-[var(--ink,#0F172A)]">Available time slots</h3>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {TIME_SLOTS.map((t) => {
                  const booked = BOOKED_SLOTS.has(t);
                  const selected = time === t;
                  return (
                    <button
                      key={t}
                      disabled={booked || !date}
                      onClick={() => setTime(t)}
                      className={`rounded-lg py-2 text-sm font-semibold transition ${
                        booked
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed line-through"
                          : selected
                          ? "bg-[var(--teal)] text-white"
                          : "bg-white text-[var(--ink,#0F172A)] ring-1 ring-black/10 hover:ring-[var(--teal)]"
                      } ${!date && !booked ? "opacity-50" : ""}`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>

              <h3 className="mt-6 font-semibold text-[var(--ink,#0F172A)]">Visit type</h3>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <button onClick={() => setVisitType("in-person")} className={`flex items-center justify-center gap-2 rounded-xl border-2 py-4 text-sm font-semibold transition ${visitType === "in-person" ? "border-[var(--teal)] bg-[var(--teal-tint)] text-[var(--teal)]" : "border-black/10"}`}>
                  <Hospital className="h-4 w-4" /> In-Person
                </button>
                <button onClick={() => setVisitType("video")} className={`flex items-center justify-center gap-2 rounded-xl border-2 py-4 text-sm font-semibold transition ${visitType === "video" ? "border-[var(--teal)] bg-[var(--teal-tint)] text-[var(--teal)]" : "border-black/10"}`}>
                  <Video className="h-4 w-4" /> Video Call
                </button>
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <h2 className="font-display text-2xl font-bold text-[var(--ink,#0F172A)]">Review & confirm</h2>
              <div className="mt-5 rounded-xl border border-black/5 bg-[var(--surface,#F5F7F8)] p-5">
                <Row label="Pet" value={pet?.name ?? "—"} />
                <Row label="Service" value={service?.name ?? "—"} />
                <Row label="Doctor" value={doctor?.name ?? (doctorId === "any" ? "Any available" : "—")} />
                <Row label="Date" value={date ?? "—"} />
                <Row label="Time" value={time ?? "—"} />
                <Row label="Type" value={visitType === "video" ? "Video Call" : "In-Person"} />
                <Row label="Location" value={visitType === "video" ? "Video link will be sent" : "BPAC Vet, Dhaka"} />
                <Row label="Fee" value={formatBDT(doctor?.fee ?? service?.priceFrom ?? 0)} highlight />
              </div>

              <div className="mt-5">
                <label className="font-semibold text-[var(--ink,#0F172A)]">Symptoms / notes</label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  rows={3}
                  placeholder="Describe symptoms or anything the vet should know…"
                  className="mt-2 w-full rounded-lg border border-black/10 bg-white p-3 text-sm focus:border-[var(--teal)] focus:outline-none focus:ring-2 focus:ring-[var(--teal-tint)]"
                />
              </div>

              <div className="mt-5">
                <div className="font-semibold text-[var(--ink,#0F172A)]">Payment method</div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    { id: "bkash" as const, label: "bKash" },
                    { id: "card" as const, label: "Card" },
                    { id: "clinic" as const, label: "Pay at clinic" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPayment(p.id)}
                      className={`rounded-xl border-2 py-3 text-sm font-semibold transition ${payment === p.id ? "border-[var(--teal)] bg-[var(--teal-tint)] text-[var(--teal)]" : "border-black/10"}`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Step nav */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-[var(--ink,#0F172A)] disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          {step < 5 ? (
            <button
              onClick={() => setStep((s) => Math.min(5, s + 1))}
              disabled={!canNext}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--teal)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--teal-dark)] disabled:opacity-40"
            >
              Continue <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={submit}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--teal)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--teal-dark)]"
            >
              Confirm Booking <Check className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value?: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-black/5 py-2 last:border-0">
      <span className="text-sm text-[var(--gray-cool,#64748B)]">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? "text-[var(--teal)] text-base" : "text-[var(--ink,#0F172A)]"}`}>{value}</span>
    </div>
  );
}

function SimpleCalendar({ selected, onSelect }: { selected: string | null; onSelect: (d: string) => void }) {
  const today = new Date();
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const first = new Date(view.y, view.m, 1);
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const startDow = first.getDay();
  const cells: (number | null)[] = Array(startDow).fill(null).concat(Array.from({ length: days }, (_, i) => i + 1));
  const monthName = first.toLocaleString("en-US", { month: "long", year: "numeric" });
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const bookedDays = new Set([5, 12, 19]); // mock

  return (
    <div className="mt-4 rounded-xl border border-black/5 bg-white p-4">
      <div className="flex items-center justify-between">
        <button onClick={() => setView((v) => ({ y: v.m === 0 ? v.y - 1 : v.y, m: v.m === 0 ? 11 : v.m - 1 }))} className="grid h-8 w-8 place-items-center rounded-md hover:bg-[var(--teal-tint)]"><ChevronLeft className="h-4 w-4" /></button>
        <div className="font-display font-semibold text-[var(--ink,#0F172A)]">{monthName}</div>
        <button onClick={() => setView((v) => ({ y: v.m === 11 ? v.y + 1 : v.y, m: v.m === 11 ? 0 : v.m + 1 }))} className="grid h-8 w-8 place-items-center rounded-md hover:bg-[var(--teal-tint)]"><ChevronRight className="h-4 w-4" /></button>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[var(--gray-cool,#64748B)]">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i} className="py-1">{d}</div>)}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (d === null) return <div key={i} />;
          const key = `${view.y}-${String(view.m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
          const isToday = key === todayKey;
          const isSelected = selected === key;
          const isBooked = bookedDays.has(d);
          const past = new Date(view.y, view.m, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const disabled = isBooked || past;
          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => onSelect(key)}
              className={`relative aspect-square rounded-lg text-sm font-medium transition ${
                isSelected
                  ? "bg-[var(--teal)] text-white"
                  : isToday
                  ? "bg-[var(--teal-tint)] text-[var(--teal)] ring-2 ring-[var(--teal)]"
                  : disabled
                  ? "text-slate-300"
                  : "text-[var(--ink,#0F172A)] hover:bg-[var(--teal-tint)]"
              }`}
            >
              {d}
              {!disabled && !isSelected && <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--teal)]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
