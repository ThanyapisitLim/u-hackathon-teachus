export type Locale = "en" | "th";
export type Bi = { en: string; th: string };
export const tr = (b: Bi, l: Locale) => b[l];

export type TabKey = "home" | "health" | "learn" | "safe" | "affiliate";
export type Mood = "happy" | "calm" | "anxious" | "tired" | "unwell";
export type DogSize = "small" | "medium" | "large";
export type RecordKind = "vaccine" | "medicine" | "parasite";

export type DogProfile = {
  name: string;
  breed: string;
  ageYears: number;
  weightKg: number;
  size: DogSize;
};
export type MedRecord = {
  id: string;
  kind: RecordKind;
  name: string;
  date: string;
  nextDue: string;
};
export type Visit = {
  id: string;
  date: string;
  clinic: string;
  reason: string;
  note: string;
};
export type WeightLog = { date: string; kg: number };
export type Goal = {
  title: string;
  startDate: string;
  startKg: number;
  targetKg: number;
  logs: WeightLog[];
};
export type MoodEntry = { date: string; mood: Mood; note: string };
export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  mine?: boolean;
};
export type ChatMsg = {
  id: string;
  role: "user" | "coach";
  text: string;
  urgent?: boolean;
  source?: "ai" | "offline";
};

export type AppState = {
  locale: Locale;
  tab: TabKey;
  dog: DogProfile;
  missionsDone: Record<string, string[]>;
  moods: MoodEntry[];
  dismissed: string[];
  records: MedRecord[];
  visits: Visit[];
  goal: Goal;
  lessonsDone: string[];
  chat: ChatMsg[];
  assessManual: Record<string, boolean>;
  placeReviews: Record<string, Review[]>;
  productReviews: Record<string, Review[]>;
};

export type TabProps = {
  l: Locale;
  state: AppState;
  patch: (next: Partial<AppState>) => void;
  goTab: (tab: TabKey) => void;
};
