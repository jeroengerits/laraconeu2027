# Workflow

1. Check whether a Radix primitive fits the behaviour.
2. Verify current Radix APIs with Context7 when uncertain.
3. Let Radix own behaviour and the app own styling.
4. Expose compound parts only when consumers need layout control.
5. Style `data-state`, `data-disabled`, `data-highlighted`, and similar public attributes.
6. Verify custom slot children spread props and accept/pass refs; use `forwardRef` only when a library contract still requires it.
7. Avoid targeting private DOM structure.
