import { render, screen, within } from '@testing-library/react';

import { Timeline } from '@/components/Timeline';
import { TimeRange } from '@/components/TimeRange';

describe('Timeline', () => {
    it('renders list items with meta and content regions', () => {
        render(
            <Timeline stagger={false}>
                <Timeline.Item meta={<TimeRange end="09:15" start="08:30" />}>
                    Registration
                </Timeline.Item>
            </Timeline>,
        );

        const list = screen.getByRole('list');
        const items = within(list).getAllByRole('listitem');

        expect(items).toHaveLength(1);
        expect(within(list).getByText('Registration')).toBeInTheDocument();
        expect(within(list).getByLabelText('08:30 to 09:15')).toBeInTheDocument();
    });
});
