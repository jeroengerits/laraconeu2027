# Decision Points

- Do not create a new docs file unless the user explicitly requested it.
- Prefer updating existing docs over adding scattered files.
- Keep comments in code rare and useful.
- Prefer short examples that show accessible names, controlled state, or Inertia integration over exhaustive prop tables.

## Failure and Escalation

- Stop condition: if documentation would require a new file the user did not request, stop
  and ask instead of creating scattered docs.
- Reporting: report any behaviour that could not be documented because the public API or
  source of truth was unclear.
- Route uncertain Inertia, React, Radix, Motion, Tailwind, or Testing Library behaviour to
  `pulse-docs-research`.
- Escalate to the user when a new documentation file or location is needed.
- Hand documented components to `pulse-review-quality-gate`.
