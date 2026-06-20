import { render, screen } from '@testing-library/react';
import { Toast } from 'radix-ui';
import type { ReactElement } from 'react';

import { Notifications } from '@/components/Notifications';
import type { Notification } from '@/lib/notifications';

function renderNotification(
    notification: Notification,
    open = true,
): ReturnType<typeof render> {
    function Wrapper(): ReactElement {
        return (
            <Toast.Provider>
                <Notifications
                    notification={notification}
                    onOpenChange={() => {}}
                    open={open}
                />
            </Toast.Provider>
        );
    }

    return render(<Wrapper />);
}

describe('Notifications', () => {
    it('renders the title and description when open', () => {
        renderNotification({
            description: 'Your changes are saved',
            title: 'Saved',
        });

        expect(screen.getByText('Saved')).toBeInTheDocument();
        expect(screen.getByText('Your changes are saved')).toBeInTheDocument();
    });

    it('omits the description when none is provided', () => {
        renderNotification({ title: 'Dark Mode On' });

        expect(screen.getByText('Dark Mode On')).toBeInTheDocument();
        expect(
            screen.queryByText('Your changes are saved'),
        ).not.toBeInTheDocument();
    });
});
