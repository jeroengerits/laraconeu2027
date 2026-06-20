# Pulse Docs Research

**Version 1.0.0**  
Pulse Component Workflow  
June 2026

> This compiled document is optimized for AI-assisted component work. It mirrors the `vercel-react-best-practices` shape: short entry point, metadata, expanded rule catalog, and deterministic validation gates.

---

## Abstract

Researches current documentation for Laravel React component work. Use when implementation depends on Inertia React, Wayfinder, React 19, Motion React, Radix UI, Tailwind CSS 4, Jest, React Testing Library, Vite, or other library APIs that may change.

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
| Name                   | `pulse-docs-research`         |
| Canonical architecture | `vercel-react-best-practices` |
| Primary entry point    | `SKILL.md`                    |
| Rule catalog           | `rules/`                      |
| Metadata               | `metadata.json`               |

## Purpose

Provide current, version-aware documentation context for component implementation and review.

## When to Apply

- Before making code changes in this project.
- API details are uncertain.
- The task touches Inertia, Wayfinder, React, Motion, Radix, Tailwind, Jest, React Testing Library, Vite, or lazy loading.
- Hydration, SSR, gestures, forms, or testing APIs are involved.

## When Not to Apply

- The task is purely explanatory and no code will change.

## Inputs

Required:

- Library or API question.
- Package or framework area.

Optional:

- Installed package versions.
- Error message or failing code.

## Outputs

- Documentation findings.
- Source of truth used.
- Version-specific caveats.
- Implementation guidance.

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

- Use Laravel Boost `search-docs` before code changes.
- Use local project code and installed supporting skills to understand existing conventions.
- Use `$context7` for non-Laravel library APIs.
- Use web search only when local code, installed skills, Boost, and Context7 cannot answer the question.
- Capture only documentation relevant to the current task.
- Distinguish source facts from local inference.

---

## Non-Responsibilities

- Replacing local code audit.
- Fetching broad unrelated docs.
- Making architecture decisions alone.

---

## Workflow

1. Use Laravel Boost `search-docs` before code changes, scoped to relevant package families when known.
2. Identify whether remaining questions are answered by local code, an installed skill, Laravel ecosystem docs, third-party frontend docs, or external web docs.
3. Inspect the relevant local sibling files or supporting skill when conventions matter.
4. For Laravel, Inertia Laravel, Inertia React, Wayfinder, Pest, and related packages, use Laravel Boost `search-docs` for focused follow-up queries.
5. For React, Motion, Radix, Tailwind, Jest, React Testing Library, `user-event`, `jest-dom`, Vite, and other frontend libraries, use `$context7`.
6. Use web search only as a fallback, and prefer official documentation or primary sources.
7. Keep findings scoped to the current decision.
8. Feed results into the owning skill.

---

## Decision Points

- If local conventions conflict with docs, prefer local conventions unless they are incorrect for current versions or cause accessibility, hydration, performance, or security risk.
- If docs are ambiguous, inspect local package usage or official examples.
- If no external docs are needed, document that local patterns or already-installed supporting skills were sufficient.

### Failure and Escalation

- Stop condition: if authoritative documentation cannot be found in Boost, local code,
  Context7, or official sources, do not invent API behaviour. Report the gap.
- Reporting: state which source answered the question and any unresolved version caveats.
- Return findings to the owning skill that raised the question.
- Escalate to the user when documentation conflicts with required scope or dependencies.

---

## Checklists

Pre-flight:

- API question is specific.
- Relevant package family is known.
- Boost docs have been searched before code changes.

Execution:

- Boost is used before code changes and for Laravel ecosystem docs.
- Context7 is used for non-Laravel frontend docs.
- Results are not over-quoted.

Completion:

- Findings are actionable.
- Source and version context are clear.
- Next implementation decision is unblocked.

---

## Documentation Discipline

Use the shared Pulse documentation-source rule in
[`../pulse-workflow-orchestrator/references/documentation-discipline.md`](../pulse-workflow-orchestrator/references/documentation-discipline.md).

---

## Integration

Commonly collaborates with all component skills, especially Inertia integration, Radix composition, Motion interactions, Tailwind design system, performance, and behaviour testing.
