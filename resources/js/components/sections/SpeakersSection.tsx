import type { ReactElement } from 'react';
import { memo } from 'react';

import { AnimatedListItem } from '@/components/AnimatedListItem';
import { Avatar } from '@/components/Avatar';
import {
    Section,
    SectionFrame,
    SectionIntro,
} from '@/components/sections/Section';
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
                <p className="font-display text-xl leading-none font-bold text-balance text-canvas-foreground sm:text-2xl">
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
            <SectionFrame>
                <SectionIntro
                    eyebrow={
                        <span className="speakers-editorial-meta">
                            Community voices
                        </span>
                    }
                    meta={
                        <>
                            Laravel
                            <br />
                            PHP
                            <br />
                            Frontend
                        </>
                    }
                    title="Speakers"
                />
                <ul className="speakers-editorial-grid grid list-none gap-x-8 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-3">
                    {speakers.map((speaker) => (
                        <SpeakerCard key={speaker.id} speaker={speaker} />
                    ))}
                </ul>
            </SectionFrame>
        </Section>
    );
}
