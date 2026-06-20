# Pulse Skill Dependency Graph

Generated from `SKILL.md`, rule files, and integration sections.

## Recommended Execution Order

1. `pulse-create-component`
2. `pulse-workflow-orchestrator`
3. `pulse-requirements-analysis`
4. `pulse-existing-audit`
5. `pulse-reuse-decision`
6. `pulse-docs-research`
7. `pulse-architecture-boundaries`
8. `pulse-api-contract`
9. `pulse-state-effects`
10. `pulse-inertia-integration`
11. `pulse-radix-composition`
12. `pulse-tailwind-design-system`
13. `pulse-accessibility-wcag`
14. `pulse-motion-interactions`
15. `pulse-media-assets`
16. `pulse-performance-vercel`
17. `pulse-tdd-planning`
18. `pulse-behavior-testing`
19. `pulse-implementation`
20. `pulse-browser-verification`
21. `pulse-documentation-dx`
22. `pulse-review-quality-gate`
23. `pulse-refactor-safety`

## Declared Cross-Skill References

- `pulse-accessibility-wcag` -> `pulse-docs-research`, `pulse-workflow-orchestrator`
- `pulse-api-contract` -> `pulse-docs-research`, `pulse-workflow-orchestrator`
- `pulse-architecture-boundaries` -> `pulse-docs-research`, `pulse-workflow-orchestrator`
- `pulse-behavior-testing` -> `pulse-docs-research`, `pulse-workflow-orchestrator`
- `pulse-browser-verification` -> `pulse-docs-research`, `pulse-workflow-orchestrator`
- `pulse-create-component` -> `pulse-accessibility-wcag`, `pulse-api-contract`, `pulse-architecture-boundaries`, `pulse-behavior-testing`, `pulse-browser-verification`, `pulse-docs-research`, `pulse-documentation-dx`, `pulse-existing-audit`, `pulse-implementation`, `pulse-inertia-integration`, `pulse-media-assets`, `pulse-motion-interactions`, `pulse-performance-vercel`, `pulse-radix-composition`, `pulse-requirements-analysis`, `pulse-reuse-decision`, `pulse-review-quality-gate`, `pulse-state-effects`, `pulse-tailwind-design-system`, `pulse-tdd-planning`, `pulse-workflow-orchestrator`
- `pulse-docs-research` -> `pulse-workflow-orchestrator`
- `pulse-documentation-dx` -> `pulse-docs-research`, `pulse-workflow-orchestrator`
- `pulse-existing-audit` -> `pulse-api-contract`, `pulse-docs-research`, `pulse-reuse-decision`, `pulse-workflow-orchestrator`
- `pulse-implementation` -> `pulse-docs-research`, `pulse-workflow-orchestrator`
- `pulse-inertia-integration` -> `pulse-docs-research`, `pulse-workflow-orchestrator`
- `pulse-media-assets` -> `pulse-docs-research`, `pulse-workflow-orchestrator`
- `pulse-motion-interactions` -> `pulse-docs-research`, `pulse-workflow-orchestrator`
- `pulse-performance-vercel` -> `pulse-docs-research`, `pulse-workflow-orchestrator`
- `pulse-radix-composition` -> `pulse-docs-research`, `pulse-workflow-orchestrator`
- `pulse-refactor-safety` -> `pulse-api-contract`, `pulse-docs-research`, `pulse-workflow-orchestrator`
- `pulse-requirements-analysis` -> `pulse-api-contract`, `pulse-browser-verification`, `pulse-docs-research`, `pulse-tdd-planning`, `pulse-workflow-orchestrator`
- `pulse-reuse-decision` -> `pulse-api-contract`, `pulse-docs-research`, `pulse-workflow-orchestrator`
- `pulse-review-quality-gate` -> `pulse-docs-research`, `pulse-workflow-orchestrator`
- `pulse-state-effects` -> `pulse-docs-research`, `pulse-workflow-orchestrator`
- `pulse-tailwind-design-system` -> `pulse-docs-research`, `pulse-workflow-orchestrator`
- `pulse-tdd-planning` -> `pulse-docs-research`, `pulse-workflow-orchestrator`
- `pulse-workflow-orchestrator` -> `pulse-api-contract`, `pulse-docs-research`, `pulse-existing-audit`, `pulse-requirements-analysis`, `pulse-reuse-decision`, `pulse-review-quality-gate`

## Ownership Boundaries

- Discovery and orchestration: `pulse-create-component`, `pulse-workflow-orchestrator`.
- Requirements and audit: `pulse-requirements-analysis`, `pulse-existing-audit`, `pulse-reuse-decision`, `pulse-docs-research`.
- Design and architecture: `pulse-architecture-boundaries`, `pulse-api-contract`, `pulse-state-effects`, `pulse-inertia-integration`, `pulse-radix-composition`, `pulse-tailwind-design-system`, `pulse-accessibility-wcag`, `pulse-motion-interactions`, `pulse-media-assets`, `pulse-performance-vercel`.
- Testing and verification: `pulse-tdd-planning`, `pulse-behavior-testing`, `pulse-browser-verification`, `pulse-review-quality-gate`.
- Implementation and maintenance: `pulse-implementation`, `pulse-refactor-safety`, `pulse-documentation-dx`.
