import { m, useInView, useReducedMotion } from 'motion/react';
import type { ReactElement } from 'react';
import { memo, useMemo, useRef } from 'react';

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

const SpeakerCard = memo(function SpeakerCard({
    speaker,
}: {
    speaker: Speaker;
}): ReactElement {
    const cardRef = useRef<HTMLLIElement>(null);
    const isInView = useInView(cardRef, scheduleItemViewport);
    const shouldReduceMotion = useReducedMotion();
    const speakerItemVariants = useMemo(
        () => createSpeakerItemEnterVariants(shouldReduceMotion),
        [shouldReduceMotion],
    );

    const content = (
        <>
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
        </>
    );

    if (shouldReduceMotion) {
        return (
            <li
                className="grid justify-items-center gap-3 text-center"
                ref={cardRef}
            >
                {content}
            </li>
        );
    }

    return (
        <m.li
            ref={cardRef}
            animate={isInView ? 'visible' : 'hidden'}
            className="grid justify-items-center gap-3 text-center"
            initial="hidden"
            variants={speakerItemVariants}
        >
            {content}
        </m.li>
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
