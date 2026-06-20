# Workflow

1. Audit existing media helpers and responsive image components.
2. Keep dimensions or aspect ratios stable to avoid layout shift.
3. Use lazy loading for below-the-fold media.
4. Use viewport-aware loading when only visible items should request images.
5. Use `import.meta.glob` lazily for large asset sets when practical.
6. Keep server and client `src`, `srcSet`, and `sizes` output deterministic during hydration.
7. Ensure meaningful images have useful `alt`; decorative images have empty alt.
8. Verify build when changing imports or Vite asset behaviour.
