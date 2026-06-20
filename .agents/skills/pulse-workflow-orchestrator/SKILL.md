---
name: pulse-workflow-orchestrator
description: Orchestrates complete React component development in this Laravel Inertia app. Use whenever a user asks to create, refactor, review, test, document, or optimize a reusable React component or page section, especially when multiple component skills should be coordinated.
---

# Laravel React Component Workflow Orchestrator

Coordinate the focused Laravel React component skills from initial request to verification.

## Purpose

Turn a component task into a clear sequence of specialized skill work. Keep the process lightweight for small changes and explicit for reusable or risky components.

## When to Use

- A component task spans planning, architecture, implementation, testing, review, or documentation.
- Multiple focused skills apply and need ordering.
- The user asks for a reusable component workflow.

## When NOT to Use

- The request is a one-line factual answer.
- The task is backend-only Laravel work.
- A single narrow component skill fully covers the request.

## Inputs

Required:

- User request.
- Current codebase context.
- Project constraints from `AGENTS.md`.

Optional:

- Existing design references.
- Prior component decisions.
- Test failures or browser logs.

## Outputs

- Skill execution order.
- Component lifecycle checklist.
- Implementation sequence.
- Verification plan.
- Open questions only when needed.

## Rules

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

- [Responsibilities](rules/responsibilities.md)
- [Non-Responsibilities](rules/non-responsibilities.md)
- [Workflow](rules/workflow.md)
- [Decision Points](rules/decision-points.md)
- [Checklists](rules/checklists.md)
- [Documentation Discipline](rules/documentation-discipline.md)

## Integration

Usually runs before all other Laravel React component skills. It commonly coordinates every skill in this set and finishes with `pulse-review-quality-gate`.
