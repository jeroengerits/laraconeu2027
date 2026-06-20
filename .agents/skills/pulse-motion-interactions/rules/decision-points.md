# Decision Points

- Use `LazyMotion` or `m` for bundle-sensitive surfaces when practical.
- Use `AnimatePresence` for exit animations and stable keys.
- Use `layout`, `layoutId`, `layoutScroll`, and `layoutRoot` intentionally.
- Use `requestAnimationFrame` for custom loops and clean up.
- Use direct horizontal drag or `deltaX` for horizontal movement; do not convert vertical scroll into horizontal motion unless explicitly requested.

## Failure and Escalation

- Stop condition: if an animation cannot respect reduced motion or would block native
  vertical scroll, do not ship the motion. Report the conflict.
- Reporting: list any Motion API or gesture behaviour that could not be verified.
- Escalate uncertain `motion/react` APIs or gesture behaviour to `pulse-docs-research`.
- Escalate to the user when motion intent requires a design or scope decision.
- Hand animation performance concerns to `pulse-performance-vercel` and accessible-alternative needs to `pulse-accessibility-wcag`.
