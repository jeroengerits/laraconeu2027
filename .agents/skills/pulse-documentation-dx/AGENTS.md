# Pulse Documentation DX

**Version 1.0.0**  
Pulse Component Workflow  
June 2026

> This compiled document is optimized for AI-assisted component work. It mirrors the `vercel-react-best-practices` shape: short entry point, metadata, expanded rule catalog, and deterministic validation gates.

---

## Abstract

Documents reusable React components in this Laravel app. Use when a component API, behaviour, accessibility model, variants, integration pattern, or limitation should be explained for future developers or AI agents.

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
| Name                   | `pulse-documentation-dx`      |
| Canonical architecture | `vercel-react-best-practices` |
| Primary entry point    | `SKILL.md`                    |
| Rule catalog           | `rules/`                      |
| Metadata               | `metadata.json`               |

## Purpose

Make component APIs and behaviour understandable for future maintainers and AI agents.

## When to Apply

- A reusable component is created or significantly changed.
- Public API, variants, controlled/uncontrolled behaviour, accessibility, or integration details need explanation.
- User asks for documentation.

## When Not to Apply

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

- Document purpose and intended use.
- Provide usage examples.
- Explain props, variants, callbacks, and defaults.
- Note accessibility, keyboard, responsive, and motion behaviour.
- Note Inertia, Radix, form, or route integration.
- Note limitations.
- Record source-sensitive usage notes when behaviour depends on Inertia, React, Radix, Motion, Tailwind, or Testing Library APIs.

---

## Non-Responsibilities

- Creating new documentation files without an explicit user request.
- Repeating obvious implementation details.
- Replacing tests.

---

## Workflow

1. Decide whether docs should be inline, in an existing document, or not created.
2. Keep examples minimal and realistic.
3. Document public API rather than internals.
4. Include accessibility and keyboard notes for interactive components.
5. Include integration examples when component usage depends on Inertia, Radix, or form context.
6. Include testing guidance for reusable behavioural components when it clarifies public outcomes.
7. Cite source of truth when docs depend on framework behaviour.

---

## Decision Points

- Do not create a new docs file unless the user explicitly requested it.
- Prefer updating existing docs over adding scattered files.
- Keep comments in code rare and useful.
- Prefer short examples that show accessible names, controlled state, or Inertia integration over exhaustive prop tables.

### Failure and Escalation

- Stop condition: if documentation would require a new file the user did not request, stop
  and ask instead of creating scattered docs.
- Reporting: report any behaviour that could not be documented because the public API or
  source of truth was unclear.
- Route uncertain Inertia, React, Radix, Motion, Tailwind, or Testing Library behaviour to
  `pulse-docs-research`.
- Escalate to the user when a new documentation file or location is needed.
- Hand documented components to `pulse-review-quality-gate`.

---

## Checklists

Pre-flight:

- Component is reusable or documentation was requested.
- Existing docs are checked.

Execution:

- Examples compile conceptually.
- Props and callbacks are clear.
- Accessibility notes are included when relevant.

Completion:

- Documentation describes public behaviour.
- Limitations are explicit.
- No stale duplicate docs were added.

---

## Documentation Discipline

Use the shared Pulse documentation-source rule in
[`../pulse-workflow-orchestrator/references/documentation-discipline.md`](../pulse-workflow-orchestrator/references/documentation-discipline.md).

---

## Integration

Runs after API design and implementation, before review, when documentation is warranted.
