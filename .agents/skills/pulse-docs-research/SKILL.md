---
name: pulse-docs-research
description: Researches current documentation for Laravel React component work. Use when implementation depends on Inertia React, Wayfinder, React 19, Motion React, Radix UI, Tailwind CSS 4, Jest, React Testing Library, Vite, or other library APIs that may change.
---

# Laravel React Component Docs Research

Verify framework and library APIs before relying on memory.

## Purpose

Provide current, version-aware documentation context for component implementation and review.

## When to Use

- Before making code changes in this project.
- API details are uncertain.
- The task touches Inertia, Wayfinder, React, Motion, Radix, Tailwind, Jest, React Testing Library, Vite, or lazy loading.
- Hydration, SSR, gestures, forms, or testing APIs are involved.

## When NOT to Use

- The task is purely explanatory and no code will change.

## Inputs

Required:

- Library or API question.
- Package or framework area.

Optional:

- Installed package versions.
- Error message or failing code.

## Outputs

- Documentation findings.
- Source of truth used.
- Version-specific caveats.
- Implementation guidance.

## Rules

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

- [Responsibilities](rules/responsibilities.md)
- [Non-Responsibilities](rules/non-responsibilities.md)
- [Workflow](rules/workflow.md)
- [Decision Points](rules/decision-points.md)
- [Checklists](rules/checklists.md)
- [Documentation Discipline](rules/documentation-discipline.md)

## Integration

Commonly collaborates with all component skills, especially Inertia integration, Radix composition, Motion interactions, Tailwind design system, performance, and behaviour testing.
