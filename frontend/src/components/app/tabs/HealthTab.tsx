"use client";

import { Bug, Dog, Pencil, Pill, Plus, Syringe, Trash2, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  addDays,
  dueStatus,
  formatDate,
  goalStats,
  missionStreak,
  newId,
  todayISO,
} from "../logic";
import { MISSIONS } from "../data";
import type {
  DogProfile,
  DogSize,
  MedRecord,
  RecordKind,
  TabProps,
  Visit,
} from "../types";
import {
  AppButton,
  Badge,
  Card,
  Field,
  inputClass,
  PageTitle,
  Reveal,
  SectionTitle,
  Segmented,
} from "../ui";

type Section = "medicine" | "history" | "goal";
const KIND_LABEL: Record<RecordKind, { en: string; th: string; icon: LucideIcon }> = {
  vaccine: { en: "Vaccine", th: "วัคซีน", icon: Syringe },
  medicine: { en: "Medicine", th: "ยา", icon: Pill },
  parasite: { en: "Flea/tick/worm", th: "กันเห็บหมัดพยาธิ", icon: Bug },
};
const SIZE_LABEL: Record<DogSize, { en: string; th: string }> = {
  small: { en: "Small", th: "เล็ก" },
  medium: { en: "Medium", th: "กลาง" },
  large: { en: "Large", th: "ใหญ่" },
};

export function HealthTab(props: TabProps) {
  const { l, state } = props;
  const [section, setSection] = useState<Section>("medicine");
  const t = (en: string, th: string) => (l === "en" ? en : th);
  return (
    <>
      <PageTitle>{t("Profile & Health", "โปรไฟล์และสุขภาพ")}</PageTitle>
      <DogCard {...props} />
      <div className="mt-5" />
      <Segmented
        value={section}
        onChange={setSection}
        options={[
          { id: "medicine", label: t("Medicine book", "สมุดจดยา") },
          { id: "history", label: t("Treatments", "ประวัติรักษา") },
          { id: "goal", label: t("90-day goal", "เป้า 90 วัน") },
        ]}
      />
      <Reveal key={section}>
        {section === "medicine" && <MedicineBook {...props} />}
        {section === "history" && <History {...props} />}
        {section === "goal" && <GoalSection key={state.goal.startDate} {...props} />}
      </Reveal>
    </>
  );
}

/* ---------------- dog profile ---------------- */
function DogCard({ l, state, patch }: TabProps) {
  const t = (en: string, th: string) => (l === "en" ? en : th);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<DogProfile>(state.dog);
  const dog = state.dog;
  if (editing) {
    const valid = draft.name.trim().length > 0 && draft.weightKg > 0 && draft.ageYears >= 0;
    return (
      <Card className="space-y-3">
        <Field label={t("Name", "ชื่อ")}>
          <input className={inputClass} value={draft.name} maxLength={30} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
        </Field>
        <Field label={t("Breed", "สายพันธุ์")}>
          <input className={inputClass} value={draft.breed} maxLength={40} onChange={(e) => setDraft({ ...draft, breed: e.target.value })} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label={t("Age (years)", "อายุ (ปี)")}>
            <input className={inputClass} type="number" min={0} max={30} step={0.5} value={draft.ageYears} onChange={(e) => setDraft({ ...draft, ageYears: Number(e.target.value) })} />
          </Field>
          <Field label={t("Weight (kg)", "น้ำหนัก (กก.)")}>
            <input className={inputClass} type="number" min={0.5} max={100} step={0.1} value={draft.weightKg} onChange={(e) => setDraft({ ...draft, weightKg: Number(e.target.value) })} />
          </Field>
        </div>
        <Field label={t("Size", "ขนาดตัว")}>
          <select className={inputClass} value={draft.size} onChange={(e) => setDraft({ ...draft, size: e.target.value as DogSize })}>
            {(Object.keys(SIZE_LABEL) as DogSize[]).map((s) => (
              <option key={s} value={s}>{SIZE_LABEL[s][l]}</option>
            ))}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-2">
          <AppButton variant="secondary" small onClick={() => setEditing(false)}>{t("Cancel", "ยกเลิก")}</AppButton>
          <AppButton small disabled={!valid} onClick={() => { patch({ dog: { ...draft, name: draft.name.trim() } }); setEditing(false); }}>
            {t("Save", "บันทึก")}
          </AppButton>
        </div>
      </Card>
    );
  }
  return (
    <Card className="flex items-center gap-4">
      <Dog size={38} strokeWidth={1.5} className="shrink-0" aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="display text-2xl font-black">{dog.name}</p>
        <p className="truncate text-sm text-[var(--muted)]">
          {dog.breed || "—"} · {dog.ageYears} {t("yr", "ปี")} · {dog.weightKg} {t("kg", "กก.")} · {SIZE_LABEL[dog.size][l]}
        </p>
      </div>
      <button
        onClick={() => { setDraft(dog); setEditing(true); }}
        aria-label={t("Edit profile", "แก้ไขโปรไฟล์")}
        className="pressable grid h-11 w-11 place-items-center rounded-lg border border-[var(--line)]"
      >
        <Pencil size={18} />
      </button>
    </Card>
  );
}

