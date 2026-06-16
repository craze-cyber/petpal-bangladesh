import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, ShoppingCart, Bell, Menu, X, User } from "lucide-react";
import logo from "@/assets/bpac-logo.png.asset.json";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/" },
  { label: "Clinic", to: "/" },
  { label: "Lab", to: "/" },
  { label: "Grooming", to: "/" },
  { label: "Blog", to: "/" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active] = useState("Home");

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img src={logo.url} alt="Birds and Pet Animal Clinic" className="h-10 w-auto sm:h-12" />
          <span className="hidden font-display text-lg font-extrabold leading-tight text-[color:var(--coral)] md:block">
            BPAC
          </span>
        </Link>

        <nav className="ml-6 hidden flex-1 items-center gap-1 lg:flex">
          {navLinks.map((l) => {
            const isActive = l.label === active;
            return (
              <Link
                key={l.label}
                to={l.to}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "text-[color:var(--coral)]"
                    : "text-[color:var(--charcoal)] hover:text-[color:var(--coral)]"
                }`}
              >
                {l.label}
                {isActive && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-[color:var(--coral)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <IconBtn label="Search"><Search className="h-5 w-5" /></IconBtn>
          <IconBtn label="Cart" badge="3"><ShoppingCart className="h-5 w-5" /></IconBtn>
          <IconBtn label="Notifications" badge="2"><Bell className="h-5 w-5" /></IconBtn>
          <Link
            to="/login"
            className="hidden h-10 items-center gap-2 rounded-full bg-[color:var(--coral)] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--coral-dark)] sm:inline-flex"
          >
            <User className="h-4 w-4" /> Login
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[color:var(--charcoal)] hover:bg-[color:var(--pink-soft)] lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] bg-white lg:hidden">
          <div className="flex h-16 items-center justify-between px-4 sm:h-20">
            <div className="flex items-center gap-2">
              <img src={logo.url} alt="" className="h-10 w-auto" />
              <span className="font-display text-lg font-extrabold text-[color:var(--coral)]">BPAC</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-[color:var(--pink-soft)]"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-6 pt-6">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-4 text-lg font-semibold text-[color:var(--charcoal)] hover:bg-[color:var(--pink-soft)] hover:text-[color:var(--coral)]"
              >
                {l.label}
              </Link>
            ))}
            <button className="mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[color:var(--coral)] px-4 text-base font-semibold text-white">
              <User className="h-5 w-5" /> Login / Sign up
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

function IconBtn({
  children,
  label,
  badge,
}: {
  children: React.ReactNode;
  label: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-[color:var(--charcoal)] transition hover:bg-[color:var(--pink-soft)] hover:text-[color:var(--coral)]"
    >
      {children}
      {badge && (
        <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-[color:var(--coral)] px-1 text-[10px] font-bold leading-none text-white">
          {badge}
        </span>
      )}
    </button>
  );
}
