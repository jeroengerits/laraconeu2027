# Decision Points

- Extract a hook when behaviour is reused or presentation is obscured.
- Extract a helper when logic is pure and independently understandable.
- Keep code local when abstraction has one caller and no clarity gain.
- Use compound components when coordinated state or accessibility relationships span parts.
- Split components when it reduces render cost or clarifies ownership; do not split just to create more files.
