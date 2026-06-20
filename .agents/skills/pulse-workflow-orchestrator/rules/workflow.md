# Workflow

This skill is a lightweight, deterministic coordinator. It does not implement domain
logic; it selects the minimal skill subset, enforces the two gates, and hands off.

1. Classify the task: new component, refactor, bug fix, review, test, documentation, or
   optimization.
2. Read [workflow-routing.md](../references/workflow-routing.md) and select the minimal
   skill subset from the routing signals present in the task. The same signals always
   select the same subset (deterministic routing).
3. Run discovery first (Phase 1) unless the task is purely explanatory. Mandatory Laravel
   Boost `search-docs` happens before any code change.
4. Route each present design signal (Phase 2) to its single owner skill. Do not run owners
   whose signal is absent.
5. Enforce Gate 1 (Definition of Ready) from
   [validation-gates.md](../references/validation-gates.md) before implementation. On a
   failed item, route back to the owning skill; on unknown APIs, route through
   `pulse-docs-research`; on scope or dependency decisions, escalate to the user.
6. Run test planning/authoring (Phase 3), then implementation (Phase 4), then verification
   and documentation (Phase 5), each only when its signal is present.
7. Enforce Gate 2 (Definition of Done) via `pulse-review-quality-gate`, which delegates to
   domain Completion checklists per
   [review-aggregation.md](../references/review-aggregation.md).
8. Keep the active path minimal for small changes. Report skipped phases explicitly; never
   silently drop a phase.
9. Emit a progress report at each phase handoff for multi-skill runs.
