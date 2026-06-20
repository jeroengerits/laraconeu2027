---
name: pulse-tdd-planning
description: Plans behaviour-driven TDD for React components in this Laravel app. Use before implementing meaningful component behaviour to define user scenarios, accessibility expectations, public API contracts, red/green/refactor scope, and test coverage boundaries.
---

# Laravel React Component TDD Planning

Define what component tests should prove before writing production code.

## Purpose

Make tests protect user-observable behaviour and public contracts rather than implementation details.

## When to Use

- Meaningful user behaviour exists.
- Component API or accessibility behaviour changes.
- Refactor needs regression protection.
- User asks for TDD or tests.

## When NOT to Use

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

## Rules

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

- [Responsibilities](rules/responsibilities.md)
- [Non-Responsibilities](rules/non-responsibilities.md)
- [Workflow](rules/workflow.md)
- [Decision Points](rules/decision-points.md)
- [Checklists](rules/checklists.md)
- [Documentation Discipline](rules/documentation-discipline.md)

## Integration

Runs after requirements, API, accessibility, and architecture. Runs before behaviour testing, implementation, refactor safety, and review.
