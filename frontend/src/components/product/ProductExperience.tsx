"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  CreditCard,
  Dog,
  Download,
  HeartPulse,
  Home,
  Languages,
  MapPin,
  PackageCheck,
  Pause,
  PawPrint,
  Play,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  SkipForward,
  SlidersHorizontal,
  Sparkles,
  Truck,
  UserRound,
  Utensils,
  Volume2,
  VolumeX,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TastePrint } from "./TastePrint";

const TasteBowlCanvas = dynamic(
  () => import("./TasteBowlCanvas").then((module) => module.TasteBowlCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-[280px] place-items-center rounded-[32px] bg-[var(--soft)]">
        <div className="animate-bob text-center text-4xl">
          🥣
          <span className="mt-2 block text-xs font-black text-[var(--muted)]">
            Preparing the 3D bowl…
          </span>
        </div>
      </div>
    ),
  },
);

type Locale = "en" | "th";
type Screen =
  | "welcome"
  | "safety"
  | "safetyHold"
  | "trial"
  | "observe"
  | "feedback"
  | "tasteprint"
  | "firstBowl"
  | "checkout"
  | "receipt"
  | "checkin"
  | "subscription"
  | "today"
  | "plan"
  | "passport"
  | "more"
  | "profile"
  | "delivery"
  | "help";
type Choice = "chicken" | "salmon" | "unclear" | null;
type AppState = {
  locale: Locale;
  screen: Screen;
  choice: Choice;
  approach: string;
  intake: string;
  energy: string;
  feedback: string;
  feedbackLocale: Locale | "";
  feedbackSource: "ai" | "fallback" | "";
  ordered: boolean;
  checkedIn: boolean;
  checkin: string;
  warningReported: boolean;
  subscribed: boolean;
  paused: boolean;
  skipped: boolean;
  tutorialDone: boolean;
};

const seed: AppState = {
  locale: "en",
  screen: "welcome",
  choice: null,
  approach: "",
  intake: "",
  energy: "",
  feedback: "",
  feedbackLocale: "",
  feedbackSource: "",
  ordered: false,
  checkedIn: false,
  checkin: "",
  subscribed: false,
  warningReported: false,
  paused: false,
  skipped: false,
  tutorialDone: false,
};

const tx = {
  en: {
    demo: "INTERACTIVE CONCEPT",
    backStory: "Story",
    next: "Continue",
    back: "Back",
    mochi: "Mochi",
    today: "Today",
    taste: "Taste",
    plan: "Plan",
    passport: "Passport",
    more: "More",
  },
  th: {
    demo: "ต้นแบบเชิงโต้ตอบ",
    backStory: "เรื่องราว",
    next: "ดำเนินการต่อ",
    back: "ย้อนกลับ",
    mochi: "โมจิ",
    today: "วันนี้",
    taste: "รสนิยม",
    plan: "แผน",
    passport: "พาสปอร์ต",
    more: "เพิ่มเติม",
  },
};

/* Local storage hydration intentionally synchronizes an external browser store after mount. */
/* eslint-disable react-hooks/set-state-in-effect */
function usePersistedState() {
  const [state, setState] = useState<AppState>(seed);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    try {
      const freshDemo =
        new URLSearchParams(window.location.search).get("demo") === "fresh";
      if (freshDemo) {
        localStorage.removeItem("pawproud-demo-v1");
        setState(seed);
        window.history.replaceState({}, "", "/app/");
        setHydrated(true);
        return;
      }
      const saved = localStorage.getItem("pawproud-demo-v1");
      if (saved) setState({ ...seed, ...JSON.parse(saved) });
    } catch {
      /* demo still works without storage */
    }
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (hydrated)
      localStorage.setItem("pawproud-demo-v1", JSON.stringify(state));
  }, [state, hydrated]);
  return { state, setState, hydrated };
}
/* eslint-enable react-hooks/set-state-in-effect */

function AppButton({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  icon,
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  disabled?: boolean;
  icon?: React.ReactNode;
}) {
  const styles = {
    primary:
      "bg-[var(--coral-dark)] text-white shadow-[0_10px_26px_rgba(216,58,79,.25)] hover:bg-[#c52f44]",
    secondary:
      "border-2 border-[var(--chocolate)] bg-white text-[var(--chocolate)] hover:bg-[var(--soft)]",
    ghost: "bg-[var(--soft)] text-[var(--chocolate)] hover:bg-[#ffe5d7]",
    danger: "border-2 border-[var(--danger)] bg-white text-[var(--danger)]",
  };
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`pressable flex min-h-14 w-full items-center justify-center gap-2 rounded-[18px] px-5 py-3 text-[15px] font-extrabold disabled:cursor-not-allowed disabled:opacity-45 ${styles[variant]}`}
    >
      {children}
      {icon}
    </button>
  );
}

function TinyBadge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning" | "blue" | "coral";
}) {
  const colors = {
    neutral: "bg-[var(--soft)] text-[var(--muted)]",
    success: "bg-[var(--mint)] text-[var(--success)]",
    warning: "bg-[#fff1ce] text-[var(--warning)]",
    blue: "bg-[var(--sky)] text-[var(--trust)]",
    coral: "bg-[#ffe3e7] text-[var(--coral-dark)]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[.12em] ${colors[tone]}`}
    >
      {children}
    </span>
  );
}

function ProductHeader({
  locale,
  setLocale,
  title,
  onBack,
  progress,
}: {
  locale: Locale;
  setLocale: (l: Locale) => void;
  title?: string;
  onBack?: () => void;
  progress?: number;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)]/70 bg-[rgba(255,248,240,.94)] backdrop-blur-xl">
      <div className="mx-auto flex h-[62px] max-w-[500px] items-center justify-between px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          {onBack ? (
            <button
              onClick={onBack}
              className="pressable grid h-11 w-11 place-items-center rounded-2xl bg-white shadow-sm"
              aria-label={locale === "en" ? "Go back" : "ย้อนกลับ"}
            >
              <ArrowLeft size={19} />
            </button>
          ) : (
            <Image
              src="/brand/pawproud-wordmark.webp"
              alt="PawProud"
              width={132}
              height={44}
              className="h-auto w-[118px]"
              priority
            />
          )}
          {title && (
            <span className="truncate text-sm font-extrabold">{title}</span>
          )}
        </div>
        <button
          onClick={() => setLocale(locale === "en" ? "th" : "en")}
          className="pressable flex h-11 items-center gap-1.5 rounded-2xl border border-[var(--line)] bg-white px-3 text-xs font-extrabold"
          aria-label={locale === "en" ? "Switch language" : "สลับภาษา"}
        >
          <Languages size={15} /> {locale === "en" ? "ไทย" : "EN"}
        </button>
      </div>
      {typeof progress === "number" && (
        <div className="h-1 bg-[#f0dfd2]">
          <motion.div
            className="h-full rounded-r-full bg-[var(--coral)]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      )}
    </header>
  );
}

