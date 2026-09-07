import { render, screen } from '@testing-library/react';

import { TicketsSection } from '@/components/sections/TicketsSection';

describe('TicketsSection', () => {
    it('renders ticket tiers and registration call to action', () => {
        render(<TicketsSection />);

        expect(
            screen.getByRole('heading', { level: 2, name: 'Tickets' }),
        ).toBeInTheDocument();
        expect(document.getElementById('tickets')).toBeInTheDocument();
        expect(screen.getByText('Blind Bird')).toBeInTheDocument();
        expect(screen.getByText('Early Bird')).toBeInTheDocument();
        expect(screen.getByText('Regular')).toBeInTheDocument();
        expect(screen.getByText('Workshops')).toBeInTheDocument();
        expect(screen.getByText('€699')).toBeInTheDocument();
        expect(screen.getByText('€799')).toBeInTheDocument();
        expect(screen.getByText('€899')).toBeInTheDocument();
        expect(screen.getAllByText('Coming soon')).toHaveLength(2);
        expect(screen.getByText('Available')).toBeInTheDocument();
        expect(screen.getAllByText('To be announced')).toHaveLength(2);
    });

    it('does not render a separate ticket details column', () => {
        render(<TicketsSection />);

        expect(
            screen.queryByLabelText('Ticket details'),
        ).not.toBeInTheDocument();
    });
});
