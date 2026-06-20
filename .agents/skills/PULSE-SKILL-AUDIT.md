# Pulse Skill Audit And Refactor Report

## Executive Summary

Standardized 23 `pulse-*` skills to follow the local `vercel-react-best-practices` reference architecture. Each Pulse skill now has a loadable `SKILL.md`, human `README.md`, compiled `AGENTS.md`, machine-readable `metadata.json`, indexed `rules/_sections.md`, and reusable `rules/_template.md`.

## Complete Audit

| Area                          | Before                             | After                                                  |
| ----------------------------- | ---------------------------------- | ------------------------------------------------------ |
| Entry point                   | `SKILL.md` existed for every skill | Preserved and normalized                               |
| Human overview                | Missing                            | Added `README.md` to every skill                       |
| Compiled agent guide          | Missing                            | Added `AGENTS.md` to every skill                       |
| Machine metadata              | Missing                            | Added `metadata.json` to every skill                   |
| Rule catalog                  | Present but unindexed              | Added `rules/_sections.md` and `rules/_template.md`    |
| Documentation-source guidance | Duplicated across skills           | Replaced with links to shared documentation discipline |
| Cross-skill references        | Embedded in prose                  | Extracted into metadata and dependency graph           |

## Refactoring Plan Implemented

1. Preserve all existing skill names and focused responsibilities.
2. Normalize `SKILL.md` sections to Purpose, When to Apply, When Not to Apply, Inputs, Outputs, Rule Catalog, Process, Decision Trees, Validation, Examples, Related Skills, Integration, How to Use, and Full Compiled Document.
3. Generate a compiled `AGENTS.md` per skill with all rules expanded.
4. Generate discovery metadata per skill.
5. Add rule indexes and rule templates.
6. Centralize repeated documentation-source rules in `pulse-workflow-orchestrator/references/documentation-discipline.md`.

## Standard Folder Structure

Each `pulse-*` skill now follows this shape:

```text
pulse-skill-name/
├── AGENTS.md
├── README.md
├── SKILL.md
├── metadata.json
└── rules/
    ├── _sections.md
    ├── _template.md
    ├── checklists.md
    ├── decision-points.md
    ├── documentation-discipline.md
    ├── non-responsibilities.md
    ├── responsibilities.md
    └── workflow.md
```

Skills with additional specialized guidance keep extra files in `rules/`, such as `intake-questions.md`, `question-strategy.md`, and `prompt-template.md`.

## Updated Skill Specifications

### `pulse-accessibility-wcag`

- Purpose: Ensure components are usable with keyboard, screen readers, touch, reduced motion, and native browser behaviours.
- Rule files: `rules/responsibilities.md`, `rules/non-responsibilities.md`, `rules/workflow.md`, `rules/decision-points.md`, `rules/checklists.md`, `rules/documentation-discipline.md`
- Related skills: `pulse-docs-research`, `pulse-workflow-orchestrator`

### `pulse-api-contract`

- Purpose: Prevent prop sprawl, implementation leaks, and unclear public behaviour.
- Rule files: `rules/responsibilities.md`, `rules/non-responsibilities.md`, `rules/workflow.md`, `rules/decision-points.md`, `rules/checklists.md`, `rules/documentation-discipline.md`
- Related skills: `pulse-docs-research`, `pulse-workflow-orchestrator`

### `pulse-architecture-boundaries`

- Purpose: Keep components coherent, reusable only when justified, and aligned with project structure.
- Rule files: `rules/responsibilities.md`, `rules/non-responsibilities.md`, `rules/workflow.md`, `rules/decision-points.md`, `rules/checklists.md`, `rules/documentation-discipline.md`
- Related skills: `pulse-docs-research`, `pulse-workflow-orchestrator`

### `pulse-behavior-testing`

- Purpose: Implement tests that protect visible behaviour, accessibility, and public API contracts while allowing internals to change.
- Rule files: `rules/responsibilities.md`, `rules/non-responsibilities.md`, `rules/workflow.md`, `rules/decision-points.md`, `rules/checklists.md`, `rules/documentation-discipline.md`
- Related skills: `jest-react-testing`, `pulse-docs-research`, `pulse-workflow-orchestrator`

### `pulse-browser-verification`

- Purpose: Validate real browser behaviour across input modes, viewports, and rendering states.
- Rule files: `rules/responsibilities.md`, `rules/non-responsibilities.md`, `rules/workflow.md`, `rules/decision-points.md`, `rules/checklists.md`, `rules/documentation-discipline.md`
- Related skills: `pulse-docs-research`, `pulse-workflow-orchestrator`

### `pulse-create-component`

