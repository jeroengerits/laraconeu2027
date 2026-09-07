import type { ReactElement } from 'react';

import {
    Section,
    SectionFrame,
    SectionIntro,
} from '@/components/sections/Section';

const locationDetails = [
    {
        detail: 'Gedempt Hamerkanaal, Amsterdam Noord, Netherlands.',
        label: 'Venue',
        value: 'Kromhouthal',
    },
    {
        detail: 'Easy arrival by train, tram, bike, and regional connections.',
        label: 'City',
        value: 'Amsterdam',
    },
] as const;

const travelNotes = [
    'Book accommodation near Amsterdam Centraal or the metro ring',
    'Expect public transport and cycling to be the easiest local options',
    'For navigation, the venue recommends Gedempt Hamerkanaal 231, opposite the Kromhouthal',
] as const;

const nearbyFoodAndDrink = [
    {
        address: 'T.T. Neveritaweg 59',
        category: 'restaurant',
        image: '/images/explore/pllek.jpg',
        name: 'Pllek',
        type: 'Restaurant / bar',
    },
    {
        address: 'NDSM-Plein 102',
        category: 'bar',
        image: '/images/explore/noorderlicht.jpg',
        name: 'Noorderlicht',
        type: 'Bar / café',
    },
    {
        address: 'Scheepsbouwkade 72',
        category: 'restaurant',
        image: '/images/explore/ijver.jpg',
        name: 'IJver',
        type: 'Restaurant / bar',
    },
    {
        address: 'Werfkade 14',
        category: 'restaurant',
        image: '/images/explore/loetje-aan-het-ij.jpg',
        name: "Loetje aan 't IJ",
        type: 'Restaurant',
    },
    {
        address: 'IJpromenade 2',
        category: 'bar',
        image: '/images/explore/tolhuistuin.jpg',
        name: 'Tolhuistuin',
        type: 'Restaurant / bar',
    },
    {
        address: 'Korte Papaverweg 4',
        category: 'restaurant',
        image: '/images/explore/cafe-de-ceuvel.jpg',
        name: 'Café de Ceuvel',
        type: 'Restaurant / café',
    },
    {
        address: 'Schaafstraat 21',
        category: 'bar',
        image: '/images/explore/oedipus-brewing.jpg',
        name: 'Oedipus Brewing',
        type: 'Brewery / taproom',
    },
    {
        address: 'Aambeeldstraat 36',
        category: 'restaurant',
        image: '/images/explore/hangar-amsterdam.jpg',
        name: 'Hangar Amsterdam',
        type: 'Restaurant / bar',
    },
    {
        address: 'NDSM-Plein 1',
        category: 'venue',
        image: '/images/explore/straat-museum.jpg',
        name: 'STRAAT Museum',
        type: 'Street art museum',
    },
    {
        address: 'IJpromenade 1',
        category: 'venue',
        image: '/images/explore/eye-filmmuseum.jpg',
        name: 'EYE Filmmuseum',
        type: 'Film museum / cinema',
    },
] as const;

const nearbyHotels = [
    {
        address: 'Asterweg 33',
        category: 'hotel',
        image: '/images/explore/yotel-amsterdam.jpg',
        name: 'YOTEL Amsterdam',
        type: 'Accommodation',
    },
    {
        address: 'Hagedoornplein 2',
        category: 'hotel',
        image: '/images/explore/bunk-amsterdam.jpg',
        name: 'BUNK Hotel Amsterdam',
        type: 'Accommodation',
    },
    {
        address: 'Termini 9',
        category: 'hotel',
        image: '/images/explore/tribe-amsterdam-city.jpg',
        name: 'Tribe Amsterdam City',
        type: 'Accommodation',
    },
] as const;

const explorePlaces = [...nearbyFoodAndDrink, ...nearbyHotels];

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
                    <div className="grid gap-10 lg:contents">
                        <div className="grid border-t-2 border-canvas-foreground lg:col-start-1 lg:row-start-1">
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
                        <div className="grid gap-4 lg:col-span-2 lg:row-start-2">
                            <div className="flex items-end justify-between gap-4 border-t-2 border-canvas-foreground pt-5">
                                <div>
                                    <p className="font-mono text-[0.6875rem] leading-5 font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                                        Nearby food &amp; drink
                                    </p>
                                    <h3 className="mt-2 font-display text-3xl leading-none font-bold text-canvas-foreground uppercase sm:text-4xl">
                                        Explore the area
                                    </h3>
                                </div>
                                <span className="hidden font-mono text-[0.6875rem] tracking-[0.12em] text-muted-foreground uppercase sm:block">
                                    Swipe to explore
                                </span>
                            </div>
                            <p className="text-sm leading-6 text-muted-foreground">
                                Plan your walk from the Kromhouthal in Google
                                Maps. Check current routes and opening hours
                                before visiting; walking distances are not
                                verified here.
                            </p>
                            <div
                                aria-label="Explore the area recommendations"
                                className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-4 outline-none focus-visible:ring-2 focus-visible:ring-canvas-foreground sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
                                role="region"
                                tabIndex={0}
                            >
                                {explorePlaces.map((place) => (
                                    <article
                                        className="grid w-64 shrink-0 snap-start gap-4 border border-canvas-foreground/15 p-3 sm:w-72"
                                        key={place.name}
                                    >
                                        <div className="aspect-[4/3] overflow-hidden bg-canvas-foreground/10">
                                            <img
                                                alt=""
                                                className="h-full w-full object-cover"
                                                height="532"
                                                loading="lazy"
                                                src={place.image}
                                                width="800"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <span className="justify-self-start bg-canvas-foreground px-2 py-1 font-mono text-[0.625rem] font-semibold tracking-[0.12em] text-canvas uppercase">
                                                {place.category}
                                            </span>
                                            <h4 className="font-display text-2xl leading-none font-bold text-canvas-foreground uppercase">
                                                {place.name}
                                            </h4>
                                            <p className="font-mono text-[0.625rem] leading-4 tracking-[0.1em] text-muted-foreground uppercase">
                                                {place.type}
                                                <br />
                                                {place.address}
                                            </p>
                                            <a
                                                className="font-mono text-[0.625rem] font-semibold tracking-[0.12em] text-canvas-foreground uppercase underline underline-offset-4"
                                                aria-label={`Walking directions to ${place.name} from Kromhouthal (opens in a new tab)`}
                                                href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent('Kromhouthal, Gedempt Hamerkanaal, Amsterdam')}&destination=${encodeURIComponent(`${place.name}, ${place.address}, Amsterdam`)}&travelmode=walking`}
                                                rel="noreferrer"
                                                target="_blank"
                                            >
                                                Walking directions
                                            </a>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                    <aside
                        aria-label="Venue and travel notes"
                        className="grid content-start gap-6 border-t-2 border-canvas-foreground pt-5 lg:col-start-2 lg:row-start-1"
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
                                6-7 April 2027 / Amsterdam, Netherlands
                            </p>
                        </div>
                    </aside>
                </div>
            </SectionFrame>
        </Section>
    );
}
