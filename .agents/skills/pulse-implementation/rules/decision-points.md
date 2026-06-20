# Decision Points

- If implementation reveals a bigger boundary issue, pause and route back to architecture or API skill.
- If docs uncertainty appears, use docs research.
- If meaningful behaviour changes, ensure testing skills are used.
- Do not introduce dependency, asset-loading, or SSR boundary changes without explicit source support and verification.

## Failure and Escalation

- Stop condition: if implementation reveals a boundary, API, or dependency issue beyond the
  plan, stop and route back instead of silently expanding scope.
- Reporting: when blocked, report the files changed, the checks run or skipped, and the
  residual risks.
- Escalate uncertain Inertia, React, Motion, Radix, Tailwind, testing, or Vite APIs to
  `pulse-docs-research`.
- Escalate boundary or structure problems to `pulse-architecture-boundaries` and public API
  changes to `pulse-api-contract`.
- Escalate new dependencies, asset-loading, or SSR boundary changes to the user.
