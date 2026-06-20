# File Placement

## Purpose

Own where new component code lives so file boundaries match this project's actual structure.

## Guidance

Use the shared layout as the source of truth:
[pulse-workflow-orchestrator/references/project-structure.md](../../pulse-workflow-orchestrator/references/project-structure.md).

Apply these placement decisions (frontend root is `resources/js/`, import alias `@/*`):

| What you are creating                       | Where it goes                       |
| ------------------------------------------- | ----------------------------------- |
| Reusable UI component (PascalCase `*.tsx`)  | `components/`                       |
| Page section (`*Section.tsx`)               | `components/sections/`             |
| Inertia page (lowercase)                    | `pages/`                          |
| Reusable hook (`useX.ts`)                   | `hooks/`                          |
| Pure utility (+ co-located `*.test.ts`)     | `lib/`                            |
| Context provider                            | `providers/`                     |
| Provider context object (`*Context.ts`)     | `providers/context/`             |
| Hook used by one provider                   | `providers/hooks/`              |
| Shared TypeScript type                      | `types/`                         |

- Match sibling file naming and import style before adding a file.
- Prefer `@/...` imports over deep relative paths.
- Do not create new base directories under `resources/js/` without user approval.
- Never hand-edit generated `actions/`, `routes/`, or `wayfinder/`; import their helpers instead.

## Validation

- The new file's directory matches the placement table.
- Naming matches siblings (PascalCase component, `useX` hook, lowercase page).
- No new base directory was introduced without approval.
