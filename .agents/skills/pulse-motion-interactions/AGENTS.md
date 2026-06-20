# Pulse Motion Interactions

**Version 1.0.0**  
Pulse Component Workflow  
June 2026

> This compiled document is optimized for AI-assisted component work. It mirrors the `vercel-react-best-practices` shape: short entry point, metadata, expanded rule catalog, and deterministic validation gates.

---

## Abstract

Designs Motion React animations and gestures for components in this Laravel app. Use for micro-interactions, variants, hover, focus, tap, drag, scroll effects, autoplay, marquee behaviour, reduced motion, animation performance, and gesture support.

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
| Name                   | `pulse-motion-interactions`   |
| Canonical architecture | `vercel-react-best-practices` |
| Primary entry point    | `SKILL.md`                    |
| Rule catalog           | `rules/`                      |
| Metadata               | `metadata.json`               |

## Purpose

Make animation clarify state or interaction while preserving accessibility, performance, and browser gestures.

## When to Apply

- Adding or refactoring Motion React animation.
- Implementing drag, swipe, hover, tap, scroll, autoplay, or marquee behaviour.
- Reduced motion or animation performance matters.

## When Not to Apply

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

- Define animation intent and trigger.
- Use `motion/react` APIs correctly.
- Respect reduced motion.
- Keep variants and transitions stable.
- Avoid blocking native vertical scroll.
- Stop or adapt long-running animations during direct user interaction when appropriate.
- Replace large transform, parallax, and autoplay motion with opacity or static states when reduced motion is preferred.

---

## Non-Responsibilities

- Tailwind styling decisions.
- General React state not tied to animation.
- Browser verification execution.

---

## Workflow

1. Define intent: feedback, orientation, continuity, hierarchy, or state clarity.
2. Define trigger: hover, focus, tap, drag, scroll, mount, exit, layout change, or loading.
3. Verify Motion APIs with Context7 when uncertain.
4. Use transform and opacity where possible.
5. Use `useReducedMotion` to choose accessible animation paths.
6. Use motion values for high-frequency visual state.
7. Keep variants and transition objects stable.
8. Ensure gestures do not block native page scrolling.

---

## Decision Points

- Use `LazyMotion` or `m` for bundle-sensitive surfaces when practical.
- Use `AnimatePresence` for exit animations and stable keys.
- Use `layout`, `layoutId`, `layoutScroll`, and `layoutRoot` intentionally.
- Use `requestAnimationFrame` for custom loops and clean up.
- Use direct horizontal drag or `deltaX` for horizontal movement; do not convert vertical scroll into horizontal motion unless explicitly requested.

### Failure and Escalation

- Stop condition: if an animation cannot respect reduced motion or would block native
  vertical scroll, do not ship the motion. Report the conflict.
- Reporting: list any Motion API or gesture behaviour that could not be verified.
- Escalate uncertain `motion/react` APIs or gesture behaviour to `pulse-docs-research`.
- Escalate to the user when motion intent requires a design or scope decision.
- Hand animation performance concerns to `pulse-performance-vercel` and accessible-alternative needs to `pulse-accessibility-wcag`.

---

## Checklists

Pre-flight:

- Animation purpose is clear.
- Reduced-motion behaviour is defined.
- Native scroll risk is assessed.

Execution:

- Motion owns animation properties.
- Tailwind owns static styling.
- Listeners and frames are cleaned up.

Completion:

- Keyboard and touch alternatives exist when needed.
- Reduced motion works.
- Browser verification scenarios are listed.

---

## Documentation Discipline

Use the shared Pulse documentation-source rule.

Skill-specific application:

- Start from this skill's owning scope and local project conventions.
- Use Laravel Boost `search-docs` before code changes. Do not skip this step.
- Use `pulse-docs-research` when framework, library, hydration, testing, browser, or accessibility details affect implementation.

---

## Integration

Collaborates with accessibility, state/effects, performance, implementation, browser verification, and review.
