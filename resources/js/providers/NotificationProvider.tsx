import { Toast } from 'radix-ui';
import { createContext, useMemo } from 'react';
import type { ReactNode } from 'react';

import { Notifications } from '@/components/Notifications';
import type { Notification } from '@/components/Notifications';
import { useNotifications } from '@/hooks/useNotifications';

type NotificationProviderProps = {
    children: ReactNode;
};

export type NotificationContextValue = {
    notify: (notification: Notification) => void;
};

export const NotificationContext =
    createContext<NotificationContextValue | null>(null);

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
