"use client";

import { Check, CircleHelp, ExternalLink, MapPin, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { CATEGORIES, CRITERIA, PLACES, type Place, type PlaceCategory } from "../data";
import { avg, criterionState, newId, readiness, type CriterionKey } from "../logic";
import type { Review, TabProps } from "../types";
import { tr } from "../types";
import {
  AppButton,
  Badge,
  Card,
  Field,
  inputClass,
  PageTitle,
  Photo,
  PhotoCredit,
  rise,
  SampleNote,
  SectionTitle,
  SlideIn,
  Stars,
} from "../ui";

export function SafeTab(props: TabProps) {
  const { l, state } = props;
  const [filter, setFilter] = useState<PlaceCategory | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const t = (en: string, th: string) => (l === "en" ? en : th);
  const open = PLACES.find((p) => p.id === openId);
  if (open) return <PlaceDetail {...props} place={open} back={() => setOpenId(null)} />;

  const list = PLACES.filter((p) => filter === "all" || p.category === filter).sort(
    (a, b) => a.distanceKm - b.distanceKm,
  );
  return (
    <>
      <PageTitle sub={t(`Check ${state.dog.name} is ready before you go.`, `เช็กว่า${state.dog.name}พร้อมก่อนไปสถานที่จริง`)}>
        {t("Safe Spaces", "พื้นที่ปลอดภัย")}
      </PageTitle>
      <SampleNote l={l} />

      <div className="mt-4">
        <PlaceMap places={list} l={l} onPick={setOpenId} />
      </div>

      <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1" role="group" aria-label={t("Filter places", "กรองสถานที่")}>
        <Chip active={filter === "all"} onClick={() => setFilter("all")}>{t("All", "ทั้งหมด")}</Chip>
        {CATEGORIES.map((c) => (
          <Chip key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)}>
            <c.icon size={16} aria-hidden /> {tr(c.label, l)}
          </Chip>
        ))}
      </div>

      <SectionTitle>{t("Nearby", "ใกล้คุณ")}</SectionTitle>
      <ul className="space-y-2.5">
        {list.map((p, idx) => {
          const reviews = [...p.reviews, ...(state.placeReviews[p.id] ?? [])];
          const r = readiness(p.requires, state);
          return (
            <motion.li key={p.id} {...rise(idx)}>
              <button onClick={() => setOpenId(p.id)} className="pressable flex min-h-[84px] w-full items-center gap-3 rounded-xl border border-[var(--line)] bg-white p-3 text-left">
                {p.image ? (
                  <Photo image={p.image} alt="" className="h-14 w-14 shrink-0 rounded-lg" sizes={120} />
                ) : (
                  <span className="grid h-14 w-14 shrink-0 place-items-center text-[var(--muted)]" aria-hidden>
                    <CategoryIcon id={p.category} size={24} />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-black">{tr(p.name, l)}</span>
                  <span className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                    <Stars value={avg(reviews)} size={12} /> {avg(reviews).toFixed(1)} · {p.distanceKm} {t("km", "กม.")}
                  </span>
                </span>
                {p.requires.length > 0 && <ReadyBadge level={r.level} l={l} />}
              </button>
            </motion.li>
          );
        })}
      </ul>
    </>
  );
}

function CategoryIcon({ id, size }: { id: PlaceCategory; size: number }) {
  const Icon = CATEGORIES.find((c) => c.id === id)!.icon;
  return <Icon size={size} />;
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`pressable flex min-h-11 shrink-0 items-center gap-1.5 rounded-lg border px-3.5 text-sm font-medium ${active ? "border-[var(--ink)] bg-[var(--ink)] text-white" : "border-[var(--line)] bg-[var(--paper)] text-[var(--ink)]"}`}
    >
      {children}
    </button>
  );
}

function ReadyBadge({ level, l }: { level: "ready" | "almost" | "notyet"; l: "en" | "th" }) {
  const t = (en: string, th: string) => (l === "en" ? en : th);
  if (level === "ready") return <Badge tone="success">{t("Ready", "พร้อม")}</Badge>;
  if (level === "almost") return <Badge tone="warning">{t("Almost", "เกือบพร้อม")}</Badge>;
  return <Badge tone="danger">{t("Not yet", "ยังไม่พร้อม")}</Badge>;
}

