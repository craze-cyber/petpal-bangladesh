import { Facebook, Instagram, Youtube, MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";
import logo from "@/assets/bpac-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="bg-[color:var(--charcoal)] text-white/85">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="inline-flex items-center gap-3 rounded-2xl bg-white p-2 pr-4">
            <img src={logo.url} alt="BPAC" className="h-10 w-auto" />
            <span className="font-display text-base font-extrabold text-[color:var(--coral)]">BPAC</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70 font-bn">
            আপনার প্রাণির সেবাই আমাদের প্রধান লক্ষ্য
          </p>
          <p className="mt-1 text-xs text-white/50">Serving your animal is our primary goal.</p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Instagram, Youtube, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-[color:var(--coral)]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Quick Links" items={["Home", "About", "Blog", "Contact", "Careers"]} />
        <FooterCol title="Our Services" items={["Pet Shop", "Vet Clinic", "Pet Lab", "Grooming"]} />

        <div>
          <h4 className="font-display text-base font-extrabold text-white">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--coral)]" /> +880 1700-000000</li>
            <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--coral)]" /> hello@bpac.com.bd</li>
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--coral)]" /> House 12, Road 5, Dhanmondi, Dhaka</li>
            <li className="flex items-start gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--coral)]" /> Sat–Thu: 9am–9pm · Fri: 2pm–9pm</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/55 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2024 Birds and Pet Animal Clinic — Bangladesh</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-display text-base font-extrabold text-white">{title}</h4>
      <ul className="mt-4 space-y-3 text-sm text-white/70">
        {items.map((i) => (
          <li key={i}><a href="#" className="transition hover:text-[color:var(--coral)]">{i}</a></li>
        ))}
      </ul>
    </div>
  );
}
