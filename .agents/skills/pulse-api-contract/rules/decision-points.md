# Decision Points

- Use `asChild` when Radix-style composition needs polymorphic rendering.
- Use compound parts when consumers need layout control.
- Keep variants finite and typed.
- Avoid broad escape hatches unless the project already uses them.
- Use controlled state only when consumers need to observe or own the state transition.
