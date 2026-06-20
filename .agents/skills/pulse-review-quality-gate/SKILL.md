---
name: pulse-review-quality-gate
description: Reviews completed React component work in this Laravel Inertia app. Use before finalizing component changes to check requirements, architecture, API, accessibility, design system, Motion, performance, tests, browser behaviour, documentation, and maintainability.
---

# Laravel React Component Review Quality Gate

Run the final component quality check.

## Purpose

Catch regressions and missing verification before reporting completion.

## When to Use

- Component implementation or refactor is complete.
- User asks for a review.
- A component change touches shared code, interaction, accessibility, media, or performance.

## When NOT to Use

- No files changed and user only asked for a quick answer.
- Backend-only code review should use Laravel-specific review guidance.

## Inputs

Required:

- Changed files.
- Requirements or intended behaviour.

Optional:

- Test results.
- Browser logs.
- Build output.
- Screenshots.

## Outputs

- Findings by severity when reviewing.
- Completion checklist.
- Verification summary.
- Residual risks.

## Rules

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

- [Responsibilities](rules/responsibilities.md)
- [Non-Responsibilities](rules/non-responsibilities.md)
- [Workflow](rules/workflow.md)
- [Decision Points](rules/decision-points.md)
- [Checklists](rules/checklists.md)
- [Documentation Discipline](rules/documentation-discipline.md)

## Integration

Usually runs after implementation, behaviour testing, browser verification, and documentation.
