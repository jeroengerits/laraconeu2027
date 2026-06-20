# Workflow

Use the shared layout map to know where to look:
[pulse-workflow-orchestrator/references/project-structure.md](../../pulse-workflow-orchestrator/references/project-structure.md).

1. Search with `rg` and `rg --files`.
2. Inspect sibling files before editing.
3. Check `resources/js/components`, `resources/js/components/sections`, `resources/js/hooks`, `resources/js/lib`, `resources/js/pages`, `resources/js/providers`, and `resources/js/types`.
4. Check existing tests and stories if present.
5. Check imports, naming, class merge helpers, test utilities, and browser-only guards used by similar files.
6. Summarize reusable patterns and conflicts.
