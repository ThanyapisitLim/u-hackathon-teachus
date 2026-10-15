# PawProud — Collaborator Brief and Current Product Contract

**Status:** Current hackathon source of truth for implementation and collaboration

**Language:** English is the base product language; Thai is a required toggle

**Scope date:** 16 October 2026

**Competition:** U-Hackathon by U-Topia

> **Latest decisions in this file override older scope details elsewhere in `docs/`.** The earlier research remains valuable, but this build has no physical-box deliverable, does not need a real preference model, and uses live AI only for feedback/explanation.

## 1. The product in one minute

**Hook:** The payer chooses. The real user answers after checkout. **PawProud lets the dog answer first.**

PawProud is a care system that begins with a beautifully designed food-learning service. An owner compares two tastes, records what the dog actually does, and receives an honest visual **TastePrint**. Instead of forcing a subscription, PawProud offers one paid **First Bowl**, checks whether the dog accepts it in real life, and only then offers an optional recurring plan. The resulting evidence is kept in an owner-controlled **Care Passport**.

**นิยามภาษาไทย:** PawProud คือระบบดูแลที่ให้น้องหมา “ตอบก่อน” ด้วยการทดลองรสชาติอย่างมีโครงสร้าง บันทึกสิ่งที่เจ้าของเห็นเป็น TastePrint แล้วให้ลองซื้อเพียงหนึ่งมื้อ เช็กผลหลังใช้งานจริง และค่อยตัดสินใจสมัครต่อ ข้อมูลทั้งหมดถูกเก็บอย่างต่อเนื่องใน Care Passport

The hackathon proposition is not “another personalised dog-food subscription.” It is:

> **Try first → learn from behaviour → pay once → verify acceptance → subscribe only after proof.**

The food flow is intentionally the most convincing proof of PawProud's wider care philosophy. If the system can be careful, transparent, and useful in a frequent everyday decision, it can earn the right to support more parts of the owner–dog relationship later.

## 2. Where the idea came from

The original exploration asked what service dogs can do, who benefits, and whether a care system inspired by that field could create meaningful social value. The team chose **not** to produce, train, certify, or register service dogs. Instead, PawProud borrows a discipline visible in responsible assistance-dog systems:

- welfare is the floor, never an optimisation variable;
- the dog and person are treated as a team;
- suitability and fit matter more than generic recommendations;
- preparation, environment, clear roles, and follow-up matter;
- information must travel across moments of care;
- capability can grow only when the foundation is safe.

This creates a **welfare floor and capability ceiling**: PawProud must first make ordinary care safe and respectful, then help each owner–dog team do more with confidence. The first demonstrable wedge is food preference learning; the longer-term platform is continuity of care.

PawProud is service-dog-**inspired**, not a service-dog product. It makes no claim about certification, public access, disability status, training outcomes, or legal rights. International readiness means the data and interface can be localised; it never means one country's service-dog rules apply everywhere.

## 3. The chain problem and why the wedge matters

The visible problem may look like “my dog is bored with food,” but that is too shallow and is not universally supported by evidence. The deeper chain is:

1. The owner must buy before knowing what the dog will accept.
2. Brand, ingredient, aroma, texture, novelty, price, health context, and routine are mixed together.
3. When a meal fails, the owner often changes several variables at once.
4. The next purchase creates more inventory, cost, waste, and guilt—but little reusable knowledge.
5. Important observations stay in memory, chat threads, receipts, or separate clinic records.
6. When health, environment, travel, or an urgent situation changes, the owner must rebuild the story from zero.

PawProud reverses that order. The trial creates an observable event before a commercial commitment. TastePrint shows what the event may weakly suggest and, just as importantly, what remains unknown. The First Bowl tests whether the early signal survives a real meal. The check-in converts consumption into evidence. Only then does a subscription become a convenience rather than a trap.

This chain supports both social value and business logic:

- **Direct value:** Taste Trial, one-time First Bowl, optional recurring food plan, and future paid support services.
- **Indirect value:** trusted referrals or partnerships with veterinarians, clinics, grooming, hygiene, training, travel, and other care providers—only with transparent incentives and owner consent.
- **Retention logic:** the user returns because the dog's context changes with meals, age, health, routine, environment, and life events—not because PawProud manufactures notifications.

