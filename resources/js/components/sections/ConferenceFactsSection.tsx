import type { ReactElement } from 'react';

const conferenceFacts = [
    {
        detail: '2027',
        label: 'Dates',
        value: 'Apr 5-7',
    },
    {
        detail: 'Netherlands',
        label: 'City',
        value: 'Amsterdam',
    },
    {
        detail: 'Talks / hallway track / community',
        label: 'Format',
        value: '3 days',
    },
    {
        detail: 'PHP / frontend / product engineering',
        label: 'Focus',
        value: 'Laravel',
    },
] as const;

export function ConferenceFactsSection(): ReactElement {
    return (
        <section
            aria-labelledby="conference-facts-heading"
            className="border-b-2 border-canvas-foreground bg-canvas text-canvas-foreground transition-color-mode"
            id="conference-facts"
        >
            <div className="mx-auto grid w-full max-w-7xl border-canvas-foreground/15 md:grid-cols-[12rem_minmax(0,1fr)] md:border-x">
                <div className="border-b border-canvas-foreground/15 px-4 py-4 sm:px-6 md:border-r md:border-b-0 lg:px-8">
                    <h2
                        className="font-mono text-[0.6875rem] leading-5 font-semibold tracking-[0.16em] text-muted-foreground uppercase"
                        id="conference-facts-heading"
                    >
                        Conference facts
                    </h2>
                </div>
                <dl className="grid sm:grid-cols-2 lg:grid-cols-4">
                    {conferenceFacts.map((fact) => (
                        <div
                            className="grid min-h-32 content-between border-b border-canvas-foreground/15 px-4 py-4 last:border-b-0 sm:border-r sm:even:border-r-0 lg:border-b-0 lg:last:border-r-0 lg:even:border-r"
                            key={fact.label}
                        >
                            <dt className="font-mono text-[0.6875rem] leading-5 font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                                {fact.label}
                            </dt>
                            <dd className="grid gap-2">
                                <span className="font-display text-3xl leading-none font-bold text-canvas-foreground uppercase sm:text-4xl">
                                    {fact.value}
                                </span>
                                <span className="font-mono text-[0.6875rem] leading-5 tracking-[0.12em] text-muted-foreground uppercase">
                                    {fact.detail}
                                </span>
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
