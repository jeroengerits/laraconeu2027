import type { ReactElement } from 'react';

import { Button } from '@/components/Button';
import {
    Section,
    SectionFrame,
    SectionIntro,
} from '@/components/sections/Section';

const sponsorTiers = [
    {
        detail: 'Top placement across the event, stage presence, and attendee touchpoints.',
        label: 'Principal',
        slots: '2 slots',
        status: 'Open',
    },
    {
        detail: 'Visible support for hallway track, community moments, and developer hospitality.',
        label: 'Community',
        slots: '4 slots',
        status: 'Open',
    },
    {
        detail: 'Focused visibility for teams, products, and tools serving the Laravel ecosystem.',
        label: 'Supporter',
        slots: '8 slots',
        status: 'Open',
    },
] as const;

const sponsorSignals = [
    'Laravel ecosystem',
    'European audience',
    'Senior developers',
    'Product builders',
] as const;

export function SponsorsSection(): ReactElement {
    return (
        <Section id="sponsors">
            <SectionFrame>
                <SectionIntro
                    eyebrow="Partners / ecosystem"
                    meta={
                        <>
                            Support
                            <br />
                            Visibility
                            <br />
                            Community
                        </>
                    }
                    title="Sponsors"
                />
                <div className="sponsors-editorial-grid grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
                    <div className="grid border-t-2 border-canvas-foreground">
                        {sponsorTiers.map((tier) => (
                            <article
                                className="sponsor-editorial-tier grid gap-4 border-b border-canvas-foreground/15 py-5 sm:grid-cols-[8rem_minmax(0,1fr)_6rem] sm:gap-6"
                                key={tier.label}
                            >
                                <div className="font-mono text-[0.6875rem] leading-5 font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                                    {tier.slots}
                                </div>
                                <div className="grid gap-2">
                                    <h3 className="font-display text-2xl leading-none font-bold text-canvas-foreground uppercase sm:text-3xl">
                                        {tier.label}
                                    </h3>
                                    <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                                        {tier.detail}
                                    </p>
                                </div>
                                <p className="font-mono text-[0.6875rem] leading-5 font-semibold tracking-[0.16em] text-canvas-foreground uppercase sm:text-right">
                                    {tier.status}
                                </p>
                            </article>
                        ))}
                    </div>
                    <aside
                        aria-label="Sponsor audience"
                        className="grid content-start gap-6 border-t-2 border-canvas-foreground pt-5"
                    >
                        <div className="grid gap-3">
                            <p className="font-mono text-[0.6875rem] leading-5 font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                                Audience
                            </p>
                            <ul className="grid list-none gap-2 p-0">
                                {sponsorSignals.map((signal) => (
                                    <li
                                        className="border-t border-canvas-foreground/15 pt-2 font-mono text-xs leading-5 tracking-[0.12em] text-canvas-foreground uppercase"
                                        key={signal}
                                    >
                                        {signal}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid gap-4 border-t border-canvas-foreground/15 pt-5">
                            <p className="text-sm leading-6 text-muted-foreground">
                                Partner with Laracon EU to meet the developers,
                                teams, and companies building with Laravel every
                                day.
                            </p>
                            <Button
                                asChild
                                className="justify-self-start rounded-none font-mono text-xs tracking-[0.12em] uppercase"
                                size="small"
                                variant="highlight"
                            >
                                <a href="mailto:sponsors@laracon.eu">
                                    Sponsor the event
                                </a>
                            </Button>
                        </div>
                    </aside>
                </div>
            </SectionFrame>
        </Section>
    );
}