/* A stylised sample map: pins are positioned by percentage, not real coordinates. */
function PlaceMap({ places, l, onPick }: { places: Place[]; l: "en" | "th"; onPick: (id: string) => void }) {
  return (
    <div
      className="relative h-[250px] overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--soft)]"
      role="group"
      aria-label={l === "en" ? "Sample map" : "แผนที่ตัวอย่าง"}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        <path d="M0 62 C 25 55, 40 75, 100 60" stroke="#fffdf9" strokeWidth="5" fill="none" />
        <path d="M30 0 C 35 30, 55 40, 52 100" stroke="#fffdf9" strokeWidth="4" fill="none" />
        <path d="M0 18 L100 36" stroke="#fffdf9" strokeWidth="3" fill="none" />
        <ellipse cx="20" cy="30" rx="16" ry="14" fill="#e3dcc9" />
        <ellipse cx="68" cy="20" rx="14" ry="9" fill="#e3dcc9" />
        <path d="M70 100 C 78 80, 90 78, 100 82 L100 100 Z" fill="#d5dde6" />
      </svg>
      {places.map((p, idx) => (
        <button
          key={p.id}
          onClick={() => onPick(p.id)}
          aria-label={tr(p.name, l)}
          className="pressable absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <motion.span
            initial={{ scale: 0, y: -14 }}
            animate={{ scale: 1, y: 0 }}
            whileHover={{ scale: 1.18 }}
            transition={{ type: "spring", stiffness: 420, damping: 14, delay: 0.1 + idx * 0.07 }}
            className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-[var(--coral-dark)] text-base text-white shadow-md"
            aria-hidden
          >
            <CategoryIcon id={p.category} size={18} />
          </motion.span>
        </button>
      ))}
      <span className="absolute bottom-2 left-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-[var(--muted)]">
        <MapPin size={12} /> {l === "en" ? "Sample map" : "แผนที่ตัวอย่าง"}
      </span>
    </div>
  );
}

