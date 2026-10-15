"use client";

import { motion } from "motion/react";

type Props = {
  compact?: boolean;
  animate?: boolean;
  evidence?: number;
  label?: string;
  signal?: boolean;
  locale?: "en" | "th";
};

const petals = [
  {
    name: "Aroma",
    path: "M110 110 C62 99 48 48 110 24 C172 48 158 99 110 110Z",
    fill: "#F55A6A",
  },
  {
    name: "Texture",
    path: "M110 110 C121 62 172 48 196 110 C172 172 121 158 110 110Z",
    fill: "#F7B84B",
  },
  {
    name: "Moisture",
    path: "M110 110 C158 121 172 172 110 196 C48 172 62 121 110 110Z",
    fill: "#6FB7E9",
  },
  {
    name: "Familiarity",
    path: "M110 110 C99 158 48 172 24 110 C48 48 99 62 110 110Z",
    fill: "#72C3A3",
  },
];

export function TastePrint({
  compact = false,
  animate = true,
  evidence = 1,
  label,
  signal = true,
  locale = "en",
}: Props) {
  const resolvedLabel =
    label ?? (locale === "en" ? "Early signal" : "สัญญาณเบื้องต้น");
  return (
    <div
      className={`relative mx-auto ${compact ? "w-[190px]" : "w-full max-w-[310px]"}`}
    >
      <svg
        viewBox="0 0 220 220"
        role="img"
        aria-labelledby="tasteprint-title tasteprint-desc"
        className="w-full overflow-visible"
      >
        <title id="tasteprint-title">
          {locale === "en" ? "Mochi's TastePrint" : "TastePrint ของโมจิ"}
        </title>
        <desc id="tasteprint-desc">
          {locale === "en"
            ? "An early preference signal for aroma and texture. Moisture and familiarity still need more observations."
            : "สัญญาณความชอบเบื้องต้นด้านกลิ่นและเนื้อสัมผัส ส่วนความชื้นและความคุ้นเคยยังต้องสังเกตเพิ่ม"}
        </desc>
        <defs>
          <pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#765d55" opacity=".38" />
          </pattern>
          <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow
              dx="0"
              dy="6"
              stdDeviation="7"
              floodColor="#552b20"
              floodOpacity=".14"
            />
          </filter>
        </defs>
        <circle
          cx="110"
          cy="110"
          r="89"
          fill="#fff"
          stroke="#E7D4C6"
          strokeWidth="2"
        />
        {petals.map((petal, index) => (
          <motion.path
            key={petal.name}
            d={petal.path}
            fill={signal && index < 2 ? petal.fill : "url(#dots)"}
            stroke="#fff"
            strokeWidth="5"
            filter="url(#softShadow)"
            initial={
              animate ? { scale: 0.3, opacity: 0, pathLength: 0 } : false
            }
            animate={{
              scale: 1,
              opacity: signal && index < 2 ? 1 : 0.66,
              pathLength: 1,
            }}
            transition={{
              delay: index * 0.11,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformOrigin: "110px 110px" }}
          />
        ))}
        <motion.circle
          cx="110"
          cy="110"
          r="29"
          fill="#552B20"
          stroke="#FFF8F0"
          strokeWidth="6"
          initial={animate ? { scale: 0 } : false}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.34,
            type: "spring",
            stiffness: 260,
            damping: 18,
          }}
        />
        <g fill="#fff" transform="translate(110 110)">
          <ellipse cx="0" cy="7" rx="11" ry="9" />
          <circle cx="-11" cy="-5" r="4.5" />
          <circle cx="-4" cy="-11" r="4.5" />
          <circle cx="4" cy="-11" r="4.5" />
          <circle cx="11" cy="-5" r="4.5" />
        </g>
        {Array.from({ length: Math.min(evidence, 4) }).map((_, i) => (
          <motion.circle
            key={i}
            cx={95 + i * 10}
            cy="211"
            r="3.5"
            fill="#D83A4F"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 + i * 0.12 }}
          />
        ))}
      </svg>
      <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full border border-[var(--line)] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[.13em] text-[var(--coral-dark)] shadow-sm whitespace-nowrap">
        {resolvedLabel}
      </div>
      {!compact && (
        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-semibold text-[var(--muted)]">
          {petals.map((p, i) => (
            <div key={p.name} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  background:
                    signal && i < 2
                      ? p.fill
                      : "repeating-linear-gradient(45deg,#d8c7b9,#d8c7b9 2px,#fff 2px,#fff 4px)",
                }}
              />
              {locale === "th"
                ? ["กลิ่น", "เนื้อสัมผัส", "ความชื้น", "ความคุ้นเคย"][i]
                : p.name}
              {(!signal || i > 1) && (
                <span className="font-normal">
                  · {locale === "th" ? "กำลังเรียนรู้" : "learning"}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
