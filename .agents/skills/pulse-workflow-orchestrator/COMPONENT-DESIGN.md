# Component Development Workflow

This document is the orchestration hub for React component development in this
Laravel, Inertia React, Tailwind CSS, Radix-style, Motion React, and Jest Testing
Library application.

The detailed execution rules live in focused project skills under
`.agents/skills`. Use this document to choose the right skills, keep the
workflow consistent, and verify that component work moves from idea to shipped
behaviour without skipping important checks.

## Entry Point

Use `pulse-create-component` to start new component work. It reads this document,
asks the questions needed to gather a component brief, and then starts
`pulse-workflow-orchestrator` with the relevant focused and supporting skills.

Recommended prompt:

```text
Use `pulse-create-component`.

I want to create a React component for [component/use case].

Ask me the questions needed to gather a complete component brief. Then propose
the Pulse skill sequence, audit existing components, decide whether to reuse or
create, propose the API and architecture, define behaviour tests, and ask for
approval before implementation.
```

## Operating Model

Every meaningful component change should move through these phases:

1. Discovery
2. Requirements analysis
3. Existing component audit
4. Reuse decision
5. Documentation research
6. Architecture and boundaries
7. API contract
8. State and effects planning
9. Framework integration planning
10. Design-system planning
11. Accessibility planning
12. Motion and interaction planning
13. Media and asset planning
14. Performance planning
15. TDD planning
16. Behaviour testing
17. Implementation
18. Browser verification
19. Documentation
20. Review and refinement

For small changes, keep the workflow lightweight. The agent may handle several
phases as a compact internal checklist, but it should not skip discovery,
implementation discipline, or verification.

## Skill Architecture

Use these project skills for Laravel React component work.

| Skill                           | Responsibility                                                                                                         |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `pulse-create-component`        | Starts new component creation by gathering a component brief, selecting skills, and invoking the orchestrator.         |
| `pulse-workflow-orchestrator`   | Coordinates the full lifecycle and selects the next focused skill.                                                     |
| `pulse-requirements-analysis`   | Converts user requests into goals, non-goals, constraints, acceptance criteria, and behaviour scenarios.               |
| `pulse-existing-audit`          | Audits existing components, hooks, utilities, tests, pages, styles, and conventions before new work.                   |
| `pulse-reuse-decision`          | Decides whether to reuse, extend, refactor, or create a component.                                                     |
| `pulse-docs-research`           | Uses Laravel Boost `search-docs` and `$context7` to verify current framework and library APIs.                         |
| `pulse-architecture-boundaries` | Defines component type, file placement, ownership, hook extraction, and helper extraction.                             |
| `pulse-api-contract`            | Designs TypeScript props, callbacks, slots, compound parts, and controlled/uncontrolled contracts.                     |
| `pulse-state-effects`           | Plans state, effects, refs, memoization, subscriptions, cleanup, and hydration-safe rendering.                         |
| `pulse-inertia-integration`     | Applies Inertia React v3, Wayfinder, page props, forms, navigation, deferred data, and SSR boundaries.                 |
| `pulse-radix-composition`       | Applies Radix-inspired primitives, slots, `asChild`, compound components, portals, and state attributes.               |
| `pulse-tailwind-design-system`  | Applies Tailwind CSS 4 tokens, variants, spacing, typography, colour, dark mode, and responsive layout.                |
| `pulse-accessibility-wcag`      | Owns WCAG 2.2, semantic HTML, ARIA, keyboard, focus, screen reader, touch, and reduced-motion behaviour.               |
| `pulse-motion-interactions`     | Owns Motion React, gestures, micro-interactions, autoplay, reduced motion, and animation performance.                  |
| `pulse-media-assets`            | Owns responsive images, lazy media, `import.meta.glob`, alt text, request count, and asset loading.                    |
| `pulse-performance-vercel`      | Applies React/Vercel performance practices for hydration, render cost, lazy imports, bundles, waterfalls, and loading. |
| `pulse-tdd-planning`            | Defines behaviour-driven TDD scenarios, public API expectations, and test scope.                                       |
| `pulse-behavior-testing`        | Writes Jest, React Testing Library, `user-event`, and `jest-dom` tests for user-observable behaviour.                  |
| `pulse-implementation`          | Executes approved component plans with scoped React, TypeScript, Inertia, Tailwind, Radix, Motion, and test edits.     |
| `pulse-refactor-safety`         | Guides behaviour-preserving refactors, extraction, simplification, and API preservation.                               |
| `pulse-review-quality-gate`     | Reviews completed work against requirements, accessibility, performance, tests, docs, and maintainability.             |
| `pulse-documentation-dx`        | Documents reusable component purpose, usage, props, accessibility, behaviour, integration, and limitations.            |
| `pulse-browser-verification`    | Verifies browser behaviour across mouse, keyboard, trackpad, touch, reduced motion, light/dark modes, and viewports.   |

