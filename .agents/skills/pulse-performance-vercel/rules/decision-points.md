# Decision Points

- Prefer stable data snapshots over client-only first-render branches.
- Use `startTransition` for non-urgent updates.
- Use `useDeferredValue` for expensive render paths driven by fast input.
- Keep feature-specific dependencies out of shared primitives.
- Use memoization only when props are stable or calculations are expensive enough to justify it.

## Failure and Escalation

- Stop condition: if a performance fix would change behaviour or cannot be verified, do not
  apply a speculative optimization. Report it.
- Reporting: list any build, type, or hydration check that could not be run.
- Escalate uncertain React, hydration, or Vite performance APIs to `pulse-docs-research`.
- Escalate to the user when a performance fix requires a scope, dependency, or behaviour change.
- Hand media loading to `pulse-media-assets` and animation-loop cost to `pulse-motion-interactions`.
