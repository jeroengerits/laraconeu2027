# Responsibilities

- Keep render pure and cheap.
- Avoid hydration mismatches.
- Choose memoization only when identity or cost matters.
- Recommend lazy imports for heavy optional features.
- Reduce asset and data waterfalls.
- Coordinate media loading with the media assets skill.
- Keep observers and timers cheap and idle when components are offscreen; animation-loop performance is owned by `pulse-motion-interactions`.
