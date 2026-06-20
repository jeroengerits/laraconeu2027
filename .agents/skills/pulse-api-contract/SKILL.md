---
name: pulse-api-contract
description: 'Designs TypeScript public APIs for React components in this Laravel Inertia app. Use when defining props, callbacks, controlled/uncontrolled state, slots, compound components, discriminated unions, variants, or public behaviour contracts.'
license: MIT
metadata:
    author: pulse
    version: '1.0.0'
    canonical: vercel-react-best-practices
---

# Pulse API Contract

Designs TypeScript public APIs for React components in this Laravel Inertia app. Use when defining props, callbacks, controlled/uncontrolled state, slots, compound components, discriminated unions, variants, or public behaviour contracts.

## Purpose

Prevent prop sprawl, implementation leaks, and unclear public behaviour.

Before designing or refactoring any component, consult
[`RADIX-PRIMITIVES.md`](../pulse-workflow-orchestrator/references/RADIX-PRIMITIVES.md)
and determine whether one or more Radix primitives should be used before writing
custom interaction or accessibility logic.

## When to Apply

- Creating reusable components.
- Changing shared component props.
- Adding variants or callbacks.
- Designing controlled/uncontrolled behaviour.
- Creating compound or slot-based APIs.

## When Not to Apply

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

Runs after architecture boundaries and before implementation, TDD planning, behaviour testing, documentation, and review.

## How to Use

1. Confirm the task matches the description and "When to Apply" section.
2. Read the rule catalog files needed for the task.
3. Execute the workflow and decision points.
4. Validate with the checklist.
5. Hand off to the next related skill when the current skill reaches its boundary.

## Full Compiled Document

For the complete guide with this skill and all rules expanded, read `AGENTS.md`.
