# Progress Report

## Purpose

Own the visible status report for a coordinated Pulse run so the user always knows where the workflow is, what is done, what is next, and what was skipped. This replaces the need for a separate reporter skill.

## Guidance

- Emit a progress report whenever this skill coordinates more than one focused Pulse skill.
- Anchor the report to the recommended execution order in `../../PULSE-SKILL-DEPENDENCY-GRAPH.md`.
- Report only the skills selected for the current task, not all 23, unless the user asks for the full map.
- Use a compact, scannable format:
  - Current phase and active skill.
  - Completed skills with their key decision or output.
  - Next skill and why it is next.
  - Skipped skills with a one-line reason.
- Update the report at each phase handoff, not on every minor step.
- Keep the final report aligned with the completion checklist in `checklists.md`.
- Do not create a documentation file for the report; render it inline in the response.

## Suggested Format

```text
Pulse workflow: <task type>
- Done: <skill> — <decision/output>
- Active: <skill> — <current focus>
- Next: <skill> — <reason>
- Skipped: <skill> — <reason>
```

## Validation

- The report reflects the actual selected skills for this task.
- Each completed skill lists a concrete decision or output.
- Skipped skills include an explicit reason.
- The report is rendered inline, not written to a new file.
