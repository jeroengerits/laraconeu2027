---
name: pulse-tailwind-design-system
description: Applies Tailwind CSS 4 design-system rules to React components in this Laravel app. Use when styling components, variants, typography, spacing, colors, dark mode, shadows, responsive layout, tokens, or theme utilities.
---

# Laravel React Component Tailwind Design System

Keep component styling consistent with the project design system.

## Purpose

Prevent one-off styling, token drift, inaccessible colour choices, and responsive layout instability.

## When to Use

- Styling any reusable component or page section.
- Adding variants, sizes, shadows, radius, focus states, or dark mode.
- Changing layout or responsive behaviour.
- Creating or using Tailwind CSS 4 tokens.

## When NOT to Use

- No styling or layout changes are involved.
- The change is only behavioural and visual output is unchanged.

## Inputs

Required:

- Target component or section.
- Existing styling conventions.

Optional:

- Design reference.
- Current CSS tokens.
- Supported breakpoints.

## Outputs

- Styling plan.
- Variant and size map.
- Responsive layout notes.
- Dark mode and token decisions.

## Rules

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

- [Responsibilities](rules/responsibilities.md)
- [Non-Responsibilities](rules/non-responsibilities.md)
- [Workflow](rules/workflow.md)
- [Decision Points](rules/decision-points.md)
- [Checklists](rules/checklists.md)
- [Documentation Discipline](rules/documentation-discipline.md)

## Integration

Collaborates with API contract, accessibility, Motion interactions, implementation, browser verification, and review.
