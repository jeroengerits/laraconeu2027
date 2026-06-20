# Decision Points

- If a close match exists, use `pulse-reuse-decision`.
- If existing API is unclear, use `pulse-api-contract`.
- If current docs are needed, use `pulse-docs-research`.
- If local code conflicts with docs, surface the conflict instead of silently changing conventions.

## Failure and Escalation

- Stop condition: if local search cannot confirm whether similar code already exists, do not
  assume greenfield. Report the uncertainty.
- Reporting: list any area, directory, or convention that could not be searched or inspected.
- Escalate close matches to `pulse-reuse-decision` and unclear existing APIs to `pulse-api-contract`.
- Escalate uncertain library or version behaviour to `pulse-docs-research`.
- Surface conflicts between local code and docs to the user when a convention must change.
