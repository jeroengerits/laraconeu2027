# Workflow

1. Use Laravel Boost `search-docs` before Inertia-specific changes.
2. Use `inertia-react-development` for client-side page, form, and navigation patterns.
3. Use existing project imports and route helper conventions.
4. Use `<Link>` for internal navigation.
5. Use Wayfinder helpers from `@/actions` or `@/routes` when route integration is needed.
6. Choose typed form APIs based on interaction complexity.
7. Use deferred props only when first paint does not need the data.
8. Keep initial render stable for SSR/hydration.
