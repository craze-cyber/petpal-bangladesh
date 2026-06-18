import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, MapPin, CreditCard, Wallet } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useCart } from "@/lib/cart";
import { formatBDT } from "@/lib/shop-data";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

const DIVISIONS = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal", "Rangpur", "Mymensingh"];
const SLOTS = ["Morning (9–12)", "Afternoon (12–5)", "Evening (5–9)"];
const PAYMENTS = [
  { id: "bkash", label: "bKash", icon: "💜", badge: "Most Popular", note: "You'll get a push notification" },
  { id: "nagad", label: "Nagad", icon: "🟠" },
  { id: "rocket", label: "Rocket (DBBL)", icon: "🔵" },
  { id: "card", label: "Credit/Debit Card", icon: "💳" },
  { id: "cod", label: "Cash on Delivery", icon: "💵", note: "Extra ৳50 COD charge" },
  { id: "wallet", label: "BPAC Wallet", icon: "💰", note: "Balance: ৳350" },
];

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({ name: "", phone: "", division: "Dhaka", district: "", thana: "", street: "", apt: "", landmark: "", label: "Home" });
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(SLOTS[0]);
  const [payment, setPayment] = useState("bkash");
  const [payNum, setPayNum] = useState("");

  const codCharge = payment === "cod" ? 50 : 0;
  const delivery = subtotal >= 999 ? 0 : 60;
  const total = subtotal + delivery + codCharge;

  const next7 = useMemo(() => Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i + 1);
    return d.toISOString().slice(0, 10);
  }), []);

  const placeOrder = () => {
    const orderNum = "BPV-2025-" + String(Math.floor(Math.random() * 90000) + 10000);
    const order = { id: orderNum, items, subtotal, delivery, codCharge, total, address, date, slot, payment, createdAt: Date.now() };
    try { localStorage.setItem("bpac_last_order", JSON.stringify(order)); } catch {}
    clear();
    navigate({ to: "/order-confirmation/$id", params: { id: orderNum } });
  };

  if (items.length === 0 && step === 1) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-2xl px-4 py-24 text-center">
          <h1 className="font-display text-2xl font-extrabold">Your cart is empty</h1>
          <Link to="/shop" className="mt-4 inline-flex h-11 items-center rounded-full bg-[color:var(--coral)] px-5 text-sm font-semibold text-white">Browse Shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <Header />
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-extrabold">Checkout</h1>

        <div className="mt-6 flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold ${step >= s ? "bg-[color:var(--coral)] text-white" : "bg-gray-200 text-[color:var(--gray-soft)]"}`}>
                {step > s ? <Check className="h-4 w-4" /> : s}
              </div>
              {s < 3 && <div className={`h-1 flex-1 rounded ${step > s ? "bg-[color:var(--coral)]" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs font-semibold text-[color:var(--gray-soft)]">
          <span>Delivery</span><span>Payment</span><span>Review</span>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            {step === 1 && (
              <>
                <h2 className="font-display text-lg font-extrabold"><MapPin className="mr-2 inline h-5 w-5 text-[color:var(--coral)]" />Delivery Address</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Input label="Full Name" value={address.name} onChange={(v) => setAddress({ ...address, name: v })} />
                  <div>
                    <label className="text-xs font-semibold text-[color:var(--gray-soft)]">Phone</label>
                    <div className="mt-1 flex h-11 items-center rounded-xl border bg-white">
                      <span className="border-r px-3 text-sm font-bold">+880</span>
                      <input value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} placeholder="1XXXXXXXXX" maxLength={10} className="flex-1 bg-transparent px-3 text-sm outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[color:var(--gray-soft)]">Division</label>
                    <select value={address.division} onChange={(e) => setAddress({ ...address, division: e.target.value })} className="mt-1 h-11 w-full rounded-xl border bg-white px-3 text-sm">
                      {DIVISIONS.map((d) => (<option key={d}>{d}</option>))}
                    </select>
                  </div>
                  <Input label="District" value={address.district} onChange={(v) => setAddress({ ...address, district: v })} />
                  <Input label="Thana/Upazila" value={address.thana} onChange={(v) => setAddress({ ...address, thana: v })} />
                  <Input label="Apartment/Floor (optional)" value={address.apt} onChange={(v) => setAddress({ ...address, apt: v })} />
                  <div className="sm:col-span-2"><Input label="Full Address" value={address.street} onChange={(v) => setAddress({ ...address, street: v })} /></div>
                  <div className="sm:col-span-2"><Input label="Landmark (optional)" value={address.landmark} onChange={(v) => setAddress({ ...address, landmark: v })} /></div>
                  <div className="sm:col-span-2">
                    <p className="text-xs font-semibold text-[color:var(--gray-soft)]">Label</p>
                    <div className="mt-2 flex gap-2">
                      {["Home", "Office", "Other"].map((l) => (
                        <button key={l} onClick={() => setAddress({ ...address, label: l })} className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${address.label === l ? "border-[color:var(--coral)] bg-[color:var(--coral)] text-white" : "bg-white"}`}>{l}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <h3 className="mt-8 font-display text-base font-extrabold">Delivery Slot</h3>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                  {next7.map((d) => (
                    <button key={d} onClick={() => setDate(d)} className={`shrink-0 rounded-2xl border px-4 py-3 text-center text-xs font-semibold ${date === d ? "border-[color:var(--coral)] bg-[color:var(--pink-soft)] text-[color:var(--coral)]" : "bg-white"}`}>
                      <div>{new Date(d).toLocaleDateString("en-BD", { weekday: "short" })}</div>
                      <div className="font-display text-lg font-extrabold">{new Date(d).getDate()}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {SLOTS.map((s) => (
                    <button key={s} onClick={() => setSlot(s)} className={`rounded-xl border py-2 text-xs font-semibold ${slot === s ? "border-[color:var(--coral)] bg-[color:var(--coral)] text-white" : "bg-white"}`}>{s}</button>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="font-display text-lg font-extrabold"><CreditCard className="mr-2 inline h-5 w-5 text-[color:var(--coral)]" />Payment Method</h2>
                <div className="mt-4 space-y-3">
                  {PAYMENTS.map((p) => (
                    <label key={p.id} className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition ${payment === p.id ? "border-[color:var(--coral)] bg-[color:var(--pink-soft)]" : "border-gray-200 bg-white"}`}>
                      <input type="radio" name="pay" checked={payment === p.id} onChange={() => setPayment(p.id)} className="mt-1 h-4 w-4 accent-[color:var(--coral)]" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{p.icon}</span>
                          <span className="font-display font-extrabold">{p.label}</span>
                          {p.badge && <span className="rounded-full bg-[color:var(--coral)] px-2 py-0.5 text-[10px] font-bold text-white">{p.badge}</span>}
                        </div>
                        {p.note && <p className="mt-1 text-xs text-[color:var(--gray-soft)]">{p.note}</p>}
                        {payment === p.id && ["bkash", "nagad", "rocket"].includes(p.id) && (
                          <div className="mt-3 flex h-10 items-center rounded-xl border bg-white">
                            <span className="border-r px-3 text-xs font-bold">+880</span>
                            <input value={payNum} onChange={(e) => setPayNum(e.target.value)} placeholder="1XXXXXXXXX" className="flex-1 bg-transparent px-3 text-sm outline-none" />
                          </div>
                        )}
                        {payment === p.id && p.id === "card" && (
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            <input placeholder="Card number" className="col-span-2 h-10 rounded-xl border px-3 text-sm" />
                            <input placeholder="MM/YY" className="h-10 rounded-xl border px-3 text-sm" />
                            <input placeholder="CVV" className="h-10 rounded-xl border px-3 text-sm" />
                          </div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="font-display text-lg font-extrabold">Review & Place Order</h2>
                <div className="mt-4 space-y-4 text-sm">
                  <Section title="Items">
                    <ul className="space-y-1">
                      {items.map((it) => (
                        <li key={it.id} className="flex justify-between">
                          <span>{it.name} × {it.qty}</span>
                          <span className="font-semibold">{formatBDT(it.price * it.qty)}</span>
                        </li>
                      ))}
                    </ul>
                  </Section>
                  <Section title="Delivery">
                    <p>{address.name || "—"}, {address.phone && `+880 ${address.phone}`}</p>
                    <p>{[address.street, address.thana, address.district, address.division].filter(Boolean).join(", ")}</p>
                    <p className="mt-1 text-xs text-[color:var(--gray-soft)]">{date} • {slot}</p>
                  </Section>
                  <Section title="Payment">
                    <p className="flex items-center gap-2"><Wallet className="h-4 w-4 text-[color:var(--coral)]" /> {PAYMENTS.find((p) => p.id === payment)?.label}</p>
                  </Section>
                </div>
                <button onClick={placeOrder} className="mt-6 w-full rounded-full bg-[color:var(--coral)] py-4 font-display text-lg font-extrabold text-white shadow-lg hover:bg-[color:var(--coral-dark)]">
                  Place Order — {formatBDT(total)}
                </button>
                <p className="mt-3 text-center text-xs text-[color:var(--gray-soft)]">By placing your order you agree to our Terms &amp; Conditions</p>
              </>
            )}

            <div className="mt-6 flex justify-between">
              {step > 1 ? (
                <button onClick={() => setStep(step - 1)} className="rounded-full border px-5 py-2.5 text-sm font-semibold">← Back</button>
              ) : <span />}
              {step < 3 && (
                <button onClick={() => setStep(step + 1)} className="rounded-full bg-[color:var(--charcoal)] px-6 py-2.5 text-sm font-semibold text-white">Continue →</button>
              )}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h3 className="font-display font-extrabold">Order Summary</h3>
              <div className="mt-3 space-y-1.5 text-sm">
                <Row label="Subtotal" value={formatBDT(subtotal)} />
                <Row label="Delivery" value={delivery === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatBDT(delivery)} />
                {codCharge > 0 && <Row label="COD Charge" value={formatBDT(codCharge)} />}
              </div>
              <div className="my-3 border-t" />
              <Row label={<span className="font-bold">Total</span>} value={<span className="font-display text-xl font-extrabold text-[color:var(--coral)]">{formatBDT(total)}</span>} />
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs font-semibold text-[color:var(--gray-soft)]">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 h-11 w-full rounded-xl border bg-white px-3 text-sm" />
    </div>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-[color:var(--pink-soft)] p-4">
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[color:var(--gray-soft)]">{title}</p>
      {children}
    </div>
  );
}
function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return <div className="flex items-baseline justify-between"><span className="text-[color:var(--gray-soft)]">{label}</span><span className="font-semibold">{value}</span></div>;
}