Profitability is not the hackathon's primary claim. The business model matters because a care service needs an economically sustainable path to keep delivering social benefit.

## 4. Target users, beneficiaries, jobs, and pains

### Primary user and payer

A caring urban dog owner who wants to do the right thing but lacks a dependable way to learn from the dog's response. The useful beachhead includes owners of selective eaters, newly adopted dogs, dogs undergoing a normal food transition, or owners who have accumulated failed products. They are willing to follow a short structured process if it reduces uncertainty and does not lock them in.

### Co-user and beneficiary

The dog is not the payer and cannot complete a form, but its behaviour is the key response. Product design must therefore help the owner observe rather than project. The dog benefits through lower-pressure trials, safer stop rules, fewer arbitrary changes, and a care record that preserves context.

### Other stakeholders

- family members or caregivers who share routines;
- veterinarians and qualified care professionals who remain the authority for clinical decisions;
- fulfilment and food partners in a real service;
- judges and hackathon viewers who need to understand the problem, proof, boundaries, and impact quickly;
- international and service-dog owner teams as future users of a localised Care Passport—not as proof of current legal or clinical capability.

### Core jobs to be done

- “Help me stop guessing which sensory qualities my dog responds to.”
- “Help me compare one thing at a time and remember what happened.”
- “Let me make a small reversible purchase before a recurring commitment.”
- “Show me the evidence and the uncertainty in language I can understand.”
- “Keep the dog's care story together so I do not restart from zero.”
- “Tell me when the responsible next step is to pause and seek professional help.”

### Pains the experience must address

- wasted food and money after buying a large quantity too early;
- uncertainty, guilt, and the feeling of failing the dog;
- false personalisation based on a quiz rather than observed behaviour;
- confusing preference or tolerance with allergy, diagnosis, or nutrition;
- high-friction subscriptions and hidden recurring commitment;
- fragmented records and inconsistent caregiver memory;
- generic apps that feel like data entry rather than care;
- emergency features that overpromise instead of preparing useful information.

## 5. Locked hackathon scope

### In the build

- one responsive codebase with two clearly different web experiences;
- mobile-first Product Web with a complete usable demo journey;
- presentation-led Story Web for stage, judges, and self-guided exploration;
- English default and a Thai toggle in both experiences;
- meaningful visualisation and motion on every practical mock screen;
- a guided welcome with optional English audio;
- structured two-option Taste Trial and owner-observation capture;
- live Cloudflare Workers AI explanation with a deterministic fallback;
- animated TastePrint with visible known/unknown dimensions;
- simulated one-time checkout, delivery, check-in, and subscription controls;
- a stateful Care Passport and locally persisted demo state;
- explicit safety pauses, uncertainty language, and prototype truth labels.

### Not a hackathon deliverable

- **no physical Taste Flight box, food pouch, printed card, or other physical build;**
- no manufactured or shipped food;
- no validated nutrition formulation or allergy testing;
- no real payment, order, delivery, billing, or subscription backend;
- no production Bayesian preference model or ingredient-matching engine;
- no clinical diagnosis, treatment advice, triage, or emergency dispatch;
- no clinic availability data or marketplace transactions;
- no service-dog training, certification, registration, or access-right determination;
- no claim that a trial proves ingredient preference, health suitability, or causality.

### Future concepts, shown only as context

- **HomeReady:** environment and routine support that extends beyond the bowl;
- **Emergency Ready:** an owner-prepared summary and professional handoff, not diagnosis or dispatch;
- expert review, care-provider network, transparent marketplace/referrals;
- a larger ingredient/sensory module library that learns aroma, texture, moisture, familiarity, and individual response over repeated observations;
- multi-caregiver sharing, travel/jurisdiction modules, and service-dog-team support;
- real sensory sample operations, nutrition QA, traceability, recalls, and fulfilment.

The longer-term “signature mix” idea is a preference-memory and modular-service hypothesis, not permission for an algorithm to formulate a complete diet. Age, health, allergies, nutrition, and medication require qualified review and validated operations before they can influence a real food product.

