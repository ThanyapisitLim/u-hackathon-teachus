"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Drumstick,
  Eye,
  Fish,
  HeartPulse,
  Home,
  Languages,
  MapPin,
  PackageCheck,
  Pause,
  PawPrint,
  Play,
  RotateCcw,
  CircleOff,
  ShieldCheck,
  ShoppingBag,
  SkipForward,
  SlidersHorizontal,
  Sparkles,
  Smile,
  Truck,
  UserRound,
  Utensils,
  Volume2,
  VolumeX,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CameraMoment } from "./CameraMoment";
import { FoodServiceDetail } from "./FoodServiceDetail";
import { PawProudLoader } from "./PawProudLoader";
import { ServiceHome } from "./ServiceHome";
import { TastePrint } from "./TastePrint";
import { TasteInterpreter } from "./TasteInterpreter";

const TasteBowlCanvas = dynamic(
  () => import("./TasteBowlCanvas").then((module) => module.TasteBowlCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-[280px] place-items-center rounded-[32px] bg-[var(--soft)]">
        <div className="animate-bob text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-[22px] bg-white text-[var(--coral-dark)] shadow-sm">
            <Utensils size={30} />
          </span>
          <span className="mt-2 block text-xs font-black text-[var(--muted)]">
            Preparing the 3D bowl…
          </span>
        </div>
      </div>
    ),
  },
);

type Locale = "en" | "th";
export type ProductEntry =
  | "hub"
  | "food"
  | "food-trial"
  | "ai"
  | "passport";
type Screen =
  | "welcome"
  | "foodService"
  | "aiGuide"
  | "safety"
  | "safetyHold"
  | "trial"
  | "camera"
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
type FoodTrialStep =
  | "safety"
  | "safetyHold"
  | "trial"
  | "camera"
  | "observe"
  | "feedback"
  | "tasteprint"
  | "firstBowl"
  | "checkout"
  | "receipt"
  | "checkin"
  | "subscription";
