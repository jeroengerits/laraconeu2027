# Decision Points

- Use refs for pointer positions, latest callbacks, frame IDs, scroll offsets, and timestamps.
- Use memoization only for expensive calculations or identity-sensitive children/effects.
- Use `startTransition` or `useDeferredValue` only for non-urgent or expensive updates.
- For hydration warnings, fix deterministic first render before suppressing warnings or moving logic client-only.
