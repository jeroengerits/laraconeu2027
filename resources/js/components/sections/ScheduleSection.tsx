import type { ReactElement } from 'react';

import { Schedule } from '@/components/Schedule';
import { Section } from '@/components/sections/Section';
import {
    formatScheduleSpeakerName,
    speakersById,
} from '@/lib/speakerInitials';
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
        <Section id="schedule" title="Schedule">
            <div className="mt-8 max-w-4xl">
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
            </div>
        </Section>
    );
}
