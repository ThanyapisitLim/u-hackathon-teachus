import type {
  AppState,
  Bi,
  DogProfile,
  Goal,
  Locale,
  MedRecord,
} from "./types";

const pad = (n: number) => String(n).padStart(2, "0");

export function toISO(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
export const todayISO = () => toISO(new Date());

const parse = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, (m || 1) - 1, d || 1);
};
export const daysBetween = (from: string, to: string) =>
  Math.round((parse(to) - parse(from)) / 86_400_000);
export function addDays(iso: string, n: number) {
  const d = new Date(parse(iso));
  d.setUTCDate(d.getUTCDate() + n);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}
export function formatDate(iso: string, l: Locale) {
  if (!iso) return "—";
  return new Date(parse(iso)).toLocaleDateString(l === "th" ? "th-TH" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
export const newId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

/* ---------- medicine book ---------- */
export type DueStatus = "overdue" | "soon" | "ok" | "none";
export function dueStatus(nextDue: string, today = todayISO()) {
  if (!nextDue) return { status: "none" as DueStatus, days: 0 };
  const days = daysBetween(today, nextDue);
  const status: DueStatus = days < 0 ? "overdue" : days <= 14 ? "soon" : "ok";
  return { status, days };
}

/* ---------- 90-day goal ---------- */
export function goalStats(goal: Goal, today = todayISO()) {
  const day = Math.min(90, Math.max(1, daysBetween(goal.startDate, today) + 1));
  const latest = goal.logs.length
    ? [...goal.logs].sort((a, b) => a.date.localeCompare(b.date)).at(-1)!.kg
    : goal.startKg;
  const span = goal.targetKg - goal.startKg;
  const pct =
    span === 0
      ? 100
      : Math.round(Math.min(1, Math.max(0, (latest - goal.startKg) / span)) * 100);
  return { day, latest, pct, daysLeft: 90 - day };
}
export function missionStreak(
  state: AppState,
  total: number,
  today = todayISO(),
) {
  let count = 0;
  for (let i = 0; i < 7; i++) {
    const done = state.missionsDone[addDays(today, -i)]?.length ?? 0;
    if (done >= Math.ceil(total / 2)) count++;
  }
  return count;
}

/* ---------- readiness for a place ---------- */
export type CriterionKey =
  | "vaccines"
  | "parasite"
  | "wellToday"
  | "leash"
  | "recall"
  | "social"
  | "calm";
export type CriterionState = "met" | "unmet" | "unknown";

export function criterionState(
  key: CriterionKey,
  state: AppState,
  today = todayISO(),
): CriterionState {
  const ofKind = (k: MedRecord["kind"]) =>
    state.records.filter((r) => r.kind === k);
  switch (key) {
    case "vaccines": {
      const v = ofKind("vaccine");
      if (!v.length) return "unknown";
      return v.some((r) => dueStatus(r.nextDue, today).status === "overdue")
        ? "unmet"
        : "met";
    }
    case "parasite": {
      const p = ofKind("parasite");
      if (!p.length) return "unknown";
      return p.some((r) => dueStatus(r.nextDue, today).status === "overdue")
        ? "unmet"
        : "met";
    }
    case "wellToday": {
      const m = state.moods.find((e) => e.date === today);
      if (!m) return "unknown";
      return m.mood === "unwell" ? "unmet" : "met";
    }
    case "leash":
      return state.lessonsDone.includes("leash") ? "met" : "unmet";
    case "recall":
      return state.lessonsDone.includes("come") ? "met" : "unmet";
    case "social":
    case "calm":
      return state.assessManual[key] ? "met" : "unmet";
  }
}
export function readiness(
  required: CriterionKey[],
  state: AppState,
  today = todayISO(),
) {
  const states = required.map((k) => criterionState(k, state, today));
  const met = states.filter((s) => s === "met").length;
  const score = required.length ? Math.round((met / required.length) * 100) : 100;
  const hasBlocker = required.some(
    (k, i) =>
      states[i] === "unmet" && (k === "vaccines" || k === "wellToday"),
  );
  const level: "ready" | "almost" | "notyet" =
    score === 100 ? "ready" : score >= 60 && !hasBlocker ? "almost" : "notyet";
  return { score, level, met, total: required.length, states };
}

/* ---------- dog helpers ---------- */
export const ageStage = (dog: DogProfile): "puppy" | "adult" | "senior" =>
  dog.ageYears < 1 ? "puppy" : dog.ageYears >= 8 ? "senior" : "adult";

export const avg = (rs: { rating: number }[]) =>
  rs.length ? rs.reduce((s, r) => s + r.rating, 0) / rs.length : 0;

/* ---------- coach safety ---------- */
const URGENT = [
  /เลือด|อาเจียน|ชัก|หายใจ(ลำบาก|ไม่ออก|หอบ)|หมดสติ|ท้องอืด|ท้องบวม|เป็นลม|ขาหัก|กระดูกหัก|ถูกรถชน|ถูกงูกัด|ลมแดด|ตัวร้อนจัด/,
  /(กิน|กลืน).*(ช็อกโกแลต|ช็อคโกแลต|องุ่น|ลูกเกด|หัวหอม|ไซลิทอล|ยา|สารพิษ|ยาเบื่อหนู)/,
  /blood|vomit|seizure|convuls|can'?t breathe|difficulty breathing|collaps|bloat|poison|hit by (a )?car|snake|heatstroke/i,
  /(ate|eaten|swallow).*(chocolate|grape|raisin|onion|xylitol|medication|pills?|rat poison)/i,
];
export const looksUrgent = (text: string) => URGENT.some((r) => r.test(text));

export const URGENT_REPLY: Bi = {
  en: "This may be an emergency. Please contact a vet or an emergency animal clinic right now and tell them what happened. Keep your dog calm and warm, do not give human medicine, and do not wait for an app to confirm it.",
  th: "เรื่องนี้อาจเป็นภาวะฉุกเฉิน กรุณาติดต่อสัตวแพทย์หรือคลินิกสัตว์ฉุกเฉินทันที และเล่าอาการที่เกิดขึ้น ให้น้องอยู่ในที่เงียบและอบอุ่น ห้ามให้ยาของคน และไม่ควรรอคำยืนยันจากแอป",
};

const TOPICS: { test: RegExp; reply: Bi }[] = [
  {
    test: /นั่ง|sit\b|สอน|ฝึก|train/i,
    reply: {
      en: "Start with short sessions of 3-5 minutes. Hold a treat at your dog's nose, lift it slowly over the head until the bottom lowers, then say “sit” and reward right away. Repeat 5 times, end on a success, and practise in a quiet room first. The Learn tab has step-by-step lessons.",
      th: "เริ่มจากรอบสั้นๆ 3-5 นาที ถือขนมที่จมูกน้อง ยกขึ้นช้าๆ เหนือหัวจนก้นลง แล้วพูดคำว่า “นั่ง” และให้รางวัลทันที ทำซ้ำ 5 ครั้ง จบด้วยความสำเร็จ และฝึกในห้องเงียบก่อน ในแท็บเรียนรู้มีบทเรียนทีละขั้นตอน",
    },
  },
  {
    test: /เห่า|bark|howl|หอน/i,
    reply: {
      en: "First note when the barking happens (visitors, boredom, being alone). Barking from boredom usually eases with more walks, sniffing games and puzzle toys. Reward quiet moments rather than shouting. If it is sudden or comes with distress, check in with a vet or behaviourist.",
      th: "ลองจดก่อนว่าเห่าตอนไหน (มีคนมา เบื่อ อยู่คนเดียว) ถ้าเห่าเพราะเบื่อมักดีขึ้นเมื่อเดินเล่นเพิ่ม เล่นดมกลิ่น และมีของเล่นฝึกสมอง ให้รางวัลตอนเงียบแทนการตะโกน ถ้าเห่าผิดปกติกะทันหันหรือดูเครียดมาก ควรปรึกษาสัตวแพทย์หรือผู้เชี่ยวชาญพฤติกรรม",
    },
  },
  {
    test: /ฉี่|อึ|ขับถ่าย|potty|toilet|pee|poop|house.?train/i,
    reply: {
      en: "Take your dog out after meals, naps and play, and at regular times. Praise and reward straight after they go in the right spot. Clean accidents with an enzyme cleaner and avoid scolding. Puppies need a trip out every 1-2 hours.",
      th: "พาออกไปหลังกินอาหาร ตื่นนอน และเล่น รวมถึงเวลาประจำ ชมและให้รางวัลทันทีที่ทำถูกที่ ทำความสะอาดจุดพลาดด้วยน้ำยาย่อยกลิ่นและไม่ดุ ลูกสุนัขต้องพาออกทุก 1-2 ชั่วโมง",
    },
  },
  {
    test: /ลาก|สายจูง|leash|pull|เดิน/i,
    reply: {
      en: "Stop the moment the leash goes tight and move on only when it slackens, rewarding the dog for staying by your side. Short, frequent walks help more than one long one. A front-clip harness can make practice easier.",
      th: "หยุดทันทีที่สายตึงและเดินต่อเมื่อสายหย่อน ให้รางวัลเมื่อน้องเดินข้างตัว เดินสั้นๆ บ่อยๆ ได้ผลกว่าเดินยาวครั้งเดียว สายรัดอกแบบคล้องด้านหน้าช่วยให้ฝึกง่ายขึ้น",
    },
  },
  {
    test: /กัด|แทะ|chew|bite|nip/i,
    reply: {
      en: "Chewing and mouthing are normal, especially for puppies. Redirect to a chew toy, swap the item for a treat, and end play calmly if teeth touch skin. Rotate toys and exercise before quiet time.",
      th: "การแทะและงับเป็นเรื่องปกติโดยเฉพาะลูกสุนัข ให้เบนความสนใจไปที่ของเล่นแทะ แลกของที่ไม่ควรแทะกับขนม และหยุดเล่นอย่างใจเย็นเมื่อฟันโดนผิว สลับของเล่นและพาออกกำลังก่อนช่วงพัก",
    },
  },
  {
    test: /วัคซีน|vaccin|พยาธิ|เห็บ|หมัด|flea|tick|worm/i,
    reply: {
      en: "Vaccines and parasite prevention follow a schedule set by your vet, which depends on age and lifestyle. Record each dose in the Profile & Health tab so the app can remind you before the due date, and ask your vet to confirm the schedule.",
      th: "ตารางวัคซีนและยาป้องกันพยาธิ เห็บ หมัด ขึ้นกับอายุและการใช้ชีวิตของน้อง สัตวแพทย์เป็นผู้กำหนด บันทึกทุกเข็มไว้ในแท็บโปรไฟล์และสุขภาพ แอปจะเตือนก่อนครบกำหนด และควรให้สัตวแพทย์ยืนยันตารางอีกครั้ง",
    },
  },
  {
    test: /อาหาร|กิน|food|feed|diet|น้ำหนัก|weight/i,
    reply: {
      en: "Keep to one measured portion plan and change food gradually over 7 days. For weight goals, weigh weekly and log it in the 90-day goal. Ask your vet before big diet changes, especially for puppies, seniors or dogs with health conditions.",
      th: "ควรตวงอาหารตามแผนเดียวและเปลี่ยนอาหารค่อยๆ ภายใน 7 วัน ถ้ามีเป้าหมายด้านน้ำหนัก ให้ชั่งทุกสัปดาห์และบันทึกในเป้าหมาย 90 วัน ก่อนเปลี่ยนอาหารครั้งใหญ่ โดยเฉพาะลูกสุนัข สุนัขสูงวัย หรือน้องที่มีโรคประจำตัว ควรถามสัตวแพทย์",
    },
  },
  {
    test: /เหงา|แยกกัน|อยู่คนเดียว|alone|separation|anxi|กังวล/i,
    reply: {
      en: "Build up alone-time slowly: start with a minute, reward calm behaviour, and leave a chew toy or a snuffle mat. Keep leaving and returning low-key. If your dog panics, destroys things or hurts themselves, ask a vet or behaviourist for help.",
      th: "ฝึกอยู่คนเดียวทีละน้อย เริ่มจาก 1 นาที ให้รางวัลเมื่อใจเย็น และเตรียมของแทะหรือแผ่นดมกลิ่น ทำให้การออกและกลับถึงบ้านเป็นเรื่องปกติ ถ้าน้องตื่นตระหนก ทำลายของ หรือทำร้ายตัวเอง ควรปรึกษาสัตวแพทย์หรือผู้เชี่ยวชาญพฤติกรรม",
    },
  },
];

export function offlineCoachReply(text: string, dogName: string, l: Locale) {
  if (looksUrgent(text)) return { text: URGENT_REPLY[l], urgent: true };
  const hit = TOPICS.find((t) => t.test.test(text));
  const base = hit
    ? hit.reply[l]
    : l === "en"
      ? `Tell me a bit more about ${dogName}: age, what happened, and when it started. In general, calm routines, daily exercise and rewarding the behaviour you want works best. For anything about pain, illness or sudden change, please see a vet.`
      : `เล่าเพิ่มอีกนิดเกี่ยวกับ${dogName}ได้ไหม เช่น อายุ เกิดอะไรขึ้น และเริ่มเมื่อไหร่ โดยทั่วไปกิจวัตรที่สม่ำเสมอ การออกกำลังกายทุกวัน และการให้รางวัลพฤติกรรมที่ต้องการจะได้ผลดีที่สุด ถ้าเกี่ยวกับความเจ็บปวด โรค หรืออาการเปลี่ยนกะทันหัน ควรพบสัตวแพทย์`;
  return { text: base, urgent: false };
}
