---
name: pulse-inertia-integration
description: Applies Inertia React v3 patterns to Laravel React components. Use when components touch page props, navigation, forms, Wayfinder route helpers, deferred data, useHttp, SSR boundaries, or Inertia-specific client behaviour.
---

# Laravel React Component Inertia Integration

Use Inertia React patterns correctly at the Laravel server/client boundary.

## Purpose

Keep page props, navigation, forms, HTTP requests, and SSR integration aligned with Inertia v3 and local project conventions.

## When to Use

- Component uses Inertia page props.
- Internal navigation is added.
- Server-backed forms or standalone HTTP requests are involved.
- Wayfinder route helpers are needed.
- Deferred props, lazy data, or SSR behaviour is relevant.

## When NOT to Use

- Component has no Inertia, routing, page props, or server interaction.

## Inputs

Required:

- Inertia behaviour needed.
- Route or prop context.

Optional:

- Controller/action names.
- Existing page props.
- Form fields and validation errors.

## Outputs

- Inertia API choice.
- Route helper strategy.
- Page prop boundary notes.
- Loading/deferred state plan.

## Rules

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

- [Responsibilities](rules/responsibilities.md)
- [Non-Responsibilities](rules/non-responsibilities.md)
- [Workflow](rules/workflow.md)
- [Decision Points](rules/decision-points.md)
- [Checklists](rules/checklists.md)
- [Documentation Discipline](rules/documentation-discipline.md)

## Integration

Collaborates with docs research, API contract, state/effects, implementation, testing, and review skills.
