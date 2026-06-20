# Decision Points

- Use `<Form<T>>` for regular server-backed forms.
- Use `useForm` for custom local control.
- Use `useHttp` for standalone HTTP requests that should not visit.
- Use `WhenVisible` or `InfiniteScroll` only when data behaviour matches.
- Use visible empty, loading, and error states for deferred or optional data.

## Failure and Escalation

- Stop condition: if the correct Inertia or Wayfinder API cannot be confirmed, do not guess
  at an integration that risks hydration mismatches or broken navigation. Report the uncertainty.
- Reporting: list any page-prop, form, or route decision left unresolved because controller,
  route, or prop context is unknown.
- Escalate uncertain Inertia v3 or Wayfinder API behaviour to `pulse-docs-research` and `inertia-react-development`.
- Escalate to the user when behaviour requires backend controller, route, or page-prop changes outside this skill's scope.
- Hand generic state mechanics to `pulse-state-effects` and public prop shape to `pulse-api-contract`.
