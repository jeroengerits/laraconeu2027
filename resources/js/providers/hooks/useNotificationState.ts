import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { emptyNotification } from '@/lib/notifications';
import type { Notification } from '@/lib/notifications';

type NotificationState = {
    notification: Notification;
    notify: (notification: Notification) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
};

const NOTIFICATION_REOPEN_DELAY = 100;

export function useNotificationState(): NotificationState {
    const [notification, setNotification] =
        useState<Notification>(emptyNotification);
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
