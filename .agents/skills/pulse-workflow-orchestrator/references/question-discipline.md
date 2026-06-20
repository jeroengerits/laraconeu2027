# Shared Question Discipline

Use this shared rule for **how** any Pulse skill asks the user a question. It governs the
manner and format of elicitation. It does not own **what** to ask — each skill owns its own
question content (for example `pulse-create-component/rules/intake-questions.md`).

## Decide Before Asking

- Prefer deciding over asking for reversible choices: naming, formatting, default values, and
  one of several equivalent approaches. Pick a reasonable option and note it.
- Only ask when genuinely blocked: the choice is the user's to make, is hard to reverse, or
  cannot be resolved from the request, the code, or local conventions.
- Never ask what the codebase, `AGENTS.md`, or existing conventions already answer. Check first.

## Ask Elegantly

- Use the structured question tool with selectable options instead of free-form prose lists.
- Offer 2+ concrete options per question; the user can always answer otherwise.
- When you recommend an option, make it the first option and suffix it with `(Recommended)`.
- Phrase each question to be self-contained and answerable without re-reading earlier context.
- Use plain language. Avoid jargon unless the user introduced it.
- Group related questions; ask no more than five at once.
- Batch all current blockers into one pass instead of drip-feeding one at a time.

## After Asking

- Continue with the information you have; ask only the remaining blockers.
- Treat a partial answer as permission to proceed on everything that is now unblocked.
- Record chosen defaults in the response so the user can correct them later.

## Validation

- The question could not be resolved from request, code, or conventions.
- Options are concrete and a recommended default is marked when one exists.
- No more than five questions were asked at once.
- Reversible choices were decided, not asked.
