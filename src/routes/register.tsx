import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Check, ArrowRight, ArrowLeft } from "lucide-react";
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

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account — BPAC" },
      { name: "description", content: "Join Birds and Pet Animal Clinic — sign up free in 3 quick steps." },
    ],
  }),
  component: RegisterPage,
});

type Step1 = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm: string;
  photo: string | null;
  agree: boolean;
};

const SPECIES = [
  { emoji: "🐕", label: "Dog" },
  { emoji: "🐈", label: "Cat" },
  { emoji: "🐦", label: "Bird" },
  { emoji: "🐰", label: "Rabbit" },
  { emoji: "🐟", label: "Fish" },
  { emoji: "🦎", label: "Reptile" },
  { emoji: "🐹", label: "Hamster" },
  { emoji: "✨", label: "Other" },
];

const COMMON_BREEDS: Record<string, string[]> = {
  Dog: ["German Shepherd", "Labrador", "Spitz", "Pug", "Bangladeshi Street Dog (Pariah)", "Golden Retriever"],
  Cat: ["Persian", "Bengal", "British Shorthair", "Maine Coon", "Bangladeshi Domestic", "Siamese"],
};

function RegisterPage() {
  const [step, setStep] = useState(0);
  const [s1, setS1] = useState<Step1>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    photo: null,
    agree: false,
  });

  return (
    <AuthLayout
      step={{ current: step, total: 3, labels: ["Account", "Verify", "Your Pet"] }}
    >
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <StepPersonal data={s1} setData={setS1} onNext={() => setStep(1)} />
          </motion.div>
        )}
        {step === 1 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <StepOTP phone={s1.phone} email={s1.email} onBack={() => setStep(0)} onNext={() => setStep(2)} />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="s3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <StepPet owner={s1} />
          </motion.div>
        )}
      </AnimatePresence>

      {step === 0 && (
        <p className="mt-6 text-center text-sm text-[color:var(--gray-soft)]">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-[color:var(--coral)] hover:underline">
            Login
          </Link>
        </p>
      )}
    </AuthLayout>
  );
}

