# Decision Points

- Use `getByTestId` only as a last resort.
- Mock requests at the boundary, preferably request-level fakes when configured.
- Do not assert exact wrapper counts or CSS classes.
- Do not re-test Radix internal behaviour; test the integration outcome.
- Prefer `screen.getByRole` with accessible name before text, placeholder, or test id queries.

## Failure and Escalation

- Stop condition: if React test tooling is not configured, do not add it unrequested. Report
  the gap.
- Reporting: list any scenario that cannot be tested through accessible, user-observable behaviour.
- Escalate uncertain Jest, React Testing Library, `user-event`, or `jest-dom` APIs to `jest-react-testing` or `pulse-docs-research`.
- Escalate to the user when test tooling must be added or a behaviour scenario is ambiguous.
- Return missing or unclear scenarios to `pulse-tdd-planning`.
