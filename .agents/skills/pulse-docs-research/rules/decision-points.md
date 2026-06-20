# Decision Points

- If local conventions conflict with docs, prefer local conventions unless they are incorrect for current versions or cause accessibility, hydration, performance, or security risk.
- If docs are ambiguous, inspect local package usage or official examples.
- If no external docs are needed, document that local patterns or already-installed supporting skills were sufficient.

## Failure and Escalation

- Stop condition: if authoritative documentation cannot be found in Boost, local code,
  Context7, or official sources, do not invent API behaviour. Report the gap.
- Reporting: state which source answered the question and any unresolved version caveats.
- Return findings to the owning skill that raised the question.
- Escalate to the user when documentation conflicts with required scope or dependencies.
