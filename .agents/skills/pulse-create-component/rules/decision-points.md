# Decision Points

This skill owns the intake mode decision only. Skill selection is delegated to
`pulse-workflow-orchestrator`, which routes deterministically from
[workflow-routing.md](../../pulse-workflow-orchestrator/references/workflow-routing.md).

- If the user says "plan", "suggest", "design", "ask first", or "before
  coding", use plan-first mode.
- If the user says "build", "create", "implement", or "fix" and enough
  information exists, proceed to handoff without unnecessary delay.
- When required brief fields are missing, ask the smallest grouped set of
  intake questions before handing off.
- Capture obvious routing signals from the brief (Inertia, Radix, Motion,
  media, performance, tests) and pass them to the orchestrator; do not
  enumerate the skill list yourself.

## Failure and Escalation

- Stop condition: do not hand off an incomplete brief; if required fields stay
  unanswered after one focused round of questions, report the blocking gaps.
- Reporting: state which brief fields are still missing and what they block.
- Escalate scope, dependency, or "should this even be a component" decisions to
  the user before handoff.
- Escalate uncertain framework or library feasibility to `pulse-docs-research`
  via the orchestrator.
