"use client";

import { Info, Play, Star, TriangleAlert } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { PRODUCTS, type Product } from "../data";
import { hasIllustration, Illustration } from "../illustrations";
import { ageStage, avg, newId } from "../logic";
import type { Review, TabProps } from "../types";
import { tr } from "../types";
import {
  AppButton,
  Badge,
  Card,
  Field,
  inputClass,
  PageTitle,
  SampleNote,
  Photo,
  PhotoCredit,
  rise,
  SectionTitle,
  SlideIn,
  Stars,
} from "../ui";

const STAGE_LABEL = {
  puppy: { en: "puppies", th: "ลูกสุนัข" },
  adult: { en: "adult dogs", th: "สุนัขโต" },
  senior: { en: "senior dogs", th: "สุนัขสูงวัย" },
};

export function AffiliateTab(props: TabProps) {
  const { l, state } = props;
  const t = (en: string, th: string) => (l === "en" ? en : th);
  const [fitOnly, setFitOnly] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const stage = ageStage(state.dog);
  const fits = (p: Product) => p.sizes.includes(state.dog.size) && p.stages.includes(stage);
  const open = PRODUCTS.find((p) => p.id === openId);
  if (open) return <ProductDetail {...props} product={open} fits={fits(open)} back={() => setOpenId(null)} />;

  const list = PRODUCTS.filter((p) => !fitOnly || fits(p));
  return (
    <>
      <PageTitle sub={t(`Picked for ${state.dog.name}: ${state.dog.size} size, ${STAGE_LABEL[stage].en}.`, `คัดให้${state.dog.name}: ขนาด${state.dog.size === "small" ? "เล็ก" : state.dog.size === "medium" ? "กลาง" : "ใหญ่"} · ${STAGE_LABEL[stage].th}`)}>
        {t("Affiliate picks", "สินค้าแนะนำ")}
      </PageTitle>
      <Disclosure l={l} />
      <div className="mt-3"><SampleNote l={l} /></div>

      <label className="mt-4 flex min-h-11 items-center gap-3 rounded-lg bg-white px-4 text-sm font-bold">
        <input type="checkbox" className="h-5 w-5" checked={fitOnly} onChange={(e) => setFitOnly(e.target.checked)} />
        {t(`Only products that fit ${state.dog.name}`, `แสดงเฉพาะสินค้าที่เหมาะกับ${state.dog.name}`)}
      </label>

      <SectionTitle>{t("Products", "สินค้า")} ({list.length})</SectionTitle>
      {list.length === 0 && (
        <Card><p className="text-sm text-[var(--muted)]">{t("Nothing matches yet. Turn the filter off to browse everything.", "ยังไม่มีสินค้าที่ตรง ปิดตัวกรองเพื่อดูทั้งหมด")}</p></Card>
      )}
      <ul className="grid grid-cols-2 gap-3">
        {list.map((p, idx) => {
          const reviews = [...p.reviews, ...(state.productReviews[p.id] ?? [])];
          return (
            <motion.li key={p.id} {...rise(idx)}>
              <button onClick={() => setOpenId(p.id)} className="pressable flex h-full w-full flex-col rounded-xl border border-[var(--line)] bg-white p-3 text-left">
                {p.image ? (
                  <Photo image={p.image} alt={tr(p.name, l)} className="h-28 w-full rounded-lg" />
                ) : hasIllustration(p.id) ? (
                  <Illustration id={p.id} className="h-28 w-full rounded-lg" />
                ) : (
                  <span className="grid h-28 place-items-center rounded-lg bg-[var(--soft)] text-[var(--muted)]" aria-hidden><p.icon size={44} strokeWidth={1.5} /></span>
                )}
                <span className="mt-2 text-[11px] font-bold text-[var(--muted)]">{tr(p.category, l)}</span>
                <span className="line-clamp-2 text-sm font-black leading-5">{tr(p.name, l)}</span>
                <span className="mt-auto flex items-center justify-between pt-2">
                  <span className="font-black text-[var(--coral-dark)]">฿{p.priceThb}</span>
                  <span className="flex items-center gap-1 text-xs"><Star size={12} className="fill-[var(--honey)] text-[var(--honey)]" />{avg(reviews).toFixed(1)}</span>
                </span>
                {fits(p) && <span className="mt-2"><Badge tone="success">{t("Fits " + state.dog.name, "เหมาะกับ" + state.dog.name)}</Badge></span>}
              </button>
            </motion.li>
          );
        })}
      </ul>
    </>
  );
}

function Disclosure({ l }: { l: "en" | "th" }) {
  return (
    <p className="flex items-start gap-2 border-l-2 border-[var(--warning)] pl-3 text-xs leading-5 text-[var(--muted)]">
      <Info size={14} className="mt-0.5 shrink-0" />
      {l === "en"
        ? "Affiliate links: we may earn a commission if you buy, at no extra cost to you."
        : "ลิงก์พันธมิตร: เราอาจได้รับค่าคอมมิชชันเมื่อคุณซื้อ โดยคุณไม่ต้องจ่ายเพิ่ม"}
    </p>
  );
}

