---
name: pulse-browser-verification
description: 'Verifies React component behaviour in the browser for this Laravel Herd/Inertia app. Use for interaction-heavy components, responsive UI, trackpad/mouse/touch gestures, keyboard flows, reduced motion, light/dark modes, image loading, hydration warnings, and visual regressions.'
license: MIT
metadata:
    author: pulse
    version: '1.0.0'
    canonical: vercel-react-best-practices
---

# Pulse Browser Verification

Verifies React component behaviour in the browser for this Laravel Herd/Inertia app. Use for interaction-heavy components, responsive UI, trackpad/mouse/touch gestures, keyboard flows, reduced motion, light/dark modes, image loading, hydration warnings, and visual regressions.

## Purpose

Validate real browser behaviour across input modes, viewports, and rendering states.

## When to Apply

- Component has gestures, scroll, hover, drag, media, animation, overlays, or responsive layout.
- Hydration warnings or browser console errors are relevant.
- User explicitly asks to test desktop, trackpad, mobile, touch, or browser behaviour.

## When Not to Apply

- The change is covered fully by tests and has no visual or browser-specific surface.
- The request is purely static analysis with no browser-observable surface.

## Inputs

Required:

- URL or route/path.
- Behaviour to verify.

Optional:

- Browser logs.
- Viewport targets.
- Known device issue.

## Outputs

- Browser verification checklist.
- Recent browser errors if any.
- Behaviour findings.
- Follow-up fixes if needed.

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

Runs after implementation and tests for interaction-heavy components. Feeds findings into implementation or review quality gate.

## How to Use

1. Confirm the task matches the description and "When to Apply" section.
2. Read the rule catalog files needed for the task.
3. Execute the workflow and decision points.
4. Validate with the checklist.
5. Hand off to the next related skill when the current skill reaches its boundary.

## Full Compiled Document

For the complete guide with this skill and all rules expanded, read `AGENTS.md`.
