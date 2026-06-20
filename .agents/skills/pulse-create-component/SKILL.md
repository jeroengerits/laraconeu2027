---
name: pulse-create-component
description: 'Starts an intake-first Pulse React component creation workflow in this Laravel Inertia app. Use whenever the user asks to create, build, add, scaffold, plan, or start a new React component or reusable page section and the agent needs to gather enough information before orchestration.'
license: MIT
metadata:
    author: pulse
    version: '1.0.0'
    canonical: vercel-react-best-practices
---

# Pulse Create Component

Starts an intake-first Pulse React component creation workflow in this Laravel Inertia app. Use whenever the user asks to create, build, add, scaffold, plan, or start a new React component or reusable page section and the agent needs to gather enough information before orchestration.

## Purpose

Gather the minimum useful information required to create a high-quality React
component, then route the work through `pulse-workflow-orchestrator/COMPONENT-DESIGN.md`,
`pulse-workflow-orchestrator`, the focused `pulse-*` skills, and supporting
skills such as `context7`, `inertia-react-development`, `motion-react`,
`radix-ui-design-system`, `tailwind-design-system`,
`vercel-react-best-practices`, and `jest-react-testing`.

Before designing or refactoring any component, consult
[`RADIX-PRIMITIVES.md`](../pulse-workflow-orchestrator/references/RADIX-PRIMITIVES.md)
and determine whether one or more Radix primitives should be used before writing
custom interaction or accessibility logic.

## When to Apply

- The user asks to create, build, add, scaffold, plan, or start a React
  component.
- The component idea is incomplete and needs requirements discovery.
- The component may become reusable or part of the design system.
- The task may need accessibility, responsive behaviour, Inertia integration,
  Motion, media, performance, tests, documentation, or browser verification.

## When Not to Apply

- The user asks only to review, test, document, or optimize an existing
  component. Use the narrower `pulse-*` skill for that task.
- The task is backend-only Laravel work.
- The request is a trivial copy, class, or styling edit to an existing
  component.
- The user explicitly provides a complete plan and asks to implement it
  immediately; start with `pulse-workflow-orchestrator` instead.

## Inputs

Required before orchestration:

- Component name or working name.
- Component purpose.
- Intended usage location.
- Primary user workflow.
- Expected behaviour.

Useful optional context:

- Existing component or design pattern to match.
- Reuse expectation.
- Props or data shape.
- Inertia route, form, or page prop needs.
- Radix primitive or accessibility expectations.
- Tailwind design-system constraints.
- Motion or gesture needs.
- Media or asset requirements.
- Performance, lazy loading, or hydration concerns.
- Test expectations.

## Outputs

- Component brief.
- Known requirements and non-goals.
- Missing information, if still blocking.
- Routing signals for the orchestrator to select the skill sequence.
- Plan-first or implement-now recommendation.
- Approval request before implementation when appropriate.

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
| [Intake Questions](rules/intake-questions.md)                 | Component intake question menu.                    |
| [Prompt Template](rules/prompt-template.md)                   | Starter prompt for users.                          |
| [Question Strategy](rules/question-strategy.md)               | Guidance for asking only necessary questions.      |

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
- `inertia-react-development`
- `jest-react-testing`
- `motion-react`
- `pulse-accessibility-wcag`
- `pulse-api-contract`
- `pulse-architecture-boundaries`
- `pulse-behavior-testing`
- `pulse-browser-verification`
- `pulse-docs-research`
- `pulse-documentation-dx`
- `pulse-existing-audit`
- `pulse-implementation`
- `pulse-inertia-integration`
- `pulse-media-assets`
- `pulse-motion-interactions`
- `pulse-performance-vercel`
- `pulse-radix-composition`
- `pulse-requirements-analysis`
- `pulse-reuse-decision`
- `pulse-review-quality-gate`
- `pulse-state-effects`
- `pulse-tailwind-design-system`
- `pulse-tdd-planning`
- `pulse-workflow-orchestrator`
- `radix-ui-design-system`
- `tailwind-design-system`
- `vercel-react-best-practices`

## Integration

Runs before `pulse-workflow-orchestrator` for new component creation. Commonly
routes into `pulse-requirements-analysis`, `pulse-existing-audit`,
`pulse-reuse-decision`, `pulse-docs-research`,
`pulse-architecture-boundaries`, `pulse-api-contract`, `pulse-state-effects`,
`pulse-inertia-integration`, `pulse-radix-composition`,
`pulse-tailwind-design-system`, `pulse-accessibility-wcag`,
`pulse-motion-interactions`, `pulse-media-assets`,
`pulse-performance-vercel`, `pulse-tdd-planning`,
`pulse-behavior-testing`, `pulse-implementation`,
`pulse-browser-verification`, `pulse-documentation-dx`, and
`pulse-review-quality-gate`.

## How to Use

1. Confirm the task matches the description and "When to Apply" section.
2. Read the rule catalog files needed for the task.
3. Execute the workflow and decision points.
4. Validate with the checklist.
5. Hand off to the next related skill when the current skill reaches its boundary.

## Full Compiled Document

For the complete guide with this skill and all rules expanded, read `AGENTS.md`.
