import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import logoAsset from "@/assets/bpac-logo-real.png.asset.json";

const navLinks = [
  { label: "Home", to: "/" as const },
  { label: "Services", to: "/services" as const },
  { label: "About Us", to: "/about" as const },
  { label: "Contact Us", to: "/contact" as const },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        scrolled ? "shadow-[0_2px_10px_rgba(0,0,0,0.08)]" : "shadow-[0_1px_0_rgba(0,0,0,0.04)]"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1180px] items-center gap-6 px-5 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center" aria-label="BPAC Vet — Home">
          <img
            src={logoAsset.url}
            alt="Birds and Pet Animal Clinic"
            className="h-[52px] w-auto object-contain"
            style={{ mixBlendMode: "multiply" }}
          />
        </Link>

        <nav className="ml-auto hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => {
            const isActive = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.label}
                to={l.to}
                className={`text-[15px] transition-colors ${
                  isActive
                    ? "font-semibold text-[var(--teal)]"
                    : "font-medium text-[var(--ink)] hover:text-[var(--teal)]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href="tel:+8801700000000"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-[var(--emergency)] px-5 text-[14px] font-semibold text-white transition hover:bg-[#a4301f]"
          >
            <Phone className="h-4 w-4" /> Emergency
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="ml-auto grid h-10 w-10 place-items-center rounded-md text-[var(--ink)] hover:bg-[var(--teal-tint)] lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] bg-white lg:hidden">
          <div className="flex h-[76px] items-center justify-between px-5">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center">
              <img
                src={logoAsset.url}
                alt="BPAC Vet"
                className="h-[44px] w-auto object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-md hover:bg-[var(--teal-tint)]"
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
                className="rounded-md px-4 py-4 text-lg font-semibold text-[var(--ink)] hover:bg-[var(--teal-tint)] hover:text-[var(--teal)]"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="tel:+8801700000000"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[var(--emergency)] px-4 text-base font-semibold text-white"
            >
              <Phone className="h-4 w-4" /> Emergency
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
