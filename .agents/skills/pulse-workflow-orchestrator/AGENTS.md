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

## Shared References

This skill owns the shared assets the whole Pulse ecosystem depends on:

- `references/skill-contract.md` - the `metadata.json` contract every skill must satisfy.
- `references/skill-structure.md` - the "well-formed skill" conformance standard.
- `references/validation-gates.md` - Definition of Ready and Definition of Done.
- `references/workflow-routing.md` - deterministic task-signal to skill-subset routing.
- `references/review-aggregation.md` - maps the review gate to domain Completion checklists.
- `references/documentation-discipline.md` - shared documentation-source rule.
- `references/question-discipline.md` - shared rule for how skills ask the user questions.

---

## Workflow

This skill is a lightweight, deterministic coordinator. It selects the minimal skill
subset, enforces the two gates, and hands off.

1. Classify the task: new component, refactor, bug fix, review, test, documentation, or optimization.
2. Read `references/workflow-routing.md` and select the minimal skill subset from the present signals (deterministic routing).
3. Run discovery first (Phase 1) unless the task is purely explanatory. Mandatory Laravel Boost `search-docs` before any code change.
4. Route each present design signal (Phase 2) to its single owner skill.
5. Enforce Gate 1 (Definition of Ready) from `references/validation-gates.md` before implementation.
6. Run test planning/authoring, implementation, then verification and documentation, each only when its signal is present.
7. Enforce Gate 2 (Definition of Done) via `pulse-review-quality-gate`, which delegates to domain Completion checklists per `references/review-aggregation.md`.
8. Keep the active path minimal; emit a progress report per [Progress Report](rules/progress-report.md) at each phase handoff for multi-skill runs.
9. Report skipped phases and checks explicitly.

---

## Decision Points

Routing is deterministic; `references/workflow-routing.md` is the source of truth.

- If requirements are ambiguous, use `pulse-requirements-analysis`.
- If local patterns are unknown, use `pulse-existing-audit`.
- If the component may already exist, use `pulse-reuse-decision`.
- If framework or library usage is uncertain, use `pulse-docs-research`.
- If API shape is public or reusable, use `pulse-api-contract`.
- If user-facing behaviour exists, use TDD and behaviour testing skills.
- If existing component behaviour must be preserved during change, use `pulse-refactor-safety`.

### Gates

- Before implementation, enforce Gate 1 (Definition of Ready).
- Before completion, enforce Gate 2 (Definition of Done) via `pulse-review-quality-gate`.

### Failure and Escalation

- Stop condition: do not advance past a gate with unmet items; route back to the owning skill.
- Reporting: report skipped phases, unmet gate items, and unverifiable checks.
- Escalate unknown framework or library behaviour to `pulse-docs-research`.
- Escalate scope, dependency, or product decisions to the user before proceeding.

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

Use the shared Pulse documentation-source rule in
`references/documentation-discipline.md`.

---

## Integration

Usually runs before all other Laravel React component skills. It commonly coordinates every skill in this set and finishes with `pulse-review-quality-gate`.
