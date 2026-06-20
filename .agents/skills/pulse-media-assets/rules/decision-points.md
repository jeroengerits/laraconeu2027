# Decision Points

- Eager-load only critical first-viewport media.
- Lazy-load carousel/gallery rows outside the viewport.
- Avoid loading full responsive image sets before needed.
- Use direct imports only for small, critical assets.
- Prefer an existing `ResponsiveImage` utility over hand-built `img` markup when it already encodes project sizing and lazy-loading conventions.

## Failure and Escalation

- Stop condition: if media cannot load without layout shift, excessive requests, or broken
  hydration, do not ship it. Report the constraint.
- Reporting: list any asset or build behaviour that could not be verified.
- Escalate uncertain Vite asset, `import.meta.glob`, or responsive image APIs to `pulse-docs-research`.
- Escalate to the user when reducing requests requires removing or replacing assets (a content or scope decision).
- Hand broader bundle or render performance to `pulse-performance-vercel` and alt-text semantics to `pulse-accessibility-wcag`.
