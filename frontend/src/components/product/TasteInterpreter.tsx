"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Activity,
  ArrowRight,
  Dog,
  Gauge,
  PawPrint,
  Radar,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

type Locale = "en" | "th";
type FeedbackSource = "ai" | "fallback" | "";

export type TasteInterpreterProps = {
  locale: Locale;
  feedback: string;
  source: FeedbackSource;
  loading: boolean;
  hasRecordedSignal: boolean;
  onRun: () => void;
  onStartTrial: () => void;
};

const copy = {
  en: {
    eyebrow: "AI MEAL SIGNALS",
    title: "PawSense",
    sub: "Reads 4 recorded meal signals. Not a diagnosis.",
    status: {
      loading: "Analyzing signals",
      ai: "AI result",
      fallback: "Offline summary",
      ready: "Ready",
      empty: "Demo available",
    },
    signals: ["First choice", "Approach", "Amount eaten", "Body language"],
    center: "PawSense",
    readyTitle: "Signals ready",
    readyBody: "Review the 4 signals recorded for this meal.",
    emptyTitle: "Try PawSense",
    emptyBody: "Use demo signals or record a tasting with Mochi.",
    resultTitle: "Signal summary",
    aiProvenance: "Based on the 4 signals recorded for this meal.",
    fallbackProvenance:
      "Live AI was unavailable. This uses PawProud’s safety-reviewed guide.",
    demoProvenance: "Demo signals only. Not saved to Mochi’s record.",
    run: "Analyze signals",
    runDemo: "Run demo",
    start: "Start a tasting",
    newTrial: "New tasting",
    retry: "Retry live AI",
    safety:
      "Uses recorded behaviour only. It cannot diagnose allergies or confirm nutritional fit.",
  },
  th: {
    eyebrow: "AI วิเคราะห์สัญญาณมื้ออาหาร",
    title: "PawSense",
    sub: "อ่านสัญญาณจากมื้ออาหาร 4 อย่าง ไม่ใช่การวินิจฉัย",
    status: {
      loading: "กำลังวิเคราะห์สัญญาณ",
      ai: "ผลจาก AI",
      fallback: "สรุปแบบออฟไลน์",
      ready: "พร้อมวิเคราะห์",
      empty: "มีเดโมให้ลอง",
    },
    signals: ["ชามแรกที่เลือก", "การเข้าหา", "ปริมาณที่กิน", "ภาษากาย"],
    center: "PawSense",
    readyTitle: "สัญญาณพร้อมแล้ว",
    readyBody: "ตรวจสัญญาณ 4 อย่างที่บันทึกจากมื้อนี้",
    emptyTitle: "ลองใช้ PawSense",
    emptyBody: "ใช้ข้อมูลเดโม หรือเริ่มบันทึกมื้อจริงของโมจิ",
    resultTitle: "สรุปสัญญาณ",
    aiProvenance: "อ้างอิงจากสัญญาณ 4 อย่างที่บันทึกในมื้อนี้",
    fallbackProvenance:
      "AI แบบสดไม่พร้อม ผลนี้ใช้แนวทางสำรองที่ผ่านกติกาความปลอดภัย",
    demoProvenance: "ใช้ข้อมูลเดโมเท่านั้น ไม่บันทึกในประวัติของโมจิ",
    run: "วิเคราะห์สัญญาณ",
    runDemo: "ลองเดโม",
    start: "เริ่มทดลองรสชาติ",
    newTrial: "ทดลองมื้อใหม่",
    retry: "ลอง AI แบบสดอีกครั้ง",
    safety:
      "ใช้พฤติกรรมที่บันทึกเท่านั้น ไม่สามารถวินิจฉัยอาการแพ้หรือยืนยันความเหมาะสมทางโภชนาการได้",
  },
} as const;

const signalIcons = [Dog, Gauge, UtensilsCrossed, Activity] as const;
const signalPositions = [
  "left-1 top-5",
  "right-1 top-5",
  "left-1 bottom-4",
  "right-1 bottom-4",
] as const;
const signalTones = [
  "bg-[#ffe1d5] text-[var(--coral-dark)]",
  "bg-[#fff0bd] text-[#8a5200]",
  "bg-[#dff2ff] text-[var(--trust)]",
  "bg-[#d9f3e9] text-[var(--success)]",
] as const;
const paths = [
  "M 58 50 C 89 51 119 79 160 118",
  "M 262 50 C 231 51 201 79 160 118",
  "M 58 201 C 91 196 120 159 160 118",
  "M 262 201 C 229 196 200 159 160 118",
] as const;

