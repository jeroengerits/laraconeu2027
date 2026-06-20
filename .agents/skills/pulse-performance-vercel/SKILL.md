---
name: pulse-performance-vercel
description: 'Applies Vercel-style React performance practices to components in this Laravel Inertia app. Use for hydration safety, render cost, memoization, lazy imports, bundle size, waterfalls, media loading, request count, Suspense, and responsive performance.'
license: MIT
metadata:
    author: pulse
    version: '1.0.0'
    canonical: vercel-react-best-practices
---

# Pulse Performance Vercel

Applies Vercel-style React performance practices to components in this Laravel Inertia app. Use for hydration safety, render cost, memoization, lazy imports, bundle size, waterfalls, media loading, request count, Suspense, and responsive performance.

## Purpose

Keep component rendering fast, hydration stable, bundles lean, and loading behaviour intentional.

## When to Apply

- Component affects first paint, hydration, large lists, media, or bundles.
- Render performance, request count, or lazy loading is being changed.
- There are hydration mismatch warnings.
- Heavy libraries or imports may be introduced.

## When Not to Apply

- Change is purely copy or local styling with no performance surface.
- Optimization would be speculative and unmeasured.

## Inputs

Required:

- Component behaviour and render surface.
- Existing imports and assets.

Optional:

- Browser logs.
- Build output.
- Performance complaint.
- Hydration warning.

## Outputs

- Performance risk assessment.
- Lazy loading and bundle guidance.
- Hydration safety notes.
- Verification commands.

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

Runs with state/effects, media assets, Motion interactions, implementation, browser verification, and review.

## How to Use

1. Confirm the task matches the description and "When to Apply" section.
2. Read the rule catalog files needed for the task.
3. Execute the workflow and decision points.
4. Validate with the checklist.
5. Hand off to the next related skill when the current skill reaches its boundary.

## Full Compiled Document

For the complete guide with this skill and all rules expanded, read `AGENTS.md`.
