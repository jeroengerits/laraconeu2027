---
name: pulse-motion-interactions
description: 'Designs Motion React animations and gestures for components in this Laravel app. Use for micro-interactions, variants, hover, focus, tap, drag, scroll effects, autoplay, marquee behaviour, reduced motion, animation performance, and gesture support.'
license: MIT
metadata:
    author: pulse
    version: '1.0.0'
    canonical: vercel-react-best-practices
---

# Pulse Motion Interactions

Designs Motion React animations and gestures for components in this Laravel app. Use for micro-interactions, variants, hover, focus, tap, drag, scroll effects, autoplay, marquee behaviour, reduced motion, animation performance, and gesture support.

## Purpose

Make animation clarify state or interaction while preserving accessibility, performance, and browser gestures.

## When to Apply

- Adding or refactoring Motion React animation.
- Implementing drag, swipe, hover, tap, scroll, autoplay, or marquee behaviour.
- Reduced motion or animation performance matters.

## When Not to Apply

- Styling-only transitions can be handled by Tailwind without behaviour.
- Animation is decorative and not requested.

## Inputs

Required:

- Interaction goal.
- Component architecture.

Optional:

- Motion docs findings.
- Gesture requirements.
- Performance constraints.

## Outputs

- Animation plan.
- Gesture model.
- Reduced-motion behaviour.
- Performance notes.
- Verification scenarios.

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

Collaborates with accessibility, state/effects, performance, implementation, browser verification, and review.

## How to Use

1. Confirm the task matches the description and "When to Apply" section.
2. Read the rule catalog files needed for the task.
3. Execute the workflow and decision points.
4. Validate with the checklist.
5. Hand off to the next related skill when the current skill reaches its boundary.

## Full Compiled Document

For the complete guide with this skill and all rules expanded, read `AGENTS.md`.
