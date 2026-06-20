# Pulse Accessibility WCAG

**Version 1.0.0**  
Pulse Component Workflow  
June 2026

> This compiled document is optimized for AI-assisted component work. It mirrors the `vercel-react-best-practices` shape: short entry point, metadata, expanded rule catalog, and deterministic validation gates.

---

## Abstract

Plans, implements, and reviews accessibility for React components in this Laravel Inertia app. Use for WCAG 2.2, semantic HTML, ARIA, keyboard navigation, focus management, screen readers, touch targets, reduced motion, and accessible interaction alternatives.

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
| Name                   | `pulse-accessibility-wcag`    |
| Canonical architecture | `vercel-react-best-practices` |
| Primary entry point    | `SKILL.md`                    |
| Rule catalog           | `rules/`                      |
| Metadata               | `metadata.json`               |

## Purpose

Ensure components are usable with keyboard, screen readers, touch, reduced motion, and native browser behaviours.

## When to Apply

- Component has interaction, forms, status, navigation, media, animation, or complex layout.
- Radix primitives, custom gestures, overlays, or focus management are involved.
- Reviewing accessibility regressions.

## When Not to Apply

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

- Target WCAG 2.2 AA.
- Choose semantic HTML before ARIA.
- Define keyboard model and focus behaviour.
- Ensure names, descriptions, errors, alerts, and live regions are correct.
- Preserve native scrolling and gestures.
- Check reduced motion and touch target needs.
- Verify accessible names and visible state with behaviour tests when interactions matter.

---

## Non-Responsibilities

- Visual styling beyond focus visibility, contrast, and target size.
- Radix internals.
- Test implementation, though tests should validate accessible outcomes.

---

## Workflow

1. Choose semantic elements first.
2. Add ARIA only when native semantics are insufficient.
3. Define focus entry, movement, trapping, and restoration.
4. Connect controls to labels, descriptions, and errors.
5. Ensure pointer interactions have keyboard or assistive alternatives.
6. Preserve native page scrolling and browser gestures.
7. Verify colour contrast and visible focus in light and dark modes.
8. Define reduced-motion behaviour for animated or autoplaying surfaces.

---

## Decision Points

- Use Radix primitives for complex accessible behaviours when available.
- Use live regions for meaningful async status changes.
- Disable autoplay or motion when reduced motion is preferred.
- Do not hide important content from assistive tech to solve layout issues.
- Prefer role/name/state assertions over DOM structure assertions in tests.

### Failure and Escalation

- Stop condition: if accessible behaviour cannot be achieved with semantic HTML or an
  available primitive, do not ship inaccessible markup. Report the gap.
- Reporting: list any accessibility check that could not be verified with available tooling.
- Escalate uncertain ARIA, Radix, or assistive-technology behaviour to `pulse-docs-research`.
- Escalate to the user when an accessible alternative requires a design or scope change.

---

## Checklists

Pre-flight:

- Interactive elements are identified.
- Keyboard path is known.
- Focus expectations are clear.

Execution:

- Semantic HTML is used.
- ARIA is minimal and accurate.
- Touch targets are usable.

Completion:

- Keyboard-only flow works.
- Screen reader names and states are meaningful.
- Reduced motion is respected.

---

## Documentation Discipline

Use the shared Pulse documentation-source rule in
[`../pulse-workflow-orchestrator/references/documentation-discipline.md`](../pulse-workflow-orchestrator/references/documentation-discipline.md).

---

## Integration

Runs with requirements, API contract, Radix composition, Motion interactions, TDD planning, behaviour testing, browser verification, and review.
