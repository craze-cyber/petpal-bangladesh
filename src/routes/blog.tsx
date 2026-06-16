import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FadeUp } from "@/components/site/Motion";
import { posts, categories } from "@/lib/blog-data";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Birds and Pet Animal Clinic" },
      {
        name: "description",
        content:
          "Vet-written guides on pet nutrition, health, grooming and training for Bangladeshi pet parents.",
      },
      { property: "og:title", content: "BPAC Blog" },
      {
        property: "og:description",
        content: "Care guides, training tips and pet news from Bangladesh's leading vets.",
      },
    ],
  }),
  component: BlogList,
});

const PER_PAGE = 6;

function BlogList() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesCat = cat === "all" || p.category === cat;
      const matchesQ =
        !query || p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesQ;
    });
  }, [query, cat]);

  const [featured, ...rest] = filtered.length ? filtered : [posts[0]];
  const totalPages = Math.max(1, Math.ceil(rest.length / PER_PAGE));
  const paged = rest.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="min-h-screen bg-[color:var(--background)] text-[color:var(--charcoal)]">
      <Header />

      <section className="bg-gradient-to-br from-[color:var(--pink-soft)] to-white py-14">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <FadeUp>
            <h1 className="font-display text-4xl font-extrabold sm:text-5xl">BPAC Blog</h1>
            <p className="mt-3 text-[color:var(--gray-soft)]">
              Vet-written guides and stories for Bangladeshi pet parents.
            </p>
            <div className="relative mx-auto mt-6 max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[color:var(--gray-soft)]" />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search articles…"
                className="h-14 w-full rounded-full border border-transparent bg-white pl-12 pr-5 text-sm shadow-[0_4px_20px_rgba(0,0,0,0.06)] focus:border-[color:var(--coral)] focus:outline-none"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-4 sm:px-6 lg:px-8 no-scrollbar">
          {categories.map((c) => {
            const active = cat === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setCat(c.id);
                  setPage(1);
                }}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-[color:var(--coral)] text-white shadow"
                    : "bg-[color:var(--pink-soft)] text-[color:var(--charcoal)] hover:bg-[color:var(--coral)]/10"
                }`}
              >
                <span className="mr-1.5">{c.icon}</span>
                {c.label}
              </button>
            );
          })}
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {featured && (
          <FadeUp>
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="group block overflow-hidden rounded-3xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)] md:grid md:grid-cols-2"
            >
              <div className="aspect-[16/10] overflow-hidden md:aspect-auto">
                <img
                  src={featured.cover}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-10">
                <span className="inline-block w-fit rounded-full bg-[color:var(--coral)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Featured · {featured.category}
                </span>
                <h2 className="mt-4 font-display text-2xl font-extrabold leading-snug sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-[color:var(--gray-soft)]">{featured.excerpt}</p>
                <div className="mt-5 flex items-center gap-3 text-sm text-[color:var(--gray-soft)]">
                  <img
                    src={featured.author.avatar}
                    alt=""
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <span className="font-semibold text-[color:var(--charcoal)]">
                    {featured.author.name}
                  </span>
                  <span>·</span>
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {featured.readTime}
                  </span>
                </div>
              </div>
            </Link>
          </FadeUp>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paged.map((p, i) => (
            <FadeUp key={p.slug} delay={i * 0.05}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.cover}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="inline-block w-fit rounded-full bg-[color:var(--coral)]/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[color:var(--coral)]">
                    {p.category}
                  </span>
                  <h3 className="mt-3 line-clamp-2 font-display text-lg font-extrabold leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-[color:var(--gray-soft)]">
                    {p.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4 text-xs text-[color:var(--gray-soft)]">
                    <div className="flex items-center gap-2">
                      <img src={p.author.avatar} alt="" className="h-6 w-6 rounded-full object-cover" />
                      <span className="font-semibold text-[color:var(--charcoal)]">{p.author.name}</span>
                    </div>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {p.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>

        {paged.length === 0 && (
          <p className="py-16 text-center text-[color:var(--gray-soft)]">
            No articles match your search.
          </p>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="grid h-10 w-10 place-items-center rounded-full bg-white shadow disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`h-10 min-w-10 rounded-full px-4 text-sm font-semibold transition ${
                  page === i + 1
                    ? "bg-[color:var(--coral)] text-white"
                    : "bg-white text-[color:var(--charcoal)] hover:bg-[color:var(--pink-soft)]"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="grid h-10 w-10 place-items-center rounded-full bg-white shadow disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
