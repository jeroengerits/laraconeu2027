# Decision Points

- Extract a hook when behaviour is reused or presentation is obscured.
- Extract a helper when logic is pure and independently understandable.
- Keep code local when abstraction has one caller and no clarity gain.
- Use compound components when coordinated state or accessibility relationships span parts.
- Split components when it reduces render cost or clarifies ownership; do not split just to create more files.

## Failure and Escalation

- Stop condition: if boundaries cannot be settled without a missing reuse decision or
  convention, do not guess structure. Report the dependency.
- Reporting: state the chosen boundaries and any deferred structural decisions.
- Route public or reusable API decisions to `pulse-api-contract` and state, effects, or
  hydration concerns to `pulse-state-effects`.
- Route uncertain framework structure to `pulse-docs-research`.
- Escalate new base directories or dependency changes to the user.
