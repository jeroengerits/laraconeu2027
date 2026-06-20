import type { ReactElement } from 'react';

import { Button } from '@/components/Button';
import {
    Section,
    SectionFrame,
    SectionIntro,
} from '@/components/sections/Section';

const ticketTiers = [
    {
        availability: 'Early access',
        description:
            'Full conference access for individual attendees, including talks, hallway track, and community events.',
        label: 'Individual',
        price: 'EUR 499',
    },
    {
        availability: 'Team bundle',
        description:
            'Three-day access for product and engineering teams joining together.',
        label: 'Team',
        price: 'EUR 449',
    },
    {
        availability: 'Limited',
        description:
            'Supportive access for students and early-career developers entering the Laravel community.',
        label: 'Community',
        price: 'EUR 249',
    },
] as const;

const ticketIncludes = [
    'Three conference days',
    'Main-stage talks',
    'Community events',
    'Coffee and lunch',
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
                <div className="tickets-editorial-grid grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
                    <div className="grid border-t-2 border-canvas-foreground lg:grid-cols-3">
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
                    <aside
                        aria-label="Ticket details"
                        className="grid content-start gap-6 border-t-2 border-canvas-foreground pt-5"
                    >
                        <div className="grid gap-3">
                            <p className="font-mono text-[0.6875rem] leading-5 font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                                Included
                            </p>
                            <ul className="grid list-none gap-2 p-0">
                                {ticketIncludes.map((item) => (
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
                                Ticket sales open soon. Join the registration
                                list and we will send access details when the
                                first release opens.
                            </p>
                            <Button
                                asChild
                                className="justify-self-start rounded-none font-mono text-xs tracking-[0.12em] uppercase"
                                size="small"
                                variant="highlight"
                            >
                                <a href="mailto:tickets@laracon.eu">
                                    Join ticket list
                                </a>
                            </Button>
                        </div>
                    </aside>
                </div>
            </SectionFrame>
        </Section>
    );
}
