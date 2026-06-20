---
name: pulse-review-quality-gate
description: 'Reviews completed React component work in this Laravel Inertia app. Use before finalizing component changes to check requirements, architecture, API, accessibility, design system, Motion, performance, tests, browser behaviour, documentation, and maintainability.'
license: MIT
metadata:
    author: pulse
    version: '1.0.0'
    canonical: vercel-react-best-practices
---

# Pulse Review Quality Gate

Reviews completed React component work in this Laravel Inertia app. Use before finalizing component changes to check requirements, architecture, API, accessibility, design system, Motion, performance, tests, browser behaviour, documentation, and maintainability.

## Purpose

Catch regressions and missing verification before reporting completion.

Before designing or refactoring any component, consult
[`RADIX-PRIMITIVES.md`](../pulse-workflow-orchestrator/references/RADIX-PRIMITIVES.md)
and determine whether one or more Radix primitives should be used before writing
custom interaction or accessibility logic.

## When to Apply

- Component implementation or refactor is complete.
- User asks for a review.
- A component change touches shared code, interaction, accessibility, media, or performance.

## When Not to Apply

- No files changed and user only asked for a quick answer.
- Backend-only code review should use Laravel-specific review guidance.

## Inputs

Required:

- Changed files.
- Requirements or intended behaviour.

Optional:

- Test results.
- Browser logs.
- Build output.
- Screenshots.

## Outputs

- Findings by severity when reviewing.
- Completion checklist.
- Verification summary.
- Residual risks.

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

## Aggregation Model

This skill is an aggregator, not a second source of domain rules. It enforces Gate 2
(Definition of Done) by delegating each touched concern to the domain owner's
`rules/checklists.md` Completion section. It does not restate accessibility, performance,
API, or design checks.

- Gate definition: [validation-gates.md](../pulse-workflow-orchestrator/references/validation-gates.md)
- Delegation map: [review-aggregation.md](../pulse-workflow-orchestrator/references/review-aggregation.md)

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

Usually runs after implementation, behaviour testing, browser verification, and documentation.

## How to Use

1. Confirm the task matches the description and "When to Apply" section.
2. Read the rule catalog files needed for the task.
3. Execute the workflow and decision points.
4. Validate with the checklist.
5. Hand off to the next related skill when the current skill reaches its boundary.

## Full Compiled Document

For the complete guide with this skill and all rules expanded, read `AGENTS.md`.
