import { m, useReducedMotion } from 'motion/react';
import { Toast } from 'radix-ui';
import type { ReactElement } from 'react';

import type { Notification } from '@/lib/notifications';

type NotificationsProps = {
    notification: Notification;
    onOpenChange: (open: boolean) => void;
    open: boolean;
};

const toastRootClassName =
    'grid w-[min(15rem,calc(100vw-2rem))] border-2 border-canvas-foreground bg-canvas px-3 py-2 text-canvas-foreground shadow-lg outline-none data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x) data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform';

const toastViewportClassName =
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

const reducedMotionToastHiddenState = {
    opacity: 0,
} as const;

export function Notifications({
    notification,
    onOpenChange,
    open,
}: NotificationsProps): ReactElement {
    const shouldReduceMotion = useReducedMotion();
    const hiddenState = shouldReduceMotion
        ? reducedMotionToastHiddenState
        : toastHiddenState;

    return (
        <>
            <Toast.Root
                asChild
                onOpenChange={onOpenChange}
                open={open}
                type="foreground"
            >
                <m.li
                    animate={open ? toastVisibleState : hiddenState}
                    className={toastRootClassName}
                    initial={hiddenState}
                    transition={
                        shouldReduceMotion ? undefined : toastTransition
                    }
                >
                    <Toast.Title className="font-mono text-xs font-semibold tracking-[0.12em] uppercase">
                        {notification.title}
                    </Toast.Title>
                    {notification.description ? (
                        <Toast.Description className="text-xs opacity-75">
                            {notification.description}
                        </Toast.Description>
                    ) : null}
                </m.li>
            </Toast.Root>
            <Toast.Viewport className={toastViewportClassName} />
        </>
    );
}
