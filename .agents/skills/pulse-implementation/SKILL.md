---
name: pulse-implementation
description: Implements approved React component plans in this Laravel Inertia app. Use after discovery, requirements, architecture, API, accessibility, performance, and testing decisions are made, to edit component, hook, helper, style, and test files following local conventions.
---

# Laravel React Component Implementation

Execute component changes with minimal, well-scoped edits.

## Purpose

Translate approved component decisions into code that follows React 19, TypeScript, Inertia, Tailwind, Radix, Motion, and local project conventions.

## When to Use

- The plan is clear enough to edit files.
- The user approved implementation.
- A bug fix or refactor requires code changes.

## When NOT to Use

- The user only wants analysis or a plan.
- Requirements are still blocking.
- The task is backend-only.

## Inputs

Required:

- Component plan.
- Target files or locations.
- Applicable skill outputs.

Optional:

- Failing tests.
- Browser logs.
- Screenshots.

## Outputs

- Code changes.
- Test or verification changes when needed.
- Verification results.
- Brief implementation summary.

## Rules

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

- [Responsibilities](rules/responsibilities.md)
- [Non-Responsibilities](rules/non-responsibilities.md)
- [Workflow](rules/workflow.md)
- [Decision Points](rules/decision-points.md)
- [Checklists](rules/checklists.md)
- [Documentation Discipline](rules/documentation-discipline.md)

## Integration

Runs after planning skills and before review, browser verification, documentation, and final response.
