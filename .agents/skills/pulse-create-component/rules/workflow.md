# Workflow

1. Read `pulse-workflow-orchestrator/COMPONENT-DESIGN.md`.
2. Determine whether the user supplied enough information for a component brief.
3. If the brief is incomplete, ask the smallest useful set of intake questions.
4. Convert answers into this component brief:

    ```text
    Component brief:
    - Working name:
    - First usage location:
    - Component type:
    - User workflow:
    - Required behaviour:
    - Data and integration:
    - Accessibility expectations:
    - Visual and responsive expectations:
    - Motion/media/performance expectations:
    - Testing expectations:
    - Documentation expectations:
    - Approval mode:
    ```

5. Do not select the full skill sequence here. Skill selection is the
   orchestrator's job; it selects the minimal subset deterministically from
   [workflow-routing.md](../../pulse-workflow-orchestrator/references/workflow-routing.md).
   Note any obvious signals from the brief (Inertia, Radix, Motion, media,
   performance, tests) so the orchestrator can route, but do not enumerate
   every skill.
6. Present the brief and a plan-first or implement-now recommendation.
7. If approval is required, ask for approval before implementation.
8. Hand off to `pulse-workflow-orchestrator` with the gathered brief when
   implementation is approved or clearly requested.
