# Decision Points

- Use `LazyMotion` or `m` for bundle-sensitive surfaces when practical.
- Use `AnimatePresence` for exit animations and stable keys.
- Use `layout`, `layoutId`, `layoutScroll`, and `layoutRoot` intentionally.
- Use `requestAnimationFrame` for custom loops and clean up.
- Use direct horizontal drag or `deltaX` for horizontal movement; do not convert vertical scroll into horizontal motion unless explicitly requested.
