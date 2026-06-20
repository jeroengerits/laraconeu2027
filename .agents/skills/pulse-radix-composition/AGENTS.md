# Pulse Radix Composition

**Version 1.0.0**  
Pulse Component Workflow  
June 2026

> This compiled document is optimized for AI-assisted component work. It mirrors the `vercel-react-best-practices` shape: short entry point, metadata, expanded rule catalog, and deterministic validation gates.

---

## Abstract

Designs Radix-inspired React component composition in this Laravel app. Use when building dialogs, menus, popovers, tabs, accordions, selects, switches, compound components, slots, asChild APIs, portals, or controlled/uncontrolled primitives.

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
| Name                   | `pulse-radix-composition`     |
| Canonical architecture | `vercel-react-best-practices` |
| Primary entry point    | `SKILL.md`                    |
| Rule catalog           | `rules/`                      |
| Metadata               | `metadata.json`               |

## Purpose

Avoid reimplementing complex accessibility behaviour and keep component APIs flexible without leaking DOM internals.

## When to Apply

- Building complex interactive primitives.
- Wrapping or styling Radix UI primitives.
- Designing compound components.
- Using `asChild`, slots, portals, or state attributes.

## When Not to Apply

- Native HTML fully covers the interaction.
- Component is a simple presentational section.

## Inputs

Required:

- Interaction type.
- API contract or composition need.

Optional:

- Radix docs findings.
- Existing local wrapper patterns.
- Accessibility requirements.

## Outputs

- Primitive/composition choice.
- Compound part list.
- Slot and `asChild` guidance.
- Portal/layering notes.

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

- Prefer Radix primitives for complex accessible interactions.
- Preserve Radix focus, keyboard, ARIA, disabled, and portal behaviour.
- Design compound parts and slots.
- Style public data attributes, not private DOM structure.
- Document controlled/uncontrolled usage when exposed.
- Ensure custom components used with `asChild` spread props and accept/pass refs so Radix behaviour and accessibility remain intact; use `forwardRef` only when a library contract still requires it.

---

## Non-Responsibilities

- Tailwind token selection.
- Business logic.
- Testing implementation.

---

## Workflow

1. Check whether a Radix primitive fits the behaviour.
2. Verify current Radix APIs with Context7 when uncertain.
3. Let Radix own behaviour and the app own styling.
4. Expose compound parts only when consumers need layout control.
5. Style `data-state`, `data-disabled`, `data-highlighted`, and similar public attributes.
6. Verify custom slot children spread props and accept/pass refs; use `forwardRef` only when a library contract still requires it.
7. Avoid targeting private DOM structure.

---

## Decision Points

- Use native HTML when it fully supports the behaviour.
- Use Radix for complex keyboard, focus, portal, or ARIA behaviour.
- Use compound components when parts coordinate state or accessibility.
- Use private context when prop drilling obscures the API.
- Use controlled/uncontrolled props only when the public API needs consumer-owned state.

### Failure and Escalation

- Stop condition: if accessible interaction cannot be preserved with native HTML or an
  available Radix primitive, do not hand-roll complex keyboard, focus, or ARIA behaviour.
  Report the gap.
- Reporting: list any composition, slot, or portal decision left unresolved because the
  interaction or Radix API is unconfirmed.
- Escalate uncertain Radix primitive or `asChild` API behaviour to `pulse-docs-research` (Context7).
- Hand semantic, keyboard, and screen-reader requirements to `pulse-accessibility-wcag` and public prop shape to `pulse-api-contract`.
- Escalate to the user when the required interaction needs a new dependency or a scope change.

---

## Checklists

Pre-flight:

- Interaction complexity is known.
- Radix fit is evaluated.

Execution:

- Focus and keyboard behaviour remain intact.
- Slots do not break semantics.
- Styling uses public attributes.

Completion:

- API remains composable.
- Accessibility behaviour is preserved.
- Tests cover public outcomes, not Radix internals.

---

## Documentation Discipline

Use the shared Pulse documentation-source rule.

Skill-specific application:

- Start from this skill's owning scope and local project conventions.
- Use Laravel Boost `search-docs` before code changes. Do not skip this step.
- Use `pulse-docs-research` when framework, library, hydration, testing, browser, or accessibility details affect implementation.

---

## Integration

Runs with accessibility, API contract, design system, implementation, behaviour testing, and review skills.
