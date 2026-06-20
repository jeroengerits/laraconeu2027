# Schedule And Speakers Swiss Grid Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the schedule and speakers sections with the approved editorial Swiss grid direction while preserving existing data flow, tab behavior, accessibility, and tests.

**Architecture:** Keep the current component boundaries. `ScheduleSection` composes the editorial section shell and schedule data. `Schedule` keeps the compound API and owns tab/day/session rendering. `SpeakersSection` keeps its local `SpeakerCard` and receives the same `speakers` prop, but shifts from centered cards to an editorial grid companion.

**Tech Stack:** React 19, TypeScript, Inertia React v3, Tailwind CSS v4 semantic tokens, Motion React, Radix Tabs through `AnimatedTabs`, Jest + React Testing Library.

---

## Files

- Modify: `resources/js/components/sections/ScheduleSection.tsx`
  - Add the editorial schedule header wrapper, event metadata, and the schedule surface spacing.
- Modify: `resources/js/components/Schedule.tsx`
  - Convert the agenda list and rows into a Swiss timetable grid.
  - Preserve `Schedule.Day` parsing and tab labels from `label`.
- Modify: `resources/js/components/Schedule.test.tsx`
  - Preserve current behavior assertions and add class/structure assertions for the grid surface.
- Modify: `resources/js/components/sections/SpeakersSection.tsx`
  - Redesign speaker list into a companion editorial grid with rules and aligned speaker content.
- Modify: `resources/js/components/sections/SpeakersSection.test.tsx`
  - Preserve speaker content tests and add structure assertions.
- Read-only reference: `resources/js/components/AnimatedTabs.tsx`
  - Verify no tab API changes are needed.
- No new dependencies.

---

### Task 1: Lock Schedule Section Editorial Shell

**Files:**
- Modify: `resources/js/components/sections/ScheduleSection.tsx`
- Test: `resources/js/components/Schedule.test.tsx`

- [ ] **Step 1: Add a failing test for the editorial schedule region**

Add this assertion to `renders day tabs and the default day items` after the section id assertion or near the top of the test:

```tsx
expect(
    screen.getByText('Conference program / three days'),
).toBeInTheDocument();
expect(screen.getByText('Apr 05-07')).toBeInTheDocument();
```

If `Schedule.test.tsx` does not render `ScheduleSection`, do not force this into that file. Instead create a focused `resources/js/components/sections/ScheduleSection.test.tsx` with this full test:

```tsx
import { render, screen } from '@testing-library/react';

import { ScheduleSection } from '@/components/sections/ScheduleSection';
import type { ScheduleDay } from '@/types/schedule';
import type { Speaker } from '@/types/speaker';

const days: ScheduleDay[] = [
    {
        id: 'day-1',
        label: 'DAY 1',
        date: '5 APRIL',
        items: [
            {
                id: 'registration',
                kind: 'registration',
                start: '08:30',
                end: '09:15',
                title: 'Registration',
            },
        ],
    },
];

const speakers: Speaker[] = [];

describe('ScheduleSection', () => {
    it('renders editorial schedule metadata and schedule content', () => {
        render(<ScheduleSection days={days} speakers={speakers} />);

        expect(
            screen.getByRole('heading', { level: 2, name: 'Schedule' }),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Conference program / three days'),
        ).toBeInTheDocument();
        expect(screen.getByText('Apr 05-07')).toBeInTheDocument();
        expect(screen.getByText('Registration')).toBeInTheDocument();
    });
});
```

- [ ] **Step 2: Run the failing section test**

Run:

```bash
npm test -- ScheduleSection.test.tsx
```

Expected: FAIL because the metadata text is not rendered yet.

- [ ] **Step 3: Implement the editorial shell**

Update `resources/js/components/sections/ScheduleSection.tsx` so the return body follows this shape:

