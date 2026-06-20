import type { ReactElement } from 'react';

import { Avatar } from '@/components/Avatar';
import { Section } from '@/components/sections/Section';
import type { Speaker } from '@/types/speaker';

type SpeakersSectionProps = {
    speakers: Speaker[];
};

export function SpeakersSection({
    speakers,
}: SpeakersSectionProps): ReactElement {
    return (
        <Section id="speakers" title="Speakers">
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
                {speakers.map((speaker) => (
                    <li
                        className="grid justify-items-center gap-3 text-center"
                        key={speaker.id}
                    >
                        <Avatar
                            name={speaker.name}
                            size="lg"
                            src={speaker.photoUrl}
                        />
                        <div className="grid gap-1">
                            <p className="text-sm leading-6 font-semibold text-(--welcome-fg) sm:text-base">
                                {speaker.name}
                            </p>
                            {speaker.title ? (
                                <p className="text-xs leading-5 text-(--welcome-fg)/65 sm:text-sm">
                                    {speaker.title}
                                </p>
                            ) : null}
                        </div>
                    </li>
                ))}
            </ul>
        </Section>
    );
}
