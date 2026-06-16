import { Link } from "@tanstack/react-router";
import { Facebook, Youtube, MessageCircle, MapPin, Globe, Phone, Clock } from "lucide-react";
import logoAsset from "@/assets/bpac-logo-real.png.asset.json";

const quickLinks: { label: string; href: string; internal?: boolean }[] = [
  { label: "Home", href: "/", internal: true },
  { label: "Shop", href: "/shop", internal: true },
  { label: "Clinic", href: "/clinic" },
  { label: "Lab", href: "/lab" },
  { label: "Grooming", href: "/grooming" },
  { label: "Blog", href: "/blog", internal: true },
];

const services = [
  "Bird & Exotic Care",
  "Dog & Cat Care",
  "Surgery",
  "Emergency",
  "Vaccination",
];

export function Footer() {
  return (
    <footer className="bg-[var(--teal-dark)] text-white/85">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="inline-block rounded-md bg-white/95 px-3 py-2">
            <img src={logoAsset.url} alt="BPAC Vet" className="h-[60px] w-auto object-contain" />
          </div>
          <p className="mt-5 font-display text-base font-bold text-white">Birds and Pet Animal Clinic</p>
          <p className="mt-1 text-sm italic text-white/75">"Our primary goal is to serve your animals."</p>
          <a href="https://www.bpacvet.com" className="mt-2 inline-block text-sm text-[var(--gold)] hover:underline">www.bpacvet.com</a>
          <div className="mt-5 flex gap-2">
            {[
              { Icon: Facebook, href: "#", label: "Facebook" },
              { Icon: Youtube, href: "#", label: "YouTube" },
              { Icon: MessageCircle, href: "#", label: "WhatsApp" },
            ].map(({ Icon, href, label }) => (
              <a key={label} href={href} aria-label={label} className="grid h-10 w-10 place-items-center rounded-md bg-white/10 transition hover:bg-[var(--gold)] hover:text-[var(--ink)]">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-base font-bold text-white">Quick Links</h4>
          <ul className="mt-4 space-y-3 text-sm">
            {quickLinks.map((i) => (
              <li key={i.label}>
                {i.internal ? (
                  <Link to={i.href as "/"} className="transition hover:text-[var(--gold)]">{i.label}</Link>
                ) : (
                  <a href={i.href} className="transition hover:text-[var(--gold)]">{i.label}</a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base font-bold text-white">Services</h4>
          <ul className="mt-4 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s}><a href="/services" className="transition hover:text-[var(--gold)]">{s}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base font-bold text-white">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" /> Dhaka, Bangladesh</li>
            <li className="flex items-start gap-3"><Globe className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" /> www.bpacvet.com</li>
            <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" /> +880 1700-000000</li>
            <li className="flex items-start gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" /> Sat–Thu: 9 AM – 8 PM<br />Emergency: 24/7</li>
          </ul>
        </div>
      </div>

      <div className="bg-[#063939]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-white/60 sm:flex-row">
          <p>© 2025 Birds and Pet Animal Clinic. All rights reserved.</p>
          <a href="#" className="hover:text-white">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
