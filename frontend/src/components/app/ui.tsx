"use client";

import Image from "next/image";
import { ArrowLeft, Languages, PawPrint, Star } from "lucide-react";
import { motion } from "motion/react";
import { useId, useState } from "react";
import type { ImageRef } from "./images";
import type { Locale } from "./types";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Spread onto a motion element for a quiet fade-in, lightly staggered. */
export const rise = (i = 0) => ({
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.28, delay: Math.min(i, 5) * 0.03, ease: EASE },
});

export function AppButton({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  small = false,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  disabled?: boolean;
  small?: boolean;
  type?: "button" | "submit";
}) {
  const styles = {
    primary: "bg-[var(--coral-dark)] text-white hover:bg-[#a82538]",
    secondary:
      "border border-[var(--ink)] bg-transparent text-[var(--ink)] hover:bg-[var(--soft)]",
    ghost:
      "border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--soft)]",
    danger: "border border-[var(--danger)] bg-transparent text-[var(--danger)]",
  };
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`pressable flex w-full items-center justify-center gap-2 rounded-lg font-semibold disabled:cursor-not-allowed disabled:opacity-40 ${small ? "min-h-11 px-4 py-2 text-[14px]" : "min-h-12 px-5 py-3 text-[15px]"} ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

/** A small label. With `stamp`, it reads like an ink stamp in a booklet. */
export function Badge({
  children,
  tone = "neutral",
  stamp = false,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning" | "blue" | "coral" | "danger";
  stamp?: boolean;
}) {
  const colors = {
    neutral: "border-[var(--line)] text-[var(--muted)]",
    success: "border-[var(--success)] text-[var(--success)]",
    warning: "border-[var(--warning)] text-[var(--warning)]",
    blue: "border-[var(--trust)] text-[var(--trust)]",
    coral: "border-[var(--coral-dark)] text-[var(--coral-dark)]",
    danger: "border-[var(--danger)] text-[var(--danger)]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-[3px] border px-1.5 py-0.5 text-[11px] font-semibold leading-tight ${stamp ? "-rotate-2 border-2 px-2 py-1" : ""} ${colors[tone]}`}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className = "",
  reveal,
}: {
  children: React.ReactNode;
  className?: string;
  /** Pass an index to fade the card in, staggered by position. */
  reveal?: number;
}) {
  const cls = `rounded-xl border border-[var(--line)] bg-[var(--paper)] p-4 ${className}`;
  if (reveal === undefined) return <section className={cls}>{children}</section>;
  return (
    <motion.section className={cls} {...rise(reveal)}>
      {children}
    </motion.section>
  );
}

export function PageTitle({
  children,
  sub,
}: {
  children: React.ReactNode;
  sub?: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <h1 className="balanced text-[28px] leading-[1.2] font-bold tracking-tight">
        {children}
      </h1>
      {sub && (
        <p className="mt-1.5 text-[14px] leading-6 text-[var(--muted)]">{sub}</p>
      )}
    </div>
  );
}

/** Section heading with a hard ink rule, like a booklet chapter. */
export function SectionTitle({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-3 mt-8 flex items-center justify-between border-b-2 border-[var(--ink)] pb-2">
      <h2 className="text-[15px] font-bold">{children}</h2>
      {action}
    </div>
  );
}

export function Segmented<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
}) {
  const uid = useId();
  return (
    <div role="tablist" className="mb-5 flex border-b border-[var(--line)]">
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.id)}
            className={`relative min-h-11 flex-1 px-2 text-[14px] ${active ? "font-bold text-[var(--ink)]" : "font-medium text-[var(--muted)]"}`}
          >
            {o.label}
            {active && (
              <motion.span
                layoutId={`seg-${uid}`}
                className="absolute inset-x-2 -bottom-px h-[3px] bg-[var(--coral-dark)]"
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-[13px] font-semibold text-[var(--ink)]">
      {label}
      <div className="mt-1.5 font-normal">{children}</div>
    </label>
  );
}

export const inputClass =
  "min-h-11 w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 text-[16px] text-[var(--ink)] placeholder:text-[#a89d90] focus:border-[var(--ink)] focus:outline-none focus-visible:outline-offset-0";

