import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Check, Clock } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/orders/$id")({
  component: TrackingPage,
});

const STEPS = [
  { icon: "✅", title: "Order Placed", time: "Nov 12, 2:30 PM", done: true },
  { icon: "✅", title: "Payment Confirmed", time: "Nov 12, 2:31 PM", done: true },
  { icon: "✅", title: "Order Packed", time: "Nov 12, 5:00 PM", done: true },
  { icon: "🔄", title: "Out for Delivery", time: "Nov 13, 10:00 AM", active: true },
  { icon: "⏳", title: "Delivered", time: "Expected by 6:00 PM", pending: true },
];

function TrackingPage() {
  const { id } = Route.useParams();
  const waLink = `https://wa.me/8801700000000?text=${encodeURIComponent(`Hi, I need help with order #${id}`)}`;

  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-6 sm:px-6">
        <Link to="/shop" className="text-sm text-[color:var(--gray-soft)] hover:text-[color:var(--coral)]">← Back to Shop</Link>
        <div className="mt-3 rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--gray-soft)]">Tracking</p>
          <h1 className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">Order #{id}</h1>
          <p className="mt-1 text-sm text-[color:var(--gray-soft)]">Out for delivery — arriving today by 6:00 PM</p>
        </div>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="font-display text-lg font-extrabold">Status</h2>
          <ol className="mt-5 space-y-5">
            {STEPS.map((s, i) => (
              <li key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`grid h-10 w-10 place-items-center rounded-full text-lg ${s.done ? "bg-emerald-500 text-white" : s.active ? "bg-[color:var(--coral)] text-white" : "bg-gray-200 text-gray-500"}`}>
                    {s.done ? <Check className="h-5 w-5" /> : s.active ? <Clock className="h-5 w-5" /> : <span className="text-xs">⏳</span>}
                  </div>
                  {i < STEPS.length - 1 && <div className={`mt-1 w-0.5 flex-1 min-h-8 ${s.done ? "bg-emerald-500" : "bg-gray-200"}`} />}
                </div>
                <div className="pb-2">
                  <p className={`font-display font-extrabold ${s.pending ? "text-[color:var(--gray-soft)]" : "text-[color:var(--charcoal)]"}`}>{s.title}</p>
                  <p className="text-xs text-[color:var(--gray-soft)]">{s.time}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="font-display text-lg font-extrabold">Delivery Agent</h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-[color:var(--teal)] font-display text-xl font-extrabold text-white">RH</div>
            <div className="flex-1">
              <p className="font-bold">Rakib Hossain</p>
              <p className="text-xs text-[color:var(--gray-soft)]">BPAC Delivery</p>
            </div>
            <a href="tel:+8801700000000" className="inline-flex h-11 items-center gap-2 rounded-full bg-[color:var(--coral)] px-4 text-sm font-semibold text-white">
              <Phone className="h-4 w-4" /> Call
            </a>
          </div>
        </div>

        <a href={waLink} target="_blank" rel="noreferrer" className="mt-6 flex h-12 items-center justify-center gap-2 rounded-full bg-emerald-500 font-semibold text-white shadow-sm hover:bg-emerald-600">
          <MessageCircle className="h-5 w-5" /> Need Help? WhatsApp Support
        </a>
      </main>
      <Footer />
    </div>
  );
}
