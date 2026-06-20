# Pulse Validation Gates

Single source of truth for the two workflow gates. `../COMPONENT-DESIGN.md`,
`pulse-workflow-orchestrator`, and `pulse-review-quality-gate` reference this file
instead of restating the gates.

A gate is a checkpoint the orchestrator enforces before advancing. If a gate fails, the
orchestrator routes back to the skill that owns the missing item rather than continuing.

## Gate 1: Definition of Ready (before implementation)

Implementation must not start until all of the following are known. Each item names the
owning skill so a failed gate has a deterministic route back.

- User goal, non-goals, constraints, and target workflow. (`pulse-requirements-analysis`)
- Existing components, hooks, utilities, tests, and patterns checked. (`pulse-existing-audit`)
- Reuse decision and intended component type. (`pulse-reuse-decision`, `pulse-architecture-boundaries`)
- Public API shape, or confirmation no public API changes. (`pulse-api-contract`)
- Accessibility, responsive, animation, media, and performance expectations.
  (`pulse-accessibility-wcag`, `pulse-tailwind-design-system`, `pulse-motion-interactions`,
  `pulse-media-assets`, `pulse-performance-vercel`)
- Behaviour scenarios and test scope when meaningful behaviour exists. (`pulse-tdd-planning`)
- Documentation sources checked for framework or library APIs. (`pulse-docs-research`)
- Verification commands and browser checks identified. (`pulse-browser-verification`)

A gate item is satisfied when the owning skill has produced its `outputs` (per its
`metadata.json`) or has explicitly recorded that the concern does not apply.

## Gate 2: Definition of Done (before completion)

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
- Reusable components are documented when explicitly requested or when an existing docs
  file should be updated.
- Relevant verification passed, or skipped checks are explicitly reported.

Gate 2 is enforced by `pulse-review-quality-gate`, which delegates each item to the domain
owner's Completion checklist (see `review-aggregation.md`).

## Gate failure handling

- On a failed gate item, route to the owning skill listed above.
- If the owning skill cannot resolve it (missing API knowledge), route through
  `pulse-docs-research`.
- If resolution requires a scope, dependency, or product decision, escalate to the user.
- Always report skipped or unverifiable items in the final response.
