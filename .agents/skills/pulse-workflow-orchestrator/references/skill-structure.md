# Pulse Skill Structure Conformance

Shared "well-formed skill" standard for every `pulse-*` skill. This replaces the
per-skill `validation_criteria` that used to describe file structure. Structure
conformance is identical for all skills, so it is defined once here instead of being
copied into every `metadata.json`.

## Required files

Every `pulse-*` skill follows the local `vercel-react-best-practices` architecture:

```text
pulse-skill-name/
├── SKILL.md        # loadable entry point: trigger, purpose, inputs, outputs, rule index
├── README.md       # human-readable overview
├── AGENTS.md       # compiled agent guide with all rules expanded
├── metadata.json   # machine-readable skill contract (see skill-contract.md)
└── rules/
    ├── _sections.md              # rule index
    ├── responsibilities.md       # what the skill owns
    ├── non-responsibilities.md   # what the skill does not own
    ├── workflow.md               # step-by-step execution
    ├── decision-points.md        # branch logic + Failure and Escalation
    ├── checklists.md             # Pre-flight / Execution / Completion gates
    └── documentation-discipline.md  # pointer to shared documentation-source rule
```

The rule-file template is shared at `references/rule-template.md`; skills do not keep a
per-folder `_template.md`. Copy the shared template when adding a new rule file.

Skills may keep extra rule files when they own specialized guidance (for example
`intake-questions.md`, `question-strategy.md`, `prompt-template.md`).

## Conformance checks (apply to all skills)

- `SKILL.md` loads as the entry point and indexes the rule catalog.
- `README.md` summarizes usage for humans.
- `AGENTS.md` provides the compiled agent guide and includes the Skill Contract block.
- `metadata.json` parses as valid JSON and satisfies `skill-contract.md`.
- `rules/_sections.md` indexes every rule file that exists.
- Every rule file referenced in `_sections.md` and `SKILL.md` exists (no broken links).
- `decision-points.md` includes a Failure and Escalation section.
- `checklists.md` Completion section matches `metadata.json` `validation_criteria`.

## When this matters

`pulse-review-quality-gate` and `pulse-workflow-orchestrator` reference this file instead
of repeating the checklist. When adding a new skill, copy any standardized skill folder and
verify it against this list.
