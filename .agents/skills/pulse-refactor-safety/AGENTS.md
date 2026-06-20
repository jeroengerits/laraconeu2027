# Pulse Refactor Safety

**Version 1.0.0**  
Pulse Component Workflow  
June 2026

> This compiled document is optimized for AI-assisted component work. It mirrors the `vercel-react-best-practices` shape: short entry point, metadata, expanded rule catalog, and deterministic validation gates.

---

## Abstract

Safely refactors React components in this Laravel app without changing behaviour. Use when extracting hooks, splitting components, renaming props, simplifying state, reducing duplication, preserving public APIs, or improving maintainability.

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
| Name                   | `pulse-refactor-safety`       |
| Canonical architecture | `vercel-react-best-practices` |
| Primary entry point    | `SKILL.md`                    |
| Rule catalog           | `rules/`                      |
| Metadata               | `metadata.json`               |

## Purpose

Keep refactors surgical, verifiable, and respectful of existing consumers.

## When to Apply

- Refactoring component internals.
- Extracting hooks, helpers, or subcomponents.
- Reducing duplication.
- Changing public API shape.
- Cleaning up performance or state issues.

## When Not to Apply

- User requested a new feature rather than a refactor.
- Behaviour changes are intentional and not yet specified.

## Inputs

Required:

- Current component files.
- Intended refactor goal.

Optional:

- Existing tests.
- Consumer list.
- API contract.

## Outputs

- Refactor plan.
- Behaviour preservation checklist.
- Consumer impact notes.
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

- Identify behaviour that must remain unchanged.
- Preserve public API unless an API migration is approved.
- Sequence refactors in small steps.
- Ensure tests or verification cover affected behaviour.
- Avoid unrelated cleanup.
- Preserve hydration, accessibility, and native gesture behaviour unless the refactor explicitly targets them.

---

## Non-Responsibilities

- Adding new behaviour.
- Broad architectural rewrites.
- Deleting tests without approval.

---

## Workflow

1. Identify externally visible behaviour.
2. Search consumers before public API changes.
3. Prefer extraction over rewrites.
4. Keep commits or edits logically grouped.
5. Keep public props, events, refs, and accessible names stable unless an API migration is approved.
6. Run tests before and after when feasible.
7. Report any unavoidable behaviour changes explicitly.

---

## Decision Points

- Extract a helper only when it clarifies or is reused.
- Extract a hook when behaviour is complex or reused.
- Keep private components local unless reused.
- Add tests before risky refactors when missing coverage matters.
- Route public API changes back to `pulse-api-contract` before editing consumers.

### Failure and Escalation

- Stop condition: if a refactor cannot preserve behaviour or public API, stop and surface
  the required change instead of silently altering consumers.
- Reporting: report any unavoidable behaviour or API changes and their consumer impact.
- Route public API changes back to `pulse-api-contract` before editing consumers.
- Route uncertain framework or library behaviour to `pulse-docs-research`.
- Escalate broad architectural rewrites to `pulse-architecture-boundaries` or the user.

---

## Checklists

Pre-flight:

- Existing behaviour is known.
- Consumers are identified.
- Test coverage is checked.

Execution:

- Refactor steps are small.
- API changes are intentional.
- No unrelated files are touched.

Completion:

- Behaviour remains unchanged or changes are documented.
- Verification is complete.
- Maintainability improved for a concrete reason.

---

## Documentation Discipline

Use the shared Pulse documentation-source rule.

Skill-specific application:

- Start from this skill's owning scope and local project conventions.
- Use Laravel Boost `search-docs` before code changes. Do not skip this step.
- Use `pulse-docs-research` when framework, library, hydration, testing, browser, or accessibility details affect implementation.

---

## Integration

Collaborates with existing audit, API contract, state/effects, behaviour testing, implementation, and review.
