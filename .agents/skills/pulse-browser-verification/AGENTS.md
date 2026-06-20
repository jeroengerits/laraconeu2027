# Pulse Browser Verification

**Version 1.0.0**  
Pulse Component Workflow  
June 2026

> This compiled document is optimized for AI-assisted component work. It mirrors the `vercel-react-best-practices` shape: short entry point, metadata, expanded rule catalog, and deterministic validation gates.

---

## Abstract

Verifies React component behaviour in the browser for this Laravel Herd/Inertia app. Use for interaction-heavy components, responsive UI, trackpad/mouse/touch gestures, keyboard flows, reduced motion, light/dark modes, image loading, hydration warnings, and visual regressions.

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
| Name                   | `pulse-browser-verification`  |
| Canonical architecture | `vercel-react-best-practices` |
| Primary entry point    | `SKILL.md`                    |
| Rule catalog           | `rules/`                      |
| Metadata               | `metadata.json`               |

## Purpose

Validate real browser behaviour across input modes, viewports, and rendering states.

## When to Apply

- Component has gestures, scroll, hover, drag, media, animation, overlays, or responsive layout.
- Hydration warnings or browser console errors are relevant.
- User explicitly asks to test desktop, trackpad, mobile, touch, or browser behaviour.

## When Not to Apply

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

- Use Laravel Boost `get-absolute-url` before sharing URLs.
- Assume Laravel Herd serves the app; do not start a separate dev server.
- Use browser logs for recent client-side errors.
- Prefer Pest Browser tests for browser behaviour verification.
- Verify mouse, keyboard, trackpad, touch, reduced motion, and viewport behaviour when relevant.
- Check light and dark modes when component appears in both.
- Report what was and was not verified.
- Verify hydration and console warnings for components with SSR-sensitive render output.

---

## Non-Responsibilities

- Replacing automated tests.
- Running Herd serve commands; Herd already serves the app.
- Pixel-perfect visual QA.

---

## Workflow

1. Resolve app URL with Laravel Boost `get-absolute-url`.
2. Prefer a focused Pest Browser test for behaviours that can be automated.
3. Open relevant page only when manual inspection is still needed.
4. Check recent browser logs for client errors.
5. Verify the behaviours tied to the change.
6. For interactions, include keyboard and non-pointer paths.
7. For media, check lazy loading and layout stability.
8. For gestures, distinguish vertical page scrolling from direct horizontal drag or `deltaX` scrolling.
9. Report skipped device classes honestly.

---

## Decision Points

- Use Pest Browser first for browser-verifiable behaviour.
- Use manual/browser-log verification to supplement Pest Browser for native scrolling, gestures, rendering, hydration, and media loading that cannot be automated locally.
- If browser logs show unrelated old entries, ignore them.
- If a device class cannot be tested locally, report the gap and the expected manual check.

### Failure and Escalation

- Stop condition: if a device, input class, or behaviour cannot be verified locally, stop
  guessing and report the gap with the expected manual check.
- Reporting: summarize what was verified and what was not, including any console or
  hydration issues.
- Route uncertain browser, hydration, gesture, or testing APIs to `pulse-docs-research`.
- Return defects to `pulse-implementation` or `pulse-refactor-safety` for fixes.
- Hand verified results to `pulse-review-quality-gate`.

---

## Checklists

Pre-flight:

- Route/path is known.
- Verification targets are clear.

Execution:

- Native vertical scroll remains native.
- Keyboard and focus are checked when interactive.
- Mobile/touch behaviour is checked when relevant.
- Pest Browser coverage is used or the gap is explained.

Completion:

- Browser results are summarized.
- Any untested device/input class is disclosed.
- Console or hydration issues are addressed or reported.

---

## Documentation Discipline

Use the shared Pulse documentation-source rule in
`pulse-workflow-orchestrator/references/documentation-discipline.md`.

---

## Integration

Runs after implementation and tests for interaction-heavy components. Feeds findings into implementation or review quality gate.
