import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, ShoppingCart, Star, Truck, MapPin, Clock, ThumbsUp } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProduct, formatBDT, PRODUCTS } from "@/lib/shop-data";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/shop/ProductCard";

export const Route = createFileRoute("/shop/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Product not found</h1>
        <Link to="/shop" className="mt-4 inline-block text-[color:var(--coral)] hover:underline">← Back to Shop</Link>
      </div>
      <Footer />
    </div>
  ),
});

const REVIEWS = [
  { user: "Tasnim R.", avatar: "T", rating: 5, date: "2 days ago", text: "Quality is excellent! My cat loves it. Delivery to Dhanmondi was next day.", helpful: 12 },
  { user: "Rakib H.", avatar: "R", rating: 4, date: "1 week ago", text: "Good packaging, fresh product. Slightly expensive but worth it.", helpful: 8 },
  { user: "Nadia S.", avatar: "N", rating: 5, date: "3 weeks ago", text: "Vet recommended. Five stars from us!", helpful: 23 },
];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [variant, setVariant] = useState(product.variants?.[0]?.value);
  const [qty, setQty] = useState(1);
  const [showReview, setShowReview] = useState(false);
  const [zoom, setZoom] = useState(false);

  const activeVariant = product.variants?.find((v) => v.value === variant);
  const price = activeVariant?.price ?? product.price;
  const stockLabel = product.stock === 0
    ? { icon: "❌", text: "Out of Stock", color: "text-red-600" }
    : product.stock <= 3
      ? { icon: "⚠️", text: `Only ${product.stock} left!`, color: "text-amber-600" }
      : { icon: "✅", text: `In Stock (${product.stock} left)`, color: "text-emerald-600" };

  const handleAdd = () => {
    add({
      id: product.id, name: product.name, brand: product.brand,
      image: product.image, price, variant,
    }, qty);
  };

  const related = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <nav className="mb-4 text-sm text-[color:var(--gray-soft)]">
          <Link to="/shop" className="hover:text-[color:var(--coral)]">Shop</Link>
          <span className="mx-2">›</span>
          <Link to="/shop/category/$slug" params={{ slug: product.category }} className="hover:text-[color:var(--coral)]">{product.categoryLabel}</Link>
          <span className="mx-2">›</span>
          <span className="text-[color:var(--charcoal)]">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <button onClick={() => setZoom(true)} className="block aspect-square w-full overflow-hidden rounded-3xl bg-[color:var(--pink-soft)]">
              <img src={product.images?.[activeImg] ?? product.image} alt={product.name} className="h-full w-full object-cover transition-transform hover:scale-105" />
            </button>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {product.images?.map((src, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`aspect-square overflow-hidden rounded-xl ${activeImg === i ? "ring-2 ring-[color:var(--coral)]" : "ring-1 ring-black/5"}`}>
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 className="font-display text-3xl font-extrabold text-[color:var(--charcoal)]">{product.name}</h1>
            <p className="mt-1 text-sm text-[color:var(--coral)]">{product.brand}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex">{Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-[color:var(--yellow)] text-[color:var(--yellow)]" : "text-gray-300"}`} />
              ))}</div>
              <a href="#reviews" className="text-sm text-[color:var(--gray-soft)] hover:underline">{product.reviewCount} reviews</a>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-3xl font-extrabold text-[color:var(--coral)]">{formatBDT(price)}</span>
              {product.originalPrice && (
                <span className="text-base text-[color:var(--gray-soft)] line-through">{formatBDT(product.originalPrice)}</span>
              )}
            </div>

            <p className={`mt-3 font-semibold ${stockLabel.color}`}>{stockLabel.icon} {stockLabel.text}</p>

            {product.variants && (
              <div className="mt-5">
                <p className="mb-2 text-sm font-bold">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button key={v.value} onClick={() => setVariant(v.value)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${variant === v.value ? "border-[color:var(--coral)] bg-[color:var(--coral)] text-white" : "border-gray-200 bg-white hover:border-[color:var(--coral)]"}`}>
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5 flex items-center gap-3">
              <p className="text-sm font-bold">Quantity</p>
              <div className="flex items-center gap-2 rounded-full border bg-white p-1">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-8 w-8 place-items-center rounded-full hover:bg-gray-50"><Minus className="h-4 w-4" /></button>
                <span className="w-8 text-center font-bold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-gray-50"><Plus className="h-4 w-4" /></button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button onClick={handleAdd} disabled={product.stock === 0} className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[color:var(--coral)] px-6 font-semibold text-white shadow-sm transition hover:bg-[color:var(--coral-dark)] disabled:opacity-50">
                <ShoppingCart className="h-5 w-5" /> Add to Cart
              </button>
              <Link to="/checkout" onClick={handleAdd} className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[color:var(--coral)] bg-white px-6 font-semibold text-[color:var(--coral)] hover:bg-[color:var(--pink-soft)]">
                Buy Now
              </Link>
              <button aria-label="Wishlist" className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 bg-white hover:border-[color:var(--coral)] hover:text-[color:var(--coral)]">
                <Heart className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-2 rounded-2xl bg-[color:var(--pink-soft)] p-4 text-sm">
              <p className="flex items-center gap-2"><Truck className="h-4 w-4 text-[color:var(--coral)]" /> Free delivery on orders above ৳999</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[color:var(--coral)]" /> Delivery: Dhaka, Chittagong, Sylhet, Rajshahi</p>
              <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-[color:var(--coral)]" /> Dhaka: Next day · Others: 3–5 days</p>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold uppercase text-[color:var(--gray-soft)]">Secure Payment</p>
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                {["bKash", "Nagad", "Rocket", "Visa", "Mastercard"].map((m) => (
                  <span key={m} className="rounded-lg border bg-white px-3 py-1.5">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="desc" className="mt-12">
          <TabsList className="w-full justify-start overflow-x-auto bg-white">
            <TabsTrigger value="desc">Description</TabsTrigger>
            <TabsTrigger value="spec">Specifications</TabsTrigger>
            <TabsTrigger value="how">How to Use</TabsTrigger>
            <TabsTrigger value="rev">Reviews ({product.reviewCount})</TabsTrigger>
          </TabsList>
          <TabsContent value="desc" className="rounded-2xl bg-white p-6 text-sm leading-relaxed text-[color:var(--charcoal)]">{product.description}</TabsContent>
          <TabsContent value="spec" className="rounded-2xl bg-white p-6">
            <table className="w-full text-sm">
              <tbody>
                {product.ingredients.map((row) => (
                  <tr key={row.key} className="border-b last:border-0">
                    <td className="py-2 font-semibold text-[color:var(--charcoal)]">{row.key}</td>
                    <td className="py-2 text-[color:var(--gray-soft)]">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabsContent>
          <TabsContent value="how" className="rounded-2xl bg-white p-6 text-sm leading-relaxed">{product.howToUse}</TabsContent>
          <TabsContent value="rev" className="rounded-2xl bg-white p-6" id="reviews">
            <div className="grid gap-6 sm:grid-cols-[200px_1fr]">
              <div className="text-center">
                <p className="font-display text-5xl font-extrabold text-[color:var(--charcoal)]">{product.rating}</p>
                <div className="mt-1 flex justify-center">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-[color:var(--yellow)] text-[color:var(--yellow)]" : "text-gray-300"}`} />))}</div>
                <p className="mt-1 text-xs text-[color:var(--gray-soft)]">{product.reviewCount} reviews</p>
              </div>
              <div className="space-y-1.5">
                {[{ s: 5, p: 68 }, { s: 4, p: 20 }, { s: 3, p: 8 }, { s: 2, p: 3 }, { s: 1, p: 1 }].map((b) => (
                  <div key={b.s} className="flex items-center gap-2 text-xs">
                    <span className="w-4 font-semibold">{b.s}★</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                      <div className="h-full bg-[color:var(--yellow)]" style={{ width: `${b.p}%` }} />
                    </div>
                    <span className="w-10 text-right text-[color:var(--gray-soft)]">{b.p}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {REVIEWS.map((r, i) => (
                <div key={i} className="rounded-xl border p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--coral)] font-bold text-white">{r.avatar}</div>
                    <div className="flex-1">
                      <p className="font-semibold">{r.user}</p>
                      <p className="text-xs text-[color:var(--gray-soft)]">{r.date}</p>
                    </div>
                    <div className="flex">{Array.from({ length: 5 }).map((_, j) => (<Star key={j} className={`h-3.5 w-3.5 ${j < r.rating ? "fill-[color:var(--yellow)] text-[color:var(--yellow)]" : "text-gray-300"}`} />))}</div>
                  </div>
                  <p className="mt-2 text-sm">{r.text}</p>
                  <button className="mt-2 inline-flex items-center gap-1 text-xs text-[color:var(--gray-soft)] hover:text-[color:var(--coral)]"><ThumbsUp className="h-3 w-3" /> Helpful ({r.helpful})</button>
                </div>
              ))}
            </div>

            <button onClick={() => setShowReview(true)} className="mt-6 inline-flex h-11 items-center rounded-full bg-[color:var(--coral)] px-6 font-semibold text-white">Write a Review</button>
          </TabsContent>
        </Tabs>

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-6 font-display text-2xl font-extrabold">You may also like</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">{related.map((p) => (<ProductCard key={p.id} product={p} />))}</div>
          </section>
        )}
      </main>

      {zoom && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4" onClick={() => setZoom(false)}>
          <img src={product.images?.[activeImg] ?? product.image} alt="" className="max-h-full max-w-full rounded-2xl" />
        </div>
      )}

      {showReview && <ReviewModal onClose={() => setShowReview(false)} />}
      <Footer />
    </div>
  );
}

function ReviewModal({ onClose }: { onClose: () => void }) {
  const [rating, setRating] = useState(0);
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6">
        <h3 className="font-display text-xl font-extrabold">Write a Review</h3>
        <div className="mt-4">
          <p className="text-sm font-semibold">Your Rating</p>
          <div className="mt-1 flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} onClick={() => setRating(s)}>
                <Star className={`h-7 w-7 ${s <= rating ? "fill-[color:var(--yellow)] text-[color:var(--yellow)]" : "text-gray-300"}`} />
              </button>
            ))}
          </div>
        </div>
        <input className="mt-4 w-full rounded-xl border px-3 py-2 text-sm" placeholder="Review title" />
        <textarea className="mt-3 h-28 w-full rounded-xl border px-3 py-2 text-sm" placeholder="Share your experience…" />
        <input type="file" accept="image/*" className="mt-3 w-full text-xs" />
        <div className="mt-5 flex gap-2">
          <button onClick={onClose} className="flex-1 rounded-full border py-2.5 font-semibold">Cancel</button>
          <button onClick={onClose} className="flex-1 rounded-full bg-[color:var(--coral)] py-2.5 font-semibold text-white">Submit Review</button>
        </div>
      </div>
    </div>
  );
}
