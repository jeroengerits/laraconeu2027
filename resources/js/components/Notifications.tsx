import { m } from 'motion/react';
import { Toast } from 'radix-ui';

export type Notification = {
    description?: string;
    title: string;
};

type NotificationsProps = {
    notification: Notification;
    onOpenChange: (open: boolean) => void;
    open: boolean;
};

export const EMPTY_NOTIFICATION: Notification = {
    title: '',
};

const TOAST_ROOT_CLASS_NAME =
    'grid w-[min(15rem,calc(100vw-2rem))] rounded-md border border-current/15 bg-(--welcome-fg) px-3 py-2 text-(--welcome-bg) shadow-lg outline-none data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x) data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform';

const TOAST_VIEWPORT_CLASS_NAME =
    'fixed right-4 bottom-4 z-50 m-0 flex w-auto max-w-[100vw] list-none flex-col gap-2 p-0 outline-none';

const toastVisibleState = {
    opacity: 1,
    scale: 1,
    x: 0,
} as const;

const toastHiddenState = {
    opacity: 0,
    scale: 0.98,
    x: 16,
} as const;

const toastTransition = {
    duration: 0.22,
    ease: [0.16, 1, 0.3, 1],
    type: 'tween',
} as const;

export function Notifications({
    notification,
    onOpenChange,
    open,
}: NotificationsProps) {
    return (
        <>
            <Toast.Root
                asChild
                onOpenChange={onOpenChange}
                open={open}
                type="foreground"
            >
                <m.li
                    animate={open ? toastVisibleState : toastHiddenState}
                    className={TOAST_ROOT_CLASS_NAME}
                    initial={toastHiddenState}
                    transition={toastTransition}
                >
                    <Toast.Title className="text-xs font-semibold">
                        {notification.title}
                    </Toast.Title>
                    {notification.description ? (
                        <Toast.Description className="text-xs opacity-75">
                            {notification.description}
                        </Toast.Description>
                    ) : null}
                </m.li>
            </Toast.Root>
            <Toast.Viewport className={TOAST_VIEWPORT_CLASS_NAME} />
        </>
    );
}
