import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { EMPTY_NOTIFICATION } from '@/components/Notifications';
import type { Notification } from '@/components/Notifications';

export type NotificationContextValue = {
    notify: (notification: Notification) => void;
};

export const NotificationContext =
    createContext<NotificationContextValue | null>(null);

const NOTIFICATION_REOPEN_DELAY = 100;

export function useNotifications() {
    const [notification, setNotification] =
        useState<Notification>(EMPTY_NOTIFICATION);
    const [open, setOpen] = useState(false);
    const reopenTimerRef = useRef(0);

    useEffect(() => {
        return () => {
            window.clearTimeout(reopenTimerRef.current);
        };
    }, []);

    const notify = useCallback((nextNotification: Notification): void => {
        setOpen(false);
        window.clearTimeout(reopenTimerRef.current);

        reopenTimerRef.current = window.setTimeout(() => {
            setNotification(nextNotification);
            setOpen(true);
        }, NOTIFICATION_REOPEN_DELAY);
    }, []);

    return useMemo(
        () => ({
            notification,
            notify,
            open,
            setOpen,
        }),
        [notification, notify, open],
    );
}

export function useNotificationDispatcher(): NotificationContextValue {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error(
            'useNotificationDispatcher must be used within a NotificationProvider.',
        );
    }

    return context;
}
