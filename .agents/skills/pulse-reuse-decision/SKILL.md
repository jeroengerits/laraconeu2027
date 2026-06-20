---
name: pulse-reuse-decision
description: Decides whether to reuse, extend, refactor, or create a React component in this Laravel Inertia app. Use after auditing existing components and before introducing new abstractions or shared APIs.
---

# Laravel React Component Reuse Decision

Choose the smallest maintainable path: reuse, extend, refactor, or create.

## Purpose

Avoid speculative abstractions while still extracting reusable components when they reduce real complexity.

## When to Use

- A similar component already exists.
- A new component might become shared.
- The requested change could fit an existing API.
- Refactoring may be safer than adding another component.

## When NOT to Use

- The user explicitly requests a one-off local page change.
- The audit found no related code and the scope is narrow.

## Inputs

Required:

- Existing audit findings.
- Requirements and acceptance criteria.

Optional:

- Known future reuse.
- Current consumers of the component.

## Outputs

- Reuse decision.
- Rationale.
- Affected consumers.
- Follow-up skill recommendations.

## Rules

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

- [Responsibilities](rules/responsibilities.md)
- [Non-Responsibilities](rules/non-responsibilities.md)
- [Workflow](rules/workflow.md)
- [Decision Points](rules/decision-points.md)
- [Checklists](rules/checklists.md)
- [Documentation Discipline](rules/documentation-discipline.md)

## Integration

Runs after existing audit and before architecture, API design, implementation, and refactor safety.
