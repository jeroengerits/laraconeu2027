---
name: pulse-tdd-planning
description: 'Plans behaviour-driven TDD for React components in this Laravel app. Use before implementing meaningful component behaviour to define user scenarios, accessibility expectations, public API contracts, red/green/refactor scope, and test coverage boundaries.'
license: MIT
metadata:
    author: pulse
    version: '1.0.0'
    canonical: vercel-react-best-practices
---

# Pulse TDD Planning

Plans behaviour-driven TDD for React components in this Laravel app. Use before implementing meaningful component behaviour to define user scenarios, accessibility expectations, public API contracts, red/green/refactor scope, and test coverage boundaries.

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

- `pulse-docs-research`
- `pulse-workflow-orchestrator`

## Integration

Runs after requirements, API, accessibility, and architecture. Runs before behaviour testing, implementation, refactor safety, and review.

## How to Use

1. Confirm the task matches the description and "When to Apply" section.
2. Read the rule catalog files needed for the task.
3. Execute the workflow and decision points.
4. Validate with the checklist.
5. Hand off to the next related skill when the current skill reaches its boundary.

## Full Compiled Document

For the complete guide with this skill and all rules expanded, read `AGENTS.md`.
