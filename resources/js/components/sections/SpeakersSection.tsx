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
            className="grid justify-items-center gap-3 text-center"
            variants={speakerCardVariants}
            viewport={scheduleItemViewport}
        >
            <Avatar name={speaker.name} size="lg" src={speaker.photoUrl} />
            <div className="grid gap-1">
                <p className="text-base leading-snug font-bold text-canvas-foreground sm:text-lg">
                    {speaker.name}
                </p>
                {speaker.title ? (
                    <p className="text-xs leading-5 text-muted-foreground sm:text-sm">
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
        <Section id="speakers" title="Speakers">
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
                {speakers.map((speaker) => (
                    <SpeakerCard key={speaker.id} speaker={speaker} />
                ))}
            </ul>
        </Section>
    );
}
