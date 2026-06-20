# Pulse State Effects

**Version 1.0.0**  
Pulse Component Workflow  
June 2026

> This compiled document is optimized for AI-assisted component work. It mirrors the `vercel-react-best-practices` shape: short entry point, metadata, expanded rule catalog, and deterministic validation gates.

---

## Abstract

Designs React state, effects, refs, memoization, subscriptions, cleanup, and hydration-safe render logic for components in this Laravel Inertia React 19 app. Use when local state, effects, subscriptions, browser stores, refs, memoization, or hydration-safe rendering decisions are needed.

---

## Table of Contents

1. [Skill Contract](#skill-contract)
2. [Purpose](#purpose)
3. [When to Apply](#when-to-apply)
4. [When Not to Apply](#when-not-to-apply)
5. [Inputs](#inputs)
6. [Outputs](#outputs)
7. [Rule Catalog](#rule-catalog)
8. [Responsibilities](#responsibilities)
9. [Non-Responsibilities](#non-responsibilities)
10. [Workflow](#workflow)
11. [Decision Points](#decision-points)
12. [Checklists](#checklists)
13. [Documentation Discipline](#documentation-discipline)

---

## Skill Contract

| Field                  | Value                         |
| ---------------------- | ----------------------------- |
| Name                   | `pulse-state-effects`         |
| Canonical architecture | `vercel-react-best-practices` |
| Primary entry point    | `SKILL.md`                    |
| Rule catalog           | `rules/`                      |
| Metadata               | `metadata.json`               |

## Purpose

Avoid derived state bugs, effect misuse, stale closures, hydration mismatches, and unnecessary renders.

## When to Apply

- A component needs local state, effects, subscriptions, timers, observers, or refs.
- Hydration mismatch risk exists.
- Event handlers, memoization, or external stores need design.
- Custom hooks are being extracted.

## When Not to Apply

- Component is static presentational markup.
- State/effect decisions are already trivial and local.

## Inputs

Required:

- Component architecture.
- Behaviour requirements.

Optional:

- Hydration warnings.
- Performance symptoms.
- Existing hook code.

## Outputs

- State model.
- Effect plan.
- Ref and cleanup plan.
- Hydration safety notes.
- Hook extraction guidance.

## Rule Catalog

| Rule                                                          | Purpose                                            |
| ------------------------------------------------------------- | -------------------------------------------------- |
| [Responsibilities](rules/responsibilities.md)                 | What this skill owns.                              |
| [Non-Responsibilities](rules/non-responsibilities.md)         | What this skill explicitly does not own.           |
| [Workflow](rules/workflow.md)                                 | Step-by-step execution process.                    |
| [Decision Points](rules/decision-points.md)                   | Branching rules and handoff decisions.             |
| [Checklists](rules/checklists.md)                             | Pre-flight, execution, and completion checks.      |
| [Documentation Discipline](rules/documentation-discipline.md) | Shared documentation-source rule for code changes. |

---

## Responsibilities

- Decide state shape and ownership.
- Keep render deterministic.
- Design effect dependencies and cleanup.
- Use refs for transient values.
- Decide when memoization is meaningful.
- Use `useSyncExternalStore` for external browser stores when needed.
- Treat React `memo`, `useMemo`, and `useCallback` as targeted tools for real cost or identity boundaries.

---

## Non-Responsibilities

- Public API design.
- Motion-specific animation values.
- Performance review beyond state/effect mechanics.

---

## Workflow

1. Derive state during render when possible.
2. Avoid mirroring props into state without a clear reason.
3. Keep render free of `Date.now()`, `Math.random()`, locale-only formatting, and browser-only branches.
4. Prefer event handlers over effects for interaction-specific logic.
5. Keep effect dependencies narrow and primitive where practical.
6. Clean up timers, animation frames, observers, requests, and listeners.
7. Use functional updates when callbacks only need previous state.

---

## Decision Points

- Use refs for pointer positions, latest callbacks, frame IDs, scroll offsets, and timestamps.
- Use memoization only for expensive calculations or identity-sensitive children/effects.
- Use `startTransition` or `useDeferredValue` only for non-urgent or expensive updates.
- For hydration warnings, fix deterministic first render before suppressing warnings or moving logic client-only.

---

## Checklists

Pre-flight:

- Behaviour requiring state is identified.
- SSR or hydration context is known.

Execution:

- Initial render is deterministic.
- Effects have cleanup.
- Derived state is not duplicated.

Completion:

- State shape is minimal.
- No browser-only branch breaks hydration.
- Hook extraction remains reusable and typed.

---

## Documentation Discipline

Use the shared Pulse documentation-source rule.

Skill-specific application:

- Start from this skill's owning scope and local project conventions.
- Use Laravel Boost `search-docs` before code changes. Do not skip this step.
- Use `pulse-docs-research` when framework, library, hydration, testing, browser, or accessibility details affect implementation.

---

## Integration

Runs after architecture and API design, before implementation, performance review, behaviour testing, and review.