- Purpose: Gather the minimum useful information required to create a high-quality React component, then route the work through `COMPONENT-DESIGN.md`, `pulse-workflow-orchestrator`, the focused `pulse-*` skills, and supporting skills such as `context7`, `inertia-react-development`, `motion-react`, `radix-ui-design-system`, `tailwind-design-system`, `vercel-react-best-practices`, and `jest-react-testing`.
- Rule files: `rules/responsibilities.md`, `rules/non-responsibilities.md`, `rules/workflow.md`, `rules/decision-points.md`, `rules/checklists.md`, `rules/documentation-discipline.md`, `rules/intake-questions.md`, `rules/prompt-template.md`, `rules/question-strategy.md`
- Related skills: `context7`, `inertia-react-development`, `jest-react-testing`, `motion-react`, `pulse-accessibility-wcag`, `pulse-api-contract`, `pulse-architecture-boundaries`, `pulse-behavior-testing`, `pulse-browser-verification`, `pulse-docs-research`, `pulse-documentation-dx`, `pulse-existing-audit`, `pulse-implementation`, `pulse-inertia-integration`, `pulse-media-assets`, `pulse-motion-interactions`, `pulse-performance-vercel`, `pulse-radix-composition`, `pulse-requirements-analysis`, `pulse-reuse-decision`, `pulse-review-quality-gate`, `pulse-state-effects`, `pulse-tailwind-design-system`, `pulse-tdd-planning`, `pulse-workflow-orchestrator`, `radix-ui-design-system`, `tailwind-design-system`, `vercel-react-best-practices`

### `pulse-docs-research`

- Purpose: Provide current, version-aware documentation context for component implementation and review.
- Rule files: `rules/responsibilities.md`, `rules/non-responsibilities.md`, `rules/workflow.md`, `rules/decision-points.md`, `rules/checklists.md`, `rules/documentation-discipline.md`
- Related skills: `context7`, `pulse-workflow-orchestrator`

### `pulse-documentation-dx`

- Purpose: Make component APIs and behaviour understandable for future maintainers and AI agents.
- Rule files: `rules/responsibilities.md`, `rules/non-responsibilities.md`, `rules/workflow.md`, `rules/decision-points.md`, `rules/checklists.md`, `rules/documentation-discipline.md`
- Related skills: `pulse-docs-research`, `pulse-workflow-orchestrator`

### `pulse-existing-audit`

- Purpose: Prevent duplicate components, inconsistent APIs, and design drift by checking local code and conventions first.
- Rule files: `rules/responsibilities.md`, `rules/non-responsibilities.md`, `rules/workflow.md`, `rules/decision-points.md`, `rules/checklists.md`, `rules/documentation-discipline.md`
- Related skills: `pulse-api-contract`, `pulse-docs-research`, `pulse-reuse-decision`, `pulse-workflow-orchestrator`

### `pulse-implementation`

- Purpose: Translate approved component decisions into code that follows React 19, TypeScript, Inertia, Tailwind, Radix, Motion, and local project conventions.
- Rule files: `rules/responsibilities.md`, `rules/non-responsibilities.md`, `rules/workflow.md`, `rules/decision-points.md`, `rules/checklists.md`, `rules/documentation-discipline.md`
- Related skills: `pulse-docs-research`, `pulse-workflow-orchestrator`

### `pulse-inertia-integration`

- Purpose: Keep page props, navigation, forms, HTTP requests, and SSR integration aligned with Inertia v3 and local project conventions.
- Rule files: `rules/responsibilities.md`, `rules/non-responsibilities.md`, `rules/workflow.md`, `rules/decision-points.md`, `rules/checklists.md`, `rules/documentation-discipline.md`
- Related skills: `inertia-react-development`, `pulse-docs-research`, `pulse-workflow-orchestrator`

### `pulse-media-assets`

- Purpose: Reduce pageload requests, avoid layout shift, and keep image/video rendering accessible and responsive.
- Rule files: `rules/responsibilities.md`, `rules/non-responsibilities.md`, `rules/workflow.md`, `rules/decision-points.md`, `rules/checklists.md`, `rules/documentation-discipline.md`
- Related skills: `pulse-docs-research`, `pulse-workflow-orchestrator`

### `pulse-motion-interactions`

- Purpose: Make animation clarify state or interaction while preserving accessibility, performance, and browser gestures.
- Rule files: `rules/responsibilities.md`, `rules/non-responsibilities.md`, `rules/workflow.md`, `rules/decision-points.md`, `rules/checklists.md`, `rules/documentation-discipline.md`
- Related skills: `pulse-docs-research`, `pulse-workflow-orchestrator`

### `pulse-performance-vercel`

- Purpose: Keep component rendering fast, hydration stable, bundles lean, and loading behaviour intentional.
- Rule files: `rules/responsibilities.md`, `rules/non-responsibilities.md`, `rules/workflow.md`, `rules/decision-points.md`, `rules/checklists.md`, `rules/documentation-discipline.md`
- Related skills: `pulse-docs-research`, `pulse-workflow-orchestrator`

### `pulse-radix-composition`

- Purpose: Avoid reimplementing complex accessibility behaviour and keep component APIs flexible without leaking DOM internals.
- Rule files: `rules/responsibilities.md`, `rules/non-responsibilities.md`, `rules/workflow.md`, `rules/decision-points.md`, `rules/checklists.md`, `rules/documentation-discipline.md`
- Related skills: `pulse-docs-research`, `pulse-workflow-orchestrator`

### `pulse-refactor-safety`

