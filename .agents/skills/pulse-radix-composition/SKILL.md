---
name: pulse-radix-composition
description: Designs Radix-inspired React component composition in this Laravel app. Use when building dialogs, menus, popovers, tabs, accordions, selects, switches, compound components, slots, asChild APIs, portals, or controlled/uncontrolled primitives.
---

# Laravel React Component Radix Composition

Use Radix primitives and Radix-inspired patterns for accessible, composable components.

## Purpose

Avoid reimplementing complex accessibility behaviour and keep component APIs flexible without leaking DOM internals.

## When to Use

- Building complex interactive primitives.
- Wrapping or styling Radix UI primitives.
- Designing compound components.
- Using `asChild`, slots, portals, or state attributes.

## When NOT to Use

- Native HTML fully covers the interaction.
- Component is a simple presentational section.

## Inputs

Required:

- Interaction type.
- API contract or composition need.

Optional:

- Radix docs findings.
- Existing local wrapper patterns.
- Accessibility requirements.

## Outputs

- Primitive/composition choice.
- Compound part list.
- Slot and `asChild` guidance.
- Portal/layering notes.

## Rules

Read the relevant rule files in `rules/` before acting with this skill. Read all listed rule files when executing the full skill workflow; for code changes, always include `documentation-discipline.md`.

- [Responsibilities](rules/responsibilities.md)
- [Non-Responsibilities](rules/non-responsibilities.md)
- [Workflow](rules/workflow.md)
- [Decision Points](rules/decision-points.md)
- [Checklists](rules/checklists.md)
- [Documentation Discipline](rules/documentation-discipline.md)

## Integration

Runs with accessibility, API contract, design system, implementation, behaviour testing, and review skills.
