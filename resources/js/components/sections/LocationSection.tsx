import type { ReactElement } from 'react';

import { Button } from '@/components/Button';
import {
    Section,
    SectionFrame,
    SectionIntro,
} from '@/components/sections/Section';

const locationDetails = [
    {
        detail: 'Final venue details will be published before registration opens.',
        label: 'Venue',
        value: 'Amsterdam venue',
    },
    {
        detail: 'Easy arrival by train, tram, bike, and regional connections.',
        label: 'City',
        value: 'Amsterdam',
    },
    {
        detail: 'Schiphol connects directly to Amsterdam by frequent rail service.',
        label: 'Airport',
        value: 'AMS',
    },
] as const;

const travelNotes = [
    'Book accommodation near Amsterdam Centraal or the metro ring',
    'Expect public transport and cycling to be the easiest local options',
    'Venue address and hotel guidance will follow with attendee updates',
] as const;

export function LocationSection(): ReactElement {
    return (
        <Section id="location">
            <SectionFrame>
                <SectionIntro
                    eyebrow="Venue / city"
                    meta={
                        <>
                            Amsterdam
                            <br />
                            Netherlands
                            <br />
                            EU
                        </>
                    }
                    title="Location"
                />
                <div className="location-editorial-grid grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
                    <div className="grid border-t-2 border-canvas-foreground">
                        {locationDetails.map((item) => (
                            <article
                                className="location-editorial-row grid gap-4 border-b border-canvas-foreground/15 py-5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6"
                                key={item.label}
                            >
                                <p className="font-mono text-[0.6875rem] leading-5 font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                                    {item.label}
                                </p>
                                <div className="grid gap-2">
                                    <h3 className="font-display text-3xl leading-none font-bold text-canvas-foreground uppercase sm:text-4xl">
                                        {item.value}
                                    </h3>
                                    <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                                        {item.detail}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                    <aside
                        aria-label="Travel notes"
                        className="grid content-start gap-6 border-t-2 border-canvas-foreground pt-5"
                    >
                        <div className="grid gap-3">
                            <p className="font-mono text-[0.6875rem] leading-5 font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                                Travel notes
                            </p>
                            <ul className="grid list-none gap-2 p-0">
                                {travelNotes.map((note) => (
                                    <li
                                        className="border-t border-canvas-foreground/15 pt-2 text-sm leading-6 text-muted-foreground"
                                        key={note}
                                    >
                                        {note}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid gap-4 border-t border-canvas-foreground/15 pt-5">
                            <p className="font-mono text-xs leading-5 tracking-[0.12em] text-canvas-foreground uppercase">
                                5-7 April 2027 / Amsterdam, Netherlands
                            </p>
                            <Button
                                asChild
                                className="justify-self-start rounded-none font-mono text-xs tracking-[0.12em] uppercase"
                                size="small"
                                variant="highlight"
                            >
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=Amsterdam%2C%20Netherlands"
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    View city map
                                </a>
                            </Button>
                        </div>
                    </aside>
                </div>
            </SectionFrame>
        </Section>
    );
}
