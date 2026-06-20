import type { ReactElement } from 'react';

import { Button } from '@/components/Button';
import {
    Section,
    SectionFrame,
    SectionIntro,
} from '@/components/sections/Section';

const experienceHighlights = [
    {
        detail: 'Focused conference talks from people building, scaling, and maintaining Laravel applications.',
        label: 'Main stage',
        marker: '01',
    },
    {
        detail: 'A community track shaped by the conversations between sessions, over coffee, and around the venue.',
        label: 'Hallway track',
        marker: '02',
    },
    {
        detail: 'Hands-on sessions for architecture, testing, performance, and long-term application craft.',
        label: 'Workshops',
        marker: '03',
    },
] as const;

const experienceRhythm = [
    'Morning talks',
    'Shared lunch',
    'Afternoon sessions',
    'Evening community',
] as const;

export function ExperienceSection(): ReactElement {
    return (
        <Section id="about">
            <SectionFrame>
                <SectionIntro
                    eyebrow="Why come / community"
                    meta={
                        <>
                            Amsterdam
                            <br />
                            April
                            <br />
                            Laravel
                        </>
                    }
                    title="Experience"
                />
                <div className="experience-editorial-grid grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
                    <div className="grid border-t-2 border-canvas-foreground lg:grid-cols-3">
                        {experienceHighlights.map((highlight) => (
                            <article
                                className="experience-editorial-highlight grid min-h-72 content-between gap-8 border-b border-canvas-foreground/15 py-5 lg:border-r lg:border-b-0 lg:px-5 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
                                key={highlight.label}
                            >
                                <div className="grid gap-4">
                                    <p className="font-mono text-[0.6875rem] leading-5 font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                                        {highlight.marker}
                                    </p>
                                    <h3 className="font-display text-3xl leading-none font-bold text-canvas-foreground uppercase sm:text-4xl">
                                        {highlight.label}
                                    </h3>
                                </div>
                                <p className="text-sm leading-6 text-muted-foreground">
                                    {highlight.detail}
                                </p>
                            </article>
                        ))}
                    </div>
                    <aside
                        aria-label="Experience rhythm"
                        className="grid content-start gap-6 border-t-2 border-canvas-foreground pt-5"
                    >
                        <div className="grid gap-3">
                            <p className="font-mono text-[0.6875rem] leading-5 font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                                Rhythm
                            </p>
                            <ul className="grid list-none gap-2 p-0">
                                {experienceRhythm.map((item) => (
                                    <li
                                        className="border-t border-canvas-foreground/15 pt-2 font-mono text-xs leading-5 tracking-[0.12em] text-canvas-foreground uppercase"
                                        key={item}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid gap-4 border-t border-canvas-foreground/15 pt-5">
                            <p className="text-sm leading-6 text-muted-foreground">
                                Three days in Amsterdam for talks, workshops,
                                and the Laravel conversations that are easier to
                                have in person.
                            </p>
                            <Button
                                asChild
                                className="justify-self-start rounded-none font-mono text-xs tracking-[0.12em] uppercase"
                                size="small"
                                variant="highlight"
                            >
                                <a href="#schedule">View schedule</a>
                            </Button>
                        </div>
                    </aside>
                </div>
            </SectionFrame>
        </Section>
    );
}
