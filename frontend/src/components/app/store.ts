"use client";

import { useCallback, useEffect, useState } from "react";
import { addDays, todayISO } from "./logic";
import type { AppState } from "./types";

const KEY = "pawpaw-app-v1";

export function makeSeed(): AppState {
  const today = todayISO();
  return {
    locale: "th",
    tab: "home",
    dog: { name: "Mochi", breed: "Shiba Inu", ageYears: 3, weightKg: 11.5, size: "medium" },
    missionsDone: {},
    moods: [],
    dismissed: [],
    records: [
      { id: "m1", kind: "vaccine", name: "Rabies", date: addDays(today, -360), nextDue: addDays(today, 5) },
      { id: "m2", kind: "vaccine", name: "DHPP", date: addDays(today, -120), nextDue: addDays(today, 245) },
      { id: "m3", kind: "parasite", name: "Flea & tick", date: addDays(today, -40), nextDue: addDays(today, -3) },
    ],
    visits: [
      { id: "v1", date: addDays(today, -120), clinic: "Kind Paws Clinic", reason: "Annual check-up", note: "Healthy. Weight steady." },
    ],
    goal: {
      title: "Healthy weight in 90 days",
      startDate: today,
      startKg: 11.5,
      targetKg: 10.5,
      logs: [],
    },
    lessonsDone: [],
    chat: [],
    assessManual: {},
    placeReviews: {},
    productReviews: {},
  };
}

/* Local storage hydration intentionally synchronizes an external browser store after mount. */
/* eslint-disable react-hooks/set-state-in-effect */
export function usePawState() {
  const [state, setState] = useState<AppState | null>(null);
  useEffect(() => {
    let next = makeSeed();
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) next = { ...next, ...JSON.parse(saved) };
    } catch {
      /* the app still works without storage */
    }
    setState(next);
  }, []);
  useEffect(() => {
    if (!state) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore quota or privacy-mode errors */
    }
  }, [state]);
  const patch = useCallback(
    (next: Partial<AppState>) =>
      setState((s) => (s ? { ...s, ...next } : s)),
    [],
  );
  const reset = useCallback(
    () => setState((s) => ({ ...makeSeed(), locale: s?.locale ?? "th" })),
    [],
  );
  return { state, patch, reset };
}
/* eslint-enable react-hooks/set-state-in-effect */
