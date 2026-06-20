---
name: pulse-docs-research
description: 'Researches current documentation for Laravel React component work. Use when implementation depends on Inertia React, Wayfinder, React 19, Motion React, Radix UI, Tailwind CSS 4, Jest, React Testing Library, Vite, or other library APIs that may change.'
license: MIT
metadata:
    author: pulse
    version: '1.0.0'
    canonical: vercel-react-best-practices
---

# Pulse Docs Research

Researches current documentation for Laravel React component work. Use when implementation depends on Inertia React, Wayfinder, React 19, Motion React, Radix UI, Tailwind CSS 4, Jest, React Testing Library, Vite, or other library APIs that may change.

## Purpose

Provide current, version-aware documentation context for component implementation and review.

## When to Apply

- Before making code changes in this project.
- API details are uncertain.
- The task touches Inertia, Wayfinder, React, Motion, Radix, Tailwind, Jest, React Testing Library, Vite, or lazy loading.
- Hydration, SSR, gestures, forms, or testing APIs are involved.

## When Not to Apply

- The task is purely explanatory and no code will change.

## Inputs

Required:

- Library or API question.
- Package or framework area.

Optional:

- Installed package versions.
- Error message or failing code.

## Outputs

- Documentation findings.
- Source of truth used.
- Version-specific caveats.
- Implementation guidance.

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

- `context7`
- `pulse-workflow-orchestrator`

## Integration

Commonly collaborates with all component skills, especially Inertia integration, Radix composition, Motion interactions, Tailwind design system, performance, and behaviour testing.

## How to Use

1. Confirm the task matches the description and "When to Apply" section.
2. Read the rule catalog files needed for the task.
3. Execute the workflow and decision points.
4. Validate with the checklist.
5. Hand off to the next related skill when the current skill reaches its boundary.

## Full Compiled Document

For the complete guide with this skill and all rules expanded, read `AGENTS.md`.
