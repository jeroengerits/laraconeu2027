# Schedule Swiss Grid Redesign

## Summary

Redesign the schedule section, schedule component, and speakers section around an editorial Swiss grid direction. The approved direction combines poster-like section headers with structured, scan-friendly grids.

The redesign should keep the existing React component boundaries: `ScheduleSection` owns section composition and data lookup, while `Schedule` owns tab rendering, day parsing, and session row layout.

## Approved Direction

Use the more editorial hybrid direction:

- Large poster-style schedule heading with strong typographic scale.
- Prominent date/event metadata near the heading.
- Centered day tabs that remain simple and stateful.
- Timetable rows below, using explicit grid columns and strong horizontal rules.
- More whitespace and larger session titles than the current dense list.
- Keep enough structure that users can still scan time, title, and speaker quickly.
- Apply the same editorial Swiss visual language to `SpeakersSection` so adjacent sections feel related.

## Component Scope

### `ScheduleSection`

- Add an editorial wrapper around the schedule content.
- Pair the title area with supporting schedule metadata such as event dates and location.
- Keep using the existing `Section` component rather than creating a new section primitive.
- Preserve existing data flow from `days` and `speakers`.

### `Schedule`

- Keep the compound API: `Schedule`, `Schedule.List`, `Schedule.Day`, and `Schedule.Item`.
- Keep tab labels sourced from the schedule day `label` field.
- Keep day `date` available for future metadata, but do not use it as the tab label.
- Redesign the agenda list into a clearer timetable grid:
  - Time column.
  - Main content column.
  - Optional speaker/avatar block for sessions.
  - Kind-specific visual treatment for breaks, lunch, registration, sessions, and social items.
- Preserve current tab behavior, keyboard behavior, reduced-motion behavior, and scroll-to-top behavior on tab change.

### `SpeakersSection`

- Rework the existing centered speaker card grid into an editorial Swiss grid companion to the schedule section.
- Preserve existing data flow from the `speakers` prop.
- Keep `SpeakerCard` focused on one speaker and preserve avatar, name, and optional title rendering.
- Use stronger grid alignment, larger typography, and rules/metadata rather than decorative cards.
- Avoid changing speaker data shape or adding speaker interactions.

## Visual Details

- Use existing semantic tokens and pair utilities.
- Avoid new color tokens unless implementation proves an existing token cannot support the design.
- Favor `font-display` for short editorial headings and `font-mono` for time/date metadata.
- Use stronger dividing rules instead of card-heavy surfaces.
- Keep cards out of the schedule list; rows should feel like a printed program grid.
- Keep speakers visually related to the schedule section through matching typographic scale, grid rules, and metadata treatment.
- Maintain responsive behavior:
  - Mobile: stacked row content with time above or beside content as space allows.
  - Desktop: explicit grid columns with time and session content aligned.

## Accessibility

- Preserve Radix tab semantics through `AnimatedTabs`.
- Keep the tablist labelled with the existing `aria-label`.
- Ensure active tab foreground/background remains readable in light and dark mode.
- Preserve visible focus states inherited from `Button`.
- Avoid relying on color alone for session type; spacing, typography, and labels should carry hierarchy.
- Ensure speaker names and titles remain readable when the speaker grid becomes more editorial.

## Testing

Update or preserve focused tests for:

- Day tabs render from day `label`.
- Selecting a tab changes visible schedule content.
- Keyboard tab activation still works.
- Tab changes still scroll the schedule top into view.
- Session rows still render speaker names and avatars.
- Non-session rows still render without speaker attribution.
- Speakers still render names, optional titles, and avatar initials/images.

Run:

- `npm test -- Schedule.test.tsx AnimatedTabs.test.tsx`
- `npm run types:check`
- `npx eslint resources/js/components/Schedule.tsx resources/js/components/Schedule.test.tsx resources/js/components/sections/ScheduleSection.tsx resources/js/components/sections/SpeakersSection.tsx resources/js/components/AnimatedTabs.tsx`
- `npm run build`

## Out Of Scope

- Changing backend schedule data shape.
- Replacing `AnimatedTabs`.
- Adding new dependencies.
- Reworking unrelated sections.
- Reworking speaker data sources or speaker detail pages.
- Implementing ticket purchase content.
