import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement, ReactNode } from 'react';

import { TopNavigation } from '@/components/TopNavigation';

jest.mock(
    '@inertiajs/react',
    () => ({
        Link: ({
            children,
            href,
        }: {
            children?: ReactNode;
            href?: string;
        }): ReactElement => <a href={href ?? '#'}>{children}</a>,
    }),
    { virtual: true },
);

function renderNavigation(): ReturnType<typeof render> {
    function Wrapper(): ReactElement {
        return (
            <TopNavigation>
                <TopNavigation.MenuButton />
                <TopNavigation.MobileMenu>
                    <a href="#alpha">Alpha</a>
                </TopNavigation.MobileMenu>
            </TopNavigation>
        );
    }

    return render(<Wrapper />);
}

describe('TopNavigation mobile menu', () => {
    it('toggles the menu open from the menu button', async () => {
        const user = userEvent.setup();

        renderNavigation();
        const button = screen.getByRole('button', {
            name: 'Open navigation menu',
        });

        expect(button).toHaveAttribute('aria-expanded', 'false');
        expect(
            screen.queryByRole('navigation', { name: 'Primary' }),
        ).not.toBeInTheDocument();

        await user.click(button);

        expect(
            screen.getByRole('button', { name: 'Close navigation menu' }),
        ).toHaveAttribute('aria-expanded', 'true');
        expect(
            screen.getByRole('navigation', { name: 'Primary' }),
        ).toBeInTheDocument();
    });

    it('closes on Escape and returns focus to the menu button', async () => {
        const user = userEvent.setup();

        renderNavigation();
        await user.click(
            screen.getByRole('button', { name: 'Open navigation menu' }),
        );

        fireEvent.keyDown(screen.getByRole('navigation', { name: 'Primary' }), {
            key: 'Escape',
        });

        const button = screen.getByRole('button', {
            name: 'Open navigation menu',
        });

        expect(button).toHaveAttribute('aria-expanded', 'false');
        expect(button).toHaveFocus();
    });
});
