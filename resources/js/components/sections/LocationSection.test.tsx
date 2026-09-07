import { render, screen } from '@testing-library/react';

import { LocationSection } from '@/components/sections/LocationSection';

describe('LocationSection', () => {
    it('renders location details', () => {
        render(<LocationSection />);

        expect(
            screen.getByRole('heading', { level: 2, name: 'Location' }),
        ).toBeInTheDocument();
        expect(document.getElementById('location')).toBeInTheDocument();
        expect(screen.getByText('Kromhouthal')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Gedempt Hamerkanaal 126, 1021 KP Amsterdam, Netherlands.',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    });

    it('renders travel notes for attendees', () => {
        render(<LocationSection />);

        expect(
            screen.getByLabelText('Venue and travel notes'),
        ).toBeInTheDocument();
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

    it('renders nearby food and drink recommendations', () => {
        render(<LocationSection />);

        expect(screen.getByText('Nearby food & drink')).toBeInTheDocument();
        expect(screen.getByText('Pllek')).toBeInTheDocument();
        expect(screen.getByText('Noorderlicht')).toBeInTheDocument();
        expect(screen.getByText('IJver')).toBeInTheDocument();
        expect(screen.getByText('Café de Pont')).toBeInTheDocument();
        expect(screen.getByText("Loetje aan 't IJ")).toBeInTheDocument();
        expect(screen.getByText('Tolhuistuin')).toBeInTheDocument();
        expect(screen.getByText('YOTEL Amsterdam')).toBeInTheDocument();
        expect(screen.getByText('BUNK Hotel Amsterdam')).toBeInTheDocument();
        expect(screen.getByText('Tribe Amsterdam City')).toBeInTheDocument();
        expect(screen.getByText('Café de Ceuvel')).toBeInTheDocument();
        expect(screen.getByText('Skatecafe')).toBeInTheDocument();
        expect(screen.getByText('Oedipus Brewing')).toBeInTheDocument();
        expect(screen.getByText('Hangar Amsterdam')).toBeInTheDocument();
        expect(screen.getByText('STRAAT Museum')).toBeInTheDocument();
        expect(screen.getByText('EYE Filmmuseum')).toBeInTheDocument();
        expect(screen.getByText(/0\.1 km from venue/)).toBeInTheDocument();
        expect(screen.getAllByText('hotel')).toHaveLength(3);
        expect(screen.getAllByText('restaurant')).toHaveLength(5);
        expect(screen.getAllByText('bar')).toHaveLength(5);
        expect(
            screen.getByRole('region', {
                name: 'Explore the area recommendations',
            }),
        ).toHaveAttribute('tabindex', '0');
    });
});
