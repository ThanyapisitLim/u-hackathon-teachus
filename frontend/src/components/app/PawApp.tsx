"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import {
  GraduationCap,
  HeartPulse,
  House,
  MapPinned,
  PawPrint,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import { useEffect } from "react";
import { usePawState } from "./store";
import { AffiliateTab } from "./tabs/AffiliateTab";
import { HealthTab } from "./tabs/HealthTab";
import { HomeTab } from "./tabs/HomeTab";
import { LearnTab } from "./tabs/LearnTab";
import { SafeTab } from "./tabs/SafeTab";
import type { Bi, TabKey } from "./types";
import { Header } from "./ui";

const TABS: { key: TabKey; icon: LucideIcon; label: Bi }[] = [
  { key: "home", icon: House, label: { en: "Home", th: "หน้าหลัก" } },
  { key: "health", icon: HeartPulse, label: { en: "Health", th: "สุขภาพ" } },
  { key: "learn", icon: GraduationCap, label: { en: "Learn", th: "เรียนรู้" } },
  { key: "safe", icon: MapPinned, label: { en: "Safe", th: "ปลอดภัย" } },
  { key: "affiliate", icon: ShoppingBag, label: { en: "Picks", th: "แนะนำ" } },
];

export function PawApp() {
  const { state, patch } = usePawState();
  const l = state?.locale ?? "th";
  useEffect(() => {
    document.documentElement.lang = l;
  }, [l]);

  if (!state)
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="animate-bob text-center">
          <PawPrint className="mx-auto text-[var(--coral-dark)]" size={42} />
          <p className="mt-3 text-sm font-black">PawProud</p>
        </div>
      </div>
    );

  const goTab = (tab: TabKey) => {
    patch({ tab });
    window.scrollTo({ top: 0 });
  };
  const props = { l, state, patch, goTab };
  const view = {
    home: <HomeTab {...props} />,
    health: <HealthTab {...props} />,
    learn: <LearnTab {...props} />,
    safe: <SafeTab {...props} />,
    affiliate: <AffiliateTab {...props} />,
  }[state.tab];

  return (
    <MotionConfig reducedMotion="user">
    <div className={l === "th" ? "thai" : ""}>
      <Header l={l} setLocale={(locale) => patch({ locale })} />
      <main className="mx-auto min-h-[calc(100vh-57px)] max-w-[500px] px-4 pb-28 pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {view}
          </motion.div>
        </AnimatePresence>
      </main>
      <nav
        aria-label={l === "en" ? "Main" : "เมนูหลัก"}
        className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[500px] border-t border-[var(--ink)] bg-[var(--canvas)] pb-[max(6px,env(safe-area-inset-bottom))]"
      >
        <div className="grid grid-cols-5">
          {TABS.map(({ key, icon: Icon, label }) => {
            const active = state.tab === key;
            return (
              <button
                key={key}
                onClick={() => goTab(key)}
                aria-current={active ? "page" : undefined}
                className={`relative flex min-h-[58px] flex-col items-center justify-center gap-1 pt-1 text-[11px] ${active ? "font-bold text-[var(--ink)]" : "font-medium text-[var(--muted)]"}`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-bar"
                    className="absolute inset-x-3 -top-px h-[3px] bg-[var(--coral-dark)]"
                    transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  />
                )}
                <Icon size={21} strokeWidth={active ? 2.2 : 1.7} />
                <span>{label[l]}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
    </MotionConfig>
  );
}
