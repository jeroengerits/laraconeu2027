# Pulse Media Assets

**Version 1.0.0**  
Pulse Component Workflow  
June 2026

> This compiled document is optimized for AI-assisted component work. It mirrors the `vercel-react-best-practices` shape: short entry point, metadata, expanded rule catalog, and deterministic validation gates.

---

## Abstract

Optimizes media and asset handling for React components in this Laravel Vite app. Use for responsive images, lazy loading, import.meta.glob, asset request counts, alt text, image sizing, viewport loading, video, and below-the-fold media.

---

## Table of Contents

1. [Skill Contract](#skill-contract)
2. [Purpose](#purpose)
3. [When to Apply](#when-to-apply)
4. [When Not to Apply](#when-not-to-apply)
5. [Inputs](#inputs)
6. [Outputs](#outputs)
7. [Rule Catalog](#rule-catalog)
8. [Responsibilities](#responsibilities)
9. [Non-Responsibilities](#non-responsibilities)
10. [Workflow](#workflow)
11. [Decision Points](#decision-points)
12. [Checklists](#checklists)
13. [Documentation Discipline](#documentation-discipline)

---

## Skill Contract

| Field                  | Value                         |
| ---------------------- | ----------------------------- |
| Name                   | `pulse-media-assets`          |
| Canonical architecture | `vercel-react-best-practices` |
| Primary entry point    | `SKILL.md`                    |
| Rule catalog           | `rules/`                      |
| Metadata               | `metadata.json`               |

## Purpose

Reduce pageload requests, avoid layout shift, and keep image/video rendering accessible and responsive.

## When to Apply

- Components render photos, images, video, icons, or large asset sets.
- Lazy loading or responsive image behaviour changes.
- `import.meta.glob` or Vite asset loading is involved.
- Request count or first paint is a concern.

## When Not to Apply

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

## Rule Catalog

| Rule                                                          | Purpose                                            |
| ------------------------------------------------------------- | -------------------------------------------------- |
| [Responsibilities](rules/responsibilities.md)                 | What this skill owns.                              |
| [Non-Responsibilities](rules/non-responsibilities.md)         | What this skill explicitly does not own.           |
| [Workflow](rules/workflow.md)                                 | Step-by-step execution process.                    |
| [Decision Points](rules/decision-points.md)                   | Branching rules and handoff decisions.             |
| [Checklists](rules/checklists.md)                             | Pre-flight, execution, and completion checks.      |
| [Documentation Discipline](rules/documentation-discipline.md) | Shared documentation-source rule for code changes. |

---

## Responsibilities

- Choose eager vs lazy media loading.
- Use responsive image components when available.
- Preserve width, height, aspect ratio, and alt text.
- Reduce below-the-fold request count.
- Avoid eager imports of large asset sets unless needed for first paint.
- Avoid creating responsive `srcSet` or image requests for offscreen gallery items until they are near the viewport.

---

## Non-Responsibilities

- Generic bundle optimization outside media.
- Visual art direction beyond media fit and cropping.
- Creating new image assets unless requested.

---

## Workflow

1. Audit existing media helpers and responsive image components.
2. Keep dimensions or aspect ratios stable to avoid layout shift.
3. Use lazy loading for below-the-fold media.
4. Use viewport-aware loading when only visible items should request images.
5. Use `import.meta.glob` lazily for large asset sets when practical.
6. Keep server and client `src`, `srcSet`, and `sizes` output deterministic during hydration.
7. Ensure meaningful images have useful `alt`; decorative images have empty alt.
8. Verify build when changing imports or Vite asset behaviour.

---

## Decision Points

- Eager-load only critical first-viewport media.
- Lazy-load carousel/gallery rows outside the viewport.
- Avoid loading full responsive image sets before needed.
- Use direct imports only for small, critical assets.
- Prefer an existing `ResponsiveImage` utility over hand-built `img` markup when it already encodes project sizing and lazy-loading conventions.

### Failure and Escalation

- Stop condition: if media cannot load without layout shift, excessive requests, or broken
  hydration, do not ship it. Report the constraint.
- Reporting: list any asset or build behaviour that could not be verified.
- Escalate uncertain Vite asset, `import.meta.glob`, or responsive image APIs to `pulse-docs-research`.
- Escalate to the user when reducing requests requires removing or replacing assets (a content or scope decision).
- Hand broader bundle or render performance to `pulse-performance-vercel` and alt-text semantics to `pulse-accessibility-wcag`.

---

## Checklists

Pre-flight:

- Media count and viewport position are known.
- Existing image component is checked.

Execution:

- Dimensions are stable.
- Alt text is intentional.
- Lazy strategy is compatible with SSR/hydration.

Completion:

- Request count impact is considered.
- Build verification is planned for Vite asset changes.
- Browser verification includes image loading.

---

## Documentation Discipline

Use the shared Pulse documentation-source rule in
[`../pulse-workflow-orchestrator/references/documentation-discipline.md`](../pulse-workflow-orchestrator/references/documentation-discipline.md).

---

## Integration

Works with performance, accessibility, implementation, browser verification, and review.
