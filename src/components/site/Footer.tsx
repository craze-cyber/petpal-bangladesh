import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[var(--footer-dark)] text-white/75">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-[var(--forest)] font-display text-base font-bold text-white">P</span>
            <span className="font-display text-xl font-bold text-white">
              Pet Bond <span className="text-[var(--gold)]">BD</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Connecting pet lovers across Bangladesh.
          </p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="grid h-10 w-10 place-items-center rounded-md bg-white/5 transition hover:bg-[var(--gold)] hover:text-[var(--ink)]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol
          title="Quick Links"
          items={[
            { label: "Home", to: "/" },
            { label: "Services", to: "/services" },
            { label: "Shop", to: "/shop" },
            { label: "About", to: "/about" },
            { label: "Blog", to: "/blog" },
          ]}
        />
        <FooterCol
          title="Services"
          items={[
            { label: "Veterinary Care", to: "/services" },
            { label: "Pet Grooming", to: "/services" },
            { label: "Adoption", to: "/about" },
            { label: "Pet Shop", to: "/shop" },
          ]}
        />

        <div>
          <h4 className="font-display text-base font-semibold text-white">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" /> Dhaka, Bangladesh</li>
            <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" /> hello@petbonbd.com</li>
            <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" /> +880 1700-000000</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-white/50 sm:flex-row sm:px-8">
          <p>© 2025 Pet Bond BD. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="font-display text-base font-semibold text-white">{title}</h4>
      <ul className="mt-4 space-y-3 text-sm">
        {items.map((i) => (
          <li key={i.label}>
            <Link to={i.to} className="transition hover:text-[var(--gold)]">{i.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
