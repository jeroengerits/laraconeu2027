import { render, screen } from '@testing-library/react';

import { CallForSpeakersSection } from '@/components/sections/CallForSpeakersSection';

describe('CallForSpeakersSection', () => {
    it('renders the speaker call to action', () => {
        render(<CallForSpeakersSection />);

        expect(
            screen.getByRole('heading', {
                level: 2,
                name: 'Call for speakers',
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: 'Submit your talk' }),
        ).toHaveAttribute('href', 'mailto:speakers@laracon.eu');
    });
});
