"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  CircleAlert,
  Dog,
  Languages,
  PawPrint,
  Play,
  Receipt,
  ShoppingBag,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TastePrint } from "../product/TastePrint";

type Locale = "en" | "th";

const copy = {
  en: {
    navProblem: "Problem",
    navProduct: "Product",
    navProof: "Proof",
    navBusiness: "Business",
    prototype: "OPEN THE PRODUCT",
    mode: "90-second story",
    explore: "Explore evidence",
  },
  th: {
    navProblem: "ปัญหา",
    navProduct: "ผลิตภัณฑ์",
    navProof: "หลักฐาน",
    navBusiness: "ธุรกิจ",
    prototype: "เปิดต้นแบบ",
    mode: "เรื่องราว 90 วินาที",
    explore: "ดูหลักฐาน",
  },
};

function BrandHeader({
  locale,
  setLocale,
}: {
  locale: Locale;
  setLocale: (l: Locale) => void;
}) {
  const c = copy[locale];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)]/70 bg-[rgba(255,248,240,.9)] backdrop-blur-xl">
      <div className="mx-auto flex h-[70px] max-w-[1240px] items-center justify-between px-4 md:px-7">
        <a href="#top" aria-label="PawProud home">
          <Image
            src="/brand/pawproud-wordmark.webp"
            alt="PawProud"
            width={155}
            height={52}
            className="h-auto w-[126px] md:w-[145px]"
            priority
          />
        </a>
        <nav className="hidden items-center gap-7 text-sm font-bold text-[var(--muted)] md:flex">
          <a href="#problem">{c.navProblem}</a>
          <a href="#product">{c.navProduct}</a>
          <a href="#proof">{c.navProof}</a>
          <a href="#business">{c.navBusiness}</a>
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLocale(locale === "en" ? "th" : "en")}
            className="pressable flex h-11 items-center gap-1.5 rounded-2xl border border-[var(--line)] bg-white px-3 text-xs font-black"
          >
            <Languages size={15} />
            {locale === "en" ? "ไทย" : "EN"}
          </button>
          <Link
            href="/app/?demo=fresh"
            className="pressable hidden h-11 items-center gap-2 rounded-2xl bg-[var(--chocolate)] px-4 text-xs font-black text-white sm:flex"
          >
            {c.prototype}
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </header>
  );
}

