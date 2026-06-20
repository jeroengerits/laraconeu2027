# Decision Points

- Use `getByTestId` only as a last resort.
- Mock requests at the boundary, preferably request-level fakes when configured.
- Do not assert exact wrapper counts or CSS classes.
- Do not re-test Radix internal behaviour; test the integration outcome.
- Prefer `screen.getByRole` with accessible name before text, placeholder, or test id queries.
