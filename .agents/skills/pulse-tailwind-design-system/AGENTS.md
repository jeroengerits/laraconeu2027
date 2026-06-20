# Pulse Tailwind Design System

**Version 1.0.0**  
Pulse Component Workflow  
June 2026

> This compiled document is optimized for AI-assisted component work. It mirrors the `vercel-react-best-practices` shape: short entry point, metadata, expanded rule catalog, and deterministic validation gates.

---

## Abstract

Applies Tailwind CSS 4 design-system rules to React components in this Laravel app. Use when styling components, variants, typography, spacing, colors, dark mode, shadows, responsive layout, tokens, or theme utilities.

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

| Field                  | Value                          |
| ---------------------- | ------------------------------ |
| Name                   | `pulse-tailwind-design-system` |
| Canonical architecture | `vercel-react-best-practices`  |
| Primary entry point    | `SKILL.md`                     |
| Rule catalog           | `rules/`                       |
| Metadata               | `metadata.json`                |

## Purpose

Prevent one-off styling, token drift, inaccessible colour choices, and responsive layout instability.

## When to Apply

- Styling any reusable component or page section.
- Adding variants, sizes, shadows, radius, focus states, or dark mode.
- Changing layout or responsive behaviour.
- Creating or using Tailwind CSS 4 tokens.

## When Not to Apply

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

- Use semantic tokens and existing utilities.
- Keep variants finite and typed.
- Maintain typography, spacing, radius, shadow, border, and focus consistency.
- Support dark mode where relevant.
- Ensure responsive layout and text wrapping hold.
- Use Tailwind `dark:` and responsive variants intentionally together when both states must be supported.

---

## Non-Responsibilities

- Component API design beyond variant naming.
- Motion animation logic.
- Accessibility semantics, though contrast and focus are shared concerns.

---

## Workflow

1. Inspect sibling components for token and utility patterns.
2. Prefer semantic tokens and project utilities.
3. Use `@theme` only for reusable tokens that should become Tailwind utilities.
4. Keep arbitrary values rare and justified.
5. Use responsive utilities, container queries, intrinsic sizing, and aspect ratios.
6. Keep Tailwind responsible for styling and Motion responsible for animation.
7. Verify light/dark variants preserve contrast and hierarchy.
8. Verify text and controls do not overlap or shift unpredictably.

---

## Decision Points

- Use existing tokens before creating new ones.
- Use page sections as full-width bands with constrained inner content.
- Avoid nested cards unless the nested card is a real repeated item or modal surface.
- Avoid Tailwind transitions on properties Motion animates.
- Do not introduce new design tokens unless reuse across components is likely.

### Failure and Escalation

- Stop condition: if consistent styling cannot be achieved without inventing a parallel visual
  system or drifting from existing tokens, do not ship one-off styles. Report the token/design gap.
- Reporting: list any variant, token, or responsive decision left unresolved because conventions
  or breakpoints are unknown.
- Escalate uncertain Tailwind CSS 4 token or utility behaviour to `pulse-docs-research`.
- Escalate to the user when new design tokens, a design reference, or a visual-direction decision is required.
- Hand contrast and focus semantics to `pulse-accessibility-wcag` and animation styling to `pulse-motion-interactions`.

---

## Checklists

Pre-flight:

- Existing tokens and components are checked.
- Light/dark mode context is known.

Execution:

- Classes follow local merge helper conventions.
- Variants are finite.
- Responsive behaviour is explicit.

Completion:

- Layout holds on mobile and desktop.
- Focus styles remain visible.
- Styling does not create a parallel visual system.

---

## Documentation Discipline

Use the shared Pulse documentation-source rule.

Skill-specific application:

- Start from this skill's owning scope and local project conventions.
- Use Laravel Boost `search-docs` before code changes. Do not skip this step.
- Use `pulse-docs-research` when framework, library, hydration, testing, browser, or accessibility details affect implementation.

---

## Integration

Collaborates with API contract, accessibility, Motion interactions, implementation, browser verification, and review.
