import { Toast } from 'radix-ui';
import { useMemo } from 'react';
import type { ReactNode } from 'react';

import { Notifications } from '@/components/Notifications';
import {
    NotificationContext,
    useNotifications,
} from '@/hooks/useNotifications';
import type { NotificationContextValue } from '@/hooks/useNotifications';

type NotificationProviderProps = {
    children: ReactNode;
};

export function NotificationProvider({ children }: NotificationProviderProps) {
    const { notification, notify, open, setOpen } = useNotifications();
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