export function TasteInterpreter({
  locale,
  feedback,
  source,
  loading,
  hasRecordedSignal,
  onRun,
  onStartTrial,
}: TasteInterpreterProps) {
  const t = copy[locale];
  const reduceMotion = useReducedMotion();
  const status = loading
    ? t.status.loading
    : source === "ai"
      ? t.status.ai
      : source === "fallback"
        ? t.status.fallback
        : hasRecordedSignal
          ? t.status.ready
          : t.status.empty;
  const statusTone =
    source === "ai"
      ? "text-[var(--trust)]"
      : source === "fallback"
        ? "text-[var(--warning)]"
        : "text-[var(--muted)]";
  const activeSignal = Boolean(loading || hasRecordedSignal || feedback);

  return (
    <section aria-labelledby="taste-interpreter-title" className="relative isolate overflow-hidden px-1 pb-3 pt-2">
      <div aria-hidden="true" className="pointer-events-none absolute -left-16 top-14 -z-10 h-48 w-48 rounded-full bg-[#ffe9dd]/70 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-64 -z-10 h-52 w-52 rounded-full bg-[#dff2ff]/60 blur-3xl" />

      <header className="px-3">
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
          <p className="flex items-center gap-2 text-[10px] font-black tracking-[.14em] text-[var(--coral-dark)]">
            <Radar aria-hidden="true" size={15} strokeWidth={2.5} />
            {t.eyebrow}
          </p>
          <p className={`flex max-w-full items-center gap-1.5 text-[9px] font-black tracking-[.06em] ${statusTone}`}>
            <motion.span
              aria-hidden="true"
              className={`h-2 w-2 rounded-full ${source === "ai" ? "bg-[var(--trust)]" : source === "fallback" ? "bg-[var(--honey)]" : "bg-[var(--coral)]"}`}
              animate={loading && !reduceMotion ? { scale: [0.75, 1.35, 0.75], opacity: [0.45, 1, 0.45] } : undefined}
              transition={{ duration: 1.15, repeat: Infinity }}
            />
            {status}
          </p>
        </div>
        <h2 id="taste-interpreter-title" className="display mt-4 max-w-[18ch] text-[31px] leading-[.98] font-black">
          {t.title}
        </h2>
        <p className="mt-3 max-w-[36ch] text-[13px] leading-5 text-[var(--muted)]">{t.sub}</p>
      </header>

      <div
        className="relative mx-auto mt-4 h-[254px] w-full max-w-[360px]"
        aria-label={
          locale === "en"
            ? "Four meal signals flowing into the PawSense taste interpreter"
            : "สัญญาณจากมื้ออาหาร 4 อย่างไหลเข้าสู่ PawSense"
        }
      >
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[178px] w-[196px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#fff1df] via-[#ffe5dc] to-[#f8d8ed] opacity-85 shadow-[inset_0_0_28px_rgba(255,255,255,.65)]"
          style={{ borderRadius: "57% 43% 52% 48% / 44% 56% 44% 56%" }}
          animate={!reduceMotion ? { rotate: [-2, 2, -2], scale: [1, 1.025, 1] } : undefined}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <span aria-hidden="true" className="absolute left-[18%] top-[42%] h-3 w-3 rounded-full bg-[var(--honey)]/55" />
        <span aria-hidden="true" className="absolute right-[17%] top-[49%] h-2 w-2 rounded-full bg-[var(--trust)]/45" />

        <svg aria-hidden="true" viewBox="0 0 320 254" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          {paths.map((path, index) => (
            <motion.path
              key={path}
              d={path}
              fill="none"
              stroke={source === "ai" ? "#2563a8" : "#d83a4f"}
              strokeDasharray="3 8"
              strokeLinecap="round"
              strokeWidth="2.25"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                loading && !reduceMotion
                  ? { pathLength: [0.15, 1, 0.35], opacity: [0.25, 0.9, 0.25] }
                  : { pathLength: 1, opacity: activeSignal ? 0.48 : 0.19 }
              }
              transition={
                loading && !reduceMotion
                  ? { duration: 1.45, delay: index * 0.14, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }
              }
            />
          ))}
        </svg>

        {t.signals.map((label, index) => {
          const Icon = signalIcons[index];
          return (
            <motion.div
              key={label}
              className={`absolute ${signalPositions[index]} z-10 flex w-[94px] flex-col items-center text-center`}
              animate={loading && !reduceMotion ? { y: [0, -5, 0] } : { y: 0 }}
              transition={{ duration: 1.35, delay: index * 0.13, repeat: loading && !reduceMotion ? Infinity : 0, ease: "easeInOut" }}
            >
              <span className={`grid h-12 w-12 place-items-center rounded-full shadow-[0_8px_20px_rgba(86,44,28,.12),inset_0_1px_0_rgba(255,255,255,.8)] ${signalTones[index]}`}>
                <Icon aria-hidden="true" size={21} strokeWidth={2.25} />
              </span>
              <span className="mt-1.5 text-[10px] leading-[1.15] font-extrabold text-[var(--ink)]">{label}</span>
            </motion.div>
          );
        })}

        <motion.div
          className="absolute left-1/2 top-1/2 z-20 grid h-[96px] w-[96px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--chocolate)] text-white shadow-[0_16px_36px_rgba(86,44,28,.28),inset_0_2px_0_rgba(255,255,255,.18)] ring-[7px] ring-white/75"
          animate={loading && !reduceMotion ? { scale: [1, 1.08, 1] } : { scale: 1 }}
          transition={{ duration: 1.25, repeat: loading && !reduceMotion ? Infinity : 0, ease: "easeInOut" }}
        >
          <div className="text-center">
            <PawPrint aria-hidden="true" className="mx-auto" size={27} />
            <span className="mt-1 block text-[9px] font-black tracking-[.08em]">{t.center}</span>
          </div>
          {loading && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-[-13px] rounded-full border-2 border-[var(--coral)]/45"
              animate={!reduceMotion ? { scale: [0.86, 1.18], opacity: [0.8, 0] } : undefined}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </motion.div>
      </div>

      <div className="px-3 pt-1" aria-live="polite" aria-busy={loading}>
        <AnimatePresence mode="wait" initial={false}>
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
              <div className="flex items-center gap-3 text-[13px] font-extrabold text-[var(--coral-dark)]">
                <Sparkles aria-hidden="true" size={18} />
                {t.status.loading}
              </div>
              <div aria-hidden="true" className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#f3dfd3]">
                <motion.div
                  className="h-full w-1/2 rounded-full bg-gradient-to-r from-[var(--honey)] to-[var(--coral)]"
                  animate={!reduceMotion ? { x: ["-110%", "210%"] } : { x: "50%" }}
                  transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          ) : feedback ? (
            <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
              <div className="relative pl-5">
                <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-1 rounded-full bg-gradient-to-b from-[var(--coral)] via-[var(--honey)] to-[var(--trust)]" />
                <div className="flex items-center gap-2 text-[15px] font-black text-[var(--ink)]">
                  <Sparkles aria-hidden="true" size={18} className="text-[var(--coral-dark)]" />
                  {t.resultTitle}
                </div>
                <p className="mt-2 text-[15px] leading-6 text-[var(--ink)]">{feedback}</p>
                <p className="mt-3 flex items-start gap-2 text-[10px] leading-4 font-bold text-[var(--trust)]">
                  <ShieldCheck aria-hidden="true" className="mt-0.5 shrink-0" size={14} />
                  {hasRecordedSignal ? (source === "ai" ? t.aiProvenance : t.fallbackProvenance) : t.demoProvenance}
                </p>
              </div>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <button type="button" onClick={onStartTrial} className="pressable flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[var(--chocolate)] px-5 text-sm font-black text-white shadow-[0_9px_22px_rgba(86,44,28,.2)]">
                  {t.newTrial}
                  <ArrowRight aria-hidden="true" size={16} />
                </button>
                {source === "fallback" && (
                  <button type="button" onClick={onRun} className="pressable flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-black shadow-[inset_0_0_0_2px_var(--line)]">
                    <RotateCcw aria-hidden="true" size={15} />
                    {t.retry}
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div key={hasRecordedSignal ? "ready" : "empty"} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
              <h3 className="display text-[21px] leading-tight font-black">{hasRecordedSignal ? t.readyTitle : t.emptyTitle}</h3>
              <p className="mt-2 max-w-[38ch] text-[13px] leading-5 text-[var(--muted)]">{hasRecordedSignal ? t.readyBody : t.emptyBody}</p>
              <button type="button" onClick={onRun} className="pressable mt-5 flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[var(--coral-dark)] px-5 text-sm font-black text-white shadow-[0_10px_26px_rgba(216,58,79,.24)]">
                <Radar aria-hidden="true" size={18} />
                {hasRecordedSignal ? t.run : t.runDemo}
              </button>
              {!hasRecordedSignal && (
                <button type="button" onClick={onStartTrial} className="pressable mt-2 flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-4 text-xs font-black text-[var(--chocolate)] hover:bg-white/65">
                  <PawPrint aria-hidden="true" size={16} />
                  {t.start}
                  <ArrowRight aria-hidden="true" size={15} />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-5 flex items-start gap-2 border-t border-dashed border-[var(--line)] pt-3 text-[10px] leading-4 text-[var(--muted)]">
          <ShieldCheck aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--success)]" size={14} />
          <p>{t.safety}</p>
        </div>
      </div>
    </section>
  );
}
