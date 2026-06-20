# Decision Points

- Use Radix primitives for complex accessible behaviours when available.
- Use live regions for meaningful async status changes.
- Disable autoplay or motion when reduced motion is preferred.
- Do not hide important content from assistive tech to solve layout issues.
- Prefer role/name/state assertions over DOM structure assertions in tests.

## Failure and Escalation

- Stop condition: if accessible behaviour cannot be achieved with semantic HTML or an
  available primitive, do not ship inaccessible markup. Report the gap.
- Reporting: list any accessibility check that could not be verified with available tooling.
- Escalate uncertain ARIA, Radix, or assistive-technology behaviour to `pulse-docs-research`.
- Escalate to the user when an accessible alternative requires a design or scope change.
