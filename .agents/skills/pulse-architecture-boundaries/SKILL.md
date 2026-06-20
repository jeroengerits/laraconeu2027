---
name: pulse-architecture-boundaries
description: 'Defines React component architecture boundaries in this Laravel Inertia app. Use when choosing component type, file placement, state ownership, composition shape, hook extraction, helper extraction, or page-section boundaries.'
license: MIT
metadata:
    author: pulse
    version: '1.0.0'
    canonical: vercel-react-best-practices
---

# Pulse Architecture Boundaries

Defines React component architecture boundaries in this Laravel Inertia app. Use when choosing component type, file placement, state ownership, composition shape, hook extraction, helper extraction, or page-section boundaries.

## Purpose

Keep components coherent, reusable only when justified, and aligned with project structure.

## When to Apply

- Creating a component or page section.
- Splitting a large component.
- Extracting hooks or helpers.
- Deciding between primitive, compound, feature, section, or page component.

## When Not to Apply

- Only copy, class names, or tiny styling needs changing.
- API and file boundaries are already fixed.

## Inputs

Required:

- Requirements.
- Existing audit or target files.
- Reuse decision.

Optional:

- Current component size and consumers.
- Known performance constraints.

## Outputs

- Component type.
- File boundary plan.
- State ownership plan.
- Hook/helper extraction decisions.
- Implementation sequence.

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

Runs after requirements, existing audit, and reuse decision. Runs before API contract, state/effects, implementation, refactor safety, and review.

## How to Use

1. Confirm the task matches the description and "When to Apply" section.
2. Read the rule catalog files needed for the task.
3. Execute the workflow and decision points.
4. Validate with the checklist.
5. Hand off to the next related skill when the current skill reaches its boundary.

## Full Compiled Document

For the complete guide with this skill and all rules expanded, read `AGENTS.md`.
