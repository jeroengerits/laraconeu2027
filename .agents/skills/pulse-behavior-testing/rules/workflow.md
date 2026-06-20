# Workflow

1. Check existing test setup and conventions.
2. Use `screen` queries.
3. Prefer `getByRole`, `getByLabelText`, `getByText`, `getByAltText`, and other accessible queries.
4. Use `userEvent.setup()` for interactions.
5. Use `findBy*` for async appearance and `queryBy*` for absence.
6. Use `jest-dom` matchers such as `toBeVisible` and `toHaveAccessibleName` for user-observable state.
7. Assert visible behaviour and public callbacks.
8. Run the narrowest relevant test command.
