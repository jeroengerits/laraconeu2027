# Pulse Skill Audit And Refactor Report

## Executive Summary

The 23 `pulse-*` skills now form a DRY, AI-executable React component factory built on the
local `vercel-react-best-practices` architecture. The first standardization pass gave every
skill a `SKILL.md`, `README.md`, `AGENTS.md`, `metadata.json`, and a `rules/` catalog. This
refactor adds the missing AI-execution layer: a machine-readable skill contract, shared
workflow assets, deterministic routing, wired validation gates, and a review gate that
delegates to domain owners instead of duplicating their checks.

### Strengths

- Clean single-responsibility boundaries across all 23 skills.
- Consistent file structure matching the canonical reference skill.
- Documentation-source guidance centralized in a shared reference.

### Weaknesses addressed by this refactor

- `success_criteria` / `validation_criteria` were byte-identical boilerplate that described
  file structure, not domain completion. Replaced with skill-specific contract fields.
- No machine-readable failure handling, escalation, or downstream routing. Added to every
  `metadata.json` and to each `rules/decision-points.md`.
- Routing was a static linear list. Replaced with a deterministic routing matrix and two
  enforced gates.
- The review gate restated domain checks. It now delegates to domain Completion checklists.

## Recommended Architecture

- `pulse-create-component` is intake-only: it builds a brief and hands off.
- `pulse-workflow-orchestrator` is a lightweight, deterministic coordinator: it selects the
  minimal skill subset from `references/workflow-routing.md`, enforces Gate 1 (Definition of
  Ready) and Gate 2 (Definition of Done) from `references/validation-gates.md`, and delegates
  review via `references/review-aggregation.md`.
- Domain owner skills own both planning and review for their domain.
- `pulse-review-quality-gate` is an aggregator that confirms each domain owner's Completion
  checklist rather than redefining the checks.

This is Option C from the audit brief (a dynamic decision engine) implemented as a
deterministic routing table plus gates, not a heavyweight monolithic orchestrator.

## Shared Assets (owned by pulse-workflow-orchestrator/references/)

| Asset                       | Purpose                                                        |
| --------------------------- | ------------------------------------------------------------- |
| `skill-contract.md`         | The `metadata.json` contract every skill must satisfy.        |
| `skill-structure.md`        | The "well-formed skill" conformance standard (was per-skill). |
| `validation-gates.md`       | Gate 1 (Definition of Ready) and Gate 2 (Definition of Done). |
| `workflow-routing.md`       | Deterministic task-signal to skill-subset routing matrix.     |
| `review-aggregation.md`     | Maps the review gate to domain Completion checklists.         |
| `documentation-discipline.md` | Shared documentation-source rule (pre-existing).            |

## Skill Contract (added to every metadata.json)

Each `metadata.json` now exposes: `single_responsibility`, `deterministic`, `triggers`,
structured `inputs` (`required`/`optional`), `outputs`, skill-specific `completion_criteria`
and `validation_criteria`, `failure_handling`, `escalation_path`, `upstream_skills`,
`downstream_skills`, plus the existing `responsibilities`, `non_responsibilities`,
`related_skills`, and `rule_files`. The old generic `success_criteria` and the file-structure
`validation_criteria` were removed; structure conformance now lives once in
`skill-structure.md`.

## Duplication Audit And Disposition

- Documentation-source guidance: already centralized; per-skill pointer files kept.
- `success_criteria` / `validation_criteria` boilerplate: removed; replaced with
  skill-specific contract fields. Structure conformance centralized in `skill-structure.md`.
- Review checks restated in the review gate: centralized via `review-aggregation.md`; the
  gate now delegates to domain Completion checklists.
- Definition of Ready / Definition of Done: single operational source in
  `validation-gates.md`, referenced by `pulse-workflow-orchestrator/COMPONENT-DESIGN.md`, the orchestrator, and the
  review gate.

## Reusable Skill Extraction Decision

No new `-review` skills were created. The suggested reusable skills already exist as domain
owners (`pulse-accessibility-wcag`, `pulse-performance-vercel`, `pulse-api-contract`,
`pulse-motion-interactions`, `pulse-tdd-planning`, `pulse-review-quality-gate`,
`pulse-documentation-dx`). Creating parallel `-review` skills would add duplication, not
remove it. The reusable extraction is therefore shared assets and a skill contract, not new
skills.

## Refactoring Plan (executed)

- Added: 0 new functional skills; 5 shared reference assets.
- Merged / Split / Removed / Renamed: none. Boundaries were already clean; names preserved.
- Standardized: every `metadata.json` to the skill contract; every `rules/decision-points.md`
  gained a Failure and Escalation section; every `AGENTS.md` regenerated to match.
- Restructured: orchestrator to deterministic coordinator; create-component to intake-only;
  review gate to delegating aggregator.

## Standard Folder Structure

```text
pulse-skill-name/
├── AGENTS.md
├── README.md
├── SKILL.md
├── metadata.json
└── rules/
    ├── _sections.md
    ├── responsibilities.md
    ├── non-responsibilities.md
    ├── workflow.md
    ├── decision-points.md      (now includes Failure and Escalation)
    ├── checklists.md
    └── documentation-discipline.md   (thin pointer to the shared rule)
```

The rule-file template is shared once at
`pulse-workflow-orchestrator/references/rule-template.md`; skills no longer keep a
per-folder `rules/_template.md`. The `documentation-discipline.md` rule in each skill is a
thin pointer to `pulse-workflow-orchestrator/references/documentation-discipline.md`.

`pulse-workflow-orchestrator` additionally owns `references/` (shared assets) and
`rules/progress-report.md`. `pulse-create-component` keeps `rules/intake-questions.md`,
`rules/prompt-template.md`, and `rules/question-strategy.md`.

## Dependency Graph

See [PULSE-SKILL-DEPENDENCY-GRAPH.md](PULSE-SKILL-DEPENDENCY-GRAPH.md).

## Recommendations For Future Skill Creation

- Copy any standardized `pulse-*` folder and validate it against `skill-structure.md`.
- Fill the full skill contract in `metadata.json` per `skill-contract.md`.
- Keep `SKILL.md` under 500 lines; put operational detail in `rules/`.
- Add the skill's signals to `workflow-routing.md` and its Completion checklist to
  `review-aggregation.md` so routing and review stay deterministic.
- Prefer shared references for cross-cutting rules instead of copying guidance per skill.
