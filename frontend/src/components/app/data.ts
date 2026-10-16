import {
  Ban,
  Bath,
  BedDouble,
  Bell,
  Bone,
  Coffee,
  Dog,
  Droplets,
  Footprints,
  Frown,
  GraduationCap,
  HeartHandshake,
  Hospital,
  Laugh,
  Moon,
  Puzzle,
  ShieldPlus,
  ShoppingCart,
  Smile,
  Snowflake,
  Stethoscope,
  Thermometer,
  ToyBrick,
  Trees,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import type { Bi, DogSize, Mood, Review } from "./types";
import type { CriterionKey } from "./logic";
import { IMG, type ImageRef } from "./images";

/* ---------- Home ---------- */
export const MISSIONS: { id: string; icon: LucideIcon; label: Bi; hint: Bi }[] = [
  {
    id: "walk",
    icon: Footprints,
    label: { en: "Walk for 20 minutes", th: "เดินเล่น 20 นาที" },
    hint: { en: "Sniffing counts as exercise", th: "ให้น้องได้ดมกลิ่นด้วย" },
  },
  {
    id: "water",
    icon: Droplets,
    label: { en: "Refresh the water bowl", th: "เปลี่ยนน้ำสะอาด" },
    hint: { en: "Wash the bowl too", th: "ล้างชามด้วย" },
  },
  {
    id: "train",
    icon: GraduationCap,
    label: { en: "Practise one command (5 min)", th: "ฝึกคำสั่ง 1 อย่าง (5 นาที)" },
    hint: { en: "Pick a lesson in Learn", th: "เลือกบทเรียนในแท็บเรียนรู้" },
  },
  {
    id: "teeth",
    icon: Smile,
    label: { en: "Check teeth and gums", th: "ตรวจฟันและเหงือก" },
    hint: { en: "Brush if your dog allows", th: "แปรงฟันถ้าน้องยอม" },
  },
  {
    id: "play",
    icon: HeartHandshake,
    label: { en: "Play together (10 min)", th: "เล่นด้วยกัน (10 นาที)" },
    hint: { en: "Tug, fetch or a puzzle toy", th: "ชักเย่อ โยนบอล หรือของเล่นฝึกสมอง" },
  },
  {
    id: "body",
    icon: Stethoscope,
    label: { en: "Quick body check", th: "ตรวจร่างกายเบื้องต้น" },
    hint: { en: "Ears, eyes, paws and skin", th: "หู ตา อุ้งเท้า ผิวหนัง" },
  },
];

export const MOODS: { id: Mood; icon: LucideIcon; label: Bi }[] = [
  { id: "happy", icon: Laugh, label: { en: "Happy", th: "สนุกสนาน" } },
  { id: "calm", icon: Smile, label: { en: "Calm", th: "สงบ" } },
  { id: "anxious", icon: Frown, label: { en: "Anxious", th: "กังวล" } },
  { id: "tired", icon: Moon, label: { en: "Tired", th: "เหนื่อย/ง่วง" } },
  { id: "unwell", icon: Thermometer, label: { en: "Unwell", th: "ไม่สบาย" } },
];

/* ---------- Learn ---------- */
export const LESSONS: {
  id: string;
  icon: LucideIcon;
  title: Bi;
  minutes: number;
  level: Bi;
  steps: Bi[];
  tip: Bi;
}[] = [
  {
    id: "sit",
    icon: Dog,
    title: { en: "Sit", th: "นั่ง" },
    minutes: 5,
    level: { en: "Beginner", th: "เริ่มต้น" },
    steps: [
      { en: "Hold a treat at your dog's nose.", th: "ถือขนมที่จมูกน้อง" },
      { en: "Slowly lift it over the head until the bottom lowers.", th: "ยกขนมขึ้นช้าๆ เหนือหัวจนก้นลง" },
      { en: "The moment the bottom touches the floor, say “sit” and reward.", th: "ทันทีที่ก้นแตะพื้น พูด “นั่ง” แล้วให้รางวัล" },
      { en: "Repeat 5 times, then add the word before the lure.", th: "ทำซ้ำ 5 ครั้ง แล้วเริ่มพูดคำสั่งก่อนล่อด้วยขนม" },
    ],
    tip: { en: "End on a success, not on a miss.", th: "จบรอบตอนที่ทำสำเร็จ ไม่ใช่ตอนพลาด" },
  },
  {
    id: "come",
    icon: Bell,
    title: { en: "Come when called", th: "เรียกแล้วมา" },
    minutes: 8,
    level: { en: "Beginner", th: "เริ่มต้น" },
    steps: [
      { en: "In a quiet room, say your dog's name and “come” in a happy voice.", th: "ในห้องเงียบ เรียกชื่อน้องและพูด “มา” ด้วยน้ำเสียงสดใส" },
      { en: "Step back to invite them, reward big when they arrive.", th: "ถอยหลังเพื่อชวนให้เดินมา แล้วให้รางวัลอย่างจุใจเมื่อมาถึง" },
      { en: "Add distance, then practise in the garden on a long line.", th: "เพิ่มระยะทาง แล้วฝึกในสวนโดยใช้สายยาว" },
    ],
    tip: { en: "Never call your dog to scold them.", th: "ห้ามเรียกน้องมาเพื่อดุ" },
  },
  {
    id: "leash",
    icon: Footprints,
    title: { en: "Loose-leash walking", th: "เดินสายหย่อน" },
    minutes: 10,
    level: { en: "Intermediate", th: "ปานกลาง" },
    steps: [
      { en: "Start walking in a boring place with plenty of treats.", th: "เริ่มฝึกในที่ที่ไม่ตื่นเต้นและเตรียมขนมให้พอ" },
      { en: "When the leash goes tight, stop and wait.", th: "เมื่อสายตึง ให้หยุดและรอ" },
      { en: "When it slackens, reward and walk on.", th: "เมื่อสายหย่อน ให้รางวัลแล้วเดินต่อ" },
      { en: "Practise in short blocks of 5 minutes.", th: "ฝึกเป็นช่วงสั้นๆ ประมาณ 5 นาที" },
    ],
    tip: { en: "A well-fitted harness protects the neck.", th: "สายรัดอกที่พอดีช่วยปกป้องคอ" },
  },
  {
    id: "leave",
    icon: Ban,
    title: { en: "Leave it", th: "ปล่อย / อย่าแตะ" },
    minutes: 6,
    level: { en: "Intermediate", th: "ปานกลาง" },
    steps: [
      { en: "Hold a treat in a closed fist. Let your dog sniff.", th: "กำขนมไว้ในมือ ให้น้องมาดม" },
      { en: "Wait until they back off, then say “yes” and reward from the other hand.", th: "รอจนน้องถอยออก แล้วพูด “ดี” พร้อมให้ขนมจากอีกมือ" },
      { en: "Progress to an open palm, then the floor.", th: "ขยับไปที่ฝ่ามือเปิด และของที่วางบนพื้น" },
    ],
    tip: { en: "Great for safety around dropped food.", th: "ช่วยความปลอดภัยเวลามีของตกบนพื้น" },
  },
  {
    id: "settle",
    icon: BedDouble,
    title: { en: "Settle on a mat", th: "สงบบนเบาะ" },
    minutes: 8,
    level: { en: "Beginner", th: "เริ่มต้น" },
    steps: [
      { en: "Reward your dog for stepping on a mat.", th: "ให้รางวัลเมื่อน้องก้าวขึ้นเบาะ" },
      { en: "Reward lying down on the mat, then add the word “settle”.", th: "ให้รางวัลเมื่อนอนลงบนเบาะ แล้วเพิ่มคำสั่ง “สงบ”" },
      { en: "Slowly extend the time before each reward.", th: "ค่อยๆ ยืดเวลาก่อนให้รางวัลแต่ละครั้ง" },
    ],
    tip: { en: "Useful at cafés and the vet.", th: "ใช้ได้ดีที่คาเฟ่และคลินิก" },
  },
];

export const COACH_SUGGESTIONS: Bi[] = [
  { en: "How do I teach sit?", th: "สอนนั่งยังไง" },
  { en: "My dog pulls on the leash", th: "น้องลากสายจูงตอนเดิน" },
  { en: "Barking when I leave", th: "เห่าตอนเราออกจากบ้าน" },
  { en: "Vaccine schedule?", th: "ตารางวัคซีนต้องฉีดเมื่อไหร่" },
];

/* ---------- Safe Spaces (sample data) ---------- */
export type PlaceCategory = "park" | "cafe" | "vet" | "groomer" | "store";
export type Place = {
  id: string;
  category: PlaceCategory;
  name: Bi;
  area: Bi;
  distanceKm: number;
  hours: Bi;
  about: Bi;
  tags: Bi[];
  x: number;
  y: number;
  requires: CriterionKey[];
  image?: ImageRef;
  reviews: Review[];
};

export const CATEGORIES: { id: PlaceCategory; icon: LucideIcon; label: Bi }[] = [
  { id: "park", icon: Trees, label: { en: "Parks", th: "สวน" } },
  { id: "cafe", icon: Coffee, label: { en: "Cafés", th: "คาเฟ่" } },
  { id: "vet", icon: Hospital, label: { en: "Vets", th: "คลินิก" } },
  { id: "groomer", icon: Bath, label: { en: "Grooming", th: "อาบน้ำตัดขน" } },
  { id: "store", icon: ShoppingCart, label: { en: "Shops", th: "ร้านค้า" } },
];

export const PLACES: Place[] = [
  {
    id: "p1",
    image: IMG.dogRun,
    category: "park",
    name: { en: "Shady Paw Park", th: "สวนสุนัขร่มรื่น" },
    area: { en: "Sample area A", th: "ย่านตัวอย่าง A" },
    distanceKm: 0.8,
    hours: { en: "6:00-19:00", th: "06:00-19:00" },
    about: {
      en: "Fenced off-leash lawn with a separate small-dog corner and water points.",
      th: "สนามหญ้าปล่อยวิ่งมีรั้วรอบ แยกโซนสุนัขตัวเล็ก และมีจุดน้ำดื่ม",
    },
    tags: [
      { en: "Fenced", th: "มีรั้ว" },
      { en: "Water", th: "มีน้ำดื่ม" },
      { en: "Small-dog zone", th: "โซนตัวเล็ก" },
    ],
    x: 24,
    y: 30,
    requires: ["vaccines", "parasite", "wellToday", "recall", "social"],
    reviews: [
      { id: "s1", author: "Sample", rating: 5, text: "Clean and well fenced, staff check vaccine cards.", },
      { id: "s2", author: "Sample", rating: 4, text: "Gets busy at weekends, go early." },
    ],
  },
  {
    id: "p2",
    image: IMG.trail,
    category: "park",
    name: { en: "Canal Walk Trail", th: "ทางเดินริมคลอง" },
    area: { en: "Sample area B", th: "ย่านตัวอย่าง B" },
    distanceKm: 1.6,
    hours: { en: "Open all day", th: "เปิดตลอดวัน" },
    about: {
      en: "Shaded leash-only path. Quiet in the morning, hot at midday.",
      th: "ทางเดินร่มเงาต้องใช้สายจูง ช่วงเช้าเงียบ ช่วงกลางวันร้อน",
    },
    tags: [
      { en: "Leash only", th: "ต้องใช้สายจูง" },
      { en: "Shaded", th: "ร่มเงา" },
    ],
    x: 62,
    y: 22,
    requires: ["parasite", "wellToday", "leash"],
    reviews: [
      { id: "s3", author: "Sample", rating: 4, text: "Lovely for a calm walk, bring your own water." },
    ],
  },
  {
    id: "p3",
    image: IMG.cafe,
    category: "cafe",
    name: { en: "Bark & Brew Café", th: "คาเฟ่ บาร์ค แอนด์ บรูว์" },
    area: { en: "Sample area A", th: "ย่านตัวอย่าง A" },
    distanceKm: 1.1,
    hours: { en: "9:00-21:00", th: "09:00-21:00" },
    about: {
      en: "Pet-friendly terrace with dog menu. Dogs stay on a leash or in a carrier.",
      th: "ระเบียงที่เป็นมิตรกับสัตว์เลี้ยง มีเมนูสำหรับน้องหมา ต้องใช้สายจูงหรือกระเป๋า",
    },
    tags: [
      { en: "Dog menu", th: "มีเมนูน้องหมา" },
      { en: "Leash required", th: "ต้องใช้สายจูง" },
    ],
    x: 40,
    y: 58,
    requires: ["vaccines", "leash", "calm"],
    reviews: [
      { id: "s4", author: "Sample", rating: 5, text: "Staff love dogs. Mat and water provided." },
      { id: "s5", author: "Sample", rating: 3, text: "Crowded on Saturdays, hard for nervous dogs." },
    ],
  },
  {
    id: "p4",
    image: IMG.vet,
    category: "vet",
    name: { en: "Kind Paws Clinic", th: "คลินิกสัตว์ใจดี" },
    area: { en: "Sample area C", th: "ย่านตัวอย่าง C" },
    distanceKm: 2.3,
    hours: { en: "24 hours", th: "24 ชั่วโมง" },
    about: {
      en: "General practice and emergency desk. Call ahead for urgent cases.",
      th: "ตรวจทั่วไปและมีเคาน์เตอร์ฉุกเฉิน โทรแจ้งล่วงหน้าเมื่อเป็นเคสด่วน",
    },
    tags: [
      { en: "Emergency", th: "ฉุกเฉิน" },
      { en: "Vaccines", th: "ฉีดวัคซีน" },
    ],
    x: 78,
    y: 52,
    requires: [],
    reviews: [
      { id: "s6", author: "Sample", rating: 5, text: "Explained everything calmly and clearly." },
    ],
  },
  {
    id: "p5",
    image: IMG.groomer,
    category: "groomer",
    name: { en: "Fluffy Spa", th: "ฟลัฟฟี่ สปา" },
    area: { en: "Sample area B", th: "ย่านตัวอย่าง B" },
    distanceKm: 1.9,
    hours: { en: "10:00-18:00", th: "10:00-18:00" },
    about: {
      en: "Gentle grooming with low-stress handling. Booking required.",
      th: "อาบน้ำตัดขนแบบเบามือ ลดความเครียดของน้อง ต้องจองล่วงหน้า",
    },
    tags: [
      { en: "Booking", th: "ต้องจอง" },
      { en: "Low-stress", th: "ลดความเครียด" },
    ],
    x: 18,
    y: 72,
    requires: ["vaccines", "parasite", "calm"],
    reviews: [
      { id: "s7", author: "Sample", rating: 4, text: "Patient with my nervous dog." },
    ],
  },
  {
    id: "p6",
    image: IMG.store,
    category: "store",
    name: { en: "Paw Pantry Store", th: "ร้านพอว์ แพนทรี" },
    area: { en: "Sample area A", th: "ย่านตัวอย่าง A" },
    distanceKm: 0.5,
    hours: { en: "9:00-20:00", th: "09:00-20:00" },
    about: {
      en: "Food, toys and accessories. Dogs welcome on a leash.",
      th: "อาหาร ของเล่น และอุปกรณ์ น้องหมาเข้าได้เมื่อใช้สายจูง",
    },
    tags: [
      { en: "Leash required", th: "ต้องใช้สายจูง" },
      { en: "Toys", th: "ของเล่น" },
    ],
    x: 52,
    y: 38,
    requires: ["leash", "calm"],
    reviews: [
      { id: "s8", author: "Sample", rating: 4, text: "Good range and helpful staff." },
    ],
  },
];

export const CRITERIA: Record<
  CriterionKey,
  { label: Bi; fix: Bi; auto: boolean; tab?: "health" | "learn" | "home" }
> = {
  vaccines: {
    label: { en: "Vaccines up to date", th: "วัคซีนยังไม่เกินกำหนด" },
    fix: { en: "Add or update vaccine records", th: "เพิ่มหรืออัปเดตบันทึกวัคซีน" },
    auto: true,
    tab: "health",
  },
  parasite: {
    label: { en: "Flea, tick & worm prevention current", th: "ยาป้องกันเห็บหมัดพยาธิยังไม่เกินกำหนด" },
    fix: { en: "Add or update parasite prevention", th: "เพิ่มหรืออัปเดตยากันเห็บหมัดพยาธิ" },
    auto: true,
    tab: "health",
  },
  wellToday: {
    label: { en: "Feeling well today", th: "วันนี้น้องสบายดี" },
    fix: { en: "Do today's mood check-in", th: "เช็กอินอารมณ์วันนี้" },
    auto: true,
    tab: "home",
  },
  leash: {
    label: { en: "Walks calmly on a leash", th: "เดินสายจูงได้ไม่ลาก" },
    fix: { en: "Finish the loose-leash lesson", th: "เรียนบทเดินสายหย่อนให้จบ" },
    auto: true,
    tab: "learn",
  },
  recall: {
    label: { en: "Comes when called", th: "เรียกแล้วมา" },
    fix: { en: "Finish the recall lesson", th: "เรียนบทเรียกแล้วมาให้จบ" },
    auto: true,
    tab: "learn",
  },
  social: {
    label: { en: "Comfortable around other dogs", th: "อยู่ใกล้สุนัขตัวอื่นได้สบายใจ" },
    fix: { en: "Tick when you have seen this yourself", th: "ติ๊กเมื่อคุณเห็นด้วยตัวเอง" },
    auto: false,
  },
  calm: {
    label: { en: "Stays calm around people and noise", th: "ใจเย็นเมื่อมีคนและเสียงดัง" },
    fix: { en: "Tick when you have seen this yourself", th: "ติ๊กเมื่อคุณเห็นด้วยตัวเอง" },
    auto: false,
  },
};

/* ---------- Affiliate (sample data) ---------- */
export type Product = {
  id: string;
  icon: LucideIcon;
  name: Bi;
  brand: string;
  priceThb: number;
  category: Bi;
  sizes: DogSize[];
  stages: ("puppy" | "adult" | "senior")[];
  blurb: Bi;
  why: Bi;
  caution?: Bi;
  image?: ImageRef;
  videoUrl?: string;
  reviews: Review[];
};

export const PRODUCTS: Product[] = [
  {
    id: "g1",
    image: IMG.harness,
    icon: ShieldPlus,
    name: { en: "No-pull front-clip harness", th: "สายรัดอกกันลาก คล้องด้านหน้า" },
    brand: "Sample Gear",
    priceThb: 590,
    category: { en: "Walking", th: "เดินเล่น" },
    sizes: ["small", "medium", "large"],
    stages: ["puppy", "adult", "senior"],
    blurb: { en: "Padded chest strap with front and back clips.", th: "สายรัดอกบุนวม มีที่คล้องด้านหน้าและหลัง" },
    why: { en: "Makes loose-leash practice easier and spares the neck.", th: "ช่วยให้ฝึกเดินสายหย่อนง่ายขึ้นและไม่รั้งคอ" },
    reviews: [
      { id: "r1", author: "Sample", rating: 5, text: "Pulling dropped a lot within a week." },
      { id: "r2", author: "Sample", rating: 4, text: "Check the sizing chart before ordering." },
    ],
  },
  {
    id: "g2",
    image: IMG.dentalChew,
    icon: Bone,
    name: { en: "Dental chew sticks", th: "ขนมขัดฟัน" },
    brand: "Sample Treats",
    priceThb: 320,
    category: { en: "Dental", th: "ดูแลฟัน" },
    sizes: ["small", "medium", "large"],
    stages: ["adult", "senior"],
    blurb: { en: "Textured chews that support daily teeth care.", th: "ขนมผิวขรุขระช่วยดูแลฟันประจำวัน" },
    why: { en: "Pairs with the daily teeth-check mission.", th: "เข้ากับภารกิจตรวจฟันประจำวัน" },
    caution: { en: "Choose the right size and supervise chewing.", th: "เลือกขนาดให้เหมาะและดูน้องขณะแทะ" },
    reviews: [
      { id: "r3", author: "Sample", rating: 4, text: "My dog loves them, no stomach upset." },
    ],
  },
  {
    id: "g3",
    image: IMG.slowFeeder,
    icon: Utensils,
    name: { en: "Slow-feeder bowl", th: "ชามกินช้า" },
    brand: "Sample Home",
    priceThb: 249,
    category: { en: "Feeding", th: "การกิน" },
    sizes: ["small", "medium", "large"],
    stages: ["puppy", "adult", "senior"],
    blurb: { en: "Raised ridges slow down fast eaters.", th: "ลายนูนช่วยให้น้องที่กินเร็วกินช้าลง" },
    why: { en: "Helps dogs who gulp food and supports weight goals.", th: "เหมาะกับน้องที่กินเร็ว และช่วยเรื่องเป้าหมายน้ำหนัก" },
    reviews: [
      { id: "r4", author: "Sample", rating: 5, text: "Meal time lasts three times longer." },
      { id: "r5", author: "Sample", rating: 4, text: "Easy to wash." },
    ],
  },
  {
    id: "g4",
    icon: Puzzle,
    name: { en: "Treat puzzle toy", th: "ของเล่นปริศนาซ่อนขนม" },
    brand: "Sample Play",
    priceThb: 450,
    category: { en: "Enrichment", th: "ฝึกสมอง" },
    sizes: ["small", "medium", "large"],
    stages: ["puppy", "adult", "senior"],
    blurb: { en: "Hide treats in sliding compartments.", th: "ซ่อนขนมในช่องเลื่อนให้น้องหาเอง" },
    why: { en: "Burns mental energy and helps with boredom barking.", th: "ใช้พลังงานทางสมองและช่วยลดการเห่าเพราะเบื่อ" },
    reviews: [
      { id: "r6", author: "Sample", rating: 5, text: "Keeps my dog busy for half an hour." },
    ],
  },
  {
    id: "g5",
    icon: Snowflake,
    name: { en: "Cooling mat", th: "เบาะเย็น" },
    brand: "Sample Home",
    priceThb: 690,
    category: { en: "Comfort", th: "ความสบาย" },
    sizes: ["medium", "large"],
    stages: ["adult", "senior"],
    blurb: { en: "Pressure-activated gel mat, no electricity.", th: "เจลเย็นเมื่อกดทับ ไม่ใช้ไฟฟ้า" },
    why: { en: "Useful in hot weather, especially for larger dogs.", th: "ช่วยในอากาศร้อน โดยเฉพาะน้องตัวใหญ่" },
    caution: { en: "Do not rely on it for heatstroke; see a vet.", th: "ไม่ใช่ทางแก้ลมแดด หากมีอาการให้พบสัตวแพทย์" },
    reviews: [
      { id: "r7", author: "Sample", rating: 4, text: "Stays cool for a few hours." },
    ],
  },
  {
    id: "g6",
    image: IMG.teethingToy,
    icon: ToyBrick,
    name: { en: "Soft teething toy set", th: "ชุดของเล่นแทะสำหรับลูกสุนัข" },
    brand: "Sample Play",
    priceThb: 290,
    category: { en: "Puppy", th: "ลูกสุนัข" },
    sizes: ["small", "medium"],
    stages: ["puppy"],
    blurb: { en: "Soft rubber textures for sore gums.", th: "ยางนิ่มหลายผิวสัมผัสสำหรับเหงือกที่คัน" },
    why: { en: "Redirects chewing away from furniture.", th: "เบนการแทะออกจากเฟอร์นิเจอร์" },
    reviews: [
      { id: "r8", author: "Sample", rating: 5, text: "Furniture survived the teething month." },
    ],
  },
];
