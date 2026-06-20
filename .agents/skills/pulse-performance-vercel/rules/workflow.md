# Workflow

1. Check for render-time nondeterminism.
2. Hoist static arrays, objects, variants, and transitions.
3. Avoid expensive work in render paths.
4. Use `useMemo` for expensive calculations, not simple expressions.
5. Use `useCallback` only when identity matters.
6. Start independent async work early and await together when applicable.
7. Dynamically import heavy optional components.
8. Verify first render is deterministic before optimizing later renders.
9. Run frontend build when imports, assets, lazy loading, or Vite behaviour change.
