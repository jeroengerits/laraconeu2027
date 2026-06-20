---
name: pulse-documentation-dx
description: 'Documents reusable React components in this Laravel app. Use when a component API, behaviour, accessibility model, variants, integration pattern, or limitation should be explained for future developers or AI agents.'
license: MIT
metadata:
    author: pulse
    version: '1.0.0'
    canonical: vercel-react-best-practices
---

# Pulse Documentation DX

Documents reusable React components in this Laravel app. Use when a component API, behaviour, accessibility model, variants, integration pattern, or limitation should be explained for future developers or AI agents.

## Purpose

Make component APIs and behaviour understandable for future maintainers and AI agents.

## When to Apply

- A reusable component is created or significantly changed.
- Public API, variants, controlled/uncontrolled behaviour, accessibility, or integration details need explanation.
- User asks for documentation.

## When Not to Apply

- Component is page-specific and obvious from local usage.
- User did not ask for new documentation files and inline docs are enough.

## Inputs

Required:

- Component API and usage.
- Reusability scope.

Optional:

- Existing docs location.
- Design-system conventions.
- Source docs used.

## Outputs

- Inline documentation or doc section.
- Usage examples.
- Accessibility and behaviour notes.
- Known limitations.

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

Runs after API design and implementation, before review, when documentation is warranted.

## How to Use

1. Confirm the task matches the description and "When to Apply" section.
2. Read the rule catalog files needed for the task.
3. Execute the workflow and decision points.
4. Validate with the checklist.
5. Hand off to the next related skill when the current skill reaches its boundary.

## Full Compiled Document

For the complete guide with this skill and all rules expanded, read `AGENTS.md`.
