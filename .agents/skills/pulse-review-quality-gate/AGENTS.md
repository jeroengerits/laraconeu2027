# Pulse Review Quality Gate

**Version 1.0.0**  
Pulse Component Workflow  
June 2026

> This compiled document is optimized for AI-assisted component work. It mirrors the `vercel-react-best-practices` shape: short entry point, metadata, expanded rule catalog, and deterministic validation gates.

---

## Abstract

Reviews completed React component work in this Laravel Inertia app. Use before finalizing component changes to check requirements, architecture, API, accessibility, design system, Motion, performance, tests, browser behaviour, documentation, and maintainability.

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
| Name                   | `pulse-review-quality-gate`   |
| Canonical architecture | `vercel-react-best-practices` |
| Primary entry point    | `SKILL.md`                    |
| Rule catalog           | `rules/`                      |
| Metadata               | `metadata.json`               |

## Purpose

Catch regressions and missing verification before reporting completion.

## When to Apply

- Component implementation or refactor is complete.
- User asks for a review.
- A component change touches shared code, interaction, accessibility, media, or performance.

## When Not to Apply

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

- Review against acceptance criteria.
- Check architecture and API consistency.
- Check accessibility and responsive behaviour.
- Check design system, Motion, performance, media, tests, and documentation.
- Summarize residual risks.

---

## Non-Responsibilities

- Performing large new refactors during review.
- Replacing automated tests.
- Hiding skipped checks.

---

## Aggregation Model

This skill is an aggregator, not a second source of domain rules. It enforces Gate 2
(Definition of Done) by delegating each touched concern to the domain owner's
`rules/checklists.md` Completion section, per
`../pulse-workflow-orchestrator/references/review-aggregation.md`. It does not restate
accessibility, performance, API, or design checks.

---

## Workflow

1. Identify which concerns the change touched, using the routing signals in `../pulse-workflow-orchestrator/references/workflow-routing.md`.
2. For each touched concern, confirm the owning skill's `rules/checklists.md` Completion items per `../pulse-workflow-orchestrator/references/review-aggregation.md`. Do not restate domain checks.
3. Confirm structural Gate 2 items not owned by a single skill, from `../pulse-workflow-orchestrator/references/validation-gates.md`.
4. Confirm non-obvious API choices were backed by local conventions, supporting skills, Laravel Boost, Context7, or official web docs.
5. Record findings by severity, naming the owning skill for each.
6. Report every failed, skipped, or unverifiable item; do not hide skipped checks.

---

## Decision Points

- Delegate each concern to its domain owner's Completion checklist; do not duplicate domain checks.
- Fix blocking issues before final response.
- Report skipped verification honestly.
- Recommend follow-up only when it builds on the request.

### Failure and Escalation

- Stop condition: do not report completion while a Gate 2 item is unmet; route the unmet item back to its owning skill.
- Reporting: surface every failed, skipped, or unverifiable item with the owning skill named.
- Escalate unknown framework or library behaviour to `pulse-docs-research`.
- Escalate to the user when a fix requires a scope, dependency, or product decision, or a large new refactor.

---

## Checklists

Pre-flight:

- Changed files are known.
- Verification outputs are available or planned.

Execution:

- Requirements and user behaviour are checked first.
- Accessibility and performance are not treated as optional for interactive components.
- Tests are assessed for behaviour, not implementation detail.

Completion:

- No known blocker remains.
- Verification status is clear.
- Final summary is concise and actionable.

---

## Documentation Discipline

Use the shared Pulse documentation-source rule.

Skill-specific application:

- Start from this skill's owning scope and local project conventions.
- Use Laravel Boost `search-docs` before code changes. Do not skip this step.
- Use `pulse-docs-research` when framework, library, hydration, testing, browser, or accessibility details affect implementation.

---

## Integration

Usually runs after implementation, behaviour testing, browser verification, and documentation.
