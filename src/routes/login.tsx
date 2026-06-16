import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Fingerprint } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import {
  Field,
  TextInput,
  PhoneInput,
  PasswordInput,
  OTPInput,
  CoralButton,
  useCountdown,
} from "@/components/auth/fields";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — BPAC" },
      { name: "description", content: "Login to your Birds and Pet Animal Clinic account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [tab, setTab] = useState<"email" | "phone">("email");

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to manage your pet's care">
      <div className="mb-6 inline-flex w-full rounded-full bg-[color:var(--pink-soft)] p-1">
        {(["email", "phone"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`flex-1 rounded-full px-4 py-2.5 text-sm font-bold transition ${
              tab === t ? "bg-white text-[color:var(--coral)] shadow" : "text-[color:var(--gray-soft)]"
            }`}
          >
            {t === "email" ? "Email Login" : "Phone Login"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === "email" ? (
          <motion.div
            key="email"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <EmailLogin />
          </motion.div>
        ) : (
          <motion.div
            key="phone"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <PhoneLogin />
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-6 text-center text-sm text-[color:var(--gray-soft)]">
        New to BPAC?{" "}
        <Link to="/register" className="font-bold text-[color:var(--coral)] hover:underline">
          Register Free
        </Link>
      </p>
    </AuthLayout>
  );
}

function EmailLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [showBiometric, setShowBiometric] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Enter your email and password");
      return;
    }
    setError(undefined);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowBiometric(true);
    }, 800);
  }

  if (showBiometric) {
    return (
      <div className="space-y-5 py-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[color:var(--success)] text-white"
        >
          <Check className="h-10 w-10" />
        </motion.div>
        <div>
          <h2 className="font-display text-xl font-extrabold text-[color:var(--charcoal)]">Welcome back!</h2>
          <p className="mt-1 text-sm text-[color:var(--gray-soft)]">You're signed in.</p>
        </div>
        <div className="rounded-2xl border border-[color:var(--coral)]/20 bg-[color:var(--pink-soft)]/60 p-4 text-left">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[color:var(--coral)]">
              <Fingerprint className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-[color:var(--charcoal)]">Use fingerprint next time?</p>
              <p className="mt-0.5 text-xs text-[color:var(--gray-soft)]">Sign in faster on this device.</p>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              className="flex-1 rounded-full border-2 border-[color:var(--coral)] py-2 text-xs font-bold text-[color:var(--coral)]"
            >
              Not now
            </button>
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              className="flex-1 rounded-full bg-[color:var(--coral)] py-2 text-xs font-bold text-white"
            >
              Enable
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Email Address" error={error}>
        <TextInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </Field>
      <Field label="Password">
        <PasswordInput value={password} onChange={setPassword} />
      </Field>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-[color:var(--charcoal)]">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 cursor-pointer accent-[color:var(--coral)]"
          />
          Remember me for 30 days
        </label>
        <Link to="/forgot-password" className="font-bold text-[color:var(--coral)] hover:underline">
          Forgot Password?
        </Link>
      </div>

      <CoralButton type="submit" loading={loading}>Login</CoralButton>

      <div className="flex items-center gap-3 text-xs text-[color:var(--gray-soft)]">
        <div className="h-px flex-1 bg-[color:var(--border)]" />
        or
        <div className="h-px flex-1 bg-[color:var(--border)]" />
      </div>

      <button
        type="button"
        className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-full border-2 border-[color:var(--border)] bg-white text-sm font-bold text-[color:var(--charcoal)] transition hover:bg-[color:var(--pink-soft)]/40"
      >
        <GoogleIcon />
        Login with Google
      </button>
    </form>
  );
}

function PhoneLogin() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [restart, setRestart] = useState(0);
  const { left, label } = useCountdown(120, restart);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | undefined>();

  if (phase === "phone") {
    return (
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!/^01[3-9]\d{8}$/.test(phone)) {
            setErr("Enter a valid BD number");
            return;
          }
          setErr(undefined);
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setPhase("otp");
            setRestart((r) => r + 1);
          }, 600);
        }}
      >
        <Field label="Phone Number" error={err} hint="We'll send you a one-time code">
          <PhoneInput value={phone} onChange={setPhone} error={!!err} />
        </Field>
        <CoralButton type="submit" loading={loading}>Send OTP</CoralButton>
      </form>
    );
  }

  const masked = `+880 ${phone.slice(0, 2)} ${phone.slice(2, 5)} ${phone.slice(5)}`;

  return (
    <div className="space-y-5">
      <div className="text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[color:var(--pink-soft)] text-2xl">📲</div>
        <p className="mt-3 text-sm text-[color:var(--gray-soft)]">
          Code sent to <span className="font-bold text-[color:var(--charcoal)]">{masked}</span>
          <button
            type="button"
            onClick={() => setPhase("phone")}
            className="ml-2 text-xs font-bold text-[color:var(--coral)] hover:underline"
          >
            Change
          </button>
        </p>
      </div>
      <OTPInput value={otp} onChange={setOtp} error={!!err} />
      {err && <p className="text-center text-xs font-semibold text-[color:var(--coral)]">{err}</p>}
      <div className="text-center text-sm text-[color:var(--gray-soft)]">
        {left > 0 ? (
          <>Resend in <span className="font-bold text-[color:var(--charcoal)]">{label}</span></>
        ) : (
          <button
            type="button"
            onClick={() => { setRestart((r) => r + 1); setOtp(""); }}
            className="font-bold text-[color:var(--coral)] hover:underline"
          >Resend OTP</button>
        )}
      </div>
      <CoralButton
        type="button"
        loading={loading}
        onClick={() => {
          if (otp.length !== 6) { setErr("Enter all 6 digits"); return; }
          setErr(undefined);
          setLoading(true);
          setTimeout(() => navigate({ to: "/" }), 700);
        }}
      >
        Verify & Login
      </CoralButton>
      <p className="text-center text-xs text-[color:var(--gray-soft)]">
        Demo OTP: <span className="font-bold text-[color:var(--charcoal)]">any 6 digits</span>
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}
