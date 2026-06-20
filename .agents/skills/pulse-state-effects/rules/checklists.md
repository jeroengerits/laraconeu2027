# Checklists

Pre-flight:

- Behaviour requiring state is identified.
- SSR or hydration context is known.

Execution:

- Initial render is deterministic.
- Effects have cleanup.
- Derived state is not duplicated.

Completion:

- State shape is minimal.
- No browser-only branch breaks hydration.
- Hook extraction remains reusable and typed.
