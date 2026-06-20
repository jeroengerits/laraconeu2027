---
name: pulse-behavior-testing
description: Writes and maintains behaviour-driven React component tests in this Laravel app using Jest, React Testing Library, user-event, and jest-dom. Use for user interactions, keyboard accessibility, focus, async states, callbacks, validation, public API contracts, and regression tests.
---

# Laravel React Component Behavior Testing

Test components the way users experience them.

## Purpose

Implement tests that protect visible behaviour, accessibility, and public API contracts while allowing internals to change.

## When to Use

- TDD planning produced behaviour scenarios.
- Component behaviour changes.
- A regression needs coverage.
- Accessibility or keyboard behaviour is important.

## When NOT to Use

- There is no meaningful behaviour to test.
- The project lacks React test tooling and the user did not ask to add it.
- The requested check is visual-only styling.

## Inputs

Required:

- Behaviour scenarios.
- Component or hook under test.

Optional:

- Existing test utilities.
- Mocking requirements.
- Async or network boundary details.

## Outputs

- Behaviour tests.
- Test utilities only when justified.
- Test command results or skipped-test explanation.

## Rules

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

- [Responsibilities](rules/responsibilities.md)
- [Non-Responsibilities](rules/non-responsibilities.md)
- [Workflow](rules/workflow.md)
- [Decision Points](rules/decision-points.md)
- [Checklists](rules/checklists.md)
- [Documentation Discipline](rules/documentation-discipline.md)

## Integration

Runs after TDD planning and before review. Collaborates with accessibility, API contract, implementation, and refactor safety.
