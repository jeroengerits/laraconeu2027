---
name: pulse-requirements-analysis
description: Analyzes requirements for React component work in this Laravel Inertia app. Use when a component request needs goals, non-goals, constraints, user workflows, acceptance criteria, edge cases, or behaviour scenarios before implementation.
---

# Laravel React Component Requirements Analysis

Clarify what the component must do before design or code decisions are made.

## Purpose

Convert the user request into actionable component requirements that can drive architecture, API design, tests, and review.

## When to Use

- The request is broad, ambiguous, or multi-step.
- Behaviour, accessibility, responsive, animation, or testing expectations need definition.
- A reusable component API may be introduced or changed.

## When NOT to Use

- The user requests a tiny mechanical edit with obvious scope.
- Existing tests or issue text already define the requirements fully.

## Inputs

Required:

- User request.
- Relevant existing UI behaviour.

Optional:

- Design references.
- Bug reports, logs, screenshots, or failing tests.
- Browser/device constraints.

## Outputs

- Goals and non-goals.
- User workflows.
- Acceptance criteria.
- Behaviour scenarios.
- Known edge cases.

## Rules

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

- [Responsibilities](rules/responsibilities.md)
- [Non-Responsibilities](rules/non-responsibilities.md)
- [Workflow](rules/workflow.md)
- [Decision Points](rules/decision-points.md)
- [Checklists](rules/checklists.md)
- [Documentation Discipline](rules/documentation-discipline.md)

## Integration

Runs after `pulse-workflow-orchestrator` and before architecture, API, TDD, implementation, and review skills.
