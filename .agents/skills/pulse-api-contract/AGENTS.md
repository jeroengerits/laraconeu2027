# Pulse API Contract

**Version 1.0.0**  
Pulse Component Workflow  
June 2026

> This compiled document is optimized for AI-assisted component work. It mirrors the `vercel-react-best-practices` shape: short entry point, metadata, expanded rule catalog, and deterministic validation gates.

---

## Abstract

Designs TypeScript public APIs for React components in this Laravel Inertia app. Use when defining props, callbacks, controlled/uncontrolled state, slots, compound components, discriminated unions, variants, or public behaviour contracts.

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
| Name                   | `pulse-api-contract`          |
| Canonical architecture | `vercel-react-best-practices` |
| Primary entry point    | `SKILL.md`                    |
| Rule catalog           | `rules/`                      |
| Metadata               | `metadata.json`               |

## Purpose

Prevent prop sprawl, implementation leaks, and unclear public behaviour.

## When to Apply

- Creating reusable components.
- Changing shared component props.
- Adding variants or callbacks.
- Designing controlled/uncontrolled behaviour.
- Creating compound or slot-based APIs.

## When Not to Apply

- Component is purely local and has no public API beyond direct JSX.
- Existing API is unchanged.

## Inputs

Required:

- Requirements.
- Architecture boundary plan.

Optional:

- Existing consumers.
- Radix primitive APIs.
- Form or Inertia integration needs.

## Outputs

- Prop interface or type.
- Callback contract.
- Controlled/uncontrolled decision.
- Composition model.
- Public behaviour notes.

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

- Define TypeScript prop types.
- Design callback names and payloads.
- Choose controlled, uncontrolled, or hybrid state.
- Define slot, `children`, `asChild`, and compound component contracts.
- Document public behaviour expectations.
- Keep polymorphic and compound APIs narrow enough that accessibility and TypeScript inference remain understandable.

---

## Non-Responsibilities

- Internal implementation.
- Styling token decisions.
- Test code, though tests should validate the contract.

---

## Workflow

1. Start with required semantic props.
2. Prefer composition and `children` before many booleans.
3. Use discriminated unions for mutually exclusive states.
4. Use controlled/uncontrolled patterns only when both are needed.
5. Name callbacks by public event: `onValueChange`, `onOpenChange`, `onSelect`.
6. Define ref forwarding and prop spreading requirements for `asChild` or slot-based APIs.
7. Avoid leaking DOM structure, classes, timing constants, and private state.
8. Route behaviour scenarios to TDD planning.

---

## Decision Points

- Use `asChild` when Radix-style composition needs polymorphic rendering.
- Use compound parts when consumers need layout control.
- Keep variants finite and typed.
- Avoid broad escape hatches unless the project already uses them.
- Use controlled state only when consumers need to observe or own the state transition.

---

## Checklists

Pre-flight:

- Component responsibility is clear.
- Consumers and reuse scope are known.

Execution:

- Props are typed and descriptive.
- Defaults are intentional.
- Events are public and stable.

Completion:

- API supports required behaviour without exposing internals.
- Accessibility and testing needs are represented.
- Documentation notes are ready if reusable.

---

## Documentation Discipline

Use the shared Pulse documentation-source rule.

Skill-specific application:

- Start from this skill's owning scope and local project conventions.
- Use Laravel Boost `search-docs` before code changes. Do not skip this step.
- Use `pulse-docs-research` when framework, library, hydration, testing, browser, or accessibility details affect implementation.

---

## Integration

Runs after architecture boundaries and before implementation, TDD planning, behaviour testing, documentation, and review.