## Dependency Graph

```text
pulse-create-component
  -> pulse-workflow-orchestrator

pulse-workflow-orchestrator
  -> pulse-requirements-analysis
  -> pulse-existing-audit
  -> pulse-reuse-decision
  -> pulse-docs-research
  -> pulse-architecture-boundaries
      -> pulse-api-contract
      -> pulse-state-effects
      -> pulse-inertia-integration
      -> pulse-radix-composition
      -> pulse-tailwind-design-system
      -> pulse-accessibility-wcag
      -> pulse-motion-interactions
      -> pulse-media-assets
      -> pulse-performance-vercel
  -> [Gate 1: Definition of Ready]
  -> pulse-tdd-planning
      -> pulse-behavior-testing
  -> pulse-implementation
      -> pulse-refactor-safety   (when changing existing components without changing behaviour)
  -> pulse-browser-verification
  -> pulse-documentation-dx
  -> pulse-review-quality-gate   (enforces Gate 2: Definition of Done)
```

## Shared References And Routing

The orchestrator and review gate are powered by shared assets owned by
`references/`. These are the single source of truth; skills
reference them instead of duplicating the content.

- `references/workflow-routing.md` - deterministic task-signal to skill-subset routing matrix.
- `references/validation-gates.md` - Gate 1 (Definition of Ready) and Gate 2 (Definition of Done).
- `references/review-aggregation.md` - maps the review gate to each domain skill's Completion checklist.
- `references/skill-contract.md` - the `metadata.json` contract every skill satisfies.
- `references/skill-structure.md` - the "well-formed skill" conformance standard.
- `references/documentation-discipline.md` - shared documentation-source rule.
- `references/project-structure.md` - project folder layout, naming, and file-placement rules.

`pulse-create-component` gathers the brief and hands off. `pulse-workflow-orchestrator` is a
lightweight, deterministic coordinator: it selects the minimal skill subset from the routing
matrix, enforces both gates, and delegates review to domain owners. It does not implement
domain logic.

Skills can be used independently when the task is narrow. For example, use only
`pulse-behavior-testing` when adding focused component tests,
or only `pulse-performance-vercel` when diagnosing hydration
or bundle issues.

## Execution Order

Default end-to-end order:

1. `pulse-create-component`
2. `pulse-workflow-orchestrator`
3. `pulse-requirements-analysis`
4. `pulse-existing-audit`
5. `pulse-reuse-decision`
6. `pulse-docs-research`
7. `pulse-architecture-boundaries`
8. `pulse-api-contract`
9. `pulse-state-effects`
10. Domain-specific planning skills:
    `pulse-inertia-integration`,
    `pulse-radix-composition`,
    `pulse-tailwind-design-system`,
    `pulse-accessibility-wcag`,
    `pulse-motion-interactions`,
    `pulse-media-assets`, and
    `pulse-performance-vercel`.
11. `pulse-tdd-planning`
12. `pulse-behavior-testing`
13. Gate 1: Definition of Ready (enforced by the orchestrator).
14. `pulse-implementation` (use `pulse-refactor-safety` when changing existing
    components without changing behaviour).
15. `pulse-browser-verification`
16. `pulse-documentation-dx`
17. `pulse-review-quality-gate` (enforces Gate 2: Definition of Done).

Routing is deterministic: the orchestrator selects skills from
`references/workflow-routing.md`. Use the smallest subset that
covers the request. Do not run every skill for a minor local change.

## Documentation Research

Use Laravel Boost `search-docs` before making code changes. Do not skip this
step; it provides version-specific context for this project's installed
packages. Use additional sources only when the owning domain needs them.

- Use local project code and installed project skills to understand conventions
  before importing patterns from external docs.
- Use Laravel Boost `search-docs` first for Laravel, Inertia Laravel, Inertia
  React, Wayfinder, Pest, and Laravel ecosystem APIs.
- Use `$context7` for React 19, Motion React, Radix UI, Tailwind CSS 4, Jest,
  React Testing Library, `user-event`, `jest-dom`, Vite, and other non-Laravel
  frontend APIs after Boost has been checked.
- Use web search only when local code, installed skills, Laravel Boost, and
  `$context7` do not answer the question; prefer official documentation.
- Prefer local project conventions when they are compatible with current docs.
- Clearly distinguish documented facts from implementation inference.

## Skill Quality Maintenance

Use `$skill-reviewer` and `$skill-improver` when creating or changing project
skills.

- Keep new Pulse/orchestration skills single-purpose, under 500 lines, and named
  after their folder. Installed reference skills may be longer when they serve
  as detailed local documentation.
- Put operational Pulse rules in each skill's `rules/` folder, one Markdown
  file per rule. Keep `SKILL.md` as the trigger, purpose, inputs, outputs, and
  rules index.
- Do not delete auxiliary `README.md`, `EXAMPLES.md`, `references/`, or `rules/`
  files from installed reference skills solely to satisfy Pulse size rules.
