import { render, screen, within } from '@testing-library/react';

import { SpeakersSection } from '@/components/sections/SpeakersSection';
import type { Speaker } from '@/types/speaker';

const sampleSpeakers: Speaker[] = [
    {
        id: 'taylor-otwell',
        name: 'Taylor Otwell',
        title: 'Founder of Laravel',
    },
    {
        id: 'dan-harrin',
        name: 'Dan Harrin',
        title: 'Co-Creator of Filament',
    },
    {
        id: 'guest-speaker',
        name: 'Guest Speaker',
    },
];

describe('SpeakersSection', () => {
    it('renders the speakers section heading and list', () => {
        render(<SpeakersSection speakers={sampleSpeakers} />);

        expect(
            screen.getByRole('heading', { level: 2, name: 'Speakers' }),
        ).toBeInTheDocument();
        expect(document.getElementById('speakers')).toBeInTheDocument();
        expect(screen.getAllByRole('listitem')).toHaveLength(3);
    });

    it('renders speaker names, titles, and avatar initials', () => {
        render(<SpeakersSection speakers={sampleSpeakers} />);

        expect(screen.getByText('Taylor Otwell')).toBeInTheDocument();
        expect(screen.getByText('Founder of Laravel')).toBeInTheDocument();
        expect(screen.getByText('TO')).toBeInTheDocument();
        expect(screen.getByText('DH')).toBeInTheDocument();
    });

    it('omits the title when a speaker has none', () => {
        render(<SpeakersSection speakers={sampleSpeakers} />);

        const guestCard = screen.getByText('Guest Speaker').closest('li');

        expect(guestCard).not.toBeNull();
        expect(
            within(guestCard as HTMLElement).queryByText(/founder/i),
        ).not.toBeInTheDocument();
    });

    it('renders the speakers in an editorial Swiss grid', () => {
        const { container } = render(
            <SpeakersSection speakers={sampleSpeakers} />,
        );

        expect(
            container.querySelector('.speakers-editorial-grid'),
        ).toBeInTheDocument();
        expect(
            container.querySelectorAll('.speaker-editorial-card'),
        ).toHaveLength(3);
        expect(
            container.querySelector('.speakers-editorial-meta'),
        ).toHaveTextContent('Community voices');
    });
});
