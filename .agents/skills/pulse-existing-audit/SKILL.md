---
name: pulse-existing-audit
description: 'Audits existing React components, hooks, utilities, tests, pages, styles, and conventions before Laravel Inertia component work. Use before creating new components, extracting hooks, adding variants, or changing shared UI.'
license: MIT
metadata:
    author: pulse
    version: '1.0.0'
    canonical: vercel-react-best-practices
---

# Pulse Existing Audit

Audits existing React components, hooks, utilities, tests, pages, styles, and conventions before Laravel Inertia component work. Use before creating new components, extracting hooks, adding variants, or changing shared UI.

## Purpose

Prevent duplicate components, inconsistent APIs, and design drift by checking local code and conventions first.

## When to Apply

- Creating or refactoring a component.
- Adding variants or shared behaviour.
- Extracting hooks or helpers.
- Unsure where a component belongs.

## When Not to Apply

- The user asks only for high-level advice.
- The task touches no local component code.

## Inputs

Required:

- Component goal or target file.
- Project root.

Optional:

- Known component names.
- Related routes, pages, or screenshots.

## Outputs

- Relevant existing files.
- Conventions to follow.
- Similar APIs and patterns.
- Gaps or duplication risks.

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
- `pulse-docs-research`
- `pulse-reuse-decision`
- `pulse-workflow-orchestrator`

## Integration

Runs early after requirements analysis and before reuse, architecture, implementation, and review.

## How to Use

1. Confirm the task matches the description and "When to Apply" section.
2. Read the rule catalog files needed for the task.
3. Execute the workflow and decision points.
4. Validate with the checklist.
5. Hand off to the next related skill when the current skill reaches its boundary.

## Full Compiled Document

For the complete guide with this skill and all rules expanded, read `AGENTS.md`.
