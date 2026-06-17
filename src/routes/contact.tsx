import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Globe, Phone, Mail, Clock } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FadeUp } from "@/components/site/Motion";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — BPAC Vet | Birds and Pet Animal Clinic" },
      {
        name: "description",
        content:
          "Visit or contact Birds and Pet Animal Clinic (BPAC Vet) in Dhaka. Call +880 1700-000000 or email info@bpacvet.com.",
      },
      { property: "og:title", content: "Contact BPAC Vet" },
      {
        property: "og:description",
        content: "Our primary goal is to serve your animals. Reach BPAC Vet in Dhaka, Bangladesh.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-[color:var(--bg-clinic)] text-[color:var(--charcoal)]">
      <Header />

      <section className="bg-gradient-to-br from-[color:var(--teal)] to-[color:var(--teal-dark)] py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <FadeUp>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[color:var(--gold)]">Get in touch</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
              Visit or Contact BPAC Vet
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/85 italic">
              "Our primary goal is to serve your animals."
            </p>
          </FadeUp>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          {/* LEFT — INFO */}
          <FadeUp>
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-extrabold">
                  Birds and Pet Animal Clinic (BPAC Vet)
                </h2>
                <p className="mt-2 text-[color:var(--gray-soft)]">
                  Bangladesh's trusted veterinary care platform — clinic, shop, lab and grooming.
                </p>
              </div>

              <ul className="space-y-3">
                <InfoRow icon={MapPin} label="Dhaka, Bangladesh" />
                <InfoRow
                  icon={Globe}
                  label="www.bpacvet.com"
                  href="https://www.bpacvet.com"
                />
                <InfoRow
                  icon={Phone}
                  label="+880 1700-000000"
                  href="tel:+8801700000000"
                />
                <InfoRow
                  icon={Mail}
                  label="info@bpacvet.com"
                  href="mailto:info@bpacvet.com"
                />
                <InfoRow icon={Clock} label="Sat – Thu: 9 AM – 8 PM · Emergency: 24/7" />
              </ul>

              <div className="overflow-hidden rounded-2xl border border-black/5 shadow-sm">
                <iframe
                  title="BPAC Vet location in Dhaka"
                  src="https://www.google.com/maps?q=Dhaka,Bangladesh&output=embed"
                  loading="lazy"
                  className="h-72 w-full border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </FadeUp>

          {/* RIGHT — FORM */}
          <FadeUp delay={0.05}>
            <ContactForm />
          </FadeUp>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
}) {
  const inner = (
    <li className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition hover:shadow-md">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--teal-tint)] text-[color:var(--teal)]">
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-sm font-semibold">{label}</span>
    </li>
  );
  return href ? (
    <a href={href} className="block">
      {inner}
    </a>
  ) : (
    inner
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Enquiry",
    petType: "Bird",
    message: "",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "General Enquiry",
      petType: "Bird",
      message: "",
    });
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-4 rounded-3xl bg-white p-6 shadow-[0_10px_40px_rgba(11,110,110,0.08)] sm:p-8"
    >
      <h2 className="font-display text-2xl font-extrabold">Send us a message</h2>
      <p className="text-sm text-[color:var(--gray-soft)]">
        We typically reply within a few hours during clinic hours.
      </p>

      <Field label="Full Name">
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputCls}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email">
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputCls}
          />
        </Field>
        <Field label="Phone (+880)">
          <div className="flex h-11 overflow-hidden rounded-lg border border-black/10">
            <span className="grid place-items-center bg-[color:var(--bg-clinic)] px-3 text-sm font-bold text-[color:var(--teal-dark)]">
              +880
            </span>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="1XXXXXXXXX"
              required
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 11) })
              }
              className="flex-1 px-3 text-sm outline-none"
            />
          </div>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Subject">
          <select
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className={inputCls}
          >
            {["General Enquiry", "Appointment", "Emergency", "Partnership", "Complaint"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Pet Type">
          <select
            value={form.petType}
            onChange={(e) => setForm({ ...form, petType: e.target.value })}
            className={inputCls}
          >
            {["Bird", "Dog", "Cat", "Rabbit", "Other"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message">
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputCls} h-auto py-3`}
        />
      </Field>

      <button
        type="submit"
        className="h-12 w-full rounded-lg bg-[color:var(--teal)] text-sm font-bold text-white shadow transition hover:bg-[color:var(--teal-dark)]"
      >
        Send Message
      </button>

      {sent && (
        <p className="rounded-lg bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-700">
          ✓ Message sent. We'll get back to you shortly.
        </p>
      )}
    </form>
  );
}

const inputCls =
  "h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm outline-none transition focus:border-[color:var(--teal)] focus:ring-2 focus:ring-[color:var(--teal)]/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[color:var(--charcoal)]/70">
        {label}
      </span>
      {children}
    </label>
  );
}
