# PawProud frontend

This package contains both PawProud web experiences and the Cloudflare Worker that serves them:

- Presentation Web: `/` and `/story/`
- Product hub: `/app/`
- Food Lab status/detail: `/app/food/`
- Resumable Food Trial: `/app/food/trial/`
- PawSense: `/app/ai/`
- Care Passport: `/app/passport/`
- Guarded AI feedback endpoint: `POST /api/feedback`

Read [`../docs/COLLABORATOR_BRIEF.md`](../docs/COLLABORATOR_BRIEF.md) before changing scope, routes, safety copy, AI behaviour, or prototype-truth labels.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000/app/` for the normal owner entry. Plain Next.js development does not expose the Cloudflare AI binding, so PawSense may use its deterministic fallback locally.

## Route and state rule

Routes own navigation; browser storage owns care continuity. `pawproud-demo-v2` stores the selected language, `foodTrialStep`, observations, feedback provenance, and simulated service state, but it never stores the current screen. Therefore:

- refreshing `/app/` stays on the hub;
- `/app/food/` remains the normal Food Lab start/resume door;
- `/app/food/trial/` resumes saved progress;
- `/app/food/trial/?reset=1` clears the demo care journey (while keeping the language) and starts fresh;
- `/app/ai/` and `/app/passport/` read the same care record without hijacking future navigation.

The Food Trial includes a simulated camera step so the prototype remains dependable on judges' devices. It demonstrates the intended viewfinder, countdown, capture, preview, and processing sequence without requesting camera permission, uploading an image, or claiming computer-vision analysis. PawSense reads the structured observations the owner confirms after this step.

## Validate and deploy

```bash
npm run typecheck
npm run lint
npm run build
npm run deploy:dry
```

Preview with Cloudflare bindings using `npm run preview`. Deploy the static export and Worker with `npm run deploy` after Cloudflare authentication.
