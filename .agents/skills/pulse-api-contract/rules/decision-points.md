# Decision Points

- Use `asChild` when Radix-style composition needs polymorphic rendering.
- Use compound parts when consumers need layout control.
- Keep variants finite and typed.
- Avoid broad escape hatches unless the project already uses them.
- Use controlled state only when consumers need to observe or own the state transition.

## Failure and Escalation

- Stop condition: if the required behaviour cannot be expressed without leaking internals
  or causing prop sprawl, do not ship a sprawling or unstable contract. Report the API tension.
- Reporting: list any prop, callback, or composition decision left unresolved because
  consumers or requirements are unknown.
- Escalate uncertain Radix, polymorphic, or third-party library API behaviour to `pulse-docs-research`.
- Escalate to the user when reuse scope, consumers, or a breaking API change require a scope or product decision.
- Hand state-machine and effect concerns to `pulse-state-effects` and behaviour scenarios to `pulse-tdd-planning`.
