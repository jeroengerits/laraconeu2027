# Responsibilities

- Prefer Radix primitives for complex accessible interactions.
- Preserve Radix focus, keyboard, ARIA, disabled, and portal behaviour.
- Design compound parts and slots.
- Style public data attributes, not private DOM structure.
- Document controlled/uncontrolled usage when exposed.
- Ensure custom components used with `asChild` spread props and accept/pass refs so Radix behaviour and accessibility remain intact; use `forwardRef` only when a library contract still requires it.
