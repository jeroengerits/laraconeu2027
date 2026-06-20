# Pulse Skill Contract

Shared standard for every `pulse-*` skill. Each skill's `metadata.json` MUST expose
this contract so an AI agent can select, execute, validate, and hand off the skill
without reading prose. Keep prose in `SKILL.md` and `rules/`; keep the machine-readable
contract in `metadata.json`.

## Required `metadata.json` fields

| Field                 | Type              | Meaning                                                                 |
| --------------------- | ----------------- | ----------------------------------------------------------------------- |
| `name`                | string            | Skill identifier, equal to the folder name.                             |
| `description`         | string            | Trigger description, mirrors `SKILL.md` frontmatter `description`.       |
| `purpose`             | string            | One-sentence reason the skill exists.                                   |
| `scope`              | string            | Human-readable skill title.                                             |
| `single_responsibility` | string         | The one thing this skill owns. If two are needed, split the skill.      |
| `deterministic`       | boolean           | `true` when outputs are reproducible from inputs; `false` when the skill needs human judgement. |
| `triggers`            | string[]          | Task signals that select this skill (used by the routing matrix).       |
| `inputs`              | object            | `{ required: string[], optional: string[] }`.                           |
| `outputs`             | string[]          | Concrete artifacts the skill produces.                                  |
| `completion_criteria` | string[]          | Skill-specific, observable conditions that mean the work is done.       |
| `validation_criteria` | string[]          | Skill-specific checks that prove the outputs are correct.               |
| `failure_handling`    | string[]          | What to do when the skill cannot complete (stop conditions + reporting).|
| `escalation_path`     | string[]          | Which skill or human to escalate to, and when.                          |
| `upstream_skills`     | string[]          | Skills that typically run before this one.                              |
| `downstream_skills`   | string[]          | Skills that typically run after this one.                               |
| `related_skills`      | string[]          | Non-sequential collaborators and supporting skills.                     |
| `rule_files`          | string[]          | Rule files in `rules/`, in read order.                                  |
| `responsibilities`    | string[]          | Mirrors `rules/responsibilities.md`.                                    |
| `non_responsibilities`| string[]          | Mirrors `rules/non-responsibilities.md`.                                |

## Rules

- `completion_criteria` and `validation_criteria` are skill-specific. Do not reuse the
  generic "files exist" conformance text; that lives in `skill-structure.md` and applies
  to all skills automatically.
- `validation_criteria` should be derivable from the Completion section of the skill's
  `rules/checklists.md`. Keep the two in sync.
- `failure_handling` must define a stop condition (when not to keep guessing) and a
  reporting expectation (what the agent reports when blocked).
- `escalation_path` must name a concrete next actor: a `pulse-*` skill, `pulse-docs-research`
  for unknown APIs, or the user for scope or dependency decisions.
- `triggers` should be phrased as observable signals (for example "component has focus
  management", "API is public or reusable"), not restatements of the description.

## Determinism

Prefer deterministic skills. A skill is deterministic when, given the same inputs and the
same project state, it produces the same artifacts and the same routing decision. Skills
that require subjective judgement (visual design taste, product trade-offs) mark
`deterministic: false` and must define an `escalation_path` to the user.
