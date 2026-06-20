import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AnimatedTabs } from '@/components/AnimatedTabs';

const tabs = [
    {
        value: 'day-1',
        label: 'DAY 1',
        subtitle: '5 APRIL',
        content: <p>Day one content</p>,
    },
    {
        value: 'day-2',
        label: 'DAY 2',
        subtitle: '6 APRIL',
        content: <p>Day two content</p>,
    },
] as const;

describe('AnimatedTabs', () => {
    it('renders tabs and shows the default panel', () => {
        render(
            <AnimatedTabs
                aria-label="Example tabs"
                defaultValue="day-1"
                tabs={[...tabs]}
            />,
        );

        expect(screen.getByRole('tab', { name: /DAY 1/i })).toBeInTheDocument();
        expect(screen.getByText('Day one content')).toBeInTheDocument();
        expect(screen.queryByText('Day two content')).not.toBeInTheDocument();
    });

    it('switches panels when a tab is selected', async () => {
        const user = userEvent.setup();

        render(
            <AnimatedTabs
                aria-label="Example tabs"
                defaultValue="day-1"
                tabs={[...tabs]}
            />,
        );

        await user.click(screen.getByRole('tab', { name: /DAY 2/i }));

        expect(screen.getByText('Day two content')).toBeInTheDocument();
        expect(screen.queryByText('Day one content')).not.toBeInTheDocument();
    });

    it('switches panels when a tab is focused and activated with the keyboard', async () => {
        const user = userEvent.setup();

        render(
            <AnimatedTabs
                aria-label="Example tabs"
                defaultValue="day-1"
                tabs={[...tabs]}
            />,
        );

        await user.click(screen.getByRole('tab', { name: /DAY 1/i }));
        await user.keyboard('{ArrowRight}');

        expect(screen.getByText('Day two content')).toBeInTheDocument();
        expect(screen.queryByText('Day one content')).not.toBeInTheDocument();
    });

    it('exposes a labelled tablist', () => {
        render(
            <AnimatedTabs
                aria-label="Example tabs"
                defaultValue="day-1"
                tabs={[...tabs]}
            />,
        );

        expect(
            screen.getByRole('tablist', { name: 'Example tabs' }),
        ).toBeInTheDocument();
    });

    it('supports a sticky tab header below the top navigation', () => {
        const { container } = render(
            <AnimatedTabs
                aria-label="Example tabs"
                defaultValue="day-1"
                stickyHeader
                tabs={[...tabs]}
            />,
        );

        expect(
            container.querySelector('.animated-tabs-sticky-header'),
        ).toBeInTheDocument();
    });

    it('uses the editorial grid tab treatment', () => {
        const { container } = render(
            <AnimatedTabs
                aria-label="Example tabs"
                defaultValue="day-1"
                tabs={[...tabs]}
            />,
        );

        expect(
            container.querySelector('.animated-tabs-editorial-track'),
        ).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: /DAY 1/i })).toHaveClass(
            'font-display',
            'rounded-none',
        );
    });
});
