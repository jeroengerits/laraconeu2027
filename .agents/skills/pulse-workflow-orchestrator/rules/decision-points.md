# Decision Points

Routing is deterministic. Use the routing matrix in
[workflow-routing.md](../references/workflow-routing.md) as the source of truth for which
skill owns each signal. The bullets below summarize the most common branches.

- If requirements are ambiguous, use `pulse-requirements-analysis`.
- If local patterns are unknown, use `pulse-existing-audit`.
- If the component may already exist, use `pulse-reuse-decision`.
- If framework or library usage is uncertain, use `pulse-docs-research`.
- If API shape is public or reusable, use `pulse-api-contract`.
- If user-facing behaviour exists, use TDD and behaviour testing skills.
- If existing component behaviour must be preserved during change, use `pulse-refactor-safety`.

## Gates

- Before implementation, enforce Gate 1 (Definition of Ready) from
  [validation-gates.md](../references/validation-gates.md).
- Before completion, enforce Gate 2 (Definition of Done) via `pulse-review-quality-gate`.

## Failure and Escalation

- Stop condition: do not advance past a gate with unmet items; route back to the owning
  skill named in the gate.
- Reporting: report skipped phases, unmet gate items, and unverifiable checks in the final
  response.
- Escalate unknown framework or library behaviour to `pulse-docs-research`.
- Escalate scope, dependency, or product decisions to the user before proceeding.
