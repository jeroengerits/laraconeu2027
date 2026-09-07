import { render, screen } from '@testing-library/react';

import { ExperienceSection } from '@/components/sections/ExperienceSection';

describe('ExperienceSection', () => {
    it('renders experience highlights without a schedule call to action', () => {
        render(<ExperienceSection />);

        expect(
            screen.getByRole('heading', { level: 2, name: 'Experience' }),
        ).toBeInTheDocument();
        expect(document.getElementById('about')).toBeInTheDocument();
        expect(screen.getByText('Main stage')).toBeInTheDocument();
        expect(screen.getByText('Round tables')).toBeInTheDocument();
        expect(screen.getByText('Workshops')).toBeInTheDocument();
        expect(screen.getByText('After party')).toBeInTheDocument();
        expect(screen.getAllByText('Requires a separate ticket')).toHaveLength(
            2,
        );
        expect(screen.queryByText('01')).not.toBeInTheDocument();
        expect(screen.queryByText('02')).not.toBeInTheDocument();
        expect(screen.queryByText('03')).not.toBeInTheDocument();
        expect(screen.queryByText('04')).not.toBeInTheDocument();
        expect(screen.getByText('5 April 2027')).toBeInTheDocument();
        expect(screen.getAllByText('6–7 April 2027')).toHaveLength(2);
        expect(screen.getByText('7 April 2027')).toBeInTheDocument();
        expect(
            screen.queryByRole('link', { name: 'View schedule' }),
        ).not.toBeInTheDocument();
    });

    it('does not render the removed rhythm sidebar', () => {
        render(<ExperienceSection />);

        expect(
            screen.queryByLabelText('Experience rhythm'),
        ).not.toBeInTheDocument();
    });
});
