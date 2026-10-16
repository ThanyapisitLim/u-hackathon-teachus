"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  Fish,
  HeartPulse,
  PawPrint,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

export type HubSnapshot = {
  foodStatus: "new" | "in-progress" | "ready";
  evidence: number;
  ordered: boolean;
  checkedIn: boolean;
};

export function ServiceHome({
  locale,
  snapshot,
  onOpenFood,
  onOpenAi,
  onOpenPassport,
  onOpenSupport,
  onOpenProfile,
}: {
  locale: "en" | "th";
  snapshot: HubSnapshot;
  onOpenFood: () => void;
  onOpenAi: () => void;
  onOpenPassport: () => void;
  onOpenSupport: () => void;
  onOpenProfile: () => void;
}) {
  const th = locale === "th";
  const reduceMotion = Boolean(useReducedMotion());
  const foodStatus = {
    new: th ? "พร้อมเริ่ม" : "Ready to start",
    "in-progress": th ? "กำลังทำอยู่" : "In progress",
    ready: th ? "TastePrint พร้อมแล้ว" : "TastePrint ready",
  }[snapshot.foodStatus];
  const foodAction = {
    new: th ? "เริ่มทดลอง" : "Start trial",
    "in-progress": th ? "ทำต่อ" : "Continue trial",
    ready: th ? "ดู TastePrint" : "View TastePrint",
  }[snapshot.foodStatus];
  const passportSignal = snapshot.checkedIn
    ? th
      ? "บันทึกความรู้สึกล่าสุดแล้ว"
      : "Latest check-in remembered"
    : snapshot.ordered
      ? th
        ? "บันทึกมื้อที่เลือกไว้แล้ว"
        : "Chosen bowl remembered"
      : snapshot.evidence > 0
        ? th
          ? `เก็บไว้แล้ว ${snapshot.evidence} เรื่อง`
          : `${snapshot.evidence} care ${snapshot.evidence === 1 ? "memory" : "memories"}`
        : th
          ? "พร้อมจำเรื่องแรกของโมจิ"
          : "Ready for Mochi’s first memory";

  return (
    <div className="pb-4">
      <header className="flex items-start justify-between gap-4 px-1">
        <div className="pt-1">
          <p className="flex items-center gap-2 text-xs font-extrabold text-[var(--coral-dark)]">
            <PawPrint size={15} aria-hidden="true" />
            PawProud
          </p>
          <h1 className="display mt-2 max-w-[290px] text-[38px] font-bold leading-[.98]">
            {th ? "การดูแลของโมจิ" : "Mochi’s care"}
          </h1>
        </div>
        <button
          type="button"
          onClick={onOpenProfile}
          className="pressable relative mt-1 grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full border-[3px] border-white bg-[var(--soft)] shadow-[0_8px_24px_rgba(85,43,32,.16)]"
          aria-label={th ? "เปิดโปรไฟล์โมจิ" : "Open Mochi’s profile"}
        >
          <Image
            src="/brand/pawproud-app-icon.webp"
            alt=""
            fill
            sizes="56px"
            className="object-cover"
          />
        </button>
      </header>

      <section className="relative -mx-4 mt-5 min-h-[435px] overflow-hidden px-5 pt-8">
        <motion.div
          aria-hidden="true"
          className="absolute -left-[18%] top-4 h-[345px] w-[116%] bg-[linear-gradient(145deg,#653426,#452117)] shadow-[0_26px_55px_rgba(85,43,32,.2)]"
          style={{ borderRadius: "43% 57% 46% 54% / 38% 38% 62% 62%" }}
          animate={reduceMotion ? undefined : { rotate: [-1.4, 0.6, -1.4], scale: [1, 1.015, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          aria-hidden="true"
          className="absolute -right-20 top-0 h-48 w-48 bg-[var(--coral)]/75"
          style={{ borderRadius: "58% 42% 63% 37% / 45% 64% 36% 55%" }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute -bottom-1 -right-5 h-[224px] w-[245px] overflow-hidden"
          animate={reduceMotion ? undefined : { y: [0, -8, 0], rotate: [-1.5, 1.2, -1.5] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative h-[245px] w-[245px]">
            <Image
              src="/brand/pawproud-mascot-logo.webp"
              alt=""
              fill
              sizes="245px"
              className="object-contain drop-shadow-[0_18px_28px_rgba(24,9,6,.34)]"
              priority
            />
          </div>
        </motion.div>

        <div className="relative z-10 max-w-[245px] text-white">
          <p className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.16em] text-white/70">
            <UtensilsCrossed size={15} aria-hidden="true" /> Food Lab
          </p>
          <h2 className="display mt-4 text-[35px] font-bold leading-[.96]">
            {th ? "ทดลองรสอาหาร" : "Taste trial"}
          </h2>
          <p className="mt-4 max-w-[215px] text-sm leading-6 text-white/72">
            {th
              ? "เปรียบเทียบ 2 รส บันทึก 3 ปฏิกิริยา"
              : "Compare 2 tastes. Record 3 reactions."}
          </p>
        </div>

        <div className="absolute bottom-[94px] left-7 z-20 flex items-center gap-2 text-[11px] font-bold text-white/72">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--honey)] opacity-70 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--honey)]" />
          </span>
          {foodStatus}
        </div>

        <motion.div
          aria-hidden="true"
          className="absolute bottom-14 right-16 z-20 grid h-14 w-14 place-items-center rounded-full bg-[#fff8ec] text-[var(--honey)] shadow-[0_12px_25px_rgba(30,12,8,.28)]"
          animate={reduceMotion ? undefined : { y: [0, -5, 0], rotate: [-4, 4, -4] }}
          transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut" }}
        >
          <Fish size={27} strokeWidth={2.4} />
        </motion.div>

        <button
          type="button"
          onClick={onOpenFood}
          className="pressable absolute bottom-7 left-5 z-30 inline-flex min-h-14 items-center gap-3 rounded-full bg-white px-5 text-sm font-extrabold text-[var(--chocolate)] shadow-[0_14px_32px_rgba(32,12,7,.25)]"
        >
          {foodAction} <ArrowRight size={18} aria-hidden="true" />
        </button>
      </section>

      <section className="mt-1">
        <div className="flex items-end justify-between gap-4 px-1">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[.15em] text-[var(--muted)]">
              PawProud
            </p>
            <h2 className="display mt-1 text-[28px] font-bold leading-tight">
              {th ? "บริการ" : "Services"}
            </h2>
          </div>
          <Sparkles className="mb-1 text-[var(--coral)]" size={24} aria-hidden="true" />
        </div>

        <div className="relative mt-4">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-7 top-8 h-[250px] w-20 overflow-visible"
            viewBox="0 0 80 250"
            fill="none"
          >
            <motion.path
              d="M38 0 C76 42 5 72 39 118 C72 163 11 196 43 250"
              stroke="#e2bda7"
              strokeWidth="2"
              strokeDasharray="5 8"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
          </svg>

          <motion.button
            type="button"
            onClick={onOpenAi}
            whileTap={{ scale: 0.985 }}
            className="relative flex min-h-[112px] w-full items-center gap-4 overflow-hidden py-4 pl-2 pr-1 text-left"
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-1 left-0 right-0 -z-10 bg-[linear-gradient(90deg,#e7f6ff_0%,rgba(231,246,255,.8)_62%,transparent_100%)]"
              style={{ clipPath: "polygon(0 8%, 96% 0, 100% 86%, 5% 100%)" }}
            />
            <motion.span
              className="relative grid h-[72px] w-[72px] shrink-0 place-items-center rounded-full bg-white text-[var(--trust)] shadow-[0_12px_30px_rgba(37,99,168,.16)]"
              animate={reduceMotion ? undefined : { boxShadow: ["0 10px 26px rgba(37,99,168,.12)", "0 14px 34px rgba(37,99,168,.23)", "0 10px 26px rgba(37,99,168,.12)"] }}
              transition={{ duration: 3.2, repeat: Infinity }}
            >
              <BrainCircuit size={31} strokeWidth={2.1} aria-hidden="true" />
            </motion.span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.13em] text-[var(--trust)]">
                <Sparkles size={13} aria-hidden="true" /> {th ? "วิเคราะห์ด้วย AI" : "AI feedback"}
              </span>
              <strong className="display mt-1 block text-[22px] leading-tight">
                PawSense
              </strong>
            </span>
            <ArrowRight className="mr-1 shrink-0 text-[var(--trust)]" size={19} aria-hidden="true" />
          </motion.button>

          <motion.button
            type="button"
            onClick={onOpenPassport}
            whileTap={{ scale: 0.985 }}
            className="relative flex min-h-[112px] w-full items-center gap-4 py-4 pl-2 pr-1 text-left"
          >
            <span
              className="grid h-[72px] w-[72px] shrink-0 place-items-center bg-[var(--mint)] text-[var(--success)] shadow-[0_12px_28px_rgba(45,122,99,.12)]"
              style={{ borderRadius: "43% 57% 55% 45% / 56% 42% 58% 44%" }}
            >
              <ShieldCheck size={31} strokeWidth={2.1} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="text-[10px] font-extrabold uppercase tracking-[.13em] text-[var(--success)]">
                {passportSignal}
              </span>
              <strong className="display mt-1 block text-[22px] leading-tight">
                Care Passport
              </strong>
            </span>
            <ArrowRight className="mr-1 shrink-0 text-[var(--success)]" size={19} aria-hidden="true" />
          </motion.button>

          <motion.button
            type="button"
            onClick={onOpenSupport}
            whileTap={{ scale: 0.985 }}
            className="relative flex min-h-[112px] w-full items-center gap-4 py-4 pl-2 pr-1 text-left"
          >
            <span
              className="grid h-[72px] w-[72px] shrink-0 place-items-center bg-[#ffe4e7] text-[var(--danger)]"
              style={{ borderRadius: "58% 42% 40% 60% / 42% 55% 45% 58%" }}
            >
              <HeartPulse size={31} strokeWidth={2.1} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[.13em] text-[var(--danger)]">
                <Check size={12} aria-hidden="true" /> {th ? "ข้อมูลเตรียมพร้อม" : "Prepared information"}
              </span>
              <strong className="display mt-1 block text-[22px] leading-tight">
                {th ? "ความช่วยเหลือ" : "Support"}
              </strong>
            </span>
            <ArrowRight className="mr-1 shrink-0 text-[var(--danger)]" size={19} aria-hidden="true" />
          </motion.button>
        </div>
      </section>

      <div className="mt-5 flex items-start gap-3 border-t border-dashed border-[var(--line)] px-1 pt-5">
        <PawPrint className="mt-0.5 shrink-0 text-[var(--coral-dark)]" size={19} aria-hidden="true" />
        <p className="text-xs leading-5 text-[var(--muted)]">
          {th
            ? "PawProud ช่วยให้คุณสังเกตและจดจำ แต่ไม่วินิจฉัยโรคหรือแทนที่สัตวแพทย์"
            : "PawProud helps you notice and remember. It does not diagnose or replace veterinary care."}
        </p>
      </div>
    </div>
  );
}
