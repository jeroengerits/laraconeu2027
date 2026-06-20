import { m, useReducedMotion } from 'motion/react';
import { createContext, useContext, useMemo } from 'react';
import type { ReactElement, ReactNode } from 'react';

import {
    createStaggerItemVariants,
    createStaggerListVariants,
} from '@/lib/motion/staggerVariants';
import { cn } from '@/lib/utils';

type TimelineRootProps = {
    children: ReactNode;
    className?: string;
    stagger?: boolean;
};

type TimelineItemProps = {
    align?: 'baseline' | 'start';
    children: ReactNode;
    className?: string;
    contentClassName?: string;
    meta: ReactNode;
};

type TimelineComponent = {
    (props: TimelineRootProps): ReactElement;
    Item: (props: TimelineItemProps) => ReactElement;
};

const TimelineStaggerContext = createContext(true);

function TimelineRoot({
    children,
    className,
    stagger = true,
}: TimelineRootProps): ReactElement {
    const shouldReduceMotion = useReducedMotion();
    const listVariants = useMemo(
        () => createStaggerListVariants(shouldReduceMotion),
        [shouldReduceMotion],
    );

    if (!stagger) {
        return (
            <TimelineStaggerContext.Provider value={false}>
                <ol
                    className={cn(
                        'grid divide-y divide-(--welcome-fg)/10',
                        className,
                    )}
                >
                    {children}
                </ol>
            </TimelineStaggerContext.Provider>
        );
    }

    return (
        <TimelineStaggerContext.Provider value={true}>
            <m.ol
                animate="visible"
                className={cn(
                    'grid divide-y divide-(--welcome-fg)/10',
                    className,
                )}
                initial="hidden"
                variants={listVariants}
            >
                {children}
            </m.ol>
        </TimelineStaggerContext.Provider>
    );
}

function TimelineItem({
    align = 'baseline',
    children,
    className,
    contentClassName,
    meta,
}: TimelineItemProps): ReactElement {
    const stagger = useContext(TimelineStaggerContext);
    const shouldReduceMotion = useReducedMotion();
    const itemVariants = useMemo(
        () => createStaggerItemVariants(shouldReduceMotion),
        [shouldReduceMotion],
    );
    const itemClassName = cn(
        'grid gap-2 py-4 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-6',
        align === 'start' ? 'sm:items-start' : 'sm:items-baseline',
        className,
    );
    const content = (
        <>
            {meta}
            <div className={cn('min-w-0', contentClassName)}>{children}</div>
        </>
    );

    if (!stagger) {
        return <li className={itemClassName}>{content}</li>;
    }

    return (
        <m.li className={itemClassName} variants={itemVariants}>
            {content}
        </m.li>
    );
}

export const Timeline = Object.assign(TimelineRoot, {
    Item: TimelineItem,
}) as TimelineComponent;

export type { TimelineItemProps, TimelineRootProps };
