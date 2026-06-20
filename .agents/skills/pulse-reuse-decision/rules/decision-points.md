# Decision Points

- Reuse when existing responsibility fits.
- Extend when the API change is finite and predictable.
- Refactor when duplication or complexity is already real.
- Create when existing components would be distorted.
- Defer abstraction when only future reuse is imagined.

## Failure and Escalation

- Stop condition: if reuse versus create cannot be decided from audit findings and
  requirements, do not guess an abstraction. Report the missing information.
- Reporting: state the decision, its tradeoffs, and the affected consumers.
- Escalate scope, dependency, or product tradeoff decisions to the user.
- Route shared or public API design to `pulse-api-contract`.
- Route uncertain library capability to `pulse-docs-research`.
