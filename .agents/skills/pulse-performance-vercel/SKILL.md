---
name: pulse-performance-vercel
description: Applies Vercel-style React performance practices to components in this Laravel Inertia app. Use for hydration safety, render cost, memoization, lazy imports, bundle size, waterfalls, media loading, request count, Suspense, and responsive performance.
---

# Laravel React Component Performance Vercel

Optimize component performance without premature complexity.

## Purpose

Keep component rendering fast, hydration stable, bundles lean, and loading behaviour intentional.

## When to Use

- Component affects first paint, hydration, large lists, media, or bundles.
- Render performance, request count, or lazy loading is being changed.
- There are hydration mismatch warnings.
- Heavy libraries or imports may be introduced.

## When NOT to Use

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

## Rules

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

- [Responsibilities](rules/responsibilities.md)
- [Non-Responsibilities](rules/non-responsibilities.md)
- [Workflow](rules/workflow.md)
- [Decision Points](rules/decision-points.md)
- [Checklists](rules/checklists.md)
- [Documentation Discipline](rules/documentation-discipline.md)

## Integration

Runs with state/effects, media assets, Motion interactions, implementation, browser verification, and review.
