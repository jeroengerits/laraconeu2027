---
name: pulse-existing-audit
description: Audits existing React components, hooks, utilities, tests, pages, styles, and conventions before Laravel Inertia component work. Use before creating new components, extracting hooks, adding variants, or changing shared UI.
---

# Laravel React Component Existing Audit

Find what already exists before adding or changing component code.

## Purpose

Prevent duplicate components, inconsistent APIs, and design drift by checking local code and conventions first.

## When to Use

- Creating or refactoring a component.
- Adding variants or shared behaviour.
- Extracting hooks or helpers.
- Unsure where a component belongs.

## When NOT to Use

- The user asks only for high-level advice.
- The task touches no local component code.

## Inputs

Required:

- Component goal or target file.
- Project root.

Optional:

- Known component names.
- Related routes, pages, or screenshots.

## Outputs

- Relevant existing files.
- Conventions to follow.
- Similar APIs and patterns.
- Gaps or duplication risks.

## Rules

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

- [Responsibilities](rules/responsibilities.md)
- [Non-Responsibilities](rules/non-responsibilities.md)
- [Workflow](rules/workflow.md)
- [Decision Points](rules/decision-points.md)
- [Checklists](rules/checklists.md)
- [Documentation Discipline](rules/documentation-discipline.md)

## Integration

Runs early after requirements analysis and before reuse, architecture, implementation, and review.
