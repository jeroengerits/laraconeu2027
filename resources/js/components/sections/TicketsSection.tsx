import type { ReactElement } from 'react';

import {
    Section,
    SectionFrame,
    SectionIntro,
} from '@/components/sections/Section';

const ticketTiers = [
    {
        availability: 'Available',
        description: 'The earliest opportunity to join Laracon EU 2027.',
        label: 'Blind Bird',
        price: '€699',
    },
    {
        availability: 'Coming soon',
        description: 'Early access for attendees planning ahead.',
        label: 'Early Bird',
        price: '€799',
    },
    {
        availability: 'Coming soon',
        description: 'Standard access for the full Laracon EU experience.',
        label: 'Regular',
        price: '€899',
    },
    {
        availability: 'To be announced',
        description:
            'Hands-on sessions for architecture, testing, and performance.',
        label: 'Workshops',
        price: 'To be announced',
    },
] as const;

export function TicketsSection(): ReactElement {
    return (
        <Section id="tickets">
            <SectionFrame>
                <SectionIntro
                    eyebrow="Access / registration"
                    meta={
                        <>
                            Three days
                            <br />
                            Talks
                            <br />
                            Community
                        </>
                    }
                    title="Tickets"
                />
                <div className="tickets-editorial-grid grid">
                    <div className="grid border-t-2 border-canvas-foreground lg:grid-cols-4">
                        {ticketTiers.map((tier) => (
                            <article
                                className="ticket-editorial-tier grid min-h-72 content-between gap-8 border-b border-canvas-foreground/15 py-5 lg:border-r lg:border-b-0 lg:px-5 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
                                key={tier.label}
                            >
                                <div className="grid gap-4">
                                    <p className="font-mono text-[0.6875rem] leading-5 font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                                        {tier.availability}
                                    </p>
                                    <div className="grid gap-2">
                                        <h3 className="font-display text-3xl leading-none font-bold text-canvas-foreground uppercase sm:text-4xl">
                                            {tier.label}
                                        </h3>
                                        <p className="font-display text-2xl leading-none font-bold text-muted-foreground uppercase">
                                            {tier.price}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm leading-6 text-muted-foreground">
                                    {tier.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </SectionFrame>
        </Section>
    );
}
