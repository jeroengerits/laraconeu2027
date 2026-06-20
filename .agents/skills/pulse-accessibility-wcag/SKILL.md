---
name: pulse-accessibility-wcag
description: Plans, implements, and reviews accessibility for React components in this Laravel Inertia app. Use for WCAG 2.2, semantic HTML, ARIA, keyboard navigation, focus management, screen readers, touch targets, reduced motion, and accessible interaction alternatives.
---

# Laravel React Component Accessibility WCAG

Make user-facing component behaviour accessible by default.

## Purpose

Ensure components are usable with keyboard, screen readers, touch, reduced motion, and native browser behaviours.

## When to Use

- Component has interaction, forms, status, navigation, media, animation, or complex layout.
- Radix primitives, custom gestures, overlays, or focus management are involved.
- Reviewing accessibility regressions.

## When NOT to Use

- Component is purely decorative and already hidden appropriately.
- The task is backend-only.

## Inputs

Required:

- Component behaviour and UI structure.
- Interaction requirements.

Optional:

- Radix primitive docs.
- Known accessibility issue.
- Browser or assistive tech target.

## Outputs

- Accessibility plan.
- Keyboard and focus model.
- ARIA and semantic decisions.
- Reduced-motion and touch requirements.
- Test scenarios.

## Rules

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

- [Responsibilities](rules/responsibilities.md)
- [Non-Responsibilities](rules/non-responsibilities.md)
- [Workflow](rules/workflow.md)
- [Decision Points](rules/decision-points.md)
- [Checklists](rules/checklists.md)
- [Documentation Discipline](rules/documentation-discipline.md)

## Integration

Runs with requirements, API contract, Radix composition, Motion interactions, TDD planning, behaviour testing, browser verification, and review.
