---
name: pulse-requirements-analysis
description: 'Analyzes requirements for React component work in this Laravel Inertia app. Use when a component request needs goals, non-goals, constraints, user workflows, acceptance criteria, edge cases, or behaviour scenarios before implementation.'
license: MIT
metadata:
    author: pulse
    version: '1.0.0'
    canonical: vercel-react-best-practices
---

# Pulse Requirements Analysis

Analyzes requirements for React component work in this Laravel Inertia app. Use when a component request needs goals, non-goals, constraints, user workflows, acceptance criteria, edge cases, or behaviour scenarios before implementation.

## Purpose

Convert the user request into actionable component requirements that can drive architecture, API design, tests, and review.

## When to Apply

- The request is broad, ambiguous, or multi-step.
- Behaviour, accessibility, responsive, animation, or testing expectations need definition.
- A reusable component API may be introduced or changed.

## When Not to Apply

- The user requests a tiny mechanical edit with obvious scope.
- Existing tests or issue text already define the requirements fully.

## Inputs

Required:

- User request.
- Relevant existing UI behaviour.

Optional:

- Design references.
- Bug reports, logs, screenshots, or failing tests.
- Browser/device constraints.

## Outputs

- Goals and non-goals.
- User workflows.
- Acceptance criteria.
- Behaviour scenarios.
- Known edge cases.

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

- `pulse-api-contract`
- `pulse-browser-verification`
- `pulse-docs-research`
- `pulse-tdd-planning`
- `pulse-workflow-orchestrator`

## Integration

Runs after `pulse-workflow-orchestrator` and before architecture, API, TDD, implementation, and review skills.

## How to Use

1. Confirm the task matches the description and "When to Apply" section.
2. Read the rule catalog files needed for the task.
3. Execute the workflow and decision points.
4. Validate with the checklist.
5. Hand off to the next related skill when the current skill reaches its boundary.

## Full Compiled Document

For the complete guide with this skill and all rules expanded, read `AGENTS.md`.
