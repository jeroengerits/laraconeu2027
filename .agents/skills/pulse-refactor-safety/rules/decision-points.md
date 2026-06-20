# Decision Points

- Extract a helper only when it clarifies or is reused.
- Extract a hook when behaviour is complex or reused.
- Keep private components local unless reused.
- Add tests before risky refactors when missing coverage matters.
- Route public API changes back to `pulse-api-contract` before editing consumers.