export function Stars({
  value,
  onChange,
  size = 16,
}: {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
}) {
  const [hover, setHover] = useState(0);
  const shown = hover || Math.round(value);
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value.toFixed(1)} / 5`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const icon = (
          <Star
            size={size}
            className={n <= shown ? "fill-[var(--honey)] text-[var(--honey)]" : "text-[var(--line)]"}
          />
        );
        return onChange ? (
          <motion.button
            key={n}
            type="button"
            whileTap={{ scale: 0.8 }}
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            aria-label={`${n}`}
            className="grid h-10 w-10 place-items-center"
          >
            {icon}
          </motion.button>
        ) : (
          <span key={n}>{icon}</span>
        );
      })}
    </span>
  );
}

export function Header({
  l,
  setLocale,
  title,
  onBack,
}: {
  l: Locale;
  setLocale: (l: Locale) => void;
  title?: string;
  onBack?: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--canvas)]">
      <div className="mx-auto flex h-[56px] max-w-[500px] items-center justify-between px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          {onBack ? (
            <button
              onClick={onBack}
              className="pressable grid h-11 w-11 place-items-center rounded-lg border border-[var(--line)] bg-[var(--paper)]"
              aria-label={l === "en" ? "Go back" : "ย้อนกลับ"}
            >
              <ArrowLeft size={19} />
            </button>
          ) : (
            <Image
              src="/brand/pawproud-wordmark.webp"
              alt="PawProud"
              width={132}
              height={44}
              className="h-auto w-[104px]"
              priority
            />
          )}
          {title && (
            <span className="truncate text-sm font-bold">{title}</span>
          )}
        </div>
        <button
          onClick={() => setLocale(l === "en" ? "th" : "en")}
          className="pressable flex h-10 items-center gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 text-xs font-semibold"
          aria-label={l === "en" ? "Switch language" : "สลับภาษา"}
        >
          <Languages size={15} /> {l === "en" ? "ไทย" : "EN"}
        </button>
      </div>
    </header>
  );
}

export function SampleNote({ l }: { l: Locale }) {
  return (
    <p className="border-l-2 border-[var(--trust)] pl-3 text-xs leading-5 text-[var(--muted)]">
      {l === "en"
        ? "Sample data for the prototype. Places, prices and reviews are not real."
        : "ข้อมูลตัวอย่างสำหรับต้นแบบ สถานที่ ราคา และรีวิวไม่ใช่ข้อมูลจริง"}
    </p>
  );
}

export function Photo({
  image,
  alt,
  className = "",
  sizes = 400,
}: {
  image: ImageRef;
  alt: string;
  className?: string;
  sizes?: number;
}) {
  return (
    <Image
      src={image.src}
      alt={alt}
      width={sizes}
      height={sizes}
      className={`object-cover ${className}`}
    />
  );
}

export function PhotoCredit({ image }: { image: ImageRef }) {
  return (
    <a
      href={image.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-1.5 block truncate text-[11px] text-[var(--muted)] underline-offset-2 hover:underline"
    >
      Photo: {image.author} · {image.license}
    </a>
  );
}

/** Fades its children in; `i` staggers siblings. */
export function Reveal({
  children,
  i = 0,
  className,
}: {
  children: React.ReactNode;
  i?: number;
  className?: string;
}) {
  return (
    <motion.div className={className} {...rise(i)}>
      {children}
    </motion.div>
  );
}

/** Detail screens slide in a short way from the right. */
export function SlideIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const BURST = [
  { x: -90, y: -70, r: -25, d: 0 },
  { x: -50, y: -110, r: 15, d: 0.05 },
  { x: -10, y: -90, r: -10, d: 0.1 },
  { x: 30, y: -120, r: 25, d: 0.02 },
  { x: 70, y: -80, r: -15, d: 0.08 },
  { x: 100, y: -105, r: 20, d: 0.12 },
];

/** One-off paw-print celebration; remount with a new key to replay. */
export function Burst() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-10 z-10 flex justify-center" aria-hidden>
      {BURST.map((b, n) => (
        <motion.span
          key={n}
          className="absolute text-[var(--coral)]"
          initial={{ opacity: 1, x: 0, y: 0, scale: 0.4, rotate: 0 }}
          animate={{ opacity: 0, x: b.x, y: b.y, scale: 1.2, rotate: b.r }}
          transition={{ duration: 1.1, delay: b.d, ease: "easeOut" }}
        >
          <PawPrint size={22} fill="currentColor" />
        </motion.span>
      ))}
    </div>
  );
}