function ProductDetail({ l, state, patch, product, fits, back }: TabProps & { product: Product; fits: boolean; back: () => void }) {
  const t = (en: string, th: string) => (l === "en" ? en : th);
  const mine = state.productReviews[product.id] ?? [];
  const reviews = [...product.reviews, ...mine];
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [playing, setPlaying] = useState(false);

  const submit = () => {
    if (!rating || !text.trim()) return;
    const r: Review = { id: newId(), author: "You", rating, text: text.trim().slice(0, 300), mine: true };
    patch({ productReviews: { ...state.productReviews, [product.id]: [r, ...mine] } });
    setRating(0); setText("");
  };

  return (
    <SlideIn>
      <button onClick={back} className="mb-3 min-h-11 text-sm font-black text-[var(--coral-dark)]">← {t("Affiliate picks", "สินค้าแนะนำ")}</button>

      {/* Presentation video: plays a real file when product.videoUrl is set. */}
      <div className="overflow-hidden rounded-xl bg-[var(--chocolate)]">
        {product.videoUrl ? (
          <video className="aspect-video w-full" controls preload="none" src={product.videoUrl} />
        ) : (
          <button
            onClick={() => setPlaying((v) => !v)}
            aria-label={t("Play presentation video", "เล่นวิดีโอนำเสนอ")}
            className="relative grid aspect-video w-full place-items-center overflow-hidden text-white"
          >
            {product.image ? (
              <Photo image={product.image} alt={tr(product.name, l)} sizes={800} className="absolute inset-0 h-full w-full opacity-80" />
            ) : hasIllustration(product.id) ? (
              <Illustration id={product.id} className="absolute inset-0 h-full w-full" />
            ) : (
              <product.icon size={72} strokeWidth={1.25} className="opacity-90" aria-hidden />
            )}
            {!playing ? (
              <span className="absolute grid h-16 w-16 place-items-center rounded-full bg-white/90 text-[var(--coral-dark)]"><Play size={26} fill="currentColor" /></span>
            ) : (
              <span className="absolute inset-x-4 bottom-4 rounded-lg bg-black/50 px-3 py-2 text-xs">
                {t("Sample slot: the presentation video for this product goes here.", "พื้นที่ตัวอย่าง: วิดีโอนำเสนอสินค้านี้จะแสดงตรงนี้")}
              </span>
            )}
          </button>
        )}
      </div>

      {product.image && <PhotoCredit image={product.image} />}

      <div className="mt-4">
        <p className="text-xs font-bold text-[var(--muted)]">{product.brand} · {tr(product.category, l)}</p>
        <h2 className="display text-2xl font-black leading-tight">{tr(product.name, l)}</h2>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-xl font-black text-[var(--coral-dark)]">฿{product.priceThb}</span>
          <span className="flex items-center gap-1.5 text-sm font-bold"><Stars value={avg(reviews)} size={14} />{avg(reviews).toFixed(1)}</span>
        </div>
        <p className="mt-3 text-[15px] leading-6">{tr(product.blurb, l)}</p>
      </div>

      <Card className={`mt-4 border-l-[5px] ${fits ? "border-l-[var(--success)]" : "border-l-[var(--line)]"}`}>
        <p className="text-xs font-black uppercase tracking-wider text-[var(--muted)]">
          {fits ? t(`Why it fits ${state.dog.name}`, `ทำไมเหมาะกับ${state.dog.name}`) : t(`May not suit ${state.dog.name}`, `อาจไม่เหมาะกับ${state.dog.name}`)}
        </p>
        <p className="mt-1 text-sm leading-6">{fits ? tr(product.why, l) : t(`Made for ${product.sizes.join("/")} dogs, ${product.stages.map((s) => STAGE_LABEL[s].en).join("/")}.`, `ออกแบบสำหรับสุนัขขนาด ${product.sizes.join("/")} · ${product.stages.map((s) => STAGE_LABEL[s].th).join("/")}`)}</p>
        {product.caution && <p className="mt-2 text-sm leading-6 text-[var(--warning)]"><TriangleAlert size={14} className="mr-1 inline -translate-y-px" aria-hidden />{tr(product.caution, l)}</p>}
      </Card>

      <div className="mt-4">
        <Disclosure l={l} />
        <div className="mt-3">
          <AppButton variant="secondary" disabled>{t("Store link: add your affiliate URL", "ลิงก์ร้านค้า: ใส่ URL พันธมิตรที่นี่")}</AppButton>
        </div>
      </div>

      <SectionTitle>{t("Reviews", "รีวิวสินค้า")} ({reviews.length})</SectionTitle>
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
        <p className="font-black">{t("Review this product", "รีวิวสินค้านี้")}</p>
        <Stars value={rating} onChange={setRating} size={22} />
        <Field label={t("Your experience", "ประสบการณ์ของคุณ")}>
          <textarea className={`${inputClass} min-h-24 py-2`} value={text} maxLength={300} onChange={(e) => setText(e.target.value)} />
        </Field>
        <AppButton small disabled={!rating || !text.trim()} onClick={submit}>{t("Post review", "ส่งรีวิว")}</AppButton>
      </Card>
    </SlideIn>
  );
}
