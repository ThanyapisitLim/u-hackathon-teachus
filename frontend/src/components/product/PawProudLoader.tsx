"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { PawPrint, Sparkles } from "lucide-react";

type Locale = "en" | "th";

const copy = {
  en: {
    title: "Getting Mochi ready",
    detail: "Bringing today’s care into view",
    label: "PawProud is loading",
  },
  th: {
    title: "กำลังเตรียมโมจิให้พร้อม",
    detail: "กำลังเปิดภาพการดูแลของวันนี้",
    label: "PawProud กำลังโหลด",
  },
} satisfies Record<Locale, Record<string, string>>;

export function PawProudLoader({ locale }: { locale: Locale }) {
  const reduceMotion = useReducedMotion();
  const c = copy[locale];

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={c.label}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.015 }}
      transition={{ duration: reduceMotion ? 0 : 0.32 }}
      className={`fixed inset-0 z-[100] grid min-h-[100svh] place-items-center overflow-hidden bg-[var(--canvas)] px-6 ${locale === "th" ? "thai" : ""}`}
    >
      <div
        aria-hidden="true"
        className="absolute -left-24 -top-20 h-80 w-80 rounded-full bg-[var(--honey)]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-20 h-96 w-96 rounded-full bg-[var(--coral)]/16 blur-3xl"
      />

      <div className="relative flex w-full max-w-sm flex-col items-center text-center">
        <motion.div
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.86, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative h-[272px] w-[272px] [perspective:900px]"
        >
          <motion.div
            className="absolute inset-4 rounded-[54px] bg-white/70 shadow-[0_30px_70px_rgba(86,44,28,.15)] ring-1 ring-[var(--line)]/65 backdrop-blur-sm [transform-style:preserve-3d]"
            animate={
              reduceMotion
                ? undefined
                : {
                    rotateX: [1.5, -2.5, 1.5],
                    rotateY: [-3, 3, -3],
                    y: [0, -7, 0],
                  }
            }
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-3 overflow-hidden rounded-[44px] bg-[radial-gradient(circle_at_50%_24%,#fff_0%,#fff7ec_52%,#ffe3d5_100%)] [transform:translateZ(18px)]">
              <Image
                src="/brand/pawproud-app-icon.webp"
                alt=""
                fill
                priority
                sizes="240px"
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.span
            className="absolute left-1 top-16 grid h-12 w-12 place-items-center rounded-[18px] bg-white text-[var(--coral-dark)] shadow-[0_12px_28px_rgba(86,44,28,.15)]"
            animate={
              reduceMotion
                ? undefined
                : { y: [0, -10, 0], rotate: [-8, 4, -8] }
            }
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <PawPrint size={24} strokeWidth={2.4} />
          </motion.span>

          <motion.span
            className="absolute right-0 top-8 grid h-11 w-11 place-items-center rounded-[17px] bg-[var(--honey)] text-[var(--chocolate)] shadow-[0_12px_28px_rgba(86,44,28,.13)]"
            animate={
              reduceMotion
                ? undefined
                : { y: [0, 8, 0], rotate: [8, -5, 8], scale: [1, 1.06, 1] }
            }
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.25,
            }}
          >
            <Sparkles size={22} strokeWidth={2.4} />
          </motion.span>

          <motion.div
            className="absolute bottom-0 left-1/2 h-5 w-44 -translate-x-1/2 rounded-[50%] bg-[var(--chocolate)]/13 blur-md"
            animate={
              reduceMotion
                ? undefined
                : { scaleX: [1, 0.88, 1], opacity: [0.5, 0.3, 0.5] }
            }
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: reduceMotion ? 0 : 0.22,
            duration: reduceMotion ? 0 : 0.48,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-3"
        >
          <h1 className="display text-[30px] leading-tight font-bold text-[var(--ink)]">
            {c.title}
          </h1>
          <p className="mt-2 text-sm font-semibold text-[var(--muted)]">
            {c.detail}
          </p>
        </motion.div>

        <div aria-hidden="true" className="mt-6 flex items-center gap-2">
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="grid h-8 w-8 place-items-center rounded-full bg-white text-[var(--coral-dark)] shadow-sm ring-1 ring-[var(--line)]/70"
              animate={
                reduceMotion
                  ? { opacity: 0.72 }
                  : { y: [0, -6, 0], opacity: [0.45, 1, 0.45] }
              }
              transition={{
                duration: 1.2,
                repeat: reduceMotion ? 0 : Infinity,
                ease: "easeInOut",
                delay: index * 0.16,
              }}
            >
              <PawPrint size={15} strokeWidth={2.6} />
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
