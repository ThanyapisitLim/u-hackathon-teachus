# PawProud

> **The payer chooses. The real user answers after checkout. PawProud lets the dog answer first.**

PawProud is a mobile-first hackathon prototype for learning a dog's food preferences before asking the owner to commit to a recurring purchase. A guided Taste Trial becomes an honest, visual **TastePrint**; the owner can then buy one **First Bowl**, report how it went, and only then choose an optional subscription. The same evidence trail becomes the dog's owner-controlled **Care Passport**.

**นิยามสั้นภาษาไทย:** PawProud คือระบบที่ให้น้องหมา “ตอบก่อน” ผ่านการทดลองรสชาติแบบมีโครงสร้าง บันทึกสิ่งที่เกิดขึ้นเป็น TastePrint แล้วให้เจ้าของลองซื้อเพียงหนึ่งมื้อ เช็กผลจริง และค่อยเลือก Subscription โดยข้อมูลทั้งหมดต่อเนื่องอยู่ใน Care Passport

This is not a service-dog provider. It borrows the care discipline behind good assistance-dog systems—welfare, fit, preparation, continuity, clear roles, and follow-up—and applies that thinking to everyday owner–dog care. It does not train, certify, register, or create legal access rights for service dogs.

## What is in this repository

- **Presentation Web** — `/` and `/story/`: judge-first story, evidence, business logic, impact, prototype truth, and a direct handoff into the demo.
- **Product Web** — `/app/`: one complete, stateful flow from guided welcome and safety check to Taste Trial, AI explanation, TastePrint, First Bowl, check-in, optional subscription, and Care Passport.
- **Live AI feedback** — `POST /api/feedback`: Cloudflare Workers AI explains structured owner observations. A deterministic safety-bounded fallback keeps the flow usable locally or if AI is unavailable.
- **Research and product documentation** — `docs/`: the current collaborator brief plus the Thai source of truth, evidence library, and detailed product blueprint.

There is **no physical box deliverable in this hackathon build**. Food samples, preference-learning logic, checkout, payment, delivery, and subscription commerce are represented as clearly labelled simulations. Navigation, state, language switching, interaction, visualisation, animation, persistence, and the AI feedback/fallback path are functional.

## Start here

Read [docs/COLLABORATOR_BRIEF.md](docs/COLLABORATOR_BRIEF.md) before changing product scope or copy. It is the current implementation contract and overrides older planning details when they conflict.

Supporting Thai documents:

- [Product Experience Blueprint](docs/product-design-blueprint-th.md) — journeys, flows, screens, service blueprint, design system, and earlier build plan.
- [Hackathon Source of Truth v2](docs/hackathon-source-of-truth-v2-th.md) — business thesis, market logic, operations, impact, pitch, and decision log.
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
- `http://localhost:3000/app/` — Product Web

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

PawProud is designed to earn trust through small observable proof: **try first, learn once, pay for one bowl, verify acceptance, then decide whether to repeat.**
