---
name: pulse-documentation-dx
description: Documents reusable React components in this Laravel app. Use when a component API, behaviour, accessibility model, variants, integration pattern, or limitation should be explained for future developers or AI agents.
---

# Laravel React Component Documentation DX

Document reusable component usage without creating unnecessary docs.

## Purpose

Make component APIs and behaviour understandable for future maintainers and AI agents.

## When to Use

- A reusable component is created or significantly changed.
- Public API, variants, controlled/uncontrolled behaviour, accessibility, or integration details need explanation.
- User asks for documentation.

## When NOT to Use

- Component is page-specific and obvious from local usage.
- User did not ask for new documentation files and inline docs are enough.

## Inputs

Required:

- Component API and usage.
- Reusability scope.

Optional:

- Existing docs location.
- Design-system conventions.
- Source docs used.

## Outputs

- Inline documentation or doc section.
- Usage examples.
- Accessibility and behaviour notes.
- Known limitations.

## Rules

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

- [Responsibilities](rules/responsibilities.md)
- [Non-Responsibilities](rules/non-responsibilities.md)
- [Workflow](rules/workflow.md)
- [Decision Points](rules/decision-points.md)
- [Checklists](rules/checklists.md)
- [Documentation Discipline](rules/documentation-discipline.md)

## Integration

Runs after API design and implementation, before review, when documentation is warranted.
