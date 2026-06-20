import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';

import { ColorModeToggle } from '@/components/ColorMode';
import { ColorModeProvider } from '@/providers/ColorModeProvider';
import { NotificationProvider } from '@/providers/NotificationProvider';

function renderToggle(): ReturnType<typeof render> {
    function Wrapper(): ReactElement {
        return (
            <NotificationProvider>
                <ColorModeProvider>
                    <ColorModeToggle />
                </ColorModeProvider>
            </NotificationProvider>
        );
    }

    return render(<Wrapper />);
}

describe('ColorModeToggle', () => {
    afterEach(() => {
        document.documentElement.classList.remove('dark');
        window.localStorage.clear();
    });

    it('starts in light mode with a label to switch to dark', () => {
        renderToggle();

        expect(
            screen.getByRole('button', { name: 'Switch to Dark' }),
        ).toBeInTheDocument();
        expect(document.documentElement).not.toHaveClass('dark');
    });

    it('enables dark mode and updates the accessible label when toggled', async () => {
        const user = userEvent.setup();

        renderToggle();
        await user.click(screen.getByRole('button', { name: 'Switch to Dark' }));

        expect(document.documentElement).toHaveClass('dark');
        expect(
            screen.getByRole('button', { name: 'Switch to Light' }),
        ).toBeInTheDocument();
    });
});
