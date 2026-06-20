# Pulse Workflow Routing Matrix

Deterministic routing for `pulse-workflow-orchestrator`. The orchestrator is a lightweight
coordinator: it reads the task signals, selects the minimal skill subset, enforces the
two gates in `validation-gates.md`, and hands off. It does not re-implement skill logic.

Routing is deterministic: the same task signals select the same skill subset.

## Phase 0: Intake (always, for new components)

- `pulse-create-component` gathers the component brief, then hands off here.

## Phase 1: Discovery (always run, scale to the task)

- `pulse-requirements-analysis` - when acceptance criteria or behaviour scenarios are undefined.
- `pulse-existing-audit` - before any new code, to find reusable patterns.
- `pulse-reuse-decision` - when a similar component or pattern may already exist.
- `pulse-docs-research` - when any framework, library, hydration, gesture, accessibility,
  or testing detail is uncertain. Mandatory before code changes (Boost `search-docs`).
- Consult `RADIX-PRIMITIVES.md` (`RADIX-PRIMITIVES.md`) and determine
  whether existing Radix primitives cover the interaction before custom logic.

## Phase 2: Design (select by signal)

Select only the owners whose signal is present.

| Signal in the task                                            | Route to                       |
| ------------------------------------------------------------- | ------------------------------ |
| New component, file placement, hook/helper extraction         | `pulse-architecture-boundaries`|
| Public or reusable props, callbacks, slots, compound parts    | `pulse-api-contract`           |
| Local state, effects, refs, memoization, hydration-safe render| `pulse-state-effects`          |
| Page props, navigation, forms, Wayfinder, deferred data, SSR  | `pulse-inertia-integration`    |
| Dialog, menu, popover, tabs, accordion, asChild, portal       | `pulse-radix-composition`      |
| Styling, variants, tokens, spacing, dark mode, responsive     | `pulse-tailwind-design-system` |
| Interaction, focus, keyboard, screen reader, reduced motion   | `pulse-accessibility-wcag`     |
| Animation, gestures, micro-interactions, autoplay             | `pulse-motion-interactions`    |
| Images, video, lazy media, alt text, request count            | `pulse-media-assets`           |
| Hydration cost, render cost, bundle, lazy imports, waterfalls | `pulse-performance-vercel`     |

## Gate 1: Definition of Ready

Enforce `validation-gates.md` Gate 1. On failure, route back to the owning skill. On
unknown APIs, route through `pulse-docs-research`. On scope or dependency decisions,
escalate to the user.

## Phase 3: Test planning and authoring (when meaningful behaviour exists)

- `pulse-tdd-planning` - define behaviour scenarios and public API expectations first.
- `pulse-behavior-testing` - author Jest + React Testing Library tests.

## Phase 4: Implementation

- `pulse-implementation` - execute the approved plan.
- `pulse-refactor-safety` - when changing existing components without changing behaviour.

## Phase 5: Verification and documentation

- `pulse-browser-verification` - for interaction-heavy, responsive, or gesture behaviour.
- `pulse-documentation-dx` - when a reusable component needs documentation (only if
  explicitly requested or an existing docs file should be updated).

## Gate 2: Definition of Done

- `pulse-review-quality-gate` enforces `validation-gates.md` Gate 2 by delegating to domain
  Completion checklists (see `review-aggregation.md`).

## Minimality rule

Use the smallest subset that covers the request. A minor local edit may use only
discovery + implementation + the one relevant domain owner. Never run every skill for a
minor change. Skipped phases are reported, not silently dropped.
