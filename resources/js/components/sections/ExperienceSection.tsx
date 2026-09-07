import type { ReactElement } from 'react';

import {
    Section,
    SectionFrame,
    SectionIntro,
} from '@/components/sections/Section';

const experienceHighlights = [
    {
        date: '5 April 2027',
        detail: 'Hands-on sessions for architecture, testing, performance, and long-term application craft.',
        label: 'Workshops',
        note: 'Requires a separate ticket',
    },
    {
        date: '6–7 April 2027',
        detail: 'Focused conference talks from people building, scaling, and maintaining Laravel applications.',
        label: 'Main stage',
        note: undefined,
    },
    {
        date: '6–7 April 2027',
        detail: 'Small-group conversations for sharing ideas, asking honest questions, and learning from the people around the table.',
        label: 'Round tables',
        note: undefined,
    },
    {
        date: '7 April 2027',
        detail: 'A late-night gathering to keep the conversations going after the final session and celebrate the community together.',
        label: 'After party',
        note: 'Requires a separate ticket',
    },
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
                <div className="experience-editorial-grid grid gap-10">
                    <div className="grid border-t-2 border-canvas-foreground lg:grid-cols-4">
                        {experienceHighlights.map((highlight) => (
                            <article
                                className="experience-editorial-highlight grid min-h-72 content-between gap-8 border-b border-canvas-foreground/15 py-5 lg:border-r lg:border-b-0 lg:px-5 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
                                key={highlight.label}
                            >
                                <div className="grid gap-4">
                                    <p className="font-mono text-[0.6875rem] leading-5 tracking-[0.12em] text-muted-foreground uppercase">
                                        {highlight.date}
                                    </p>
                                    <h3 className="font-display text-3xl leading-none font-bold text-canvas-foreground uppercase sm:text-4xl">
                                        {highlight.label}
                                    </h3>
                                    {highlight.note ? (
                                        <p className="font-mono text-[0.6875rem] leading-5 font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                                            {highlight.note}
                                        </p>
                                    ) : null}
                                </div>
                                <p className="text-sm leading-6 text-muted-foreground">
                                    {highlight.detail}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </SectionFrame>
        </Section>
    );
}
