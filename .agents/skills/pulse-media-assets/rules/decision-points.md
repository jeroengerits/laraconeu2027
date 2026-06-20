# Decision Points

- Eager-load only critical first-viewport media.
- Lazy-load carousel/gallery rows outside the viewport.
- Avoid loading full responsive image sets before needed.
- Use direct imports only for small, critical assets.
- Prefer an existing `ResponsiveImage` utility over hand-built `img` markup when it already encodes project sizing and lazy-loading conventions.