```tsx
return (
    <Section id="schedule" title="Schedule">
        <div className="mx-auto mt-10 grid w-full max-w-7xl gap-10">
            <div className="grid gap-6 border-t-4 border-canvas-foreground pt-5 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-start">
                <div className="grid gap-4">
                    <p className="font-mono text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                        Conference program / three days
                    </p>
                    <p className="max-w-[8ch] font-display text-6xl leading-[0.86] font-bold text-canvas-foreground uppercase sm:text-7xl lg:text-8xl">
                        Schedule
                    </p>
                </div>
                <div className="grid gap-4 border-t border-canvas-foreground/15 pt-4 text-left lg:border-t-0 lg:pt-0 lg:text-right">
                    <p className="font-display text-4xl leading-none font-bold text-canvas-foreground uppercase">
                        Apr 05-07
                    </p>
                    <p className="font-mono text-xs leading-6 tracking-[0.14em] text-muted-foreground uppercase">
                        Amsterdam
                        <br />
                        2027
                        <br />
                        Main venue
                    </p>
                </div>
            </div>

            <Schedule defaultValue={defaultDay}>
                <Schedule.List aria-label="Conference schedule">
                    {/* keep the existing days.map body unchanged */}
                </Schedule.List>
            </Schedule>
        </div>
    </Section>
);
```

Keep the existing `days.map` body exactly as it is today inside `Schedule.List`, including speaker lookup and speaker props.

- [ ] **Step 4: Run the section test**

Run:

```bash
npm test -- ScheduleSection.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

Run:

```bash
git add resources/js/components/sections/ScheduleSection.tsx resources/js/components/sections/ScheduleSection.test.tsx
git commit -m "Redesign schedule section header"
```

---

### Task 2: Convert Schedule Rows To Editorial Timetable Grid

**Files:**
- Modify: `resources/js/components/Schedule.tsx`
- Modify: `resources/js/components/Schedule.test.tsx`

- [ ] **Step 1: Add failing grid structure assertions**

In `Schedule.test.tsx`, add this test:

```tsx
it('renders schedule rows as an editorial timetable grid', () => {
    const { container } = renderSchedule();

    expect(container.querySelector('.schedule-agenda-grid')).toBeInTheDocument();
    expect(container.querySelectorAll('.schedule-agenda-row')).toHaveLength(3);
    expect(container.querySelector('.schedule-agenda-time')).toHaveTextContent(
        '08:30',
    );
    expect(
        container.querySelector('.schedule-agenda-content'),
    ).toHaveTextContent('Registration');
});
```

- [ ] **Step 2: Run the failing schedule test**

Run:

```bash
npm test -- Schedule.test.tsx
```

Expected: FAIL because the new schedule grid classes are not present yet.

- [ ] **Step 3: Update schedule class constants**

In `resources/js/components/Schedule.tsx`, replace the schedule constants with:

```tsx
const SCHEDULE_AGENDA_CLASS =
    'schedule-agenda-grid grid list-none border-t-2 border-canvas-foreground p-0';

const SCHEDULE_ITEM_BASE_CLASS =
    'schedule-agenda-row grid gap-3 border-b border-canvas-foreground/15 py-5 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-0 sm:py-0';

const SCHEDULE_ITEM_TIME_CLASS =
    'schedule-agenda-time self-start border-canvas-foreground/15 sm:border-r sm:px-0 sm:py-6';

const SCHEDULE_ITEM_CONTENT_CLASS =
    'schedule-agenda-content min-w-0 text-base leading-6 sm:px-6 sm:py-6 sm:text-lg sm:leading-7';

const SCHEDULE_TABS_HEADER_CLASS = 'items-center sm:justify-center';

const SCHEDULE_TABS_LIST_CLASS =
    'justify-center border-canvas-foreground/20 bg-canvas';

const SCHEDULE_TABS_TRIGGER_CLASS = 'normal-case';
```

Replace `scheduleItemKindClassNames` with:

```tsx
const scheduleItemKindClassNames: Record<ScheduleItemKind, string> = {
    break: 'bg-surface text-muted-foreground italic',
    lunch: 'bg-surface text-muted-foreground italic',
    registration: 'text-canvas-foreground',
    session: 'text-canvas-foreground',
    social: 'font-display text-xl font-bold tracking-wide text-accent uppercase sm:text-2xl',
};
```

- [ ] **Step 4: Simplify `scheduleTimeClassName`**

Replace `scheduleTimeClassName` with:

```tsx
function scheduleTimeClassName(): string {
    return SCHEDULE_ITEM_TIME_CLASS;
}
```

Then update the `TimeRange` call in `ScheduleItem`:

```tsx
<TimeRange
    className={scheduleTimeClassName()}
    end={end}
    start={start}
