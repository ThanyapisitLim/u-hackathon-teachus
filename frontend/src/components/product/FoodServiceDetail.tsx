"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BrainCircuit,
  Camera,
  Check,
  Drumstick,
  Eye,
  Fish,
  RotateCcw,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

export function FoodServiceDetail({
  locale,
  status,
  progress,
  onStart,
  onContinue,
  onOpenResult,
  onOpenAi,
}: {
  locale: "en" | "th";
  status: "new" | "in-progress" | "ready";
  progress: number;
  onStart: () => void;
  onContinue: () => void;
  onOpenResult: () => void;
  onOpenAi: () => void;
}) {
  const th = locale === "th";
  const reduceMotion = Boolean(useReducedMotion());
  const primaryAction =
    status === "new" ? onStart : status === "in-progress" ? onContinue : onOpenResult;
  const primaryLabel =
    status === "new"
      ? th
        ? "เริ่มทดลอง"
        : "Start trial"
      : status === "in-progress"
        ? th
          ? "ทำต่อ"
          : "Continue trial"
        : th
          ? "ดู TastePrint"
          : "View TastePrint";
  const statusCopy = {
    new: {
      eyebrow: th ? "สถานะ" : "Status",
      title: th ? "พร้อมเริ่ม" : "Ready to start",
    },
    "in-progress": {
      eyebrow: th ? "สถานะ" : "Status",
      title: th ? "ทำการทดลองต่อ" : "Continue trial",
    },
    ready: {
      eyebrow: th ? "สถานะ" : "Status",
      title: th ? "TastePrint พร้อมแล้ว" : "TastePrint ready",
    },
  }[status];

  const stages = [
    {
      icon: UtensilsCrossed,
      en: "Compare 2 tastes",
      th: "เปรียบเทียบ 2 รส",
      detailEn: "Place small portions side by side.",
      detailTh: "วางปริมาณเล็ก ๆ ไว้ข้างกัน",
      tone: "bg-[#fff0d2] text-[var(--warning)]",
    },
    {
      icon: Camera,
      en: "Preview the setup",
      th: "ดูตัวอย่างก่อนเริ่ม",
      detailEn: "Optional simulated camera step. No photo is saved.",
      detailTh: "ขั้นตอนกล้องจำลองแบบไม่บังคับ และไม่บันทึกภาพ",
      tone: "bg-[#ffe8ed] text-[var(--coral-dark)]",
    },
    {
      icon: Eye,
      en: "Record 3 reactions",
      th: "บันทึก 3 ปฏิกิริยา",
      detailEn: "Approach, amount eaten, body language.",
      detailTh: "การเข้าหา ปริมาณที่กิน และภาษากาย",
      tone: "bg-[#e8f6ff] text-[var(--trust)]",
    },
    {
      icon: BrainCircuit,
      en: "Review PawSense",
      th: "ดูผลจาก PawSense",
      detailEn: "Review the AI feedback.",
      detailTh: "ดูผลวิเคราะห์จาก AI",
      tone: "bg-[#eee9ff] text-[#6953a8]",
    },
    {
      icon: Sparkles,
      en: "Save TastePrint",
      th: "บันทึก TastePrint",
      detailEn: "Add the result to Care Passport.",
      detailTh: "เพิ่มผลลงใน Care Passport",
      tone: "bg-[var(--mint)] text-[var(--success)]",
    },
  ];

  return (
    <div className="pb-5">
      <section className="relative -mx-4 -mt-1 min-h-[430px] overflow-hidden px-5 pt-6">
        <motion.div
          aria-hidden="true"
          className="absolute -right-[22%] top-6 h-[355px] w-[112%] bg-[linear-gradient(145deg,#fff0dd,#ffdce3)]"
          style={{ borderRadius: "57% 43% 52% 48% / 42% 55% 45% 58%" }}
          animate={reduceMotion ? undefined : { rotate: [1.3, -0.8, 1.3], scale: [1, 1.018, 1] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          aria-hidden="true"
          className="absolute -left-16 top-36 h-44 w-44 bg-[var(--honey)]/24"
          style={{ borderRadius: "63% 37% 45% 55% / 42% 60% 40% 58%" }}
        />
        <svg
          aria-hidden="true"
          className="absolute right-0 top-20 h-44 w-64 text-[var(--coral)]/32"
          viewBox="0 0 260 180"
          fill="none"
        >
          <motion.path
            d="M18 138 C64 38 166 174 244 52"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="4 10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>

        <div className="relative z-10 max-w-[320px]">
          <p className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.16em] text-[var(--coral-dark)]">
            <UtensilsCrossed size={15} aria-hidden="true" /> Food Lab
          </p>
          <h1 className="display mt-4 text-[43px] font-bold leading-[.94]">
            {th ? "ทดลองรสอาหาร" : "Taste trial"}
          </h1>
          <p className="mt-4 max-w-[300px] text-sm leading-6 text-[var(--muted)]">
            {th
              ? "เปรียบเทียบ 2 รส บันทึก 3 ปฏิกิริยา"
              : "Compare 2 tastes. Record 3 reactions."}
          </p>
        </div>

        <motion.div
          aria-hidden="true"
          className="absolute bottom-6 right-2 z-10 h-[164px] w-[235px] overflow-hidden"
          animate={reduceMotion ? undefined : { y: [0, -7, 0], rotate: [-1, 1.2, -1] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative h-[235px] w-[235px]">
            <Image
              src="/brand/pawproud-mascot-logo.webp"
              alt=""
              fill
              sizes="235px"
              className="object-contain drop-shadow-[0_18px_25px_rgba(85,43,32,.2)]"
              priority
            />
          </div>
        </motion.div>
        <motion.span
          aria-hidden="true"
          className="absolute bottom-11 left-7 z-20 grid h-16 w-16 place-items-center rounded-full bg-white text-[var(--honey)] shadow-[0_13px_28px_rgba(85,43,32,.16)]"
          animate={reduceMotion ? undefined : { y: [0, -6, 0], rotate: [-5, 4, -5] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Drumstick size={30} strokeWidth={2.3} />
        </motion.span>
        <motion.span
          aria-hidden="true"
          className="absolute bottom-5 left-24 z-20 grid h-14 w-14 place-items-center bg-white text-[var(--trust)] shadow-[0_13px_28px_rgba(85,43,32,.14)]"
          style={{ borderRadius: "56% 44% 48% 52% / 40% 58% 42% 60%" }}
          animate={reduceMotion ? undefined : { y: [0, -5, 0], rotate: [4, -4, 4] }}
          transition={{ duration: 2.9, repeat: Infinity, delay: 0.45, ease: "easeInOut" }}
        >
          <Fish size={27} strokeWidth={2.3} />
        </motion.span>
      </section>

      <section className="relative mt-1 border-y border-[var(--line)] py-6">
        <div className="flex items-center gap-5">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[var(--coral-dark)]">
              {statusCopy.eyebrow}
            </p>
            <h2 className="display mt-1 text-[27px] font-bold leading-tight">
              {statusCopy.title}
            </h2>
          </div>
          <div className="relative grid h-[76px] w-[76px] shrink-0 place-items-center">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 76 76" aria-hidden="true">
              <circle cx="38" cy="38" r="33" fill="none" stroke="#efded2" strokeWidth="5" />
              <motion.circle
                cx="38"
                cy="38"
                r="33"
                fill="none"
                stroke="#f55a6a"
                strokeWidth="5"
                strokeLinecap="round"
                pathLength="100"
                initial={{ strokeDasharray: "0 100" }}
                animate={{ strokeDasharray: `${Math.max(0, Math.min(100, progress))} 100` }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              />
            </svg>
            <span className="display text-sm font-bold">{progress}%</span>
          </div>
        </div>
        <button
          type="button"
          onClick={primaryAction}
          className="pressable mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[var(--coral-dark)] px-5 text-sm font-extrabold text-white shadow-[0_13px_30px_rgba(216,58,79,.25)]"
        >
          {primaryLabel} <ArrowRight size={18} aria-hidden="true" />
        </button>
        {status !== "new" && (
          <button
            type="button"
            onClick={onStart}
            className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 text-xs font-extrabold text-[var(--muted)]"
          >
            <RotateCcw size={15} aria-hidden="true" /> {th ? "เริ่มการทดลองใหม่" : "Start new trial"}
          </button>
        )}
      </section>

      <section className="py-9">
        <p className="text-[11px] font-extrabold uppercase tracking-[.15em] text-[var(--muted)]">
          Food Lab
        </p>
        <h2 className="display mt-2 max-w-[330px] text-[31px] font-bold leading-[1.02]">
          {th ? "วิธีใช้งาน" : "How it works"}
        </h2>

        <ol className="relative mt-6 space-y-1">
          <svg
            aria-hidden="true"
            className="absolute left-[34px] top-9 h-[350px] w-16 overflow-visible"
            viewBox="0 0 64 350"
            fill="none"
          >
            <motion.path
              d="M7 0 C62 43 5 82 35 128 C66 175 8 211 34 270 C54 302 20 327 35 350"
              stroke="#dfbda7"
              strokeWidth="2"
              strokeDasharray="5 8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.25, ease: "easeOut" }}
            />
          </svg>
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <motion.li
                key={stage.en}
                className={`relative flex min-h-[80px] items-center gap-4 ${index % 2 === 1 ? "pl-7" : ""}`}
                initial={{ opacity: 0, x: index % 2 === 1 ? 14 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                <span
                  className={`relative z-10 grid h-[66px] w-[66px] shrink-0 place-items-center shadow-[0_9px_24px_rgba(85,43,32,.1)] ${stage.tone}`}
                  style={{ borderRadius: `${44 + index * 3}% ${56 - index * 3}% 54% 46% / 48% 43% 57% 52%` }}
                >
                  <Icon size={27} strokeWidth={2.2} aria-hidden="true" />
                </span>
                <span>
                  <strong className="display block text-[20px] leading-tight">
                    {th ? stage.th : stage.en}
                  </strong>
                  <span className="mt-1 block text-xs leading-5 text-[var(--muted)]">
                    {th ? stage.detailTh : stage.detailEn}
                  </span>
                </span>
              </motion.li>
            );
          })}
        </ol>
      </section>

      <motion.button
        type="button"
        onClick={onOpenAi}
        whileTap={{ scale: 0.985 }}
        className="relative -mx-4 flex min-h-[142px] w-[calc(100%+2rem)] items-center gap-4 overflow-hidden px-6 py-6 text-left"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,#dff2ff_0%,#f2eaff_78%,#fff8f0_100%)]"
          style={{ clipPath: "polygon(0 9%, 100% 0, 96% 90%, 4% 100%)" }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute -right-8 -top-8 h-28 w-28 rounded-full border-2 border-[var(--trust)]/13"
          animate={reduceMotion ? undefined : { scale: [0.75, 1.3], opacity: [0.7, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
        />
        <span className="relative grid h-[70px] w-[70px] shrink-0 place-items-center rounded-full bg-white text-[var(--trust)] shadow-[0_12px_30px_rgba(37,99,168,.16)]">
          <BrainCircuit size={31} strokeWidth={2.1} aria-hidden="true" />
          <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-[var(--success)] text-white">
            <Check size={13} strokeWidth={3} aria-hidden="true" />
          </span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[var(--trust)]">
            {th ? "ผลวิเคราะห์ด้วย AI" : "AI feedback"}
          </span>
          <strong className="display mt-1 block text-[24px] leading-tight">
            PawSense
          </strong>
          <span className="mt-1 block text-xs leading-5 text-[var(--muted)]">
            {th ? "อธิบายปฏิกิริยาที่บันทึกไว้ ไม่วินิจฉัยสุขภาพ" : "Explains recorded reactions. Does not diagnose."}
          </span>
        </span>
        <ArrowRight className="shrink-0 text-[var(--trust)]" size={19} aria-hidden="true" />
      </motion.button>
    </div>
  );
}
