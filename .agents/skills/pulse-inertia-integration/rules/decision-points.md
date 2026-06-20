# Decision Points

- Use `<Form<T>>` for regular server-backed forms.
- Use `useForm` for custom local control.
- Use `useHttp` for standalone HTTP requests that should not visit.
- Use `WhenVisible` or `InfiniteScroll` only when data behaviour matches.
- Use visible empty, loading, and error states for deferred or optional data.
