import type { ReactElement } from 'react';
import { memo } from 'react';

import { AnimatedListItem } from '@/components/AnimatedListItem';
import { Avatar } from '@/components/Avatar';
import { Section } from '@/components/sections/Section';
import {
    createSpeakerItemEnterVariants,
    scheduleItemViewport,
} from '@/lib/motionVariants';
import type { Speaker } from '@/types/speaker';

type SpeakersSectionProps = {
    speakers: Speaker[];
};

const speakerCardVariants = createSpeakerItemEnterVariants(false);

const SpeakerCard = memo(function SpeakerCard({
    speaker,
}: {
    speaker: Speaker;
}): ReactElement {
    return (
        <AnimatedListItem
            className="speaker-editorial-card grid gap-4 border-t border-canvas-foreground/15 pt-4 sm:grid-cols-[4rem_minmax(0,1fr)] sm:items-start"
            variants={speakerCardVariants}
            viewport={scheduleItemViewport}
        >
            <Avatar name={speaker.name} size="lg" src={speaker.photoUrl} />
            <div className="grid min-w-0 gap-2">
                <p className="font-display text-2xl leading-none font-bold text-balance text-canvas-foreground sm:text-3xl">
                    {speaker.name}
                </p>
                {speaker.title ? (
                    <p className="font-mono text-xs leading-5 tracking-[0.1em] text-muted-foreground uppercase sm:text-sm">
                        {speaker.title}
                    </p>
                ) : null}
            </div>
        </AnimatedListItem>
    );
});

export function SpeakersSection({
    speakers,
}: SpeakersSectionProps): ReactElement {
    return (
        <Section id="speakers">
            <div className="mx-auto mt-10 grid w-full max-w-7xl gap-10">
                <div className="grid gap-6 border-t-4 border-canvas-foreground pt-5 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-start">
                    <div className="grid gap-4">
                        <p className="speakers-editorial-meta font-mono text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                            Community voices
                        </p>
                        <h2 className="max-w-[8ch] font-display text-6xl leading-[0.86] font-bold text-canvas-foreground uppercase sm:text-7xl lg:text-8xl">
                            Speakers
                        </h2>
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
}
