import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Linkedin } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FadeUp } from "@/components/site/Motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — BPAC Vet | Birds and Pet Animal Clinic" },
      {
        name: "description",
        content:
          "Since 2020, BPAC Vet has been Bangladesh's trusted veterinary care platform for birds and all pet animals.",
      },
      { property: "og:title", content: "About BPAC Vet" },
      {
        property: "og:description",
        content: "Bangladesh's trusted veterinary care platform — clinic, shop, lab and grooming in one place.",
      },
    ],
  }),
  component: AboutPage,
});

const mission = [
  { icon: "🐦", text: "Specialized care for birds and exotic pets across Bangladesh" },
  { icon: "🏥", text: "Connect pets with qualified vets available 24/7" },
  { icon: "🌐", text: "Build Bangladesh's most trusted pet health platform" },
];

const team = [
  {
    name: "Dr. Farhan Ahmed",
    role: "Chief Veterinary Officer",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&auto=format&fit=crop",
  },
  {
    name: "Rashida Khanom",
    role: "Founder & CEO",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop",
  },
  {
    name: "Tanvir Hassan",
    role: "Head of Technology",
    photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&auto=format&fit=crop",
  },
  {
    name: "Sadia Islam",
    role: "Head of Grooming Services",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop",
  },
];

const stats = [
  { icon: "🐦", value: 5000, suffix: "+", label: "Animals Treated" },
  { icon: "👨‍⚕️", value: 12, suffix: "+", label: "Expert Vet Team" },
  { icon: "📍", value: 1, suffix: "", label: "Dhaka & Expanding" },
  { icon: "⭐", value: 4.9, suffix: "", label: "Average Rating", decimals: 1 },
];

function useCountUp(end: number, decimals = 0, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const dur = 1600;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setVal(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, start]);
  return decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString();
}

function AboutPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[color:var(--bg-clinic)] text-[color:var(--charcoal)]">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[color:var(--teal)] via-[#0d7878] to-[color:var(--teal-dark)] py-24 text-white">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <FadeUp>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[color:var(--gold)]">
              About BPAC Vet
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
              Bangladesh's Trusted Veterinary Care Platform
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85">
              Since 2020, BPAC Vet has been dedicated to providing expert care for birds and all pet animals across Bangladesh.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
          <FadeUp>
            <p className="text-sm font-bold uppercase tracking-widest text-[color:var(--teal)]">Our Story</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
              From a small clinic to a national platform
            </h2>
            <div className="mt-6 space-y-4 text-[color:var(--gray-soft)]">
              <p>
                We started BPAC Vet after recognizing that birds and exotic pet owners in Bangladesh had very limited access to specialized veterinary care.
              </p>
              <p>
                We built a complete platform — clinic, shop, lab, and grooming — all in one place at{" "}
                <a href="https://www.bpacvet.com" className="font-bold text-[color:var(--teal)] hover:underline">
                  www.bpacvet.com
                </a>
                .
              </p>
              <p className="italic text-[color:var(--teal-dark)]">
                "Our primary goal is to serve your animals."
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(11,110,110,0.18)]">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&q=80"
                alt="Veterinarian examining a pet"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeUp>
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-[color:var(--teal)]">Our Mission</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
                What drives BPAC Vet every day
              </h2>
            </div>
          </FadeUp>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {mission.map((m, i) => (
              <FadeUp key={m.text} delay={i * 0.08}>
                <div className="h-full rounded-2xl border-t-4 border-[color:var(--gold)] bg-[color:var(--bg-clinic)] p-8 transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="text-4xl">{m.icon}</div>
                  <p className="mt-4 font-display text-lg font-bold text-[color:var(--charcoal)]">
                    {m.text}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeUp>
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-[color:var(--teal)]">Our People</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
                The People Behind BPAC Vet
              </h2>
            </div>
          </FadeUp>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <FadeUp key={m.name} delay={i * 0.06}>
                <div className="rounded-2xl bg-white p-6 text-center shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition hover:-translate-y-1">
                  <div className="mx-auto h-32 w-32 overflow-hidden rounded-full ring-4 ring-[color:var(--teal-tint)]">
                    <img src={m.photo} alt={m.name} className="h-full w-full object-cover" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-extrabold">{m.name}</h3>
                  <p className="mt-1 text-sm text-[color:var(--teal)]">{m.role}</p>
                  <a
                    href="#"
                    aria-label={`${m.name} on LinkedIn`}
                    className="mt-3 inline-grid h-9 w-9 place-items-center rounded-full bg-[color:var(--teal)]/10 text-[color:var(--teal)] transition hover:bg-[color:var(--teal)] hover:text-white"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[color:var(--teal-dark)] py-20 text-white" ref={statsRef}>
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {stats.map((s) => {
            const v = useCountUp(s.value, s.decimals ?? 0, inView);
            return (
              <div key={s.label} className="text-center">
                <div className="text-4xl">{s.icon}</div>
                <div className="mt-3 font-display text-4xl font-extrabold text-[color:var(--gold)] sm:text-5xl">
                  {v}
                  {s.suffix}
                </div>
                <p className="mt-2 text-sm text-white/80">{s.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
