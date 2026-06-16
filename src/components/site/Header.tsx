import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Phone, ShoppingCart, Bell, User, Home, Calendar, PawPrint } from "lucide-react";
import logoAsset from "@/assets/bpac-logo-real.png.asset.json";

const navLinks: { label: string; href: string; internal?: boolean }[] = [
  { label: "Home", href: "/", internal: true },
  { label: "Shop", href: "/shop", internal: true },
  { label: "Clinic", href: "/clinic" },
  { label: "Lab", href: "/lab" },
  { label: "Grooming", href: "/grooming" },
  { label: "About", href: "/about", internal: true },
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
    <>
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow ${
          scrolled ? "shadow-[0_2px_10px_rgba(0,0,0,0.08)]" : "shadow-[0_1px_0_rgba(0,0,0,0.04)]"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1200px] items-center gap-4 px-5 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center" aria-label="BPAC Vet — Home">
            <img
              src={logoAsset.url}
              alt="Birds and Pet Animal Clinic"
              className="h-[52px] w-auto object-contain"
              style={{ mixBlendMode: "multiply" }}
            />
          </Link>

          <nav className="ml-6 hidden items-center gap-6 lg:flex">
            {navLinks.map((l) => {
              const isActive = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              const cls = `text-[15px] transition-colors duration-200 ${
                isActive
                  ? "font-semibold text-[var(--teal)]"
                  : "font-medium text-[var(--ink)] hover:text-[var(--teal)]"
              }`;
              return l.internal ? (
                <Link key={l.label} to={l.href as "/"} className={cls}>{l.label}</Link>
              ) : (
                <a key={l.label} href={l.href} className={cls}>{l.label}</a>
              );
            })}
          </nav>

          <div className="ml-auto hidden items-center gap-3 lg:flex">
            <Link to="/cart" className="relative grid h-10 w-10 place-items-center rounded-md text-[var(--ink)] hover:bg-[var(--teal-tint)] hover:text-[var(--teal)]" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--gold)] px-1 text-[10px] font-bold text-white">0</span>
            </Link>
            <button className="grid h-10 w-10 place-items-center rounded-md text-[var(--ink)] hover:bg-[var(--teal-tint)] hover:text-[var(--teal)]" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </button>
            <Link to="/login" className="grid h-10 w-10 place-items-center rounded-full bg-[var(--teal-tint)] text-[var(--teal)] hover:bg-[var(--teal)] hover:text-white" aria-label="Login">
              <User className="h-5 w-5" />
            </Link>
            <a
              href="tel:+8801700000000"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-[var(--emergency)] px-4 text-[14px] font-semibold text-white transition hover:bg-[#a4301f]"
            >
              <Phone className="h-4 w-4" /> Emergency
            </a>
          </div>

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
                <img src={logoAsset.url} alt="BPAC Vet" className="h-[44px] w-auto object-contain" style={{ mixBlendMode: "multiply" }} />
              </Link>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-md hover:bg-[var(--teal-tint)]">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-6 pt-4">
              {navLinks.map((l) =>
                l.internal ? (
                  <Link key={l.label} to={l.href as "/"} onClick={() => setOpen(false)} className="rounded-md px-4 py-4 text-lg font-semibold text-[var(--ink)] hover:bg-[var(--teal-tint)] hover:text-[var(--teal)]">{l.label}</Link>
                ) : (
                  <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="rounded-md px-4 py-4 text-lg font-semibold text-[var(--ink)] hover:bg-[var(--teal-tint)] hover:text-[var(--teal)]">{l.label}</a>
                ),
              )}
              <a href="tel:+8801700000000" onClick={() => setOpen(false)} className="mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[var(--emergency)] px-4 text-base font-semibold text-white">
                <Phone className="h-4 w-4" /> Emergency
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 border-t border-black/5 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.06)] lg:hidden">
        {[
          { label: "Home", icon: Home, to: "/" as const, internal: true },
          { label: "Shop", icon: ShoppingCart, to: "/shop" as const, internal: true },
          { label: "Book", icon: Calendar, href: "/clinic" },
          { label: "Adopt", icon: PawPrint, href: "/adopt" },
          { label: "Profile", icon: User, to: "/login" as const, internal: true },
        ].map((i: any) => {
          const Icon = i.icon;
          const inner = (
            <>
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{i.label}</span>
            </>
          );
          const cls = "flex flex-col items-center justify-center gap-1 py-2 text-[var(--gray-cool)] hover:text-[var(--teal)]";
          return i.internal ? (
            <Link key={i.label} to={i.to} className={cls}>{inner}</Link>
          ) : (
            <a key={i.label} href={i.href} className={cls}>{inner}</a>
          );
        })}
      </div>
    </>
  );
}
