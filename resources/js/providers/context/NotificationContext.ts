import { createContext, useContext } from 'react';

import type { Notification } from '@/lib/notifications';

export type NotificationContextValue = {
    notify: (notification: Notification) => void;
};

export const NotificationContext =
    createContext<NotificationContextValue | null>(null);

export function useNotificationDispatcher(): NotificationContextValue {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error(
            'useNotificationDispatcher must be used within a NotificationProvider.',
        );
    }

    return context;
}
