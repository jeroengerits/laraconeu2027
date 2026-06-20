---
name: pulse-state-effects
description: 'Designs React state, effects, refs, memoization, subscriptions, cleanup, and hydration-safe render logic for components in this Laravel Inertia React 19 app. Use when local state, effects, subscriptions, browser stores, refs, memoization, or hydration-safe rendering decisions are needed.'
license: MIT
metadata:
    author: pulse
    version: '1.0.0'
    canonical: vercel-react-best-practices
---

# Pulse State Effects

Designs React state, effects, refs, memoization, subscriptions, cleanup, and hydration-safe render logic for components in this Laravel Inertia React 19 app. Use when local state, effects, subscriptions, browser stores, refs, memoization, or hydration-safe rendering decisions are needed.

## Purpose

Avoid derived state bugs, effect misuse, stale closures, hydration mismatches, and unnecessary renders.

## When to Apply

- A component needs local state, effects, subscriptions, timers, observers, or refs.
- Hydration mismatch risk exists.
- Event handlers, memoization, or external stores need design.
- Custom hooks are being extracted.

## When Not to Apply

- Component is static presentational markup.
- State/effect decisions are already trivial and local.

## Inputs

Required:

- Component architecture.
- Behaviour requirements.

Optional:

- Hydration warnings.
- Performance symptoms.
- Existing hook code.

## Outputs

- State model.
- Effect plan.
- Ref and cleanup plan.
- Hydration safety notes.
- Hook extraction guidance.

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

Runs after architecture and API design, before implementation, performance review, behaviour testing, and review.

## How to Use

1. Confirm the task matches the description and "When to Apply" section.
2. Read the rule catalog files needed for the task.
3. Execute the workflow and decision points.
4. Validate with the checklist.
5. Hand off to the next related skill when the current skill reaches its boundary.

## Full Compiled Document

For the complete guide with this skill and all rules expanded, read `AGENTS.md`.
