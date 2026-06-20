---
name: pulse-refactor-safety
description: Safely refactors React components in this Laravel app without changing behaviour. Use when extracting hooks, splitting components, renaming props, simplifying state, reducing duplication, preserving public APIs, or improving maintainability.
---

# Laravel React Component Refactor Safety

Improve component structure without accidental behavioural changes.

## Purpose

Keep refactors surgical, verifiable, and respectful of existing consumers.

## When to Use

- Refactoring component internals.
- Extracting hooks, helpers, or subcomponents.
- Reducing duplication.
- Changing public API shape.
- Cleaning up performance or state issues.

## When NOT to Use

- User requested a new feature rather than a refactor.
- Behaviour changes are intentional and not yet specified.

## Inputs

Required:

- Current component files.
- Intended refactor goal.

Optional:

- Existing tests.
- Consumer list.
- API contract.

## Outputs

- Refactor plan.
- Behaviour preservation checklist.
- Consumer impact notes.
- Verification plan.

## Rules

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

- [Responsibilities](rules/responsibilities.md)
- [Non-Responsibilities](rules/non-responsibilities.md)
- [Workflow](rules/workflow.md)
- [Decision Points](rules/decision-points.md)
- [Checklists](rules/checklists.md)
- [Documentation Discipline](rules/documentation-discipline.md)

## Integration

Collaborates with existing audit, API contract, state/effects, behaviour testing, implementation, and review.
