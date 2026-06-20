# Pulse Existing Audit

**Version 1.0.0**  
Pulse Component Workflow  
June 2026

> This compiled document is optimized for AI-assisted component work. It mirrors the `vercel-react-best-practices` shape: short entry point, metadata, expanded rule catalog, and deterministic validation gates.

---

## Abstract

Audits existing React components, hooks, utilities, tests, pages, styles, and conventions before Laravel Inertia component work. Use before creating new components, extracting hooks, adding variants, or changing shared UI.

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
| Name                   | `pulse-existing-audit`        |
| Canonical architecture | `vercel-react-best-practices` |
| Primary entry point    | `SKILL.md`                    |
| Rule catalog           | `rules/`                      |
| Metadata               | `metadata.json`               |

## Purpose

Prevent duplicate components, inconsistent APIs, and design drift by checking local code and conventions first.

## When to Apply

- Creating or refactoring a component.
- Adding variants or shared behaviour.
- Extracting hooks or helpers.
- Unsure where a component belongs.

## When Not to Apply

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

- Search existing components, sections, pages, hooks, libraries, styles, and tests.
- Identify sibling file conventions.
- Identify reusable primitives and local design patterns.
- Note existing verification commands.
- Identify installed supporting skills and docs that already govern the touched domain.

---

## Non-Responsibilities

- Final reuse decision.
- Designing a new API.
- Running broad refactors.

---

## Workflow

1. Search with `rg` and `rg --files`.
2. Inspect sibling files before editing.
3. Check `resources/js/components`, `resources/js/components/sections`, `resources/js/hooks`, `resources/js/lib`, and `resources/js/pages`.
4. Check existing tests and stories if present.
5. Check imports, naming, class merge helpers, test utilities, and browser-only guards used by similar files.
6. Summarize reusable patterns and conflicts.

---

## Decision Points

- If a close match exists, use `pulse-reuse-decision`.
- If existing API is unclear, use `pulse-api-contract`.
- If current docs are needed, use `pulse-docs-research`.
- If local code conflicts with docs, surface the conflict instead of silently changing conventions.

### Failure and Escalation

- Stop condition: if local search cannot confirm whether similar code already exists, do not
  assume greenfield. Report the uncertainty.
- Reporting: list any area, directory, or convention that could not be searched or inspected.
- Escalate close matches to `pulse-reuse-decision` and unclear existing APIs to `pulse-api-contract`.
- Escalate uncertain library or version behaviour to `pulse-docs-research`.
- Surface conflicts between local code and docs to the user when a convention must change.

---

## Checklists

Pre-flight:

- Search terms include domain names, component names, and behaviour names.
- Sibling files are checked.

Execution:

- Existing components and hooks are inspected.
- Tests and usage examples are checked when available.
- Local class and naming conventions are captured.

Completion:

- Reuse candidates are listed.
- New code location is informed by existing structure.
- Duplication risks are visible.

---

## Documentation Discipline

Use the shared Pulse documentation-source rule in
`pulse-workflow-orchestrator/references/documentation-discipline.md`.

---

## Integration

Runs early after requirements analysis and before reuse, architecture, implementation, and review.
