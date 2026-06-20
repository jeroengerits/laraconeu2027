import { render, screen } from '@testing-library/react';

import { LocationSection } from '@/components/sections/LocationSection';

describe('LocationSection', () => {
    it('renders location details and the city map call to action', () => {
        render(<LocationSection />);

        expect(
            screen.getByRole('heading', { level: 2, name: 'Location' }),
        ).toBeInTheDocument();
        expect(document.getElementById('location')).toBeInTheDocument();
        expect(screen.getByText('Amsterdam venue')).toBeInTheDocument();
        expect(screen.getByText('Amsterdam')).toBeInTheDocument();
        expect(screen.getByText('AMS')).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: 'View city map' }),
        ).toHaveAttribute(
            'href',
            'https://www.google.com/maps/search/?api=1&query=Amsterdam%2C%20Netherlands',
        );
    });

    it('renders travel notes for attendees', () => {
        render(<LocationSection />);

        expect(screen.getByLabelText('Travel notes')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Book accommodation near Amsterdam Centraal or the metro ring',
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Expect public transport and cycling to be the easiest local options',
            ),
        ).toBeInTheDocument();
    });
});
