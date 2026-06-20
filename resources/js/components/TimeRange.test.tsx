import { render, screen } from '@testing-library/react';

import { TimeRange } from '@/components/TimeRange';

describe('TimeRange', () => {
    it('formats and renders a readable time range', () => {
        render(<TimeRange end="09:15" start="08:30" />);

        expect(screen.getByText('08:30 – 09:15')).toBeInTheDocument();
    });

    it('exposes an accessible label for assistive technology', () => {
        render(<TimeRange end="10:00" start="09:30" />);

        expect(screen.getByLabelText('09:30 to 10:00')).toBeInTheDocument();
    });
});
