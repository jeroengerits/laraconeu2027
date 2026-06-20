import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Schedule } from '@/components/Schedule';
import type { ScheduleDay } from '@/types/schedule';

const sampleDays: ScheduleDay[] = [
    {
        id: 'day-1',
        label: 'DAY 1',
        date: '5 APRIL',
        items: [
            {
                id: 'day-1-registration',
                kind: 'registration',
                start: '08:30',
                end: '09:15',
                title: 'Registration',
            },
            {
                id: 'day-1-talk',
                kind: 'session',
                start: '09:30',
                end: '10:00',
                title: 'Write better abstractions',
                speakerId: 'dan-harrin',
            },
            {
                id: 'day-1-break',
                kind: 'break',
                start: '10:30',
                end: '11:00',
                title: 'break;',
            },
        ],
    },
    {
        id: 'day-2',
        label: 'DAY 2',
        date: '6 APRIL',
        items: [
            {
                id: 'day-2-social',
                kind: 'social',
                start: '17:30',
                end: '18:30',
                title: 'SOCIAL_DRINKS',
            },
        ],
    },
];

function renderScheduleItem(
    item: ScheduleDay['items'][number],
    speaker?: {
        name?: string;
        photoUrl?: string;
        speaker: string;
    },
): ReturnType<typeof render> {
    return render(
        <Schedule defaultValue="day-1">
            <Schedule.List aria-label="Conference schedule">
                <Schedule.Day date="5 APRIL" label="DAY 1" value="day-1">
                    <Schedule.Item
                        end={item.end}
                        kind={item.kind}
                        speaker={speaker?.speaker}
                        speakerName={speaker?.name}
                        speakerPhotoUrl={speaker?.photoUrl}
                        start={item.start}
                    >
                        {item.title}
                    </Schedule.Item>
                </Schedule.Day>
            </Schedule.List>
        </Schedule>,
    );
}

function renderSchedule(
    days: ScheduleDay[] = sampleDays,
): ReturnType<typeof render> {
    return render(
        <Schedule defaultValue={days[0]?.id ?? 'day-1'}>
            <Schedule.List aria-label="Conference schedule">
                {days.map((day) => (
                    <Schedule.Day
                        date={day.date}
                        key={day.id}
                        label={day.label}
                        value={day.id}
                    >
                        {day.items.map((item) => (
                            <Schedule.Item
                                end={item.end}
                                key={item.id}
                                kind={item.kind}
                                speaker={
                                    item.speakerId ? 'DAN HARRIN' : undefined
                                }
                                speakerName={
                                    item.speakerId ? 'Dan Harrin' : undefined
                                }
                                start={item.start}
                            >
                                {item.title}
                            </Schedule.Item>
                        ))}
                    </Schedule.Day>
                ))}
            </Schedule.List>
        </Schedule>,
    );
}

describe('Schedule', () => {
    beforeEach(() => {
        window.HTMLElement.prototype.scrollIntoView = jest.fn();
    });

    it('renders day tabs and the default day items', () => {
        renderSchedule();

        expect(screen.getByRole('tab', { name: /DAY 1/i })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: /DAY 2/i })).toBeInTheDocument();
        expect(screen.getByText('Registration')).toBeInTheDocument();
        expect(
            screen.getByText('Write better abstractions'),
        ).toBeInTheDocument();
        expect(screen.queryByText('SOCIAL_DRINKS')).not.toBeInTheDocument();
    });

    it('shows the selected day when a tab is activated', async () => {
        const user = userEvent.setup();

        renderSchedule();
        await user.click(screen.getByRole('tab', { name: /DAY 2/i }));

        expect(screen.getByText('SOCIAL_DRINKS')).toBeInTheDocument();
        expect(screen.queryByText('Registration')).not.toBeInTheDocument();
    });

    it('scrolls back to the top of the schedule when a tab is activated', async () => {
        const handleValueChange = jest.fn();
        const user = userEvent.setup();

        render(
            <Schedule defaultValue="day-1" onValueChange={handleValueChange}>
                <Schedule.List aria-label="Conference schedule">
                    {sampleDays.map((day) => (
                        <Schedule.Day
                            date={day.date}
                            key={day.id}
                            label={day.label}
                            value={day.id}
                        >
                            {day.items.map((item) => (
                                <Schedule.Item
                                    end={item.end}
                                    key={item.id}
                                    kind={item.kind}
                                    start={item.start}
                                >
                                    {item.title}
                                </Schedule.Item>
                            ))}
                        </Schedule.Day>
                    ))}
                </Schedule.List>
            </Schedule>,
        );

        await user.click(screen.getByRole('tab', { name: /DAY 2/i }));

        expect(handleValueChange).toHaveBeenCalledWith('day-2');
        expect(
            window.HTMLElement.prototype.scrollIntoView,
        ).toHaveBeenCalledWith({
            behavior: 'smooth',
            block: 'start',
        });
    });

    it('renders session titles with speaker names', () => {
        renderSchedule();

        expect(
            screen.getByText('Write better abstractions'),
        ).toBeInTheDocument();
        expect(screen.getByText('DAN HARRIN')).toBeInTheDocument();
    });

    it('renders a speaker avatar beside session rows when speaker details are provided', () => {
        renderScheduleItem(sampleDays[0].items[1], {
            name: 'Dan Harrin',
            speaker: 'DAN HARRIN',
        });

        expect(screen.getByText('DH')).toBeInTheDocument();
        expect(screen.getByText('DAN HARRIN')).toBeInTheDocument();
    });

    it('renders a placeholder avatar when a session row has no speaker name', () => {
        renderScheduleItem(sampleDays[0].items[1], {
            speaker: 'DAN HARRIN',
        });

        expect(screen.getByText('DAN HARRIN')).toBeInTheDocument();
        expect(screen.queryByText('DH')).not.toBeInTheDocument();
        expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('switches days when a tab is activated with the keyboard', async () => {
        const user = userEvent.setup();

        renderSchedule();
        await user.click(screen.getByRole('tab', { name: /DAY 1/i }));
        await user.keyboard('{ArrowRight}');

        expect(screen.getByText('SOCIAL_DRINKS')).toBeInTheDocument();
        expect(screen.queryByText('Registration')).not.toBeInTheDocument();
    });

    it('renders non-session items without speaker attribution', () => {
        renderSchedule();

        expect(screen.getByText('break;')).toBeInTheDocument();
        expect(screen.queryByText('break; //')).not.toBeInTheDocument();
    });

    it('exposes a tablist labelled for assistive technology', () => {
        renderSchedule();

        expect(
            screen.getByRole('tablist', { name: 'Conference schedule' }),
        ).toBeInTheDocument();
    });

    it('renders time ranges for each item on the active day', () => {
        renderSchedule();

        const tabPanel = screen.getByRole('tabpanel');
        const items = within(tabPanel).getAllByRole('listitem');

        expect(items).toHaveLength(3);
        expect(
            within(tabPanel).getByLabelText('08:30 to 09:15'),
        ).toHaveTextContent('08:30 – 09:15');
    });
});
