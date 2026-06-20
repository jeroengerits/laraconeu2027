import { m, useReducedMotion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';
import type { ReactElement } from 'react';

import { cn } from '@/lib/utils';

export type TopNavigationSectionProps = HTMLMotionProps<'div'>;

export type TopNavigationPrimaryProps = HTMLMotionProps<'nav'>;

const navigationLayoutTransition = {
    duration: 0.22,
    ease: 'easeOut',
} as const;

export function TopNavigationStart({
    children,
    className,
    ...props
}: TopNavigationSectionProps): ReactElement {
    const shouldReduceMotion = useReducedMotion();

    return (
        <m.div
            className={cn(
                'col-start-1 flex min-w-0 items-center gap-2 justify-self-start',
                className,
            )}
            layout={!shouldReduceMotion}
            transition={
                shouldReduceMotion ? undefined : navigationLayoutTransition
            }
            {...props}
        >
            {children}
        </m.div>
    );
}

export function TopNavigationPrimary({
    children,
    className,
    ...props
}: TopNavigationPrimaryProps): ReactElement {
    const shouldReduceMotion = useReducedMotion();

    return (
        <m.nav
            aria-label="Primary"
            className={cn(
                'col-start-2 hidden items-center justify-center gap-x-2 justify-self-center lg:flex',
                className,
            )}
            layout={!shouldReduceMotion}
            transition={
                shouldReduceMotion ? undefined : navigationLayoutTransition
            }
            {...props}
        >
            {children}
        </m.nav>
    );
}

export function TopNavigationEnd({
    children,
    className,
    ...props
}: TopNavigationSectionProps): ReactElement {
    const shouldReduceMotion = useReducedMotion();

    return (
        <m.div
            className={cn(
                'col-start-3 flex items-center gap-2 justify-self-end',
                className,
            )}
            layout={!shouldReduceMotion}
            transition={
                shouldReduceMotion ? undefined : navigationLayoutTransition
            }
            {...props}
        >
            {children}
        </m.div>
    );
}
