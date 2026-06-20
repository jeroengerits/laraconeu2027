---
name: pulse-accessibility-wcag
description: 'Plans, implements, and reviews accessibility for React components in this Laravel Inertia app. Use for WCAG 2.2, semantic HTML, ARIA, keyboard navigation, focus management, screen readers, touch targets, reduced motion, and accessible interaction alternatives.'
license: MIT
metadata:
    author: pulse
    version: '1.0.0'
    canonical: vercel-react-best-practices
---

# Pulse Accessibility WCAG

Plans, implements, and reviews accessibility for React components in this Laravel Inertia app. Use for WCAG 2.2, semantic HTML, ARIA, keyboard navigation, focus management, screen readers, touch targets, reduced motion, and accessible interaction alternatives.

## Purpose

Ensure components are usable with keyboard, screen readers, touch, reduced motion, and native browser behaviours.

Before designing or refactoring any component, consult
[`RADIX-PRIMITIVES.md`](../pulse-workflow-orchestrator/references/RADIX-PRIMITIVES.md)
and determine whether one or more Radix primitives should be used before writing
custom interaction or accessibility logic.

## When to Apply

- Component has interaction, forms, status, navigation, media, animation, or complex layout.
- Radix primitives, custom gestures, overlays, or focus management are involved.
- Reviewing accessibility regressions.

## When Not to Apply

- Component is purely decorative and already hidden appropriately.
- The task is backend-only.

## Inputs

Required:

- Component behaviour and UI structure.
- Interaction requirements.

Optional:

- Radix primitive docs.
- Known accessibility issue.
- Browser or assistive tech target.

## Outputs

- Accessibility plan.
- Keyboard and focus model.
- ARIA and semantic decisions.
- Reduced-motion and touch requirements.
- Test scenarios.

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

Runs with requirements, API contract, Radix composition, Motion interactions, TDD planning, behaviour testing, browser verification, and review.

## How to Use

1. Confirm the task matches the description and "When to Apply" section.
2. Read the rule catalog files needed for the task.
3. Execute the workflow and decision points.
4. Validate with the checklist.
5. Hand off to the next related skill when the current skill reaches its boundary.

## Full Compiled Document

For the complete guide with this skill and all rules expanded, read `AGENTS.md`.