/* ---------------- STEP 1 ---------------- */
function StepPersonal({
  data,
  setData,
  onNext,
}: {
  data: Step1;
  setData: (d: Step1) => void;
  onNext: () => void;
}) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (data.name.trim().length < 3) e.name = "Name must be at least 3 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Enter a valid email";
    if (!/^01[3-9]\d{8}$/.test(data.phone)) e.phone = "Enter a valid BD number (01XXXXXXXXX)";
    if (data.password.length < 8 || !/[A-Z]/.test(data.password) || !/\d/.test(data.password))
      e.password = "Min 8 chars, 1 capital letter, 1 number";
    if (data.confirm !== data.password) e.confirm = "Passwords do not match";
    if (!data.agree) e.agree = "Please accept the Terms";
    return e;
  }, [data]);

  const valid = Object.keys(errors).length === 0;
  const blur = (k: string) => setTouched((t) => ({ ...t, [k]: true }));
  const err = (k: string) => (touched[k] ? errors[k] : undefined);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, password: true, confirm: true, agree: true });
    if (!valid) return;
    onNext();
  }

  function handlePhoto(file: File | undefined) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setData({ ...data, photo: url });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center">
        <h1 className="font-display text-2xl font-extrabold text-[color:var(--charcoal)] sm:text-3xl">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-[color:var(--gray-soft)]">
          Join 10,000+ pet parents across Bangladesh
        </p>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="group relative grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-[color:var(--pink-soft)] ring-2 ring-[color:var(--coral)]/20 transition hover:ring-[color:var(--coral)]"
        >
          {data.photo ? (
            <img src={data.photo} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <Camera className="h-7 w-7 text-[color:var(--coral)]" />
          )}
          <span className="absolute inset-x-0 bottom-0 bg-black/55 py-1 text-[10px] font-bold text-white opacity-0 transition group-hover:opacity-100">
            Upload
          </span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handlePhoto(e.target.files?.[0])}
        />
      </div>

      <Field label="Full Name" bn="পূর্ণ নাম" error={err("name")}>
        <TextInput
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          onBlur={() => blur("name")}
          placeholder="Fatima Khanom"
          error={!!err("name")}
        />
      </Field>

      <Field label="Email Address" error={err("email")}>
        <TextInput
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          onBlur={() => blur("email")}
          placeholder="you@example.com"
          error={!!err("email")}
        />
      </Field>

      <Field label="Phone Number" error={err("phone")} hint="We'll send a verification code">
        <PhoneInput
          value={data.phone}
          onChange={(v) => {
            setData({ ...data, phone: v });
            if (touched.phone === false) return;
          }}
          error={!!err("phone")}
        />
      </Field>

      <Field label="Password" error={err("password")} hint="Min 8 characters, 1 capital, 1 number">
        <PasswordInput
          value={data.password}
          onChange={(v) => setData({ ...data, password: v })}
          onBlur={() => blur("password")}
          error={!!err("password")}
        />
      </Field>

      <Field label="Confirm Password" error={err("confirm")}>
        <PasswordInput
          value={data.confirm}
          onChange={(v) => setData({ ...data, confirm: v })}
          onBlur={() => blur("confirm")}
          error={!!err("confirm")}
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-[color:var(--charcoal)]">
        <input
          type="checkbox"
          checked={data.agree}
          onChange={(e) => {
            setData({ ...data, agree: e.target.checked });
            blur("agree");
          }}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[color:var(--coral)]"
        />
        <span>
          I agree to the{" "}
          <a href="#" className="font-bold text-[color:var(--coral)] hover:underline">Terms & Conditions</a> and{" "}
          <a href="#" className="font-bold text-[color:var(--coral)] hover:underline">Privacy Policy</a>.
        </span>
      </label>
      {err("agree") && <p className="-mt-2 text-xs font-semibold text-[color:var(--coral)]">{errors.agree}</p>}

      <CoralButton type="submit">
        Create Account <ArrowRight className="h-4 w-4" />
      </CoralButton>
    </form>
  );
}

