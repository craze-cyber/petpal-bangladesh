import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ArrowLeft, Check, ExternalLink } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Field, TextInput, PasswordInput, CoralButton } from "@/components/auth/fields";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — BPAC" },
      { name: "description", content: "Reset your BPAC account password." },
    ],
  }),
  component: ForgotPage,
});

function ForgotPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | undefined>();

  return (
    <AuthLayout>
      <button
        type="button"
        onClick={() => (step === 1 ? navigate({ to: "/login" }) : setStep((s) => (s - 1) as 1 | 2 | 3 | 4))}
        className="mb-2 inline-flex items-center gap-1 text-xs font-bold text-[color:var(--gray-soft)] hover:text-[color:var(--coral)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </button>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.form
            key="1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setErr("Enter a valid email");
                return;
              }
              setErr(undefined);
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                setStep(2);
              }, 700);
            }}
          >
            <div className="text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[color:var(--pink-soft)] text-2xl">
                🔑
              </div>
              <h1 className="mt-4 font-display text-2xl font-extrabold text-[color:var(--charcoal)] sm:text-3xl">
                Forgot your password?
              </h1>
              <p className="mt-2 text-sm text-[color:var(--gray-soft)]">
                Enter the email linked to your account and we'll send a reset link.
              </p>
            </div>

            <Field label="Email Address" error={err}>
              <TextInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                error={!!err}
              />
            </Field>

            <CoralButton type="submit" loading={loading}>Send Reset Link</CoralButton>
          </motion.form>
        )}

        {step === 2 && (
          <motion.div
            key="2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-5 text-center"
          >
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[color:var(--pink-soft)]">
              <Mail className="h-7 w-7 text-[color:var(--coral)]" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-extrabold text-[color:var(--charcoal)] sm:text-3xl">
                Check your email
              </h1>
              <p className="mt-2 text-sm text-[color:var(--gray-soft)]">
                We sent reset instructions to{" "}
                <span className="font-bold text-[color:var(--charcoal)]">{email}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://mail.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-[color:var(--border)] bg-white text-sm font-bold text-[color:var(--charcoal)] transition hover:bg-[color:var(--pink-soft)]/40"
              >
                Open Gmail <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://outlook.live.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-[color:var(--border)] bg-white text-sm font-bold text-[color:var(--charcoal)] transition hover:bg-[color:var(--pink-soft)]/40"
              >
                Open Outlook <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <CoralButton type="button" onClick={() => setStep(3)}>
              I clicked the link →
            </CoralButton>

            <p className="text-xs text-[color:var(--gray-soft)]">
              Didn't receive it?{" "}
              <button
                type="button"
                onClick={() => setStep(1)}
                className="font-bold text-[color:var(--coral)] hover:underline"
              >
                Resend
              </button>
            </p>
          </motion.div>
        )}

        {step === 3 && (
          <motion.form
            key="3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
                setErr("Min 8 chars, 1 capital, 1 number");
                return;
              }
              if (password !== confirm) {
                setErr("Passwords do not match");
                return;
              }
              setErr(undefined);
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                setStep(4);
              }, 700);
            }}
          >
            <div className="text-center">
              <h1 className="font-display text-2xl font-extrabold text-[color:var(--charcoal)] sm:text-3xl">
                Set a new password
              </h1>
              <p className="mt-2 text-sm text-[color:var(--gray-soft)]">
                Make it strong and easy to remember.
              </p>
            </div>
            <Field label="New Password" error={err} hint="Min 8 chars, 1 capital, 1 number">
              <PasswordInput value={password} onChange={setPassword} error={!!err} />
            </Field>
            <Field label="Confirm New Password">
              <PasswordInput value={confirm} onChange={setConfirm} error={!!err} />
            </Field>
            <CoralButton type="submit" loading={loading}>Change Password</CoralButton>
          </motion.form>
        )}

        {step === 4 && (
          <motion.div
            key="4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-5 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[color:var(--success)] text-white"
            >
              <Check className="h-10 w-10" />
            </motion.div>
            <div>
              <h1 className="font-display text-2xl font-extrabold text-[color:var(--charcoal)] sm:text-3xl">
                Password changed!
              </h1>
              <p className="mt-2 text-sm text-[color:var(--gray-soft)]">
                You can now sign in with your new password.
              </p>
            </div>
            <Link to="/login">
              <CoralButton type="button">Go to Login</CoralButton>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
