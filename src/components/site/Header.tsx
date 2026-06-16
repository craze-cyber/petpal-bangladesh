import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart";

const navLinks = [
  { label: "Home", to: "/" as const },
  { label: "Services", to: "/services" as const },
  { label: "Shop", to: "/shop" as const },
  { label: "Adopt", to: "/about" as const },
  { label: "Community", to: "/blog" as const },
  { label: "Contact", to: "/contact" as const },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        scrolled ? "shadow-[0_2px_12px_rgba(0,0,0,0.08)]" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-6 px-5 sm:h-20 sm:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-[var(--forest)] font-display text-base font-bold text-white">
            P
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-[var(--forest)] sm:text-xl">
            Pet Bond <span className="text-[var(--gold)]">BD</span>
          </span>
        </Link>

        <nav className="ml-2 hidden flex-1 items-center gap-7 lg:flex">
          {navLinks.map((l) => {
            const isActive = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.label}
                to={l.to}
                className={`text-[15px] font-medium transition-colors ${
                  isActive ? "text-[var(--gold)]" : "text-[var(--ink)] hover:text-[var(--gold)]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative hidden h-10 items-center text-sm font-medium text-[var(--ink)] hover:text-[var(--gold)] sm:inline-flex"
          >
            Cart
            {count > 0 && (
              <span className="ml-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--gold)] px-1.5 text-[11px] font-bold text-[var(--ink)]">
                {count}
              </span>
            )}
          </Link>
          <Link
            to="/login"
            className="hidden h-10 items-center rounded-md bg-[var(--forest)] px-5 text-[15px] font-semibold text-white transition hover:bg-[var(--forest-dark)] sm:inline-flex"
          >
            Post a Pet
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center rounded-md text-[var(--ink)] hover:bg-[var(--cream)] lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] bg-white lg:hidden">
          <div className="flex h-16 items-center justify-between px-5 sm:h-20">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-[var(--forest)] font-display text-base font-bold text-white">P</span>
              <span className="font-display text-lg font-bold text-[var(--forest)]">Pet Bond <span className="text-[var(--gold)]">BD</span></span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-md hover:bg-[var(--cream)]"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-6 pt-4">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-4 text-lg font-semibold text-[var(--ink)] hover:bg-[var(--cream)] hover:text-[var(--gold)]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex h-12 items-center justify-center rounded-md bg-[var(--forest)] px-4 text-base font-semibold text-white"
            >
              Post a Pet
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
