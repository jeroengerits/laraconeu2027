---
name: pulse-radix-composition
description: 'Designs Radix-inspired React component composition in this Laravel app. Use when building dialogs, menus, popovers, tabs, accordions, selects, switches, compound components, slots, asChild APIs, portals, or controlled/uncontrolled primitives.'
license: MIT
metadata:
    author: pulse
    version: '1.0.0'
    canonical: vercel-react-best-practices
---

# Pulse Radix Composition

Designs Radix-inspired React component composition in this Laravel app. Use when building dialogs, menus, popovers, tabs, accordions, selects, switches, compound components, slots, asChild APIs, portals, or controlled/uncontrolled primitives.

## Purpose

Avoid reimplementing complex accessibility behaviour and keep component APIs flexible without leaking DOM internals.

Before designing or refactoring any component, consult
[`RADIX-PRIMITIVES.md`](../pulse-workflow-orchestrator/references/RADIX-PRIMITIVES.md)
and determine whether one or more Radix primitives should be used before writing
custom interaction or accessibility logic.

## When to Apply

- Building complex interactive primitives.
- Wrapping or styling Radix UI primitives.
- Designing compound components.
- Using `asChild`, slots, portals, or state attributes.

## When Not to Apply

- Native HTML fully covers the interaction.
- Component is a simple presentational section.

## Inputs

Required:

- Interaction type.
- API contract or composition need.

Optional:

- Radix docs findings.
- Existing local wrapper patterns.
- Accessibility requirements.

## Outputs

- Primitive/composition choice.
- Compound part list.
- Slot and `asChild` guidance.
- Portal/layering notes.

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
| [Radix Primitives Reference](../pulse-workflow-orchestrator/references/RADIX-PRIMITIVES.md) | Canonical primitive-selection reference. |

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

Runs with accessibility, API contract, design system, implementation, behaviour testing, and review skills.

## How to Use

1. Confirm the task matches the description and "When to Apply" section.
2. Read the rule catalog files needed for the task.
3. Execute the workflow and decision points.
4. Validate with the checklist.
5. Hand off to the next related skill when the current skill reaches its boundary.

## Full Compiled Document

For the complete guide with this skill and all rules expanded, read `AGENTS.md`.
