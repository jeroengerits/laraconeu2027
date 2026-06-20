# Workflow

1. Read `COMPONENT-DESIGN.md`.
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

5. Select the relevant skill sequence:
    - Always start with `pulse-workflow-orchestrator`.
    - Use `pulse-requirements-analysis` when acceptance criteria need definition.
    - Use `pulse-existing-audit` and `pulse-reuse-decision` before new code.
    - Use Laravel Boost `search-docs` before code changes.
    - Use `pulse-docs-research` for focused follow-up when API details,
      hydration behaviour, gestures, accessibility, lazy loading, testing, or
      browser behaviour may have changed.
    - Let `pulse-docs-research` choose Laravel Boost `search-docs`, Context7,
      local supporting skills, or web search based on the source order in
      `COMPONENT-DESIGN.md`.
    - Use focused skills for API, state, Inertia, Radix, Tailwind,
      accessibility, Motion, media, performance, TDD, implementation, browser
      verification, documentation, and review as needed.
6. Present the brief and proposed skill sequence.
7. If approval is required, ask for approval before implementation.
8. If implementation is approved or clearly requested, hand off to
   `pulse-workflow-orchestrator`.
