---
name: pulse-api-contract
description: Designs TypeScript public APIs for React components in this Laravel Inertia app. Use when defining props, callbacks, controlled/uncontrolled state, slots, compound components, discriminated unions, variants, or public behaviour contracts.
---

# Laravel React Component API Contract

Design component APIs that are small, typed, semantic, and stable.

## Purpose

Prevent prop sprawl, implementation leaks, and unclear public behaviour.

## When to Use

- Creating reusable components.
- Changing shared component props.
- Adding variants or callbacks.
- Designing controlled/uncontrolled behaviour.
- Creating compound or slot-based APIs.

## When NOT to Use

- Component is purely local and has no public API beyond direct JSX.
- Existing API is unchanged.

## Inputs

Required:

- Requirements.
- Architecture boundary plan.

Optional:

- Existing consumers.
- Radix primitive APIs.
- Form or Inertia integration needs.

## Outputs

- Prop interface or type.
- Callback contract.
- Controlled/uncontrolled decision.
- Composition model.
- Public behaviour notes.

## Rules

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

- [Responsibilities](rules/responsibilities.md)
- [Non-Responsibilities](rules/non-responsibilities.md)
- [Workflow](rules/workflow.md)
- [Decision Points](rules/decision-points.md)
- [Checklists](rules/checklists.md)
- [Documentation Discipline](rules/documentation-discipline.md)

## Integration

Runs after architecture boundaries and before implementation, TDD planning, behaviour testing, documentation, and review.
