import { render, screen } from '@testing-library/react';

import { WordMark } from '@/components/WordMark';

describe('WordMark', () => {
    it('exposes the Laracon EU wordmark with an accessible label', () => {
        render(<WordMark />);

        expect(
            screen.getByRole('img', { name: 'LARACON.EU' }),
        ).toBeInTheDocument();
    });

    it('renders as a level-1 heading', () => {
        render(<WordMark />);

        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('honours a custom accessible label', () => {
        render(<WordMark aria-label="Laracon EU home" />);

        expect(
            screen.getByRole('heading', { level: 1, name: 'Laracon EU home' }),
        ).toBeInTheDocument();
    });
});
