import { render, screen } from '@testing-library/react';

import { SponsorsSection } from '@/components/sections/SponsorsSection';

describe('SponsorsSection', () => {
    it('renders sponsor facts and download actions', () => {
        render(<SponsorsSection />);

        expect(
            screen.getByRole('heading', { level: 2, name: 'Sponsors' }),
        ).toBeInTheDocument();
        expect(document.getElementById('sponsors')).toBeInTheDocument();
        expect(screen.getByText('750+')).toBeInTheDocument();
        expect(screen.getByText('Speakers')).toBeInTheDocument();
        expect(screen.getByText('20+')).toBeInTheDocument();
        expect(screen.getByText('30+')).toBeInTheDocument();
        expect(screen.getByText('1.2M+')).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: 'Download sponsor prospectus' }),
        ).toHaveAttribute(
            'href',
            '/laracon-eu-2027-sponsorship-opportunities.pdf',
        );
        expect(
            screen.getByRole('link', { name: 'Contact sales' }),
        ).toHaveAttribute('href', 'mailto:sales@laracon.eu');
    });

    it('renders the sponsor event details', () => {
        render(<SponsorsSection />);

        expect(screen.getAllByText(/Amsterdam/)).toHaveLength(2);
        expect(screen.getByText(/6-7 April/)).toBeInTheDocument();
        expect(screen.getByText(/Kromhouthal/)).toBeInTheDocument();
    });
});
