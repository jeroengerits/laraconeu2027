# Pulse TDD Planning

Plans behaviour-driven TDD for React components in this Laravel app. Use before implementing meaningful component behaviour to define user scenarios, accessibility expectations, public API contracts, red/green/refactor scope, and test coverage boundaries.

## Entry Point

Use `SKILL.md` as the agent entry point. Use `AGENTS.md` when a compiled, expanded view of the skill and all rule files is needed.

## Canonical Structure

This skill follows the local `vercel-react-best-practices` architecture:

- `SKILL.md` - loadable skill entry point with metadata and routing.
- `README.md` - human-readable overview.
- `AGENTS.md` - compiled agent guide with all rules expanded.
- `metadata.json` - machine-readable discovery and dependency metadata.
- `rules/` - focused rule files with workflow, decisions, checklists, and boundaries.

## Rule Catalog

| Rule                                                          | Purpose                                            |
| ------------------------------------------------------------- | -------------------------------------------------- |
| [Responsibilities](rules/responsibilities.md)                 | What this skill owns.                              |
| [Non-Responsibilities](rules/non-responsibilities.md)         | What this skill explicitly does not own.           |
| [Workflow](rules/workflow.md)                                 | Step-by-step execution process.                    |
| [Decision Points](rules/decision-points.md)                   | Branching rules and handoff decisions.             |
| [Checklists](rules/checklists.md)                             | Pre-flight, execution, and completion checks.      |
| [Documentation Discipline](rules/documentation-discipline.md) | Shared documentation-source rule for code changes. |

## Related Skills

- `pulse-docs-research`
- `pulse-workflow-orchestrator`

## Validation

- Read `SKILL.md` before using the skill.
- Read relevant files in `rules/` before acting.
- Use `rules/checklists.md` as the completion gate.
- Use `AGENTS.md` for audits, reviews, and long-form agent execution.
