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
                'Gedempt Hamerkanaal, Amsterdam Noord, Netherlands.',
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
        expect(screen.getByText("Loetje aan 't IJ")).toBeInTheDocument();
        expect(screen.getByText('Tolhuistuin')).toBeInTheDocument();
        expect(screen.getByText('YOTEL Amsterdam')).toBeInTheDocument();
        expect(screen.getByText('BUNK Hotel Amsterdam')).toBeInTheDocument();
        expect(screen.getByText('Tribe Amsterdam City')).toBeInTheDocument();
        expect(screen.getByText('Café de Ceuvel')).toBeInTheDocument();
        expect(screen.getByText('Oedipus Brewing')).toBeInTheDocument();
        expect(screen.getByText('Hangar Amsterdam')).toBeInTheDocument();
        expect(screen.getByText('STRAAT Museum')).toBeInTheDocument();
        expect(screen.getByText('EYE Filmmuseum')).toBeInTheDocument();
        expect(screen.queryByText(/\d.*km from venue/)).not.toBeInTheDocument();
        expect(screen.getAllByText('hotel')).toHaveLength(3);
        expect(screen.getAllByText('restaurant')).toHaveLength(5);
        expect(screen.getAllByText('bar')).toHaveLength(3);
        expect(
            screen.getByRole('region', {
                name: 'Explore the area recommendations',
            }),
        ).toHaveAttribute('tabindex', '0');
    });

    it('offers walking directions from an explicit venue origin to verified addresses', () => {
        render(<LocationSection />);

        const links = screen.getAllByRole('link', {
            name: /Walking directions to/,
        });
        expect(links).toHaveLength(13);

        for (const link of links) {
            const url = new URL(link.getAttribute('href')!);
            expect(url.pathname).toBe('/maps/dir/');
            expect(url.searchParams.get('origin')).toBe(
                'Kromhouthal, Gedempt Hamerkanaal, Amsterdam',
            );
            expect(url.searchParams.get('travelmode')).toBe('walking');
        }

        expect(
            screen.getByRole('link', { name: /directions to BUNK/ }),
        ).toHaveAttribute(
            'href',
            expect.stringContaining('Hagedoornplein%202'),
        );
        expect(
            screen.getByRole('link', { name: /directions to Oedipus/ }),
        ).toHaveAttribute('href', expect.stringContaining('Schaafstraat%2021'));
        expect(
            screen.getByText(/walking distances are not verified here/),
        ).toBeInTheDocument();
    });
});
