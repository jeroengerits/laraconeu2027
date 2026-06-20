# Decision Points

- If a requirement depends on current library behaviour, invoke `pulse-docs-research`.
- If acceptance criteria imply a reusable API, invoke `pulse-api-contract`.
- If meaningful behaviour exists, invoke `pulse-tdd-planning`.
- If verification requires real browser/device behaviour, invoke `pulse-browser-verification`.

## Failure and Escalation

- Stop condition: if the request is too ambiguous to define testable acceptance criteria, do
  not invent scope. Report the open questions.
- Reporting: list any requirement left unresolved and whether it blocks implementation.
- Escalate scope, priority, or product decisions to the user.
- Escalate uncertain library or framework behaviour to `pulse-docs-research`.
