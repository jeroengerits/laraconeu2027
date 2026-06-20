# Pulse Performance Vercel

**Version 1.0.0**  
Pulse Component Workflow  
June 2026

> This compiled document is optimized for AI-assisted component work. It mirrors the `vercel-react-best-practices` shape: short entry point, metadata, expanded rule catalog, and deterministic validation gates.

---

## Abstract

Applies Vercel-style React performance practices to components in this Laravel Inertia app. Use for hydration safety, render cost, memoization, lazy imports, bundle size, waterfalls, media loading, request count, Suspense, and responsive performance.

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
| Name                   | `pulse-performance-vercel`    |
| Canonical architecture | `vercel-react-best-practices` |
| Primary entry point    | `SKILL.md`                    |
| Rule catalog           | `rules/`                      |
| Metadata               | `metadata.json`               |

## Purpose

Keep component rendering fast, hydration stable, bundles lean, and loading behaviour intentional.

## When to Apply

- Component affects first paint, hydration, large lists, media, or bundles.
- Render performance, request count, or lazy loading is being changed.
- There are hydration mismatch warnings.
- Heavy libraries or imports may be introduced.

## When Not to Apply

- Change is purely copy or local styling with no performance surface.
- Optimization would be speculative and unmeasured.

## Inputs

Required:

- Component behaviour and render surface.
- Existing imports and assets.

Optional:

- Browser logs.
- Build output.
- Performance complaint.
- Hydration warning.

## Outputs

- Performance risk assessment.
- Lazy loading and bundle guidance.
- Hydration safety notes.
- Verification commands.

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

- Keep render pure and cheap.
- Avoid hydration mismatches.
- Choose memoization only when identity or cost matters.
- Recommend lazy imports for heavy optional features.
- Reduce asset and data waterfalls.
- Coordinate media loading with the media assets skill.
- Keep animation loops, observers, and timers idle when components are offscreen or users are interacting directly.

---

## Non-Responsibilities

- Backend query optimization.
- Animation-specific performance internals.
- Rewriting unrelated code.

---

## Workflow

1. Check for render-time nondeterminism.
2. Hoist static arrays, objects, variants, and transitions.
3. Avoid expensive work in render paths.
4. Use `useMemo` for expensive calculations, not simple expressions.
5. Use `useCallback` only when identity matters.
6. Start independent async work early and await together when applicable.
7. Dynamically import heavy optional components.
8. Verify first render is deterministic before optimizing later renders.
9. Run frontend build when imports, assets, lazy loading, or Vite behaviour change.

---

## Decision Points

- Prefer stable data snapshots over client-only first-render branches.
- Use `startTransition` for non-urgent updates.
- Use `useDeferredValue` for expensive render paths driven by fast input.
- Keep feature-specific dependencies out of shared primitives.
- Use memoization only when props are stable or calculations are expensive enough to justify it.

---

## Checklists

Pre-flight:

- Render and bundle surface are known.
- Hydration risk is assessed.

Execution:

- Initial render is deterministic.
- Effects and async work clean up.
- Heavy imports are justified.

Completion:

- Relevant build/type/lint checks are identified.
- Request count impact is understood.
- Residual risks are reported.

---

## Documentation Discipline

Use the shared Pulse documentation-source rule.

Skill-specific application:

- Start from this skill's owning scope and local project conventions.
- Use Laravel Boost `search-docs` before code changes. Do not skip this step.
- Use `pulse-docs-research` when framework, library, hydration, testing, browser, or accessibility details affect implementation.

---

## Integration

Runs with state/effects, media assets, Motion interactions, implementation, browser verification, and review.
