import { render, screen } from '@testing-library/react';

import { TicketsSection } from '@/components/sections/TicketsSection';

describe('TicketsSection', () => {
    it('renders ticket tiers and registration call to action', () => {
        render(<TicketsSection />);

        expect(
            screen.getByRole('heading', { level: 2, name: 'Tickets' }),
        ).toBeInTheDocument();
        expect(document.getElementById('tickets')).toBeInTheDocument();
        expect(screen.getByText('Individual')).toBeInTheDocument();
        expect(screen.getByText('Team')).toBeInTheDocument();
        expect(screen.getByText('Community')).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: 'Join ticket list' }),
        ).toHaveAttribute('href', 'mailto:tickets@laracon.eu');
    });

    it('renders ticket inclusion details', () => {
        render(<TicketsSection />);

        expect(screen.getByLabelText('Ticket details')).toBeInTheDocument();
        expect(screen.getByText('Three conference days')).toBeInTheDocument();
        expect(screen.getByText('Main-stage talks')).toBeInTheDocument();
        expect(screen.getByText('Community events')).toBeInTheDocument();
        expect(screen.getByText('Coffee and lunch')).toBeInTheDocument();
    });
});