type AppState = {
  locale: Locale;
  screen: Screen;
  foodTrialStep: FoodTrialStep;
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
  screen: "today",
  foodTrialStep: "safety",
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

type PersistedCareState = Omit<AppState, "screen">;

const STORAGE_KEY = "pawproud-demo-v2";
const LEGACY_STORAGE_KEY = "pawproud-demo-v1";
const MIN_PROCESSING_TIME_MS = 1400;
const FOOD_TRIAL_STEPS: FoodTrialStep[] = [
  "safety",
  "safetyHold",
  "trial",
  "camera",
  "observe",
  "feedback",
  "tasteprint",
  "firstBowl",
  "checkout",
  "receipt",
  "checkin",
  "subscription",
];

function isFoodTrialStep(value: unknown): value is FoodTrialStep {
  return FOOD_TRIAL_STEPS.includes(value as FoodTrialStep);
}

async function waitForMinimumProcessingTime(startedAt: number) {
  const remaining = MIN_PROCESSING_TIME_MS - (Date.now() - startedAt);
  if (remaining <= 0) return;
  await new Promise<void>((resolve) => window.setTimeout(resolve, remaining));
}

function persistedCareState(state: AppState): PersistedCareState {
  return {
    locale: state.locale,
    foodTrialStep: state.foodTrialStep,
    choice: state.choice,
    approach: state.approach,
    intake: state.intake,
    energy: state.energy,
    feedback: state.feedback,
    feedbackLocale: state.feedbackLocale,
    feedbackSource: state.feedbackSource,
    ordered: state.ordered,
    checkedIn: state.checkedIn,
    checkin: state.checkin,
    warningReported: state.warningReported,
    subscribed: state.subscribed,
    paused: state.paused,
    skipped: state.skipped,
    tutorialDone: state.tutorialDone,
  };
}

function entryScreen(
  entry: ProductEntry,
  foodTrialStep: FoodTrialStep,
): Screen {
  if (entry === "food") return "foodService";
  if (entry === "food-trial") return foodTrialStep;
  if (entry === "ai") return "aiGuide";
  if (entry === "passport") return "passport";
  return "today";
}

const tx = {
  en: {
    demo: "INTERACTIVE CONCEPT",
    backStory: "Story",
    next: "Continue",
    back: "Back",
    mochi: "Mochi",
    today: "Today",
    food: "Food",
    ai: "PawSense",
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
    food: "อาหาร",
    ai: "PawSense",
    taste: "รสนิยม",
    plan: "แผน",
    passport: "พาสปอร์ต",
    more: "เพิ่มเติม",
  },
};

/* Local storage keeps care data while URL/entry context owns navigation. */
/* eslint-disable react-hooks/set-state-in-effect */
function usePersistedState(entry: ProductEntry) {
  const [state, setState] = useState<AppState>(seed);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    try {
      const query = new URLSearchParams(window.location.search);
      const resetTrial =
        entry === "food-trial" && query.get("reset") === "1";
      const current = localStorage.getItem(STORAGE_KEY);
      const legacy = current
        ? null
        : localStorage.getItem(LEGACY_STORAGE_KEY);
      const parsed = JSON.parse(current ?? legacy ?? "{}") as Partial<AppState>;
      const migratedStep = isFoodTrialStep(parsed.foodTrialStep)
        ? parsed.foodTrialStep
        : isFoodTrialStep(parsed.screen)
          ? parsed.screen
          : "safety";
      const saved: PersistedCareState = {
        ...persistedCareState(seed),
        ...parsed,
        foodTrialStep: migratedStep,
      };
      const next: AppState = resetTrial
        ? {
            ...seed,
            locale: saved.locale === "th" ? "th" : "en",
            screen: "safety" as Screen,
          }
        : {
            ...seed,
            ...saved,
            screen: entryScreen(entry, migratedStep),
          };
      if (resetTrial) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(persistedCareState(next)),
        );
      }
      setState(next);
      if (legacy) localStorage.removeItem(LEGACY_STORAGE_KEY);
      if (resetTrial) {
        const url = new URL(window.location.href);
        url.searchParams.delete("reset");
        window.history.replaceState(
          {},
          "",
          `${url.pathname}${url.search}${url.hash}`,
        );
      }
    } catch {
      /* demo still works without storage */
      setState({ ...seed, screen: entryScreen(entry, "safety") });
    }
    setHydrated(true);
  }, [entry]);
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(persistedCareState(state)),
      );
    } catch {
      /* private browsing or blocked storage should not break the prototype */
    }
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
    { key: "foodService", label: tx[l].food, icon: <Utensils size={20} /> },
    { key: "aiGuide", label: tx[l].ai, icon: <Sparkles size={20} /> },
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
          {
            label: l === "en" ? "2 tastes" : "2 รส",
            icon: <Utensils size={19} />,
          },
          {
            label: l === "en" ? "3 minutes" : "3 นาที",
            icon: <Clock3 size={19} />,
          },
          {
            label: l === "en" ? "No commitment" : "ยังไม่ผูกมัด",
            icon: <HeartPulse size={19} />,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl bg-[var(--soft)] px-2 py-3"
          >
            <span className="mx-auto mb-1 grid h-7 w-7 place-items-center rounded-xl bg-white text-[var(--coral-dark)] shadow-sm">
              {item.icon}
            </span>
            {item.label}
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
        {l === "en" ? "Safety check" : "ตรวจความพร้อม"}
      </Eyebrow>
      <PageTitle
        sub={
          l === "en"
            ? "Confirm Mochi’s condition before starting the trial."
            : "ยืนยันอาการของโมจิก่อนเริ่มการทดลอง"
        }
      >
        {l === "en"
          ? "Is Mochi feeling like himself today?"
          : "วันนี้โมจิดูเป็นปกติไหม?"}
      </PageTitle>
      <section className="relative my-8 pl-[70px]">
        <motion.div
          animate={{ rotate: [-4, 3, -4], y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-0 top-0 grid h-14 w-14 place-items-center rounded-[42%_58%_50%_50%/58%_44%_56%_42%] bg-[var(--mint)] text-[var(--success)]"
        >
          <HeartPulse size={27} />
        </motion.div>
        <div className="pb-4">
          <p className="font-black">
            {l === "en" ? "Check today’s condition" : "ตรวจอาการวันนี้"}
          </p>
          <p className="text-xs text-[var(--muted)]">
            {l === "en" ? "All three should be true" : "ทั้ง 3 ข้อควรเป็นจริง"}
          </p>
        </div>
        <span className="absolute bottom-2 left-7 top-16 w-px bg-gradient-to-b from-[var(--success)]/45 to-transparent" />
        <ul className="space-y-0 text-sm text-[var(--muted)]">
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
            <li
              key={x}
              className="relative flex min-h-12 items-center gap-3 border-b border-[var(--line)]/70 py-3 last:border-0"
            >
              <span className="absolute -left-[50px] grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--cream)] text-[var(--success)] ring-2 ring-[var(--mint)]">
                <Check size={13} strokeWidth={3} />
              </span>
              {x}
            </li>
          ))}
        </ul>
      </section>
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
        {l === "en" ? "Trial paused" : "พักการทดลอง"}
      </h1>
      <p className="mx-auto mt-3 max-w-sm leading-7 text-[var(--muted)]">
        {l === "en"
          ? "Keep Mochi’s regular routine. Contact a veterinarian if you are concerned."
          : "ให้โมจิกินและใช้ชีวิตตามปกติ และติดต่อสัตวแพทย์หากกังวล"}
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
  icon,
  tone,
  title,
  details,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  tone: "honey" | "blue";
  title: string;
  details: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      aria-pressed={active}
      className="relative min-h-[214px] px-2 py-3 text-center"
    >
      <motion.span
        aria-hidden="true"
        animate={{
          rotate: active ? -2 : 1,
          scale: active ? 1 : 0.96,
        }}
        className={`absolute inset-x-1 bottom-2 top-2 rounded-[46%_54%_44%_56%/34%_40%_60%_66%] transition-colors ${active ? "bg-[#ffe5e8] ring-2 ring-[var(--coral-dark)]/70" : "bg-[var(--soft)]"}`}
      />
      {active && (
        <span className="absolute right-2 top-1 z-20 grid h-8 w-8 place-items-center rounded-full bg-[var(--coral-dark)] text-white shadow-md">
          <Check size={16} strokeWidth={3} />
        </span>
      )}
      <div className="relative z-10 mx-auto mt-4 h-24 w-32">
        <div className="absolute inset-x-0 bottom-0 h-14 rounded-[50%] border-[10px] border-[#f0d6c2] bg-[var(--chocolate)] shadow-[0_8px_0_#c99f82]" />
        <motion.span
          animate={active ? { y: [0, -10, 0], rotate: [0, -8, 5, 0] } : {}}
          className={`absolute left-1/2 top-0 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full bg-white shadow-md ${tone === "honey" ? "text-[var(--honey)]" : "text-[var(--trust)]"}`}
        >
          {icon}
        </motion.span>
      </div>
      <p className="relative z-10 mt-4 font-black">{title}</p>
      <p className="relative z-10 mx-auto mt-1 max-w-[130px] text-xs leading-5 text-[var(--muted)]">
        {details}
      </p>
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
        {l === "en" ? "Taste trial" : "ทดลองรสชาติ"}
      </Eyebrow>
      <PageTitle
        sub={
          l === "en"
            ? "Place both samples down together. Select the first bowl Mochi approached."
            : "วางตัวอย่างทั้งสองพร้อมกัน แล้วเลือกชามที่โมจิเข้าหาก่อน"
        }
      >
        {l === "en" ? "Which bowl got the first sniff?" : "โมจิดมชามไหนก่อน?"}
      </PageTitle>
      <div className="relative mt-4 h-[192px]">
        <motion.div
          aria-hidden="true"
          animate={{ rotate: [-2, 1, -2], scale: [1, 1.025, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-x-5 bottom-3 top-5 rounded-[42%_58%_54%_46%/58%_42%_58%_42%] bg-[radial-gradient(circle_at_50%_25%,#fff_0,#fff0e6_70%)]"
        />
        <motion.div
          className="absolute left-1/2 top-0 h-44 w-44 -translate-x-1/2"
          animate={{
            x: choice === "chicken" ? -32 : choice === "salmon" ? 32 : 0,
            rotate: choice === "chicken" ? -4 : choice === "salmon" ? 4 : 0,
            y: [0, -4, 0],
          }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/brand/pawproud-mascot-logo.webp"
            alt={l === "en" ? "Mochi choosing between two tastes" : "โมจิกำลังเลือกระหว่างสองรส"}
            fill
            sizes="160px"
            className="object-contain drop-shadow-[0_12px_18px_rgba(85,43,32,.16)]"
          />
        </motion.div>
        <span className="absolute bottom-3 left-7 grid h-12 w-12 -rotate-6 place-items-center rounded-full bg-white text-[var(--honey)] shadow-md ring-4 ring-[#fff4e4]">
          <Drumstick size={25} />
        </span>
        <span className="absolute bottom-3 right-7 grid h-12 w-12 rotate-6 place-items-center rounded-full bg-white text-[var(--trust)] shadow-md ring-4 ring-[#eaf6ff]">
          <Fish size={25} />
        </span>
      </div>
      <div className="relative mt-3 grid grid-cols-2 gap-2 before:absolute before:bottom-6 before:left-1/2 before:top-6 before:w-px before:bg-[var(--line)]">
        <BowlChoice
          icon={<Drumstick size={29} strokeWidth={2.4} />}
          tone="honey"
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
          icon={<Fish size={29} strokeWidth={2.4} />}
          tone="blue"
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
        aria-pressed={choice === "unclear"}
        className={`pressable mx-auto mt-3 flex min-h-12 items-center justify-center gap-2 border-b-2 px-3 text-sm font-bold ${choice === "unclear" ? "border-[var(--trust)] text-[var(--trust)]" : "border-transparent text-[var(--muted)]"}`}
      >
        <CircleOff size={17} />
        <span>
          {l === "en"
            ? "Mochi showed no clear first choice"
            : "โมจิยังไม่แสดงตัวเลือกที่ชัดเจน"}
        </span>
        {choice === "unclear" && <Check size={17} />}
      </button>
      <div className="mt-6">
        <AppButton
          disabled={!choice}
          onClick={() => go("camera")}
          icon={<ArrowRight size={18} />}
        >
          {l === "en" ? "Save first choice" : "บันทึกชามที่เลือกก่อน"}
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
  type ObservationKey = "approach" | "intake" | "energy";
  const moments: Array<{
    key: ObservationKey;
    short: string;
    question: string;
    hint: string;
    icon: React.ReactNode;
    options: Array<{
      value: string;
      label: string;
      note: string;
      icon: React.ReactNode;
    }>;
  }> = [
    {
      key: "approach",
      short: l === "en" ? "First sniff" : "การเข้าหาครั้งแรก",
      question:
        l === "en" ? "How did Mochi meet the bowl?" : "โมจิเข้าหาชามแบบไหน?",
      hint:
        l === "en"
          ? "Think about the very first few seconds."
          : "นึกถึงช่วงไม่กี่วินาทีแรก",
      icon: <Eye size={18} />,
      options: [
        {
          value: "quick",
          label: l === "en" ? "Went right in" : "เข้าไปทันที",
          note: l === "en" ? "No pause before sniffing" : "ไม่ลังเลก่อนดม",
          icon: <Zap size={21} />,
        },
        {
          value: "slow",
          label: l === "en" ? "Took a sniff first" : "ดมดูก่อน",
          note: l === "en" ? "Paused, then approached" : "หยุดดูก่อนแล้วจึงเข้าใกล้",
          icon: <Eye size={21} />,
        },
        {
          value: "none",
          label: l === "en" ? "Stayed away" : "ไม่เข้าใกล้",
          note: l === "en" ? "Did not approach the bowl" : "ไม่ได้เข้าหาชาม",
          icon: <CircleOff size={21} />,
        },
      ],
    },
    {
      key: "intake",
      short: l === "en" ? "Bowl finish" : "ปริมาณที่กิน",
      question: l === "en" ? "How much was left?" : "ในชามเหลือมากแค่ไหน?",
      hint:
        l === "en"
          ? "A quick look at the bowl is enough."
          : "แค่มองสิ่งที่เหลือในชามก็พอ",
      icon: <Utensils size={18} />,
      options: [
        {
          value: "most",
          label: l === "en" ? "Bowl nearly clean" : "เกือบหมดชาม",
          note: l === "en" ? "Mochi ate most of it" : "โมจิกินเกือบทั้งหมด",
          icon: <Utensils size={21} />,
        },
        {
          value: "some",
          label: l === "en" ? "Tasted a little" : "ลองกินเล็กน้อย",
          note: l === "en" ? "Some food remained" : "ยังมีอาหารเหลือ",
          icon: <SlidersHorizontal size={21} />,
        },
        {
          value: "none",
          label: l === "en" ? "Left it alone" : "ไม่แตะอาหาร",
          note: l === "en" ? "No visible eating" : "ไม่เห็นว่ากินอาหาร",
          icon: <CircleOff size={21} />,
        },
      ],
    },
    {
      key: "energy",
      short: l === "en" ? "Body signal" : "ภาษากาย",
      question:
        l === "en" ? "What did Mochi’s body say?" : "ภาษากายของโมจิบอกอะไร?",
      hint:
        l === "en"
          ? "Choose the closest match—there is no perfect answer."
          : "เลือกข้อที่ใกล้เคียงที่สุด ไม่จำเป็นต้องเป๊ะ",
      icon: <Dog size={18} />,
      options: [
        {
          value: "bright",
          label: l === "en" ? "Eager and bright" : "ตื่นเต้นและสนใจ",
          note: l === "en" ? "Alert, loose, interested" : "ตื่นตัว ผ่อนคลาย และสนใจ",
          icon: <Sparkles size={21} />,
        },
        {
          value: "neutral",
          label: l === "en" ? "Calm and steady" : "สงบเป็นปกติ",
          note: l === "en" ? "Comfortable, not excited" : "สบายตัว ไม่ได้ตื่นเต้น",
          icon: <Smile size={21} />,
        },
        {
          value: "avoid",
          label: l === "en" ? "Turned away" : "หันหน้าหนี",
          note: l === "en" ? "Moved back or avoided it" : "ถอยหรือหลีกเลี่ยงชาม",
          icon: <ArrowLeft size={21} />,
        },
      ],
    },
  ];
  const firstOpen = moments.find((moment) => !state[moment.key])?.key ?? "energy";
  const [activeMoment, setActiveMoment] = useState<ObservationKey>(firstOpen);
  const activeIndex = moments.findIndex((moment) => moment.key === activeMoment);
  const active = moments[activeIndex];
  const observedCount = moments.filter((moment) => state[moment.key]).length;
  const ready = Boolean(state.approach && state.intake && state.energy);

  const choose = (value: string) => {
    patch({ [active.key]: value });
    if (activeIndex < moments.length - 1) {
      window.setTimeout(() => setActiveMoment(moments[activeIndex + 1].key), 180);
    }
  };

  return (
    <>
      <Eyebrow>{l === "en" ? "Observation" : "บันทึกพฤติกรรม"}</Eyebrow>
      <PageTitle
        sub={
          l === "en"
            ? "Record three observable behaviors from this trial."
            : "บันทึกพฤติกรรมที่สังเกตได้ 3 รายการจากการทดลองนี้"
        }
      >
        {l === "en" ? "What did Mochi do?" : "โมจิแสดงพฤติกรรมอย่างไร?"}
      </PageTitle>
      <div className="relative mt-5 px-2 pt-2">
        <motion.div
          aria-hidden="true"
          animate={{ rotate: [2, -1, 2], scale: [1, 1.03, 1] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-x-8 top-3 h-[138px] rounded-[58%_42%_48%_52%/43%_55%_45%_57%] bg-gradient-to-br from-[#fff0de] via-[#fff8f0] to-[#e9f7ff]"
        />
        <div className="absolute left-5 top-7 h-20 w-20 rounded-full bg-[var(--honey)]/20 blur-2xl" />
        <div className="absolute right-2 top-0 h-24 w-24 rounded-full bg-[var(--coral)]/15 blur-2xl" />
        <div className="relative flex h-[142px] items-end justify-center">
          <motion.div
            key={activeMoment}
            initial={{ y: 8, scale: 0.96, opacity: 0 }}
            animate={{ y: [0, -4, 0], scale: 1, opacity: 1 }}
            transition={{
              opacity: { duration: 0.25 },
              scale: { duration: 0.25 },
              y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="relative z-10 h-[138px] w-[190px]"
          >
            <Image
              src="/brand/pawproud-mascot-logo.webp"
              alt={l === "en" ? "Mochi watching the taste bowl" : "โมจิกำลังมองชามชิม"}
              fill
              sizes="190px"
              className="object-contain drop-shadow-[0_12px_14px_rgba(86,44,28,.15)]"
            />
          </motion.div>
          <motion.span
            animate={{ rotate: [-4, 4, -4], y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-3 right-7 grid h-12 w-12 place-items-center rounded-full bg-[var(--honey)] text-[var(--chocolate)] shadow-md ring-4 ring-white"
            aria-hidden="true"
          >
            {state.choice === "chicken" ? <Drumstick size={23} /> : <Fish size={23} />}
          </motion.span>
        </div>
        <div className="relative mt-2 grid grid-cols-3 before:absolute before:left-[16%] before:right-[16%] before:top-5 before:h-px before:bg-[var(--line)]">
          {moments.map((moment, index) => {
            const complete = Boolean(state[moment.key]);
            const selected = activeMoment === moment.key;
            return (
              <button
                type="button"
                key={moment.key}
                onClick={() => setActiveMoment(moment.key)}
                aria-current={selected ? "step" : undefined}
                aria-label={`${moment.short}${complete ? (l === "en" ? ", answered" : " ตอบแล้ว") : ""}`}
                className={`pressable relative z-10 mx-1 flex min-h-[68px] flex-col items-center justify-start gap-1.5 px-1 text-[10px] font-black transition-colors ${selected ? "text-[var(--chocolate)]" : complete ? "text-[var(--success)]" : "text-[var(--muted)]"}`}
              >
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ring-4 ring-[var(--cream)] transition-colors ${selected ? "bg-[var(--chocolate)] text-white" : complete ? "bg-[var(--mint)] text-[var(--success)]" : "bg-white text-[var(--muted)]"}`}>
                  {complete && !selected ? <Check size={16} /> : moment.icon}
                </span>
                <span className="hidden min-[390px]:inline">{moment.short}</span>
                <span className="min-[390px]:hidden">{index + 1}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.fieldset
          key={active.key}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.2 }}
          className="mt-4 border-t-2 border-[var(--chocolate)]/15 pt-5"
        >
          <legend className="sr-only">{active.question}</legend>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[.13em] text-[var(--coral-dark)]">
                {l === "en"
                  ? `${observedCount} of 3 noticed`
                  : `บันทึกแล้ว ${observedCount} จาก 3`}
              </p>
              <h2 className="display mt-1 text-[25px] font-black leading-tight">
                {active.question}
              </h2>
              <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{active.hint}</p>
            </div>
            <span className="grid h-11 w-11 shrink-0 -rotate-3 place-items-center rounded-[42%_58%_48%_52%] bg-[var(--soft)] text-[var(--coral-dark)]">
              {active.icon}
            </span>
          </div>
          <div className="mt-4 border-y border-[var(--line)]">
            {active.options.map((option) => {
              const selected = state[active.key] === option.value;
              return (
                <motion.button
                  type="button"
                  key={option.value}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => choose(option.value)}
                  aria-pressed={selected}
                  className={`relative flex min-h-[78px] w-full items-center gap-3 border-b border-[var(--line)] px-1 py-3 text-left transition-colors last:border-b-0 ${selected ? "bg-gradient-to-r from-[#ffe8e9] via-[#fff8f4] to-transparent" : "bg-transparent hover:bg-white/50"}`}
                >
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${selected ? "bg-[var(--coral-dark)] text-white" : "bg-[var(--soft)] text-[var(--chocolate)]"}`}>
                    {option.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <strong className="block text-sm">{option.label}</strong>
                    <span className="mt-0.5 block text-[11px] leading-4 text-[var(--muted)]">
                      {option.note}
                    </span>
                  </span>
                  {selected && (
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--coral-dark)] text-white">
                      <Check size={16} />
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.fieldset>
      </AnimatePresence>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-[var(--muted)]">
        <ShieldCheck size={15} className="text-[var(--success)]" />
        {l === "en"
          ? "PawSense analyzes only the observations you record."
          : "PawSense วิเคราะห์เฉพาะสิ่งที่คุณบันทึก"}
      </div>
      <div className="mt-6">
        <AppButton
          disabled={!ready}
          onClick={submit}
          icon={<Sparkles size={18} />}
        >
          {ready
            ? l === "en"
              ? "Analyze 3 observations"
              : "วิเคราะห์ข้อสังเกต 3 รายการ"
            : l === "en"
              ? `${3 - observedCount} moment${3 - observedCount === 1 ? "" : "s"} left to notice`
              : `เหลืออีก ${3 - observedCount} ช่วงให้บันทึก`}
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
      <Eyebrow>{l === "en" ? "Trial result" : "ผลการทดลอง"}</Eyebrow>
      <PageTitle
        sub={
          l === "en"
            ? "Based on 3 recorded observations"
            : "อ้างอิงจากข้อสังเกตที่บันทึกไว้ 3 รายการ"
        }
      >
        {l === "en" ? "Taste signal" : "สัญญาณรสชาติ"}
      </PageTitle>
      <section className="relative my-8 px-5 py-7 text-white">
        <motion.div
          aria-hidden="true"
          initial={{ rotate: -2, scale: 0.96 }}
          animate={{ rotate: -0.5, scale: 1 }}
          className="absolute inset-0 rounded-[44%_56%_48%_52%/15%_18%_14%_17%] bg-[var(--chocolate)] shadow-[0_18px_45px_rgba(85,43,32,.18)]"
        />
        <div className="relative flex items-center justify-between">
          <TinyBadge tone="coral">
            {l === "en" ? "Recorded" : "บันทึกแล้ว"}
          </TinyBadge>
          <span className="text-xs text-white/60">
            {l === "en" ? "Trial 1" : "การทดลองครั้งที่ 1"}
          </span>
        </div>
        <p className="display relative mt-5 text-2xl font-black">
          {state.choice === "unclear"
            ? l === "en"
              ? "No clear choice—yet."
              : "ยังไม่มีตัวเลือกที่ชัดเจน"
            : l === "en"
              ? `Mochi approached ${chosen} first.`
              : `โมจิเข้าหา${chosen}ก่อน`}
        </p>
        <div className="relative mt-5 grid grid-cols-3 divide-x divide-white/20 border-y border-white/15 py-3 text-center text-[11px]">
          <div className="px-2 py-1">
            <Zap className="mx-auto mb-1" size={18} />
            {observation(state.approach)}
          </div>
          <div className="px-2 py-1">
            <Utensils className="mx-auto mb-1" size={18} />
            {observation(state.intake)}
          </div>
          <div className="px-2 py-1">
            <Dog className="mx-auto mb-1" size={18} />
            {observation(state.energy)}
          </div>
        </div>
      </section>
      <section className="relative border-l-2 border-[var(--trust)]/25 pl-5">
        <span className="absolute -left-[19px] top-0 grid h-9 w-9 place-items-center rounded-full bg-[var(--sky)] text-[var(--trust)] ring-4 ring-[var(--cream)]">
          <Sparkles size={18} />
        </span>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 pl-2 font-black">
            {l === "en" ? "Analysis" : "ผลวิเคราะห์"}
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
                  ? "Your language"
                  : "ภาษาของคุณ"
                : state.feedbackSource === "ai"
                  ? l === "en"
                    ? "Live PawSense"
                    : "PawSense แบบสด"
                  : l === "en"
                    ? "Safety summary"
                    : "สรุปแบบปลอดภัย"}
            </TinyBadge>
          )}
        </div>
        {loading ? (
          <div
            className="relative mt-5 overflow-hidden py-4"
            role="status"
            aria-live="polite"
          >
            <div className="relative mx-auto h-[120px] max-w-[270px]">
              <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-[var(--honey)] via-[var(--trust)] to-[var(--coral)]" />
              {[
                { icon: <Eye size={16} />, x: "left-0", delay: 0 },
                { icon: <Utensils size={16} />, x: "left-1/2 -translate-x-1/2", delay: 0.18 },
                { icon: <Dog size={16} />, x: "right-0", delay: 0.36 },
              ].map((signal, index) => (
                <motion.span
                  key={index}
                  animate={{ y: [0, -5, 0], scale: [1, 1.06, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: signal.delay }}
                  className={`absolute top-3 grid h-11 w-11 place-items-center rounded-full bg-white text-[var(--chocolate)] shadow-md ring-4 ring-[var(--soft)] ${signal.x}`}
                >
                  {signal.icon}
                </motion.span>
              ))}
              <motion.span
                animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 1.7, repeat: Infinity }}
                className="absolute bottom-0 left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-[42%_58%_52%_48%] bg-[var(--chocolate)] text-white shadow-lg"
              >
                <Sparkles size={24} />
              </motion.span>
              {["left-[20%]", "right-[20%]"].map((position, index) => (
                <motion.span
                  key={position}
                  animate={{ top: [48, 78], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.25, repeat: Infinity, delay: index * 0.35 }}
                  className={`absolute ${position} top-12 h-2 w-2 rounded-full bg-[var(--coral)]`}
                />
              ))}
            </div>
            <p className="mt-3 text-center text-sm font-black text-[var(--ink)]">
              {l === "en"
                ? "PawSense is connecting Mochi’s signals…"
                : "PawSense กำลังเชื่อมสัญญาณของโมจิ…"}
            </p>
            <p className="mt-1 text-center text-xs leading-5 text-[var(--muted)]">
              {l === "en"
                ? "First sniff, bowl finish, and body language—nothing else."
                : "ใช้เฉพาะการเข้าหา ปริมาณที่กิน และภาษากายเท่านั้น"}
            </p>
          </div>
        ) : (
          <>
            <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
              {displayedFeedback}
            </p>
            <button
              onClick={retry}
              className="pressable mt-4 flex min-h-10 items-center gap-2 rounded-2xl bg-[var(--sky)] px-3 text-xs font-extrabold text-[var(--trust)]"
            >
              <RotateCcw size={14} />
              {l === "en" ? "Analyze again" : "วิเคราะห์อีกครั้ง"}
            </button>
            <div className="mt-5 flex items-start gap-2 border-y border-[var(--success)]/20 py-3 text-xs leading-5 text-[var(--success)]">
              <ShieldCheck className="mt-0.5 shrink-0" size={16} />
              <span>
                {l === "en"
                  ? "This read uses only the three moments you recorded—not a diagnosis."
                  : "ผลนี้ใช้เฉพาะสามช่วงที่คุณบันทึก และไม่ใช่การวินิจฉัย"}
              </span>
            </div>
          </>
        )}
      </section>
      <div className="mt-5 border-y border-dashed border-[var(--line)] py-3 text-xs leading-5 text-[var(--muted)]">
        <strong>
          {l === "en" ? "Limit:" : "ข้อจำกัด:"}
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
          {l === "en" ? "Open TastePrint" : "เปิด TastePrint"}
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
        {l === "en" ? "Preference profile" : "โปรไฟล์ความชอบ"}
      </Eyebrow>
      <PageTitle
        sub={
          l === "en"
            ? "1 trial recorded · unknown traits remain unfilled"
            : "บันทึกแล้ว 1 การทดลอง · คุณลักษณะที่ยังไม่ทราบจะแสดงเป็นช่องว่าง"
        }
      >
        {l === "en" ? "TastePrint" : "TastePrint"}
      </PageTitle>
      <div className="relative mt-6 py-3">
        <motion.div
          aria-hidden="true"
          animate={{ rotate: [-2, 2, -2], scale: [0.98, 1.02, 0.98] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-x-8 top-0 h-[290px] rounded-[48%_52%_58%_42%/52%_44%_56%_48%] bg-[radial-gradient(circle_at_42%_36%,#fff_0,#fff2e8_62%,#ffe4dd_100%)]"
        />
        <div className="relative">
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
        </div>
        <div className="relative mt-7 border-l-4 border-[var(--honey)] py-1 pl-4">
          <p className="text-sm font-black">
            {l === "en"
              ? "Profile update"
              : "ข้อมูลที่อัปเดต"}
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
      <div className="mt-4 flex items-center justify-center gap-5 border-t border-[var(--line)] pt-4 text-xs text-[var(--muted)]">
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
              ? "Repeat taste trial"
              : "ทดลองรสชาติอีกครั้ง"
            : l === "en"
              ? "Continue to First Bowl"
              : "ไปที่ First Bowl"}
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
  const bowl = chicken ? "Chicken First Bowl" : "Salmon First Bowl";
  const bowlName =
    l === "en" ? bowl : chicken ? "First Bowl รสไก่" : "First Bowl รสแซลมอน";
  return (
    <>
      <Eyebrow>
        {l === "en"
          ? "One-time trial order"
          : "คำสั่งซื้อทดลองครั้งเดียว"}
      </Eyebrow>
      <PageTitle
        sub={
          l === "en"
            ? "3 portions · one-time purchase · no subscription"
            : "3 มื้อ · ซื้อครั้งเดียว · ไม่มี Subscription"
        }
      >
        {l === "en" ? "First Bowl" : "First Bowl"}
      </PageTitle>
      <div className="relative mt-6">
        <motion.div
          initial={{ rotate: -2, y: 8, opacity: 0 }}
          animate={{ rotate: -1, y: 0, opacity: 1 }}
          className="relative -mx-1 drop-shadow-[0_20px_30px_rgba(85,43,32,.14)]"
        >
          <TasteBowlCanvas locale={l} />
        </motion.div>
        <span className="absolute -left-1 top-6 h-7 w-20 -rotate-12 bg-[#ffe5aa]/80 backdrop-blur-sm" aria-hidden="true" />
        <span className="absolute -right-1 top-6 h-7 w-20 rotate-12 bg-[#ffd7dc]/80 backdrop-blur-sm" aria-hidden="true" />
        <div className="relative mt-6">
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
          <div className="mt-5 grid grid-cols-3 divide-x divide-[var(--line)] border-y border-[var(--line)] py-3 text-center text-xs font-bold">
            <div className="px-2 py-1">
              <span className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-[#ffe7e9] text-[var(--coral-dark)]">
                {chicken ? <Drumstick size={18} /> : <Fish size={18} />}
              </span>
              <span className="mt-1 block">
                {l === "en" ? "Aroma lead" : "นำด้วยกลิ่น"}
              </span>
            </div>
            <div className="px-2 py-1">
              <span className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-[var(--sky)] text-[var(--trust)]">
                <Utensils size={18} />
              </span>
              <span className="mt-1 block">
                {l === "en" ? "Soft texture" : "เนื้อนุ่ม"}
              </span>
            </div>
            <div className="px-2 py-1">
              <span className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-[var(--mint)] text-[var(--success)]">
                <CalendarDays size={18} />
              </span>
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
      <p className="mt-3 flex items-start justify-center gap-1.5 text-center text-xs font-bold text-[var(--success)]">
        <Check className="mt-px shrink-0" size={15} />
        <span>
          {l === "en"
            ? "No recurring charge. Subscription is not enabled."
            : "ไม่มีค่าบริการต่อเนื่อง และยังไม่เปิด Subscription"}
        </span>
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
        ? "Chicken First Bowl"
        : "First Bowl รสไก่"
      : l === "en"
        ? "Salmon First Bowl"
        : "First Bowl รสแซลมอน";
  return (
    <>
      <div className="flex items-center justify-between">
        <TinyBadge tone="warning">
          {l === "en" ? "DEMO ORDER" : "คำสั่งซื้อจำลอง"}
        </TinyBadge>
        <span className="text-xs font-bold text-[var(--muted)]">
          {l === "en" ? "No charge" : "ไม่เรียกเก็บเงินจริง"}
        </span>
      </div>
      <h1 className="display mt-4 text-4xl font-black">
        {l === "en" ? "Review order" : "ตรวจสอบคำสั่งซื้อ"}
      </h1>
      <div className="mt-7">
        <div className="relative border-y-2 border-[var(--chocolate)]/15 py-5">
          <span className="absolute -left-2 top-1/2 h-12 w-12 -translate-y-1/2 rounded-[45%_55%_50%_50%] bg-[#ffe7e9]" aria-hidden="true" />
          <div className="flex items-center gap-3">
            <div className="relative grid h-14 w-14 place-items-center rounded-full text-[var(--coral-dark)]">
              <Utensils size={25} />
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
        <div className="mt-3">
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
            className="pressable flex min-h-[74px] w-full items-center gap-3 border-b border-[var(--line)] px-1 py-4 text-left last:border-b-0"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--soft)] text-[var(--coral-dark)]">{x.icon}</span>
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
      </div>
      <div className="mt-6 border-l-4 border-[var(--success)] bg-gradient-to-r from-[var(--mint)] to-transparent py-3 pl-4 text-sm text-[var(--success)]">
        <strong>{l === "en" ? "Subscription:" : "Subscription:"}</strong>{" "}
        {l === "en"
          ? "Off · this demo will not charge or ship anything."
          : "ปิด · เดโมนี้จะไม่เรียกเก็บเงินหรือจัดส่งจริง"}
      </div>
      <div className="mt-5">
        <AppButton onClick={() => go("receipt")} icon={<Check size={18} />}>
          {l === "en" ? "Confirm demo order" : "ยืนยันคำสั่งซื้อจำลอง"}
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
        {l === "en" ? "Order confirmed" : "ยืนยันคำสั่งซื้อแล้ว"}
      </h1>
      <p className="mx-auto mt-3 max-w-sm leading-7 text-[var(--muted)]">
        {l === "en"
          ? "Demo delivery scheduled. A meal check-in will appear in 3 days."
          : "กำหนดส่งแบบจำลองแล้ว แบบเช็กมื้ออาหารจะแสดงในอีก 3 วัน"}
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
        {l === "en" ? "Preview 3-day check-in" : "ดูแบบเช็กผลในอีก 3 วัน"}
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
      icon: <Sparkles size={23} />,
      t: l === "en" ? "Finished it" : "กินหมด",
      s: l === "en" ? "Bowl looked clean" : "ชามเกือบสะอาด",
    },
    {
      v: "some",
      icon: <Utensils size={23} />,
      t: l === "en" ? "Some left" : "เหลือบางส่วน",
      s: l === "en" ? "Accepted, not finished" : "ยอมกินแต่ไม่หมด",
    },
    {
      v: "skipped",
      icon: <CircleOff size={23} />,
      t: l === "en" ? "Skipped it" : "ไม่กิน",
      s: l === "en" ? "Little or no intake" : "กินน้อยหรือไม่กิน",
    },
  ];
  return (
    <>
      <Eyebrow>
        {l === "en"
          ? "Meal check-in · Day 3"
          : "เช็กมื้ออาหาร · วันที่ 3"}
      </Eyebrow>
      <PageTitle
        sub={
          l === "en"
            ? "Record the meal result before a repeat order or subscription."
            : "บันทึกผลมื้ออาหารก่อนสั่งซ้ำหรือเริ่ม Subscription"
        }
      >
        {l === "en"
          ? "How did the First Bowl go?"
          : "First Bowl เป็นอย่างไรบ้าง?"}
      </PageTitle>
      <div className="mt-6 border-y border-[var(--line)]">
        {opts.map((o) => (
          <button
            key={o.v}
            onClick={() => setValue(o.v)}
            aria-pressed={value === o.v}
            className={`pressable relative flex min-h-[88px] w-full items-center gap-4 border-b border-[var(--line)] px-1 py-4 text-left last:border-b-0 ${value === o.v ? "bg-gradient-to-r from-[#ffe8e9] via-[#fff7f2] to-transparent" : "bg-transparent"}`}
          >
            {value === o.v && (
              <motion.span
                layoutId="checkin-mark"
                className="absolute bottom-2 left-0 top-2 w-1 rounded-full bg-[var(--coral-dark)]"
              />
            )}
            <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${value === o.v ? "bg-[var(--coral-dark)] text-white" : "bg-[var(--soft)] text-[var(--chocolate)]"}`}>
              {o.icon}
            </span>
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
      <div className="mt-6 border-l-2 border-[var(--warning)]/30 pl-4">
        <p className="text-sm font-black">
          {l === "en" ? "Any warning signs?" : "มีอาการผิดปกติไหม?"}
        </p>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => setWarning(false)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-black ${!warning ? "bg-[var(--mint)] text-[var(--success)]" : "bg-[var(--soft)] text-[var(--muted)]"}`}
          >
            <Check size={14} /> {l === "en" ? "None reported" : "ไม่พบอาการ"}
          </button>
          <button
            onClick={() => setWarning(true)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold ${warning ? "bg-[#ffe3e7] text-[var(--danger)]" : "bg-[var(--soft)] text-[var(--muted)]"}`}
          >
            <HeartPulse size={14} /> {l === "en" ? "Report a sign" : "รายงานอาการ"}
          </button>
        </div>
        {warning && (
            <p className="mt-3 border-y border-[var(--warning)]/20 bg-gradient-to-r from-[#fff1ce] to-transparent py-3 text-xs leading-5 text-[var(--warning)]">
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
        {l === "en" ? "CHECK-IN COMPLETE" : "บันทึกผลแล้ว"}
      </TinyBadge>
      <PageTitle
        sub={
          l === "en"
            ? "Mochi accepted the First Bowl. Choose one-time orders or an optional delivery plan."
            : "โมจิยอมรับ First Bowl แล้ว เลือกซื้อครั้งเดียวหรือแผนจัดส่งแบบเลือกได้"
        }
      >
        {l === "en" ? "Delivery options" : "ตัวเลือกการจัดส่ง"}
      </PageTitle>
      <div className="mt-6 rounded-[30px] border-2 border-[var(--coral-dark)] bg-white p-5 shadow-soft">
        <div className="flex items-start justify-between">
          <div>
            <TinyBadge tone="coral">
              {l === "en" ? "OPTIONAL" : "ทางเลือก"}
            </TinyBadge>
            <h2 className="display mt-2 text-2xl font-black">
              {l === "en" ? "Recurring delivery" : "จัดส่งแบบต่อเนื่อง"}
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
          {[
            l === "en" ? "Skip any delivery" : "ข้ามการจัดส่งได้",
            l === "en" ? "Pause or cancel visibly" : "พักหรือยกเลิกได้ชัดเจน",
            l === "en"
              ? "TastePrint follows every check-in"
              : "TastePrint อัปเดตทุกครั้ง",
          ].map((benefit) => (
            <li key={benefit} className="flex items-center gap-2">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--mint)] text-[var(--success)]">
                <Check size={12} />
              </span>
              {benefit}
            </li>
          ))}
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

function FoodServiceEntry({
  l,
  state,
  go,
  openTrial,
  restartTrial,
  openAi,
  legacy = false,
}: {
  l: Locale;
  state: AppState;
  go: (s: Screen) => void;
  openTrial: () => void;
  restartTrial: () => void;
  openAi: () => void;
  legacy?: boolean;
}) {
  const hasObservation = Boolean(
    state.choice && state.approach && state.intake && state.energy,
  );
  const status = state.feedback
    ? "ready"
    : state.foodTrialStep !== "safety" || state.choice || state.approach
      ? "in-progress"
      : "new";
  const progressByStep: Record<FoodTrialStep, number> = {
    safety: 8,
    safetyHold: 8,
    trial: 24,
    camera: 33,
    observe: 44,
    feedback: 58,
    tasteprint: 70,
    firstBowl: 78,
    checkout: 84,
    receipt: 90,
    checkin: 95,
    subscription: 100,
  };
  if (!legacy) {
    return (
      <FoodServiceDetail
        locale={l}
        status={status}
        progress={status === "new" ? 0 : progressByStep[state.foodTrialStep]}
        onStart={restartTrial}
        onContinue={openTrial}
        onOpenResult={() => go(hasObservation ? "tasteprint" : "feedback")}
        onOpenAi={openAi}
      />
    );
  }
  return (
    <>
      <Eyebrow>{l === "en" ? "Food service" : "บริการอาหาร"}</Eyebrow>
      <PageTitle
        sub={
          l === "en"
            ? "A guided taste trial turns observable reactions into a safer first-bowl decision."
            : "การทดลองรสชาติแบบมีขั้นตอน เปลี่ยนปฏิกิริยาที่สังเกตได้ให้เป็นการตัดสินใจเลือกชามแรกอย่างรอบคอบ"
        }
      >
        {l === "en" ? "Taste first. Commit later." : "ลองรสก่อน แล้วค่อยตัดสินใจ"}
      </PageTitle>
      <div className="mt-6 grid gap-3">
        {[
          {
            icon: <Utensils size={22} />,
            en: "Compare two tastes",
            th: "เปรียบเทียบอาหารสองรส",
          },
          {
            icon: <Dog size={22} />,
            en: "Record what your dog actually does",
            th: "บันทึกสิ่งที่น้องทำจริง",
          },
          {
            icon: <Sparkles size={22} />,
            en: "Receive an AI-assisted observation summary",
            th: "รับสรุปข้อสังเกตที่มี AI ช่วยวิเคราะห์",
          },
        ].map((item) => (
          <div
            key={item.en}
            className="flex items-center gap-4 rounded-[22px] border border-[var(--line)] bg-white p-4"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--soft)] text-[var(--coral-dark)]">
              {item.icon}
            </span>
            <p className="text-sm font-black">{l === "en" ? item.en : item.th}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-3">
        <Link
          href="/app/food/trial/"
          className="pressable flex min-h-14 w-full items-center justify-center gap-2 rounded-[18px] bg-[var(--coral-dark)] px-5 py-3 text-[15px] font-extrabold text-white shadow-[0_10px_26px_rgba(216,58,79,.25)]"
        >
          {l === "en" ? "Start or resume the taste trial" : "เริ่มหรือทำ Taste Trial ต่อ"}
          <ArrowRight size={18} />
        </Link>
        <Link
          href="/app/"
          className="pressable flex min-h-14 w-full items-center justify-center rounded-[18px] border-2 border-[var(--chocolate)] bg-white px-5 py-3 text-[15px] font-extrabold text-[var(--chocolate)]"
        >
          {l === "en" ? "Back to PawProud home" : "กลับหน้าหลัก PawProud"}
        </Link>
      </div>
    </>
  );
}

function AiGuideEntry({
  l,
  feedback,
  source,
  loading,
  hasRecordedSignal,
  run,
  startTrial,
  legacy = false,
}: {
  l: Locale;
  feedback: string;
  source: "ai" | "fallback" | "";
  loading: boolean;
  hasRecordedSignal: boolean;
  run: () => void;
  startTrial: () => void;
  legacy?: boolean;
}) {
  if (!legacy) {
    return (
      <TasteInterpreter
        locale={l}
        feedback={feedback}
        source={source}
        loading={loading}
        hasRecordedSignal={hasRecordedSignal}
        onRun={run}
        onStartTrial={startTrial}
      />
    );
  }
  return (
    <>
      <Eyebrow>{l === "en" ? "PawProud AI" : "PawProud AI"}</Eyebrow>
      <PageTitle
        sub={
          l === "en"
            ? "The AI works after you record a real observation. It summarizes the signal, exposes uncertainty, and suggests a cautious next step."
            : "AI ทำงานหลังจากคุณบันทึกพฤติกรรมจริง โดยสรุปสัญญาณ แสดงสิ่งที่ยังไม่แน่นอน และแนะนำขั้นตอนถัดไปอย่างรอบคอบ"
        }
      >
        {l === "en" ? "Evidence in. Guidance out." : "ใส่หลักฐาน แล้วรับคำแนะนำ"}
      </PageTitle>
      <div className="mt-6 rounded-[28px] bg-[var(--chocolate)] p-5 text-white shadow-soft">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/12">
            <Sparkles size={24} />
          </span>
          <div>
            <p className="font-black">
              {l === "en" ? "Live AI feedback" : "ฟีดแบ็กจาก AI แบบสด"}
            </p>
            <p className="mt-1 text-xs text-white/65">
              {l === "en"
                ? "With a safety-checked fallback"
                : "พร้อมระบบสำรองที่ผ่านกติกาความปลอดภัย"}
            </p>
          </div>
        </div>
        <p className="mt-5 text-sm leading-6 text-white/72">
          {l === "en"
            ? "AI does not diagnose allergies or prescribe food. It helps owners interpret one trial without overstating what it proves."
            : "AI ไม่วินิจฉัยการแพ้หรือสั่งอาหาร แต่ช่วยเจ้าของตีความการทดลองหนึ่งครั้งโดยไม่สรุปเกินหลักฐาน"}
        </p>
      </div>
      <div className="mt-6 space-y-3">
        <Link
          href="/app/food/trial/"
          className="pressable flex min-h-14 w-full items-center justify-center gap-2 rounded-[18px] bg-[var(--coral-dark)] px-5 py-3 text-[15px] font-extrabold text-white shadow-[0_10px_26px_rgba(216,58,79,.25)]"
        >
          {l === "en" ? "Try the AI-guided flow" : "ทดลอง Flow ที่มี AI ช่วย"}
          <ArrowRight size={18} />
        </Link>
        <Link
          href="/app/"
          className="pressable flex min-h-14 w-full items-center justify-center rounded-[18px] border-2 border-[var(--chocolate)] bg-white px-5 py-3 text-[15px] font-extrabold text-[var(--chocolate)]"
        >
          {l === "en" ? "Back to PawProud home" : "กลับหน้าหลัก PawProud"}
        </Link>
      </div>
    </>
  );
}

function Today({
  l,
  state,
  go,
  openFood,
  openAi,
  openPassport,
  legacy = false,
}: {
  l: Locale;
  state: AppState;
  go: (s: Screen) => void;
  openFood: () => void;
  openAi: () => void;
  openPassport: () => void;
  legacy?: boolean;
}) {
  if (!legacy) {
    const hasObservation = Boolean(
      state.choice && state.approach && state.intake && state.energy,
    );
    return (
      <ServiceHome
        locale={l}
        snapshot={{
          foodStatus: state.feedback
            ? "ready"
            : state.foodTrialStep !== "safety" || state.choice || state.approach
              ? "in-progress"
              : "new",
          evidence: (hasObservation ? 1 : 0) + (state.checkedIn ? 1 : 0),
          ordered: state.ordered,
          checkedIn: state.checkedIn,
        }}
        onOpenFood={openFood}
        onOpenAi={openAi}
        onOpenPassport={openPassport}
        onOpenSupport={() => go("help")}
        onOpenProfile={() => go("profile")}
      />
    );
  }
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
          aria-label={l === "en" ? "Open Mochi’s profile" : "เปิดโปรไฟล์ของโมจิ"}
          className="pressable relative h-14 w-14 overflow-hidden rounded-[20px] bg-[var(--soft)]"
        >
          <Image
            src="/brand/pawproud-app-icon.webp"
            alt=""
            fill
            sizes="56px"
            className="object-cover"
          />
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
  const [sharePreviewOpen, setSharePreviewOpen] = useState(false);
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
  const hasChoice = Boolean(state.choice);
  const hasObservations = Boolean(
    state.approach && state.intake && state.energy,
  );
  const hasRecordedTrial = hasChoice && hasObservations;
  const hasCareActivity = Boolean(
    hasChoice ||
      state.approach ||
      state.intake ||
      state.energy ||
      state.feedback ||
      state.ordered ||
      state.checkedIn,
  );
  const tastePrintTitle = hasRecordedTrial
    ? state.choice === "unclear"
      ? l === "en"
        ? "TastePrint · Unclear"
        : "TastePrint · ยังไม่ชัดเจน"
      : l === "en"
        ? "TastePrint · Early signal"
        : "TastePrint · สัญญาณเบื้องต้น"
    : l === "en"
      ? "TastePrint · Pending"
      : "TastePrint · รอข้อมูล";
  const tastePrintStatus = hasRecordedTrial
    ? state.choice === "unclear"
      ? l === "en"
        ? "No clear preference recorded · repeat recommended"
        : "ยังไม่พบความชอบที่ชัดเจน · แนะนำให้ทดลองซ้ำ"
      : state.feedback
        ? l === "en"
          ? "Aroma signal generated from owner observations"
          : "สร้างสัญญาณด้านกลิ่นจากข้อมูลที่เจ้าของบันทึก"
        : l === "en"
          ? "Owner observations recorded · summary pending"
          : "บันทึกข้อสังเกตแล้ว · รอสรุปผล"
    : hasChoice
      ? l === "en"
        ? "Taste selected · observation not completed"
        : "เลือกตัวอย่างแล้ว · ยังบันทึกข้อสังเกตไม่ครบ"
      : l === "en"
        ? "Complete a taste trial to create the first signal"
        : "ทำการทดลองรสชาติเพื่อสร้างสัญญาณแรก";
  const trialTitle = hasRecordedTrial
    ? l === "en"
      ? "Taste Trial #1"
      : "ทดลองรสชาติ #1"
    : l === "en"
      ? "Taste trial · Pending"
      : "ทดลองรสชาติ · รอบันทึก";
  const trialStatus = hasRecordedTrial
    ? l === "en"
      ? "Owner reported approach, intake and body language"
      : "เจ้าของรายงานการเข้าหา ปริมาณ และภาษากาย"
    : hasChoice
      ? l === "en"
        ? "Taste selection saved · observation pending"
        : "บันทึกตัวเลือกแล้ว · รอข้อสังเกต"
      : l === "en"
        ? "No trial recorded"
        : "ยังไม่มีการทดลองที่บันทึกไว้";
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
      t: tastePrintTitle,
      s: tastePrintStatus,
      tag: "SYSTEM",
    },
    {
      icon: <Utensils />,
      t: trialTitle,
      s: trialStatus,
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
          <div className="relative h-16 w-16 overflow-hidden rounded-[22px] bg-white">
            <Image
              src="/brand/pawproud-app-icon.webp"
              alt={l === "en" ? "Mochi profile illustration" : "ภาพโปรไฟล์ของโมจิ"}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
        </div>
        <div className="mt-5 flex items-center gap-2 text-xs text-white/70">
          <ShieldCheck size={15} />{" "}
          {l === "en"
            ? hasCareActivity
              ? "Owner-controlled prototype · updated today"
              : "Owner-controlled prototype · no care activity recorded"
            : hasCareActivity
              ? "ต้นแบบที่เจ้าของควบคุม · อัปเดตวันนี้"
              : "ต้นแบบที่เจ้าของควบคุม · ยังไม่มีข้อมูลการดูแล"}
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
        onClick={() => setSharePreviewOpen((open) => !open)}
        aria-expanded={sharePreviewOpen}
        className="pressable mt-4 flex min-h-14 w-full items-center justify-center gap-2 rounded-[18px] border-2 border-[var(--chocolate)] bg-white font-black"
      >
        <Download size={18} />
        {sharePreviewOpen
          ? l === "en"
            ? "Close share preview"
            : "ปิดตัวอย่างสำหรับแชร์"
          : l === "en"
            ? "Preview share summary"
            : "ดูตัวอย่างสรุปสำหรับแชร์"}
      </button>
      <AnimatePresence initial={false}>
        {sharePreviewOpen && (
          <motion.section
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            className="mt-3 overflow-hidden rounded-[24px] border border-[var(--line)] bg-white"
            aria-label={l === "en" ? "Share preview" : "ตัวอย่างสำหรับแชร์"}
          >
            <div className="border-b border-[var(--line)] bg-[var(--soft)] px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-black">
                  {l === "en" ? "Care summary preview" : "ตัวอย่างสรุปการดูแล"}
                </p>
                <TinyBadge tone="warning">
                  {l === "en" ? "NOT SHARED" : "ยังไม่แชร์"}
                </TinyBadge>
              </div>
              <p className="mt-1 text-xs text-[var(--muted)]">
                {l === "en"
                  ? "Review before choosing where to share."
                  : "ตรวจสอบก่อนเลือกว่าจะแชร์ที่ใด"}
              </p>
            </div>
            <div className="space-y-3 p-4 text-sm">
              <div>
                <p className="text-xs font-bold text-[var(--muted)]">
                  {l === "en" ? "Dog" : "สุนัข"}
                </p>
                <p className="font-black">Mochi · 4 years · 6.8 kg</p>
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--muted)]">
                  {l === "en" ? "Taste profile" : "โปรไฟล์รสชาติ"}
                </p>
                <p className="font-black">{tastePrintTitle}</p>
                <p className="mt-0.5 text-xs leading-5 text-[var(--muted)]">
                  {tastePrintStatus}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--muted)]">
                  {l === "en" ? "Meal check-in" : "เช็กมื้ออาหาร"}
                </p>
                <p className="font-black">{mealStatus}</p>
              </div>
              <p className="border-t border-dashed border-[var(--line)] pt-3 text-xs leading-5 text-[var(--muted)]">
                {l === "en"
                  ? "Sources: owner profile, owner observations, and PawProud system summary. This preview has not been sent."
                  : "แหล่งข้อมูล: โปรไฟล์จากเจ้าของ ข้อสังเกตจากเจ้าของ และสรุปจากระบบ PawProud ตัวอย่างนี้ยังไม่ได้ถูกส่ง"}
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
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
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[28px] bg-[var(--soft)]">
            <Image
              src="/brand/pawproud-app-icon.webp"
              alt={l === "en" ? "Mochi profile illustration" : "ภาพโปรไฟล์ของโมจิ"}
              fill
              sizes="80px"
              className="object-cover"
            />
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
      <PageTitle>{l === "en" ? "More" : "เพิ่มเติม"}</PageTitle>
      <div className="mt-6 space-y-3">
        {[
          {
            i: <CalendarDays />,
            t: l === "en" ? "Food plan" : "แผนอาหาร",
            s: state.subscribed
              ? state.paused
                ? l === "en"
                  ? "Subscription paused"
                  : "พักการสมัครสมาชิกอยู่"
                : l === "en"
                  ? "Subscription active"
                  : "การสมัครสมาชิกกำลังใช้งาน"
              : l === "en"
                ? "No active subscription"
                : "ยังไม่มีการสมัครสมาชิก",
            a: () => go("plan"),
          },
          {
            i: <Truck />,
            t: l === "en" ? "Delivery status" : "สถานะการจัดส่ง",
            s: state.ordered
              ? l === "en"
                ? "Order #PP-MOCHI-01"
                : "คำสั่งซื้อ #PP-MOCHI-01"
              : l === "en"
                ? "No active order"
                : "ไม่มีคำสั่งซื้อที่กำลังจัดส่ง",
            a: () => go("delivery"),
          },
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
            i: <Play />,
            t: l === "en" ? "Replay guided tour" : "ดูคำแนะนำอีกครั้ง",
            s:
              l === "en"
                ? "Restart the first-use walkthrough"
                : "เริ่มคำแนะนำการใช้งานครั้งแรกใหม่",
            a: () => go("welcome"),
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

export function ProductExperience({
  entry = "hub",
}: {
  entry?: ProductEntry;
}) {
  const router = useRouter();
  const { state, setState, hydrated } = usePersistedState(entry);
  const [loading, setLoading] = useState(false);
  const [bootReady, setBootReady] = useState(false);
  const [aiPreviewLoading, setAiPreviewLoading] = useState(false);
  const [aiPreviewFeedback, setAiPreviewFeedback] = useState("");
  const [aiPreviewSource, setAiPreviewSource] = useState<
    "ai" | "fallback" | ""
  >("");
  const [soundOn, setSoundOn] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [guideTime, setGuideTime] = useState(0);
  const [guideDuration, setGuideDuration] = useState(37.1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const feedbackRequestIdRef = useRef(0);
  const feedbackRequestRef = useRef<{
    id: number;
    controller: AbortController;
    timeoutId: number;
  } | null>(null);
  const aiPreviewRequestIdRef = useRef(0);
  const aiPreviewRequestRef = useRef<{
    id: number;
    controller: AbortController;
    timeoutId: number;
  } | null>(null);
  const l = state.locale;
  useEffect(() => {
    document.documentElement.lang = l;
  }, [l]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [entry, state.screen]);
  useEffect(() => {
    if (!hydrated) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem("pawproud-loader-seen") === "1";
    } catch {
      /* session storage is optional */
    }
    const timer = window.setTimeout(() => {
      setBootReady(true);
      if (!seen) {
        try {
          sessionStorage.setItem("pawproud-loader-seen", "1");
        } catch {
          /* session storage is optional */
        }
      }
    }, seen ? 0 : 1050);
    return () => window.clearTimeout(timer);
  }, [hydrated]);
  useEffect(
    () => () => {
      const feedbackRequest = feedbackRequestRef.current;
      if (feedbackRequest) {
        window.clearTimeout(feedbackRequest.timeoutId);
        feedbackRequest.controller.abort();
        feedbackRequestRef.current = null;
      }
      feedbackRequestIdRef.current += 1;

      const aiPreviewRequest = aiPreviewRequestRef.current;
      if (aiPreviewRequest) {
        window.clearTimeout(aiPreviewRequest.timeoutId);
        aiPreviewRequest.controller.abort();
        aiPreviewRequestRef.current = null;
      }
      aiPreviewRequestIdRef.current += 1;
    },
    [],
  );
  const patch = (next: Partial<AppState>) =>
    setState((s) => ({ ...s, ...next }));
  const go = (screen: Screen) =>
    setState((s) => ({
      ...s,
      screen,
      ...(isFoodTrialStep(screen) &&
      (isFoodTrialStep(s.screen) ||
        (entry === "food-trial" && s.screen !== "today"))
        ? { foodTrialStep: screen }
        : {}),
    }));
  const navigateFromNav = (screen: Screen) => {
    if (screen === "today") return router.push("/app/");
    if (screen === "foodService") return router.push("/app/food/");
    if (screen === "aiGuide") return router.push("/app/ai/");
    if (screen === "passport") return router.push("/app/passport/");
    go(screen);
  };
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
    "camera",
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
    camera: "trial",
    observe: "camera",
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
    camera: 33,
    observe: 44,
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
    "foodService",
    "aiGuide",
    "tasteprint",
    "plan",
    "passport",
    "more",
    "profile",
    "delivery",
    "help",
  ];

  const fetchFeedback = async () => {
    const startedAt = Date.now();
    const previousRequest = feedbackRequestRef.current;
    if (previousRequest) {
      window.clearTimeout(previousRequest.timeoutId);
      previousRequest.controller.abort();
    }
    const requestId = (feedbackRequestIdRef.current += 1);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 7000);
    feedbackRequestRef.current = { id: requestId, controller, timeoutId };
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
      if (!res.ok) throw new Error("feedback unavailable");
      const data = await res.json();
      if (feedbackRequestRef.current?.id === requestId) {
        patch({
          feedback: data.feedback || fallback,
          feedbackLocale: l,
          feedbackSource: data.source === "ai" ? "ai" : "fallback",
        });
      }
    } catch {
      if (feedbackRequestRef.current?.id === requestId) {
        patch({
          feedback: fallback,
          feedbackLocale: l,
          feedbackSource: "fallback",
        });
      }
    } finally {
      window.clearTimeout(timeoutId);
      await waitForMinimumProcessingTime(startedAt);
      if (feedbackRequestRef.current?.id === requestId) {
        feedbackRequestRef.current = null;
        setLoading(false);
      }
    }
  };

  const hasRecordedSignal = Boolean(
    state.choice && state.approach && state.intake && state.energy,
  );
  const localizedRecordedFeedback =
    l === "en"
      ? state.choice === "unclear"
        ? "Mochi did not show a clear first choice in this trial. That is useful evidence too: repeat the same comparison another day without changing multiple things at once."
        : `Mochi showed a stronger response to the ${state.choice} aroma in this trial. Treat this as an early preference signal, not a final conclusion. Repeat the comparison on another day before changing his regular food.`
      : state.choice === "unclear"
        ? "โมจิยังไม่แสดงตัวเลือกแรกที่ชัดเจน ซึ่งก็เป็นข้อมูลที่มีประโยชน์ ควรเปรียบเทียบแบบเดิมอีกวันโดยไม่เปลี่ยนหลายอย่างพร้อมกัน"
        : `ในการทดลองนี้ โมจิตอบสนองต่อกลิ่น${state.choice === "salmon" ? "แซลมอน" : "ไก่"}มากกว่า ให้ถือเป็นสัญญาณความชอบเบื้องต้น ไม่ใช่ข้อสรุปสุดท้าย และควรทดลองซ้ำอีกวันก่อนเปลี่ยนอาหารประจำ`;
  const recordedFeedbackForLocale =
    state.feedback && state.feedbackLocale === l
      ? state.feedback
      : localizedRecordedFeedback;
  const fetchAiPreview = async () => {
    const startedAt = Date.now();
    const previousRequest = aiPreviewRequestRef.current;
    if (previousRequest) {
      window.clearTimeout(previousRequest.timeoutId);
      previousRequest.controller.abort();
    }
    const requestId = (aiPreviewRequestIdRef.current += 1);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 7000);
    aiPreviewRequestRef.current = { id: requestId, controller, timeoutId };
    setAiPreviewLoading(true);
    setAiPreviewFeedback("");
    setAiPreviewSource("");
    const payload = hasRecordedSignal
      ? {
          choice: state.choice,
          approach: state.approach,
          intake: state.intake,
          energy: state.energy,
        }
      : {
          choice: "salmon" as const,
          approach: "quick",
          intake: "most",
          energy: "bright",
        };
    const fallback =
      l === "en"
        ? "Mochi approached the salmon first, ate most of the sample, and stayed bright and engaged. This is a first clue, so repeat the same comparison another day before changing Mochi’s regular food."
        : "โมจิเข้าหาแซลมอนก่อน กินเกือบหมด และยังดูสนใจ นี่เป็นเพียงเบาะแสแรก ควรลองเปรียบเทียบแบบเดิมอีกวันก่อนเปลี่ยนอาหารประจำของโมจิ";
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          locale: l,
          dogName: "Mochi",
          scenarioId: "taste-trial-01",
          ...payload,
        }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("AI read unavailable");
      const data = (await response.json()) as {
        feedback?: string;
        source?: string;
      };
      if (aiPreviewRequestRef.current?.id === requestId) {
        setAiPreviewFeedback(data.feedback || fallback);
        setAiPreviewSource(data.source === "ai" ? "ai" : "fallback");
      }
    } catch {
      if (aiPreviewRequestRef.current?.id === requestId) {
        setAiPreviewFeedback(fallback);
        setAiPreviewSource("fallback");
      }
    } finally {
      window.clearTimeout(timeoutId);
      await waitForMinimumProcessingTime(startedAt);
      if (aiPreviewRequestRef.current?.id === requestId) {
        aiPreviewRequestRef.current = null;
        setAiPreviewLoading(false);
      }
    }
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
      case "foodService":
        return (
          <FoodServiceEntry
            l={l}
            state={state}
            go={go}
            openTrial={() => router.push("/app/food/trial/")}
            restartTrial={() => router.push("/app/food/trial/?reset=1")}
            openAi={() => router.push("/app/ai/")}
          />
        );
      case "aiGuide":
        return (
          <AiGuideEntry
            l={l}
            feedback={
              hasRecordedSignal
                ? recordedFeedbackForLocale
                : aiPreviewFeedback
            }
            source={
              hasRecordedSignal
                ? state.feedbackLocale === l
                  ? state.feedbackSource
                  : "fallback"
                : aiPreviewSource
            }
            loading={aiPreviewLoading}
            hasRecordedSignal={hasRecordedSignal}
            run={fetchAiPreview}
            startTrial={() => router.push("/app/food/trial/?reset=1")}
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
      case "camera":
        return (
          <CameraMoment
            locale={l}
            onContinue={() => go("observe")}
            onSkip={() => go("observe")}
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
              if (state.warningReported) {
                go("safetyHold");
              } else if (state.checkin === "skipped") {
                router.push("/app/");
              } else {
                go("subscription");
              }
            }}
          />
        );
      case "subscription":
        return (
          <Subscription
            l={l}
            patch={patch}
            done={() => router.push("/app/")}
          />
        );
      case "today":
        return (
          <Today
            l={l}
            state={state}
            go={go}
            openFood={() => router.push("/app/food/")}
            openAi={() => router.push("/app/ai/")}
            openPassport={() => router.push("/app/passport/")}
          />
        );
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
            reset={() => setState({ ...seed, locale: l, screen: "today" })}
            go={go}
            soundOn={soundOn}
            setSoundOn={(enabled) => (enabled ? playGuide() : closeGuide())}
          />
        );
    }
  })();

  if (!hydrated || !bootReady) return <PawProudLoader locale={l} />;
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
          (state.screen === "foodService" || state.screen === "aiGuide") &&
          entry !== "hub"
            ? () => router.push("/app/")
            : state.screen === "safety" && entry === "food-trial"
            ? () => router.push("/app/food/")
            : state.screen === "passport" && entry === "passport"
              ? () => router.push("/app/")
              : state.screen === "tasteprint" && entry === "food"
                ? () => go("foodService")
              : state.screen !== "welcome" && backMap[state.screen]
                ? () => go(backMap[state.screen]!)
                : undefined
        }
        progress={progressMap[state.screen]}
      />
      <Shell>{<div key={state.screen}>{content}</div>}</Shell>
      {hasNav && (
        <BottomNav screen={state.screen} go={navigateFromNav} l={l} />
      )}
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
