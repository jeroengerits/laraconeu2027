import { render, screen } from '@testing-library/react';

import { ExperienceSection } from '@/components/sections/ExperienceSection';

describe('ExperienceSection', () => {
    it('renders experience highlights and the schedule call to action', () => {
        render(<ExperienceSection />);

        expect(
            screen.getByRole('heading', { level: 2, name: 'Experience' }),
        ).toBeInTheDocument();
        expect(document.getElementById('about')).toBeInTheDocument();
        expect(screen.getByText('Main stage')).toBeInTheDocument();
        expect(screen.getByText('Hallway track')).toBeInTheDocument();
        expect(screen.getByText('Workshops')).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: 'View schedule' }),
        ).toHaveAttribute('href', '#schedule');
    });

    it('renders the daily experience rhythm', () => {
        render(<ExperienceSection />);

        expect(screen.getByLabelText('Experience rhythm')).toBeInTheDocument();
        expect(screen.getByText('Morning talks')).toBeInTheDocument();
        expect(screen.getByText('Shared lunch')).toBeInTheDocument();
        expect(screen.getByText('Afternoon sessions')).toBeInTheDocument();
        expect(screen.getByText('Evening community')).toBeInTheDocument();
    });
});
