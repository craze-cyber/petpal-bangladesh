import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MessageCircle, MapPin, Clock, Send } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FadeUp } from "@/components/site/Motion";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Birds and Pet Animal Clinic" },
      {
        name: "description",
        content:
          "Visit our Dhanmondi clinic, call, email or WhatsApp the BPAC team. 24/7 pet emergency line available.",
      },
      { property: "og:title", content: "Contact BPAC" },
      {
        property: "og:description",
        content: "Reach the BPAC team in Dhanmondi — clinic visits, partnerships, careers and emergencies.",
      },
    ],
  }),
  component: ContactPage,
});

type Form = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

function ContactPage() {
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    phone: "",
    subject: "General",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (k: keyof Form, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSent(true);
    setForm({ name: "", email: "", phone: "", subject: "General", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[color:var(--background)] text-[color:var(--charcoal)]">
      <Header />

      <section className="bg-gradient-to-br from-[color:var(--pink-soft)] to-white py-14">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <FadeUp>
            <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Get in touch</h1>
            <p className="mt-3 text-[color:var(--gray-soft)]">
              We'd love to hear from you. Visit, call, or message — we typically reply within
              an hour.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <ContactCard
            icon={Phone}
            label="Call us"
            tint="var(--coral)"
            primary="+880 1700-000000"
            href="tel:+8801700000000"
            note="Sat–Thu, 9 AM – 9 PM"
          />
          <ContactCard
            icon={Mail}
            label="Email us"
            tint="var(--teal)"
            primary="hello@bpacvet.com"
            href="mailto:hello@bpacvet.com"
            note="Replies within 1 hour"
          />
          <ContactCard
            icon={MessageCircle}
            label="WhatsApp"
            tint="#25d366"
            primary="+880 1700-000000"
            href="https://wa.me/8801700000000"
            note="24/7 chat support"
          />
        </div>
      </section>

      {/* Map + form */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-3xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <iframe
                title="BPAC Dhanmondi"
                src="https://www.google.com/maps?q=Dhanmondi%2C%20Road%205%2C%20Dhaka&output=embed"
                width="100%"
                height="380"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full"
              />
              <div className="flex items-start gap-3 p-5">
                <MapPin className="mt-1 h-5 w-5 text-[color:var(--coral)]" />
                <div>
                  <p className="font-display text-base font-extrabold">Birds and Pet Animal Clinic</p>
                  <p className="text-sm text-[color:var(--gray-soft)]">
                    House 12, Road 5, Dhanmondi, Dhaka 1205
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[color:var(--teal)]" />
                <h3 className="font-display text-lg font-extrabold">Business hours</h3>
              </div>
              <table className="mt-4 w-full text-sm">
                <tbody>
                  <tr className="border-b border-[color:var(--pink-soft)]">
                    <td className="py-2.5 font-semibold">Saturday – Thursday</td>
                    <td className="py-2.5 text-right text-[color:var(--gray-soft)]">9:00 AM – 9:00 PM</td>
                  </tr>
                  <tr className="border-b border-[color:var(--pink-soft)]">
                    <td className="py-2.5 font-semibold">Friday</td>
                    <td className="py-2.5 text-right text-[color:var(--gray-soft)]">2:00 PM – 9:00 PM</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-[color:var(--coral)]">Emergency line</td>
                    <td className="py-2.5 text-right font-semibold text-[color:var(--coral)]">24/7</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="order-2 rounded-3xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] sm:p-8 lg:order-1"
          >
            <h3 className="font-display text-2xl font-extrabold">Send us a message</h3>
            <p className="mt-1 text-sm text-[color:var(--gray-soft)]">
              Fill out the form and we'll respond shortly.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full name">
                <input
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="input"
                  placeholder="পূর্ণ নাম"
                />
              </Field>
              <Field label="Email">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="input"
                  placeholder="you@example.com"
                />
              </Field>
              <Field label="Phone">
                <div className="flex">
                  <span className="inline-flex items-center rounded-l-2xl border border-r-0 border-[color:var(--border)] bg-[color:var(--pink-soft)] px-3 text-sm font-semibold">
                    +880
                  </span>
                  <input
                    required
                    inputMode="numeric"
                    pattern="01[0-9]{9}"
                    maxLength={11}
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value.replace(/\D/g, ""))}
                    className="input !rounded-l-none"
                    placeholder="01XXXXXXXXX"
                  />
                </div>
              </Field>
              <Field label="Subject">
                <select
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  className="input"
                >
                  <option>General</option>
                  <option>Complaint</option>
                  <option>Partnership</option>
                  <option>Career</option>
                  <option>Emergency</option>
                </select>
              </Field>
            </div>

            <Field label="Message" className="mt-4">
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className="input resize-none"
                placeholder="How can we help?"
              />
            </Field>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[color:var(--coral)] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[color:var(--coral-dark)] disabled:opacity-60 sm:w-auto"
            >
              {submitting ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send message
                </>
              )}
            </button>

            {sent && (
              <p className="mt-4 rounded-2xl bg-[color:var(--teal)]/15 px-4 py-3 text-sm font-semibold text-[color:var(--teal)]">
                Message sent — we'll be in touch soon!
              </p>
            )}
          </form>
        </div>
      </section>

      <Footer />

      <style>{`
        .input {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid var(--border);
          background: var(--background);
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          color: var(--charcoal);
          transition: border-color .15s, box-shadow .15s;
        }
        .input:focus { outline: none; border-color: var(--coral); box-shadow: 0 0 0 4px rgba(255,107,107,0.12); }
      `}</style>
    </div>
  );
}

function ContactCard({
  icon: Icon,
  label,
  primary,
  href,
  note,
  tint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  primary: string;
  href: string;
  note: string;
  tint: string;
}) {
  return (
    <a
      href={href}
      className="group block rounded-3xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
    >
      <div
        className="grid h-12 w-12 place-items-center rounded-2xl text-white"
        style={{ backgroundColor: tint }}
      >
        <Icon className="h-6 w-6" />
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[color:var(--gray-soft)]">
        {label}
      </p>
      <p className="mt-1 font-display text-lg font-extrabold group-hover:text-[color:var(--coral)]">
        {primary}
      </p>
      <p className="text-xs text-[color:var(--gray-soft)]">{note}</p>
    </a>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[color:var(--gray-soft)]">
        {label}
      </span>
      {children}
    </label>
  );
}