function StoryTag({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[.16em] ${light ? "bg-white/12 text-white" : "bg-[#ffe3e7] text-[var(--coral-dark)]"}`}
    >
      <PawPrint size={13} />
      {children}
    </div>
  );
}

function BowlStillLife() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-2, 1, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[7%] top-[12%] h-[68%] w-[68%] rounded-full bg-[var(--soft)]"
      />
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="absolute right-[2%] top-[5%] w-[38%] rotate-6 rounded-[28px] border border-[var(--line)] bg-white p-4 shadow-soft"
      >
        <div className="h-3 w-20 rounded bg-[var(--coral)]" />
        <div className="mt-2 h-2 w-full rounded bg-[var(--line)]" />
        <div className="mt-2 h-2 w-3/4 rounded bg-[var(--line)]" />
        <ShoppingBag className="mt-5 text-[var(--coral-dark)]" size={34} />
      </motion.div>
      <div className="absolute bottom-[14%] left-[8%] right-[8%] h-[29%] rounded-[50%] border-[18px] border-[#e5c5aa] bg-[var(--chocolate)] shadow-[0_24px_0_#bd8c6b,0_34px_55px_rgba(75,40,28,.2)]">
        <span className="absolute inset-x-0 top-[30%] text-center text-4xl opacity-45">
          · · ·
        </span>
      </div>
      <motion.div
        animate={{ rotate: [-8, 6, -8], y: [0, -6, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[2%] right-[4%] grid h-24 w-24 place-items-center rounded-[30px] bg-white text-5xl shadow-soft"
      >
        <Receipt size={44} className="text-[var(--chocolate)]" />
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        className="absolute bottom-[39%] left-[33%] rounded-full bg-[var(--canvas)] px-4 py-2 text-xs font-black text-[var(--coral-dark)] shadow"
      >
        UNTouched
      </motion.div>
    </div>
  );
}

const Chain = ({ locale }: { locale: Locale }) => {
  const en = [
    "Choose from labels & reviews",
    "Buy a full pack",
    "Dog refuses or eats inconsistently",
    "Change everything together",
    "Learn nothing",
    "Guess again",
  ];
  const th = [
    "เลือกจากฉลากและรีวิว",
    "ซื้อถุงใหญ่",
    "น้องไม่กินหรือกินไม่สม่ำเสมอ",
    "เปลี่ยนหลายอย่างพร้อมกัน",
    "ไม่ได้เรียนรู้อะไร",
    "เดาใหม่อีกครั้ง",
  ];
  const steps = locale === "en" ? en : th;
  return (
    <div className="relative mt-10 grid gap-3 md:grid-cols-6">
      {steps.map((s, i) => (
        <motion.div
          key={s}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.09 }}
          className={`relative min-h-[116px] rounded-[24px] p-4 ${i === 5 ? "bg-[var(--coral-dark)] text-white" : "border border-[var(--line)] bg-white"}`}
        >
          <span
            className={`text-xs font-black ${i === 5 ? "text-white/60" : "text-[var(--coral-dark)]"}`}
          >
            0{i + 1}
          </span>
          <p className="mt-5 text-sm font-black leading-5">{s}</p>
          {i < 5 && (
            <ArrowRight
              className="absolute -bottom-5 left-1/2 z-10 -translate-x-1/2 rotate-90 rounded-full bg-[var(--canvas)] p-1 text-[var(--muted)] md:-right-5 md:bottom-auto md:left-auto md:top-1/2 md:translate-x-0 md:-translate-y-1/2 md:rotate-0"
              size={28}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

function ObserveFlow({ locale }: { locale: Locale }) {
  const items =
    locale === "en"
      ? [
          ["Safety", "Is today normal?"],
          ["Taste", "Two small comparisons"],
          ["Observe", "Approach, choice, intake"],
          ["Explain", "AI makes it understandable"],
        ]
      : [
          ["Safety", "วันนี้ปกติไหม"],
          ["Taste", "เปรียบเทียบสองตัวเลือก"],
          ["Observe", "การเข้าหา การเลือก ปริมาณ"],
          ["Explain", "AI ช่วยอธิบายให้เข้าใจง่าย"],
        ];
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map(([a, b], i) => (
        <motion.div
          key={a}
          whileHover={{ y: -5, rotate: i % 2 ? 1 : -1 }}
          className="rounded-[26px] border border-[var(--line)] bg-white p-5 shadow-[0_10px_30px_rgba(86,44,28,.08)]"
        >
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--soft)] text-[var(--coral-dark)] font-black">
            {i + 1}
          </span>
          <p className="mt-5 text-lg font-black">{a}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">{b}</p>
        </motion.div>
      ))}
    </div>
  );
}

function Funnel({ locale }: { locale: Locale }) {
  const steps =
    locale === "en"
      ? [
          ["FREE", "Taste Trial"],
          ["LEARN", "TastePrint"],
          ["PAID ONCE", "First Bowl"],
          ["PROOF", "Meal Check-in"],
          ["OPTIONAL", "Subscription"],
        ]
      : [
          ["ฟรี", "Taste Trial"],
          ["เรียนรู้", "TastePrint"],
          ["จ่ายครั้งเดียว", "First Bowl"],
          ["พิสูจน์", "เช็กมื้ออาหาร"],
          ["ทางเลือก", "Subscription"],
        ];
  return (
    <div className="mt-9 flex flex-col items-stretch gap-2 md:flex-row md:items-center">
      {steps.map(([a, b], i) => (
        <div className="contents" key={b}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.09 }}
            className={`flex-1 rounded-[24px] border p-4 text-center ${i === 2 ? "border-[var(--coral-dark)] bg-[var(--coral-dark)] text-white shadow-[0_16px_36px_rgba(216,58,79,.25)]" : "border-[var(--line)] bg-white"}`}
          >
            <span
              className={`text-[9px] font-black tracking-[.14em] ${i === 2 ? "text-white/65" : "text-[var(--coral-dark)]"}`}
            >
              {a}
            </span>
            <p className="mt-1 text-sm font-black">{b}</p>
          </motion.div>
          {i < steps.length - 1 && (
            <ArrowRight
              className="mx-auto rotate-90 text-[var(--muted)] md:rotate-0"
              size={19}
            />
          )}
        </div>
      ))}
    </div>
  );
}

const EvidenceCard = ({
  number,
  label,
  note,
  href,
}: {
  number: string;
  label: string;
  note: string;
  href: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="pressable group rounded-[28px] border border-[var(--line)] bg-white p-5 hover:-translate-y-1 hover:shadow-soft"
  >
    <p className="display text-[34px] font-black text-[var(--coral-dark)]">
      {number}
    </p>
    <p className="mt-2 font-black leading-5">{label}</p>
    <p className="mt-3 text-xs leading-5 text-[var(--muted)]">{note}</p>
    <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-black text-[var(--trust)]">
      SOURCE{" "}
      <ArrowRight
        size={12}
        className="transition-transform group-hover:translate-x-1"
      />
    </span>
  </a>
);

export function StoryExperience() {
  const [locale, setLocale] = useState<Locale>("en");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const dogY = useTransform(heroProgress, [0, 1], [0, 150]);
  const c = copy[locale];
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return (
    <div className={locale === "th" ? "thai" : ""}>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-[var(--coral)]"
        style={{ scaleX: progress }}
      />
      <BrandHeader locale={locale} setLocale={setLocale} />

      <section
        ref={heroRef}
        id="top"
        className="noise relative min-h-screen overflow-hidden px-4 pb-16 pt-28 md:px-8 md:pt-32"
      >
        <div className="mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <StoryTag>
              {locale === "en" ? "Try before you subscribe" : "ลองก่อนสมัคร"}
            </StoryTag>
            <h1 className="display balanced mt-6 max-w-[790px] text-[52px] leading-[.96] font-black sm:text-[68px] lg:text-[82px]">
              {locale === "en" ? (
                <>
                  The payer chooses.
                  <br />
                  <span className="text-[var(--coral-dark)]">
                    The real user
                  </span>
                  <br />
                  answers too late.
                </>
              ) : (
                <>
                  คนจ่ายเป็นคนเลือก
                  <br />
                  <span className="text-[var(--coral-dark)]">
                    แต่ผู้ใช้จริง
                  </span>
                  <br />
                  ได้ตอบช้าเกินไป
                </>
              )}
            </h1>
            <p className="mt-6 max-w-[620px] text-lg leading-8 text-[var(--muted)]">
              {locale === "en"
                ? "A full bag is already home. Mochi’s bowl is still untouched. PawProud lets the dog answer before the commitment."
                : "ถุงใหญ่อยู่ที่บ้านแล้ว แต่ชามของโมจิยังไม่ถูกแตะ PawProud ให้น้องได้ตอบก่อนตัดสินใจผูกมัด"}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/app/?demo=fresh"
                className="pressable flex min-h-14 items-center justify-center gap-2 rounded-[18px] bg-[var(--coral-dark)] px-6 font-black text-white shadow-[0_14px_30px_rgba(216,58,79,.25)]"
              >
                {locale === "en" ? "Let Mochi answer" : "ให้โมจิตอบ"}
                <ArrowRight size={19} />
              </Link>
              <a
                href="#problem"
                className="pressable flex min-h-14 items-center justify-center gap-2 rounded-[18px] border-2 border-[var(--chocolate)] bg-white px-6 font-black"
              >
                <Play size={17} />
                {c.mode}
              </a>
            </div>
            <p className="mt-5 text-xs font-semibold text-[var(--muted)]">
              {locale === "en"
                ? "Interactive concept · EN/TH · live AI feedback with fallback · simulated commerce"
                : "ต้นแบบโต้ตอบ · EN/TH · AI feedback พร้อม fallback · การซื้อขายจำลอง"}
            </p>
          </motion.div>
          <motion.div style={{ y: dogY }} className="relative">
            <BowlStillLife />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.75, type: "spring" }}
              className="absolute bottom-[3%] left-[3%] max-w-[210px] rounded-[24px] bg-[var(--chocolate)] p-4 text-white shadow-soft"
            >
              <p className="text-[10px] font-black uppercase tracking-[.14em] text-white/55">
                THE MISSED SIGNAL
              </p>
              <p className="mt-2 text-sm font-bold">
                {locale === "en"
                  ? "The purchase happened before the evidence."
                  : "การซื้อเกิดขึ้นก่อนมีหลักฐาน"}
              </p>
            </motion.div>
          </motion.div>
        </div>
        <a
          href="#problem"
          className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[var(--muted)]"
        >
          <ArrowDown className="animate-bob" />
        </a>
      </section>

      <section id="problem" className="px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div>
              <StoryTag>
                01 · {locale === "en" ? "The chain problem" : "ปัญหาแบบลูกโซ่"}
              </StoryTag>
              <h2 className="display balanced mt-5 text-5xl leading-[1.02] font-black md:text-6xl">
                {locale === "en" ? (
                  <>
                    It isn’t simply{" "}
                    <span className="text-[var(--coral-dark)]">
                      “food boredom.”
                    </span>
                  </>
                ) : (
                  <>
                    ไม่ใช่แค่
                    <span className="text-[var(--coral-dark)]">
                      {" "}
                      “เบื่ออาหาร”
                    </span>
                  </>
                )}
              </h2>
            </div>
            <p className="text-lg leading-8 text-[var(--muted)]">
              {locale === "en"
                ? "The deeper failure is buying before knowing, then changing several things at once—creating another purchase without creating knowledge."
                : "ปัญหาที่ลึกกว่าคือเราต้องซื้อก่อนรู้ แล้วเปลี่ยนหลายอย่างพร้อมกัน จึงเกิดการซื้อครั้งใหม่โดยไม่ได้เกิดความรู้ใหม่"}
            </p>
          </div>
          <Chain locale={locale} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 grid overflow-hidden rounded-[30px] bg-[var(--chocolate)] text-white md:grid-cols-[.4fr_.6fr]"
          >
            <div className="p-6 md:p-9">
              <p className="display text-6xl font-black text-[var(--honey)]">
                60.1%
              </p>
              <p className="mt-2 text-lg font-black">
                {locale === "en" ? "selected palatability" : "เลือกความน่ากิน"}
              </p>
            </div>
            <div className="border-t border-white/10 p-6 md:border-l md:border-t-0 md:p-9">
              <p className="leading-7 text-white/75">
                {locale === "en"
                  ? "In an online survey of 411 Thai dog owners, palatability was the most-selected purchase factor. Owners care—but still predict before their dog responds."
                  : "จากแบบสำรวจออนไลน์เจ้าของสุนัขไทย 411 คน ความน่ากินเป็นปัจจัยที่ถูกเลือกมากที่สุด เจ้าของใส่ใจ แต่ยังต้องคาดเดาก่อนน้องตอบ"}
              </p>
              <p className="mt-3 text-[11px] leading-5 text-white/45">
                {locale === "en"
                  ? "Multi-select sample, skewed younger and female. Not national prevalence or subscription demand."
                  : "ตัวอย่างแบบหลายคำตอบ เอนเอียงไปทางคนอายุน้อยและผู้หญิง ไม่ใช่อัตราระดับประเทศหรือความต้องการสมัครสมาชิก"}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="product"
        className="relative overflow-hidden bg-[var(--chocolate)] px-4 py-24 text-white md:px-8 md:py-32"
      >
        <div className="absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-[var(--coral)]/15" />
        <div className="relative mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <StoryTag light>
              02 · {locale === "en" ? "Reverse the order" : "กลับลำดับ"}
            </StoryTag>
            <h2 className="display balanced mt-5 text-5xl leading-[1.02] font-black md:text-7xl">
              {locale === "en" ? (
                <>
                  Try first.
                  <br />
                  Learn once.
                  <br />
                  <span className="text-[var(--honey)]">
                    Commit after evidence.
                  </span>
                </>
              ) : (
                <>
                  ลองก่อน
                  <br />
                  เรียนรู้ก่อน
                  <br />
                  <span className="text-[var(--honey)]">แล้วค่อยตัดสินใจ</span>
                </>
              )}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/68">
              {locale === "en"
                ? "The owner records what the dog approaches, chooses, and eats. PawProud separates observation from interpretation—and makes the unknown visible."
                : "เจ้าของบันทึกว่าน้องเข้าหา เลือก และกินอะไร PawProud แยกข้อสังเกตออกจากการตีความ และแสดงสิ่งที่ยังไม่รู้"}
            </p>
            <Link
              href="/app/?demo=fresh"
              className="pressable mt-8 inline-flex min-h-14 items-center gap-2 rounded-[18px] bg-white px-6 font-black text-[var(--chocolate)]"
            >
              {locale === "en"
                ? "Enough promises. Let Mochi answer."
                : "พอแล้วกับคำสัญญา ให้โมจิตอบ"}
              <ArrowRight size={18} />
            </Link>
          </div>
          <ObserveFlow locale={locale} />
        </div>
        <div className="relative mx-auto mt-16 max-w-[1240px] rounded-[22px] border border-white/15 bg-white/6 p-4 text-xs leading-5 text-white/55">
          <strong className="text-white">
            {locale === "en" ? "Prototype truth:" : "ความจริงของต้นแบบ:"}
          </strong>{" "}
          {locale === "en"
            ? "Mochi’s response and TastePrint logic are simulated. A commercial service would require validated physical samples, nutrition review, QA and traceability."
            : "ปฏิกิริยาของโมจิและตรรกะ TastePrint เป็นการจำลอง บริการจริงต้องมีตัวอย่างอาหารที่ผ่านการตรวจ โภชนาการ QA และการติดตามย้อนกลับ"}
        </div>
      </section>

      <section id="proof" className="px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div className="relative rounded-[36px] border border-[var(--line)] bg-white p-6 shadow-soft">
            <TastePrint locale={locale} />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-5 rounded-[22px] bg-[var(--soft)] p-4 text-sm leading-6 text-[var(--muted)]"
            >
              <strong className="text-[var(--ink)]">
                {locale === "en" ? "Observed:" : "สังเกตพบ:"}
              </strong>{" "}
              {locale === "en"
                ? "Mochi approached salmon aroma first and ate more in this simulated trial."
                : "โมจิเข้าหากลิ่นแซลมอนก่อนและกินมากกว่าในการทดลองจำลองนี้"}
            </motion.div>
          </div>
          <div>
            <StoryTag>
              03 ·{" "}
              {locale === "en"
                ? "Honest personalisation"
                : "Personalisation ที่ซื่อสัตย์"}
            </StoryTag>
            <h2 className="display balanced mt-5 text-5xl leading-[1.02] font-black md:text-7xl">
              {locale === "en" ? (
                <>
                  Show the evidence.
                  <br />
                  <span className="text-[var(--coral-dark)]">
                    Never fake certainty.
                  </span>
                </>
              ) : (
                <>
                  แสดงหลักฐาน
                  <br />
                  <span className="text-[var(--coral-dark)]">
                    ไม่สร้างความมั่นใจปลอม
                  </span>
                </>
              )}
            </h2>
            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
              {locale === "en"
                ? "TastePrint illuminates only what the observation supports. AI explains the structured result in plain language; it never invents the preference, diagnoses disease, or changes safety state."
                : "TastePrint แสดงเฉพาะสิ่งที่มีข้อสังเกตรองรับ AI ช่วยอธิบายผลอย่างเข้าใจง่าย โดยไม่สร้างความชอบ วินิจฉัยโรค หรือเปลี่ยนสถานะความปลอดภัย"}
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[22px] bg-[var(--mint)] p-4">
                <Check className="text-[var(--success)]" />
                <p className="mt-4 font-black">
                  {locale === "en" ? "What it may suggest" : "สิ่งที่อาจบอกได้"}
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {locale === "en"
                    ? "An early sensory signal"
                    : "สัญญาณประสาทสัมผัสเบื้องต้น"}
                </p>
              </div>
              <div className="rounded-[22px] bg-[#fff0e6] p-4">
                <X className="text-[var(--danger)]" />
                <p className="mt-4 font-black">
                  {locale === "en"
                    ? "What it cannot prove"
                    : "สิ่งที่ยังยืนยันไม่ได้"}
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {locale === "en"
                    ? "Allergy, nutrition, diagnosis"
                    : "อาการแพ้ โภชนาการ การวินิจฉัย"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="business"
        className="bg-[#ffe9df] px-4 py-24 md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-[1240px]">
          <div className="max-w-4xl">
            <StoryTag>
              04 ·{" "}
              {locale === "en" ? "Earn the repeat" : "สร้างสิทธิ์ในการซื้อซ้ำ"}
            </StoryTag>
            <h2 className="display balanced mt-5 text-5xl leading-[1.02] font-black md:text-7xl">
              {locale === "en" ? (
                <>
                  The first paid moment is{" "}
                  <span className="text-[var(--coral-dark)]">one bowl.</span>
                  <br />
                  Not a commitment.
                </>
              ) : (
                <>
                  รายได้แรกคือ
                  <span className="text-[var(--coral-dark)]">หนึ่งชาม</span>
                  <br />
                  ไม่ใช่การผูกมัด
                </>
              )}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              {locale === "en"
                ? "PawProud makes subscription a reward for proven acceptance—not the price of discovering whether the food works."
                : "PawProud ทำให้ Subscription เป็นผลจากการยอมรับที่พิสูจน์แล้ว ไม่ใช่ราคาที่ต้องจ่ายเพื่อค้นหาว่าอาหารใช้ได้หรือไม่"}
            </p>
          </div>
          <Funnel locale={locale} />
          <div className="mt-8 rounded-[28px] bg-white p-6 text-center shadow-soft">
            <p className="display text-3xl font-black text-[var(--coral-dark)]">
              {locale === "en"
                ? "No subscription before acceptance."
                : "ไม่มี Subscription ก่อนยืนยันการยอมรับ"}
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <StoryTag>
              05 ·{" "}
              {locale === "en" ? "Care with memory" : "การดูแลที่มีความทรงจำ"}
            </StoryTag>
            <h2 className="display balanced mt-5 text-5xl leading-[1.02] font-black md:text-7xl">
              {locale === "en" ? (
                <>
                  One meal is the wedge.
                  <br />
                  <span className="text-[var(--coral-dark)]">
                    Continuity is the platform.
                  </span>
                </>
              ) : (
                <>
                  หนึ่งมื้อคือจุดเริ่ม
                  <br />
                  <span className="text-[var(--coral-dark)]">
                    ความต่อเนื่องคือแพลตฟอร์ม
                  </span>
                </>
              )}
            </h2>
            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
              {locale === "en"
                ? "Care Passport keeps identity, TastePrint, trials, meals, owner notes, delivery state, and safety observations together—under the owner’s control."
                : "Care Passport เก็บข้อมูลตัวตน TastePrint การทดลอง มื้ออาหาร บันทึกเจ้าของ การจัดส่ง และข้อสังเกตด้านความปลอดภัยไว้ด้วยกัน โดยเจ้าของเป็นผู้ควบคุม"}
            </p>
            <Link
              href="/app/?demo=fresh"
              className="pressable mt-8 inline-flex min-h-14 items-center gap-2 rounded-[18px] bg-[var(--chocolate)] px-6 font-black text-white"
            >
              {locale === "en"
                ? "Open the Care Passport"
                : "เปิด Care Passport"}
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="relative rounded-[34px] bg-[var(--chocolate)] p-5 text-white shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <StoryTag light>CARE PASSPORT</StoryTag>
                <p className="display mt-3 text-3xl font-black">Mochi</p>
              </div>
              <Dog size={52} />
            </div>
            <div className="relative mt-7 pl-10">
              <div className="absolute bottom-3 left-4 top-3 w-1 rounded-full bg-gradient-to-b from-[var(--coral)] via-[var(--honey)] to-[#71c8a6]" />
              {[
                ["Taste Trial", "Owner report"],
                ["TastePrint", "Early signal"],
                ["First Bowl", "One-time"],
                ["Meal check-in", "Accepted"],
              ].map(([a, b], i) => (
                <motion.div
                  key={a}
                  initial={{ opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative mb-3 rounded-[20px] bg-white/10 p-4"
                >
                  <span className="absolute -left-[33px] top-4 grid h-7 w-7 place-items-center rounded-full bg-white text-[var(--coral-dark)]">
                    <PawPrint size={14} />
                  </span>
                  <p className="font-black">{a}</p>
                  <p className="mt-1 text-xs text-white/55">{b}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-[20px] border border-dashed border-white/25 p-4 text-sm text-white/50">
                HomeReady
                <br />
                <span className="text-[9px] font-black tracking-wider">
                  FUTURE CONCEPT
                </span>
              </div>
              <div className="rounded-[20px] border border-dashed border-white/25 p-4 text-sm text-white/50">
                Emergency
                <br />
                <span className="text-[9px] font-black tracking-wider">
                  FUTURE CONCEPT
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
            <div>
              <StoryTag>
                06 · {locale === "en" ? "Category context" : "บริบทตลาด"}
              </StoryTag>
              <h2 className="display mt-5 text-5xl leading-[1.02] font-black md:text-6xl">
                {locale === "en"
                  ? "Big enough to matter. Small enough to prove honestly."
                  : "ใหญ่พอที่จะสำคัญ เล็กพอที่จะพิสูจน์อย่างซื่อสัตย์"}
              </h2>
            </div>
            <p className="text-lg leading-8 text-[var(--muted)]">
              {locale === "en"
                ? "These figures show category relevance—not PawProud demand. The first real market proof must come from owner–dog behavior in a pilot."
                : "ตัวเลขเหล่านี้แสดงความสำคัญของหมวดหมู่ ไม่ใช่ Demand ของ PawProud หลักฐานตลาดจริงต้องมาจากพฤติกรรมเจ้าของและสุนัขใน Pilot"}
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <EvidenceCard
              number="60.1%"
              label="Selected palatability"
              note="Thai dog-owner survey, n=411; multi-select, not national prevalence."
              href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12668747/"
            />
            <EvidenceCard
              number="6.656m"
              label="Dog-owning households"
              note="Thailand 2025 estimate; category context, not customers."
              href="https://agriculture.canada.ca/en/international-trade/reports-and-guides/sector-trend-analysis-pet-food-thailand"
            />
            <EvidenceCard
              number="US$988.4m"
              label="Dog-food retail sales"
              note="Thailand 2025 estimate; category ceiling, not PawProud TAM."
              href="https://agriculture.canada.ca/en/international-trade/reports-and-guides/sector-trend-analysis-pet-food-thailand"
            />
            <EvidenceCard
              number="≈805k"
              label="Bangkok dog households"
              note="Calculated geographic base; not SAM, demand or revenue."
              href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12070910/"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1240px]">
          <div className="rounded-[38px] bg-[var(--chocolate)] p-6 text-white md:p-10">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <StoryTag light>
                  {locale === "en" ? "Prototype truth" : "ความจริงของต้นแบบ"}
                </StoryTag>
                <h2 className="display mt-5 text-4xl font-black md:text-5xl">
                  {locale === "en"
                    ? "A practical test—not a claim that fulfilment exists."
                    : "การทดสอบประสบการณ์ ไม่ใช่การอ้างว่าระบบจริงพร้อมแล้ว"}
                </h2>
              </div>
              <div className="space-y-3">
                {[
                  ["WORKING", "Navigation, EN/TH, forms, state, visualisation"],
                  ["LIVE WHEN AVAILABLE", "AI feedback with safe fallback"],
                  [
                    "SIMULATED",
                    "Mochi response, TastePrint, payment, delivery",
                  ],
                  [
                    "FUTURE CONCEPT",
                    "Professional sharing, HomeReady, emergency",
                  ],
                ].map(([a, b], i) => (
                  <div
                    key={a}
                    className="flex gap-3 rounded-[20px] bg-white/8 p-4"
                  >
                    <span
                      className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${i < 2 ? "bg-[#71c8a6] text-[var(--chocolate)]" : "bg-white/15 text-white"}`}
                    >
                      {i < 2 ? <Check size={14} /> : <CircleAlert size={14} />}
                    </span>
                    <div>
                      <p className="text-[10px] font-black tracking-[.13em] text-white/50">
                        {a}
                      </p>
                      <p className="mt-1 text-sm font-bold">{b}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--coral-dark)] px-4 py-24 text-white md:px-8 md:py-32">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full border-[70px] border-white/5" />
        <div className="relative mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
          <div>
            <StoryTag light>
              {locale === "en" ? "The next proof" : "หลักฐานถัดไป"}
            </StoryTag>
            <h2 className="display balanced mt-5 text-5xl leading-[1.02] font-black md:text-7xl">
              {locale === "en"
                ? "One bowl earns trust. Trust earns the right to serve the next one."
                : "หนึ่งชามสร้างความไว้ใจ และความไว้ใจสร้างสิทธิ์ให้เราเสิร์ฟชามถัดไป"}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
              {locale === "en"
                ? "Next: a 30–50 owner–dog feasibility pilot measuring completion, acceptance, safety load, First Bowl conversion, leftover change, and voluntary repeat use."
                : "ขั้นต่อไปคือ Pilot เจ้าของ–สุนัข 30–50 คู่ วัดการทำจบ การยอมรับ ภาระด้านความปลอดภัย Conversion ของ First Bowl ปริมาณอาหารเหลือ และการกลับมาใช้โดยสมัครใจ"}
            </p>
          </div>
          <div className="rounded-[32px] bg-white p-6 text-[var(--ink)] shadow-soft">
            <Image
              src="/brand/pawproud-mascot-logo.webp"
              alt="PawProud mascot waving"
              width={320}
              height={320}
              className="mx-auto w-[240px]"
            />
            <Link
              href="/app/?demo=fresh"
              className="pressable flex min-h-16 items-center justify-center gap-2 rounded-[20px] bg-[var(--chocolate)] px-6 text-center font-black text-white"
            >
              {locale === "en"
                ? "Try the complete Mochi flow"
                : "ทดลอง Flow ของโมจิทั้งหมด"}
              <ArrowRight size={19} />
            </Link>
            <p className="mt-3 text-center text-xs text-[var(--muted)]">
              {locale === "en"
                ? "About 3 minutes · state saves locally"
                : "ประมาณ 3 นาที · บันทึกสถานะในเครื่อง"}
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-[var(--chocolate)] px-4 py-8 text-white">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-4 sm:flex-row">
          <Image
            src="/brand/pawproud-wordmark.webp"
            alt="PawProud"
            width={140}
            height={48}
            className="h-auto w-[125px] brightness-0 invert"
          />
          <p className="text-xs text-white/45">
            U-Hackathon concept prototype · October 2026
          </p>
          <a href="#top" className="text-xs font-black">
            BACK TO TOP ↑
          </a>
        </div>
      </footer>

      <Link
        href="/app/?demo=fresh"
        className="pressable fixed bottom-4 right-4 z-40 flex h-14 items-center gap-2 rounded-full bg-[var(--coral-dark)] px-5 text-sm font-black text-white shadow-[0_14px_35px_rgba(90,34,30,.3)] md:hidden"
      >
        {locale === "en" ? "Try with Mochi" : "ลองกับโมจิ"}
        <ArrowRight size={17} />
      </Link>
    </div>
  );
}