/* ---------------- STEP 2: OTP ---------------- */
function StepOTP({
  phone,
  email,
  onBack,
  onNext,
}: {
  phone: string;
  email: string;
  onBack: () => void;
  onNext: () => void;
}) {
  const [code, setCode] = useState("");
  const [mode, setMode] = useState<"sms" | "email">("sms");
  const [restart, setRestart] = useState(0);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const { left, label } = useCountdown(120, restart);

  const masked = phone ? `+880 ${phone.slice(0, 2)} ${phone.slice(2, 5)} ${phone.slice(5)}` : "";

  function verify(e: React.FormEvent) {
    e.preventDefault();
    if (code.length !== 6) {
      setError("Enter all 6 digits");
      return;
    }
    setLoading(true);
    setError(undefined);
    setTimeout(() => {
      setLoading(false);
      // Demo: accept 123456 or any 6-digit code
      if (code === "000000") {
        setError("Invalid code. Try 123456 for demo.");
        return;
      }
      onNext();
    }, 700);
  }

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-2 inline-flex items-center gap-1 text-xs font-bold text-[color:var(--gray-soft)] hover:text-[color:var(--coral)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </button>

      <div className="text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[color:var(--pink-soft)] text-2xl">
          📲
        </div>
        <h1 className="mt-4 font-display text-2xl font-extrabold text-[color:var(--charcoal)] sm:text-3xl">
          Verify your {mode === "sms" ? "phone" : "email"}
        </h1>
        <p className="mt-2 text-sm text-[color:var(--gray-soft)]">
          We sent a 6-digit code to{" "}
          <span className="font-bold text-[color:var(--charcoal)]">
            {mode === "sms" ? masked : email}
          </span>
        </p>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="inline-flex rounded-full bg-[color:var(--pink-soft)] p-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => { setMode("sms"); setCode(""); setRestart(r => r + 1); }}
            className={`rounded-full px-4 py-1.5 transition ${mode === "sms" ? "bg-white text-[color:var(--coral)] shadow" : "text-[color:var(--gray-soft)]"}`}
          >
            SMS
          </button>
          <button
            type="button"
            onClick={() => { setMode("email"); setCode(""); setRestart(r => r + 1); }}
            className={`rounded-full px-4 py-1.5 transition ${mode === "email" ? "bg-white text-[color:var(--coral)] shadow" : "text-[color:var(--gray-soft)]"}`}
          >
            Email
          </button>
        </div>
      </div>

      <form onSubmit={verify} className="mt-6 space-y-5">
        <OTPInput value={code} onChange={setCode} error={!!error} />
        {error && (
          <p className="text-center text-xs font-semibold text-[color:var(--coral)]">{error}</p>
        )}

        <div className="text-center text-sm text-[color:var(--gray-soft)]">
          {left > 0 ? (
            <>Resend in <span className="font-bold text-[color:var(--charcoal)]">{label}</span></>
          ) : (
            <button
              type="button"
              onClick={() => { setRestart((r) => r + 1); setCode(""); }}
              className="font-bold text-[color:var(--coral)] hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>

        <CoralButton type="submit" loading={loading}>
          Verify & Continue <Check className="h-4 w-4" />
        </CoralButton>

        <p className="text-center text-xs text-[color:var(--gray-soft)]">
          Demo OTP: <span className="font-bold text-[color:var(--charcoal)]">any 6 digits</span>
        </p>
      </form>
    </div>
  );
}

/* ---------------- STEP 3: PET ---------------- */
function StepPet({ owner }: { owner: Step1 }) {
  const navigate = useNavigate();
  const [pet, setPet] = useState({
    name: "",
    species: "Dog",
    breed: "",
    dob: "",
    gender: "Male" as "Male" | "Female",
    weight: "",
    photo: null as string | null,
  });
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [success, setSuccess] = useState(false);

  const age = useMemo(() => {
    if (!pet.dob) return "";
    const d = new Date(pet.dob);
    if (isNaN(d.getTime())) return "";
    const now = new Date();
    let years = now.getFullYear() - d.getFullYear();
    let months = now.getMonth() - d.getMonth();
    if (months < 0) { years--; months += 12; }
    if (years < 0) return "";
    return years > 0 ? `${years} year${years > 1 ? "s" : ""} ${months} mo` : `${months} months`;
  }, [pet.dob]);

  const breedSuggestions = COMMON_BREEDS[pet.species] ?? [];

  function finish(skipPet: boolean) {
    setLoading(true);
    setTimeout(() => {
      try {
        localStorage.setItem(
          "bpac_user",
          JSON.stringify({
            name: owner.name,
            email: owner.email,
            phone: owner.phone,
            photo: owner.photo,
            pets: skipPet ? [] : [pet],
          }),
        );
      } catch {}
      setSuccess(true);
      setTimeout(() => navigate({ to: "/" }), 1400);
    }, 600);
  }

  if (success) {
    return (
      <div className="py-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[color:var(--success)] text-white"
        >
          <Check className="h-10 w-10" />
        </motion.div>
        <h2 className="mt-5 font-display text-2xl font-extrabold text-[color:var(--charcoal)]">
          Welcome to BPAC! 🎉
        </h2>
        <p className="mt-2 text-sm text-[color:var(--gray-soft)]">Taking you to your dashboard…</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); finish(false); }}
      className="space-y-5"
    >
      <div className="text-center">
        <h1 className="font-display text-2xl font-extrabold text-[color:var(--charcoal)] sm:text-3xl">
          Tell us about your pet! 🐾
        </h1>
        <p className="mt-1 text-sm text-[color:var(--gray-soft)]">You can add more pets later</p>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="group relative grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-[color:var(--pink-soft)] ring-2 ring-[color:var(--coral)]/20 hover:ring-[color:var(--coral)]"
        >
          {pet.photo ? (
            <img src={pet.photo} alt="Pet" className="h-full w-full object-cover" />
          ) : (
            <Camera className="h-7 w-7 text-[color:var(--coral)]" />
          )}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setPet({ ...pet, photo: URL.createObjectURL(f) });
          }}
        />
      </div>
      <p className="-mt-3 text-center text-xs text-[color:var(--gray-soft)]">Upload Photo</p>

      <Field label="Pet Name" bn="পোষা প্রাণীর নাম">
        <TextInput
          required
          value={pet.name}
          onChange={(e) => setPet({ ...pet, name: e.target.value })}
          placeholder="Luna"
        />
      </Field>

      <Field label="Species">
        <div className="grid grid-cols-4 gap-2">
          {SPECIES.map((sp) => {
            const active = pet.species === sp.label;
            return (
              <button
                key={sp.label}
                type="button"
                onClick={() => setPet({ ...pet, species: sp.label, breed: "" })}
                className={`flex flex-col items-center gap-1 rounded-2xl border-2 p-2 text-xs font-bold transition ${
                  active
                    ? "border-[color:var(--coral)] bg-[color:var(--pink-soft)] text-[color:var(--coral)]"
                    : "border-[color:var(--border)] bg-white text-[color:var(--charcoal)] hover:border-[color:var(--coral)]/50"
                }`}
              >
                <span className="text-2xl">{sp.emoji}</span>
                {sp.label}
              </button>
            );
          })}
        </div>
      </Field>

      <Field label="Breed" hint={breedSuggestions.length ? "Type or pick a suggestion" : undefined}>
        <TextInput
          list="breed-suggestions"
          value={pet.breed}
          onChange={(e) => setPet({ ...pet, breed: e.target.value })}
          placeholder={breedSuggestions[0] ?? "Breed"}
        />
        {breedSuggestions.length > 0 && (
          <datalist id="breed-suggestions">
            {breedSuggestions.map((b) => <option key={b} value={b} />)}
          </datalist>
        )}
      </Field>

      <Field label="Date of Birth" hint={age ? `≈ ${age} old` : undefined}>
        <TextInput
          type="date"
          max={new Date().toISOString().split("T")[0]}
          value={pet.dob}
          onChange={(e) => setPet({ ...pet, dob: e.target.value })}
        />
      </Field>

      <Field label="Gender">
        <div className="inline-flex w-full rounded-full bg-[color:var(--pink-soft)] p-1">
          {(["Male", "Female"] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setPet({ ...pet, gender: g })}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-bold transition ${
                pet.gender === g ? "bg-white text-[color:var(--coral)] shadow" : "text-[color:var(--gray-soft)]"
              }`}
            >
              {g === "Male" ? "♂ Male" : "♀ Female"}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Weight">
        <div className="flex items-center gap-2">
          <TextInput
            type="number"
            min="0"
            step="0.1"
            value={pet.weight}
            onChange={(e) => setPet({ ...pet, weight: e.target.value })}
            placeholder="5.2"
          />
          <span className="grid h-12 w-14 shrink-0 place-items-center rounded-2xl bg-[color:var(--pink-soft)] text-sm font-bold text-[color:var(--charcoal)]">
            kg
          </span>
        </div>
      </Field>

      <CoralButton type="submit" loading={loading}>
        Save & Go to Dashboard
      </CoralButton>
      <button
        type="button"
        onClick={() => finish(true)}
        className="block w-full text-center text-sm font-semibold text-[color:var(--gray-soft)] hover:text-[color:var(--coral)]"
      >
        Skip for now
      </button>
    </form>
  );
}
