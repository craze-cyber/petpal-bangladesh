import { Link } from "@tanstack/react-router";
import { Facebook, Youtube, MapPin, Globe, Phone, Clock } from "lucide-react";
import logoAsset from "@/assets/bpac-logo-real.png.asset.json";

export function Footer() {
  return (
    <footer className="bg-[var(--teal-dark)] text-white/85">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-6 py-16 lg:grid-cols-3">
        <div>
          <div className="inline-block rounded-md bg-white/95 px-3 py-2">
            <img
              src={logoAsset.url}
              alt="Birds and Pet Animal Clinic"
              className="h-[64px] w-auto object-contain"
            />
          </div>
          <p className="mt-5 font-display text-base font-bold text-white">Birds and Pet Animal Clinic</p>
          <p className="mt-1 text-sm italic text-white/75">"Our primary goal is to serve your animals."</p>
          <a href="https://www.bpacvet.com" className="mt-2 inline-block text-sm text-[var(--gold)] hover:underline">www.bpacvet.com</a>
          <div className="mt-5 flex gap-2">
            {[Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="grid h-10 w-10 place-items-center rounded-md bg-white/10 transition hover:bg-[var(--gold)] hover:text-[var(--ink)]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-base font-bold text-white">Quick Links</h4>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { label: "Home", to: "/" as const },
              { label: "Services", to: "/services" as const },
              { label: "About Us", to: "/about" as const },
              { label: "Contact Us", to: "/contact" as const },
            ].map((i) => (
              <li key={i.label}>
                <Link to={i.to} className="transition hover:text-[var(--gold)]">{i.label}</Link>
              </li>
            ))}
            <li>
              <a href="tel:+8801700000000" className="transition hover:text-[var(--gold)]">Emergency Care</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base font-bold text-white">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" /> Dhaka, Bangladesh</li>
            <li className="flex items-start gap-3"><Globe className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" /> www.bpacvet.com</li>
            <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" /> +880 1XXX-XXXXXX</li>
            <li className="flex items-start gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" /> Sat–Thu: 9 AM – 8 PM</li>
          </ul>
        </div>
      </div>

      <div className="bg-[#063939]">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-white/60 sm:flex-row">
          <p>© 2025 Birds and Pet Animal Clinic. All rights reserved.</p>
          <a href="#" className="hover:text-white">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
