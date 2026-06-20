---
name: pulse-browser-verification
description: Verifies React component behaviour in the browser for this Laravel Herd/Inertia app. Use for interaction-heavy components, responsive UI, trackpad/mouse/touch gestures, keyboard flows, reduced motion, light/dark modes, image loading, hydration warnings, and visual regressions.
---

# Laravel React Component Browser Verification

Check behaviour that automated tests or static analysis cannot fully prove.

## Purpose

Validate real browser behaviour across input modes, viewports, and rendering states.

## When to Use

- Component has gestures, scroll, hover, drag, media, animation, overlays, or responsive layout.
- Hydration warnings or browser console errors are relevant.
- User explicitly asks to test desktop, trackpad, mobile, touch, or browser behaviour.

## When NOT to Use

- The change is covered fully by tests and has no visual or browser-specific surface.
- The request is purely static analysis with no browser-observable surface.

## Inputs

Required:

- URL or route/path.
- Behaviour to verify.

Optional:

- Browser logs.
- Viewport targets.
- Known device issue.

## Outputs

- Browser verification checklist.
- Recent browser errors if any.
- Behaviour findings.
- Follow-up fixes if needed.

## Rules

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

- [Responsibilities](rules/responsibilities.md)
- [Non-Responsibilities](rules/non-responsibilities.md)
- [Workflow](rules/workflow.md)
- [Decision Points](rules/decision-points.md)
- [Checklists](rules/checklists.md)
- [Documentation Discipline](rules/documentation-discipline.md)

## Integration

Runs after implementation and tests for interaction-heavy components. Feeds findings into implementation or review quality gate.
