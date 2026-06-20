# Pulse Workflow Orchestrator

**Version 1.0.0**  
Pulse Component Workflow  
June 2026

> This compiled document is optimized for AI-assisted component work. It mirrors the `vercel-react-best-practices` shape: short entry point, metadata, expanded rule catalog, and deterministic validation gates.

---

## Abstract

Orchestrates complete React component development in this Laravel Inertia app. Use whenever a user asks to create, refactor, review, test, document, or optimize a reusable React component or page section, especially when multiple component skills should be coordinated.

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
13. [Progress Report](#progress-report)
14. [Documentation Discipline](#documentation-discipline)

---

## Skill Contract

| Field                  | Value                         |
| ---------------------- | ----------------------------- |
| Name                   | `pulse-workflow-orchestrator` |
| Canonical architecture | `vercel-react-best-practices` |
| Primary entry point    | `SKILL.md`                    |
| Rule catalog           | `rules/`                      |
| Metadata               | `metadata.json`               |

## Purpose

Turn a component task into a clear sequence of specialized skill work. Keep the process lightweight for small changes and explicit for reusable or risky components.

## When to Apply

- A component task spans planning, architecture, implementation, testing, review, or documentation.
- Multiple focused skills apply and need ordering.
- The user asks for a reusable component workflow.

## When Not to Apply

- The request is a one-line factual answer.
- The task is backend-only Laravel work.
- A single narrow component skill fully covers the request.

## Inputs

Required:

- User request.
- Current codebase context.
- Project constraints from `AGENTS.md`.

Optional:

- Existing design references.
- Prior component decisions.
- Test failures or browser logs.

## Outputs

- Skill execution order.
- Component lifecycle checklist.
- Implementation sequence.
- Verification plan.
- Open questions only when needed.

## Rule Catalog

| Rule                                                          | Purpose                                            |
| ------------------------------------------------------------- | -------------------------------------------------- |
| [Responsibilities](rules/responsibilities.md)                 | What this skill owns.                              |
| [Non-Responsibilities](rules/non-responsibilities.md)         | What this skill explicitly does not own.           |
| [Workflow](rules/workflow.md)                                 | Step-by-step execution process.                    |
| [Decision Points](rules/decision-points.md)                   | Branching rules and handoff decisions.             |
| [Checklists](rules/checklists.md)                             | Pre-flight, execution, and completion checks.      |
| [Progress Report](rules/progress-report.md)                   | Inline run status: done, active, next, skipped.    |
| [Documentation Discipline](rules/documentation-discipline.md) | Shared documentation-source rule for code changes. |

---

## Responsibilities

- Own the end-to-end workflow.
- Select the next relevant skill.
- Preserve phase outputs and decisions.
- Keep scope tied to the user request.
- Ensure verification is planned before finalization.
- Report run progress and the selected-skill status to the user.

---

## Non-Responsibilities

- Writing implementation details owned by focused skills.
- Replacing Laravel Boost, Context7, or project-specific documentation lookup.
- Creating documentation files unless the user explicitly requested them.

---

## Workflow

1. Classify the task: new component, refactor, bug fix, review, test, documentation, or optimization.
2. Run discovery first unless the task is purely explanatory.
3. Decide whether requirements, reuse, architecture, API, accessibility, motion, performance, testing, implementation, review, or documentation skills are needed.
4. Keep the active path minimal for small changes.
5. Route uncertain APIs, browser behaviour, hydration, gestures, accessibility, and testing details through `pulse-docs-research`.
6. Before edits, confirm the planned files and behavioural surface.
7. When coordinating more than one focused skill, emit a progress report per [Progress Report](rules/progress-report.md) at each phase handoff.
8. After edits, run the smallest reliable verification commands.
9. Report skipped checks explicitly.

---

## Decision Points

- If requirements are ambiguous, use `pulse-requirements-analysis`.
- If local patterns are unknown, use `pulse-existing-audit`.
- If the component may already exist, use `pulse-reuse-decision`.
- If framework or library usage is uncertain, use `pulse-docs-research`.
- If API shape is public or reusable, use `pulse-api-contract`.
- If user-facing behaviour exists, use TDD and behaviour testing skills.

---

## Checklists

Pre-flight:

- User goal is understood.
- Existing constraints are known.
- Relevant skills are selected.

Execution:

- Discovery precedes implementation.
- Docs research is done for uncertain APIs.
- Architecture, API, accessibility, performance, and testing concerns are assigned.
- A progress report is emitted at each phase handoff for multi-skill runs.

Completion:

- Verification ran or was explicitly skipped.
- User-facing behaviour is summarized.
- A final progress report lists done, skipped, and follow-up skills.
- Follow-up risk is clear.

---

## Progress Report

Emit an inline status report whenever this skill coordinates more than one focused Pulse skill. Anchor it to the recommended execution order in `../../PULSE-SKILL-DEPENDENCY-GRAPH.md`, and report only the skills selected for the current task unless the user asks for the full map.

Update the report at each phase handoff, not on every minor step, and render it inline rather than in a new file.

Suggested format:

```text
Pulse workflow: <task type>
- Done: <skill> — <decision/output>
- Active: <skill> — <current focus>
- Next: <skill> — <reason>
- Skipped: <skill> — <reason>
```

---

## Documentation Discipline

Use the shared Pulse documentation-source rule.

Skill-specific application:

- Start from this skill's owning scope and local project conventions.
- Use Laravel Boost `search-docs` before code changes. Do not skip this step.
- Use `pulse-docs-research` when framework, library, hydration, testing, browser, or accessibility details affect implementation.

---

## Integration

Usually runs before all other Laravel React component skills. It commonly coordinates every skill in this set and finishes with `pulse-review-quality-gate`.