## 6. Product architecture: two paths, one idea

| Experience | Route | Primary audience | Job |
|---|---|---|---|
| Presentation Web | `/` and `/story/` | judges, partners, teammates | Make the chain problem, insight, evidence, business logic, impact, boundaries, and demo handoff memorable. |
| Product Web | `/app/` | owner using the prototype | Let a user complete the core care loop and inspect every practical product state. |
| AI feedback endpoint | `POST /api/feedback` | Product Web | Explain a validated structured observation in plain English or Thai, with a safe fallback. |

The Product Web is deliberately implemented as a state machine inside `/app/`, not as a set of disconnected marketing pages. The bottom navigation exposes **Today, Taste, Plan, Passport, and More** after the guided flow.

## 7. Complete main flow

```text
Guided welcome
  → Safety snapshot
    → if concern: pause + professional-care guidance
    → if normal: two-taste comparison
      → record approach, intake, and body language
        → save observation
          → AI explanation or deterministic safe fallback
            → reveal animated TastePrint
              → inspect one-time First Bowl
                → simulated checkout + receipt
                  → meal check-in
                    → optional subscription decision
                      → Today / Plan / Care Passport
```

### Funnel and commitment logic

| Step | Commercial state | Value exchange | Required truth |
|---|---|---|---|
| Free Taste Trial | free | owner gives a few minutes and structured observation | Dog response is simulated in this prototype; no physical sample is provided. |
| TastePrint | no purchase | early evidence becomes legible | Preference logic is simulated and uncertainty remains visible. |
| First Bowl | one-time paid concept | a small reversible real-world test | Checkout, payment, product, and delivery are simulated. |
| Meal check-in | no new purchase | acceptance evidence updates the record | Owner-reported result is not a clinical assessment. |
| Subscription | optional recurring concept | convenience after demonstrated acceptance | Billing and fulfilment are simulated; pause, skip, and cancel must be visible. |

**Invariant:** never require or preselect a subscription before the user has seen a First Bowl result and completed a check-in.

### 7.1 People–physical service–web loop

PawProud is not meant to become a screen-only pet app. The web coordinates and remembers a service whose meaningful evidence comes from the owner and dog in the physical world.

```text
Dog responds in the real world
  ↓
Owner observes one controlled comparison
  ↓
Product Web structures the observation
  ↓
AI explains the record without changing it
  ↓
TastePrint shows signal + unknowns
  ↓
Owner makes a reversible First Bowl decision
  ↓
Physical meal produces a check-in
  ↓
Care Passport preserves the event and informs the next action
  ↓
Qualified partners join only when the need exceeds self-guided care
```

For the hackathon, the physical response, food, transaction, and fulfilment are simulated on the web. The interaction model demonstrates how a real physical service would be guided and documented; it is not a replacement for physical operations.

### 7.2 Usage rhythm and reason to return

| Moment | User trigger | Product value | Frequency status |
|---|---|---|---|
| First visit | “I keep guessing what my dog will eat.” | Guided trial and first visible signal. | Core demo moment. |
| Repeat comparison | Result is unclear or needs confirmation. | Same-method observation accumulates evidence instead of changing many variables. | Event-driven hypothesis; no universal interval is claimed. |
| First Bowl check-in | The one-time bowl has been tried. | Confirm acceptance and update the record. | Core demo moment. |
| Plan control | A recurring plan exists. | Skip, pause, cancel, or adjust without penalty. | UI shows a 14-day demo rhythm only; not a recommendation. |
| Context change | Age, routine, health, home, caregiver, or travel changes. | Revisit profile, Passport, and safe next step. | Event-driven, not notification-driven. |
| Professional handoff | Concern exceeds a preference trial. | Carry a concise, sourced record rather than diagnose. | Future service boundary. |

Frequency and recency should follow useful care moments. Return is earned when new evidence or a changed context can improve the next decision; reminders must never manufacture anxiety or imply that silence is unsafe.

## 8. Product Web screen inventory

Every screen below must communicate its state visually and support the intended control. A “mock” screen may simulate the external transaction, but it must not feel like a dead slide.

