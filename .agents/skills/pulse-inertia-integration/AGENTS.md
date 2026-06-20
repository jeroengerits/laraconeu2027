# Pulse Inertia Integration

**Version 1.0.0**  
Pulse Component Workflow  
June 2026

> This compiled document is optimized for AI-assisted component work. It mirrors the `vercel-react-best-practices` shape: short entry point, metadata, expanded rule catalog, and deterministic validation gates.

---

## Abstract

Applies Inertia React v3 patterns to Laravel React components. Use when components touch page props, navigation, forms, Wayfinder route helpers, deferred data, useHttp, SSR boundaries, or Inertia-specific client behaviour.

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
| Name                   | `pulse-inertia-integration`   |
| Canonical architecture | `vercel-react-best-practices` |
| Primary entry point    | `SKILL.md`                    |
| Rule catalog           | `rules/`                      |
| Metadata               | `metadata.json`               |

## Purpose

Keep page props, navigation, forms, HTTP requests, and SSR integration aligned with Inertia v3 and local project conventions.

## When to Apply

- Component uses Inertia page props.
- Internal navigation is added.
- Server-backed forms or standalone HTTP requests are involved.
- Wayfinder route helpers are needed.
- Deferred props, lazy data, or SSR behaviour is relevant.

## When Not to Apply

- Component has no Inertia, routing, page props, or server interaction.

## Inputs

Required:

- Inertia behaviour needed.
- Route or prop context.

Optional:

- Controller/action names.
- Existing page props.
- Form fields and validation errors.

## Outputs

- Inertia API choice.
- Route helper strategy.
- Page prop boundary notes.
- Loading/deferred state plan.

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

- Use Boost docs and `inertia-react-development` for Inertia and Wayfinder APIs.
- Use `<Link>` for internal navigation.
- Choose `<Form<T>>`, `useForm`, `useFormContext<T>`, or `useHttp`.
- Keep page props serializable, minimal, and stable.
- Avoid hydration mismatches at the server/client boundary.

---

## Non-Responsibilities

- Backend controller or route implementation.
- Generic React state design not tied to Inertia.
- Visual styling.

---

## Workflow

1. Use Laravel Boost `search-docs` before Inertia-specific changes.
2. Use `inertia-react-development` for client-side page, form, and navigation patterns.
3. Use existing project imports and route helper conventions.
4. Use `<Link>` for internal navigation.
5. Use Wayfinder helpers from `@/actions` or `@/routes` when route integration is needed.
6. Choose typed form APIs based on interaction complexity.
7. Use deferred props only when first paint does not need the data.
8. Keep initial render stable for SSR/hydration.

---

## Decision Points

- Use `<Form<T>>` for regular server-backed forms.
- Use `useForm` for custom local control.
- Use `useHttp` for standalone HTTP requests that should not visit.
- Use `WhenVisible` or `InfiniteScroll` only when data behaviour matches.
- Use visible empty, loading, and error states for deferred or optional data.

### Failure and Escalation

- Stop condition: if the correct Inertia or Wayfinder API cannot be confirmed, do not guess
  at an integration that risks hydration mismatches or broken navigation. Report the uncertainty.
- Reporting: list any page-prop, form, or route decision left unresolved because controller,
  route, or prop context is unknown.
- Escalate uncertain Inertia v3 or Wayfinder API behaviour to `pulse-docs-research` and `inertia-react-development`.
- Escalate to the user when behaviour requires backend controller, route, or page-prop changes outside this skill's scope.
- Hand generic state mechanics to `pulse-state-effects` and public prop shape to `pulse-api-contract`.

---

## Checklists

Pre-flight:

- Inertia docs are checked for API uncertainty.
- Page props and routes are identified.

Execution:

- Navigation and form APIs match Inertia intent.
- Props are serializable and minimal.
- Deferred or lazy state has a visible fallback.

Completion:

- Hydration boundary is safe.
- Route integration is typed when practical.
- Verification includes relevant page behaviour.

---

## Documentation Discipline

Use the shared Pulse documentation-source rule in
[`../pulse-workflow-orchestrator/references/documentation-discipline.md`](../pulse-workflow-orchestrator/references/documentation-discipline.md).

---

## Integration

Collaborates with docs research, API contract, state/effects, implementation, testing, and review skills.
