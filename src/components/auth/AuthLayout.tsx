import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/bpac-logo.png.asset.json";

export function AuthLayout({
  children,
  title,
  subtitle,
  step,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  step?: { current: number; total: number; labels: string[] };
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFF5F5] via-white to-[#E8FBF9]">
      <PawPattern />
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col px-4 py-6 sm:max-w-lg sm:py-12">
        <Link to="/" className="mx-auto mb-6 inline-flex items-center gap-3">
          <img src={logo.url} alt="BPAC" className="h-12 w-auto" />
          <span className="font-display text-xl font-extrabold text-[color:var(--coral)]">BPAC</span>
        </Link>

        <div className="flex-1 rounded-none bg-white px-6 py-8 shadow-none sm:rounded-3xl sm:px-10 sm:py-10 sm:shadow-[0_10px_40px_rgba(255,107,107,0.12)]">
          {step && <StepIndicator {...step} />}
          {(title || subtitle) && (
            <div className="mb-6 text-center">
              {title && (
                <h1 className="font-display text-2xl font-extrabold text-[color:var(--charcoal)] sm:text-3xl">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-2 text-sm text-[color:var(--gray-soft)]">{subtitle}</p>
              )}
            </div>
          )}
          {children}
        </div>

        <p className="mt-6 text-center text-xs text-[color:var(--gray-soft)]">
          © 2024 Birds and Pet Animal Clinic — Bangladesh
        </p>
      </div>
    </div>
  );
}

function StepIndicator({
  current,
  total,
  labels,
}: {
  current: number;
  total: number;
  labels: string[];
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: total }).map((_, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <div key={i} className="flex flex-1 items-center">
              <div
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold transition ${
                  done
                    ? "bg-[color:var(--success)] text-white"
                    : active
                      ? "bg-[color:var(--coral)] text-white shadow-[0_6px_18px_rgba(255,107,107,0.4)]"
                      : "bg-[color:var(--pink-soft)] text-[color:var(--coral)]"
                }`}
              >
                {done ? "✓" : i + 1}
              </div>
              {i < total - 1 && (
                <div
                  className={`mx-2 h-0.5 flex-1 rounded-full ${
                    done ? "bg-[color:var(--success)]" : "bg-[color:var(--pink-soft)]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex justify-between text-[10px] font-semibold uppercase tracking-wide text-[color:var(--gray-soft)] sm:text-xs">
        {labels.map((l, i) => (
          <span
            key={l}
            className={i === current ? "text-[color:var(--coral)]" : ""}
            style={{ width: `${100 / total}%`, textAlign: i === 0 ? "left" : i === total - 1 ? "right" : "center" }}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

function PawPattern() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="paws" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <g fill="#FF6B6B">
            <circle cx="30" cy="40" r="6" />
            <circle cx="20" cy="28" r="4" />
            <circle cx="32" cy="24" r="4" />
            <circle cx="44" cy="28" r="4" />
            <circle cx="50" cy="40" r="4" />
            <circle cx="90" cy="90" r="6" />
            <circle cx="80" cy="78" r="4" />
            <circle cx="92" cy="74" r="4" />
            <circle cx="104" cy="78" r="4" />
            <circle cx="110" cy="90" r="4" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#paws)" />
    </svg>
  );
}
