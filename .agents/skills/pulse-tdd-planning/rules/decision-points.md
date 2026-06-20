# Decision Points

- Test interaction if a user can trigger it.
- Test accessibility when keyboard, focus, names, roles, or ARIA matter.
- Test responsive behaviour only when functionality changes.
- Do not test Tailwind classes, Motion config, private state, or Radix internals.
- Test visible integration outcomes for Radix or Motion components, not their internal implementation.

## Failure and Escalation

- Stop condition: if acceptance criteria or the public API contract are undefined, do not
  invent scenarios. Request them.
- Reporting: list any behaviour that cannot be expressed as an observable scenario.
- Escalate uncertain Testing Library or accessibility query expectations to `pulse-docs-research`.
- Escalate to the user when behaviour scope or acceptance criteria are ambiguous.
- Escalate missing API or accessibility detail to `pulse-api-contract` or `pulse-accessibility-wcag`, and hand the plan to `pulse-behavior-testing`.
