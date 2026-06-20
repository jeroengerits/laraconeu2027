# Decision Points

- Delegate each concern to its domain owner's Completion checklist; do not duplicate domain
  checks (see
  [review-aggregation.md](../../pulse-workflow-orchestrator/references/review-aggregation.md)).
- Fix blocking issues before final response.
- Report skipped verification honestly.
- Recommend follow-up only when it builds on the request.

## Failure and Escalation

- Stop condition: do not report completion while a Gate 2 item is unmet; route the unmet
  item back to its owning skill.
- Reporting: surface every failed, skipped, or unverifiable item with the owning skill named.
- Escalate unknown framework or library behaviour to `pulse-docs-research`.
- Escalate to the user when a fix requires a scope, dependency, or product decision, or when
  the change needs a large new refactor (which this skill does not perform).
