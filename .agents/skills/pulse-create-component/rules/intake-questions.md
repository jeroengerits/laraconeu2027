# Intake Questions

Use these questions as a menu, not a script.

### Essential Questions

- What should the component be called, or what working name should be used?
- Where will it be used first?
- What should a user be able to do with it?
- Is this a reusable component, a page section, or a one-off feature component?
- Should the workflow stop for approval before implementation?

### Behaviour Questions

- What states are required: default, loading, empty, error, disabled, selected,
  expanded, active, or focused?
- What interactions matter: click, keyboard, hover, drag, swipe, scroll,
  search, selection, submission, or async loading?
- What callbacks or events should consumers receive?
- What should happen when data is missing or invalid?

### Data And Inertia Questions

- What data does the component receive?
- Does it read Inertia page props?
- Does it submit a form or use `useForm`, `<Form<T>>`, `useHttp`, or Wayfinder?
- Does it need deferred props, lazy loading, polling, infinite scroll, or
  `WhenVisible`?

### Design And Composition Questions

- Should it wrap a Radix primitive or follow a Radix-style compound API?
- Should consumers control layout through slots or compound parts?
- Which existing component should it visually match?
- Which variants and sizes are required?

### Accessibility Questions

- What keyboard interactions are expected?
- Where should focus move after opening, closing, selecting, or submitting?
- What accessible names, descriptions, errors, alerts, or live regions are
  needed?
- Does the interaction need a non-pointer alternative?

### Motion, Media, And Performance Questions

- Should the component animate, autoplay, drag, swipe, or react to scroll?
- Should animation stop or change during user interaction?
- Does it render images, video, or large asset sets?
- Does it need lazy loading, viewport loading, or bundle-sensitive imports?
- Are hydration warnings, request count, or first paint important?

### Testing And Verification Questions

- Which behaviours must be protected by tests?
- Should tests be written before implementation?
- Which browser inputs must be verified: mouse, keyboard, trackpad, touch, or
  reduced motion?
- Should usage documentation be produced?
