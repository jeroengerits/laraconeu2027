# Pulse Create Component

**Version 1.0.0**  
Pulse Component Workflow  
June 2026

> This compiled document is optimized for AI-assisted component work. It mirrors the `vercel-react-best-practices` shape: short entry point, metadata, expanded rule catalog, and deterministic validation gates.

---

## Abstract

Starts an intake-first Pulse React component creation workflow in this Laravel Inertia app. Use whenever the user asks to create, build, add, scaffold, plan, or start a new React component or reusable page section and the agent needs to gather enough information before orchestration.

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
14. [Intake Questions](#intake-questions)
15. [Prompt Template](#prompt-template)
16. [Question Strategy](#question-strategy)

---

## Skill Contract

| Field                  | Value                         |
| ---------------------- | ----------------------------- |
| Name                   | `pulse-create-component`      |
| Canonical architecture | `vercel-react-best-practices` |
| Primary entry point    | `SKILL.md`                    |
| Rule catalog           | `rules/`                      |
| Metadata               | `metadata.json`               |

## Purpose

Gather the minimum useful information required to create a high-quality React
component, then route the work through `COMPONENT-DESIGN.md`,
`pulse-workflow-orchestrator`, the focused `pulse-*` skills, and supporting
skills such as `context7`, `inertia-react-development`, `motion-react`,
`radix-ui-design-system`, `tailwind-design-system`,
`vercel-react-best-practices`, and `jest-react-testing`.

## When to Apply

- The user asks to create, build, add, scaffold, plan, or start a React
  component.
- The component idea is incomplete and needs requirements discovery.
- The component may become reusable or part of the design system.
- The task may need accessibility, responsive behaviour, Inertia integration,
  Motion, media, performance, tests, documentation, or browser verification.

## When Not to Apply

- The user asks only to review, test, document, or optimize an existing
  component. Use the narrower `pulse-*` skill for that task.
- The task is backend-only Laravel work.
- The request is a trivial copy, class, or styling edit to an existing
  component.
- The user explicitly provides a complete plan and asks to implement it
  immediately; start with `pulse-workflow-orchestrator` instead.

## Inputs

Required before orchestration:

- Component name or working name.
- Component purpose.
- Intended usage location.
- Primary user workflow.
- Expected behaviour.

Useful optional context:

- Existing component or design pattern to match.
- Reuse expectation.
- Props or data shape.
- Inertia route, form, or page prop needs.
- Radix primitive or accessibility expectations.
- Tailwind design-system constraints.
- Motion or gesture needs.
- Media or asset requirements.
- Performance, lazy loading, or hydration concerns.
- Test expectations.

## Outputs

- Component brief.
- Known requirements and non-goals.
- Missing information, if still blocking.
- Suggested Pulse and supporting skill sequence.
- Plan-first or implement-now recommendation.
- Approval request before implementation when appropriate.

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

---

## Responsibilities

- Read `COMPONENT-DESIGN.md` before planning.
- Start a structured intake conversation when required information is missing.
- Ask concise, grouped questions instead of a long interview.
- Build a component brief from user answers and known project context.
- Decide whether the task is ready for planning or implementation.
- Select the relevant Pulse and supporting skills.
- Ensure Laravel Boost `search-docs` is used before code changes.
- Select additional documentation sources only for APIs and behaviours that affect the planned component.
- Hand off to `pulse-workflow-orchestrator` with the gathered brief.
- Stop before implementation when user approval is needed.

---

## Non-Responsibilities

- Designing the full API without `pulse-api-contract`.
- Implementing before discovery and reuse checks.
- Replacing focused skills such as `pulse-accessibility-wcag`,
  `pulse-performance-vercel`, `pulse-behavior-testing`, or supporting skills
  like `context7`.
- Creating new documentation files unless the user explicitly requests them.

---

## Workflow

1. Read `COMPONENT-DESIGN.md`.
2. Determine whether the user supplied enough information for a component brief.
3. If the brief is incomplete, ask the smallest useful set of intake questions.
4. Convert answers into this component brief:

    ```text
    Component brief:
    - Working name:
    - First usage location:
    - Component type:
    - User workflow:
    - Required behaviour:
    - Data and integration:
    - Accessibility expectations:
    - Visual and responsive expectations:
    - Motion/media/performance expectations:
    - Testing expectations:
    - Documentation expectations:
    - Approval mode:
    ```

5. Select the relevant skill sequence:
    - Always start with `pulse-workflow-orchestrator`.
    - Use `pulse-requirements-analysis` when acceptance criteria need definition.
    - Use `pulse-existing-audit` and `pulse-reuse-decision` before new code.
    - Use Laravel Boost `search-docs` before code changes.
    - Use `pulse-docs-research` for focused follow-up when API details,
      hydration behaviour, gestures, accessibility, lazy loading, testing, or
      browser behaviour may have changed.
    - Let `pulse-docs-research` choose Laravel Boost `search-docs`, Context7,
      local supporting skills, or web search based on the source order in
      `COMPONENT-DESIGN.md`.
    - Use focused skills for API, state, Inertia, Radix, Tailwind,
      accessibility, Motion, media, performance, TDD, implementation, browser
      verification, documentation, and review as needed.
6. Present the brief and proposed skill sequence.
7. If approval is required, ask for approval before implementation.
8. If implementation is approved or clearly requested, hand off to
   `pulse-workflow-orchestrator`.

---

## Decision Points

- If the user says "plan", "suggest", "design", "ask first", or "before
  coding", use plan-first mode.
- If the user says "build", "create", "implement", or "fix" and enough
  information exists, proceed through orchestration without unnecessary delay.
- If the component has meaningful behaviour, include `pulse-tdd-planning` and
  `pulse-behavior-testing`.
- If the component touches Inertia page props, forms, links, HTTP requests, or
  routes, include `pulse-inertia-integration` and `inertia-react-development`.
- If the component uses complex accessible primitives, include
  `pulse-radix-composition`, `radix-ui-design-system`, and
  `pulse-accessibility-wcag`.
- If styling or variants matter, include `pulse-tailwind-design-system` and
  `tailwind-design-system`.
- If animation or gestures matter, include `pulse-motion-interactions` and
  `motion-react`.
- If media, request count, hydration, or bundle size matters, include
  `pulse-media-assets`, `pulse-performance-vercel`, and
  `vercel-react-best-practices`.
- If tests are needed, include `pulse-tdd-planning`,
  `pulse-behavior-testing`, and `jest-react-testing`.
- If current documentation is needed, include `pulse-docs-research` before the
  focused implementation skill that needs that documentation.

---

## Checklists

Pre-flight:

- `COMPONENT-DESIGN.md` is read.
- The user request is classified as new component work.
- Missing component brief fields are identified.

Execution:

- Questions are concise and grouped.
- No more than five questions are asked at once.
- Known context is reused instead of asking redundant questions.
- Discovery precedes new code.
- Supporting skills are included only when relevant.
- Boost docs research is included before code changes.
- Additional docs research is included only when it can change an implementation decision.

Completion:

- Component brief is explicit.
- Skill sequence is proposed.
- Approval mode is clear.
- Handoff to `pulse-workflow-orchestrator` is ready.

---

## Documentation Discipline

Use the shared Pulse documentation-source rule.

Skill-specific application:

- Start from this skill's owning scope and local project conventions.
- Use Laravel Boost `search-docs` before code changes. Do not skip this step.
- Use `pulse-docs-research` when framework, library, hydration, testing, browser, or accessibility details affect implementation.

---

## Intake Questions

Use these questions as a menu, not a script.

### Essential Questions

- What should the component be called, or what working name should be used?
- Where will it be used first?
- What should a user be able to do with it?
- Is this a reusable component, a page section, or a one-off feature component?
- Should the workflow stop for approval before implementation?

### Behaviour Questions

- What states are required: default, loading, empty, error, disabled, selected,
  expanded, active, or focused?
- What interactions matter: click, keyboard, hover, drag, swipe, scroll,
  search, selection, submission, or async loading?
- What callbacks or events should consumers receive?
- What should happen when data is missing or invalid?

### Data And Inertia Questions

- What data does the component receive?
- Does it read Inertia page props?
- Does it submit a form or use `useForm`, `<Form<T>>`, `useHttp`, or Wayfinder?
- Does it need deferred props, lazy loading, polling, infinite scroll, or
  `WhenVisible`?

### Design And Composition Questions

- Should it wrap a Radix primitive or follow a Radix-style compound API?
- Should consumers control layout through slots or compound parts?
- Which existing component should it visually match?
- Which variants and sizes are required?

### Accessibility Questions

- What keyboard interactions are expected?
- Where should focus move after opening, closing, selecting, or submitting?
- What accessible names, descriptions, errors, alerts, or live regions are
  needed?
- Does the interaction need a non-pointer alternative?

### Motion, Media, And Performance Questions

- Should the component animate, autoplay, drag, swipe, or react to scroll?
- Should animation stop or change during user interaction?
- Does it render images, video, or large asset sets?
- Does it need lazy loading, viewport loading, or bundle-sensitive imports?
- Are hydration warnings, request count, or first paint important?

### Testing And Verification Questions

- Which behaviours must be protected by tests?
- Should tests be written before implementation?
- Which browser inputs must be verified: mouse, keyboard, trackpad, touch, or
  reduced motion?
- Should usage documentation be produced?

---

## Prompt Template

When the user asks how to start, recommend this prompt:

```text
Use `pulse-create-component`.

I want to create a React component for [component/use case].

Ask me the questions needed to gather a complete component brief. Then propose
the Pulse skill sequence, audit existing components, decide whether to reuse or
create, propose the API and architecture, define behaviour tests, and ask for
approval before implementation.
```

---

## Question Strategy

Ask only what is needed for the next decision. Prefer one concise question when
the missing information is narrow. Ask grouped questions when the component is
new or ambiguous.

Use this order:

1. Purpose and placement.
2. Behaviour and user workflow.
3. Data, props, and Inertia integration.
4. Reuse, API, and composition.
5. Accessibility and keyboard expectations.
6. Responsive, visual, and design-system expectations.
7. Motion, media, and performance expectations.
8. Testing, documentation, and verification expectations.

Ask no more than five questions at once. If the user answers partially, continue
with the known information and ask only the remaining blockers.

---

## Integration

Runs before `pulse-workflow-orchestrator` for new component creation. Commonly
routes into `pulse-requirements-analysis`, `pulse-existing-audit`,
`pulse-reuse-decision`, `pulse-docs-research`,
`pulse-architecture-boundaries`, `pulse-api-contract`, `pulse-state-effects`,
`pulse-inertia-integration`, `pulse-radix-composition`,
`pulse-tailwind-design-system`, `pulse-accessibility-wcag`,
`pulse-motion-interactions`, `pulse-media-assets`,
`pulse-performance-vercel`, `pulse-tdd-planning`,
`pulse-behavior-testing`, `pulse-implementation`,
`pulse-browser-verification`, `pulse-documentation-dx`, and
`pulse-review-quality-gate`.
