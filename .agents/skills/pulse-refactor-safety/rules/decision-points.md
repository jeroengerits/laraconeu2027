# Decision Points

- Extract a helper only when it clarifies or is reused.
- Extract a hook when behaviour is complex or reused.
- Keep private components local unless reused.
- Add tests before risky refactors when missing coverage matters.
- Route public API changes back to `pulse-api-contract` before editing consumers.

## Failure and Escalation

- Stop condition: if a refactor cannot preserve behaviour or public API, stop and surface
  the required change instead of silently altering consumers.
- Reporting: report any unavoidable behaviour or API changes and their consumer impact.
- Route public API changes back to `pulse-api-contract` before editing consumers.
- Route uncertain framework or library behaviour to `pulse-docs-research`.
- Escalate broad architectural rewrites to `pulse-architecture-boundaries` or the user.