/>
```

- [ ] **Step 5: Make session content more editorial**

In `ScheduleSessionContent`, change:

```tsx
const sessionClassName = cn('flex items-start gap-3 sm:gap-4', className);
```

to:

```tsx
const sessionClassName = cn(
    'grid items-start gap-4 sm:grid-cols-[4rem_minmax(0,1fr)]',
    className,
);
```

Change the session title class in both reduced and motion branches from:

```tsx
text-base leading-snug font-bold text-canvas-foreground sm:text-lg
```

to:

```tsx
font-display text-2xl leading-none font-bold text-balance text-canvas-foreground sm:text-3xl lg:text-4xl
```

Keep the speaker metadata class as mono uppercase.

- [ ] **Step 6: Apply item kind classes at the row level**

In `ScheduleItem`, change:

```tsx
const itemClassName = cn(SCHEDULE_ITEM_BASE_CLASS, className);
```

to:

```tsx
const itemClassName = cn(
    SCHEDULE_ITEM_BASE_CLASS,
    scheduleItemKindClassNames[kind],
    className,
);
```

Change `contentClassNames` to remove `scheduleItemKindClassNames[kind]`:

```tsx
const contentClassNames = cn(SCHEDULE_ITEM_CONTENT_CLASS, contentClassName);
```

- [ ] **Step 7: Run focused schedule tests**

Run:

```bash
npm test -- Schedule.test.tsx AnimatedTabs.test.tsx
```

Expected: PASS.

- [ ] **Step 8: Commit**

Run:

```bash
git add resources/js/components/Schedule.tsx resources/js/components/Schedule.test.tsx
git commit -m "Redesign schedule timetable grid"
```

---

### Task 3: Redesign SpeakersSection As Companion Swiss Grid

**Files:**
- Modify: `resources/js/components/sections/SpeakersSection.tsx`
- Modify: `resources/js/components/sections/SpeakersSection.test.tsx`

- [ ] **Step 1: Add failing structure assertions**

Add this test to `SpeakersSection.test.tsx`:

```tsx
it('renders the speakers in an editorial Swiss grid', () => {
    const { container } = render(<SpeakersSection speakers={sampleSpeakers} />);

    expect(container.querySelector('.speakers-editorial-grid')).toBeInTheDocument();
    expect(container.querySelectorAll('.speaker-editorial-card')).toHaveLength(3);
    expect(container.querySelector('.speakers-editorial-meta')).toHaveTextContent(
        'Community voices',
    );
});
```

- [ ] **Step 2: Run the failing speakers test**

Run:

```bash
npm test -- SpeakersSection.test.tsx
```

Expected: FAIL because the editorial classes and metadata are not rendered yet.

- [ ] **Step 3: Update `SpeakerCard` layout**

In `SpeakersSection.tsx`, replace the `AnimatedListItem` className with:

```tsx
className="speaker-editorial-card grid gap-4 border-t border-canvas-foreground/15 pt-4 sm:grid-cols-[4rem_minmax(0,1fr)] sm:items-start"
```

Change the inner text wrapper from:

```tsx
<div className="grid gap-1">
```

to:

```tsx
<div className="grid min-w-0 gap-2">
```

Change the speaker name class from:

```tsx
text-base leading-snug font-bold text-canvas-foreground sm:text-lg
```

to:

```tsx
font-display text-2xl leading-none font-bold text-balance text-canvas-foreground sm:text-3xl
```

Change the title class from:

```tsx
text-xs leading-5 text-muted-foreground sm:text-sm
```

to:

```tsx
font-mono text-xs leading-5 tracking-[0.1em] text-muted-foreground uppercase sm:text-sm
```

- [ ] **Step 4: Update section wrapper**

Replace the `return` body in `SpeakersSection` with:

```tsx
return (
    <Section id="speakers" title="Speakers">
        <div className="mx-auto mt-10 grid w-full max-w-7xl gap-10">
            <div className="grid gap-6 border-t-4 border-canvas-foreground pt-5 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-start">
                <div className="grid gap-4">
                    <p className="speakers-editorial-meta font-mono text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                        Community voices
                    </p>
                    <p className="max-w-[8ch] font-display text-6xl leading-[0.86] font-bold text-canvas-foreground uppercase sm:text-7xl lg:text-8xl">
                        Speakers
                    </p>
                </div>
                <p className="border-t border-canvas-foreground/15 pt-4 font-mono text-xs leading-6 tracking-[0.14em] text-muted-foreground uppercase lg:border-t-0 lg:pt-0 lg:text-right">
                    Laravel
                    <br />
                    PHP
                    <br />
                    Frontend
                </p>
            </div>

            <ul className="speakers-editorial-grid grid list-none gap-x-8 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-3">
                {speakers.map((speaker) => (
                    <SpeakerCard key={speaker.id} speaker={speaker} />
                ))}
            </ul>
        </div>
    </Section>
);
```

- [ ] **Step 5: Run focused speaker tests**

Run:

```bash
npm test -- SpeakersSection.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit**

