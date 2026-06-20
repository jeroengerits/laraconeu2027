# Rule Title

Shared template for adding a new rule file to any `pulse-*` skill. Copy this into the
skill's `rules/` folder and rename it. This is the single source of truth; skills do not
keep their own per-folder copy.

## Purpose

State what decision or behaviour this rule owns.

## Guidance

- Keep the rule scoped to this skill's responsibility.
- Prefer imperative, action-oriented instructions.
- Link to related rules instead of duplicating shared guidance.
- Route cross-cutting concerns to their owning Pulse skill.

## Validation

- The rule has a clear owner.
- The rule does not duplicate another skill's responsibility.
- The rule can be checked by an agent during implementation or review.
