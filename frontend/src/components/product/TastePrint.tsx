"use client";

import {
  Check,
  Droplets,
  History,
  Layers3,
  Minus,
  PawPrint,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

type Locale = "en" | "th";

type Props = {
  compact?: boolean;
  animate?: boolean;
  evidence?: number;
  label?: string;
  signal?: boolean;
  locale?: Locale;
};

type Dimension = {
  key: "aroma" | "texture" | "moisture" | "familiarity";
  icon: LucideIcon;
  color: string;
  tint: string;
  state: "signal" | "paired" | "learning";
  name: Record<Locale, string>;
  value: Record<Locale, string>;
  detail: Record<Locale, string>;
  pendingDetail: Record<Locale, string>;
};

const dimensions: Dimension[] = [
  {
    key: "aroma",
    icon: Wind,
    color: "#E64E62",
    tint: "#FFF0F2",
    state: "signal",
    name: { en: "Aroma", th: "กลิ่น" },
    value: { en: "Stronger aroma response", th: "ตอบสนองต่อกลิ่นมากกว่า" },
    detail: { en: "Approached first", th: "เข้าหาก่อน" },
    pendingDetail: { en: "Repeat the comparison", th: "ลองเปรียบเทียบอีกครั้ง" },
  },
  {
    key: "texture",
    icon: Layers3,
    color: "#CE8312",
    tint: "#FFF6DE",
    state: "paired",
    name: { en: "Texture", th: "เนื้อสัมผัส" },
    value: { en: "Soft texture was also present", th: "มีเนื้อนุ่มร่วมด้วย" },
    detail: { en: "Not isolated yet", th: "ยังแยกผลไม่ได้" },
    pendingDetail: { en: "Repeat the comparison", th: "ลองเปรียบเทียบอีกครั้ง" },
  },
  {
    key: "moisture",
    icon: Droplets,
    color: "#287FAE",
    tint: "#EAF7FD",
    state: "learning",
    name: { en: "Moisture", th: "ความชื้น" },
    value: { en: "Not observed yet", th: "ยังไม่มีข้อมูล" },
    detail: { en: "Compare next meal", th: "เทียบในมื้อถัดไป" },
    pendingDetail: { en: "Compare next meal", th: "เทียบในมื้อถัดไป" },
  },
  {
    key: "familiarity",
    icon: History,
    color: "#408C73",
    tint: "#EAF8F1",
    state: "learning",
    name: { en: "Familiarity", th: "ความคุ้นเคย" },
    value: { en: "Not observed yet", th: "ยังไม่มีข้อมูล" },
    detail: { en: "Repeat another day", th: "ทดลองซ้ำอีกวัน" },
    pendingDetail: { en: "Repeat another day", th: "ทดลองซ้ำอีกวัน" },
  },
];

function CompactTastePrint({
  locale,
  signal,
  animate,
  reduceMotion,
}: {
  locale: Locale;
  signal: boolean;
  animate: boolean;
  reduceMotion: boolean;
}) {
  const signalCount = signal ? 1 : 0;
  const pairedCount = signal ? 1 : 0;
  const learningCount = signal ? 2 : 4;

  return (
    <div
      className="mx-auto w-full max-w-[190px]"
      role="img"
      aria-label={
        locale === "en"
          ? `TastePrint: ${signalCount} early signal, ${pairedCount} trait tested together, and ${learningCount} traits to learn`
          : `TastePrint: ${signalCount} สัญญาณเริ่มต้น ${pairedCount} ด้านที่ทดลองร่วมกัน และรอเรียนรู้ ${learningCount} ด้าน`
      }
    >
      <div className="space-y-1.5">
        {dimensions.map((dimension, index) => {
          const Icon = dimension.icon;
          const learned = signal && dimension.state !== "learning";

          return (
            <motion.div
              key={dimension.key}
              aria-hidden="true"
              className="flex min-w-0 items-center gap-2 rounded-full border border-white/90 px-2.5 py-1.5 shadow-[0_4px_12px_rgba(85,43,32,.07)]"
              style={{
                background: learned
                  ? dimension.tint
                  : "repeating-linear-gradient(135deg,#fff 0,#fff 5px,#f3ebe5 5px,#f3ebe5 7px)",
              }}
              initial={
                animate && !reduceMotion
                  ? { opacity: 0, x: -7 }
                  : false
              }
              animate={{ opacity: learned ? 1 : 0.72, x: 0 }}
              transition={{
                delay: reduceMotion ? 0 : index * 0.06,
                duration: reduceMotion ? 0 : 0.3,
              }}
            >
              <Icon
                className="shrink-0"
                size={14}
                strokeWidth={2.4}
                color={dimension.color}
              />
              <span className="min-w-0 flex-1 truncate text-[9px] font-black text-[var(--chocolate)]">
                {dimension.name[locale]}
              </span>
              <span
                className="grid h-4 w-4 shrink-0 place-items-center rounded-full text-white"
                style={{ backgroundColor: learned ? dimension.color : "#B6A59A" }}
              >
                {learned ? <Check size={10} strokeWidth={3} /> : <Minus size={10} />}
              </span>
            </motion.div>
          );
        })}
      </div>
      <p className="mt-2 text-center text-[10px] font-black text-[var(--muted)]">
        {locale === "en"
          ? `${signalCount} signal · ${pairedCount} paired`
          : `${signalCount} สัญญาณ · ${pairedCount} คุณลักษณะร่วม`}
      </p>
    </div>
  );
}

export function TastePrint({
  compact = false,
  animate = true,
  evidence = 1,
  label,
  signal = true,
  locale = "en",
}: Props) {
  const reduceMotion = Boolean(useReducedMotion());
  const resolvedLabel =
    label ?? (locale === "en" ? "Early preference" : "ความชอบเบื้องต้น");
  const signalCount = signal ? 1 : 0;
  const pairedCount = signal ? 1 : 0;
  const learningCount = signal ? 2 : 4;
  const trialCount = Math.max(1, evidence);

  if (compact) {
    return (
      <CompactTastePrint
        locale={locale}
        signal={signal}
        animate={animate}
        reduceMotion={reduceMotion}
      />
    );
  }

  const summary =
    locale === "en"
      ? `From ${trialCount} recorded ${trialCount === 1 ? "trial" : "trials"}, TastePrint has ${signalCount} early signal, ${pairedCount} trait tested together, and ${learningCount} traits to learn. Aroma has an early signal, texture was present in the same sample, and moisture and familiarity remain unknown.`
      : `จากการทดลองที่บันทึกไว้ ${trialCount} ครั้ง TastePrint มี ${signalCount} สัญญาณเริ่มต้น ${pairedCount} ด้านที่ทดลองร่วมกัน และรอเรียนรู้ ${learningCount} ด้าน ด้านกลิ่นมีสัญญาณเบื้องต้น เนื้อสัมผัสอยู่ในตัวอย่างเดียวกัน ส่วนความชื้นและความคุ้นเคยยังไม่มีข้อมูล`;

  return (
    <section
      aria-label={locale === "en" ? "Mochi's TastePrint" : "TastePrint ของโมจิ"}
      className="relative mx-auto w-full max-w-[390px]"
    >
      <p className="sr-only">{summary}</p>

      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <span className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-[var(--line)] bg-white px-3 py-1 text-[11px] font-black text-[var(--coral-dark)] shadow-sm">
          <PawPrint size={13} fill="currentColor" aria-hidden="true" />
          {resolvedLabel}
        </span>
        <span className="text-[11px] font-bold text-[var(--muted)]">
          {locale === "en"
            ? `${trialCount} recorded ${trialCount === 1 ? "trial" : "trials"}`
            : `บันทึก ${trialCount} การทดลอง`}
        </span>
      </div>

      <div className="relative mt-3 space-y-2">
        {dimensions.map((dimension, index) => {
          const Icon = dimension.icon;
          const learned = signal && dimension.state !== "learning";
          const status = !signal ? "learning" : dimension.state;
          const value = learned
            ? dimension.value[locale]
            : locale === "en"
              ? "Not observed yet"
              : "ยังไม่มีข้อมูล";
          const detail = learned
            ? dimension.detail[locale]
            : dimension.pendingDetail[locale];

          return (
            <motion.article
              key={dimension.key}
              className="relative flex min-h-[78px] items-center gap-3 overflow-hidden rounded-[24px] border border-white px-3 py-3 shadow-[0_8px_20px_rgba(85,43,32,.075),inset_0_1px_0_rgba(255,255,255,.9)]"
              style={{
                background: learned
                  ? `linear-gradient(105deg, #fff 0%, ${dimension.tint} 100%)`
                  : "repeating-linear-gradient(135deg,#fff 0,#fff 7px,#f4ece6 7px,#f4ece6 9px)",
              }}
              initial={
                animate && !reduceMotion
                  ? { opacity: 0, x: index % 2 === 0 ? -12 : 12 }
                  : false
              }
              animate={{ opacity: learned || signal ? 1 : 0.82, x: 0 }}
              transition={{
                delay: reduceMotion ? 0 : index * 0.07,
                duration: reduceMotion ? 0 : 0.38,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-[17px]"
                style={{
                  color: dimension.color,
                  backgroundColor: learned ? dimension.tint : "#F2EAE4",
                }}
              >
                <Icon size={22} strokeWidth={2.3} aria-hidden="true" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <h3 className="whitespace-nowrap text-[11px] font-black text-[var(--muted)]">
                    {dimension.name[locale]}
                  </h3>
                  <p className="text-[11px] font-semibold leading-4 text-[var(--muted)]">
                    {detail}
                  </p>
                </div>
                <p className="mt-0.5 text-[15px] font-black leading-[1.35] text-[var(--chocolate)]">
                  {value}
                </p>
              </div>

              <span
                className="inline-flex shrink-0 items-center gap-1 self-start rounded-full bg-white/90 px-2 py-1 text-[10px] font-black shadow-sm"
                style={{ color: learned ? dimension.color : "#806F65" }}
              >
                {learned ? (
                  <Check size={10} strokeWidth={3} aria-hidden="true" />
                ) : (
                  <Minus size={10} aria-hidden="true" />
                )}
                <span className="whitespace-nowrap">
                  {status === "signal"
                    ? locale === "en"
                      ? "EARLY SIGNAL"
                      : "สัญญาณเริ่มต้น"
                    : status === "paired"
                      ? locale === "en"
                        ? "TESTED TOGETHER"
                        : "ทดลองร่วมกัน"
                      : locale === "en"
                        ? "TO LEARN"
                        : "รอเรียนรู้"}
                </span>
              </span>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-3 px-1">
        <span className="shrink-0 text-[10px] font-black text-[var(--chocolate)]">
          {locale === "en" ? `${signalCount} signal` : `${signalCount} สัญญาณ`}
        </span>
        <div
          className="grid flex-1 grid-cols-4 gap-1.5"
          role="img"
          aria-label={
            locale === "en"
              ? `${signalCount} early signal, ${pairedCount} trait tested together, and ${learningCount} traits to learn`
              : `${signalCount} สัญญาณเริ่มต้น ${pairedCount} ด้านที่ทดลองร่วมกัน และรอเรียนรู้ ${learningCount} ด้าน`
          }
        >
          {dimensions.map((dimension) => {
            const learned = signal && dimension.state !== "learning";
            return (
              <span
                key={dimension.key}
                aria-hidden="true"
                className="h-2 rounded-full"
                style={{ backgroundColor: learned ? dimension.color : "#E5D9D1" }}
              />
            );
          })}
        </div>
        <span className="shrink-0 text-[10px] font-bold text-[var(--muted)]">
          {locale === "en" ? `${learningCount} to learn` : `รอเรียนรู้ ${learningCount} ด้าน`}
        </span>
      </div>
    </section>
  );
}
