import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

/* ---------- Field shell ---------- */
export function Field({
  label,
  bn,
  error,
  hint,
  children,
}: {
  label: string;
  bn?: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between text-sm font-bold text-[color:var(--charcoal)]">
        <span>
          {label}
          {bn && <span className="ml-2 font-bn font-semibold text-[color:var(--gray-soft)]">({bn})</span>}
        </span>
      </span>
      <div className={error ? "animate-[shake_0.3s_ease-in-out]" : ""}>{children}</div>
      {error ? (
        <p className="mt-1.5 text-xs font-semibold text-[color:var(--coral)]">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-[color:var(--gray-soft)]">{hint}</p>
      ) : null}
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}`}</style>
    </label>
  );
}

const inputBase =
  "h-12 w-full rounded-2xl border-2 bg-white px-4 text-sm text-[color:var(--charcoal)] outline-none transition placeholder:text-[color:var(--gray-soft)]/60 focus:border-[color:var(--coral)] focus:ring-2 focus:ring-[color:var(--coral)]/20";

export function TextInput({
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      {...props}
      className={`${inputBase} ${error ? "border-[color:var(--coral)]" : "border-[color:var(--border)]"} ${props.className ?? ""}`}
    />
  );
}

/* ---------- Phone +880 ---------- */
export function PhoneInput({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
}) {
  return (
    <div
      className={`flex h-12 w-full overflow-hidden rounded-2xl border-2 bg-white transition focus-within:border-[color:var(--coral)] focus-within:ring-2 focus-within:ring-[color:var(--coral)]/20 ${
        error ? "border-[color:var(--coral)]" : "border-[color:var(--border)]"
      }`}
    >
      <span className="flex items-center gap-2 bg-[color:var(--pink-soft)] px-4 text-sm font-bold text-[color:var(--charcoal)]">
        🇧🇩 +880
      </span>
      <input
        type="tel"
        inputMode="numeric"
        maxLength={11}
        placeholder="01XXXXXXXXX"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 11))}
        className="flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-[color:var(--gray-soft)]/60"
      />
    </div>
  );
}

/* ---------- Password w/ toggle ---------- */
export function PasswordInput({
  value,
  onChange,
  error,
  placeholder = "••••••••",
  onBlur,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
  placeholder?: string;
  onBlur?: () => void;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`${inputBase} pr-12 ${error ? "border-[color:var(--coral)]" : "border-[color:var(--border)]"}`}
      />
      <button
        type="button"
        aria-label={show ? "Hide password" : "Show password"}
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-[color:var(--gray-soft)] hover:bg-[color:var(--pink-soft)]"
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

/* ---------- OTP ---------- */
export function OTPInput({
  value,
  onChange,
  length = 6,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  length?: number;
  error?: boolean;
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = value.padEnd(length, " ").split("").slice(0, length);

  const setAt = (i: number, char: string) => {
    const cleaned = char.replace(/\D/g, "");
    if (!cleaned) return;
    const arr = value.split("");
    arr[i] = cleaned[0];
    const next = arr.join("").slice(0, length);
    onChange(next);
    if (i < length - 1) refs.current[i + 1]?.focus();
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          inputMode="numeric"
          maxLength={1}
          value={d.trim()}
          onChange={(e) => setAt(i, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !digits[i].trim() && i > 0) {
              refs.current[i - 1]?.focus();
              const arr = value.split("");
              arr[i - 1] = "";
              onChange(arr.join(""));
            }
            if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
            if (e.key === "ArrowRight" && i < length - 1) refs.current[i + 1]?.focus();
          }}
          onPaste={(e) => {
            const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
            if (paste) {
              e.preventDefault();
              onChange(paste);
              refs.current[Math.min(paste.length, length - 1)]?.focus();
            }
          }}
          className={`h-14 w-11 rounded-2xl border-2 bg-white text-center font-display text-xl font-extrabold text-[color:var(--charcoal)] outline-none transition focus:border-[color:var(--coral)] focus:ring-2 focus:ring-[color:var(--coral)]/20 sm:h-16 sm:w-14 sm:text-2xl ${
            error ? "border-[color:var(--coral)]" : "border-[color:var(--border)]"
          }`}
        />
      ))}
    </div>
  );
}

/* ---------- Countdown ---------- */
export function useCountdown(seconds: number, restartKey: number) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    setLeft(seconds);
    const t = setInterval(() => setLeft((l) => (l > 0 ? l - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [seconds, restartKey]);
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  return { left, label: `${mm}:${ss}` };
}

/* ---------- Coral button ---------- */
export function CoralButton({
  loading,
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      {...rest}
      disabled={loading || rest.disabled}
      className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[color:var(--coral)] px-6 text-sm font-bold text-white shadow-[0_8px_20px_rgba(255,107,107,0.35)] transition hover:bg-[color:var(--coral-dark)] disabled:cursor-not-allowed disabled:opacity-60 ${rest.className ?? ""}`}
    >
      {loading ? (
        <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      ) : (
        children
      )}
    </button>
  );
}
