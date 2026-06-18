import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/order-confirmation/$id")({
  component: Confirmation,
});

function Confirmation() {
  const { id } = Route.useParams();
  const [shown, setShown] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShown(true), 100); return () => clearTimeout(t); }, []);

  const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString("en-BD", { weekday: "long", day: "numeric", month: "short" });

  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <div className={`mx-auto grid h-24 w-24 place-items-center rounded-full bg-emerald-500 transition-all duration-500 ${shown ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
          <Check className="h-12 w-12 text-white" strokeWidth={3} />
        </div>
        <h1 className="mt-6 font-display text-3xl font-extrabold text-[color:var(--charcoal)] sm:text-4xl">Order Placed Successfully! 🎉</h1>
        <p className="mt-3 text-[color:var(--gray-soft)]">Thank you for shopping with BPAC. We'll text you when your order ships.</p>
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--gray-soft)]">Order Number</p>
          <p className="mt-1 font-display text-2xl font-extrabold text-[color:var(--coral)]">{id}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-[color:var(--gray-soft)]">Estimated Delivery</p>
          <p className="mt-1 font-display font-bold text-[color:var(--charcoal)]">{tomorrow} by 6 PM</p>
        </div>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/orders/$id" params={{ id }} className="inline-flex h-12 items-center justify-center rounded-full bg-[color:var(--coral)] px-6 font-semibold text-white">Track Your Order</Link>
          <Link to="/shop" className="text-sm font-semibold text-[color:var(--coral)] hover:underline">Continue Shopping →</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
