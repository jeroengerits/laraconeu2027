# Pulse Requirements Analysis

**Version 1.0.0**  
Pulse Component Workflow  
June 2026

> This compiled document is optimized for AI-assisted component work. It mirrors the `vercel-react-best-practices` shape: short entry point, metadata, expanded rule catalog, and deterministic validation gates.

---

## Abstract

Analyzes requirements for React component work in this Laravel Inertia app. Use when a component request needs goals, non-goals, constraints, user workflows, acceptance criteria, edge cases, or behaviour scenarios before implementation.

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
| Name                   | `pulse-requirements-analysis` |
| Canonical architecture | `vercel-react-best-practices` |
| Primary entry point    | `SKILL.md`                    |
| Rule catalog           | `rules/`                      |
| Metadata               | `metadata.json`               |

## Purpose

Convert the user request into actionable component requirements that can drive architecture, API design, tests, and review.

## When to Apply

- The request is broad, ambiguous, or multi-step.
- Behaviour, accessibility, responsive, animation, or testing expectations need definition.
- A reusable component API may be introduced or changed.

## When Not to Apply

- The user requests a tiny mechanical edit with obvious scope.
- Existing tests or issue text already define the requirements fully.

## Inputs

Required:

- User request.
- Relevant existing UI behaviour.

Optional:

- Design references.
- Bug reports, logs, screenshots, or failing tests.
- Browser/device constraints.

## Outputs

- Goals and non-goals.
- User workflows.
- Acceptance criteria.
- Behaviour scenarios.
- Known edge cases.

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

- Identify user goals and target workflows.
- Define non-goals and constraints.
- Write acceptance criteria in user-observable terms.
- Identify edge cases and failure states.
- Define which behaviours need tests.
- Capture explicit device, input, accessibility, and reduced-motion expectations when relevant.

---

## Non-Responsibilities

- Choosing implementation files.
- Designing props or variants.
- Writing tests or code.

---

## Workflow

1. Restate the user goal in one sentence.
2. Identify the target user and workflow.
3. Separate required behaviour from nice-to-have behaviour.
4. Define acceptance criteria with observable outcomes.
5. List accessibility, responsive, interaction, data, and error scenarios.
6. Mark assumptions separately from confirmed requirements.
7. Mark anything unresolved and decide whether it blocks implementation.

---

## Decision Points

- If a requirement depends on current library behaviour, invoke `pulse-docs-research`.
- If acceptance criteria imply a reusable API, invoke `pulse-api-contract`.
- If meaningful behaviour exists, invoke `pulse-tdd-planning`.
- If verification requires real browser/device behaviour, invoke `pulse-browser-verification`.

### Failure and Escalation

- Stop condition: if the request is too ambiguous to define testable acceptance criteria, do
  not invent scope. Report the open questions.
- Reporting: list any requirement left unresolved and whether it blocks implementation.
- Escalate scope, priority, or product decisions to the user.
- Escalate uncertain library or framework behaviour to `pulse-docs-research`.

---

## Checklists

Pre-flight:

- Request and constraints are available.
- Existing context is not ignored.

Execution:

- Requirements are phrased as user outcomes.
- Non-goals are explicit.
- Edge cases are named.

Completion:

- Acceptance criteria are testable.
- Open questions are minimal and concrete.
- Next skill is clear.

---

## Documentation Discipline

Use the shared Pulse documentation-source rule.

Skill-specific application:

- Start from this skill's owning scope and local project conventions.
- Use Laravel Boost `search-docs` before code changes. Do not skip this step.
- Use `pulse-docs-research` when framework, library, hydration, testing, browser, or accessibility details affect implementation.

---

## Integration

Runs after `pulse-workflow-orchestrator` and before architecture, API, TDD, implementation, and review skills.
