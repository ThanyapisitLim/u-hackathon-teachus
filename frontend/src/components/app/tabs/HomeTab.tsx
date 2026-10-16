"use client";

import { Check, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { MISSIONS, MOODS } from "../data";
import { addDays, dueStatus, formatDate, missionStreak, todayISO } from "../logic";
import type { Mood, TabProps } from "../types";
import { tr } from "../types";
import { AppButton, Badge, Burst, Field, inputClass, Reveal, SectionTitle } from "../ui";

type Notice = {
  id: string;
  tag: string;
  tone: "danger" | "warning" | "coral";
  title: string;
  body: string;
  cta?: { label: string; run: () => void };
};

function MoodIcon({ id, size }: { id: Mood; size: number }) {
  const Icon = MOODS.find((m) => m.id === id)!.icon;
  return <Icon size={size} />;
}

export function HomeTab({ l, state, patch, goTab }: TabProps) {
  const today = todayISO();
  const t = (en: string, th: string) => (l === "en" ? en : th);
  const dog = state.dog.name;
  const doneToday = state.missionsDone[today] ?? [];
  const todayMood = state.moods.find((m) => m.date === today);
  const [note, setNote] = useState("");
  const [burst, setBurst] = useState(0);

  /* ----- urgent notifications, derived from real data ----- */
  const notices: Notice[] = [];
  for (const r of state.records) {
    const { status, days } = dueStatus(r.nextDue, today);
    if (status === "overdue") {
      notices.push({
        id: `rec-${r.id}-overdue`,
        tag: t("Overdue", "เลยกำหนด"),
        tone: "danger",
        title: t(`${r.name} is overdue`, `${r.name} เลยกำหนดแล้ว`),
        body: t(
          `Due ${-days} day(s) ago. Please book a vet visit.`,
          `เลยกำหนดมา ${-days} วัน ควรนัดพบสัตวแพทย์`,
        ),
        cta: { label: t("Open medicine book", "เปิดสมุดจดยา"), run: () => goTab("health") },
      });
    } else if (status === "soon") {
      notices.push({
        id: `rec-${r.id}-soon`,
        tag: t("Due soon", "ใกล้ครบกำหนด"),
        tone: "warning",
        title: t(`${r.name} due in ${days} day(s)`, `${r.name} ครบกำหนดอีก ${days} วัน`),
        body: t("Book an appointment ahead of time.", "ควรนัดหมายล่วงหน้า"),
        cta: { label: t("Open medicine book", "เปิดสมุดจดยา"), run: () => goTab("health") },
      });
    }
  }
  if (todayMood?.mood === "unwell") {
    notices.push({
      id: `mood-unwell-${today}`,
      tag: t("Watch closely", "สังเกตอาการ"),
      tone: "danger",
      title: t(`${dog} seems unwell today`, `วันนี้${dog}ดูไม่สบาย`),
      body: t(
        "If your dog stops eating, vomits, is very tired or in pain, contact a vet.",
        "ถ้าน้องไม่กินอาหาร อาเจียน ซึมมาก หรือเจ็บปวด ให้ติดต่อสัตวแพทย์",
      ),
      cta: { label: t("Ask the coach", "ถาม AI Coach"), run: () => goTab("learn") },
    });
  }
  const visible = notices.filter((n) => !state.dismissed.includes(n.id));

  const toggleMission = (id: string) => {
    const next = doneToday.includes(id)
      ? doneToday.filter((x) => x !== id)
      : [...doneToday, id];
    patch({ missionsDone: { ...state.missionsDone, [today]: next } });
    if (next.length === MISSIONS.length && !doneToday.includes(id)) setBurst((n) => n + 1);
  };
  const saveMood = (mood: Mood) => {
    const rest = state.moods.filter((m) => m.date !== today);
    patch({ moods: [{ date: today, mood, note: note.trim().slice(0, 140) }, ...rest].slice(0, 60) });
    setNote("");
  };

  const pct = Math.round((doneToday.length / MISSIONS.length) * 100);
  const streak = missionStreak(state, MISSIONS.length, today);
  const week = [6, 5, 4, 3, 2, 1, 0].map((i) => {
    const d = addDays(today, -i);
    return { d, mood: state.moods.find((m) => m.date === d)?.mood };
  });

  return (
    <>
      <Reveal className="mb-2">
        <p className="text-[13px] tabular-nums text-[var(--muted)]">{formatDate(today, l)}</p>
        <h1 className="mt-1 text-[34px] font-bold leading-[1.1] tracking-tight">{dog}</h1>
        <button
          onClick={() => goTab("health")}
          className="mt-1 min-h-11 text-[14px] text-[var(--muted)] underline decoration-[var(--line)] underline-offset-4"
        >
          {state.dog.breed || t("Dog", "สุนัข")} · {state.dog.ageYears} {t("yr", "ปี")} · {state.dog.weightKg} {t("kg", "กก.")}
          {" "}→
        </button>
      </Reveal>

      {/* Needs attention first */}
      {visible.length > 0 && <SectionTitle>{t("Needs attention", "ต้องทำก่อน")}</SectionTitle>}
      <div className="space-y-2.5" aria-live="polite">
        <AnimatePresence initial={false}>
          {visible.map((n) => (
            <motion.div
              key={n.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.22 }}
              className={`flex items-start gap-2 rounded-r-lg rounded-l-[3px] border border-l-[5px] bg-[var(--paper)] py-3 pl-3 pr-1 ${n.tone === "danger" ? "border-[var(--line)] border-l-[var(--danger)]" : "border-[var(--line)] border-l-[var(--warning)]"}`}
            >
              <div className="min-w-0 flex-1">
                <Badge tone={n.tone === "danger" ? "danger" : "warning"} stamp>
                  {n.tag}
                </Badge>
                <p className="mt-2.5 text-[16px] font-bold leading-snug">{n.title}</p>
                <p className="mt-1 text-[14px] leading-6 text-[var(--muted)]">{n.body}</p>
                {n.cta && (
                  <button
                    onClick={n.cta.run}
                    className="mt-1 min-h-11 text-[14px] font-semibold text-[var(--coral-dark)] underline underline-offset-4"
                  >
                    {n.cta.label}
                  </button>
                )}
              </div>
              <button
                onClick={() => patch({ dismissed: [...state.dismissed, n.id] })}
                aria-label={t("Dismiss", "ปิดการแจ้งเตือน")}
                className="grid h-11 w-11 shrink-0 place-items-center text-[var(--muted)]"
              >
                <X size={18} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Daily missions */}
      <Reveal i={1}>
        <SectionTitle
          action={
            <span className="text-[14px] font-semibold tabular-nums">
              {doneToday.length}/{MISSIONS.length}
            </span>
          }
        >
          {t("Today's missions", "ภารกิจวันนี้")}
        </SectionTitle>
        <div className="relative">
          {burst > 0 && <Burst key={burst} />}
          <div
            className="mb-1 h-[3px] bg-[var(--line)]"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <motion.div
              className="h-full bg-[var(--ink)]"
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
          <p className="py-2 text-[13px] text-[var(--muted)]">
            {pct === 100
              ? t(`All done. ${dog} is proud of you.`, `ครบแล้ว ${dog}ภูมิใจในตัวคุณ`)
              : t(`${streak} of the last 7 days at least half done`, `7 วันล่าสุด ทำได้อย่างน้อยครึ่งหนึ่ง ${streak} วัน`)}
          </p>
          <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {MISSIONS.map((m) => {
              const done = doneToday.includes(m.id);
              return (
                <li key={m.id}>
                  <button
                    onClick={() => toggleMission(m.id)}
                    aria-pressed={done}
                    className="flex min-h-[60px] w-full items-center gap-3.5 py-2.5 text-left"
                  >
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 transition-colors duration-150 ${done ? "border-[var(--ink)] bg-[var(--ink)] text-white" : "border-[var(--ink)]"}`}
                    >
                      <AnimatePresence initial={false}>
                        {done && (
                          <motion.span
                            key="check"
                            initial={{ scale: 0, rotate: -40 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0 }}
                            transition={{ type: "spring", stiffness: 520, damping: 18 }}
                            className="grid place-items-center"
                          >
                            <Check size={15} strokeWidth={3} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-[15px] font-medium ${done ? "text-[var(--muted)] line-through decoration-1" : ""}`}>
                        {tr(m.label, l)}
                      </span>
                      <span className="block text-[13px] text-[var(--muted)]">{tr(m.hint, l)}</span>
                    </span>
                    <m.icon size={20} className="shrink-0 text-[var(--muted)]" aria-hidden />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>

      {/* Mood check-in */}
      <Reveal i={2}>
        <SectionTitle>{t(`How is ${dog} feeling?`, `วันนี้${dog}เป็นอย่างไร`)}</SectionTitle>
        {todayMood ? (
          <div className="flex items-center gap-3 border-b border-[var(--line)] pb-4">
            <motion.span
              key={todayMood.mood}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 420, damping: 16 }}
              className="text-[var(--ink)]"
              aria-hidden
            >
              <MoodIcon id={todayMood.mood} size={36} />
            </motion.span>
            <div className="min-w-0 flex-1">
              <p className="text-[16px] font-bold">{tr(MOODS.find((m) => m.id === todayMood.mood)!.label, l)}</p>
              {todayMood.note && (
                <p className="truncate text-[14px] text-[var(--muted)]">{todayMood.note}</p>
              )}
            </div>
            <button
              onClick={() => patch({ moods: state.moods.filter((m) => m.date !== today) })}
              className="min-h-11 px-1 text-[14px] font-semibold text-[var(--coral-dark)] underline underline-offset-4"
            >
              {t("Change", "แก้ไข")}
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-5 gap-1.5">
              {MOODS.map((m) => (
                <motion.button
                  key={m.id}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => saveMood(m.id)}
                  className="flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--paper)] px-0.5 text-[12px] font-medium hover:border-[var(--ink)]"
                >
                  <m.icon size={26} aria-hidden />
                  {tr(m.label, l)}
                </motion.button>
              ))}
            </div>
            <div className="mt-3">
              <Field label={t("Note (optional)", "บันทึกเพิ่มเติม (ไม่บังคับ)")}>
                <input
                  className={inputClass}
                  value={note}
                  maxLength={140}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t("e.g. ate less at breakfast", "เช่น กินข้าวเช้าน้อยลง")}
                />
              </Field>
            </div>
          </>
        )}
        <div className="mt-4 flex items-end justify-between">
          {week.map(({ d, mood }) => (
            <div key={d} className="flex w-9 flex-col items-center gap-1">
              <span className="grid h-6 place-items-center text-[var(--ink)]" aria-label={mood ?? "none"}>
                {mood ? <MoodIcon id={mood} size={18} /> : <span className="h-1 w-1 rounded-full bg-[var(--line)]" />}
              </span>
              <span className="text-[11px] tabular-nums text-[var(--muted)]">{d.slice(8)}</span>
            </div>
          ))}
        </div>
        {todayMood && todayMood.mood !== "happy" && todayMood.mood !== "calm" && (
          <div className="mt-4">
            <AppButton variant="ghost" small onClick={() => goTab("learn")}>
              {t("Ask the AI coach about this", "ถาม AI Coach เรื่องนี้")}
            </AppButton>
          </div>
        )}
      </Reveal>
    </>
  );
}
