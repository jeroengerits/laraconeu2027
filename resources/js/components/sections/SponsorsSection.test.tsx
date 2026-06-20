import { render, screen } from '@testing-library/react';

import { SponsorsSection } from '@/components/sections/SponsorsSection';

describe('SponsorsSection', () => {
    it('renders sponsor tiers and the sponsor call to action', () => {
        render(<SponsorsSection />);

        expect(
            screen.getByRole('heading', { level: 2, name: 'Sponsors' }),
        ).toBeInTheDocument();
        expect(document.getElementById('sponsors')).toBeInTheDocument();
        expect(screen.getByText('Principal')).toBeInTheDocument();
        expect(screen.getByText('Community')).toBeInTheDocument();
        expect(screen.getByText('Supporter')).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: 'Sponsor the event' }),
        ).toHaveAttribute('href', 'mailto:sponsors@laracon.eu');
    });

    it('renders the sponsor audience signals', () => {
        render(<SponsorsSection />);

        expect(screen.getByLabelText('Sponsor audience')).toBeInTheDocument();
        expect(screen.getByText('Laravel ecosystem')).toBeInTheDocument();
        expect(screen.getByText('European audience')).toBeInTheDocument();
        expect(screen.getByText('Senior developers')).toBeInTheDocument();
        expect(screen.getByText('Product builders')).toBeInTheDocument();
    });
});
