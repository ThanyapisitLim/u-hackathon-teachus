# PawProud

> **The payer chooses. The real user answers after checkout. PawProud lets the dog answer first.**

PawProud is a mobile-first hackathon prototype for learning a dog's food preferences across eligible products from trusted existing brands before asking the owner to commit to recurring delivery. A guided Taste Trial becomes an honest, visual **TastePrint**; the owner can then buy one **First Match**, report how it went, and only then choose an optional **Adaptive Refill**. PawProud is the decision-and-replenishment layer—not another food manufacturer. The same evidence trail becomes the dog's owner-controlled **Care Passport**.

**นิยามสั้นภาษาไทย:** PawProud คือระบบคัดเลือกอาหารจากหลายแบรนด์ที่ให้น้องหมา “ตอบก่อน” ผ่านการทดลองแบบมีโครงสร้าง บันทึกสิ่งที่เกิดขึ้นเป็น TastePrint แล้วให้เจ้าของลองซื้อ First Match ครั้งเดียว เช็กผลจริง และค่อยเลือก Adaptive Refill โดยข้อมูลทั้งหมดต่อเนื่องอยู่ใน Care Passport

This is not a service-dog provider. It borrows the care discipline behind good assistance-dog systems—welfare, fit, preparation, continuity, clear roles, and follow-up—and applies that thinking to everyday owner–dog care. It does not train, certify, register, or create legal access rights for service dogs.

## Live prototype

- **Presentation Web:** [pawproud.pawproud-u-hackathon.workers.dev/story/](https://pawproud.pawproud-u-hackathon.workers.dev/story/)
- **Product Web:** [pawproud.pawproud-u-hackathon.workers.dev/app/](https://pawproud.pawproud-u-hackathon.workers.dev/app/)
- **Implementation branch:** `codex/pawproud-experience`

The deployed Worker serves both sites, the optional ElevenLabs onboarding audio, and the guarded `POST /api/feedback` Workers AI endpoint.

## What is in this repository

- **Presentation Web** — `/` and `/story/`: judge-first story, evidence, business logic, impact, prototype truth, and a direct handoff into the demo.
- **Product Web** — semantic owner routes under `/app/`: a service hub, Food Lab status, resumable Taste Trial, a simulated camera handoff, visible PawSense explanation, and Care Passport. The core flow continues from safety check through TastePrint, First Bowl, check-in, and optional subscription.
- **Live AI feedback** — `POST /api/feedback`: Cloudflare Workers AI explains structured owner observations. A deterministic safety-bounded fallback keeps the flow usable locally or if AI is unavailable.
- **Research and product documentation** — `docs/`: the current collaborator brief plus the Thai source of truth, evidence library, and detailed product blueprint.

There is **no physical box deliverable in this hackathon build**. Food samples, the trial camera, preference-learning logic, checkout, payment, delivery, and subscription commerce are represented as clearly labelled simulations. The simulated camera includes a viewfinder, countdown, capture feedback, preview, and processing transition so judges can understand the intended physical-world workflow without relying on camera hardware or permission prompts. Navigation, state, language switching, interaction, visualisation, animation, persistence, and the AI feedback/fallback path are functional.

## Start here

Read [docs/COLLABORATOR_BRIEF.md](docs/COLLABORATOR_BRIEF.md) before changing product scope or copy. It is the current implementation contract and overrides older planning details when they conflict.

Supporting Thai documents:

- [Product Experience Blueprint](docs/product-design-blueprint-th.md) — journeys, flows, screens, service blueprint, design system, and earlier build plan.
- [Hackathon Source of Truth v2](docs/hackathon-source-of-truth-v2-th.md) — business thesis, market logic, operations, impact, pitch, and decision log.
- [Multi-brand Market Model](docs/market-model-multibrand-th.md) — current market boundary, market-sizing ladder, revenue bridge, competition, and Thai operating constraints. This document overrides older proprietary-formula assumptions.
- [Evidence & Insight Library](docs/hackathon-evidence-insight-library-th.md) — statistics, source registry, evidence strength, limitations, and safe claim language.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
cd frontend
npm ci
npm run dev
```

Open:

- `http://localhost:3000/` — Presentation Web
- `http://localhost:3000/story/` — Presentation Web explicit route
- `http://localhost:3000/app/` — Product Web service hub; this is always the normal app entry
- `http://localhost:3000/app/food/` — Food Lab status/detail and start-or-resume control
- `http://localhost:3000/app/food/trial/` — resumable Taste Trial; add `?reset=1` for a fresh trial
- `http://localhost:3000/app/ai/` — PawSense explanation surface
- `http://localhost:3000/app/passport/` — Care Passport continuity view

### Navigation and persistence contract

The URL owns the current product area. Refreshing `/app/` therefore returns to the service hub instead of reopening a transient form. The browser stores the care record—language, Food Trial progress and observations, AI feedback provenance, order/check-in state, and optional-plan controls—under `pawproud-demo-v2`; it does **not** store the current screen. `/app/food/trial/` resumes the stored Food Trial step, while `/app/food/trial/?reset=1` deliberately clears the demo care journey (while keeping the selected language) and starts at safety.

Presentation CTAs must deep-link to the experience they promise: general product links go to `/app/`, food-story links go to `/app/food/`, Care Passport links go to `/app/passport/`, and the full fresh demo goes to `/app/food/trial/?reset=1`.

`next dev` does not provide the Cloudflare AI binding, so the Product Web intentionally uses its deterministic fallback if `/api/feedback` is unavailable. To test the Worker and AI binding locally after a production build:

```bash
npm run preview
```

Useful checks:

```bash
npm run typecheck
npm run build
npm run deploy:dry
```

Deployment uses Cloudflare Workers static assets plus a Worker endpoint:

```bash
npx wrangler login
npm run deploy
```

No OpenAI key is required. The Cloudflare `AI` binding and static `ASSETS` binding are declared in `frontend/wrangler.jsonc`.

## Repository map

```text
frontend/
  public/brand/             PawProud supplied brand assets
  public/audio/             optional English onboarding guide
  src/app/                  Next.js routes and global styling
  src/components/product/   Product Web state machine and visualisations
  src/components/story/     Presentation Web storytelling experience
  worker/index.ts           validated AI-feedback endpoint + safe fallback
  wrangler.jsonc            Cloudflare bindings and deployment config
backend/                    earlier Go/Supabase scaffold; not used by this prototype
docs/                       current requirements, research, and design sources
```

## Contributing

1. Start from the current branch and make a focused branch; do not push directly over another collaborator's work.
2. Treat `docs/COLLABORATOR_BRIEF.md` as the scope and acceptance contract.
3. Preserve prototype truth labels. Never present simulated preference, commerce, delivery, clinical, emergency, or legal behaviour as live.
4. Keep English as the default and maintain the Thai toggle when adding user-facing product copy.
5. Test the complete mobile journey, not only isolated components. All controls shown as actionable should work or be explicitly labelled as a preview.
6. Before handing off, run `npm run typecheck` and `npm run build`, then report what was tested and any known limitation.

PawProud is designed to earn trust through small observable proof: **try first, learn once, pay for one matched order, verify acceptance, then decide whether to refill.**
