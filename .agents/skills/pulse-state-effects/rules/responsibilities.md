# Responsibilities

- Decide state shape and ownership.
- Keep render deterministic.
- Design effect dependencies and cleanup.
- Use refs for transient values.
- Decide when memoization is meaningful.
- Use `useSyncExternalStore` for external browser stores when needed.
- Treat React `memo`, `useMemo`, and `useCallback` as targeted tools for real cost or identity boundaries.