| Screen/state | Purpose | Required communication and interaction |
|---|---|---|
| Welcome / tutorial | Establish the hook and reduce uncertainty | Mascot-led motion, three-step promise, start with English audio or continue silently, link back to Story Web. |
| Safety snapshot | Confirm that a preference trial is appropriate today | Clear owner checklist, normal/concern branches, non-diagnostic disclaimer. |
| Safety hold | Protect welfare over data collection | Strong pause visual, safe next step, route to help or answer review. |
| Guided Taste Trial | Capture first approach without forcing certainty | Two visually distinct bowls, select A/B or “no clear choice,” animated response, physical-sample simulation label. |
| Observation capture | Add behavioural context | Segmented controls for approach, intake, and body language; structured and low-friction. |
| AI feedback | Translate the saved observation | Loading state, source badge (`Live AI` or `Safe fallback`), retry, known/unknown boundary. |
| TastePrint | Reveal an evidence-shaped profile | Animated four-petal visual; supported dimensions fill, unknown dimensions remain patterned; evidence count; no fake confidence score. |
| First Bowl | Present the next reversible commitment | Interactive 3D bowl and ingredient orbs, one-time purchase framing, explicit simulation label. |
| Checkout | Make price and scope understandable | Order summary, address/payment preview, one-time total, no hidden subscription. |
| Receipt | Close the mock transaction cleanly | Confirmation, simulated status, next-step handoff. |
| Meal check-in | Learn from actual use rather than checkout | Consumption/acceptance choices, simple owner report, updates state. |
| Optional subscription | Offer repeat only after evidence | Accept or decline, no default lock-in, clearly labelled simulated commerce. |
| Today | Give a useful next action | State-aware hero, TastePrint status, delivery preview, and Care Passport link. |
| Plan | Make recurring control practical | No-plan empty state or active plan with skip, pause, cancel, price, rhythm, and delivery details. |
| Delivery | Visualise service trust | Animated/visual status timeline, mock order and address labels, no claim of live logistics. |
| Care Passport | Show continuity across the whole system | Animated evidence timeline, provenance tags, owner control, sharing preview, future HomeReady/Emergency placeholders. |
| Dog profile | Separate entered identity from observed behaviour | Demo profile, editable-preview affordance, provenance note. |
| Help and safety | Make boundaries usable | Urgent-sign guidance, trial rules, route back to safety; never imply diagnosis. |
| More/settings | Support replay and access | language, tutorial sound, profile/help links, demo reset, return to presentation. |

## 9. Care Passport contract

Care Passport is the continuity layer, not a decorative profile and not a universal medical record. It connects events while preserving who said what.

Current prototype timeline:

1. owner-entered dog identity;
2. system-rendered TastePrint derived from simulated logic;
3. owner-reported Taste Trial observation;
4. simulated one-time First Bowl order;
5. owner-reported meal acceptance.

Each record should retain, when relevant:

- event type and time;
- source/provenance: owner, system, professional, or simulated demo;
- the raw observation separate from interpretation;
- confidence or uncertainty where appropriate;
- correction/history rather than silent overwrite;
- sharing status controlled by the owner;
- locale and jurisdiction for future international modules.

Care Passport must not imply that “none reported” means “no condition.” A future share function should reveal exactly which fields leave the owner's account and should support revocation. HomeReady and Emergency Ready are future projections on the same event history, not active services in this build.

## 10. AI contract

The AI has one narrow job: **turn a validated structured observation into two short, careful sentences.**

### Input

Allowlisted demo fields only:

- locale: English or Thai;
- fixed dog/scenario identity;
- first choice: chicken, salmon, or unclear;
- approach: quick, slow, or none;
- intake: most, some, or none;
- body language: bright, neutral, or avoid.

### Output

1. Say what was observed and what it may weakly suggest.
2. Say that it is an early signal and recommend repeating the same comparison another day before changing the regular food.

### Forbidden behaviour

The AI must never:

- choose or alter the recorded observation;
- invent a preference, ingredient, percentage, or confidence score;
- diagnose disease or infer allergy;
- claim nutritional suitability or prescribe a diet;
- override the safety state;
- recommend emergency treatment;
- hide whether the response came from live AI or fallback.

