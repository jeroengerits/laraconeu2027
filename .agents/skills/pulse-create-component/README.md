# Pulse Create Component

Starts an intake-first Pulse React component creation workflow in this Laravel Inertia app. Use whenever the user asks to create, build, add, scaffold, plan, or start a new React component or reusable page section and the agent needs to gather enough information before orchestration.

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
| [Intake Questions](rules/intake-questions.md)                 | Component intake question menu.                    |
| [Prompt Template](rules/prompt-template.md)                   | Starter prompt for users.                          |
| [Question Strategy](rules/question-strategy.md)               | Guidance for asking only necessary questions.      |

## Related Skills

- `context7`
- `inertia-react-development`
- `jest-react-testing`
- `motion-react`
- `pulse-accessibility-wcag`
- `pulse-api-contract`
- `pulse-architecture-boundaries`
- `pulse-behavior-testing`
- `pulse-browser-verification`
- `pulse-docs-research`
- `pulse-documentation-dx`
- `pulse-existing-audit`
- `pulse-implementation`
- `pulse-inertia-integration`
- `pulse-media-assets`
- `pulse-motion-interactions`
- `pulse-performance-vercel`
- `pulse-radix-composition`
- `pulse-requirements-analysis`
- `pulse-reuse-decision`
- `pulse-review-quality-gate`
- `pulse-state-effects`
- `pulse-tailwind-design-system`
- `pulse-tdd-planning`
- `pulse-workflow-orchestrator`
- `radix-ui-design-system`
- `tailwind-design-system`
- `vercel-react-best-practices`

## Validation

- Read `SKILL.md` before using the skill.
- Read relevant files in `rules/` before acting.
- Use `rules/checklists.md` as the completion gate.
- Use `AGENTS.md` for audits, reviews, and long-form agent execution.
