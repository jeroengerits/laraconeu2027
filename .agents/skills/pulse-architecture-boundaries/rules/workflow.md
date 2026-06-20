# Workflow

1. Classify the component as primitive, compound, feature, page section, or Inertia page.
2. Decide whether behaviour should stay local or move to a hook/helper.
3. Place shared hooks in `resources/js/hooks` and pure helpers in `resources/js/lib`.
4. Keep feature and section code close to usage unless reuse is real.
5. Avoid new base directories without approval.
6. Route Inertia, state/effects, media, motion, and performance concerns to their owning skills.
7. Route public API decisions to API contract skill.
