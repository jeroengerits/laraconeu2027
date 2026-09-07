import type { ReactElement } from 'react';

import { Button } from '@/components/Button';
import {
    Section,
    SectionFrame,
    SectionIntro,
} from '@/components/sections/Section';

const sponsorFacts = [
    {
        label: 'Attendees',
        value: '750+',
    },
    {
        label: 'International speakers',
        value: '30+',
    },
    {
        label: 'Online impressions',
        value: '1.2M+',
    },
    {
        label: 'Expo participants',
        value: '30+',
    },
] as const;

export function SponsorsSection(): ReactElement {
    return (
        <Section id="sponsors">
            <SectionFrame>
                <SectionIntro
                    eyebrow="Partners / ecosystem"
                    meta={
                        <>
                            Amsterdam
                            <br />
                            6-7 April
                            <br />
                            Kromhouthal
                        </>
                    }
                    title="Sponsors"
                />
                <div className="grid gap-10">
                    <p className="max-w-3xl border-t-2 border-canvas-foreground pt-5 text-xl leading-8 text-muted-foreground sm:text-2xl sm:leading-9">
                        Put your brand in front of the Laravel community at
                        Laracon EU 2027. Sponsorship packages and tailored
                        opportunities are available for Amsterdam.
                    </p>
                    <dl className="grid border-t-2 border-canvas-foreground sm:grid-cols-2 lg:grid-cols-4">
                        {sponsorFacts.map((fact) => (
                            <div
                                className="grid min-h-32 content-between gap-5 border-b border-canvas-foreground/15 px-4 py-4 sm:border-r sm:px-5 lg:border-b-0 lg:last:border-r-0"
                                key={fact.label}
                            >
                                <dt className="font-mono text-[0.6875rem] leading-5 font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                                    {fact.label}
                                </dt>
                                <dd className="font-display text-4xl leading-none font-bold text-canvas-foreground uppercase">
                                    {fact.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                    <div className="flex flex-wrap gap-3 border-t border-canvas-foreground/15 pt-5">
                        <Button
                            asChild
                            className="rounded-none font-mono text-xs tracking-[0.12em] uppercase"
                            size="small"
                            variant="highlight"
                        >
                            <a
                                download
                                href="/laracon-eu-2027-sponsorship-opportunities.pdf"
                            >
                                Download sponsor prospectus
                            </a>
                        </Button>
                        <Button
                            asChild
                            className="rounded-none font-mono text-xs tracking-[0.12em] uppercase"
                            size="small"
                            variant="outline"
                        >
                            <a href="mailto:sales@laracon.eu">Contact sales</a>
                        </Button>
                    </div>
                </div>
            </SectionFrame>
        </Section>
    );
}
