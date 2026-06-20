---
name: pulse-media-assets
description: Optimizes media and asset handling for React components in this Laravel Vite app. Use for responsive images, lazy loading, import.meta.glob, asset request counts, alt text, image sizing, viewport loading, video, and below-the-fold media.
---

# Laravel React Component Media Assets

Load media intentionally and render it accessibly.

## Purpose

Reduce pageload requests, avoid layout shift, and keep image/video rendering accessible and responsive.

## When to Use

- Components render photos, images, video, icons, or large asset sets.
- Lazy loading or responsive image behaviour changes.
- `import.meta.glob` or Vite asset loading is involved.
- Request count or first paint is a concern.

## When NOT to Use

- Component has no media or asset loading.
- Only inline icon usage changes and existing pattern is clear.

## Inputs

Required:

- Media source and usage context.
- Existing image/rendering utilities.

Optional:

- Asset folder structure.
- Performance symptoms.
- Viewport loading requirements.

## Outputs

- Media loading strategy.
- Responsive sizing plan.
- Accessibility notes.
- Request-count risks.
- Verification plan.

## Rules

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

- [Responsibilities](rules/responsibilities.md)
- [Non-Responsibilities](rules/non-responsibilities.md)
- [Workflow](rules/workflow.md)
- [Decision Points](rules/decision-points.md)
- [Checklists](rules/checklists.md)
- [Documentation Discipline](rules/documentation-discipline.md)

## Integration

Works with performance, accessibility, implementation, browser verification, and review.