### Reliability design

- The Worker validates every field against an allowlist.
- The model uses a low-temperature, short, bounded prompt.
- A timeout or malformed response triggers deterministic copy.
- The UI labels the response source as `Live AI` or `Safe fallback`.
- The flow remains complete without an AI account or network response.
- No OpenAI credential is used; the deployed Worker uses a Cloudflare `AI` binding.

AI is an explanation layer, not the decision engine. TastePrint values, checkout, subscription, and Care Passport entries remain deterministic/simulated in this hackathon.

## 11. UX, art, visualisation, and motion principles

### Experience character

PawProud should feel **playful, observant, warm, and premium**—never childish, chaotic, clinical, or like a generic AI dashboard. Owners may be sceptical and detail-oriented, so charm must sit on top of clear hierarchy, strong states, and honest language.

### Visual system

- PawProud coral, cocoa, cream, honey, sky, and mint form the recognisable palette.
- The supplied PawProud mascot and wordmark are brand anchors, not decorative stickers pasted everywhere.
- Rounded forms suggest bowls, paws, cards, and care without turning the interface into a toy.
- High-contrast typography and compact body copy keep the mobile experience practical.
- “Owner-reported,” “System,” “Demo,” “Early signal,” and “Unknown” are visual trust primitives.

### Meaningful visualisation

- the **TastePrint petals** show dimensions, not vague “AI magic”;
- filled petals mean an early supported signal, while patterned petals remain visibly unknown;
- evidence dots show observation count rather than an invented confidence percentage;
- the 3D bowl and orbiting ingredient forms make the First Bowl feel tangible while remaining labelled as a concept;
- the Care Passport timeline makes provenance and continuity scannable;
- funnel, chain-problem, and evidence visuals on the Story Web explain causal order, not decoration.

### Motion rules

- use motion to show state change, attention, sequence, learning, progress, or causality;
- screen transitions should orient the user, not delay them;
- bowl selections, TastePrint reveal, journey paws, delivery timeline, and Passport progression should respond to user state;
- never animate safety warnings in a way that reduces readability or urgency;
- honour `prefers-reduced-motion` and preserve the information without animation;
- avoid endless decorative motion, autoplay surprises, scroll hijacking, and interaction that depends on hover.

### Interaction and accessibility baseline

- mobile-first at 360 px and comfortable through desktop;
- touch targets approximately 44 px or larger;
- keyboard-visible focus and semantic controls;
- readable contrast and no colour-only meaning;
- English default, Thai toggle without losing state;
- audio is optional, user-initiated, and never the only way to understand a step;
- plain-language safety and uncertainty copy;
- every apparent control works, is disabled with a reason, or is explicitly labelled as a preview.

## 12. Presentation Web contract

The Presentation Web is not a long app landing page. It is a stage companion that can also be explored by a judge after the pitch.

Recommended story spine:

1. **Hook:** The owner pays, but the dog is the real user.
2. **Chain problem:** buying before knowing creates waste without knowledge; “food boredom” alone is not the thesis.
3. **Reverse the order:** observe first, then interpret.
4. **Honest personalisation:** TastePrint makes evidence and uncertainty visible; AI only explains.
5. **Earn the repeat:** Free Trial → First Bowl → check-in → optional subscription.
6. **Care with memory:** Care Passport turns one meal into continuity, then points carefully to HomeReady and Emergency Ready.
7. **Proof and boundaries:** evidence cards, prototype truth labels, social impact, real/simulated table, and one-click demo handoff.

The stage experience should answer six judge questions without requiring narration:

- What is the painful chain?
- Who experiences it?
- Why is PawProud different from samples or personalised-food quizzes?
- Where does value repeat, and why might the business persist?
- What is working now versus simulated or future?
- How does this improve outcomes for both owner and dog?

## 13. Evidence snapshot and safe interpretation

The evidence establishes significance and design direction. It does **not** convert automatically into PawProud demand, subscription conversion, causal impact, or TAM.

