"use client";

import { Check, ChevronRight, Lightbulb, PawPrint, Send, Siren } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { COACH_SUGGESTIONS, LESSONS } from "../data";
import { Illustration } from "../illustrations";
import { newId, offlineCoachReply, looksUrgent, URGENT_REPLY } from "../logic";
import type { ChatMsg, TabProps } from "../types";
import { tr } from "../types";
import { motion } from "motion/react";
import { AppButton, Badge, Card, inputClass, PageTitle, rise, Segmented, SlideIn } from "../ui";

export function LearnTab(props: TabProps) {
  const [section, setSection] = useState<"coach" | "lessons">("coach");
  const t = (en: string, th: string) => (props.l === "en" ? en : th);
  return (
    <>
      <PageTitle>{t("Learn & Coach", "เรียนรู้และโค้ช")}</PageTitle>
      <Segmented
        value={section}
        onChange={setSection}
        options={[
          { id: "coach", label: t("AI coach chat", "แชท AI โค้ช") },
          { id: "lessons", label: t("Basic training", "ฝึกพื้นฐาน") },
        ]}
      />
      {section === "coach" ? <CoachChat {...props} /> : <Lessons {...props} />}
    </>
  );
}

function CoachChat({ l, state, patch }: TabProps) {
  const t = (en: string, th: string) => (l === "en" ? en : th);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const dog = state.dog;

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [state.chat.length, busy]);

  const send = async (raw: string) => {
    const q = raw.trim().slice(0, 500);
    if (!q || busy) return;
    const userMsg: ChatMsg = { id: newId(), role: "user", text: q };
    const history = [...state.chat, userMsg];
    patch({ chat: history.slice(-40) });
    setText("");

    /* Emergency wording never waits for the model. */
    if (looksUrgent(q)) {
      patch({
        chat: [...history, { id: newId(), role: "coach", text: URGENT_REPLY[l], urgent: true, source: "offline" } as ChatMsg].slice(-40),
      });
      return;
    }
    setBusy(true);
    let reply: ChatMsg;
    try {
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 12000);
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          locale: l,
          dog: { name: dog.name, breed: dog.breed, ageYears: dog.ageYears, weightKg: dog.weightKg, size: dog.size },
          messages: history.slice(-6).map((m) => ({ role: m.role, text: m.text })),
        }),
        signal: ctl.signal,
      });
      clearTimeout(timer);
      if (!res.ok) throw new Error("coach unavailable");
      const data = (await res.json()) as { reply?: string; urgent?: boolean };
      if (!data.reply) throw new Error("empty");
      reply = { id: newId(), role: "coach", text: data.reply, urgent: !!data.urgent, source: "ai" };
    } catch {
      const o = offlineCoachReply(q, dog.name, l);
      reply = { id: newId(), role: "coach", text: o.text, urgent: o.urgent, source: "offline" };
    }
    patch({ chat: [...history, reply].slice(-40) });
    setBusy(false);
  };

  return (
    <div>
      <p className="mb-4 border-l-2 border-[var(--trust)] pl-3 text-xs leading-5 text-[var(--muted)]">
        {t(
          "General dog-care guidance only. I can't diagnose or prescribe. For pain, illness or emergencies, contact a vet.",
          "ให้คำแนะนำการเลี้ยงทั่วไปเท่านั้น ไม่วินิจฉัยโรคหรือสั่งยา หากเจ็บปวด ป่วย หรือฉุกเฉิน ให้ติดต่อสัตวแพทย์",
        )}
      </p>
      <div className="min-h-[260px] space-y-3 pb-2" aria-live="polite">
        {state.chat.length === 0 && (
          <Card className="text-center">
            <PawPrint size={36} className="mx-auto text-[var(--coral-dark)]" aria-hidden />
            <p className="mt-2 font-black">{t(`Ask anything about ${dog.name}`, `ถามเรื่อง${dog.name}ได้เลย`)}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {t(`I know ${dog.name} is a ${dog.ageYears}-year-old ${dog.breed || "dog"}.`, `โค้ชรู้ว่า${dog.name}เป็น${dog.breed || "สุนัข"} อายุ ${dog.ageYears} ปี`)}
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {COACH_SUGGESTIONS.map((s) => (
                <button key={s.en} onClick={() => send(tr(s, l))} className="pressable min-h-11 rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3.5 text-sm font-medium hover:border-[var(--ink)]">
                  {tr(s, l)}
                </button>
              ))}
            </div>
          </Card>
        )}
        {state.chat.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[88%] rounded-lg px-4 py-3 text-[15px] leading-6 ${
                m.role === "user"
                  ? "rounded-br-md bg-[var(--chocolate)] text-white"
                  : m.urgent
                    ? "rounded-bl-md border-2 border-[var(--danger)] bg-[var(--paper)]"
                    : "rounded-bl-md border border-[var(--line)] bg-white"
              }`}
            >
              {m.urgent && (
                <p className="mb-1 flex items-center gap-1.5 text-xs font-black text-[var(--danger)]">
                  <Siren size={14} /> {t("See a vet now", "พบสัตวแพทย์ทันที")}
                </p>
              )}
              <p className="whitespace-pre-wrap">{m.text}</p>
              {m.role === "coach" && !m.urgent && (
                <p className="mt-1.5 text-[11px] text-[var(--muted)]">
                  {m.source === "ai" ? t("AI coach", "AI โค้ช") : t("Offline tips", "คำแนะนำพื้นฐาน")}
                </p>
              )}
            </div>
          </motion.div>
        ))}
        {busy && (
          <div className="flex justify-start">
            <div className="rounded-lg rounded-bl-md border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--muted)]">
              <span className="sr-only">{t("Thinking…", "กำลังคิด…")}</span>
              <span className="flex items-center gap-1.5" aria-hidden>
                <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
              </span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); void send(text); }}
        className="sticky bottom-[84px] z-30 mt-2 flex gap-2 rounded-xl bg-[var(--canvas)] py-2"
      >
        <input
          className={inputClass}
          value={text}
          maxLength={500}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("Type your question…", "พิมพ์คำถามของคุณ…")}
          aria-label={t("Message", "ข้อความ")}
        />
        <button
          type="submit"
          disabled={busy || !text.trim()}
          aria-label={t("Send", "ส่ง")}
          className="pressable grid h-11 w-12 shrink-0 place-items-center rounded-lg bg-[var(--coral-dark)] text-white disabled:opacity-45"
        >
          <Send size={18} />
        </button>
      </form>
      {state.chat.length > 0 && (
        <button onClick={() => patch({ chat: [] })} className="mt-1 min-h-11 text-xs font-bold text-[var(--muted)]">
          {t("Clear conversation", "ล้างการสนทนา")}
        </button>
      )}
    </div>
  );
}

function Lessons({ l, state, patch }: TabProps) {
  const t = (en: string, th: string) => (l === "en" ? en : th);
  const [open, setOpen] = useState<string | null>(null);
  const lesson = LESSONS.find((x) => x.id === open);
  const done = state.lessonsDone;
  const toggle = (id: string) =>
    patch({ lessonsDone: done.includes(id) ? done.filter((x) => x !== id) : [...done, id] });

  if (lesson) {
    const isDone = done.includes(lesson.id);
    return (
      <SlideIn>
        <button onClick={() => setOpen(null)} className="mb-3 min-h-11 text-sm font-black text-[var(--coral-dark)]">
          ← {t("All lessons", "บทเรียนทั้งหมด")}
        </button>
        <Illustration id={lesson.id} className="mb-3 aspect-[10/7] w-full rounded-xl" />
        <Card>
          <div className="flex items-center gap-3">
            <lesson.icon size={30} strokeWidth={1.6} className="shrink-0" aria-hidden />
            <div>
              <h2 className="display text-2xl font-black">{tr(lesson.title, l)}</h2>
              <p className="text-xs text-[var(--muted)]">{tr(lesson.level, l)} · {lesson.minutes} {t("min", "นาที")}</p>
            </div>
          </div>
          <ol className="mt-4 space-y-3">
            {lesson.steps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--coral)] text-xs font-black text-white">{i + 1}</span>
                <p className="pt-0.5 text-[15px] leading-6">{tr(s, l)}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 border-l-2 border-[var(--success)] pl-3 text-sm leading-6"><Lightbulb size={16} className="mr-1.5 inline -translate-y-px" aria-hidden />{tr(lesson.tip, l)}</p>
        </Card>
        <div className="mt-4">
          <AppButton variant={isDone ? "secondary" : "primary"} onClick={() => toggle(lesson.id)}>
            {isDone ? t("Marked as learned · undo", "เรียนแล้ว · ยกเลิก") : t(`${state.dog.name} has learned this`, `${state.dog.name}ทำได้แล้ว`)}
          </AppButton>
        </div>
      </SlideIn>
    );
  }
  return (
    <>
      <p className="mb-3 text-sm text-[var(--muted)]">
        {t(`${done.length} of ${LESSONS.length} learned`, `เรียนแล้ว ${done.length} จาก ${LESSONS.length} บท`)}
      </p>
      <ul className="space-y-2.5">
        {LESSONS.map((x, idx) => {
          const isDone = done.includes(x.id);
          return (
            <motion.li key={x.id} {...rise(idx)}>
              <button onClick={() => setOpen(x.id)} className="pressable flex min-h-[72px] w-full items-center gap-3 rounded-xl border border-[var(--line)] bg-white p-3 text-left">
                <x.icon size={24} strokeWidth={1.6} className="shrink-0 text-[var(--muted)]" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block font-black">{tr(x.title, l)}</span>
                  <span className="block text-xs text-[var(--muted)]">{tr(x.level, l)} · {x.minutes} {t("min", "นาที")}</span>
                </span>
                {isDone ? <Badge tone="success"><Check size={12} /> {t("Done", "เสร็จ")}</Badge> : <ChevronRight size={18} className="text-[var(--muted)]" />}
              </button>
            </motion.li>
          );
        })}
      </ul>
    </>
  );
}
