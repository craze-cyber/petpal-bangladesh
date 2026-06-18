import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Star, Calendar, MapPin } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getDoctor, formatBDT } from "@/lib/clinic-data";

export const Route = createFileRoute("/clinic/doctors/$id")({
  head: ({ params }) => {
    const d = getDoctor(params.id);
    return {
      meta: [
        { title: d ? `${d.name} — BPAC Vet` : "Doctor — BPAC Vet" },
        { name: "description", content: d?.bio ?? "Veterinarian profile at BPAC Vet." },
      ],
    };
  },
  component: DoctorProfile,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-[var(--surface,#F5F7F8)]">
      <p className="text-[var(--ink,#0F172A)]">Doctor not found.</p>
    </div>
  ),
});

const REVIEWS = [
  { name: "Sadia R.", rating: 5, text: "Wonderful with my cockatiel — gentle, patient and very knowledgeable." },
  { name: "Imran K.", rating: 5, text: "Explained everything clearly. My dog's recovery was smooth." },
  { name: "Tania H.", rating: 4, text: "Clean clinic and friendly staff. Booking was easy too." },
];

function DoctorProfile() {
  const { id } = Route.useParams();
  const d = getDoctor(id);
  if (!d) throw notFound();

  return (
    <div className="min-h-screen bg-[var(--surface,#F5F7F8)] pb-32 lg:pb-0">
      <Header />

      {/* Cover */}
      <div className="relative h-40 sm:h-56" style={{ background: "linear-gradient(135deg,#0B6E6E,#084F4F)" }} />

      <div className="mx-auto -mt-16 max-w-[1000px] px-5 sm:px-6">
        <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
          <div className="flex flex-col items-start gap-5 sm:flex-row">
            <img src={d.photo} alt={d.name} className="h-28 w-28 rounded-full object-cover ring-4 ring-white sm:h-32 sm:w-32" />
            <div className="flex-1">
              <h1 className="font-display text-2xl font-extrabold text-[var(--ink,#0F172A)] sm:text-3xl">{d.name}</h1>
              <p className="text-sm text-[var(--gray-cool,#64748B)]">{d.degrees} · Reg. {d.regNumber}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {d.specs.map((s) => (
                  <span key={s} className="rounded-full bg-[var(--teal-tint)] px-3 py-1 text-xs font-medium text-[var(--teal)]">{s}</span>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[var(--ink,#0F172A)]">
                <span className="inline-flex items-center gap-1 font-semibold"><Star className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" /> {d.rating}</span>
                <span>{d.experience} years experience</span>
                <span className="font-bold text-[var(--teal)]">{formatBDT(d.fee)} / consult</span>
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-7 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-7">
              <section>
                <h2 className="font-display text-xl font-bold text-[var(--ink,#0F172A)]">About</h2>
                <p className="mt-2 text-[var(--ink,#0F172A)] leading-relaxed">{d.bio}</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-[var(--ink,#0F172A)]">Education</h2>
                <ol className="mt-3 space-y-3 border-l-2 border-[var(--teal-tint)] pl-5">
                  {d.education.map((e) => (
                    <li key={e.year}>
                      <div className="text-xs font-bold uppercase tracking-wider text-[var(--teal)]">{e.year}</div>
                      <div className="text-[var(--ink,#0F172A)]">{e.what}</div>
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-[var(--ink,#0F172A)]">Latest reviews</h2>
                <div className="mt-3 space-y-3">
                  {REVIEWS.map((r, i) => (
                    <div key={i} className="rounded-xl border border-black/5 bg-[var(--surface,#F5F7F8)] p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[var(--ink,#0F172A)]">{r.name}</span>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold"><Star className="h-3.5 w-3.5 fill-[var(--gold)] text-[var(--gold)]" /> {r.rating}.0</span>
                      </div>
                      <p className="mt-1 text-sm text-[var(--gray-cool,#64748B)]">{r.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-5">
              <section className="rounded-xl border border-black/5 bg-[var(--surface,#F5F7F8)] p-5">
                <h3 className="font-display text-lg font-bold text-[var(--ink,#0F172A)]">Working hours</h3>
                <table className="mt-3 w-full text-sm">
                  <tbody>
                    {d.hours.map((h) => (
                      <tr key={h.day} className="border-t border-black/5">
                        <td className="py-2 font-medium text-[var(--ink,#0F172A)]">{h.day}</td>
                        <td className="py-2 text-right text-[var(--gray-cool,#64748B)]">{h.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-3 inline-flex items-center gap-2 text-xs text-[var(--gray-cool,#64748B)]"><MapPin className="h-3.5 w-3.5" /> BPAC Vet, Dhaka</div>
              </section>
              <section className="rounded-xl border border-black/5 bg-[var(--surface,#F5F7F8)] p-5">
                <div className="text-sm text-[var(--gray-cool,#64748B)]">Next available</div>
                <div className={`mt-1 font-display text-lg font-bold ${d.nextToday ? "text-green-700" : "text-[var(--ink,#0F172A)]"}`}>{d.nextSlot}</div>
              </section>
            </aside>
          </div>
        </div>
      </div>

      {/* Sticky book button */}
      <div className="fixed inset-x-0 bottom-16 z-30 mx-auto max-w-[1000px] px-5 lg:bottom-6">
        <Link
          to="/clinic/book"
          search={{ doctorId: d.id }}
          className="flex h-14 items-center justify-center gap-2 rounded-xl bg-[var(--teal)] text-base font-semibold text-white shadow-2xl hover:bg-[var(--teal-dark)]"
        >
          <Calendar className="h-5 w-5" /> Book Appointment — {formatBDT(d.fee)}
        </Link>
      </div>

      <Footer />
    </div>
  );
}