| Evidence | What it supports | What it does not support |
|---|---|---|
| Thailand was modelled at **6.656 million dog-owning households (25.5%)** and **9.124 million companion dogs** in 2025. [Agriculture and Agri-Food Canada / Euromonitor summary](https://agriculture.canada.ca/en/international-trade/reports-and-guides/sector-trend-analysis-pet-food-thailand) | The national owner base is socially meaningful and measured in millions. | It is not a Thai census and not the number of PawProud customers. |
| Greater Bangkok was estimated at **1,290,848 owned dogs** and roughly **805,000 dog-owning households** from a 2023 survey/model. [Peer-reviewed study](https://pmc.ncbi.nlm.nih.gov/articles/PMC12070910/) | The initial service geography can still affect a large base. | Estimates are not direct counts or demonstrated demand. |
| In an online survey of 411 Thai dog owners, **palatability 60.1%**, **price/discount 57.7%**, and **brand 49.6%** were frequently selected purchase factors. [Veterinary World](https://veterinaryworld.org/Vol.18/October-2025/19.pdf) | Taste response matters alongside economics and trust; the wedge is relevant. | Multi-select, younger/female-skewed sample; not national prevalence or willingness to subscribe. |
| Thailand's 2025 dog-food retail market was reported at **US$988.4 million**. [Agriculture and Agri-Food Canada / Euromonitor summary](https://agriculture.canada.ca/en/international-trade/reports-and-guides/sector-trend-analysis-pet-food-thailand) | Food is a large physical category with repeated behaviour. | This is not PawProud's TAM, serviceable market, or projected revenue. |
| “Pet is bored with the same food” scored only **2.76/7** in a mixed international pet-owner survey, while nutrition, benefit, and consistent quality scored much higher. [Study](https://pmc.ncbi.nlm.nih.gov/articles/PMC6515811/) | Avoid a universal “bored dog” story; lead with fit, quality, and uncertainty reduction. | It does not mean no individual dog has preferences or rejects a food. |
| A six-dog pilot found first choice matched the most-consumed food in **89%** of tests. [Pilot study](https://pmc.ncbi.nlm.nih.gov/articles/PMC5863557/) | Observable choice may contain an individual preference signal worth studying. | The sample is far too small to validate a commercial algorithm. |
| Among 16 dogs in a reward study, six preferred variety, six consistency, and four were unclear. [Study](https://pmc.ncbi.nlm.nih.gov/articles/PMC6021384/) | Dogs differ; automatic novelty or rotation is not always better. | Rewards are not complete meals, and the sample is small. |
| In a US veterinary-client disaster-preparedness survey, only **13%** reported a current plan. [Study](https://www.frontiersin.org/journals/veterinary-science/articles/10.3389/fvets.2025.1442482/full) | Preparedness can be a meaningful future care problem. | It is not Thai prevalence and is not evidence for a current emergency product. |

Use [the Evidence & Insight Library](hackathon-evidence-insight-library-th.md) for the full dashboard, quality labels, metric definitions, source registry, and claim-safe language. Important rules:

- never add overlapping problem populations;
- never turn an association into a causal claim;
- never use retail category value as subscription TAM;
- never generalise a pilot preference test into algorithm accuracy;
- always keep geography, year, sample, denominator, and caveat with the number;
- distinguish external evidence, calculation, product hypothesis, prototype result, and future concept.

## 14. Social-value thesis and measurement

PawProud is designed for two beneficiaries: the owner and the dog.

```text
Structured low-pressure observation
  → less guessing and fewer uncontrolled changes
    → smaller reversible purchase
      → real-meal check-in and retained context
        → better-informed repeat decisions
          → potential reductions in waste, avoidable friction, and care discontinuity
```

The prototype does not prove those outcomes. A later pilot should measure them directly.

Candidate dual-beneficiary measures:

- completion of a safe trial without a safety-stop violation;
- percentage of trials with a recorded “unclear” result rather than forced choice;
- time and effort required to record a meal;
- First Bowl acceptance and check-in completion;
- unused-food or abandoned-product quantity before/after the service;
- owner confidence **and** calibration—confidence should not rise faster than evidence;
- pause/skip/cancel success and absence of unwanted recurring orders;
- welfare incidents and appropriate professional referrals;
- Care Passport correction, provenance, and sharing comprehension.

The North Star is not screen time or subscription rate. It is **verified useful care decisions per active owner–dog team**, constrained by welfare and truthfulness.

## 15. Technical architecture

```text
Browser
  ├─ Presentation Web: Next.js static route `/` + `/story/`
  ├─ Product Web: Next.js static route `/app/`
  │    ├─ React state machine
  │    ├─ localStorage key `pawproud-demo-v1`
  │    ├─ Motion animations
  │    └─ React Three Fiber / Three.js bowl visual
  └─ POST `/api/feedback`
       └─ Cloudflare Worker
            ├─ strict payload allowlist
            ├─ Workers AI model call
            └─ deterministic fallback

Cloudflare Worker
  ├─ `ASSETS` binding serves static export from `frontend/out`
  └─ `AI` binding serves the bounded feedback endpoint
```

Technology in the current build:

- Next.js 16 App Router with static export;
- React 19 and TypeScript;
- Tailwind CSS 4 plus a custom token system;
- Motion for state and story transitions;
- Three.js / React Three Fiber for the bowl visual;
- Cloudflare Worker + Workers AI;
- browser `localStorage` for replayable demo persistence.

The existing `backend/` Go/Supabase scaffold is not part of the current runtime. Do not introduce a database merely to make the hackathon architecture look larger. A production system would need authenticated owner accounts, consent, event provenance, privacy controls, audit history, operational integrations, and professional data governance.

### Local development

```bash
cd frontend
npm ci
npm run dev
```

- Presentation: `http://localhost:3000/` or `/story/`
- Product: `http://localhost:3000/app/`
- Under plain `next dev`, AI feedback may use the safe client fallback because the Cloudflare binding is absent.

### Validate and preview

```bash
npm run typecheck
npm run build
npm run deploy:dry
npm run preview
```

### Deploy

```bash
cd frontend
npx wrangler login
npm run deploy
```

Cloudflare bindings live in `frontend/wrangler.jsonc`. No OpenAI API key is required or expected.

## 16. Real, simulated, and future boundary

| Capability | Status in hackathon | UI obligation |
|---|---|---|
| Navigation and complete stateful flow | **Real** | Must work end-to-end and survive refresh through local persistence. |
| English/Thai switch | **Real** | English default; state remains intact. |
| Visualisation and animation | **Real** | Must communicate choice, progress, evidence, uncertainty, and continuity. |
| Owner observation capture | **Real interaction, demo data** | Store locally; label dog/profile scenario as demo. |
| AI feedback | **Live when Worker AI is available** | Show `Live AI`; never block the flow if unavailable. |
| AI fallback | **Real deterministic fallback** | Show `Safe fallback`; preserve the same guardrails. |
| Preference inference / TastePrint values | **Simulated** | Label as early/simulated; show unknown dimensions. |
| First Bowl product and recipe | **Concept** | No nutrition, manufacturing, or suitability claim. |
| Checkout/payment | **Simulated** | No charge; no credential collection; visible one-time framing. |
| Delivery timeline | **Simulated** | No live tracking claim. |
| Subscription billing/fulfilment | **Simulated** | Pause, skip, and cancel interaction must still work locally. |
| Care Passport | **Interactive mock** | Provenance, owner control, and non-clinical boundary stay visible. |
| HomeReady / Emergency Ready | **Future concept** | Context only; no emergency dispatch, diagnosis, or partner availability. |
| Physical box or food samples | **Not delivered** | Say so explicitly wherever a physical trial is represented. |

## 17. Contribution rules

### Before editing

1. Read this brief.
2. Check the current Git branch and working tree; do not overwrite another collaborator's changes.
3. Review the exact flow on mobile before proposing a new route or feature.
4. For claims or numbers, consult the Evidence Library rather than copying a slide without context.

### Product rules that require team agreement to change

- the hook “let the dog answer first”;
- Free Trial → TastePrint → one-time First Bowl → check-in → optional subscription;
- no subscription before acceptance evidence;
- AI explains but does not decide;
- preference and commerce remain visibly simulated;
- no physical-box deliverable for this hackathon;
- Care Passport preserves source/provenance and uncertainty;
- food is the current proof; HomeReady and Emergency Ready remain future context;
- English default with Thai toggle;
- welfare and professional-care boundaries outrank engagement or conversion.

### Implementation etiquette

- keep components focused and TypeScript typed;
- prefer a small coherent addition over a new library;
- reuse the existing brand tokens and visual grammar;
- do not add generic chat bubbles, gradient AI dashboards, meaningless scores, or fabricated testimonials;
- all new visible controls must do something or be labelled as preview;
- preserve reduced-motion and keyboard access;
- never commit API keys, account tokens, or personal data;
- explain the real/simulated status in the pull request or handoff;
- include mobile evidence for visual changes.

## 18. Acceptance criteria

### Product Web

- [ ] A first-time user can complete Welcome → Safety → Trial → Observation → Feedback → TastePrint → First Bowl → mock Checkout → Check-in → Subscription decision without instruction from the team.
- [ ] Choosing a safety concern stops the trial and exposes appropriate non-diagnostic help.
- [ ] “No clear choice” is a valid result; the UI never forces false certainty.
- [ ] AI success and fallback both lead to a complete experience and are labelled correctly.
- [ ] TastePrint distinguishes observed signal from dimensions still learning.
- [ ] First Bowl is one-time; subscription appears only after the meal check-in.
- [ ] Subscription can be declined; a selected demo plan can be paused, skipped, and cancelled.
- [ ] Today, Plan, Delivery, Profile, Help, More, and Care Passport are reachable and state-aware.
- [ ] Demo reset returns the flow to a clean state.
- [ ] English is default and the Thai toggle preserves state.
- [ ] Every practical mock screen contains purposeful visual communication or state motion, not a dead placeholder.
- [ ] No physical product, payment, delivery, medical, emergency, or legal capability is presented as live.

### Presentation Web

- [ ] The hook and solution are understandable in the first screen.
- [ ] The chain problem, not generic “food boredom,” is visible.
- [ ] The complete funnel and reason for optional subscription are legible.
- [ ] Evidence cards retain source, sample/geography, and caveat.
- [ ] The service-dog inspiration and its boundaries are explained accurately.
- [ ] Real, simulated, and future elements are clearly separated.
- [ ] Care Passport is positioned as continuity, not as a verified medical record.
- [ ] A one-click handoff enters the Product Web demo.
- [ ] The page works for both a narrated stage pitch and self-guided review.

### Quality and handoff

- [ ] `npm run typecheck` passes.
- [ ] `npm run build` passes.
- [ ] `npm run deploy:dry` succeeds before production deployment.
- [ ] Key flows are checked at a 360 px mobile viewport and a desktop viewport with no accidental horizontal overflow.
- [ ] Keyboard focus, contrast, touch targets, language switch, optional audio, and reduced motion are checked.
- [ ] There are no unexpected console errors on the main Story and Product paths.
- [ ] The deployed `/api/feedback` is tested once for live AI and once for invalid input/fallback behaviour.
- [ ] The handoff names the deployed URL, branch/commit, what was tested, and any remaining limitation.

## 19. Document hierarchy and change protocol

Use these documents in this order:

1. **This file — current collaborator and implementation contract.**
2. [Product Experience Blueprint](product-design-blueprint-th.md) — detailed journeys, flows, diagrams, screen logic, design, and service architecture. Its physical-kit sections are historical/future context for this build.
3. [Hackathon Source of Truth v2](hackathon-source-of-truth-v2-th.md) — fuller business reasoning, market context, operational logic, pitch, Q&A, and decision history. Any physical prototype requirement there is superseded here.
4. [Evidence & Insight Library](hackathon-evidence-insight-library-th.md) — evidence dashboard, metric dictionary, source registry, and claim limitations.
5. Current code and verified deployed behaviour.

When a new decision changes the funnel, truth boundary, target user, safety rule, AI role, or deliverable scope:

1. write the decision and reason in this file;
2. identify which older statement it supersedes;
3. update user-facing truth labels and tests in the same change;
4. tell collaborators in the commit or pull-request summary.

The shared product principle is simple:

> **Do not make the system look more certain than the evidence, more real than the prototype, or more caring than its behaviour.**
