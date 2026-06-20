---
name: pulse-state-effects
description: Designs React state, effects, refs, memoization, subscriptions, cleanup, and hydration-safe render logic for components in this Laravel Inertia React 19 app. Use when local state, effects, subscriptions, browser stores, refs, memoization, or hydration-safe rendering decisions are needed.
---

# Laravel React Component State Effects

Keep React component state and effects predictable, minimal, and hydration-safe.

## Purpose

Avoid derived state bugs, effect misuse, stale closures, hydration mismatches, and unnecessary renders.

## When to Use

- A component needs local state, effects, subscriptions, timers, observers, or refs.
- Hydration mismatch risk exists.
- Event handlers, memoization, or external stores need design.
- Custom hooks are being extracted.

## When NOT to Use

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

## Rules

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

- [Responsibilities](rules/responsibilities.md)
- [Non-Responsibilities](rules/non-responsibilities.md)
- [Workflow](rules/workflow.md)
- [Decision Points](rules/decision-points.md)
- [Checklists](rules/checklists.md)
- [Documentation Discipline](rules/documentation-discipline.md)

## Integration

Runs after architecture and API design, before implementation, performance review, behaviour testing, and review.
