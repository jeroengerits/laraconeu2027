# Decision Points

- Use native HTML when it fully supports the behaviour.
- Use Radix for complex keyboard, focus, portal, or ARIA behaviour.
- Use compound components when parts coordinate state or accessibility.
- Use private context when prop drilling obscures the API.
- Use controlled/uncontrolled props only when the public API needs consumer-owned state.

## Failure and Escalation

- Stop condition: if accessible interaction cannot be preserved with native HTML or an
  available Radix primitive, do not hand-roll complex keyboard, focus, or ARIA behaviour.
  Report the gap.
- Reporting: list any composition, slot, or portal decision left unresolved because the
  interaction or Radix API is unconfirmed.
- Escalate uncertain Radix primitive or `asChild` API behaviour to `pulse-docs-research` (Context7).
- Hand semantic, keyboard, and screen-reader requirements to `pulse-accessibility-wcag` and public prop shape to `pulse-api-contract`.
- Escalate to the user when the required interaction needs a new dependency or a scope change.