- Make trigger conditions explicit in the frontmatter `description`.
- Keep workflow steps operational rather than philosophical.
- Include pre-flight, execution, and completion checklists.
- Reference supporting skills instead of duplicating their full instructions.
- Validate all referenced `pulse-*` skills exist before finalizing.

## Project-Specific Conflict Resolution

Use these choices when imported reference skills conflict with this app:

- `pulse-create-component` is the entry point for new component intake. It hands
  off to `pulse-workflow-orchestrator` after a usable brief exists.
- Boost `search-docs` is mandatory before code changes. Context7 and web search
  are follow-up sources according to the documentation research order above.
- React behaviour tests use Jest, React Testing Library, `user-event`, and
  `jest-dom`. Laravel/PHP, browser, smoke, and architecture tests use Pest.
- Browser verification should use Herd URLs from Laravel Boost and prefer Pest
  Browser for automatable browser behaviour. Do not start a separate dev server.
- Install or dependency-changing commands are examples only until the user
  explicitly approves changing dependencies.
- Prefer no-new-dependency alternatives when a reference skill suggests an
  uninstalled package. Ask before installing or adding packages.
- Expose Radix `asChild` only when composition or polymorphism requires it.
- Avoid `forwardRef` by default in React 19, but use it when a library contract
  requires a DOM ref, such as Motion `motion.create()` or Radix slot children.
- Motion owns interactive, gesture-driven, layout, and stateful animation.
  Tailwind/native CSS animation is acceptable for simple decorative or
  state-attribute entry/exit effects that do not need Motion.
- Use existing Tailwind tokens first. Create new `@theme` tokens only when reuse
  across components is likely; rare arbitrary values are acceptable when local
  and justified.
- Prevent hydration mismatches with deterministic initial render first.
  `suppressHydrationWarning` is a last resort for known, isolated differences.
- Treat Next.js, RSC, and Server Action guidance in Vercel reference skills as
  informational unless this Laravel Inertia app uses an equivalent pattern.
- Create new documentation files only when explicitly requested. For reusable
  component knowledge, prefer updating existing docs or adding concise inline
  notes unless the user asks for a new file.

## Definition Of Ready

This is Gate 1, enforced by `pulse-workflow-orchestrator` before implementation. The
operational gate definition lives in
`references/validation-gates.md`, which names the owning skill
for each item so a failed gate routes back deterministically.

Before implementation starts, the agent should know:

- User goal, non-goals, constraints, and target workflow.
- Existing components, hooks, utilities, tests, and design patterns checked.
- Reuse decision and intended component type.
- Public API shape or confirmation that no public API is changing.
- Accessibility, responsive, animation, media, and performance expectations.
- Behaviour scenarios and test scope when meaningful behaviour exists.
- Documentation sources checked for framework or library-specific APIs.
- Verification commands and browser checks needed.

## Definition Of Done

This is Gate 2, enforced by `pulse-review-quality-gate`, which delegates each item to the
domain owner's Completion checklist (see
`references/review-aggregation.md`). The operational gate
definition lives in `references/validation-gates.md`.

A component change is complete only when:

- Existing patterns were reused where practical.
- Props and public contracts are typed, descriptive, and minimal.
- Initial render is deterministic and hydration-safe.
- Accessibility behaviour is implemented and verified.
- Native browser scrolling and gestures are preserved.
- Responsive and touch behaviour hold across supported viewports.
- Motion respects reduced motion and does not fight native input.
- Media and asset loading are intentional.
- Performance and bundle impact were considered.
- Meaningful behaviour is covered by appropriate tests when tooling exists.
- Reusable components have documentation when explicitly requested or when an
  existing docs file should be updated.
- Relevant verification passed or skipped checks are explicitly reported.

## Verification Commands

Run the smallest reliable checks for the change.

| Change type                                  | Command                                                          |
| -------------------------------------------- | ---------------------------------------------------------------- |
| TypeScript or React changes                  | `npm run types:check`                                            |
| Refactors and component changes              | `npm run lint:check`                                             |
| Import, asset, lazy loading, or Vite changes | `npm run build`                                                  |
| React behaviour changes                      | `npm test` or the configured Jest command                        |
| Browser behaviour changes                    | Relevant Pest Browser test or browser verification command       |
| PHP changes                                  | Relevant Pest tests and `vendor/bin/pint --dirty --format agent` |
| API uncertainty                              | Laravel Boost `search-docs` or `$context7`                       |

If a command is not configured, report that explicitly.

For interaction-heavy components, prefer Pest Browser verification when browser
behaviour must be proven. Also report any manual/device checks that cannot be
automated:

- Desktop mouse.
- Keyboard only.
- MacBook trackpad.
- Touch/mobile.
- Light and dark modes.
- Reduced motion.
- Narrow and wide viewports.

Do not add temporary verification scripts when existing tests and project
commands cover the behaviour.
