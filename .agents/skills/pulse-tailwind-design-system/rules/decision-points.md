# Decision Points

- Use existing tokens before creating new ones.
- Use page sections as full-width bands with constrained inner content.
- Avoid nested cards unless the nested card is a real repeated item or modal surface.
- Avoid Tailwind transitions on properties Motion animates.
- Do not introduce new design tokens unless reuse across components is likely.

## Failure and Escalation

- Stop condition: if consistent styling cannot be achieved without inventing a parallel visual
  system or drifting from existing tokens, do not ship one-off styles. Report the token/design gap.
- Reporting: list any variant, token, or responsive decision left unresolved because conventions
  or breakpoints are unknown.
- Escalate uncertain Tailwind CSS 4 token or utility behaviour to `pulse-docs-research`.
- Escalate to the user when new design tokens, a design reference, or a visual-direction decision is required.
- Hand contrast and focus semantics to `pulse-accessibility-wcag` and animation styling to `pulse-motion-interactions`.
