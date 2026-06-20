# Pulse Architecture Boundaries

**Version 1.0.0**  
Pulse Component Workflow  
June 2026

> This compiled document is optimized for AI-assisted component work. It mirrors the `vercel-react-best-practices` shape: short entry point, metadata, expanded rule catalog, and deterministic validation gates.

---

## Abstract

Defines React component architecture boundaries in this Laravel Inertia app. Use when choosing component type, file placement, state ownership, composition shape, hook extraction, helper extraction, or page-section boundaries.

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

| Field                  | Value                           |
| ---------------------- | ------------------------------- |
| Name                   | `pulse-architecture-boundaries` |
| Canonical architecture | `vercel-react-best-practices`   |
| Primary entry point    | `SKILL.md`                      |
| Rule catalog           | `rules/`                        |
| Metadata               | `metadata.json`                 |

## Purpose

Keep components coherent, reusable only when justified, and aligned with project structure.

## When to Apply

- Creating a component or page section.
- Splitting a large component.
- Extracting hooks or helpers.
- Deciding between primitive, compound, feature, section, or page component.

## When Not to Apply

- Only copy, class names, or tiny styling needs changing.
- API and file boundaries are already fixed.

## Inputs

Required:

- Requirements.
- Existing audit or target files.
- Reuse decision.

Optional:

- Current component size and consumers.
- Known performance constraints.

## Outputs

- Component type.
- File boundary plan.
- State ownership plan.
- Hook/helper extraction decisions.
- Implementation sequence.

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

- Choose component type.
- Define file placement.
- Define state ownership.
- Decide hook/helper extraction.
- Keep boundaries aligned with Inertia and project conventions.
- Keep server/page boundaries, client-only effects, and shared primitives explicit enough to avoid hydration drift.

---

## Non-Responsibilities

- Detailed prop contract design.
- Visual token decisions.
- Test implementation.

---

## Workflow

1. Classify the component as primitive, compound, feature, page section, or Inertia page.
2. Decide whether behaviour should stay local or move to a hook/helper.
3. Place shared hooks in `resources/js/hooks` and pure helpers in `resources/js/lib`.
4. Keep feature and section code close to usage unless reuse is real.
5. Avoid new base directories without approval.
6. Route Inertia, state/effects, media, motion, and performance concerns to their owning skills.
7. Route public API decisions to API contract skill.

---

## Decision Points

- Extract a hook when behaviour is reused or presentation is obscured.
- Extract a helper when logic is pure and independently understandable.
- Keep code local when abstraction has one caller and no clarity gain.
- Use compound components when coordinated state or accessibility relationships span parts.
- Split components when it reduces render cost or clarifies ownership; do not split just to create more files.

### Failure and Escalation

- Stop condition: if boundaries cannot be settled without a missing reuse decision or
  convention, do not guess structure. Report the dependency.
- Reporting: state the chosen boundaries and any deferred structural decisions.
- Route public or reusable API decisions to `pulse-api-contract` and state, effects, or
  hydration concerns to `pulse-state-effects`.
- Route uncertain framework structure to `pulse-docs-research`.
- Escalate new base directories or dependency changes to the user.

---

## Checklists

Pre-flight:

- Requirements and reuse decision are available.
- Existing conventions are known.

Execution:

- Component type is explicit.
- State owner is explicit.
- File placement follows local structure.

Completion:

- Boundaries are coherent.
- No speculative abstraction was added.
- API design has a clear input.

---

## Documentation Discipline

Use the shared Pulse documentation-source rule.

Skill-specific application:

- Start from this skill's owning scope and local project conventions.
- Use Laravel Boost `search-docs` before code changes. Do not skip this step.
- Use `pulse-docs-research` when framework, library, hydration, testing, browser, or accessibility details affect implementation.

---

## Integration

Runs after requirements, existing audit, and reuse decision. Runs before API contract, state/effects, implementation, refactor safety, and review.