/* ---------------- medicine book ---------------- */
function MedicineBook({ l, state, patch }: TabProps) {
  const t = (en: string, th: string) => (l === "en" ? en : th);
  const today = todayISO();
  const [adding, setAdding] = useState(false);
  const [kind, setKind] = useState<RecordKind>("vaccine");
  const [name, setName] = useState("");
  const [date, setDate] = useState(today);
  const [nextDue, setNextDue] = useState("");
  const sorted = [...state.records].sort((a, b) =>
    (a.nextDue || "9999").localeCompare(b.nextDue || "9999"),
  );
  const add = () => {
    const rec: MedRecord = { id: newId(), kind, name: name.trim(), date, nextDue };
    patch({ records: [...state.records, rec] });
    setName(""); setNextDue(""); setDate(today); setAdding(false);
  };
  const statusBadge = (r: MedRecord) => {
    const { status, days } = dueStatus(r.nextDue, today);
    if (status === "overdue") return <Badge tone="danger" stamp>{t(`Overdue ${-days}d`, `เลยกำหนด ${-days} วัน`)}</Badge>;
    if (status === "soon") return <Badge tone="warning" stamp>{t(`In ${days}d`, `อีก ${days} วัน`)}</Badge>;
    if (status === "ok") return <Badge tone="success">{t("On track", "ปกติ")}</Badge>;
    return <Badge>{t("No due date", "ไม่มีกำหนด")}</Badge>;
  };
  return (
    <>
      {sorted.length === 0 && (
        <Card><p className="text-sm text-[var(--muted)]">{t("No records yet. Add your dog's first vaccine or medicine.", "ยังไม่มีบันทึก เพิ่มวัคซีนหรือยาตัวแรกของน้องได้เลย")}</p></Card>
      )}
      <ul className="space-y-2.5">
        {sorted.map((r, idx) => (
          <li key={r.id}>
            <Card reveal={idx} className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center text-[var(--muted)]" aria-hidden>{(() => { const I = KIND_LABEL[r.kind].icon; return <I size={22} />; })()}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-black">{r.name}</p>
                <p className="text-xs text-[var(--muted)]">
                  {KIND_LABEL[r.kind][l]} · {t("given", "ให้เมื่อ")} {formatDate(r.date, l)}
                </p>
                <p className="text-xs text-[var(--muted)]">
                  {t("Next", "ครั้งถัดไป")}: {formatDate(r.nextDue, l)}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                {statusBadge(r)}
                <button
                  onClick={() => patch({ records: state.records.filter((x) => x.id !== r.id) })}
                  aria-label={t("Delete record", "ลบบันทึก")}
                  className="grid h-11 w-11 place-items-center text-[var(--muted)]"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </Card>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        {adding ? (
          <Card className="space-y-3">
            <Field label={t("Type", "ประเภท")}>
              <select className={inputClass} value={kind} onChange={(e) => setKind(e.target.value as RecordKind)}>
                {(Object.keys(KIND_LABEL) as RecordKind[]).map((k) => (
                  <option key={k} value={k}>{KIND_LABEL[k][l]}</option>
                ))}
              </select>
            </Field>
            <Field label={t("Name", "ชื่อ")}>
              <input className={inputClass} value={name} maxLength={60} onChange={(e) => setName(e.target.value)} placeholder={t("e.g. Rabies", "เช่น พิษสุนัขบ้า")} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label={t("Given on", "วันที่ให้")}>
                <input className={inputClass} type="date" value={date} max={addDays(today, 0)} onChange={(e) => setDate(e.target.value)} />
              </Field>
              <Field label={t("Next due", "ครั้งถัดไป")}>
                <input className={inputClass} type="date" value={nextDue} min={date} onChange={(e) => setNextDue(e.target.value)} />
              </Field>
            </div>
            <p className="text-xs text-[var(--muted)]">{t("Follow the schedule your vet gives you.", "ให้ทำตามตารางที่สัตวแพทย์กำหนด")}</p>
            <div className="grid grid-cols-2 gap-2">
              <AppButton variant="secondary" small onClick={() => setAdding(false)}>{t("Cancel", "ยกเลิก")}</AppButton>
              <AppButton small disabled={!name.trim() || !date} onClick={add}>{t("Add", "เพิ่ม")}</AppButton>
            </div>
          </Card>
        ) : (
          <AppButton variant="ghost" onClick={() => setAdding(true)}>
            <Plus size={18} /> {t("Add record", "เพิ่มบันทึก")}
          </AppButton>
        )}
      </div>
    </>
  );
}

/* ---------------- treatment history ---------------- */
function History({ l, state, patch }: TabProps) {
  const t = (en: string, th: string) => (l === "en" ? en : th);
  const today = todayISO();
  const [adding, setAdding] = useState(false);
  const [v, setV] = useState({ date: today, clinic: "", reason: "", note: "" });
  const sorted = [...state.visits].sort((a, b) => b.date.localeCompare(a.date));
  const add = () => {
    const visit: Visit = {
      id: newId(),
      date: v.date,
      clinic: v.clinic.trim(),
      reason: v.reason.trim(),
      note: v.note.trim(),
    };
    patch({ visits: [...state.visits, visit] });
    setV({ date: today, clinic: "", reason: "", note: "" });
    setAdding(false);
  };
  return (
    <>
      {sorted.length === 0 && (
        <Card><p className="text-sm text-[var(--muted)]">{t("No visits recorded yet.", "ยังไม่มีประวัติการรักษา")}</p></Card>
      )}
      <ol className="relative ml-3 space-y-4 border-l-2 border-[var(--line)] pl-5">
        {sorted.map((x, idx) => (
          <li key={x.id} className="relative">
            <span className="absolute -left-[29px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[var(--coral)]" />
            <p className="text-xs font-extrabold text-[var(--coral-dark)]">{formatDate(x.date, l)}</p>
            <Card reveal={idx} className="mt-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-black">{x.reason || t("Visit", "เข้ารับการตรวจ")}</p>
                  <p className="text-sm text-[var(--muted)]">{x.clinic || "—"}</p>
                </div>
                <button
                  onClick={() => patch({ visits: state.visits.filter((y) => y.id !== x.id) })}
                  aria-label={t("Delete visit", "ลบประวัติ")}
                  className="grid h-11 w-11 shrink-0 place-items-center text-[var(--muted)]"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              {x.note && <p className="mt-2 text-sm leading-6">{x.note}</p>}
            </Card>
          </li>
        ))}
      </ol>
      <div className="mt-5">
        {adding ? (
          <Card className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Field label={t("Date", "วันที่")}>
                <input className={inputClass} type="date" value={v.date} max={today} onChange={(e) => setV({ ...v, date: e.target.value })} />
              </Field>
              <Field label={t("Clinic", "คลินิก")}>
                <input className={inputClass} value={v.clinic} maxLength={60} onChange={(e) => setV({ ...v, clinic: e.target.value })} />
              </Field>
            </div>
            <Field label={t("Reason", "สาเหตุที่ไป")}>
              <input className={inputClass} value={v.reason} maxLength={80} onChange={(e) => setV({ ...v, reason: e.target.value })} />
            </Field>
            <Field label={t("Vet's notes", "บันทึกจากสัตวแพทย์")}>
              <textarea className={`${inputClass} min-h-24 py-2`} value={v.note} maxLength={400} onChange={(e) => setV({ ...v, note: e.target.value })} />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <AppButton variant="secondary" small onClick={() => setAdding(false)}>{t("Cancel", "ยกเลิก")}</AppButton>
              <AppButton small disabled={!v.reason.trim() || !v.date} onClick={add}>{t("Add", "เพิ่ม")}</AppButton>
            </div>
          </Card>
        ) : (
          <AppButton variant="ghost" onClick={() => setAdding(true)}>
            <Plus size={18} /> {t("Add visit", "เพิ่มประวัติการรักษา")}
          </AppButton>
        )}
      </div>
    </>
  );
}

/* ---------------- 90-day goal ---------------- */
function GoalSection({ l, state, patch }: TabProps) {
  const t = (en: string, th: string) => (l === "en" ? en : th);
  const today = todayISO();
  const g = state.goal;
  const s = goalStats(g, today);
  const streak = missionStreak(state, MISSIONS.length, today);
  const [kg, setKg] = useState("");
  const [setting, setSetting] = useState(false);
  const [title, setTitle] = useState(g.title);
  const [target, setTarget] = useState(String(g.targetKg));
  const milestones = [30, 60, 90];
  const logWeight = () => {
    const value = Number(kg);
    if (!(value > 0)) return;
    const rest = g.logs.filter((x) => x.date !== today);
    patch({
      goal: { ...g, logs: [...rest, { date: today, kg: value }] },
      dog: { ...state.dog, weightKg: value },
    });
    setKg("");
  };
  const newGoal = () => {
    const targetKg = Number(target);
    if (!title.trim() || !(targetKg > 0)) return;
    patch({
      goal: { title: title.trim(), startDate: today, startKg: state.dog.weightKg, targetKg, logs: [] },
    });
    setSetting(false);
  };
  return (
    <>
      <Card className="bg-[var(--chocolate)] text-white">
        <div className="flex items-center justify-between">
          <Badge tone="coral">{t(`Day ${s.day} of 90`, `วันที่ ${s.day} จาก 90`)}</Badge>
          <span className="text-xs text-white/70">{t(`${s.daysLeft} days left`, `เหลืออีก ${s.daysLeft} วัน`)}</span>
        </div>
        <h2 className="display mt-3 text-2xl font-black">{g.title}</h2>
        <p className="mt-1 text-sm text-white/70">
          {g.startKg} → {g.targetKg} {t("kg", "กก.")} · {t("now", "ตอนนี้")} {s.latest} {t("kg", "กก.")}
        </p>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/15" role="progressbar" aria-valuenow={s.pct} aria-valuemin={0} aria-valuemax={100}>
          <motion.div className="h-full rounded-full bg-[var(--honey)]" animate={{ width: `${s.pct}%` }} transition={{ duration: 0.5 }} />
        </div>
        <p className="mt-1.5 text-right text-xs text-white/70">{s.pct}%</p>
      </Card>

      <SectionTitle>{t("Milestones", "หมุดหมาย")}</SectionTitle>
      <div className="grid grid-cols-3 gap-2">
        {milestones.map((m) => {
          const reached = s.day >= m;
          return (
            <div key={m} className={`rounded-lg p-3 text-center border ${reached ? "border-[var(--ink)] text-[var(--ink)]" : "border-[var(--line)] text-[var(--muted)]"}`}>
              <p className="display text-2xl font-black">{m}</p>
              <p className="text-[11px] font-bold">{reached ? t("reached", "ถึงแล้ว") : t("days", "วัน")}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-sm text-[var(--muted)]">
        {t(`Daily missions: ${streak} of the last 7 days on track.`, `ภารกิจประจำวัน: 7 วันล่าสุดทำได้ตามเป้า ${streak} วัน`)}
      </p>

      <SectionTitle>{t("Log today's weight", "บันทึกน้ำหนักวันนี้")}</SectionTitle>
      <Card>
        <div className="flex gap-2">
          <input className={inputClass} type="number" inputMode="decimal" min={0.5} step={0.1} value={kg} placeholder={t("kg", "กก.")} aria-label={t("Weight in kg", "น้ำหนักเป็นกิโลกรัม")} onChange={(e) => setKg(e.target.value)} />
          <div className="w-28 shrink-0"><AppButton small disabled={!(Number(kg) > 0)} onClick={logWeight}>{t("Save", "บันทึก")}</AppButton></div>
        </div>
        {g.logs.length > 0 && (
          <ul className="mt-3 divide-y divide-[var(--line)]/60 text-sm">
            {[...g.logs].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5).map((x) => (
              <li key={x.date} className="flex justify-between py-2">
                <span className="text-[var(--muted)]">{formatDate(x.date, l)}</span>
                <span className="font-black">{x.kg} {t("kg", "กก.")}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <div className="mt-4">
        {setting ? (
          <Card className="space-y-3">
            <Field label={t("Goal", "เป้าหมาย")}>
              <input className={inputClass} value={title} maxLength={60} onChange={(e) => setTitle(e.target.value)} />
            </Field>
            <Field label={t("Target weight (kg)", "น้ำหนักเป้าหมาย (กก.)")}>
              <input className={inputClass} type="number" min={0.5} step={0.1} value={target} onChange={(e) => setTarget(e.target.value)} />
            </Field>
            <p className="text-xs text-[var(--muted)]">{t("Starts today from the current weight. Ask your vet what a healthy target is.", "เริ่มนับวันนี้จากน้ำหนักปัจจุบัน ควรถามสัตวแพทย์ว่าเป้าหมายที่เหมาะสมคือเท่าไร")}</p>
            <div className="grid grid-cols-2 gap-2">
              <AppButton variant="secondary" small onClick={() => setSetting(false)}>{t("Cancel", "ยกเลิก")}</AppButton>
              <AppButton small onClick={newGoal}>{t("Start 90 days", "เริ่ม 90 วัน")}</AppButton>
            </div>
          </Card>
        ) : (
          <AppButton variant="ghost" onClick={() => { setTitle(g.title); setTarget(String(g.targetKg)); setSetting(true); }}>
            {t("Set a new goal", "ตั้งเป้าหมายใหม่")}
          </AppButton>
        )}
      </div>
    </>
  );
}

