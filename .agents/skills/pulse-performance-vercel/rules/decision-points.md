# Decision Points

- Prefer stable data snapshots over client-only first-render branches.
- Use `startTransition` for non-urgent updates.
- Use `useDeferredValue` for expensive render paths driven by fast input.
- Keep feature-specific dependencies out of shared primitives.
- Use memoization only when props are stable or calculations are expensive enough to justify it.
