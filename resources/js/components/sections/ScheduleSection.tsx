import type { ReactElement } from 'react';

import { Schedule } from '@/components/Schedule';
import {
    Section,
    SectionFrame,
    SectionIntro,
} from '@/components/sections/Section';
import { formatScheduleSpeakerName, speakersById } from '@/lib/speakerInitials';
import type { ScheduleDay } from '@/types/schedule';
import type { Speaker } from '@/types/speaker';

type ScheduleSectionProps = {
    days: ScheduleDay[];
    speakers: Speaker[];
};

export function ScheduleSection({
    days,
    speakers,
}: ScheduleSectionProps): ReactElement {
    const defaultDay = days[0]?.id ?? 'day-1';
    const speakerLookup = speakersById(speakers);

    return (
        <Section id="schedule">
            <SectionFrame>
                <SectionIntro
                    eyebrow="Conference program / three days"
                    meta={
                        <>
                            <strong className="block font-display text-3xl leading-none font-bold text-canvas-foreground">
                                Apr 05-07
                            </strong>
                            Amsterdam
                            <br />
                            2027
                            <br />
                            Main venue
                        </>
                    }
                    title="Schedule"
                />
                <Schedule defaultValue={defaultDay}>
                    <Schedule.List aria-label="Conference schedule">
                        {days.map((day) => (
                            <Schedule.Day
                                date={day.date}
                                key={day.id}
                                label={day.label}
                                value={day.id}
                            >
                                {day.items.map((item) => {
                                    const speaker = item.speakerId
                                        ? speakerLookup.get(item.speakerId)
                                        : undefined;

                                    return (
                                        <Schedule.Item
                                            end={item.end}
                                            key={item.id}
                                            kind={item.kind}
                                            speaker={
                                                speaker
                                                    ? formatScheduleSpeakerName(
                                                          speaker.name,
                                                      )
                                                    : undefined
                                            }
                                            speakerName={speaker?.name}
                                            speakerPhotoUrl={speaker?.photoUrl}
                                            start={item.start}
                                        >
                                            {item.title}
                                        </Schedule.Item>
                                    );
                                })}
                            </Schedule.Day>
                        ))}
                    </Schedule.List>
                </Schedule>
            </SectionFrame>
        </Section>
    );
}
