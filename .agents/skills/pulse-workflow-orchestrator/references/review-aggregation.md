# Pulse Review Aggregation

`pulse-review-quality-gate` is an aggregator, not a second source of domain rules. It does
not restate accessibility, performance, API, or design checks. Instead it delegates each
Definition of Done item to the domain owner's Completion checklist. This keeps review DRY:
each concern is defined once, in the skill that owns it.

## Delegation map

For each changed concern, read the named skill's `rules/checklists.md` Completion section
and confirm those items.

| Review concern                          | Delegate to (Completion checklist)        |
| --------------------------------------- | ----------------------------------------- |
| Requirements coverage                   | `pulse-requirements-analysis`             |
| Reuse and architecture                  | `pulse-reuse-decision`, `pulse-architecture-boundaries` |
| Public API and prop contracts           | `pulse-api-contract`                      |
| State, effects, hydration               | `pulse-state-effects`                     |
| Inertia integration                     | `pulse-inertia-integration`               |
| Radix composition                       | `pulse-radix-composition`                 |
| Design system, tokens, responsive       | `pulse-tailwind-design-system`            |
| Accessibility                           | `pulse-accessibility-wcag`                |
| Motion and reduced motion               | `pulse-motion-interactions`               |
| Media and assets                        | `pulse-media-assets`                      |
| Performance, bundle, render cost        | `pulse-performance-vercel`                |
| Test coverage of behaviour              | `pulse-tdd-planning`, `pulse-behavior-testing` |
| Browser behaviour                       | `pulse-browser-verification`              |
| Documentation                           | `pulse-documentation-dx`                  |
| Refactor safety                         | `pulse-refactor-safety`                   |

## How the review gate runs

1. Determine which concerns the change touched (use the routing signals from
   `workflow-routing.md`).
2. For each touched concern, confirm the owning skill's Completion checklist items.
3. Confirm the structural items in `validation-gates.md` Gate 2 that are not owned by a
   single skill (for example "existing patterns reused where practical").
4. Report any failed, skipped, or unverifiable item with the owning skill named.

## Why delegation, not duplication

If review restated each domain's checks, those checks would drift from the owner skills.
Delegation means there is exactly one definition of "done" per concern, and the review gate
stays a thin, deterministic aggregator.
