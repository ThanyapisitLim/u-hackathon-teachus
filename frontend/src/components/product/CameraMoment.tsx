"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Camera,
  CameraOff,
  Check,
  Drumstick,
  Fish,
  Focus,
  PawPrint,
  RotateCcw,
  ScanLine,
  ShieldCheck,
} from "lucide-react";

type Locale = "en" | "th";
type CameraState = "idle" | "opening" | "live" | "processing" | "ready";

const copy = {
  en: {
    eyebrow: "Taste observation",
    title: "Capture the first reaction",
    intro: "Frame your dog with both bowls. This quick moment helps you remember what happened.",
    prototype: "Prototype camera",
    open: "Open camera",
    opening: "Opening camera",
    openingDetail: "Preparing the viewfinder",
    live: "Keep your dog and both bowls inside the guide.",
    capture: "Capture moment",
    capturing: "Capturing",
    processing: "Preparing observation",
    processingDetail: "Preparing the preview for today’s taste trial.",
    ready: "Preview ready",
    readyDetail: "Review the simulated preview, then continue.",
    usePhoto: "Continue with preview",
    retake: "Try again",
    skip: "Continue without a photo",
    privacy: "This prototype uses a sample view. No photo is taken or uploaded.",
    statusIdle: "Prototype camera has not been opened",
    statusOpening: "Prototype camera is opening",
    statusLive: "Prototype camera is ready",
    statusProcessing: "Preparing the observation",
    statusReady: "Prototype preview is ready",
  },
  th: {
    eyebrow: "สังเกตมื้อทดลอง",
    title: "เก็บภาพปฏิกิริยาแรก",
    intro: "จัดภาพให้น้องอยู่กับชามทั้งสองใบ เพื่อช่วยจำสิ่งที่เกิดขึ้นก่อนบันทึกรายละเอียด",
    prototype: "กล้องต้นแบบ",
    open: "เปิดกล้อง",
    opening: "กำลังเปิดกล้อง",
    openingDetail: "กำลังเตรียมช่องมองภาพ",
    live: "ให้น้องและชามทั้งสองใบอยู่ในกรอบ",
    capture: "ถ่ายภาพนี้",
    capturing: "กำลังถ่าย",
    processing: "กำลังเตรียมบันทึก",
    processingDetail: "กำลังเตรียมภาพตัวอย่างสำหรับมื้อทดลองวันนี้",
    ready: "ตัวอย่างพร้อมแล้ว",
    readyDetail: "ตรวจดูภาพจำลอง แล้วไปต่อได้เลย",
    usePhoto: "ทำต่อด้วยภาพตัวอย่าง",
    retake: "ลองอีกครั้ง",
    skip: "ทำต่อโดยไม่ถ่ายภาพ",
    privacy: "กล้องต้นแบบใช้ภาพตัวอย่าง จึงไม่มีการถ่ายหรืออัปโหลดภาพจริง",
    statusIdle: "ยังไม่ได้เปิดกล้องต้นแบบ",
    statusOpening: "กำลังเปิดกล้องต้นแบบ",
    statusLive: "กล้องต้นแบบพร้อมใช้งาน",
    statusProcessing: "กำลังเตรียมบันทึก",
    statusReady: "ภาพตัวอย่างของกล้องต้นแบบพร้อมแล้ว",
  },
} satisfies Record<Locale, Record<string, string>>;

function delay(milliseconds: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds));
}