Run:

```bash
git add resources/js/components/sections/SpeakersSection.tsx resources/js/components/sections/SpeakersSection.test.tsx
git commit -m "Redesign speakers editorial grid"
```

---

### Task 4: Final Integration Verification

**Files:**
- Read/verify: `resources/js/components/sections/ScheduleSection.tsx`
- Read/verify: `resources/js/components/Schedule.tsx`
- Read/verify: `resources/js/components/sections/SpeakersSection.tsx`
- Read/verify: `resources/js/components/AnimatedTabs.tsx`

- [ ] **Step 1: Run the full focused React test set**

Run:

```bash
npm test -- ScheduleSection.test.tsx Schedule.test.tsx SpeakersSection.test.tsx AnimatedTabs.test.tsx Button.test.tsx
```

Expected: PASS.

- [ ] **Step 2: Run type checking**

Run:

```bash
npm run types:check
```

Expected: PASS with `tsc --noEmit`.

- [ ] **Step 3: Run lint on touched files**

Run:

```bash
npx eslint resources/js/components/Schedule.tsx resources/js/components/Schedule.test.tsx resources/js/components/sections/ScheduleSection.tsx resources/js/components/sections/ScheduleSection.test.tsx resources/js/components/sections/SpeakersSection.tsx resources/js/components/sections/SpeakersSection.test.tsx resources/js/components/AnimatedTabs.tsx
```

Expected: no output and exit code 0.

- [ ] **Step 4: Run production build**

Run:

```bash
npm run build
```

Expected: Vite build completes with `✓ built`.

- [ ] **Step 5: Inspect responsive and theme behavior manually**

Open the Herd site:

```text
http://laraconeu2027.test
```

Check:

- Schedule header has editorial poster scale.
- Schedule tabs remain centered and keyboard accessible.
- Active tab uses inverse pair and remains readable in light and dark mode.
- Timetable rows scan clearly on desktop.
- Timetable rows stack without text overlap on mobile.
- Speakers section visually relates to schedule through grid rules and type scale.
- Speaker names, titles, and avatar fallbacks remain readable.

- [ ] **Step 6: Final commit**

If any verification-only fixes were needed, commit them:

```bash
git add resources/js/components resources/js/components/sections
git commit -m "Verify editorial section redesign"
```

If no fixes were needed, do not create an empty commit.

---

## Self-Review

Spec coverage:

- Schedule section editorial metadata: Task 1.
- Schedule timetable grid: Task 2.
- SpeakersSection companion editorial grid: Task 3.
- Accessibility and behavior preservation: Tasks 2, 3, and 4.
- Verification commands from the spec: Task 4.

Placeholder scan:

- No unfinished markers or unspecified test steps remain.

Type consistency:

- Existing prop names are preserved: `days`, `speakers`, `label`, `date`, `speakerName`, `speakerPhotoUrl`.
- Existing compound API names are preserved: `Schedule.List`, `Schedule.Day`, `Schedule.Item`.
