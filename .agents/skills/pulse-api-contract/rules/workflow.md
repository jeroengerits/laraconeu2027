# Workflow

1. Start with required semantic props.
2. Prefer composition and `children` before many booleans.
3. Use discriminated unions for mutually exclusive states.
4. Use controlled/uncontrolled patterns only when both are needed.
5. Name callbacks by public event: `onValueChange`, `onOpenChange`, `onSelect`.
6. Define ref forwarding and prop spreading requirements for `asChild` or slot-based APIs.
7. Avoid leaking DOM structure, classes, timing constants, and private state.
8. Route behaviour scenarios to TDD planning.
