---
name: pulse-motion-interactions
description: Designs Motion React animations and gestures for components in this Laravel app. Use for micro-interactions, variants, hover, focus, tap, drag, scroll effects, autoplay, marquee behaviour, reduced motion, animation performance, and gesture support.
---

# Laravel React Component Motion Interactions

Use Motion React for purposeful interactions without breaking native behaviour.

## Purpose

Make animation clarify state or interaction while preserving accessibility, performance, and browser gestures.

## When to Use

- Adding or refactoring Motion React animation.
- Implementing drag, swipe, hover, tap, scroll, autoplay, or marquee behaviour.
- Reduced motion or animation performance matters.

## When NOT to Use

- Styling-only transitions can be handled by Tailwind without behaviour.
- Animation is decorative and not requested.

## Inputs

Required:

- Interaction goal.
- Component architecture.

Optional:

- Motion docs findings.
- Gesture requirements.
- Performance constraints.

## Outputs

- Animation plan.
- Gesture model.
- Reduced-motion behaviour.
- Performance notes.
- Verification scenarios.

## Rules

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

- [Responsibilities](rules/responsibilities.md)
- [Non-Responsibilities](rules/non-responsibilities.md)
- [Workflow](rules/workflow.md)
- [Decision Points](rules/decision-points.md)
- [Checklists](rules/checklists.md)
- [Documentation Discipline](rules/documentation-discipline.md)

## Integration

Collaborates with accessibility, state/effects, performance, implementation, browser verification, and review.
