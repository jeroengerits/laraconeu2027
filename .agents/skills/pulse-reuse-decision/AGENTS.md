# Pulse Reuse Decision

**Version 1.0.0**  
Pulse Component Workflow  
June 2026

> This compiled document is optimized for AI-assisted component work. It mirrors the `vercel-react-best-practices` shape: short entry point, metadata, expanded rule catalog, and deterministic validation gates.

---

## Abstract

Decides whether to reuse, extend, refactor, or create a React component in this Laravel Inertia app. Use after auditing existing components and before introducing new abstractions or shared APIs.

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
| Name                   | `pulse-reuse-decision`        |
| Canonical architecture | `vercel-react-best-practices` |
| Primary entry point    | `SKILL.md`                    |
| Rule catalog           | `rules/`                      |
| Metadata               | `metadata.json`               |

## Purpose

Avoid speculative abstractions while still extracting reusable components when they reduce real complexity.

## When to Apply

- A similar component already exists.
- A new component might become shared.
- The requested change could fit an existing API.
- Refactoring may be safer than adding another component.

## When Not to Apply

- The user explicitly requests a one-off local page change.
- The audit found no related code and the scope is narrow.

## Inputs

Required:

- Existing audit findings.
- Requirements and acceptance criteria.

Optional:

- Known future reuse.
- Current consumers of the component.

## Outputs

- Reuse decision.
- Rationale.
- Affected consumers.
- Follow-up skill recommendations.

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

- Evaluate reuse candidates.
- Decide whether to keep behaviour local.
- Decide whether to extend, refactor, or create.
- Document tradeoffs and blast radius.
- Reject reuse based only on visual similarity when behaviour, accessibility, or API responsibility differs.

---

## Non-Responsibilities

- Designing detailed props.
- Implementing the decision.
- Running tests.

---

## Workflow

1. Compare requirements to existing component responsibilities.
2. Count known consumers and likely future consumers.
3. Check whether extension would distort the existing API.
4. Prefer local code when reuse is speculative.
5. Prefer refactor when the abstraction clarifies current complexity.
6. Check whether reuse would broaden public API, test scope, or accessibility responsibility.
7. Record the decision and next action.

---

## Decision Points

- Reuse when existing responsibility fits.
- Extend when the API change is finite and predictable.
- Refactor when duplication or complexity is already real.
- Create when existing components would be distorted.
- Defer abstraction when only future reuse is imagined.

### Failure and Escalation

- Stop condition: if reuse versus create cannot be decided from audit findings and
  requirements, do not guess an abstraction. Report the missing information.
- Reporting: state the decision, its tradeoffs, and the affected consumers.
- Escalate scope, dependency, or product tradeoff decisions to the user.
- Route shared or public API design to `pulse-api-contract`.
- Route uncertain library capability to `pulse-docs-research`.

---

## Checklists

Pre-flight:

- Existing audit is complete.
- Requirements are known.

Execution:

- Reuse candidates are compared by responsibility, not appearance alone.
- Consumer impact is considered.
- Speculative reuse is rejected.

Completion:

- Decision is explicit.
- Implementation path is clear.
- Shared API work is routed to `pulse-api-contract`.

---

## Documentation Discipline

Use the shared Pulse documentation-source rule in
`pulse-workflow-orchestrator/references/documentation-discipline.md`.

---

## Integration

Runs after existing audit and before architecture, API design, implementation, and refactor safety.