- Purpose: Keep refactors surgical, verifiable, and respectful of existing consumers.
- Rule files: `rules/responsibilities.md`, `rules/non-responsibilities.md`, `rules/workflow.md`, `rules/decision-points.md`, `rules/checklists.md`, `rules/documentation-discipline.md`
- Related skills: `pulse-api-contract`, `pulse-docs-research`, `pulse-workflow-orchestrator`

### `pulse-requirements-analysis`

- Purpose: Convert the user request into actionable component requirements that can drive architecture, API design, tests, and review.
- Rule files: `rules/responsibilities.md`, `rules/non-responsibilities.md`, `rules/workflow.md`, `rules/decision-points.md`, `rules/checklists.md`, `rules/documentation-discipline.md`
- Related skills: `pulse-api-contract`, `pulse-browser-verification`, `pulse-docs-research`, `pulse-tdd-planning`, `pulse-workflow-orchestrator`

### `pulse-reuse-decision`

- Purpose: Avoid speculative abstractions while still extracting reusable components when they reduce real complexity.
- Rule files: `rules/responsibilities.md`, `rules/non-responsibilities.md`, `rules/workflow.md`, `rules/decision-points.md`, `rules/checklists.md`, `rules/documentation-discipline.md`
- Related skills: `pulse-api-contract`, `pulse-docs-research`, `pulse-workflow-orchestrator`

### `pulse-review-quality-gate`

- Purpose: Catch regressions and missing verification before reporting completion.
- Rule files: `rules/responsibilities.md`, `rules/non-responsibilities.md`, `rules/workflow.md`, `rules/decision-points.md`, `rules/checklists.md`, `rules/documentation-discipline.md`
- Related skills: `pulse-docs-research`, `pulse-workflow-orchestrator`

### `pulse-state-effects`

- Purpose: Avoid derived state bugs, effect misuse, stale closures, hydration mismatches, and unnecessary renders.
- Rule files: `rules/responsibilities.md`, `rules/non-responsibilities.md`, `rules/workflow.md`, `rules/decision-points.md`, `rules/checklists.md`, `rules/documentation-discipline.md`
- Related skills: `pulse-docs-research`, `pulse-workflow-orchestrator`

### `pulse-tailwind-design-system`

- Purpose: Prevent one-off styling, token drift, inaccessible colour choices, and responsive layout instability.
- Rule files: `rules/responsibilities.md`, `rules/non-responsibilities.md`, `rules/workflow.md`, `rules/decision-points.md`, `rules/checklists.md`, `rules/documentation-discipline.md`
- Related skills: `pulse-docs-research`, `pulse-workflow-orchestrator`

### `pulse-tdd-planning`

- Purpose: Make tests protect user-observable behaviour and public contracts rather than implementation details.
- Rule files: `rules/responsibilities.md`, `rules/non-responsibilities.md`, `rules/workflow.md`, `rules/decision-points.md`, `rules/checklists.md`, `rules/documentation-discipline.md`
- Related skills: `pulse-docs-research`, `pulse-workflow-orchestrator`

### `pulse-workflow-orchestrator`

- Purpose: Turn a component task into a clear sequence of specialized skill work. Keep the process lightweight for small changes and explicit for reusable or risky components.
- Rule files: `rules/responsibilities.md`, `rules/non-responsibilities.md`, `rules/workflow.md`, `rules/decision-points.md`, `rules/checklists.md`, `rules/documentation-discipline.md`
- Related skills: `pulse-api-contract`, `pulse-docs-research`, `pulse-existing-audit`, `pulse-requirements-analysis`, `pulse-reuse-decision`, `pulse-review-quality-gate`

## Dependency Graph

See [PULSE-SKILL-DEPENDENCY-GRAPH.md](PULSE-SKILL-DEPENDENCY-GRAPH.md).

## Cross-Reference Update Plan Implemented

- Preserved all existing `pulse-*` skill names.
- Generated `metadata.json` related-skill arrays from actual skill references.
- Added compiled docs so references to `AGENTS.md` are valid for every Pulse skill.
- Added rule indexes so references to rule catalogs are deterministic.
- Centralized shared documentation-source rules to avoid drift.

## Duplicated Responsibilities Removed

- Repeated documentation-source guidance was moved to a shared orchestrator reference and replaced by per-skill pointers.
- Rule catalog explanations were standardized in generated `SKILL.md`, `README.md`, and `AGENTS.md` files.
- Validation language now consistently points to `rules/checklists.md` instead of duplicating bespoke completion language in each skill.

## Renamed, Merged, Split, Or Deprecated Skills

No skills were renamed, merged, split, or deprecated. The current Pulse skill set already has clear single-responsibility boundaries; standardization was enough.

## Recommendations For Future Skill Creation

- Start from any standardized `pulse-*` folder as the template.
- Keep `SKILL.md` below 500 lines and move detailed rules into `rules/`.
- Add one focused rule per file.
- Update `metadata.json` and `AGENTS.md` whenever rule files change.
- Prefer shared references for cross-cutting rules instead of copying the same guidance into every skill.
- Add eval prompts only when a skill's output can be objectively compared.
