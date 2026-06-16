import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2, Tag, Sparkles } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useCart } from "@/lib/cart";
import { formatBDT } from "@/lib/shop-data";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [usePoints, setUsePoints] = useState(false);
  const points = usePoints ? 50 : 0;
  const delivery = subtotal >= 999 || subtotal === 0 ? 0 : 60;
  const total = Math.max(0, subtotal + delivery - discount - points);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "EID20") setDiscount(Math.round(subtotal * 0.2));
    else setDiscount(0);
  };

  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <Header />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Your Cart</h1>

        {items.length === 0 ? (
          <div className="mt-12 rounded-3xl bg-white p-12 text-center shadow-sm">
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-[color:var(--pink-soft)] text-5xl">🧺</div>
            <p className="mt-4 text-xs uppercase tracking-widest text-[color:var(--gray-soft)]">🐾</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold">Your cart is empty</h2>
            <p className="mt-1 text-sm text-[color:var(--gray-soft)]">Looks like you haven't added anything yet.</p>
            <Link to="/shop" className="mt-6 inline-flex h-12 items-center rounded-full bg-[color:var(--coral)] px-6 font-semibold text-white">Start Shopping</Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="space-y-3">
              {items.map((it) => (
                <div key={it.id + (it.variant ?? "")} className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm">
                  <img src={it.image} alt={it.name} className="h-24 w-24 shrink-0 rounded-xl object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display font-bold text-[color:var(--charcoal)]">{it.name}</p>
                        <p className="text-xs text-[color:var(--gray-soft)]">{it.brand}{it.variant ? ` • ${it.variant}` : ""}</p>
                      </div>
                      <button onClick={() => remove(it.id, it.variant)} aria-label="Remove" className="grid h-8 w-8 place-items-center rounded-full text-[color:var(--gray-soft)] hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border bg-white p-1">
                        <button onClick={() => setQty(it.id, it.qty - 1, it.variant)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-gray-50"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-6 text-center font-bold">{it.qty}</span>
                        <button onClick={() => setQty(it.id, it.qty + 1, it.variant)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-gray-50"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[color:var(--gray-soft)]">{formatBDT(it.price)} × {it.qty}</p>
                        <p className="font-display text-lg font-extrabold text-[color:var(--coral)]">{formatBDT(it.price * it.qty)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Link to="/shop" className="inline-block text-sm font-semibold text-[color:var(--coral)] hover:underline">← Continue Shopping</Link>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <h3 className="font-display text-lg font-extrabold">Order Summary</h3>
                <div className="mt-4 space-y-2 text-sm">
                  <Row label="Subtotal" value={formatBDT(subtotal)} />
                  <Row label="Delivery" value={delivery === 0 ? <span className="font-bold text-emerald-600">FREE</span> : formatBDT(delivery)} />
                  {discount > 0 && <Row label="Discount" value={<span className="text-emerald-600">−{formatBDT(discount)}</span>} />}
                  {points > 0 && <Row label="Loyalty Points" value={<span className="text-emerald-600">−{formatBDT(points)}</span>} />}
                </div>
                <div className="my-4 border-t" />
                <div className="flex items-baseline justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-display text-2xl font-extrabold text-[color:var(--coral)]">{formatBDT(total)}</span>
                </div>

                <div className="mt-5 flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--gray-soft)]" />
                    <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code" className="h-11 w-full rounded-full border bg-white pl-9 pr-3 text-sm" />
                  </div>
                  <button onClick={applyCoupon} className="rounded-full bg-[color:var(--charcoal)] px-4 text-sm font-semibold text-white">Apply</button>
                </div>

                <label className="mt-4 flex cursor-pointer items-center justify-between rounded-xl bg-[color:var(--pink-soft)] p-3 text-sm">
                  <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-[color:var(--coral)]" /> Use 500 points (= ৳50 off)</span>
                  <input type="checkbox" checked={usePoints} onChange={(e) => setUsePoints(e.target.checked)} className="h-4 w-4 accent-[color:var(--coral)]" />
                </label>

                <Link to="/checkout" className="mt-5 flex h-12 items-center justify-center rounded-full bg-[color:var(--coral)] font-semibold text-white shadow-sm hover:bg-[color:var(--coral-dark)]">
                  Proceed to Checkout
                </Link>
              </div>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between">
      <span className="text-[color:var(--gray-soft)]">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
