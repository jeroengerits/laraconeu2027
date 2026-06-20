# Workflow

This skill is an aggregator. It enforces Gate 2 (Definition of Done) by delegating each
concern to the domain owner's Completion checklist, instead of restating domain checks.

1. Identify which concerns the change touched, using the routing signals in
   [workflow-routing.md](../../pulse-workflow-orchestrator/references/workflow-routing.md).
2. For each touched concern, confirm the owning skill's `rules/checklists.md` Completion
   items, per
   [review-aggregation.md](../../pulse-workflow-orchestrator/references/review-aggregation.md).
   Do not restate those domain checks here.
3. Confirm the structural Gate 2 items in
   [validation-gates.md](../../pulse-workflow-orchestrator/references/validation-gates.md)
   that are not owned by a single skill (for example "existing patterns reused where
   practical").
4. Confirm non-obvious API choices were backed by local conventions, supporting skills,
   Laravel Boost, Context7, or official web docs.
5. Record findings by severity, naming the owning skill for each.
6. Report every failed, skipped, or unverifiable item; do not hide skipped checks.
