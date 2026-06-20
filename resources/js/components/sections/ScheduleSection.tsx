import type { ReactElement } from 'react';

import { Schedule } from '@/components/Schedule';
import { Section } from '@/components/sections/Section';
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
            <div className="mx-auto mt-10 grid w-full max-w-7xl gap-10">
                <div className="grid gap-6 border-t-4 border-canvas-foreground pt-5 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-start">
                    <div className="grid gap-4">
                        <p className="font-mono text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                            Conference program / three days
                        </p>
                        <h2 className="max-w-[8ch] font-display text-5xl leading-[0.9] font-bold text-canvas-foreground uppercase sm:text-6xl lg:text-7xl">
                            Schedule
                        </h2>
                    </div>
                    <div className="grid gap-4 border-t border-canvas-foreground/15 pt-4 text-left lg:border-t-0 lg:pt-0 lg:text-right">
                        <p className="font-display text-3xl leading-none font-bold text-canvas-foreground uppercase">
                            Apr 05-07
                        </p>
                        <p className="font-mono text-xs leading-6 tracking-[0.14em] text-muted-foreground uppercase">
                            Amsterdam
                            <br />
                            2027
                            <br />
                            Main venue
                        </p>
                    </div>
                </div>
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
