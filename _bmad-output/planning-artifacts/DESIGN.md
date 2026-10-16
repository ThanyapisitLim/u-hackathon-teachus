# DESIGN: PawProud app

Direction: **pet health booklet**. Trust first, cute second. A vaccine book that is pleasant to use, not a pastel pet app.

## Principles
1. **One signal colour.** Coral (`--coral-dark`) marks things that need action (primary button, active tab, overdue). Never decoration.
2. **Rules, not cards.** Group with hairlines and ink rules. Use a bordered card only for the single main object on a screen.
3. **Ink on paper.** Flat warm paper background, near-black ink, no gradients, no glows, no shadows.
4. **Stamps for status.** Overdue / due soon / on track are small bordered stamps (`Badge stamp`), slightly rotated. Status is never a pastel pill.
5. **Bare icons.** Icons sit on the page in ink or muted grey. No icon inside a tinted rounded square.
6. **Motion has a job.** Keep: ticking a mission, finishing all missions, dismissing a notice, tab indicator, chat bubbles. Everything else is a short fade.
7. **Small radii.** 8-12px. Round only checkboxes and dots.

## Tokens (`src/app/globals.css`)
| Token | Value | Use |
|---|---|---|
| `--canvas` | `#faf7f1` | page |
| `--paper` | `#fffdf9` | cards, inputs |
| `--soft` | `#f1ebdd` | illustration and map backdrop |
| `--ink` | `#1b1714` | text, rules, checkboxes |
| `--muted` | `#6b635b` | secondary text, icons |
| `--line` | `#d8d0c2` | hairlines |
| `--coral-dark` | `#c22e43` | the one action colour |
| `--success / --warning / --danger` | `#1f6f4a / #8a5a00 / #b42332` | status only |

## Type
IBM Plex Sans Thai (400/500/600/700) for everything, via `next/font`. Page title 28/700, section heading 15/700 over a 2px ink rule, body 15, secondary 13-14. Numbers use `tabular-nums`.

## Imagery
Photos for real things (products, places). Flat illustrations for teaching (lessons) on the `--soft` backdrop. No emoji.

## Do not
Gradient backgrounds, glow shadows, pill badges, icon tiles, all-white card stacks, staggered entrance on every list, generic greetings ("Good day").
