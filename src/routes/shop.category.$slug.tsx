import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, Filter, Grid2x2, List, X } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/shop/ProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  PRODUCTS,
  CATEGORIES,
  PET_TYPES,
  BRANDS,
  type Product,
} from "@/lib/shop-data";

export const Route = createFileRoute("/shop/category/$slug")({
  component: CategoryPage,
});

const SORTS = [
  { v: "popular", l: "Most Popular" },
  { v: "low", l: "Price: Low to High" },
  { v: "high", l: "Price: High to Low" },
  { v: "new", l: "Newest" },
  { v: "rated", l: "Best Rated" },
];

function CategoryPage() {
  const { slug } = Route.useParams();
  const cat = CATEGORIES.find((c) => c.slug === slug);
  const pet = PET_TYPES.find((p) => p.slug === slug);
  const title = cat?.label ?? pet?.label ?? "All Products";

  const initial = useMemo(() => {
    if (cat) return PRODUCTS.filter((p) => p.category === slug);
    if (pet) return PRODUCTS.filter((p) => p.petType === slug);
    return PRODUCTS;
  }, [slug, cat, pet]);

  const [petTypes, setPetTypes] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number]>([0, 10000]);
  const [ratingFilter, setRatingFilter] = useState(false);
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [drawer, setDrawer] = useState(false);

  const filtered = useMemo(() => {
    let r = initial.filter((p) => p.price >= price[0] && p.price <= price[1]);
    if (petTypes.length) r = r.filter((p) => petTypes.includes(p.petType));
    if (brands.length) r = r.filter((p) => brands.includes(p.brand));
    if (ratingFilter) r = r.filter((p) => p.rating >= 4);
    if (inStock) r = r.filter((p) => p.stock > 0);
    if (sort === "low") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "high") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "rated") r = [...r].sort((a, b) => b.rating - a.rating);
    if (sort === "new") r = [...r].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    return r;
  }, [initial, petTypes, brands, price, ratingFilter, inStock, sort]);

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const clearAll = () => {
    setPetTypes([]); setBrands([]); setPrice([0, 10000]); setRatingFilter(false); setInStock(false);
  };

  const Filters = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-extrabold">Filter Products</h3>
        <button onClick={clearAll} className="text-xs font-semibold text-[color:var(--coral)] hover:underline">Clear All</button>
      </div>
      <div>
        <p className="mb-2 text-sm font-bold">Pet Type</p>
        <div className="space-y-2">
          {PET_TYPES.map((p) => (
            <label key={p.slug} className="flex cursor-pointer items-center gap-2 text-sm">
              <Checkbox checked={petTypes.includes(p.slug)} onCheckedChange={() => toggle(petTypes, setPetTypes, p.slug)} />
              <span>{p.icon} {p.label.replace("For ", "")}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-bold">Brand</p>
        <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
          {BRANDS.map((b) => (
            <label key={b} className="flex cursor-pointer items-center gap-2 text-sm">
              <Checkbox checked={brands.includes(b)} onCheckedChange={() => toggle(brands, setBrands, b)} />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm font-bold">Price Range</p>
        <Slider value={price} onValueChange={(v) => setPrice([v[0], v[1]] as [number, number])} min={0} max={10000} step={50} />
        <div className="mt-2 flex justify-between text-xs text-[color:var(--gray-soft)]">
          <span>৳{price[0]}</span><span>৳{price[1]}</span>
        </div>
      </div>
      <label className="flex cursor-pointer items-center gap-2 text-sm">
        <Checkbox checked={ratingFilter} onCheckedChange={(v) => setRatingFilter(!!v)} />
        <span>★ 4 & above</span>
      </label>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">In Stock Only</span>
        <Switch checked={inStock} onCheckedChange={setInStock} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <nav className="mb-4 text-sm text-[color:var(--gray-soft)]">
          <Link to="/shop" className="hover:text-[color:var(--coral)]">Shop</Link>
          <span className="mx-2">›</span>
          <span className="text-[color:var(--charcoal)]">{title}</span>
        </nav>
        <h1 className="font-display text-3xl font-extrabold text-[color:var(--charcoal)] sm:text-4xl">{title}</h1>

        <div className="mt-6 flex gap-6">
          <aside className="hidden w-[280px] shrink-0 lg:block">
            <div className="sticky top-24 rounded-2xl border bg-white p-5">{Filters}</div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-3 shadow-sm">
              <p className="text-sm text-[color:var(--gray-soft)]">
                Showing <span className="font-bold text-[color:var(--charcoal)]">{filtered.length}</span> products
              </p>
              <div className="flex items-center gap-2">
                <button onClick={() => setDrawer(true)} className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm lg:hidden">
                  <Filter className="h-4 w-4" /> Filters
                </button>
                <div className="relative">
                  <select value={sort} onChange={(e) => setSort(e.target.value)} className="appearance-none rounded-full border bg-white py-2 pl-4 pr-9 text-sm font-semibold">
                    {SORTS.map((s) => (<option key={s.v} value={s.v}>{s.l}</option>))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                </div>
                <div className="hidden gap-1 sm:flex">
                  <button onClick={() => setView("grid")} aria-label="Grid" className={`grid h-9 w-9 place-items-center rounded-full ${view === "grid" ? "bg-[color:var(--coral)] text-white" : "bg-white border"}`}><Grid2x2 className="h-4 w-4" /></button>
                  <button onClick={() => setView("list")} aria-label="List" className={`grid h-9 w-9 place-items-center rounded-full ${view === "list" ? "bg-[color:var(--coral)] text-white" : "bg-white border"}`}><List className="h-4 w-4" /></button>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="mt-10 rounded-2xl bg-white p-10 text-center">
                <p className="text-lg font-semibold">No products match your filters</p>
                <button onClick={clearAll} className="mt-3 text-sm font-semibold text-[color:var(--coral)] hover:underline">Clear filters</button>
              </div>
            ) : view === "grid" ? (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => (<ProductCard key={p.id} product={p} />))}
              </div>
            ) : (
              <div className="mt-4 space-y-3">{filtered.map((p) => (<ListRow key={p.id} p={p} />))}</div>
            )}
          </div>
        </div>
      </main>

      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawer(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-extrabold">Filters</h3>
              <button onClick={() => setDrawer(false)}><X className="h-5 w-5" /></button>
            </div>
            {Filters}
            <button onClick={() => setDrawer(false)} className="mt-5 w-full rounded-full bg-[color:var(--coral)] py-3 font-semibold text-white">Apply</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

function ListRow({ p }: { p: Product }) {
  return (
    <Link to="/shop/product/$id" params={{ id: p.id }} className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm hover:shadow-md">
      <img src={p.image} alt={p.name} className="h-28 w-28 shrink-0 rounded-xl object-cover" />
      <div className="flex flex-1 flex-col">
        <h3 className="font-display font-bold text-[color:var(--charcoal)]">{p.name}</h3>
        <p className="text-xs text-[color:var(--gray-soft)]">{p.brand} • ★ {p.rating}</p>
        <div className="mt-auto flex items-baseline gap-2">
          <span className="font-display text-lg font-extrabold text-[color:var(--coral)]">৳{p.price.toLocaleString()}</span>
          {p.originalPrice && <span className="text-xs text-[color:var(--gray-soft)] line-through">৳{p.originalPrice.toLocaleString()}</span>}
        </div>
      </div>
    </Link>
  );
}
