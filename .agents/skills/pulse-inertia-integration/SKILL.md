---
name: pulse-inertia-integration
description: 'Applies Inertia React v3 patterns to Laravel React components. Use when components touch page props, navigation, forms, Wayfinder route helpers, deferred data, useHttp, SSR boundaries, or Inertia-specific client behaviour.'
license: MIT
metadata:
    author: pulse
    version: '1.0.0'
    canonical: vercel-react-best-practices
---

# Pulse Inertia Integration

Applies Inertia React v3 patterns to Laravel React components. Use when components touch page props, navigation, forms, Wayfinder route helpers, deferred data, useHttp, SSR boundaries, or Inertia-specific client behaviour.

## Purpose

Keep page props, navigation, forms, HTTP requests, and SSR integration aligned with Inertia v3 and local project conventions.

## When to Apply

- Component uses Inertia page props.
- Internal navigation is added.
- Server-backed forms or standalone HTTP requests are involved.
- Wayfinder route helpers are needed.
- Deferred props, lazy data, or SSR behaviour is relevant.

## When Not to Apply

- Component has no Inertia, routing, page props, or server interaction.

## Inputs

Required:

- Inertia behaviour needed.
- Route or prop context.

Optional:

- Controller/action names.
- Existing page props.
- Form fields and validation errors.

## Outputs

- Inertia API choice.
- Route helper strategy.
- Page prop boundary notes.
- Loading/deferred state plan.

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

- `inertia-react-development`
- `pulse-docs-research`
- `pulse-workflow-orchestrator`

## Integration

Collaborates with docs research, API contract, state/effects, implementation, testing, and review skills.

## How to Use

1. Confirm the task matches the description and "When to Apply" section.
2. Read the rule catalog files needed for the task.
3. Execute the workflow and decision points.
4. Validate with the checklist.
5. Hand off to the next related skill when the current skill reaches its boundary.

## Full Compiled Document

For the complete guide with this skill and all rules expanded, read `AGENTS.md`.
