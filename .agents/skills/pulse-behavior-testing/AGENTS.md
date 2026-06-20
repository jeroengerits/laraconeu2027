# Pulse Behavior Testing

**Version 1.0.0**  
Pulse Component Workflow  
June 2026

> This compiled document is optimized for AI-assisted component work. It mirrors the `vercel-react-best-practices` shape: short entry point, metadata, expanded rule catalog, and deterministic validation gates.

---

## Abstract

Writes and maintains behaviour-driven React component tests in this Laravel app using Jest, React Testing Library, user-event, and jest-dom. Use for user interactions, keyboard accessibility, focus, async states, callbacks, validation, public API contracts, and regression tests.

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
| Name                   | `pulse-behavior-testing`      |
| Canonical architecture | `vercel-react-best-practices` |
| Primary entry point    | `SKILL.md`                    |
| Rule catalog           | `rules/`                      |
| Metadata               | `metadata.json`               |

## Purpose

Implement tests that protect visible behaviour, accessibility, and public API contracts while allowing internals to change.

## When to Apply

- TDD planning produced behaviour scenarios.
- Component behaviour changes.
- A regression needs coverage.
- Accessibility or keyboard behaviour is important.

## When Not to Apply

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

- Write Jest and React Testing Library tests.
- Use `@testing-library/user-event`.
- Use `jest-dom` matchers.
- Prefer accessible queries.
- Mock boundaries, not component internals.
- Report missing test tooling honestly.
- Use `jest-react-testing` and Context7 Testing Library docs when test setup, async queries, or interaction APIs are uncertain.

---

## Non-Responsibilities

- Snapshot testing large components.
- Testing Tailwind classes, private state, Motion configuration, or Radix internals.
- Browser/manual verification.

---

## Workflow

1. Check existing test setup and conventions.
2. Use `screen` queries.
3. Prefer `getByRole`, `getByLabelText`, `getByText`, `getByAltText`, and other accessible queries.
4. Use `userEvent.setup()` for interactions.
5. Use `findBy*` for async appearance and `queryBy*` for absence.
6. Use `jest-dom` matchers such as `toBeVisible` and `toHaveAccessibleName` for user-observable state.
7. Assert visible behaviour and public callbacks.
8. Run the narrowest relevant test command.

---

## Decision Points

- Use `getByTestId` only as a last resort.
- Mock requests at the boundary, preferably request-level fakes when configured.
- Do not assert exact wrapper counts or CSS classes.
- Do not re-test Radix internal behaviour; test the integration outcome.
- Prefer `screen.getByRole` with accessible name before text, placeholder, or test id queries.

### Failure and Escalation

- Stop condition: if React test tooling is not configured, do not add it unrequested. Report
  the gap.
- Reporting: list any scenario that cannot be tested through accessible, user-observable behaviour.
- Escalate uncertain Jest, React Testing Library, `user-event`, or `jest-dom` APIs to `jest-react-testing` or `pulse-docs-research`.
- Escalate to the user when test tooling must be added or a behaviour scenario is ambiguous.
- Return missing or unclear scenarios to `pulse-tdd-planning`.

---

## Checklists

Pre-flight:

- Test tooling is configured or gap is reported.
- Existing test patterns are inspected.

Execution:

- Tests read like user behaviour.
- Interactions use `user-event`.
- Accessible names and roles are preferred.

Completion:

- Tests fail for meaningful regressions.
- Tests avoid implementation details.
- Results are reported.

---

## Documentation Discipline

Use the shared Pulse documentation-source rule.

Skill-specific application:

- Start from this skill's owning scope and local project conventions.
- Use Laravel Boost `search-docs` before code changes. Do not skip this step.
- Use `pulse-docs-research` when framework, library, hydration, testing, browser, or accessibility details affect implementation.

---

## Integration

Runs after TDD planning and before review. Collaborates with accessibility, API contract, implementation, and refactor safety.
