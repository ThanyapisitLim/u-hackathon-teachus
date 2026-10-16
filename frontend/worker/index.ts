interface AiBinding {
  run(model: string, input: Record<string, unknown>, options?: Record<string, unknown>): Promise<unknown>;
}

interface Env {
  AI: AiBinding;
  ASSETS: { fetch(request: Request): Promise<Response> };
}

type TrialPayload = {
  locale: "en" | "th";
  dogName: string;
  choice: "chicken" | "salmon" | "unclear";
  approach: "quick" | "slow" | "none";
  intake: "most" | "some" | "none";
  energy: "bright" | "neutral" | "avoid";
  scenarioId: "taste-trial-01";
};

const allowed = {
  locale: ["en", "th"],
  choice: ["chicken", "salmon", "unclear"],
  approach: ["quick", "slow", "none"],
  intake: ["most", "some", "none"],
  energy: ["bright", "neutral", "avoid"],
} as const;

function validate(raw: unknown): TrialPayload | null {
  if (!raw || typeof raw !== "object") return null;
  const x = raw as Record<string, unknown>;
  if (x.dogName !== "Mochi" || x.scenarioId !== "taste-trial-01") return null;
  for (const key of Object.keys(allowed) as (keyof typeof allowed)[]) {
    if (!(allowed[key] as readonly unknown[]).includes(x[key])) return null;
  }
  return x as TrialPayload;
}

function fallback(p: TrialPayload) {
  if (p.locale === "th") {
    if (p.choice === "unclear") return "โมจิยังไม่แสดงตัวเลือกแรกที่ชัดเจน ซึ่งก็เป็นข้อมูลที่มีประโยชน์ ควรเปรียบเทียบแบบเดิมอีกวันโดยไม่เปลี่ยนหลายอย่างพร้อมกัน";
    return `ในการทดลองนี้ โมจิตอบสนองต่อกลิ่น${p.choice === "salmon" ? "แซลมอน" : "ไก่"}มากกว่า ให้ถือเป็นสัญญาณความชอบเบื้องต้น ไม่ใช่ข้อสรุปสุดท้าย และควรทดลองซ้ำอีกวันก่อนเปลี่ยนอาหารประจำ`;
  }
  if (p.choice === "unclear") return "Mochi did not show a clear first choice in this trial. That is useful evidence too: repeat the same comparison another day without changing multiple things at once.";
  return `Mochi showed a stronger response to the ${p.choice} aroma in this trial. Treat this as an early preference signal, not a final conclusion. Repeat the comparison on another day before changing his regular food.`;
}

function extractText(result: unknown): string | null {
  if (!result || typeof result !== "object") return null;
  const r = result as Record<string, unknown>;
  if (typeof r.response === "string") return r.response.trim();
  if (typeof r.result === "string") return r.result.trim();
  return null;
}

function buildGuardrailedFeedback(text: string, locale: TrialPayload["locale"]): string | null {
  const compact = text.replace(/\s+/g, " ").trim();
  const sentences = compact.match(/[^.!?。！？]+[.!?。！？]+/g);
  if (!sentences) return null;
  const observation = sentences[0].trim();
  if (observation.length < 25 || observation.length > 260) return null;
  const nextStep = locale === "th"
    ? "นี่เป็นเพียงสัญญาณเบื้องต้น โปรดลองเปรียบเทียบแบบเดิมอีกวันก่อนเปลี่ยนอาหารประจำของโมจิ."
    : "This is an early signal; repeat the same comparison another day before changing Mochi's regular food.";
  const result = `${observation} ${nextStep}`;
  return result.length >= 35 && result.length <= 420 ? result : null;
}

function passesSafetyGate(text: string): boolean {
  const forbidden = [/#|\*\*/, /\b\d{1,3}\s*%/, /\bdiagnos/i, /\ballerg/i, /nutritionally (complete|suitable|safe)/i, /guarantee/i, /definitely|certainly/i];
  return !forbidden.some((pattern) => pattern.test(text));
}

async function feedback(request: Request, env: Env): Promise<Response> {
  let raw: unknown;
  try { raw = await request.json(); } catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }
  const p = validate(raw);
  if (!p) return Response.json({ error: "Invalid structured trial" }, { status: 400 });
  const safeFallback = fallback(p);
  const cacheId = [p.locale, p.choice, p.approach, p.intake, p.energy].join("-");
  const cacheKey = new Request(`https://pawproud.local/__feedback/v3/${cacheId}`);
  const edgeCache = (caches as CacheStorage & { default: Cache }).default;
  const cached = await edgeCache.match(cacheKey);
  if (cached) return cached;
  const language = p.locale === "th" ? "Thai" : "English";
  const prompt = `You are PawProud's careful food-trial explainer. Write exactly 1 short observation sentence in ${language}, ending with a full stop. Use only these structured owner observations: dog=Mochi; first choice=${p.choice}; approach=${p.approach}; intake=${p.intake}; body language=${p.energy}. Say what was observed and what it may weakly suggest. Use the name Mochi instead of a gendered pronoun. Never diagnose, infer allergy, claim nutritional suitability, add an ingredient, invent a percentage, or imply certainty. Do not give advice, use markdown, or add a heading.`;
  try {
    const result = await Promise.race([
      env.AI.run("@cf/meta/llama-3.1-8b-instruct-fast", { prompt, max_tokens: 60, temperature: 0.2 }),
      new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 6500)),
    ]);
    const text = extractText(result);
    const conciseText = text ? buildGuardrailedFeedback(text, p.locale) : null;
    if (!conciseText || !passesSafetyGate(conciseText)) throw new Error("malformed");
    const response = Response.json({ feedback: conciseText, source: "ai", model: "workers-ai" }, { headers: { "cache-control": "public, max-age=86400" } });
    await edgeCache.put(cacheKey, response.clone());
    return response;
  } catch {
    return Response.json({ feedback: safeFallback, source: "fallback" }, { headers: { "cache-control": "no-store" } });
  }
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/feedback" && request.method === "POST") return feedback(request, env);
    if (url.pathname.startsWith("/api/")) return Response.json({ error: "Not found" }, { status: 404 });
    return env.ASSETS.fetch(request);
  },
};

export default worker;
