# Decision Points

- Use Pest Browser first for browser-verifiable behaviour.
- Use manual/browser-log verification to supplement Pest Browser for native scrolling, gestures, rendering, hydration, and media loading that cannot be automated locally.
- If browser logs show unrelated old entries, ignore them.
- If a device class cannot be tested locally, report the gap and the expected manual check.

## Failure and Escalation

- Stop condition: if a device, input class, or behaviour cannot be verified locally, stop
  guessing and report the gap with the expected manual check.
- Reporting: summarize what was verified and what was not, including any console or
  hydration issues.
- Route uncertain browser, hydration, gesture, or testing APIs to `pulse-docs-research`.
- Return defects to `pulse-implementation` or `pulse-refactor-safety` for fixes.
- Hand verified results to `pulse-review-quality-gate`.
