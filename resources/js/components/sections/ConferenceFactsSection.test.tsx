import { render, screen } from '@testing-library/react';

import { ConferenceFactsSection } from '@/components/sections/ConferenceFactsSection';

describe('ConferenceFactsSection', () => {
    it('renders the conference facts strip with key event details', () => {
        render(<ConferenceFactsSection />);

        expect(
            screen.getByRole('heading', {
                level: 2,
                name: 'Conference facts',
            }),
        ).toBeInTheDocument();
        expect(document.getElementById('conference-facts')).toBeInTheDocument();
        expect(screen.getByText('Apr 5-7')).toBeInTheDocument();
        expect(screen.getByText('Amsterdam')).toBeInTheDocument();
        expect(screen.getByText('3 days')).toBeInTheDocument();
        expect(screen.getByText('Laravel')).toBeInTheDocument();
    });
});
