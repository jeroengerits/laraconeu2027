# Pulse TDD Planning

**Version 1.0.0**  
Pulse Component Workflow  
June 2026

> This compiled document is optimized for AI-assisted component work. It mirrors the `vercel-react-best-practices` shape: short entry point, metadata, expanded rule catalog, and deterministic validation gates.

---

## Abstract

Plans behaviour-driven TDD for React components in this Laravel app. Use before implementing meaningful component behaviour to define user scenarios, accessibility expectations, public API contracts, red/green/refactor scope, and test coverage boundaries.

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
| Name                   | `pulse-tdd-planning`          |
| Canonical architecture | `vercel-react-best-practices` |
| Primary entry point    | `SKILL.md`                    |
| Rule catalog           | `rules/`                      |
| Metadata               | `metadata.json`               |

## Purpose

Make tests protect user-observable behaviour and public contracts rather than implementation details.

## When to Apply

- Meaningful user behaviour exists.
- Component API or accessibility behaviour changes.
- Refactor needs regression protection.
- User asks for TDD or tests.

## When Not to Apply

- Change is static markup, copy, or styling only.
- React testing tooling is not configured and user did not ask to add it.

## Inputs

Required:

- Acceptance criteria.
- Component API contract.

Optional:

- Existing tests.
- Bug reproduction steps.
- Accessibility plan.

## Outputs

- Behaviour scenarios.
- Test plan.
- Red/green/refactor workflow.
- Out-of-scope test list.

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

- Write behaviour scenarios.
- Define test scope.
- Identify accessibility and keyboard expectations.
- Separate public API testing from internals.
- Decide which behaviours do not need tests.
- Prefer Testing Library role/name queries and `user-event` interactions in every scenario that maps to user input.

---

## Non-Responsibilities

- Writing the actual test code.
- Configuring Jest from scratch unless requested.
- Testing CSS classes or exact DOM structure.

---

## Workflow

1. Describe behaviours from a user perspective.
2. Identify roles, labels, keyboard paths, and focus expectations.
3. Identify callbacks and public API outcomes.
4. Decide async, validation, loading, error, and responsive behaviour scope.
5. Define the expected failing reason for each red test before implementation.
6. Explicitly reject implementation-detail tests.
7. Hand test plan to behaviour testing skill.

---

## Decision Points

- Test interaction if a user can trigger it.
- Test accessibility when keyboard, focus, names, roles, or ARIA matter.
- Test responsive behaviour only when functionality changes.
- Do not test Tailwind classes, Motion config, private state, or Radix internals.
- Test visible integration outcomes for Radix or Motion components, not their internal implementation.

---

## Checklists

Pre-flight:

- Acceptance criteria are known.
- Existing test setup is checked.

Execution:

- Scenarios use user language.
- Public contract is covered.
- Implementation details are excluded.

Completion:

- Tests can fail for the right reason.
- Behaviour testing has enough detail.
- Untested scope is intentional.

---

## Documentation Discipline

Use the shared Pulse documentation-source rule.

Skill-specific application:

- Start from this skill's owning scope and local project conventions.
- Use Laravel Boost `search-docs` before code changes. Do not skip this step.
- Use `pulse-docs-research` when framework, library, hydration, testing, browser, or accessibility details affect implementation.

---

## Integration

Runs after requirements, API, accessibility, and architecture. Runs before behaviour testing, implementation, refactor safety, and review.
