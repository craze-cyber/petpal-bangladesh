import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { type Product, formatBDT } from "@/lib/shop-data";
import { useCart } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [wished, setWished] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    try {
      const w = JSON.parse(localStorage.getItem("bpac_wishlist") || "[]");
      setWished(w.includes(product.id));
    } catch {}
  }, [product.id]);

  const toggleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const w = (() => {
      try { return JSON.parse(localStorage.getItem("bpac_wishlist") || "[]") as string[]; } catch { return []; }
    })();
    const next = wished ? w.filter((x) => x !== product.id) : [...w, product.id];
    localStorage.setItem("bpac_wishlist", JSON.stringify(next));
    setWished(!wished);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const outOfStock = product.stock === 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)]">
      <Link
        to="/shop/product/$id"
        params={{ id: product.id }}
        className="relative block aspect-square overflow-hidden bg-[color:var(--pink-soft)]"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 rounded-full bg-[color:var(--coral)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          {product.categoryLabel}
        </span>
        <button
          type="button"
          onClick={toggleWish}
          aria-label="Wishlist"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 shadow-sm transition hover:scale-110"
        >
          <Heart
            className={`h-4 w-4 transition ${
              mounted && wished ? "fill-[color:var(--coral)] text-[color:var(--coral)]" : "text-[color:var(--gray-soft)]"
            }`}
          />
        </button>
        {discount > 0 && (
          <span className="absolute bottom-3 left-3 rounded-full bg-emerald-500 px-2 py-1 text-[10px] font-bold text-white">
            {discount}% OFF
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link to="/shop/product/$id" params={{ id: product.id }}>
          <h3 className="line-clamp-2 font-display text-sm font-bold text-[color:var(--charcoal)] hover:text-[color:var(--coral)]">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-[color:var(--gray-soft)]">{product.brand}</p>
        <div className="flex items-center gap-1 text-xs text-[color:var(--gray-soft)]">
          <Star className="h-3.5 w-3.5 fill-[color:var(--yellow)] text-[color:var(--yellow)]" />
          <span className="font-semibold text-[color:var(--charcoal)]">{product.rating}</span>
          <span>({product.reviewCount})</span>
        </div>
        <div className="mt-auto flex items-baseline gap-2">
          <span className="font-display text-lg font-extrabold text-[color:var(--coral)]">
            {formatBDT(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[color:var(--gray-soft)] line-through">
              {formatBDT(product.originalPrice)}
            </span>
          )}
        </div>
        <button
          type="button"
          disabled={outOfStock}
          onClick={() =>
            add({
              id: product.id,
              name: product.name,
              brand: product.brand,
              image: product.image,
              price: product.price,
            })
          }
          className={`mt-2 inline-flex h-10 items-center justify-center gap-2 rounded-full text-sm font-semibold transition ${
            outOfStock
              ? "cursor-not-allowed bg-gray-200 text-gray-500"
              : "bg-[color:var(--coral)] text-white hover:bg-[color:var(--coral-dark)]"
          }`}
        >
          {outOfStock ? "Out of Stock" : (<><ShoppingCart className="h-4 w-4" /> Add to Cart</>)}
        </button>
      </div>
    </div>
  );
}
