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

type NavigationLayoutMotion = {
    layout: boolean;
    transition: typeof navigationLayoutTransition | undefined;
};

function useNavigationLayoutMotion(): NavigationLayoutMotion {
    const shouldReduceMotion = useReducedMotion();

    return {
        layout: !shouldReduceMotion,
        transition: shouldReduceMotion ? undefined : navigationLayoutTransition,
    };
}

export function TopNavigationStart({
    children,
    className,
    ...props
}: TopNavigationSectionProps): ReactElement {
    const layoutMotion = useNavigationLayoutMotion();

    return (
        <m.div
            className={cn(
                'col-start-1 flex min-w-0 items-stretch gap-0 justify-self-start',
                className,
            )}
            {...layoutMotion}
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
    const layoutMotion = useNavigationLayoutMotion();

    return (
        <m.nav
            aria-label="Primary"
            className={cn(
                'col-start-2 hidden h-full items-stretch justify-center justify-self-center lg:flex',
                className,
            )}
            {...layoutMotion}
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
    const layoutMotion = useNavigationLayoutMotion();

    return (
        <m.div
            className={cn(
                'col-start-3 flex items-center gap-0 justify-self-end',
                className,
            )}
            {...layoutMotion}
            {...props}
        >
            {children}
        </m.div>
    );
}
