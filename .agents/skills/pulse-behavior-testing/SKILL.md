---
name: pulse-behavior-testing
description: 'Writes and maintains behaviour-driven React component tests in this Laravel app using Jest, React Testing Library, user-event, and jest-dom. Use for user interactions, keyboard accessibility, focus, async states, callbacks, validation, public API contracts, and regression tests.'
license: MIT
metadata:
    author: pulse
    version: '1.0.0'
    canonical: vercel-react-best-practices
---

# Pulse Behavior Testing

Writes and maintains behaviour-driven React component tests in this Laravel app using Jest, React Testing Library, user-event, and jest-dom. Use for user interactions, keyboard accessibility, focus, async states, callbacks, validation, public API contracts, and regression tests.

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

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

| Rule                                                          | Purpose                                            |
| ------------------------------------------------------------- | -------------------------------------------------- |
| [Responsibilities](rules/responsibilities.md)                 | What this skill owns.                              |
| [Non-Responsibilities](rules/non-responsibilities.md)         | What this skill explicitly does not own.           |
| [Workflow](rules/workflow.md)                                 | Step-by-step execution process.                    |
| [Decision Points](rules/decision-points.md)                   | Branching rules and handoff decisions.             |
| [Checklists](rules/checklists.md)                             | Pre-flight, execution, and completion checks.      |
| [Documentation Discipline](rules/documentation-discipline.md) | Shared documentation-source rule for code changes. |

## Process

Follow [Workflow](rules/workflow.md) first, then apply [Decision Points](rules/decision-points.md) and [Checklists](rules/checklists.md) before finalizing. Use [Responsibilities](rules/responsibilities.md) and [Non-Responsibilities](rules/non-responsibilities.md) to keep ownership narrow.

## Decision Trees

Use [Decision Points](rules/decision-points.md) as the deterministic branch guide. If a decision depends on current framework or library behaviour, route through `pulse-docs-research` before implementation.

## Validation

Use [Checklists](rules/checklists.md) as the validation gate. Report any skipped check, missing tool, or unresolved risk in the final response for the component task.

## Examples

Examples and reusable prompts live in rule files when this skill owns them. If no example file exists, use local project conventions and the active component task as the concrete example.

## Related Skills

- `jest-react-testing`
- `pulse-docs-research`
- `pulse-workflow-orchestrator`

## Integration

Runs after TDD planning and before review. Collaborates with accessibility, API contract, implementation, and refactor safety.

## How to Use

1. Confirm the task matches the description and "When to Apply" section.
2. Read the rule catalog files needed for the task.
3. Execute the workflow and decision points.
4. Validate with the checklist.
5. Hand off to the next related skill when the current skill reaches its boundary.

## Full Compiled Document

For the complete guide with this skill and all rules expanded, read `AGENTS.md`.