function BottomNav({
  screen,
  go,
  l,
}: {
  screen: Screen;
  go: (s: Screen) => void;
  l: Locale;
}) {
  const items: { key: Screen; label: string; icon: React.ReactNode }[] = [
    { key: "today", label: tx[l].today, icon: <Home size={20} /> },
    { key: "tasteprint", label: tx[l].taste, icon: <Sparkles size={20} /> },
    { key: "plan", label: tx[l].plan, icon: <CalendarDays size={20} /> },
    { key: "passport", label: tx[l].passport, icon: <ShieldCheck size={20} /> },
    { key: "more", label: tx[l].more, icon: <SlidersHorizontal size={20} /> },
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[500px] border-t border-[var(--line)] bg-[rgba(255,255,255,.96)] px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl">
      <div className="grid grid-cols-5">
        {items.map((i) => (
          <button
            key={i.key}
            onClick={() => go(i.key)}
            className={`pressable flex min-h-[56px] flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-bold ${screen === i.key ? "bg-[var(--soft)] text-[var(--coral-dark)]" : "text-[var(--muted)]"}`}
          >
            <span className={screen === i.key ? "-translate-y-0.5" : ""}>
              {i.icon}
            </span>
            {i.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function Shell({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <main className="mx-auto min-h-[calc(100vh-63px)] max-w-[500px] px-4 pb-28 pt-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={(children as React.ReactElement)?.key ?? "screen"}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      {footer}
    </main>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2 text-[11px] font-black uppercase tracking-[.15em] text-[var(--coral-dark)]">
      <PawPrint size={14} />
      {children}
    </div>
  );
}
function PageTitle({
  children,
  sub,
}: {
  children: React.ReactNode;
  sub?: React.ReactNode;
}) {
  return (
    <>
      <h1 className="display balanced text-[34px] leading-[1.05] font-black">
        {children}
      </h1>
      {sub && (
        <p className="mt-3 text-[15px] leading-6 text-[var(--muted)]">{sub}</p>
      )}
    </>
  );
}

function PawPath({ active = 2, l = "en" }: { active?: number; l?: Locale }) {
  return (
    <div
      className="my-5 flex items-center"
      aria-label={
        l === "en"
          ? `Journey progress ${active} of 5`
          : `ความคืบหน้า ${active} จาก 5 ขั้นตอน`
      }
    >
      {[0, 1, 2, 3, 4].map((n) => (
        <div key={n} className="flex flex-1 items-center last:flex-none">
          <motion.span
            animate={n === active ? { scale: [1, 1.2, 1] } : {}}
            className={`grid h-8 w-8 place-items-center rounded-full ${n <= active ? "bg-[var(--coral)] text-white" : "bg-[var(--soft)] text-[var(--line)]"}`}
          >
            <PawPrint size={15} />
          </motion.span>
          {n < 4 && (
            <span
              className={`h-1 flex-1 ${n < active ? "bg-[var(--coral)]" : "bg-[var(--line)]"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Welcome({
  l,
  go,
  setTutorial,
  onSound,
  onSilent,
}: {
  l: Locale;
  go: (s: Screen) => void;
  setTutorial: () => void;
  onSound: () => void;
  onSilent: () => void;
}) {
  const start = (withSound: boolean) => {
    setTutorial();
    if (withSound) onSound();
    else onSilent();
    go("safety");
  };
  return (
    <div className="relative overflow-hidden rounded-[34px] border border-[var(--line)] bg-white px-5 pb-6 pt-4 shadow-soft">
      <div className="flex items-center justify-between">
        <TinyBadge tone="coral">{tx[l].demo}</TinyBadge>
        <Link
          href="/story/"
          className="text-xs font-extrabold text-[var(--muted)] underline decoration-2 underline-offset-4"
        >
          {tx[l].backStory}
        </Link>
      </div>
      <div className="relative mt-1 h-[220px]">
        <div className="absolute left-1/2 top-3 h-40 w-40 -translate-x-1/2 rounded-full bg-[var(--soft)]">
          <div className="absolute inset-0 rounded-full border-2 border-[var(--coral)]/20 [animation:pulse-ring_2.8s_ease-out_infinite]" />
        </div>
        <Image
          src="/brand/pawproud-mascot-logo.webp"
          alt={l === "en" ? "PawProud mascot waving" : "มาสคอต PawProud โบกมือ"}
          width={310}
          height={310}
          className="animate-bob absolute left-1/2 top-0 w-[235px] -translate-x-1/2 drop-shadow-[0_18px_20px_rgba(86,44,28,.14)]"
          priority
        />
      </div>
      <Eyebrow>{l === "en" ? "Meet Mochi" : "มารู้จักโมจิ"}</Eyebrow>
      <PageTitle
        sub={
          l === "en"
            ? "Compare two tastes, record what you see, and let Mochi earn the right bowl before any subscription."
            : "เปรียบเทียบสองรส บันทึกสิ่งที่เห็น แล้วให้โมจิได้เลือกชามที่ใช่ก่อนสมัครสมาชิก"
        }
      >
        {l === "en" ? (
          <>
            Let your dog{" "}
            <span className="text-[var(--coral-dark)]">answer first.</span>
          </>
        ) : (
          <>
            ให้น้องหมา<span className="text-[var(--coral-dark)]">ตอบก่อน</span>
          </>
        )}
      </PageTitle>
      <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[11px] font-bold text-[var(--muted)]">
        {[
          l === "en" ? "2 tastes" : "2 รส",
          l === "en" ? "3 minutes" : "3 นาที",
          l === "en" ? "No commitment" : "ยังไม่ผูกมัด",
        ].map((x, i) => (
          <div key={x} className="rounded-2xl bg-[var(--soft)] px-2 py-3">
            <span className="mb-1 block text-lg">{["🥣", "⏱️", "🫶"][i]}</span>
            {x}
          </div>
        ))}
      </div>
      <div className="mt-5 space-y-2.5">
        <AppButton onClick={() => start(true)} icon={<Volume2 size={18} />}>
          {l === "en" ? "Start with sound" : "เริ่มพร้อมเสียงภาษาอังกฤษ"}
        </AppButton>
        <AppButton
          variant="ghost"
          onClick={() => start(false)}
          icon={<VolumeX size={18} />}
        >
          {l === "en" ? "Continue silently" : "ดำเนินการต่อแบบไม่มีเสียง"}
        </AppButton>
      </div>
    </div>
  );
}

function VoiceGuide({
  l,
  playing,
  time,
  duration,
  hasNav,
  toggle,
  replay,
  close,
}: {
  l: Locale;
  playing: boolean;
  time: number;
  duration: number;
  hasNav: boolean;
  toggle: () => void;
  replay: () => void;
  close: () => void;
}) {
  const captions =
    l === "en"
      ? [
          "Your dog can show you what they prefer.",
          "First, make sure today feels normal.",
          "Compare two tastes and record only what you see.",
          "TastePrint shows the signal—and the unknowns.",
          "Buy one bowl before choosing any subscription.",
        ]
      : [
          "น้องหมาสามารถแสดงสิ่งที่ชอบได้",
          "เริ่มจากเช็กว่าวันนี้น้องเป็นปกติ",
          "เปรียบเทียบสองรสและบันทึกเฉพาะสิ่งที่เห็น",
          "TastePrint แสดงทั้งสัญญาณและสิ่งที่ยังไม่รู้",
          "ซื้อหนึ่งชามก่อนเลือก Subscription",
        ];
  const index = Math.min(4, Math.floor(time / Math.max(1, duration / 5)));
  return (
    <motion.aside
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed inset-x-3 z-50 mx-auto max-w-[468px] rounded-[22px] border border-[var(--line)] bg-white p-3 shadow-[0_18px_55px_rgba(69,35,24,.22)] ${hasNav ? "bottom-[86px]" : "bottom-4"}`}
      aria-label={l === "en" ? "PawProud voice guide" : "เสียงแนะนำ PawProud"}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="pressable grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[var(--coral-dark)] text-white"
          aria-label={
            playing
              ? l === "en"
                ? "Pause tutorial"
                : "หยุดเสียงชั่วคราว"
              : l === "en"
                ? "Play tutorial"
                : "เล่นเสียงแนะนำ"
          }
        >
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[.13em] text-[var(--coral-dark)]">
              {l === "en" ? "Voice guide · English" : "เสียงแนะนำ · ภาษาอังกฤษ"}
            </span>
            {playing && (
              <span className="flex h-3 items-end gap-0.5">
                {[7, 12, 9].map((h, i) => (
                  <motion.i
                    key={i}
                    className="w-0.5 rounded bg-[var(--coral)]"
                    animate={{ height: [3, h, 4] }}
                    transition={{
                      duration: 0.55,
                      repeat: Infinity,
                      delay: i * 0.12,
                    }}
                  />
                ))}
              </span>
            )}
          </div>
          <p className="truncate text-xs font-bold text-[var(--ink)]">
            {captions[index]}
          </p>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[var(--soft)]">
            <motion.div
              className="h-full bg-[var(--coral)]"
              animate={{
                width: `${Math.min(100, (time / Math.max(1, duration)) * 100)}%`,
              }}
            />
          </div>
        </div>
        <button
          onClick={replay}
          className="grid h-9 w-9 place-items-center rounded-xl text-[var(--muted)]"
          aria-label={l === "en" ? "Replay tutorial" : "เล่นเสียงแนะนำใหม่"}
        >
          <RotateCcw size={16} />
        </button>
        <button
          onClick={close}
          className="grid h-9 w-9 place-items-center rounded-xl text-[var(--muted)]"
          aria-label={l === "en" ? "Close tutorial" : "ปิดเสียงแนะนำ"}
        >
          <X size={17} />
        </button>
      </div>
    </motion.aside>
  );
}

function Safety({ l, go }: { l: Locale; go: (s: Screen) => void }) {
  return (
    <>
      <Eyebrow>
        {l === "en" ? "Step 1 · Safety snapshot" : "ขั้นที่ 1 · เช็กความพร้อม"}
      </Eyebrow>
      <PageTitle
        sub={
          l === "en"
            ? "A food preference trial only makes sense when today feels normal."
            : "การทดลองรสชาติจะมีความหมายเมื่อวันนี้น้องมีอาการปกติ"
        }
      >
        {l === "en"
          ? "Is Mochi feeling like himself today?"
          : "วันนี้โมจิดูเป็นปกติไหม?"}
      </PageTitle>
      <div className="my-6 rounded-[28px] border border-[var(--line)] bg-white p-5 shadow-soft">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--mint)] text-[var(--success)]">
            <HeartPulse />
          </div>
          <div>
            <p className="font-black">
              {l === "en" ? "Quick owner check" : "เช็กโดยเจ้าของ"}
            </p>
            <p className="text-xs text-[var(--muted)]">
              {l === "en" ? "Owner-reported · today" : "เจ้าของรายงาน · วันนี้"}
            </p>
          </div>
        </div>
        <ul className="space-y-3 text-sm text-[var(--muted)]">
          {(l === "en"
            ? [
                "Normal appetite and energy",
                "No vomiting or diarrhoea",
                "No new medicine or urgent concern",
              ]
            : [
                "ความอยากอาหารและพลังงานปกติ",
                "ไม่มีอาเจียนหรือท้องเสีย",
                "ไม่มียาใหม่หรือข้อกังวลเร่งด่วน",
              ]
          ).map((x) => (
            <li key={x} className="flex gap-3">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--mint)] text-[var(--success)]">
                <Check size={13} strokeWidth={3} />
              </span>
              {x}
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-3">
        <AppButton onClick={() => go("trial")} icon={<ArrowRight size={18} />}>
          {l === "en" ? "Yes, Mochi is his usual self" : "ใช่ โมจิเป็นปกติ"}
        </AppButton>
        <AppButton variant="danger" onClick={() => go("safetyHold")}>
          {l === "en"
            ? "No, something feels different"
            : "ไม่ วันนี้มีบางอย่างผิดปกติ"}
        </AppButton>
      </div>
      <p className="mt-5 text-center text-xs leading-5 text-[var(--muted)]">
        {l === "en"
          ? "This check does not diagnose illness. Urgent signs need a veterinary professional."
          : "การเช็กนี้ไม่ใช่การวินิจฉัย หากมีอาการเร่งด่วนควรปรึกษาสัตวแพทย์"}
      </p>
    </>
  );
}

function SafetyHold({ l, go }: { l: Locale; go: (s: Screen) => void }) {
  return (
    <div className="pt-8 text-center">
      <div className="mx-auto grid h-24 w-24 place-items-center rounded-[32px] bg-[#fff1ce] text-[var(--warning)]">
        <Pause size={46} />
      </div>
      <h1 className="display mt-6 text-4xl font-black">
        {l === "en" ? "Pause the trial." : "พักการทดลองก่อน"}
      </h1>
      <p className="mx-auto mt-3 max-w-sm leading-7 text-[var(--muted)]">
        {l === "en"
          ? "Mochi’s wellbeing matters more than a preference signal. Keep his regular routine and contact a veterinarian if you are worried."
          : "สุขภาพของโมจิสำคัญกว่าสัญญาณความชอบ รักษากิจวัตรเดิม และติดต่อสัตวแพทย์หากกังวล"}
      </p>
      <div className="mt-8 space-y-3">
        <AppButton
          variant="secondary"
          onClick={() => go("help")}
          icon={<CircleHelp size={18} />}
        >
          {l === "en" ? "View safety guidance" : "ดูคำแนะนำความปลอดภัย"}
        </AppButton>
        <AppButton variant="ghost" onClick={() => go("safety")}>
          {l === "en" ? "Review answers" : "ทบทวนคำตอบ"}
        </AppButton>
      </div>
    </div>
  );
}

function BowlChoice({
  emoji,
  title,
  details,
  active,
  onClick,
}: {
  emoji: string;
  title: string;
  details: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative min-h-[220px] overflow-hidden rounded-[28px] border-2 p-4 text-left transition ${active ? "border-[var(--coral-dark)] bg-[#fff4f5] shadow-[0_15px_35px_rgba(216,58,79,.14)]" : "border-[var(--line)] bg-white"}`}
    >
      {active && (
        <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-[var(--coral-dark)] text-white">
          <Check size={16} strokeWidth={3} />
        </span>
      )}
      <div className="relative mx-auto mt-5 h-24 w-32">
        <div className="absolute inset-x-0 bottom-0 h-14 rounded-[50%] border-[10px] border-[#f0d6c2] bg-[var(--chocolate)] shadow-[0_8px_0_#c99f82]" />
        <motion.span
          animate={active ? { y: [0, -10, 0], rotate: [0, -8, 5, 0] } : {}}
          className="absolute inset-x-0 top-0 text-center text-5xl"
        >
          {emoji}
        </motion.span>
      </div>
      <p className="mt-4 font-black">{title}</p>
      <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{details}</p>
    </motion.button>
  );
}

function Trial({
  l,
  choice,
  setChoice,
  go,
}: {
  l: Locale;
  choice: Choice;
  setChoice: (c: Choice) => void;
  go: (s: Screen) => void;
}) {
  return (
    <>
      <Eyebrow>
        {l === "en" ? "Step 2 · Guided Taste Trial" : "ขั้นที่ 2 · ทดลองรสชาติ"}
      </Eyebrow>
      <PageTitle
        sub={
          l === "en"
            ? "Place both bowls down together. Tap the one Mochi approaches first."
            : "วางสองชามพร้อมกัน แล้วแตะชามที่โมจิเข้าหาก่อน"
        }
      >
        {l === "en" ? "One question. Two tastes." : "หนึ่งคำถาม สองรสชาติ"}
      </PageTitle>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <BowlChoice
          emoji="🍗"
          title={l === "en" ? "A · Chicken" : "A · ไก่"}
          details={
            l === "en"
              ? "Roasted aroma · tender texture"
              : "กลิ่นย่าง · เนื้อนุ่ม"
          }
          active={choice === "chicken"}
          onClick={() => setChoice("chicken")}
        />
        <BowlChoice
          emoji="🐟"
          title={l === "en" ? "B · Salmon" : "B · แซลมอน"}
          details={
            l === "en"
              ? "Ocean aroma · tender texture"
              : "กลิ่นทะเล · เนื้อนุ่ม"
          }
          active={choice === "salmon"}
          onClick={() => setChoice("salmon")}
        />
      </div>
      <button
        onClick={() => setChoice("unclear")}
        className={`pressable mt-3 flex min-h-14 w-full items-center justify-between rounded-[18px] border-2 px-4 text-sm font-bold ${choice === "unclear" ? "border-[var(--trust)] bg-[var(--sky)]" : "border-[var(--line)] bg-white"}`}
      >
        <span>
          {l === "en"
            ? "Mochi showed no clear first choice"
            : "โมจิยังไม่แสดงตัวเลือกที่ชัดเจน"}
        </span>
        {choice === "unclear" && <Check size={18} />}
      </button>
      <div className="mt-6">
        <AppButton
          disabled={!choice}
          onClick={() => go("observe")}
          icon={<ArrowRight size={18} />}
        >
          {l === "en" ? "Record this observation" : "บันทึกการสังเกตนี้"}
        </AppButton>
      </div>
      <p className="mt-4 text-center text-xs text-[var(--muted)]">
        {l === "en"
          ? "Demo note: Mochi’s response is simulated. No physical samples are provided today."
          : "หมายเหตุ: ปฏิกิริยาของโมจิเป็นการจำลอง วันนี้ไม่มีตัวอย่างอาหารจริง"}
      </p>
    </>
  );
}

function Segment({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string; emoji?: string }[];
  onChange: (x: string) => void;
}) {
  return (
    <fieldset className="rounded-[24px] border border-[var(--line)] bg-white p-4">
      <legend className="px-1 text-sm font-black">{label}</legend>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {options.map((o) => (
          <button
            type="button"
            key={o.value}
            onClick={() => onChange(o.value)}
            className={`pressable min-h-[70px] rounded-2xl px-2 text-xs font-bold ${value === o.value ? "bg-[var(--chocolate)] text-white" : "bg-[var(--soft)] text-[var(--muted)]"}`}
          >
            {o.emoji && <span className="mb-1 block text-xl">{o.emoji}</span>}
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Observe({
  l,
  state,
  patch,
  submit,
}: {
  l: Locale;
  state: AppState;
  patch: (x: Partial<AppState>) => void;
  submit: () => void;
}) {
  const ready = Boolean(state.approach && state.intake && state.energy);
  return (
    <>
      <Eyebrow>
        {l === "en"
          ? "Step 3 · What happened next?"
          : "ขั้นที่ 3 · หลังจากนั้นเกิดอะไรขึ้น?"}
      </Eyebrow>
      <PageTitle
        sub={
          l === "en"
            ? "Choose only what you could see. PawProud keeps observation separate from interpretation."
            : "เลือกเฉพาะสิ่งที่คุณเห็น PawProud แยกข้อสังเกตออกจากการตีความ"
        }
      >
        {l === "en" ? "Tell us what Mochi did." : "เล่าสิ่งที่โมจิทำ"}
      </PageTitle>
      <div className="mt-6 space-y-3">
        <Segment
          label={l === "en" ? "Approach" : "การเข้าหา"}
          value={state.approach}
          onChange={(approach) => patch({ approach })}
          options={[
            {
              value: "quick",
              label: l === "en" ? "Right away" : "ทันที",
              emoji: "⚡",
            },
            {
              value: "slow",
              label: l === "en" ? "After a pause" : "ลังเลก่อน",
              emoji: "👀",
            },
            {
              value: "none",
              label: l === "en" ? "Did not approach" : "ไม่เข้าหา",
              emoji: "🛑",
            },
          ]}
        />
        <Segment
          label={l === "en" ? "How much did he eat?" : "กินมากแค่ไหน?"}
          value={state.intake}
          onChange={(intake) => patch({ intake })}
          options={[
            {
              value: "most",
              label: l === "en" ? "Most" : "เกือบหมด",
              emoji: "🥣",
            },
            {
              value: "some",
              label: l === "en" ? "Some" : "บางส่วน",
              emoji: "🥄",
            },
            {
              value: "none",
              label: l === "en" ? "None" : "ไม่กิน",
              emoji: "〰️",
            },
          ]}
        />
        <Segment
          label={l === "en" ? "Body language" : "ภาษากาย"}
          value={state.energy}
          onChange={(energy) => patch({ energy })}
          options={[
            {
              value: "bright",
              label: l === "en" ? "Bright" : "สนใจ",
              emoji: "✨",
            },
            {
              value: "neutral",
              label: l === "en" ? "Neutral" : "ปกติ",
              emoji: "🙂",
            },
            {
              value: "avoid",
              label: l === "en" ? "Avoided" : "หลบเลี่ยง",
              emoji: "↩️",
            },
          ]}
        />
      </div>
      <div className="mt-6">
        <AppButton
          disabled={!ready}
          onClick={submit}
          icon={<Sparkles size={18} />}
        >
          {ready
            ? l === "en"
              ? "Build Mochi’s feedback"
              : "สร้างผลตอบรับของโมจิ"
            : l === "en"
              ? "Complete all 3 observations"
              : "บันทึกให้ครบทั้ง 3 ข้อ"}
        </AppButton>
      </div>
    </>
  );
}

function Feedback({
  l,
  state,
  loading,
  go,
  retry,
}: {
  l: Locale;
  state: AppState;
  loading: boolean;
  go: (s: Screen) => void;
  retry: () => void;
}) {
  const chosen =
    state.choice === "salmon"
      ? l === "en"
        ? "salmon aroma"
        : "กลิ่นแซลมอน"
      : state.choice === "chicken"
        ? l === "en"
          ? "chicken aroma"
          : "กลิ่นไก่"
        : l === "en"
          ? "neither taste yet"
          : "ยังไม่ชัดเจนทั้งสองรส";
  const observation = (value: string) =>
    ({
      quick: l === "en" ? "Right away" : "ทันที",
      slow: l === "en" ? "After a pause" : "ลังเลก่อน",
      none: l === "en" ? "None" : "ไม่มี",
      most: l === "en" ? "Most" : "เกือบหมด",
      some: l === "en" ? "Some" : "บางส่วน",
      bright: l === "en" ? "Bright" : "สนใจ",
      neutral: l === "en" ? "Neutral" : "ปกติ",
      avoid: l === "en" ? "Avoided" : "หลบเลี่ยง",
    })[value] ?? value;
  const localizedSummary =
    l === "en"
      ? state.choice === "unclear"
        ? "Mochi did not show a clear first choice in this trial. That is useful evidence too: repeat the same comparison another day without changing multiple things at once."
        : `Mochi showed a stronger response to the ${state.choice} aroma in this trial. Treat this as an early preference signal, not a final conclusion. Repeat the comparison on another day before changing his regular food.`
      : state.choice === "unclear"
        ? "โมจิยังไม่แสดงตัวเลือกแรกที่ชัดเจน ซึ่งก็เป็นข้อมูลที่มีประโยชน์ ควรเปรียบเทียบแบบเดิมอีกวันโดยไม่เปลี่ยนหลายอย่างพร้อมกัน"
        : `ในการทดลองนี้ โมจิตอบสนองต่อกลิ่น${state.choice === "salmon" ? "แซลมอน" : "ไก่"}มากกว่า ให้ถือเป็นสัญญาณความชอบเบื้องต้น ไม่ใช่ข้อสรุปสุดท้าย และควรทดลองซ้ำอีกวันก่อนเปลี่ยนอาหารประจำ`;
  const feedbackWasLocalized = Boolean(
    state.feedbackLocale && state.feedbackLocale !== l,
  );
  const displayedFeedback = feedbackWasLocalized
    ? localizedSummary
    : state.feedback || localizedSummary;
  return (
    <>
      <Eyebrow>
        {l === "en" ? "Step 4 · Feedback" : "ขั้นที่ 4 · ผลตอบรับ"}
      </Eyebrow>
      <PageTitle
        sub={
          l === "en"
            ? "The observation is saved first. AI only helps explain it."
            : "ระบบบันทึกข้อสังเกตก่อน AI มีหน้าที่ช่วยอธิบายเท่านั้น"
        }
      >
        {l === "en" ? "Mochi left an early signal." : "โมจิส่งสัญญาณแรกแล้ว"}
      </PageTitle>
      <div className="my-6 rounded-[30px] bg-[var(--chocolate)] p-5 text-white shadow-soft">
        <div className="flex items-center justify-between">
          <TinyBadge tone="coral">
            {l === "en" ? "Owner-reported" : "เจ้าของรายงาน"}
          </TinyBadge>
          <span className="text-xs text-white/60">
            {l === "en" ? "Trial #1" : "การทดลอง #1"}
          </span>
        </div>
        <p className="display mt-5 text-2xl font-black">
          {state.choice === "unclear"
            ? l === "en"
              ? "No clear choice—yet."
              : "ยังไม่มีตัวเลือกที่ชัดเจน"
            : l === "en"
              ? `Mochi approached ${chosen} first.`
              : `โมจิเข้าหา${chosen}ก่อน`}
        </p>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[11px]">
          <div className="rounded-2xl bg-white/10 p-3">
            <Zap className="mx-auto mb-1" size={18} />
            {observation(state.approach)}
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <Utensils className="mx-auto mb-1" size={18} />
            {observation(state.intake)}
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <Dog className="mx-auto mb-1" size={18} />
            {observation(state.energy)}
          </div>
        </div>
      </div>
      <div className="rounded-[28px] border border-[var(--line)] bg-white p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-black">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--sky)] text-[var(--trust)]">
              <Sparkles size={18} />
            </span>
            {l === "en" ? "AI explanation" : "คำอธิบายจาก AI"}
          </div>
          {state.feedbackSource && (
            <TinyBadge
              tone={
                !feedbackWasLocalized && state.feedbackSource === "ai"
                  ? "blue"
                  : "warning"
              }
            >
              {feedbackWasLocalized
                ? l === "en"
                  ? "Localized summary"
                  : "สรุปตามภาษา"
                : state.feedbackSource === "ai"
                  ? l === "en"
                    ? "Live AI"
                    : "AI สด"
                  : l === "en"
                    ? "Safe fallback"
                    : "คำอธิบายสำรอง"}
            </TinyBadge>
          )}
        </div>
        {loading ? (
          <div className="mt-5 space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-[var(--soft)]" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-[var(--soft)]" />
            <p className="text-xs text-[var(--muted)]">
              {l === "en"
                ? "Turning the structured observation into plain language…"
                : "กำลังอธิบายข้อสังเกตให้เข้าใจง่าย…"}
            </p>
          </div>
        ) : (
          <>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              {displayedFeedback}
            </p>
            <button
              onClick={retry}
              className="mt-4 flex items-center gap-1.5 text-xs font-extrabold text-[var(--trust)]"
            >
              <RotateCcw size={14} />
              {l === "en" ? "Retry explanation" : "ลองอธิบายอีกครั้ง"}
            </button>
          </>
        )}
      </div>
      <div className="mt-4 rounded-2xl border border-dashed border-[var(--line)] px-4 py-3 text-xs leading-5 text-[var(--muted)]">
        <strong>
          {l === "en" ? "What remains unknown:" : "สิ่งที่ยังไม่รู้:"}
        </strong>{" "}
        {l === "en"
          ? "One trial cannot prove an ingredient preference, allergy, or nutritional fit."
          : "การทดลองครั้งเดียวไม่สามารถยืนยันความชอบต่อวัตถุดิบ อาการแพ้ หรือความเหมาะสมทางโภชนาการได้"}
      </div>
      <div className="mt-6">
        <AppButton
          disabled={loading}
          onClick={() => go("tasteprint")}
          icon={<ArrowRight size={18} />}
        >
          {l === "en" ? "Reveal TastePrint" : "เปิดดู TastePrint"}
        </AppButton>
      </div>
    </>
  );
}

function TastePrintScreen({
  l,
  go,
  evidence = 1,
  choice,
}: {
  l: Locale;
  go: (s: Screen) => void;
  evidence?: number;
  choice: Choice;
}) {
  const unclear = choice === "unclear";
  return (
    <>
      <Eyebrow>
        {l === "en" ? "Step 5 · TastePrint" : "ขั้นที่ 5 · TastePrint"}
      </Eyebrow>
      <PageTitle
        sub={
          l === "en"
            ? "It grows only when an observation supports it. Unknowns stay visible."
            : "TastePrint จะเติบโตเมื่อมีข้อสังเกตรองรับ และยังแสดงสิ่งที่ไม่รู้"
        }
      >
        {l === "en"
          ? "A profile that shows uncertainty."
          : "โปรไฟล์ที่ไม่ซ่อนความไม่แน่นอน"}
      </PageTitle>
      <div className="mt-6 rounded-[32px] border border-[var(--line)] bg-white p-5 shadow-soft">
        <TastePrint
          locale={l}
          evidence={unclear ? 0 : evidence}
          signal={!unclear}
          label={
            unclear
              ? l === "en"
                ? "Still uncertain"
                : "ยังไม่แน่นอน"
              : l === "en"
                ? "Early signal"
                : "สัญญาณเบื้องต้น"
          }
        />
        <div className="mt-5 rounded-2xl bg-[var(--soft)] p-4">
          <p className="text-sm font-black">
            {l === "en"
              ? "What changed after this trial"
              : "สิ่งที่เปลี่ยนหลังการทดลองนี้"}
          </p>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
            {unclear
              ? l === "en"
                ? "No clear signal was recorded. PawProud keeps the profile uncertain and recommends repeating—not buying."
                : "ยังไม่มีสัญญาณที่ชัดเจน PawProud จึงคงสถานะไม่แน่นอนและแนะนำให้ทดลองซ้ำแทนการซื้อ"
              : l === "en"
                ? "Aroma now has an early signal. Texture remains paired, while moisture and familiarity still need another comparison."
                : "ตอนนี้ด้านกลิ่นมีสัญญาณเบื้องต้น ส่วนเนื้อสัมผัสยังอยู่เป็นคู่ และความชื้นกับความคุ้นเคยยังต้องทดลองเพิ่มเติม"}
          </p>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center gap-5 text-xs text-[var(--muted)]">
        {!unclear && (
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--coral)]" />
            {l === "en" ? "Observed" : "สังเกตแล้ว"}
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border border-[var(--muted)] bg-white" />
          {l === "en" ? "Learning" : "กำลังเรียนรู้"}
        </span>
      </div>
      <div className="mt-6">
        <AppButton
          onClick={() => go(unclear ? "trial" : "firstBowl")}
          icon={<ArrowRight size={18} />}
        >
          {unclear
            ? l === "en"
              ? "Repeat the Taste Trial"
              : "ทดลอง Taste Trial อีกครั้ง"
            : l === "en"
              ? "See Mochi’s First Bowl"
              : "ดู First Bowl ของโมจิ"}
        </AppButton>
      </div>
    </>
  );
}

function FirstBowl({
  l,
  go,
  choice,
}: {
  l: Locale;
  go: (s: Screen) => void;
  choice: Choice;
}) {
  const chicken = choice === "chicken";
  const bowl = chicken ? "Chicken Comfort Bowl" : "Salmon Signal Bowl";
  const bowlName =
    l === "en" ? bowl : chicken ? "ชามไก่ Comfort" : "ชามแซลมอน Signal";
  return (
    <>
      <Eyebrow>
        {l === "en"
          ? "Step 6 · One paid proof"
          : "ขั้นที่ 6 · การพิสูจน์แบบซื้อครั้งเดียว"}
      </Eyebrow>
      <PageTitle
        sub={
          l === "en"
            ? "A small one-time order based on the early signal. No subscription attached."
            : "คำสั่งซื้อขนาดเล็กครั้งเดียวจากสัญญาณแรก โดยยังไม่ผูก Subscription"
        }
      >
        {l === "en" ? "Meet Mochi’s First Bowl." : "นี่คือ First Bowl ของโมจิ"}
      </PageTitle>
      <div className="mt-5 overflow-hidden rounded-[32px] border border-[var(--line)] bg-white p-3 shadow-soft">
        <TasteBowlCanvas locale={l} />
        <div className="p-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <TinyBadge tone="coral">
                {l === "en" ? "ONE-TIME" : "ซื้อครั้งเดียว"}
              </TinyBadge>
              <h2 className="display mt-2 text-2xl font-black">{bowlName}</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {l === "en"
                  ? "3 guided portions · simulated product"
                  : "3 มื้อพร้อมคำแนะนำ · ผลิตภัณฑ์จำลอง"}
              </p>
            </div>
            <p className="text-right text-xl font-black">฿149</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-bold">
            <div className="rounded-2xl bg-[var(--soft)] p-3">
              {chicken ? "🍗" : "🐟"}
              <span className="mt-1 block">
                {l === "en" ? "Aroma lead" : "นำด้วยกลิ่น"}
              </span>
            </div>
            <div className="rounded-2xl bg-[var(--soft)] p-3">
              🥄
              <span className="mt-1 block">
                {l === "en" ? "Soft texture" : "เนื้อนุ่ม"}
              </span>
            </div>
            <div className="rounded-2xl bg-[var(--soft)] p-3">
              3×
              <span className="mt-1 block">
                {l === "en" ? "Check-ins" : "เช็กผล"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <AppButton
          onClick={() => go("checkout")}
          icon={<ShoppingBag size={18} />}
        >
          {l === "en"
            ? "Buy First Bowl once · ฿149"
            : "ซื้อ First Bowl ครั้งเดียว · ฿149"}
        </AppButton>
      </div>
      <p className="mt-3 text-center text-xs font-bold text-[var(--success)]">
        ✓{" "}
        {l === "en"
          ? "No recurring charge. Subscription comes only after acceptance."
          : "ไม่มีค่าบริการต่อเนื่อง Subscription จะมาหลังยืนยันการยอมรับเท่านั้น"}
      </p>
    </>
  );
}

function Checkout({
  l,
  go,
  choice,
}: {
  l: Locale;
  go: (s: Screen) => void;
  choice: Choice;
}) {
  const bowl =
    choice === "chicken"
      ? l === "en"
        ? "Chicken Comfort Bowl"
        : "ชามไก่ Comfort"
      : l === "en"
        ? "Salmon Signal Bowl"
        : "ชามแซลมอน Signal";
  return (
    <>
      <div className="flex items-center justify-between">
        <TinyBadge tone="warning">
          {l === "en" ? "SIMULATED CHECKOUT" : "หน้าชำระเงินจำลอง"}
        </TinyBadge>
        <span className="text-xs font-bold text-[var(--muted)]">
          {l === "en" ? "No charge" : "ไม่เรียกเก็บเงินจริง"}
        </span>
      </div>
      <h1 className="display mt-4 text-4xl font-black">
        {l === "en" ? "One bowl. No strings." : "หนึ่งชาม ไม่ผูกมัด"}
      </h1>
      <div className="mt-6 space-y-3">
        <div className="rounded-[24px] border border-[var(--line)] bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--soft)] text-2xl">
              🥣
            </div>
            <div className="flex-1">
              <p className="font-black">{bowl}</p>
              <p className="text-xs text-[var(--muted)]">
                {l === "en"
                  ? "3 guided portions · Qty 1"
                  : "3 มื้อพร้อมคำแนะนำ · 1 ชุด"}
              </p>
            </div>
            <p className="font-black">฿149</p>
          </div>
        </div>
        {[
          {
            icon: <MapPin />,
            title: l === "en" ? "Delivery address" : "ที่อยู่จัดส่ง",
            body: "Sukhumvit, Bangkok · 10110",
          },
          {
            icon: <CalendarDays />,
            title: l === "en" ? "Arrival" : "กำหนดส่ง",
            body: l === "en" ? "Tomorrow, 10:00–14:00" : "พรุ่งนี้ 10:00–14:00",
          },
          {
            icon: <CreditCard />,
            title: l === "en" ? "Payment" : "การชำระเงิน",
            body:
              l === "en" ? "Demo card · •••• 4242" : "บัตรจำลอง · •••• 4242",
          },
        ].map((x) => (
          <button
            key={x.title}
            className="pressable flex min-h-[74px] w-full items-center gap-3 rounded-[22px] border border-[var(--line)] bg-white p-4 text-left"
          >
            <span className="text-[var(--coral-dark)]">{x.icon}</span>
            <span className="flex-1">
              <span className="block text-sm font-black">{x.title}</span>
              <span className="mt-0.5 block text-xs text-[var(--muted)]">
                {x.body}
              </span>
            </span>
            <ChevronRight size={18} />
          </button>
        ))}
      </div>
      <div className="mt-6 rounded-2xl bg-[var(--mint)] p-4 text-sm text-[var(--success)]">
        <strong>{l === "en" ? "Trust check:" : "เช็กความไว้วางใจ:"}</strong>{" "}
        {l === "en"
          ? "Subscription is off. This prototype will not charge or ship anything."
          : "Subscription ปิดอยู่ ต้นแบบนี้จะไม่เรียกเก็บเงินหรือจัดส่งจริง"}
      </div>
      <div className="mt-5">
        <AppButton onClick={() => go("receipt")} icon={<Check size={18} />}>
          {l === "en" ? "Place simulated order" : "ยืนยันคำสั่งซื้อจำลอง"}
        </AppButton>
      </div>
    </>
  );
}

function Receipt({ l, confirm }: { l: Locale; confirm: () => void }) {
  return (
    <div className="pt-8 text-center">
      <motion.div
        initial={{ scale: 0.5, rotate: -14 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 14 }}
        className="relative mx-auto grid h-28 w-28 place-items-center rounded-[36px] bg-[var(--mint)] text-[var(--success)]"
      >
        <PackageCheck size={54} />
        <span className="absolute -right-2 -top-2 rounded-full bg-[var(--honey)] px-2 py-1 text-[10px] font-black text-[var(--ink)]">
          {l === "en" ? "DEMO" : "จำลอง"}
        </span>
      </motion.div>
      <h1 className="display mt-6 text-4xl font-black">
        {l === "en" ? "First Bowl is on its way." : "First Bowl กำลังมา"}
      </h1>
      <p className="mx-auto mt-3 max-w-sm leading-7 text-[var(--muted)]">
        {l === "en"
          ? "In the service, we would ask how the meal went before ever offering a subscription."
          : "ในบริการจริง เราจะถามว่ามื้อนี้เป็นอย่างไรก่อนเสนอ Subscription"}
      </p>
      <div className="my-7 rounded-[26px] border border-[var(--line)] bg-white p-5 text-left">
        <div className="flex justify-between text-sm">
          <span className="text-[var(--muted)]">
            {l === "en" ? "Order" : "คำสั่งซื้อ"}
          </span>
          <strong>#PP-MOCHI-01</strong>
        </div>
        <div className="mt-3 flex justify-between text-sm">
          <span className="text-[var(--muted)]">
            {l === "en" ? "Charge" : "ยอดเรียกเก็บ"}
          </span>
          <strong>{l === "en" ? "฿0 · simulated" : "฿0 · จำลอง"}</strong>
        </div>
      </div>
      <AppButton onClick={confirm} icon={<SkipForward size={18} />}>
        {l === "en" ? "Jump ahead 3 days" : "ข้ามไปอีก 3 วัน"}
      </AppButton>
    </div>
  );
}

function Checkin({
  l,
  value,
  setValue,
  warning,
  setWarning,
  submit,
}: {
  l: Locale;
  value: string;
  setValue: (x: string) => void;
  warning: boolean;
  setWarning: (x: boolean) => void;
  submit: () => void;
}) {
  const opts = [
    {
      v: "finished",
      e: "✨",
      t: l === "en" ? "Finished it" : "กินหมด",
      s: l === "en" ? "Bowl looked clean" : "ชามเกือบสะอาด",
    },
    {
      v: "some",
      e: "🥄",
      t: l === "en" ? "Some left" : "เหลือบางส่วน",
      s: l === "en" ? "Accepted, not finished" : "ยอมกินแต่ไม่หมด",
    },
    {
      v: "skipped",
      e: "〰️",
      t: l === "en" ? "Skipped it" : "ไม่กิน",
      s: l === "en" ? "Little or no intake" : "กินน้อยหรือไม่กิน",
    },
  ];
  return (
    <>
      <Eyebrow>
        {l === "en"
          ? "3 days later · Meal check-in"
          : "3 วันต่อมา · เช็กมื้ออาหาร"}
      </Eyebrow>
      <PageTitle
        sub={
          l === "en"
            ? "This is the proof we need before asking for a repeat."
            : "นี่คือหลักฐานที่เราต้องมีก่อนชวนให้สั่งซ้ำ"
        }
      >
        {l === "en"
          ? "How did the First Bowl go?"
          : "First Bowl เป็นอย่างไรบ้าง?"}
      </PageTitle>
      <div className="mt-6 space-y-3">
        {opts.map((o) => (
          <button
            key={o.v}
            onClick={() => setValue(o.v)}
            className={`pressable flex min-h-[86px] w-full items-center gap-4 rounded-[24px] border-2 p-4 text-left ${value === o.v ? "border-[var(--coral-dark)] bg-[#fff4f5]" : "border-[var(--line)] bg-white"}`}
          >
            <span className="text-3xl">{o.e}</span>
            <span className="flex-1">
              <strong className="block">{o.t}</strong>
              <span className="text-xs text-[var(--muted)]">{o.s}</span>
            </span>
            {value === o.v && (
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--coral-dark)] text-white">
                <Check size={16} />
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-[22px] border border-[var(--line)] bg-white p-4">
        <p className="text-sm font-black">
          {l === "en" ? "Any warning signs?" : "มีอาการผิดปกติไหม?"}
        </p>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => setWarning(false)}
            className={`rounded-full px-4 py-2 text-xs font-black ${!warning ? "bg-[var(--mint)] text-[var(--success)]" : "bg-[var(--soft)] text-[var(--muted)]"}`}
          >
            ✓ {l === "en" ? "None reported" : "ไม่พบอาการ"}
          </button>
          <button
            onClick={() => setWarning(true)}
            className={`rounded-full px-4 py-2 text-xs font-bold ${warning ? "bg-[#ffe3e7] text-[var(--danger)]" : "bg-[var(--soft)] text-[var(--muted)]"}`}
          >
            + {l === "en" ? "Report a sign" : "รายงานอาการ"}
          </button>
        </div>
        {warning && (
          <p className="mt-3 rounded-xl bg-[#fff1ce] p-3 text-xs leading-5 text-[var(--warning)]">
            {l === "en"
              ? "PawProud will stop the repeat flow and show safety guidance."
              : "PawProud จะหยุดการสั่งซ้ำและแสดงคำแนะนำความปลอดภัย"}
          </p>
        )}
      </div>
      <div className="mt-6">
        <AppButton
          disabled={!value}
          onClick={submit}
          icon={<ArrowRight size={18} />}
        >
          {value
            ? l === "en"
              ? "Save check-in"
              : "บันทึกผล"
            : l === "en"
              ? "Choose how the bowl went"
              : "เลือกผลของมื้อนี้"}
        </AppButton>
      </div>
    </>
  );
}

function Subscription({
  l,
  patch,
  done,
}: {
  l: Locale;
  patch: (x: Partial<AppState>) => void;
  done: () => void;
}) {
  return (
    <>
      <TinyBadge tone="success">
        {l === "en" ? "ACCEPTANCE CONFIRMED" : "ยืนยันการยอมรับแล้ว"}
      </TinyBadge>
      <PageTitle
        sub={
          l === "en"
            ? "Mochi accepted the First Bowl. Now recurring delivery can be a convenience—not a gamble."
            : "โมจิยอมรับ First Bowl แล้ว ตอนนี้การจัดส่งซ้ำจึงเป็นความสะดวก ไม่ใช่การเดา"
        }
      >
        {l === "en" ? (
          <>
            The subscription has to{" "}
            <span className="text-[var(--coral-dark)]">earn its place.</span>
          </>
        ) : (
          <>
            Subscription ต้อง
            <span className="text-[var(--coral-dark)]">ได้รับความไว้วางใจ</span>
          </>
        )}
      </PageTitle>
      <div className="mt-6 rounded-[30px] border-2 border-[var(--coral-dark)] bg-white p-5 shadow-soft">
        <div className="flex items-start justify-between">
          <div>
            <TinyBadge tone="coral">
              {l === "en" ? "OPTIONAL" : "ทางเลือก"}
            </TinyBadge>
            <h2 className="display mt-2 text-2xl font-black">
              {l === "en" ? "Signature Bowl Plan" : "แผน Signature Bowl"}
            </h2>
          </div>
          <span className="font-black">
            ฿790
            <span className="text-xs font-medium text-[var(--muted)]">
              {" "}
              {l === "en" ? "/ cycle" : "/ รอบ"}
            </span>
          </span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <button className="rounded-2xl bg-[var(--chocolate)] p-3 text-sm font-black text-white">
            {l === "en" ? "Every 14 days" : "ทุก 14 วัน"}
          </button>
          <button className="rounded-2xl bg-[var(--soft)] p-3 text-sm font-bold">
            {l === "en" ? "Every 28 days" : "ทุก 28 วัน"}
          </button>
        </div>
        <ul className="mt-5 space-y-2 text-sm text-[var(--muted)]">
          <li>✓ {l === "en" ? "Skip any delivery" : "ข้ามการจัดส่งได้"}</li>
          <li>
            ✓{" "}
            {l === "en" ? "Pause or cancel visibly" : "พักหรือยกเลิกได้ชัดเจน"}
          </li>
          <li>
            ✓{" "}
            {l === "en"
              ? "TastePrint follows every check-in"
              : "TastePrint อัปเดตทุกครั้ง"}
          </li>
        </ul>
      </div>
      <div className="mt-5 space-y-3">
        <AppButton
          onClick={() => {
            patch({ subscribed: true, paused: false });
            done();
          }}
          icon={<CalendarDays size={18} />}
        >
          {l === "en" ? "Start simulated plan" : "เริ่มแผนจำลอง"}
        </AppButton>
        <AppButton
          variant="secondary"
          onClick={() => {
            patch({ subscribed: false });
            done();
          }}
        >
          {l === "en" ? "Keep buying one at a time" : "ซื้อครั้งเดียวต่อไป"}
        </AppButton>
      </div>
      <p className="mt-4 text-center text-xs text-[var(--muted)]">
        {l === "en"
          ? "Prototype only · no payment or renewal"
          : "ต้นแบบเท่านั้น · ไม่มีการชำระหรือการต่ออายุจริง"}
      </p>
    </>
  );
}

function Today({
  l,
  state,
  go,
}: {
  l: Locale;
  state: AppState;
  go: (s: Screen) => void;
}) {
  const next = !state.ordered
    ? "trial"
    : !state.checkedIn
      ? "checkin"
      : "passport";
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[var(--muted)]">
            {l === "en" ? "Good morning," : "สวัสดีตอนเช้า"}
          </p>
          <h1 className="display text-4xl font-black">
            {l === "en" ? "Mochi & you" : "โมจิและคุณ"}
          </h1>
        </div>
        <button
          onClick={() => go("profile")}
          className="pressable grid h-14 w-14 place-items-center rounded-[20px] bg-[var(--soft)] text-2xl"
        >
          🐶
        </button>
      </div>
      <PawPath
        active={state.checkedIn ? 4 : state.ordered ? 3 : state.choice ? 1 : 0}
        l={l}
      />
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => go(next)}
        className="relative w-full overflow-hidden rounded-[30px] bg-[var(--chocolate)] p-5 text-left text-white shadow-soft"
      >
        <div className="absolute -right-7 -top-8 h-32 w-32 rounded-full bg-[var(--coral)]/30" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <TinyBadge tone="coral">
              {l === "en" ? "NEXT CARE STEP" : "ขั้นตอนถัดไป"}
            </TinyBadge>
            <span className="flex items-center gap-1 text-xs text-white/70">
              <Clock3 size={13} /> {l === "en" ? "3 min" : "3 นาที"}
            </span>
          </div>
          <h2 className="display mt-5 text-3xl font-black">
            {!state.ordered
              ? l === "en"
                ? "Let Mochi answer."
                : "ให้โมจิตอบ"
              : !state.checkedIn
                ? l === "en"
                  ? "How was the bowl?"
                  : "ชามนี้เป็นอย่างไร?"
                : l === "en"
                  ? "See what we learned."
                  : "ดูสิ่งที่เราเรียนรู้"}
          </h2>
          <p className="mt-2 max-w-[290px] text-sm leading-6 text-white/70">
            {!state.ordered
              ? l === "en"
                ? "Start a two-taste comparison before committing to food."
                : "เริ่มเปรียบเทียบสองรสก่อนตัดสินใจ"
              : !state.checkedIn
                ? l === "en"
                  ? "Your meal check-in keeps the plan honest."
                  : "การเช็กมื้ออาหารทำให้แผนตรงกับความจริง"
                : l === "en"
                  ? "Mochi’s Care Passport now holds the full story."
                  : "Care Passport ของโมจิมีเรื่องราวครบแล้ว"}
          </p>
          <span className="mt-6 inline-flex h-11 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-black text-[var(--chocolate)]">
            {l === "en" ? "Continue" : "ไปต่อ"}
            <ArrowRight size={16} />
          </span>
        </div>
      </motion.button>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          onClick={() => go("tasteprint")}
          className="pressable rounded-[24px] border border-[var(--line)] bg-white p-4 text-left"
        >
          <TastePrint locale={l} compact evidence={state.checkedIn ? 2 : 1} />
          <p className="mt-1 font-black">TastePrint</p>
          <p className="text-xs text-[var(--muted)]">
            {state.checkedIn
              ? l === "en"
                ? "2 evidence points"
                : "หลักฐาน 2 จุด"
              : l === "en"
                ? "1 early signal"
                : "1 สัญญาณเบื้องต้น"}
          </p>
        </button>
        <button
          onClick={() => go("delivery")}
          className="pressable flex flex-col rounded-[24px] border border-[var(--line)] bg-white p-4 text-left"
        >
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--sky)] text-[var(--trust)]">
            <Truck />
          </span>
          <p className="mt-auto pt-5 font-black">
            {l === "en" ? "Delivery" : "การจัดส่ง"}
          </p>
          <p className="text-xs text-[var(--muted)]">
            {state.ordered
              ? l === "en"
                ? "Delivered · demo"
                : "ส่งแล้ว · จำลอง"
              : l === "en"
                ? "No active order"
                : "ไม่มีคำสั่งซื้อ"}
          </p>
        </button>
      </div>
      <div className="mt-5 rounded-[24px] border border-[var(--line)] bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="font-black">
            {l === "en" ? "Care memory" : "ความทรงจำการดูแล"}
          </p>
          <button
            onClick={() => go("passport")}
            className="text-xs font-black text-[var(--coral-dark)]"
          >
            {l === "en" ? "Open passport" : "เปิดพาสปอร์ต"}
          </button>
        </div>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          {l === "en"
            ? "Last updated today from an owner-reported trial."
            : "อัปเดตวันนี้จากการทดลองที่เจ้าของรายงาน"}
        </p>
      </div>
    </>
  );
}

function Plan({
  l,
  state,
  patch,
  go,
}: {
  l: Locale;
  state: AppState;
  patch: (x: Partial<AppState>) => void;
  go: (s: Screen) => void;
}) {
  const accepted =
    state.checkedIn &&
    !state.warningReported &&
    (state.checkin === "finished" || state.checkin === "some");
  return (
    <>
      <Eyebrow>{l === "en" ? "Mochi’s food plan" : "แผนอาหารของโมจิ"}</Eyebrow>
      <PageTitle
        sub={
          state.subscribed
            ? l === "en"
              ? "You remain in control of every delivery."
              : "คุณควบคุมทุกการจัดส่ง"
            : l === "en"
              ? "No recurring plan is active."
              : "ยังไม่มีแผนต่อเนื่อง"
        }
      >
        {state.subscribed
          ? state.paused
            ? l === "en"
              ? "Plan paused."
              : "พักแผนอยู่"
            : l === "en"
              ? "Signature Bowl Plan"
              : "แผน Signature Bowl"
          : l === "en"
            ? "Buy only when it makes sense."
            : "ซื้อเมื่อเหมาะสมเท่านั้น"}
      </PageTitle>
      {state.subscribed ? (
        <>
          <div className="mt-6 overflow-hidden rounded-[30px] border border-[var(--line)] bg-white shadow-soft">
            <div className="bg-[var(--chocolate)] p-5 text-white">
              <div className="flex items-center justify-between">
                <TinyBadge tone={state.paused ? "warning" : "success"}>
                  {state.paused
                    ? l === "en"
                      ? "PAUSED"
                      : "พักอยู่"
                    : l === "en"
                      ? "ACTIVE · DEMO"
                      : "ใช้งาน · จำลอง"}
                </TinyBadge>
                <span className="text-sm font-black">฿790</span>
              </div>
              <h2 className="display mt-4 text-2xl font-black">
                {l === "en" ? "Next Signature Bowl" : "Signature Bowl ถัดไป"}
              </h2>
              <p className="mt-1 text-sm text-white/65">
                {state.skipped
                  ? l === "en"
                    ? "Skipped · next cycle in 28 days"
                    : "ข้ามแล้ว · รอบถัดไปใน 28 วัน"
                  : l === "en"
                    ? "28 October · 3 guided pouches"
                    : "28 ตุลาคม · 3 ซองพร้อมคำแนะนำ"}
              </p>
            </div>
            <div className="p-5">
              <div className="mb-4 flex justify-between text-sm">
                <span className="text-[var(--muted)]">
                  {l === "en" ? "Rhythm" : "รอบจัดส่ง"}
                </span>
                <strong>{l === "en" ? "Every 14 days" : "ทุก 14 วัน"}</strong>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => patch({ skipped: !state.skipped })}
                  className="pressable min-h-12 rounded-2xl bg-[var(--soft)] text-sm font-black"
                >
                  {state.skipped
                    ? l === "en"
                      ? "Undo skip"
                      : "ยกเลิกการข้าม"
                    : l === "en"
                      ? "Skip next"
                      : "ข้ามรอบถัดไป"}
                </button>
                <button
                  onClick={() => patch({ paused: !state.paused })}
                  className="pressable min-h-12 rounded-2xl bg-[var(--soft)] text-sm font-black"
                >
                  {state.paused
                    ? l === "en"
                      ? "Resume"
                      : "ทำต่อ"
                    : l === "en"
                      ? "Pause"
                      : "พักแผน"}
                </button>
              </div>
              <button
                onClick={() => patch({ subscribed: false, paused: false })}
                className="mt-3 min-h-11 w-full text-sm font-bold text-[var(--danger)] underline underline-offset-4"
              >
                {l === "en" ? "Cancel simulated plan" : "ยกเลิกแผนจำลอง"}
              </button>
            </div>
          </div>
          <button
            onClick={() => go("delivery")}
            className="pressable mt-4 flex min-h-[70px] w-full items-center gap-3 rounded-[22px] border border-[var(--line)] bg-white p-4 text-left"
          >
            <Truck className="text-[var(--trust)]" />
            <span className="flex-1">
              <strong className="block">
                {l === "en" ? "Delivery details" : "รายละเอียดการจัดส่ง"}
              </strong>
              <span className="text-xs text-[var(--muted)]">
                {l === "en"
                  ? "Timeline, address, and order state"
                  : "ไทม์ไลน์ ที่อยู่ และสถานะคำสั่งซื้อ"}
              </span>
            </span>
            <ChevronRight />
          </button>
        </>
      ) : (
        <div className="mt-6 rounded-[30px] border border-dashed border-[var(--line)] bg-white p-6 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-[24px] bg-[var(--soft)]">
            <CalendarDays />
          </span>
          <p className="mt-4 font-black">
            {l === "en" ? "No automatic deliveries" : "ไม่มีการจัดส่งอัตโนมัติ"}
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            {accepted
              ? l === "en"
                ? "Mochi accepted the First Bowl. A plan is now available—but still optional."
                : "โมจิยอมรับ First Bowl แล้ว ตอนนี้มีแผนให้เลือก แต่ไม่บังคับ"
              : state.warningReported
                ? l === "en"
                  ? "A warning sign paused repeat ordering. Review safety guidance first."
                  : "อาการผิดปกติทำให้ระบบหยุดการสั่งซ้ำ กรุณาดูคำแนะนำความปลอดภัย"
                : state.checkin === "skipped"
                  ? l === "en"
                    ? "Mochi skipped the bowl. Repeat learning before considering a plan."
                    : "โมจิไม่กินชามนี้ ควรเรียนรู้ซ้ำก่อนพิจารณาแผน"
                  : l === "en"
                    ? "Complete the First Bowl and meal check-in before considering a plan."
                    : "ทำ First Bowl และเช็กมื้ออาหารก่อนพิจารณาแผน"}
          </p>
          <button
            onClick={() =>
              go(
                accepted
                  ? "subscription"
                  : state.warningReported
                    ? "help"
                    : "today",
              )
            }
            className="mt-5 text-sm font-black text-[var(--coral-dark)]"
          >
            {accepted
              ? l === "en"
                ? "View optional plan"
                : "ดูแผนทางเลือก"
              : state.warningReported
                ? l === "en"
                  ? "Open safety guidance"
                  : "เปิดคำแนะนำความปลอดภัย"
                : l === "en"
                  ? "See next care step"
                  : "ดูขั้นตอนดูแลถัดไป"}{" "}
            →
          </button>
        </div>
      )}
    </>
  );
}

function Passport({ l, state }: { l: Locale; state: AppState }) {
  const provenance = (tag: string) =>
    l === "en"
      ? tag
      : tag === "OWNER"
        ? "เจ้าของ"
        : tag === "SYSTEM"
          ? "ระบบ"
          : "จำลอง";
  const mealStatus = !state.checkedIn
    ? l === "en"
      ? "Awaiting check-in"
      : "รอการเช็ก"
    : state.warningReported
      ? l === "en"
        ? "Warning sign reported · flow paused"
        : "พบอาการ · หยุด Flow"
      : state.checkin === "skipped"
        ? l === "en"
          ? "Skipped · repeat before plan"
          : "ไม่กิน · ทดลองซ้ำก่อนเริ่มแผน"
        : state.checkin === "some"
          ? l === "en"
            ? "Some left · accepted"
            : "เหลือบางส่วน · ยอมรับ"
          : l === "en"
            ? "Finished · none reported"
            : "กินหมด · ไม่พบอาการ";
  const events = [
    {
      icon: <UserRound />,
      t: l === "en" ? "Mochi’s identity" : "ข้อมูลของโมจิ",
      s:
        l === "en"
          ? "Demo profile · owner controlled"
          : "โปรไฟล์จำลอง · เจ้าของควบคุม",
      tag: "OWNER",
    },
    {
      icon: <Sparkles />,
      t: l === "en" ? "TastePrint · Early signal" : "TastePrint · สัญญาณแรก",
      s:
        l === "en"
          ? "Aroma observed; 3 dimensions still learning"
          : "พบสัญญาณด้านกลิ่น อีก 3 ด้านกำลังเรียนรู้",
      tag: "SYSTEM",
    },
    {
      icon: <Utensils />,
      t: l === "en" ? "Taste Trial #1" : "ทดลองรสชาติ #1",
      s:
        l === "en"
          ? "Owner reported approach, intake and body language"
          : "เจ้าของรายงานการเข้าหา ปริมาณ และภาษากาย",
      tag: "OWNER",
    },
    {
      icon: <ShoppingBag />,
      t: l === "en" ? "First Bowl" : "First Bowl",
      s: state.ordered
        ? l === "en"
          ? "One-time order · simulated"
          : "ซื้อครั้งเดียว · จำลอง"
        : l === "en"
          ? "Not ordered"
          : "ยังไม่สั่ง",
      tag: "DEMO",
    },
    {
      icon: <HeartPulse />,
      t: l === "en" ? "Meal acceptance" : "การยอมรับมื้ออาหาร",
      s: mealStatus,
      tag: "OWNER",
    },
  ];
  return (
    <>
      <div className="rounded-[30px] bg-[var(--chocolate)] p-5 text-white shadow-soft">
        <div className="flex items-start justify-between">
          <div>
            <TinyBadge tone="coral">
              {l === "en" ? "CARE PASSPORT" : "พาสปอร์ตการดูแล"}
            </TinyBadge>
            <h1 className="display mt-3 text-3xl font-black">Mochi</h1>
            <p className="mt-1 text-sm text-white/65">
              {l === "en"
                ? "Shih Tzu mix · 4 years · 6.8 kg"
                : "ชิสุผสม · 4 ปี · 6.8 กก."}
            </p>
          </div>
          <div className="grid h-16 w-16 place-items-center rounded-[22px] bg-white text-4xl">
            🐶
          </div>
        </div>
        <div className="mt-5 flex items-center gap-2 text-xs text-white/70">
          <ShieldCheck size={15} />{" "}
          {l === "en"
            ? "Owner-controlled prototype · updated today"
            : "ต้นแบบที่เจ้าของควบคุม · อัปเดตวันนี้"}
        </div>
      </div>
      <div className="relative mt-6 pl-4">
        <div className="absolute bottom-6 left-[31px] top-6 w-1 rounded-full bg-gradient-to-b from-[var(--coral)] via-[var(--honey)] to-[var(--trust)]" />
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, 315] }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-[22px] top-4 z-10 grid h-5 w-5 place-items-center rounded-full bg-white text-[var(--coral-dark)] shadow"
        >
          <PawPrint size={13} />
        </motion.div>
        <div className="space-y-3">
          {events.map((e, i) => (
            <motion.div
              key={e.t}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative ml-10 rounded-[24px] border border-[var(--line)] bg-white p-4"
            >
              <span className="absolute -left-[47px] top-5 grid h-9 w-9 place-items-center rounded-2xl border-4 border-[var(--canvas)] bg-[var(--soft)] text-[var(--chocolate)]">
                {e.icon}
              </span>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-black">{e.t}</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                    {e.s}
                  </p>
                </div>
                <TinyBadge
                  tone={
                    e.tag === "OWNER"
                      ? "coral"
                      : e.tag === "SYSTEM"
                        ? "blue"
                        : "warning"
                  }
                >
                  {provenance(e.tag)}
                </TinyBadge>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {[
          {
            i: <Home />,
            t: "HomeReady",
            s: l === "en" ? "Future concept" : "แนวคิดอนาคต",
          },
          {
            i: <HeartPulse />,
            t: l === "en" ? "Emergency brief" : "ข้อมูลฉุกเฉิน",
            s: l === "en" ? "Future concept" : "แนวคิดอนาคต",
          },
        ].map((x) => (
          <div
            key={x.t}
            className="rounded-[22px] border-2 border-dashed border-[var(--line)] bg-white/50 p-4 text-[var(--muted)]"
          >
            <span>{x.i}</span>
            <p className="mt-4 text-sm font-black">{x.t}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider">
              {x.s}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          alert(
            l === "en"
              ? "Simulated preview only—nothing was shared."
              : "เป็นเพียงตัวอย่าง—ยังไม่มีการแชร์ข้อมูล",
          )
        }
        className="pressable mt-4 flex min-h-14 w-full items-center justify-center gap-2 rounded-[18px] border-2 border-[var(--chocolate)] bg-white font-black"
      >
        <Download size={18} />
        {l === "en" ? "Preview share summary" : "ดูตัวอย่างสรุปสำหรับแชร์"}
      </button>
      <p className="mt-3 text-center text-xs text-[var(--muted)]">
        {l === "en"
          ? "None reported does not mean no condition."
          : "คำว่าไม่พบอาการ ไม่ได้หมายความว่าไม่มีภาวะใดๆ"}
      </p>
    </>
  );
}

function Delivery({ l, ordered }: { l: Locale; ordered: boolean }) {
  const steps =
    l === "en"
      ? ["Preparing", "Packed", "On the way", "Delivered"]
      : ["กำลังเตรียม", "แพ็กแล้ว", "กำลังจัดส่ง", "ส่งแล้ว"];
  return (
    <>
      <Eyebrow>{l === "en" ? "Order journey" : "เส้นทางคำสั่งซื้อ"}</Eyebrow>
      <PageTitle
        sub={
          l === "en"
            ? "A practical preview of how the physical service would communicate trust."
            : "ตัวอย่างการสื่อสารความน่าเชื่อถือของบริการจริง"
        }
      >
        {l === "en" ? "Know where every bowl is." : "รู้ว่าทุกชามอยู่ที่ไหน"}
      </PageTitle>
      <div className="mt-6 rounded-[30px] border border-[var(--line)] bg-white p-5 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <TinyBadge tone="warning">
              {l === "en" ? "SIMULATED" : "จำลอง"}
            </TinyBadge>
            <p className="mt-2 font-black">#PP-MOCHI-01</p>
          </div>
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--sky)] text-[var(--trust)]">
            <Truck />
          </div>
        </div>
        <div className="mt-7 space-y-0">
          {steps.map((s, i) => (
            <div key={s} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full ${ordered ? "bg-[var(--success)] text-white" : i === 0 ? "bg-[var(--honey)]" : "bg-[var(--soft)] text-[var(--muted)]"}`}
                >
                  {ordered ? <Check size={15} /> : i + 1}
                </span>
                {i < steps.length - 1 && (
                  <span
                    className={`h-10 w-1 ${ordered ? "bg-[var(--success)]" : "bg-[var(--line)]"}`}
                  />
                )}
              </div>
              <div>
                <p className="text-sm font-black">{s}</p>
                <p className="text-xs text-[var(--muted)]">
                  {ordered
                    ? ["09:12", "10:03", "12:26", "13:18"][i]
                    : l === "en"
                      ? "Pending"
                      : "รอดำเนินการ"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 rounded-[24px] border border-[var(--line)] bg-white p-4">
        <div className="flex gap-3">
          <MapPin className="text-[var(--coral-dark)]" />
          <div>
            <p className="font-black">Sukhumvit, Bangkok</p>
            <p className="text-xs text-[var(--muted)]">
              {l === "en"
                ? "Demo address · not stored on a server"
                : "ที่อยู่จำลอง · ไม่ได้จัดเก็บบนเซิร์ฟเวอร์"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function Profile({ l }: { l: Locale }) {
  return (
    <>
      <Eyebrow>{l === "en" ? "Dog profile" : "โปรไฟล์สุนัข"}</Eyebrow>
      <div className="rounded-[30px] bg-white p-5 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="grid h-20 w-20 place-items-center rounded-[28px] bg-[var(--soft)] text-5xl">
            🐶
          </div>
          <div>
            <TinyBadge tone="warning">
              {l === "en" ? "DEMO PROFILE" : "โปรไฟล์จำลอง"}
            </TinyBadge>
            <h1 className="display mt-2 text-3xl font-black">Mochi</h1>
            <p className="text-sm text-[var(--muted)]">
              {l === "en" ? "Shih Tzu mix · Male" : "ชิสุผสม · เพศผู้"}
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {(l === "en"
            ? [
                ["Age", "4 years"],
                ["Weight", "6.8 kg"],
                ["Life stage", "Adult"],
                ["Current food", "Dry + topper"],
              ]
            : [
                ["อายุ", "4 ปี"],
                ["น้ำหนัก", "6.8 กก."],
                ["ช่วงวัย", "โตเต็มวัย"],
                ["อาหารปัจจุบัน", "อาหารเม็ด + ท็อปเปอร์"],
              ]
          ).map(([a, b]) => (
            <button
              key={a}
              className="pressable rounded-[20px] bg-[var(--soft)] p-4 text-left"
            >
              <span className="text-xs text-[var(--muted)]">{a}</span>
              <strong className="mt-1 block text-sm">{b}</strong>
            </button>
          ))}
        </div>
        <button
          onClick={() =>
            alert(
              l === "en"
                ? "Profile edit saved locally in the full product concept."
                : "ตัวอย่างการแก้โปรไฟล์จะบันทึกในเครื่องสำหรับผลิตภัณฑ์ฉบับเต็ม",
            )
          }
          className="pressable mt-4 min-h-12 w-full rounded-2xl border-2 border-[var(--chocolate)] text-sm font-black"
        >
          {l === "en" ? "Edit profile preview" : "ทดลองแก้ไขโปรไฟล์"}
        </button>
      </div>
      <div className="mt-4 rounded-[22px] border border-[var(--line)] bg-white p-4 text-sm leading-6 text-[var(--muted)]">
        <strong className="text-[var(--ink)]">
          {l === "en" ? "Source:" : "แหล่งข้อมูล:"}
        </strong>{" "}
        {l === "en"
          ? "Owner-entered demo data. PawProud keeps reported identity separate from observed food behavior."
          : "ข้อมูลจำลองที่เจ้าของกรอก PawProud แยกข้อมูลตัวตนที่รายงานออกจากพฤติกรรมการกินที่สังเกตได้"}
      </div>
    </>
  );
}

function Help({ l, go }: { l: Locale; go: (s: Screen) => void }) {
  return (
    <>
      <Eyebrow>
        {l === "en" ? "Safety & support" : "ความปลอดภัยและความช่วยเหลือ"}
      </Eyebrow>
      <PageTitle
        sub={
          l === "en"
            ? "The prototype cannot diagnose or replace professional care."
            : "ต้นแบบนี้ไม่สามารถวินิจฉัยหรือแทนที่การดูแลจากผู้เชี่ยวชาญได้"
        }
      >
        {l === "en" ? "Know when to stop." : "รู้ว่าเมื่อไรควรหยุด"}
      </PageTitle>
      <div className="mt-6 space-y-3">
        <div className="rounded-[24px] border-2 border-[var(--danger)] bg-white p-5">
          <div className="flex gap-3">
            <HeartPulse className="shrink-0 text-[var(--danger)]" />
            <div>
              <p className="font-black">
                {l === "en" ? "Urgent signs" : "อาการเร่งด่วน"}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                {l === "en"
                  ? "Breathing difficulty, collapse, repeated vomiting, severe swelling, or rapid deterioration need immediate veterinary help."
                  : "หายใจลำบาก หมดสติ อาเจียนซ้ำ บวมรุนแรง หรืออาการแย่ลงเร็ว ควรพบสัตวแพทย์ทันที"}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-[24px] border border-[var(--line)] bg-white p-5">
          <p className="font-black">
            {l === "en" ? "Trial rules" : "กติกาการทดลอง"}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            {(l === "en"
              ? [
                  "Use only eligible foods and known-safe portions.",
                  "Keep fresh water available.",
                  "Stop if behavior or wellbeing changes.",
                ]
              : [
                  "ใช้เฉพาะอาหารที่เหมาะสมและปริมาณที่ทราบว่าปลอดภัย",
                  "เตรียมน้ำสะอาดไว้เสมอ",
                  "หยุดทันทีหากพฤติกรรมหรือสุขภาวะเปลี่ยนไป",
                ]
            ).map((rule) => (
              <li key={rule}>• {rule}</li>
            ))}
          </ul>
        </div>
        <AppButton variant="secondary" onClick={() => go("safety")}>
          {l === "en" ? "Review Safety Check" : "ทบทวน Safety Check"}
        </AppButton>
      </div>
    </>
  );
}

function More({
  l,
  state,
  patch,
  reset,
  go,
  soundOn,
  setSoundOn,
}: {
  l: Locale;
  state: AppState;
  patch: (x: Partial<AppState>) => void;
  reset: () => void;
  go: (s: Screen) => void;
  soundOn: boolean;
  setSoundOn: (x: boolean) => void;
}) {
  return (
    <>
      <Eyebrow>
        {l === "en" ? "Settings & support" : "การตั้งค่าและความช่วยเหลือ"}
      </Eyebrow>
      <PageTitle>
        {l === "en" ? "Make PawProud yours." : "ปรับ PawProud ให้เป็นของคุณ"}
      </PageTitle>
      <div className="mt-6 space-y-3">
        {[
          {
            i: <UserRound />,
            t: l === "en" ? "Mochi’s profile" : "โปรไฟล์โมจิ",
            s: l === "en" ? "Demo profile" : "โปรไฟล์จำลอง",
            a: () => go("profile"),
          },
          {
            i: <CircleHelp />,
            t: l === "en" ? "Safety & help" : "ความปลอดภัยและความช่วยเหลือ",
            s:
              l === "en"
                ? "When to pause or seek care"
                : "เมื่อใดควรหยุดหรือพบผู้เชี่ยวชาญ",
            a: () => go("help"),
          },
          {
            i: soundOn ? <Volume2 /> : <VolumeX />,
            t: l === "en" ? "Tutorial sound" : "เสียงแนะนำ",
            s: soundOn
              ? l === "en"
                ? "On · English voice"
                : "เปิด · เสียงภาษาอังกฤษ"
              : l === "en"
                ? "Off"
                : "ปิด",
            a: () => setSoundOn(!soundOn),
          },
          {
            i: <Languages />,
            t: l === "en" ? "Language" : "ภาษา",
            s: state.locale === "en" ? "English" : "ไทย",
            a: () => patch({ locale: state.locale === "en" ? "th" : "en" }),
          },
        ].map((x) => (
          <button
            key={x.t}
            onClick={x.a}
            className="pressable flex min-h-[78px] w-full items-center gap-3 rounded-[22px] border border-[var(--line)] bg-white p-4 text-left"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--soft)] text-[var(--chocolate)]">
              {x.i}
            </span>
            <span className="flex-1">
              <strong className="block text-sm">{x.t}</strong>
              <span className="text-xs text-[var(--muted)]">{x.s}</span>
            </span>
            <ChevronRight size={18} />
          </button>
        ))}
      </div>
      <div className="mt-7 rounded-[24px] bg-[var(--soft)] p-4">
        <p className="text-sm font-black">
          {l === "en" ? "Prototype controls" : "การควบคุมต้นแบบ"}
        </p>
        <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
          {l === "en"
            ? "Reset Mochi to replay the complete judge demo."
            : "รีเซ็ตโมจิเพื่อเล่นเดโมตั้งแต่ต้น"}
        </p>
        <button
          onClick={reset}
          className="pressable mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white text-sm font-black text-[var(--danger)]"
        >
          <RotateCcw size={16} /> {l === "en" ? "Reset demo" : "รีเซ็ตเดโม"}
        </button>
      </div>
      <Link
        href="/story/"
        className="mt-5 flex min-h-14 items-center justify-center gap-2 rounded-[18px] border-2 border-[var(--chocolate)] bg-white font-black"
      >
        {l === "en" ? "Return to presentation" : "กลับสู่เว็บไซต์นำเสนอ"}
        <ArrowRight size={18} />
      </Link>
    </>
  );
}

export function ProductExperience() {
  const { state, setState, hydrated } = usePersistedState();
  const [loading, setLoading] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [guideTime, setGuideTime] = useState(0);
  const [guideDuration, setGuideDuration] = useState(37.1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const l = state.locale;
  useEffect(() => {
    document.documentElement.lang = l;
  }, [l]);
  const patch = (next: Partial<AppState>) =>
    setState((s) => ({ ...s, ...next }));
  const go = (screen: Screen) => patch({ screen });
  const playGuide = () => {
    setSoundOn(true);
    audioRef.current?.play().catch(() => setPlaying(false));
  };
  const closeGuide = () => {
    audioRef.current?.pause();
    setSoundOn(false);
    setPlaying(false);
  };
  const replayGuide = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => setPlaying(false));
      setSoundOn(true);
    }
  };
  const toggleGuide = () => {
    if (audioRef.current?.paused) playGuide();
    else audioRef.current?.pause();
  };
  const flow: Screen[] = [
    "welcome",
    "safety",
    "safetyHold",
    "trial",
    "observe",
    "feedback",
    "tasteprint",
    "firstBowl",
    "checkout",
    "receipt",
    "checkin",
    "subscription",
  ];
  const backMap: Partial<Record<Screen, Screen>> = {
    safety: "welcome",
    safetyHold: "safety",
    trial: "safety",
    observe: "trial",
    feedback: "observe",
    tasteprint: "feedback",
    firstBowl: "tasteprint",
    checkout: "firstBowl",
    receipt: "checkout",
    checkin: "today",
    subscription: "checkin",
    profile: "today",
    delivery: "plan",
    help: "more",
  };
  const progressMap: Partial<Record<Screen, number>> = {
    safety: 10,
    trial: 25,
    observe: 38,
    feedback: 50,
    tasteprint: 63,
    firstBowl: 75,
    checkout: 82,
    receipt: 88,
    checkin: 94,
    subscription: 100,
  };
  const navScreens: Screen[] = [
    "today",
    "tasteprint",
    "plan",
    "passport",
    "more",
    "profile",
    "delivery",
    "help",
  ];

  const fetchFeedback = async () => {
    setLoading(true);
    go("feedback");
    const fallback =
      l === "en"
        ? state.choice === "unclear"
          ? "Mochi did not show a clear first choice in this trial. That is useful evidence too: repeat the same comparison another day without changing multiple things at once."
          : `Mochi showed a stronger response to the ${state.choice} aroma in this trial. Treat this as an early preference signal, not a final conclusion. Repeat the comparison on another day before changing his regular food.`
        : state.choice === "unclear"
          ? "โมจิยังไม่แสดงตัวเลือกแรกที่ชัดเจน ซึ่งก็เป็นข้อมูลที่มีประโยชน์ ควรเปรียบเทียบแบบเดิมอีกวันโดยไม่เปลี่ยนหลายอย่างพร้อมกัน"
          : `ในการทดลองนี้ โมจิตอบสนองต่อกลิ่น${state.choice === "salmon" ? "แซลมอน" : "ไก่"}มากกว่า ให้ถือเป็นสัญญาณความชอบเบื้องต้น ไม่ใช่ข้อสรุปสุดท้าย และควรทดลองซ้ำอีกวันก่อนเปลี่ยนอาหารประจำ`;
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 7000);
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          locale: l,
          dogName: "Mochi",
          choice: state.choice,
          approach: state.approach,
          intake: state.intake,
          energy: state.energy,
          scenarioId: "taste-trial-01",
        }),
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (!res.ok) throw new Error("feedback unavailable");
      const data = await res.json();
      patch({
        feedback: data.feedback || fallback,
        feedbackLocale: l,
        feedbackSource: data.source === "ai" ? "ai" : "fallback",
      });
    } catch {
      patch({
        feedback: fallback,
        feedbackLocale: l,
        feedbackSource: "fallback",
      });
    }
    setLoading(false);
  };

  const content = (() => {
    switch (state.screen) {
      case "welcome":
        return (
          <Welcome
            l={l}
            go={go}
            setTutorial={() => patch({ tutorialDone: true })}
            onSound={playGuide}
            onSilent={closeGuide}
          />
        );
      case "safety":
        return <Safety l={l} go={go} />;
      case "safetyHold":
        return <SafetyHold l={l} go={go} />;
      case "trial":
        return (
          <Trial
            l={l}
            choice={state.choice}
            setChoice={(choice) => patch({ choice })}
            go={go}
          />
        );
      case "observe":
        return (
          <Observe l={l} state={state} patch={patch} submit={fetchFeedback} />
        );
      case "feedback":
        return (
          <Feedback
            l={l}
            state={state}
            loading={loading}
            go={go}
            retry={fetchFeedback}
          />
        );
      case "tasteprint":
        return (
          <TastePrintScreen
            l={l}
            go={go}
            evidence={state.checkedIn ? 2 : 1}
            choice={state.choice}
          />
        );
      case "firstBowl":
        return <FirstBowl l={l} go={go} choice={state.choice} />;
      case "checkout":
        return <Checkout l={l} go={go} choice={state.choice} />;
      case "receipt":
        return (
          <Receipt
            l={l}
            confirm={() => {
              patch({ ordered: true });
              go("checkin");
            }}
          />
        );
      case "checkin":
        return (
          <Checkin
            l={l}
            value={state.checkin}
            setValue={(checkin) => patch({ checkin })}
            warning={state.warningReported}
            setWarning={(warningReported) => patch({ warningReported })}
            submit={() => {
              patch({ checkedIn: true });
              go(
                state.warningReported
                  ? "safetyHold"
                  : state.checkin === "skipped"
                    ? "today"
                    : "subscription",
              );
            }}
          />
        );
      case "subscription":
        return <Subscription l={l} patch={patch} done={() => go("today")} />;
      case "today":
        return <Today l={l} state={state} go={go} />;
      case "plan":
        return <Plan l={l} state={state} patch={patch} go={go} />;
      case "passport":
        return <Passport l={l} state={state} />;
      case "delivery":
        return <Delivery l={l} ordered={state.ordered} />;
      case "profile":
        return <Profile l={l} />;
      case "help":
        return <Help l={l} go={go} />;
      case "more":
        return (
          <More
            l={l}
            state={state}
            patch={patch}
            reset={() => setState({ ...seed, locale: l })}
            go={go}
            soundOn={soundOn}
            setSoundOn={(enabled) => (enabled ? playGuide() : closeGuide())}
          />
        );
    }
  })();

  if (!hydrated)
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="animate-bob text-center">
          <PawPrint className="mx-auto text-[var(--coral-dark)]" size={42} />
          <p className="mt-3 text-sm font-black">PawProud</p>
        </div>
      </div>
    );
  const inFlow = flow.includes(state.screen);
  const hasNav = navScreens.includes(state.screen);
  return (
    <div className={l === "th" ? "thai" : ""}>
      <audio
        ref={audioRef}
        src="/audio/pawproud-guide.mp3"
        preload="metadata"
        onLoadedMetadata={(e) =>
          setGuideDuration(e.currentTarget.duration || 37.1)
        }
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setGuideTime(e.currentTarget.currentTime)}
      />
      <ProductHeader
        locale={l}
        setLocale={(locale) => patch({ locale })}
        title={
          inFlow && state.screen !== "welcome"
            ? l === "en"
              ? "Mochi’s Taste Trial"
              : "Taste Trial ของโมจิ"
            : undefined
        }
        onBack={
          state.screen !== "welcome" && backMap[state.screen]
            ? () => go(backMap[state.screen]!)
            : undefined
        }
        progress={progressMap[state.screen]}
      />
      <Shell>{<div key={state.screen}>{content}</div>}</Shell>
      {hasNav && <BottomNav screen={state.screen} go={go} l={l} />}
      <AnimatePresence>
        {soundOn && (
          <VoiceGuide
            l={l}
            playing={playing}
            time={guideTime}
            duration={guideDuration}
            hasNav={hasNav}
            toggle={toggleGuide}
            replay={replayGuide}
            close={closeGuide}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
