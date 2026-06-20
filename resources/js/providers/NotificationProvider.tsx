import { Toast } from 'radix-ui';
import type { ReactElement, ReactNode } from 'react';
import { useMemo } from 'react';

import { Notifications } from '@/components/Notifications';
import type { NotificationContextValue } from '@/providers/context/NotificationContext';
import { NotificationContext } from '@/providers/context/NotificationContext';
import { useNotificationState } from '@/hooks/useNotificationState';

type NotificationProviderProps = {
    children: ReactNode;
};

export function NotificationProvider({
    children,
}: NotificationProviderProps): ReactElement {
    const { notification, notify, open, setOpen } = useNotificationState();
    const contextValue = useMemo<NotificationContextValue>(
        () => ({
            notify,
        }),
        [notify],
    );

    return (
        <NotificationContext.Provider value={contextValue}>
            <Toast.Provider duration={1800} swipeDirection="right">
                {children}
                <Notifications
                    notification={notification}
                    onOpenChange={setOpen}
                    open={open}
                />
            </Toast.Provider>
        </NotificationContext.Provider>
    );
}
