# Decision Points

- Use refs for pointer positions, latest callbacks, frame IDs, scroll offsets, and timestamps.
- Use memoization only for expensive calculations or identity-sensitive children/effects.
- Use `startTransition` or `useDeferredValue` only for non-urgent or expensive updates.
- For hydration warnings, fix deterministic first render before suppressing warnings or moving logic client-only.

## Failure and Escalation

- Stop condition: if a deterministic first render cannot be achieved or an effect cannot be
  made safe, do not suppress warnings or ship non-deterministic render. Report the hydration
  or effect risk.
- Reporting: list any state, effect, or cleanup decision left unresolved because behaviour or
  SSR context is unknown.
- Escalate uncertain React 19, hydration, or external-store API behaviour to `pulse-docs-research`.
- Hand public API and prop shape concerns to `pulse-api-contract` and broader render-cost review to `pulse-performance-vercel`.
- Escalate to the user when fixing state behaviour requires a scope or dependency change.
