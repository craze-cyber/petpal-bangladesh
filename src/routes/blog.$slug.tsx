import { useMemo, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Clock,
  Calendar,
  Facebook,
  MessageCircle,
  Link as LinkIcon,
  Heart,
  ArrowLeft,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { posts, type BlogPost } from "@/lib/blog-data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    if (!p) return {};
    return {
      meta: [
        { title: `${p.title} — BPAC Blog` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:image", content: p.cover },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <h1 className="font-display text-4xl font-extrabold">Article not found</h1>
        <Link to="/blog" className="mt-4 inline-block text-[color:var(--coral)] underline">
          Back to blog
        </Link>
      </div>
    </div>
  ),
  component: BlogDetail,
});

const sampleComments = [
  {
    name: "Nabila R.",
    avatar: "https://i.pravatar.cc/80?img=47",
    date: "2 days ago",
    text: "এটা পড়ে অনেক কিছু শিখলাম। ধন্যবাদ BPAC!",
    likes: 12,
  },
  {
    name: "Imran K.",
    avatar: "https://i.pravatar.cc/80?img=33",
    date: "5 days ago",
    text: "Really helpful — booked a checkup with Dr. Farhan right after reading.",
    likes: 8,
  },
];

function BlogDetail() {
  const { post } = Route.useLoaderData();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const headings = useMemo(
    () => post.content.filter((b) => b.type === "h2"),
    [post.content],
  );

  const [comment, setComment] = useState("");
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[color:var(--background)] text-[color:var(--charcoal)]">
      <Header />

      <div className="relative h-[40vh] min-h-[280px] w-full overflow-hidden sm:h-[55vh]">
        <img src={post.cover} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl px-4 pb-10 text-white sm:px-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur hover:bg-white/25"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All articles
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full bg-[color:var(--coral)] px-3 py-1 font-bold uppercase tracking-wide">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {post.readTime}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {post.date}
            </span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-5xl">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:grid lg:grid-cols-[1fr,260px] lg:gap-12 lg:px-8">
        <article>
          {/* Author card */}
          <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-14 w-14 rounded-full object-cover ring-4 ring-[color:var(--pink-soft)]"
            />
            <div>
              <p className="font-display text-base font-extrabold">{post.author.name}</p>
              <p className="text-xs text-[color:var(--gray-soft)]">{post.author.credentials}</p>
            </div>
          </div>

          {/* Content */}
          <div className="prose-bpac mt-8 space-y-5">
            {post.content.map((b, i) => <Block key={i} block={b} />)}
          </div>

          {/* Share */}
          <div className="mt-12 rounded-2xl border bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--gray-soft)]">
              Share this article
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " " + shareUrl)}`}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full bg-[#1877f2] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                <Facebook className="h-4 w-4" /> Facebook
              </a>
              <button
                onClick={onCopy}
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--pink-soft)] px-4 py-2 text-sm font-semibold text-[color:var(--charcoal)] hover:bg-[color:var(--coral)]/15"
              >
                <LinkIcon className="h-4 w-4" /> {copied ? "Copied!" : "Copy link"}
              </button>
            </div>
          </div>

          {/* Comments */}
          <section className="mt-12">
            <h3 className="font-display text-2xl font-extrabold">Comments</h3>
            <div className="mt-6 space-y-5">
              {sampleComments.map((c, i) => (
                <div key={i} className="flex gap-3">
                  <img src={c.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                  <div className="flex-1 rounded-2xl bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold">{c.name}</p>
                      <span className="text-xs text-[color:var(--gray-soft)]">{c.date}</span>
                    </div>
                    <p className="mt-1 text-sm text-[color:var(--charcoal)]">{c.text}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-[color:var(--gray-soft)]">
                      <button className="inline-flex items-center gap-1 hover:text-[color:var(--coral)]">
                        <Heart className="h-3.5 w-3.5" /> {c.likes}
                      </button>
                      <button className="hover:text-[color:var(--coral)]">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!comment.trim()) return;
                alert("Please log in to post a comment.");
              }}
              className="mt-8 rounded-2xl bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-semibold">Add a comment</p>
              <p className="text-xs text-[color:var(--gray-soft)]">
                You'll need to log in to post.
              </p>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="Share your thoughts…"
                className="mt-3 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] p-3 text-sm focus:border-[color:var(--coral)] focus:outline-none"
              />
              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex h-10 items-center rounded-full bg-[color:var(--coral)] px-5 text-sm font-semibold text-white hover:bg-[color:var(--coral-dark)]"
                >
                  Post comment
                </button>
              </div>
            </form>
          </section>
        </article>

        <aside className="mt-12 hidden lg:mt-0 lg:block">
          <div className="sticky top-24 rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--gray-soft)]">
              On this page
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {headings.map((h, i) => (
                <li key={i}>
                  <a
                    href={`#h-${i}`}
                    className="block rounded-lg px-2 py-1 text-[color:var(--charcoal)] hover:bg-[color:var(--pink-soft)] hover:text-[color:var(--coral)]"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
              {headings.length === 0 && (
                <li className="text-[color:var(--gray-soft)]">No sections</li>
              )}
            </ul>
          </div>
        </aside>
      </div>

      {/* Related */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <h3 className="font-display text-2xl font-extrabold">Related posts</h3>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group block overflow-hidden rounded-3xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={p.cover}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="text-[11px] font-bold uppercase tracking-wide text-[color:var(--coral)]">
                  {p.category}
                </span>
                <h4 className="mt-2 line-clamp-2 font-display text-base font-extrabold">
                  {p.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Mobile sticky share */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t bg-white/95 p-3 backdrop-blur lg:hidden">
        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " " + shareUrl)}`}
          target="_blank"
          rel="noopener"
          className="flex-1 rounded-full bg-[#25d366] py-3 text-center text-sm font-bold text-white"
        >
          WhatsApp
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener"
          className="flex-1 rounded-full bg-[#1877f2] py-3 text-center text-sm font-bold text-white"
        >
          Facebook
        </a>
        <button
          onClick={onCopy}
          className="rounded-full bg-[color:var(--pink-soft)] px-4 text-sm font-bold"
        >
          {copied ? "✓" : "Copy"}
        </button>
      </div>

      <Footer />
    </div>
  );
}

function Block({ block }: { block: BlogPost["content"][number] }) {
  if (block.type === "h2") {
    return (
      <h2
        id={`h-${block.text}`}
        className="font-display text-2xl font-extrabold sm:text-3xl"
      >
        {block.text}
      </h2>
    );
  }
  if (block.type === "p") {
    return <p className="text-base leading-relaxed text-[color:var(--charcoal)]">{block.text}</p>;
  }
  if (block.type === "ul") {
    return (
      <ul className="list-disc space-y-1.5 pl-6 text-base text-[color:var(--charcoal)]">
        {block.items?.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    );
  }
  if (block.type === "quote") {
    return (
      <blockquote className="rounded-r-2xl border-l-4 border-[color:var(--coral)] bg-[color:var(--pink-soft)] px-5 py-4 font-display text-lg italic text-[color:var(--charcoal)]">
        “{block.text}”
      </blockquote>
    );
  }
  return null;
}