function PlaceDetail({ l, state, patch, goTab, place, back }: TabProps & { place: Place; back: () => void }) {
  const t = (en: string, th: string) => (l === "en" ? en : th);
  const [stage, setStage] = useState<"info" | "check">("info");
  const mine = state.placeReviews[place.id] ?? [];
  const reviews = [...place.reviews, ...mine];
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const submit = () => {
    if (!rating || !text.trim()) return;
    const r: Review = { id: newId(), author: "You", rating, text: text.trim().slice(0, 300), mine: true };
    patch({ placeReviews: { ...state.placeReviews, [place.id]: [r, ...mine] } });
    setRating(0); setText("");
  };

  if (stage === "check") {
    const r = readiness(place.requires, state);
    return (
      <SlideIn>
        <button onClick={() => setStage("info")} className="mb-3 min-h-11 text-sm font-black text-[var(--coral-dark)]">← {tr(place.name, l)}</button>
        <Card className={`border-l-[6px] ${r.level === "ready" ? "border-l-[var(--success)]" : r.level === "almost" ? "border-l-[var(--warning)]" : "border-l-[var(--danger)]"}`}>
          <p className="text-xs font-black uppercase tracking-wider text-[var(--muted)]">{t("Readiness check", "ประเมินความพร้อม")}</p>
          <div className="mt-1 flex items-end justify-between">
            <h2 className="display text-3xl font-black">
              {r.level === "ready" ? t("Ready to go", "พร้อมไป") : r.level === "almost" ? t("Almost ready", "เกือบพร้อม") : t("Not yet", "ยังไม่พร้อม")}
            </h2>
            <span className="display text-3xl font-black">{r.score}%</span>
          </div>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {t(`${state.dog.name} meets ${r.met} of ${r.total} for ${place.name.en}.`, `${state.dog.name}ผ่าน ${r.met} จาก ${r.total} ข้อสำหรับ${place.name.th}`)}
          </p>
        </Card>
        <ul className="mt-4 space-y-2.5">
          {place.requires.map((k: CriterionKey) => {
            const c = CRITERIA[k];
            const s = criterionState(k, state);
            return (
              <li key={k}>
                <Card className="flex items-center gap-3">
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${s === "met" ? "bg-[var(--success)] text-white" : s === "unmet" ? "border-2 border-[var(--danger)] text-[var(--danger)]" : "border border-[var(--line)] text-[var(--muted)]"}`}>
                    {s === "met" ? <Check size={18} /> : s === "unmet" ? <X size={18} /> : <CircleHelp size={18} />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold">{tr(c.label, l)}</p>
                    {s !== "met" && !c.auto && (
                      <label className="mt-1 flex min-h-11 items-center gap-2 text-sm text-[var(--muted)]">
                        <input type="checkbox" className="h-5 w-5" checked={!!state.assessManual[k]} onChange={(e) => patch({ assessManual: { ...state.assessManual, [k]: e.target.checked } })} />
                        {tr(c.fix, l)}
                      </label>
                    )}
                    {s === "met" && !c.auto && (
                      <label className="mt-1 flex min-h-11 items-center gap-2 text-sm text-[var(--muted)]">
                        <input type="checkbox" className="h-5 w-5" checked onChange={(e) => patch({ assessManual: { ...state.assessManual, [k]: e.target.checked } })} />
                        {t("Confirmed by you", "คุณยืนยันแล้ว")}
                      </label>
                    )}
                    {s !== "met" && c.auto && c.tab && (
                      <button onClick={() => goTab(c.tab!)} className="mt-0.5 min-h-11 text-sm font-black text-[var(--coral-dark)]">
                        {s === "unknown" ? t("No data yet · ", "ยังไม่มีข้อมูล · ") : ""}{tr(c.fix, l)} →
                      </button>
                    )}
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-xs leading-5 text-[var(--muted)]">
          {t("This checklist is a guide, not a guarantee. Always follow the venue's own rules and watch your dog's body language.", "รายการนี้เป็นแนวทาง ไม่ใช่การรับประกัน ควรปฏิบัติตามกฎของสถานที่และสังเกตท่าทางของน้องเสมอ")}
        </p>
      </SlideIn>
    );
  }

  const r = readiness(place.requires, state);
  return (
    <SlideIn>
      <button onClick={back} className="mb-3 min-h-11 text-sm font-black text-[var(--coral-dark)]">← {t("Safe Spaces", "พื้นที่ปลอดภัย")}</button>
      {place.image && (
        <div className="mb-3">
          <Photo image={place.image} alt={tr(place.name, l)} sizes={800} className="h-48 w-full rounded-xl" />
          <PhotoCredit image={place.image} />
        </div>
      )}
      <Card>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className="display text-2xl font-black">{tr(place.name, l)}</h2>
            <p className="text-sm text-[var(--muted)]">{tr(place.area, l)} · {place.distanceKm} {t("km", "กม.")} · {tr(place.hours, l)}</p>
          </div>
          <span className="text-[var(--coral-dark)]" aria-hidden><CategoryIcon id={place.category} size={32} /></span>
        </div>
        <p className="mt-3 text-[15px] leading-6">{tr(place.about, l)}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {place.tags.map((tg) => <Badge key={tg.en} tone="blue">{tr(tg, l)}</Badge>)}
        </div>
        <a
          href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(place.name.en)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-black text-[var(--trust)]"
        >
          <ExternalLink size={14} /> {t("Search on OpenStreetMap", "ค้นหาบน OpenStreetMap")}
        </a>
      </Card>

      {place.requires.length > 0 && (
        <div className="mt-4">
          <AppButton onClick={() => setStage("check")}>
            {t(`Is ${state.dog.name} ready? `, `${state.dog.name}พร้อมไหม `)}
            <ReadyBadge level={r.level} l={l} />
          </AppButton>
        </div>
      )}

      <SectionTitle action={<span className="flex items-center gap-1 text-sm font-bold"><Stars value={avg(reviews)} size={14} /> {avg(reviews).toFixed(1)}</span>}>
        {t("Reviews", "รีวิว")} ({reviews.length})
      </SectionTitle>
      <ul className="space-y-2.5">
        {reviews.map((rv, idx) => (
          <li key={rv.id}>
            <Card reveal={idx}>
              <div className="flex items-center justify-between">
                <Stars value={rv.rating} size={14} />
                <Badge tone={rv.mine ? "coral" : "neutral"}>{rv.mine ? t("You", "คุณ") : t("Sample", "ตัวอย่าง")}</Badge>
              </div>
              <p className="mt-2 text-sm leading-6">{rv.text}</p>
            </Card>
          </li>
        ))}
      </ul>
      <Card className="mt-3 space-y-3">
        <p className="font-black">{t("Write a review", "เขียนรีวิว")}</p>
        <Stars value={rating} onChange={setRating} size={22} />
        <Field label={t("Your experience", "ประสบการณ์ของคุณ")}>
          <textarea className={`${inputClass} min-h-24 py-2`} value={text} maxLength={300} onChange={(e) => setText(e.target.value)} />
        </Field>
        <AppButton small disabled={!rating || !text.trim()} onClick={submit}>{t("Post review", "ส่งรีวิว")}</AppButton>
      </Card>
    </SlideIn>
  );
}
