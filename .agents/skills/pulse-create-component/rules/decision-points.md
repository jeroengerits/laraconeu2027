# Decision Points

- If the user says "plan", "suggest", "design", "ask first", or "before
  coding", use plan-first mode.
- If the user says "build", "create", "implement", or "fix" and enough
  information exists, proceed through orchestration without unnecessary delay.
- If the component has meaningful behaviour, include `pulse-tdd-planning` and
  `pulse-behavior-testing`.
- If the component touches Inertia page props, forms, links, HTTP requests, or
  routes, include `pulse-inertia-integration` and `inertia-react-development`.
- If the component uses complex accessible primitives, include
  `pulse-radix-composition`, `radix-ui-design-system`, and
  `pulse-accessibility-wcag`.
- If styling or variants matter, include `pulse-tailwind-design-system` and
  `tailwind-design-system`.
- If animation or gestures matter, include `pulse-motion-interactions` and
  `motion-react`.
- If media, request count, hydration, or bundle size matters, include
  `pulse-media-assets`, `pulse-performance-vercel`, and
  `vercel-react-best-practices`.
- If tests are needed, include `pulse-tdd-planning`,
  `pulse-behavior-testing`, and `jest-react-testing`.
- If current documentation is needed, include `pulse-docs-research` before the
  focused implementation skill that needs that documentation.
