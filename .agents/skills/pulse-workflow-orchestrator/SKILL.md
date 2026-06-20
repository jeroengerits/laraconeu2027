---
name: pulse-workflow-orchestrator
description: 'Orchestrates complete React component development in this Laravel Inertia app. Use whenever a user asks to create, refactor, review, test, document, or optimize a reusable React component or page section, especially when multiple component skills should be coordinated.'
license: MIT
metadata:
    author: pulse
    version: '1.0.0'
    canonical: vercel-react-best-practices
---

# Pulse Workflow Orchestrator

Orchestrates complete React component development in this Laravel Inertia app. Use whenever a user asks to create, refactor, review, test, document, or optimize a reusable React component or page section, especially when multiple component skills should be coordinated.

## Purpose

Turn a component task into a clear sequence of specialized skill work. Keep the process lightweight for small changes and explicit for reusable or risky components.

## When to Apply

- A component task spans planning, architecture, implementation, testing, review, or documentation.
- Multiple focused skills apply and need ordering.
- The user asks for a reusable component workflow.

## When Not to Apply

- The request is a one-line factual answer.
- The task is backend-only Laravel work.
- A single narrow component skill fully covers the request.

## Inputs

Required:

- User request.
- Current codebase context.
- Project constraints from `AGENTS.md`.

Optional:

- Existing design references.
- Prior component decisions.
- Test failures or browser logs.

## Outputs

- Skill execution order.
- Component lifecycle checklist.
- Implementation sequence.
- Verification plan.
- Open questions only when needed.

## Rule Catalog

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

| Rule                                                          | Purpose                                            |
| ------------------------------------------------------------- | -------------------------------------------------- |
| [Responsibilities](rules/responsibilities.md)                 | What this skill owns.                              |
| [Non-Responsibilities](rules/non-responsibilities.md)         | What this skill explicitly does not own.           |
| [Workflow](rules/workflow.md)                                 | Step-by-step execution process.                    |
| [Decision Points](rules/decision-points.md)                   | Branching rules and handoff decisions.             |
| [Checklists](rules/checklists.md)                             | Pre-flight, execution, and completion checks.      |
| [Progress Report](rules/progress-report.md)                   | Inline run status: done, active, next, skipped.    |
| [Documentation Discipline](rules/documentation-discipline.md) | Shared documentation-source rule for code changes. |

## Shared References

This skill owns the shared assets that the whole Pulse ecosystem depends on. Read them
when coordinating or when adding a new skill.

| Reference                                                          | Purpose                                                       |
| ------------------------------------------------------------------ | ------------------------------------------------------------- |
| [Skill Contract](references/skill-contract.md)                     | The `metadata.json` contract every skill must satisfy.        |
| [Skill Structure](references/skill-structure.md)                   | The "well-formed skill" conformance standard.                 |
| [Validation Gates](references/validation-gates.md)                 | Definition of Ready and Definition of Done.                   |
| [Workflow Routing](references/workflow-routing.md)                 | Deterministic task-signal to skill-subset routing matrix.     |
| [Review Aggregation](references/review-aggregation.md)             | Maps the review gate to domain Completion checklists.         |
| [Documentation Discipline](references/documentation-discipline.md) | Shared documentation-source rule.                             |

## Process

Follow [Workflow](rules/workflow.md) first, then apply [Decision Points](rules/decision-points.md) and [Checklists](rules/checklists.md) before finalizing. Use [Responsibilities](rules/responsibilities.md) and [Non-Responsibilities](rules/non-responsibilities.md) to keep ownership narrow. Route with [Workflow Routing](references/workflow-routing.md) and enforce [Validation Gates](references/validation-gates.md).

## Decision Trees

Use [Decision Points](rules/decision-points.md) as the deterministic branch guide. If a decision depends on current framework or library behaviour, route through `pulse-docs-research` before implementation.

## Validation

Use [Checklists](rules/checklists.md) as the validation gate. Report any skipped check, missing tool, or unresolved risk in the final response for the component task.

## Examples

Examples and reusable prompts live in rule files when this skill owns them. If no example file exists, use local project conventions and the active component task as the concrete example.

## Related Skills

- `pulse-api-contract`
- `pulse-docs-research`
- `pulse-existing-audit`
- `pulse-requirements-analysis`
- `pulse-reuse-decision`
- `pulse-review-quality-gate`

## Integration

Usually runs before all other Laravel React component skills. It commonly coordinates every skill in this set and finishes with `pulse-review-quality-gate`.

## How to Use

1. Confirm the task matches the description and "When to Apply" section.
2. Read the rule catalog files needed for the task.
3. Execute the workflow and decision points.
4. Validate with the checklist.
5. Hand off to the next related skill when the current skill reaches its boundary.

## Full Compiled Document

For the complete guide with this skill and all rules expanded, read `AGENTS.md`.
