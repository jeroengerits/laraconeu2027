import { render, screen } from '@testing-library/react';

import { ScheduleSection } from '@/components/sections/ScheduleSection';
import type { ScheduleDay } from '@/types/schedule';
import type { Speaker } from '@/types/speaker';

const days: ScheduleDay[] = [
    {
        id: 'day-1',
        label: 'DAY 1',
        date: '5 APRIL',
        items: [
            {
                id: 'registration',
                kind: 'registration',
                start: '08:30',
                end: '09:15',
                title: 'Registration',
            },
        ],
    },
];

const speakers: Speaker[] = [];

describe('ScheduleSection', () => {
    it('renders editorial schedule metadata and schedule content', () => {
        render(<ScheduleSection days={days} speakers={speakers} />);

        expect(
            screen.getByRole('heading', { level: 2, name: 'Schedule' }),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Conference program / three days'),
        ).toBeInTheDocument();
        expect(screen.getByText('Apr 05-07')).toBeInTheDocument();
        expect(screen.getByText('Registration')).toBeInTheDocument();
    });
});
