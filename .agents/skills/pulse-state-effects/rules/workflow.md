# Workflow

1. Derive state during render when possible.
2. Avoid mirroring props into state without a clear reason.
3. Keep render free of `Date.now()`, `Math.random()`, locale-only formatting, and browser-only branches.
4. Prefer event handlers over effects for interaction-specific logic.
5. Keep effect dependencies narrow and primitive where practical.
6. Clean up timers, animation frames, observers, requests, and listeners.
7. Use functional updates when callbacks only need previous state.