function CameraScene({ live, reduceMotion }: { live: boolean; reduceMotion: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(165deg,#9ed9ef_0%,#d7eff7_38%,#f4d5b2_38%,#dca97a_100%)]">
      <motion.div
        aria-hidden="true"
        className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-white/28 blur-2xl"
        animate={live && !reduceMotion ? { x: [0, 16, 0], y: [0, 10, 0] } : undefined}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-5 h-[310px] w-[310px] -translate-x-1/2"
        animate={live && !reduceMotion ? { y: [0, -5, 0], rotate: [-0.7, 0.8, -0.7] } : undefined}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/brand/pawproud-mascot-logo.webp"
          alt=""
          fill
          preload
          sizes="310px"
          className="object-cover object-top [clip-path:inset(0_0_29%_0)]"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute -bottom-10 left-1/2 h-40 w-[118%] -translate-x-1/2 bg-[#bb7f50] shadow-[inset_0_18px_34px_rgba(92,50,28,.18)]"
        style={{ borderRadius: "50% 50% 0 0 / 28% 28% 0 0" }}
      />
      {[
        { side: "left-[18%]", tone: "bg-[var(--honey)] text-[var(--chocolate)]", Icon: Drumstick },
        { side: "right-[15%]", tone: "bg-[#DCEEF9] text-[#285A79]", Icon: Fish },
      ].map(({ side, tone, Icon }, index) => (
        <motion.div
          key={side}
          aria-hidden="true"
          className={`absolute bottom-5 h-[92px] w-[128px] ${side}`}
          animate={live && !reduceMotion ? { y: index ? [-1, 2, -1] : [0, -2, 0] } : undefined}
          transition={{ duration: index ? 2.9 : 2.7, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-x-0 bottom-0 h-[54px] rounded-[50%] bg-[#fff4dd] shadow-[0_14px_24px_rgba(83,45,25,.28),inset_0_-10px_0_#dfc39b]" />
          <span className={`absolute left-1/2 top-[49px] grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full shadow-sm ${tone}`}>
            <Icon size={20} strokeWidth={2.4} />
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export function CameraMoment({
  locale,
  onContinue,
  onSkip,
}: {
  locale: Locale;
  onContinue: () => void;
  onSkip: () => void;
}) {
  const c = copy[locale];
  const reduceMotion = Boolean(useReducedMotion());
  const [cameraState, setCameraState] = useState<CameraState>("idle");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  const runRef = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      runRef.current += 1;
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (cameraState !== "opening") return;
    const frame = window.requestAnimationFrame(() => {
      stageRef.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [cameraState, reduceMotion]);

  const openCamera = useCallback(() => {
    runRef.current += 1;
    clearTimers();
    setCountdown(null);
    setFlash(false);
    setCameraState("opening");
    const timer = window.setTimeout(
      () => setCameraState("live"),
      reduceMotion ? 120 : 680,
    );
    timersRef.current.push(timer);
  }, [clearTimers, reduceMotion]);

  const beginCapture = useCallback(async () => {
    if (countdown !== null) return;
    const runId = runRef.current + 1;
    runRef.current = runId;
    const beat = 900;

    for (const number of [3, 2, 1]) {
      if (runId !== runRef.current) return;
      setCountdown(number);
      await delay(beat);
    }

    if (runId !== runRef.current) return;
    setCountdown(null);
    setFlash(true);
    await delay(reduceMotion ? 80 : 170);
    if (runId !== runRef.current) return;
    setFlash(false);
    setCameraState("processing");
    const timer = window.setTimeout(
      () => setCameraState("ready"),
      1400,
    );
    timersRef.current.push(timer);
  }, [countdown, reduceMotion]);

  const handleSkip = useCallback(() => {
    runRef.current += 1;
    clearTimers();
    onSkip();
  }, [clearTimers, onSkip]);

  const status = {
    idle: c.statusIdle,
    opening: c.statusOpening,
    live: c.statusLive,
    processing: c.statusProcessing,
    ready: c.statusReady,
  }[cameraState];

  return (
    <section
      className={`relative -mx-4 min-h-[calc(100svh-9rem)] overflow-hidden px-4 pb-5 ${locale === "th" ? "thai" : ""}`}
      aria-labelledby="camera-moment-title"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 top-4 h-72 w-72 rounded-full bg-[var(--honey)]/24 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-72 h-80 w-80 rounded-full bg-[var(--coral)]/15 blur-3xl" />

      <header className="relative px-1 pt-1">
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-xs font-extrabold text-[var(--coral-dark)]">
            <PawPrint size={15} aria-hidden="true" />
            {c.eyebrow}
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--ink)] px-3 py-1.5 text-[10px] font-extrabold tracking-wide text-white uppercase">
            <Focus size={13} aria-hidden="true" />
            {c.prototype}
          </span>
        </div>
        <h1 id="camera-moment-title" className="display mt-2 max-w-[350px] text-[36px] font-bold leading-[.98] text-[var(--ink)]">
          {c.title}
        </h1>
        <p className="mt-3 max-w-[360px] text-[15px] font-semibold leading-6 text-[var(--muted)]">{c.intro}</p>
      </header>

      <p className="sr-only" role="status" aria-live="polite">{status}</p>

      <div
        ref={stageRef}
        className="relative mt-5 min-h-[418px] scroll-mt-[72px]"
      >
        <AnimatePresence mode="wait">
          {cameraState === "idle" && (
            <motion.div
              key="idle"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
              className="relative mx-auto h-[400px] w-full max-w-[398px]"
            >
              <motion.div
                aria-hidden="true"
                className="absolute inset-x-1 top-1 h-[346px] bg-[linear-gradient(145deg,#fff5df,#ffe3d9_54%,#ffd1c5)] shadow-[0_28px_60px_rgba(102,50,35,.16)]"
                style={{ borderRadius: "46% 54% 42% 58% / 39% 43% 57% 61%" }}
                animate={reduceMotion ? undefined : { rotate: [-1.2, 0.8, -1.2], scale: [1, 1.012, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute bottom-6 left-1/2 h-[300px] w-[300px] -translate-x-1/2"
                animate={reduceMotion ? undefined : { y: [0, -7, 0], rotate: [-1, 1, -1] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image src="/brand/pawproud-mascot-logo.webp" alt="" fill preload sizes="300px" className="object-contain" />
              </motion.div>
              <span aria-hidden="true" className="absolute right-5 top-12 grid h-16 w-16 place-items-center rounded-full bg-white text-[var(--coral-dark)] shadow-[0_12px_28px_rgba(102,50,35,.14)]">
                <Camera size={29} strokeWidth={2.3} />
              </span>
              <div className="absolute inset-x-4 bottom-0 flex justify-center">
                <button type="button" onClick={openCamera} className="pressable inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[var(--ink)] px-7 text-[15px] font-extrabold text-white shadow-[0_16px_34px_rgba(70,34,24,.22)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--coral-dark)]">
                  <Camera size={21} aria-hidden="true" />
                  {c.open}
                </button>
              </div>
            </motion.div>
          )}

          {cameraState === "opening" && (
            <motion.div
              key="opening"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative mx-auto grid h-[400px] w-full max-w-[398px] place-items-center overflow-hidden bg-[var(--ink)] text-white shadow-[0_26px_58px_rgba(63,33,24,.22)]"
              style={{ borderRadius: "38px 38px 74px 38px" }}
            >
              <CameraScene live={false} reduceMotion={reduceMotion} />
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 bg-[var(--ink)]"
                animate={reduceMotion ? { opacity: 0.64 } : { clipPath: ["circle(0% at 50% 50%)", "circle(16% at 50% 50%)", "circle(75% at 50% 50%)"] }}
                transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="relative text-center">
                <motion.span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/15 backdrop-blur-md" animate={reduceMotion ? undefined : { scale: [1, 1.1, 1] }} transition={{ duration: 0.85, repeat: Infinity }}>
                  <ScanLine size={30} aria-hidden="true" />
                </motion.span>
                <p className="mt-4 text-lg font-extrabold">{c.opening}</p>
                <p className="mt-1 text-xs font-semibold text-white/72">{c.openingDetail}</p>
              </div>
            </motion.div>
          )}

          {(cameraState === "live" || cameraState === "processing" || cameraState === "ready") && (
            <motion.div
              key="viewfinder"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative mx-auto h-[420px] w-full max-w-[410px] overflow-hidden bg-[var(--ink)] shadow-[0_26px_58px_rgba(63,33,24,.24)]"
              style={{ borderRadius: "38px 38px 74px 38px" }}
            >
              <CameraScene live={cameraState === "live"} reduceMotion={reduceMotion} />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(36,18,13,.28),transparent_27%,transparent_66%,rgba(36,18,13,.64))]" />

              {cameraState === "live" && (
                <>
                  <div aria-hidden="true" className="pointer-events-none absolute inset-[34px] border-2 border-white/78" style={{ borderRadius: "31% 31% 38% 38% / 28% 28% 45% 45%" }}>
                    <span className="absolute -left-2 -top-2 h-7 w-7 rounded-tl-2xl border-l-4 border-t-4 border-[var(--honey)]" />
                    <span className="absolute -right-2 -top-2 h-7 w-7 rounded-tr-2xl border-r-4 border-t-4 border-[var(--honey)]" />
                    <span className="absolute -bottom-2 -left-2 h-7 w-7 rounded-bl-2xl border-b-4 border-l-4 border-[var(--honey)]" />
                    <span className="absolute -bottom-2 -right-2 h-7 w-7 rounded-br-2xl border-b-4 border-r-4 border-[var(--honey)]" />
                  </div>
                  <p className="absolute inset-x-8 top-5 text-center text-sm font-bold leading-5 text-white [text-shadow:0_2px_10px_rgba(0,0,0,.55)]">{c.live}</p>
                  <div className="absolute inset-x-0 bottom-5 flex justify-center">
                    <button type="button" onClick={beginCapture} disabled={countdown !== null} className="pressable grid h-[72px] w-[72px] place-items-center rounded-full border-[6px] border-white/92 bg-[var(--coral)] text-white shadow-[0_12px_28px_rgba(28,14,10,.3)] disabled:cursor-wait focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" aria-label={c.capture}>
                      <Camera size={28} strokeWidth={2.5} aria-hidden="true" />
                    </button>
                  </div>
                  {countdown !== null && (
                    <motion.div key={countdown} initial={reduceMotion ? false : { opacity: 0, scale: 0.72 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 grid place-items-center bg-[var(--ink)]/22 backdrop-blur-[2px]" aria-live="assertive">
                      <div className="grid h-28 w-28 place-items-center rounded-full bg-white/92 shadow-2xl">
                        <span className="display text-6xl font-bold text-[var(--coral-dark)]">{countdown}</span>
                        <span className="sr-only">{c.capturing}</span>
                      </div>
                    </motion.div>
                  )}
                </>
              )}

              {flash && <motion.div aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: reduceMotion ? 0.05 : 0.16 }} className="absolute inset-0 z-30 bg-white" />}

              {cameraState === "processing" && (
                <>
                  <motion.div aria-hidden="true" className="absolute inset-x-6 h-[3px] bg-[linear-gradient(90deg,transparent,var(--honey),transparent)] shadow-[0_0_24px_var(--honey)]" animate={reduceMotion ? { top: "50%" } : { top: ["12%", "82%", "12%"] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} />
                  <div className="absolute inset-x-5 bottom-6 flex items-center gap-3 rounded-full bg-white/92 px-4 py-3 shadow-xl backdrop-blur-md">
                    <motion.span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--soft)] text-[var(--coral-dark)]" animate={reduceMotion ? undefined : { rotate: [0, 10, -10, 0] }} transition={{ duration: 1.05, repeat: Infinity }}>
                      <PawPrint size={21} aria-hidden="true" />
                    </motion.span>
                    <div>
                      <p className="font-extrabold text-[var(--ink)]">{c.processing}</p>
                      <p className="text-xs font-semibold text-[var(--muted)]">{c.processingDetail}</p>
                    </div>
                  </div>
                </>
              )}

              {cameraState === "ready" && (
                <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="absolute inset-x-5 bottom-5 rounded-[26px] bg-white/94 p-4 shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#E8F6ED] text-[#247A49]"><Check size={22} strokeWidth={2.7} aria-hidden="true" /></span>
                    <div>
                      <p className="font-extrabold text-[var(--ink)]">{c.ready}</p>
                      <p className="text-xs font-semibold text-[var(--muted)]">{c.readyDetail}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button type="button" onClick={openCamera} className="pressable inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[var(--soft)] px-4 text-sm font-extrabold text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--coral-dark)]">
                      <RotateCcw size={17} aria-hidden="true" />{c.retake}
                    </button>
                    <button type="button" onClick={onContinue} className="pressable inline-flex min-h-11 flex-[1.25] items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-4 text-sm font-extrabold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--coral-dark)]">
                      {c.usePhoto}<ArrowRight size={17} aria-hidden="true" />
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative mt-3 flex items-start gap-3 px-2 text-[12px] font-bold leading-5 text-[var(--muted)]">
        <ShieldCheck size={19} className="mt-0.5 shrink-0 text-[var(--coral-dark)]" aria-hidden="true" />
        <p>{c.privacy}</p>
      </div>
      <button type="button" onClick={handleSkip} className="pressable relative mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-[var(--line)] bg-white/72 px-5 text-sm font-extrabold text-[var(--ink)] backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--coral-dark)]">
        <CameraOff size={18} aria-hidden="true" />{c.skip}
      </button>
    </section>
  );
}
