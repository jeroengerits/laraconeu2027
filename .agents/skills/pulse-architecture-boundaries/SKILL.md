---
name: pulse-architecture-boundaries
description: Defines React component architecture boundaries in this Laravel Inertia app. Use when choosing component type, file placement, state ownership, composition shape, hook extraction, helper extraction, or page-section boundaries.
---

# Laravel React Component Architecture Boundaries

Decide where component responsibilities live.

## Purpose

Keep components coherent, reusable only when justified, and aligned with project structure.

## When to Use

- Creating a component or page section.
- Splitting a large component.
- Extracting hooks or helpers.
- Deciding between primitive, compound, feature, section, or page component.

## When NOT to Use

- Only copy, class names, or tiny styling needs changing.
- API and file boundaries are already fixed.

## Inputs

Required:

- Requirements.
- Existing audit or target files.
- Reuse decision.

Optional:

- Current component size and consumers.
- Known performance constraints.

## Outputs

- Component type.
- File boundary plan.
- State ownership plan.
- Hook/helper extraction decisions.
- Implementation sequence.

## Rules

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

- [Responsibilities](rules/responsibilities.md)
- [Non-Responsibilities](rules/non-responsibilities.md)
- [Workflow](rules/workflow.md)
- [Decision Points](rules/decision-points.md)
- [Checklists](rules/checklists.md)
- [Documentation Discipline](rules/documentation-discipline.md)

## Integration

Runs after requirements, existing audit, and reuse decision. Runs before API contract, state/effects, implementation, refactor safety, and review.
