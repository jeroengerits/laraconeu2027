---
name: pulse-create-component
description: Starts an intake-first Pulse React component creation workflow in this Laravel Inertia app. Use whenever the user asks to create, build, add, scaffold, plan, or start a new React component or reusable page section and the agent needs to gather enough information before orchestration.
---

# Pulse Create Component

Use this as the intake entry point for new React component work.

## Purpose

Gather the minimum useful information required to create a high-quality React
component, then route the work through `COMPONENT-DESIGN.md`,
`pulse-workflow-orchestrator`, the focused `pulse-*` skills, and supporting
skills such as `context7`, `inertia-react-development`, `motion-react`,
`radix-ui-design-system`, `tailwind-design-system`,
`vercel-react-best-practices`, and `jest-react-testing`.

## When to Use

- The user asks to create, build, add, scaffold, plan, or start a React
  component.
- The component idea is incomplete and needs requirements discovery.
- The component may become reusable or part of the design system.
- The task may need accessibility, responsive behaviour, Inertia integration,
  Motion, media, performance, tests, documentation, or browser verification.

## When NOT to Use

- The user asks only to review, test, document, or optimize an existing
  component. Use the narrower `pulse-*` skill for that task.
- The task is backend-only Laravel work.
- The request is a trivial copy, class, or styling edit to an existing
  component.
- The user explicitly provides a complete plan and asks to implement it
  immediately; start with `pulse-workflow-orchestrator` instead.

## Intake Inputs

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

## Intake Outputs

- Component brief.
- Known requirements and non-goals.
- Missing information, if still blocking.
- Suggested Pulse and supporting skill sequence.
- Plan-first or implement-now recommendation.
- Approval request before implementation when appropriate.

## Rules

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

- [Responsibilities](rules/responsibilities.md)
- [Non-Responsibilities](rules/non-responsibilities.md)
- [Question Strategy](rules/question-strategy.md)
- [Intake Questions](rules/intake-questions.md)
- [Workflow](rules/workflow.md)
- [Decision Points](rules/decision-points.md)
- [Prompt Template](rules/prompt-template.md)
- [Checklists](rules/checklists.md)
- [Documentation Discipline](rules/documentation-discipline.md)

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
