# Pulse Implementation

**Version 1.0.0**  
Pulse Component Workflow  
June 2026

> This compiled document is optimized for AI-assisted component work. It mirrors the `vercel-react-best-practices` shape: short entry point, metadata, expanded rule catalog, and deterministic validation gates.

---

## Abstract

Implements approved React component plans in this Laravel Inertia app. Use after discovery, requirements, architecture, API, accessibility, performance, and testing decisions are made, to edit component, hook, helper, style, and test files following local conventions.

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
| Name                   | `pulse-implementation`        |
| Canonical architecture | `vercel-react-best-practices` |
| Primary entry point    | `SKILL.md`                    |
| Rule catalog           | `rules/`                      |
| Metadata               | `metadata.json`               |

## Purpose

Translate approved component decisions into code that follows React 19, TypeScript, Inertia, Tailwind, Radix, Motion, and local project conventions.

Before designing or refactoring any component, consult
[`RADIX-PRIMITIVES.md`](../pulse-workflow-orchestrator/references/RADIX-PRIMITIVES.md)
and determine whether one or more Radix primitives should be used before writing
custom interaction or accessibility logic.

## When to Apply

- The plan is clear enough to edit files.
- The user approved implementation.
- A bug fix or refactor requires code changes.

## When Not to Apply

- The user only wants analysis or a plan.
- Requirements are still blocking.
- The task is backend-only.

## Inputs

Required:

- Component plan.
- Target files or locations.
- Applicable skill outputs.

Optional:

- Failing tests.
- Browser logs.
- Screenshots.

## Outputs

- Code changes.
- Test or verification changes when needed.
- Verification results.
- Brief implementation summary.

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

- Edit files using local patterns.
- Keep changes scoped.
- Reuse existing components and helpers.
- Apply outputs from focused skills.
- Run relevant verification.

---

## Non-Responsibilities

- Rewriting the architecture mid-implementation without surfacing why.
- Creating new dependencies without approval.
- Reverting unrelated user changes.

---

## Workflow

1. Read target and sibling files.
2. Announce intended edits before modifying files.
3. Confirm docs research is complete for uncertain Inertia, React, Motion, Radix, Tailwind, testing, or Vite APIs.
4. Use `apply_patch` for manual edits.
5. Preserve unrelated changes.
6. Keep TypeScript types explicit and local unless reused.
7. Avoid render-time nondeterminism.
8. Follow local import, alias, and class merge conventions.
9. Run the smallest reliable checks.

---

## Decision Points

- If implementation reveals a bigger boundary issue, pause and route back to architecture or API skill.
- If docs uncertainty appears, use docs research.
- If meaningful behaviour changes, ensure testing skills are used.
- Do not introduce dependency, asset-loading, or SSR boundary changes without explicit source support and verification.

### Failure and Escalation

- Stop condition: if implementation reveals a boundary, API, or dependency issue beyond the
  plan, stop and route back instead of silently expanding scope.
- Reporting: when blocked, report the files changed, the checks run or skipped, and the
  residual risks.
- Escalate uncertain Inertia, React, Motion, Radix, Tailwind, testing, or Vite APIs to
  `pulse-docs-research`.
- Escalate boundary or structure problems to `pulse-architecture-boundaries` and public API
  changes to `pulse-api-contract`.
- Escalate new dependencies, asset-loading, or SSR boundary changes to the user.

---

## Checklists

Pre-flight:

- Target files are read.
- Planned edits are scoped.
- Required docs have been checked.

Execution:

- Existing conventions are followed.
- Changes are minimal.
- No unrelated refactors are introduced.

Completion:

- Verification ran or was reported as skipped.
- Summary names files changed.
- Residual risks are clear.

---

## Documentation Discipline

Use the shared Pulse documentation-source rule in
[`../pulse-workflow-orchestrator/references/documentation-discipline.md`](../pulse-workflow-orchestrator/references/documentation-discipline.md).

---

## Integration

Runs after planning skills and before review, browser verification, documentation, and final response.
