import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import { Tabs } from 'radix-ui';
import {
    Children,
    createContext,
    isValidElement,
    useContext,
    useMemo,
    useState,
} from 'react';
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';

import { Avatar } from '@/components/Avatar';
import { focusVisibleClassName } from '@/lib/focusVisible';
import { cn } from '@/lib/utils';
import type { ScheduleItemKind } from '@/types/schedule';

type ScheduleRootProps = ComponentPropsWithoutRef<typeof Tabs.Root>;

type ScheduleListProps = {
    'aria-label': string;
    children: ReactNode;
    className?: string;
};

type ScheduleDayProps = {
    children: ReactNode;
    date: string;
    label: string;
    value: string;
};

type ScheduleItemProps = {
    children: ReactNode;
    className?: string;
    end: string;
    kind?: ScheduleItemKind;
    speaker?: string;
    speakerName?: string;
    speakerPhotoUrl?: string;
    start: string;
};

type ParsedScheduleDay = {
    children: ReactNode;
    date: string;
    label: string;
    value: string;
};

type ScheduleComponent = {
    (props: ScheduleRootProps): ReactElement;
    Day: (props: ScheduleDayProps) => ReactElement | null;
    Item: (props: ScheduleItemProps) => ReactElement;
    List: (props: ScheduleListProps) => ReactElement;
};

const ScheduleRootContext = createContext<
    Omit<ScheduleRootProps, 'children' | 'className'>
>({});

const scheduleDayDisplayName = 'ScheduleDay';

const schedulePanelTransition = {
    duration: 0.24,
    ease: [0.16, 1, 0.3, 1],
} as const;

const scheduleItemTransition = {
    duration: 0.22,
    ease: 'easeOut',
} as const;

const scheduleTabTapTransition = {
    duration: 0.18,
    ease: 'easeOut',
} as const;

function createSchedulePanelVariants(
    shouldReduceMotion: boolean | null,
): Variants {
    return {
        hidden: {
            opacity: shouldReduceMotion ? 1 : 0,
            y: shouldReduceMotion ? 0 : 12,
        },
        visible: {
            opacity: 1,
            transition: shouldReduceMotion ? { duration: 0 } : schedulePanelTransition,
            y: 0,
        },
    };
}

function createScheduleListVariants(
    shouldReduceMotion: boolean | null,
): Variants {
    return {
        hidden: {},
        visible: {
            transition: shouldReduceMotion
                ? { duration: 0 }
                : {
                      delayChildren: 0.04,
                      staggerChildren: 0.04,
                  },
        },
    };
}

function createScheduleItemVariants(
    shouldReduceMotion: boolean | null,
): Variants {
    return {
        hidden: {
            opacity: shouldReduceMotion ? 1 : 0,
            y: shouldReduceMotion ? 0 : 8,
        },
        visible: {
            opacity: 1,
            transition: shouldReduceMotion ? { duration: 0 } : scheduleItemTransition,
            y: 0,
        },
    };
}

function isScheduleDayElement(
    child: ReactNode,
): child is ReactElement<ScheduleDayProps> {
    return (
        isValidElement(child) &&
        (child.type as { displayName?: string }).displayName ===
            scheduleDayDisplayName
    );
}

function parseScheduleDays(children: ReactNode): ParsedScheduleDay[] {
    return Children.toArray(children).flatMap((child) => {
        if (!isScheduleDayElement(child)) {
            return [];
        }

        return [
            {
                value: child.props.value,
                label: child.props.label,
                date: child.props.date,
                children: child.props.children,
            },
        ];
    });
}

function formatTimeRange(start: string, end: string): string {
    return `${start} – ${end}`;
}

const scheduleItemKindClassNames: Record<ScheduleItemKind, string> = {
    break: 'text-(--welcome-fg)/50 italic',
    lunch: 'text-(--welcome-fg)/50 italic',
    registration: 'text-(--welcome-fg)',
    session: 'text-(--welcome-fg)',
    social: 'font-display text-lg font-bold tracking-wide text-accent uppercase',
};

function ScheduleRoot({
    children,
    className,
    ...tabProps
}: ScheduleRootProps): ReactElement {
    return (
        <ScheduleRootContext.Provider value={tabProps}>
            <div className={cn('grid gap-6', className)}>{children}</div>
        </ScheduleRootContext.Provider>
    );
}

function ScheduleList({
    'aria-label': ariaLabel,
    children,
    className,
}: ScheduleListProps): ReactElement {
    const tabProps = useContext(ScheduleRootContext);
    const days = useMemo(() => parseScheduleDays(children), [children]);
    const defaultActiveDay =
        tabProps.value ??
        tabProps.defaultValue ??
        days[0]?.value ??
        '';
    const [activeDay, setActiveDay] = useState(defaultActiveDay);
    const shouldReduceMotion = useReducedMotion();
    const panelVariants = useMemo(
        () => createSchedulePanelVariants(shouldReduceMotion),
        [shouldReduceMotion],
    );
    const listVariants = useMemo(
        () => createScheduleListVariants(shouldReduceMotion),
        [shouldReduceMotion],
    );
    const isControlled = tabProps.value !== undefined;

    function handleValueChange(nextValue: string): void {
        if (!isControlled) {
            setActiveDay(nextValue);
        }

        tabProps.onValueChange?.(nextValue);
    }

    const resolvedActiveDay = isControlled ? tabProps.value ?? '' : activeDay;

    return (
        <Tabs.Root
            {...tabProps}
            onValueChange={handleValueChange}
            value={resolvedActiveDay}
        >
            <Tabs.List
                aria-label={ariaLabel}
                className={cn(
                    'flex flex-wrap gap-x-6 gap-y-2 border-b border-(--welcome-fg)/15 pb-4',
                    className,
                )}
            >
                {days.map((day) => (
                    <Tabs.Trigger asChild key={day.value} value={day.value}>
                        <m.button
                            className={cn(
                                'group inline-flex items-baseline gap-2 border-b-2 border-transparent pb-1 font-display text-xl leading-none font-bold tracking-wide text-(--welcome-fg)/45 uppercase transition-colors data-[state=active]:border-accent data-[state=active]:text-(--welcome-fg)',
                                focusVisibleClassName,
                            )}
                            type="button"
                            whileTap={
                                shouldReduceMotion ? undefined : { scale: 0.98 }
                            }
                            transition={scheduleTabTapTransition}
                        >
                            <span>{day.label}</span>
                            <span
                                aria-hidden="true"
                                className="text-(--welcome-fg)/30 group-data-[state=active]:text-(--welcome-fg)/50"
                            >
                                //
                            </span>
                            <span className="text-base font-medium tracking-[0.12em] text-(--welcome-fg)/60 group-data-[state=active]:text-(--welcome-fg)/80">
                                {day.date}
                            </span>
                        </m.button>
                    </Tabs.Trigger>
                ))}
            </Tabs.List>

            <AnimatePresence initial={false} mode="wait">
                {days.map((day) =>
                    resolvedActiveDay === day.value ? (
                        <Tabs.Content
                            asChild
                            forceMount
                            key={day.value}
                            tabIndex={-1}
                            value={day.value}
                        >
                            <m.div
                                animate="visible"
                                className="grid outline-none focus-visible:outline-none"
                                exit="hidden"
                                initial="hidden"
                                variants={panelVariants}
                            >
                                <m.ol
                                    animate="visible"
                                    className="grid divide-y divide-(--welcome-fg)/10"
                                    initial="hidden"
                                    variants={listVariants}
                                >
                                    {day.children}
                                </m.ol>
                            </m.div>
                        </Tabs.Content>
                    ) : null,
                )}
            </AnimatePresence>
        </Tabs.Root>
    );
}

function ScheduleDay(_props: ScheduleDayProps): null {
    return null;
}

ScheduleDay.displayName = scheduleDayDisplayName;

function ScheduleItem({
    children,
    className,
    end,
    kind = 'session',
    speaker,
    speakerName,
    speakerPhotoUrl,
    start,
}: ScheduleItemProps): ReactElement {
    const shouldReduceMotion = useReducedMotion();
    const itemVariants = useMemo(
        () => createScheduleItemVariants(shouldReduceMotion),
        [shouldReduceMotion],
    );
    const title =
        typeof children === 'string' ? children : String(children ?? '');
    const showSpeakerRow = kind === 'session' && speaker;

    return (
        <m.li
            className={cn(
                'grid gap-2 py-4 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-6',
                showSpeakerRow ? 'sm:items-start' : 'sm:items-baseline',
                className,
            )}
            variants={itemVariants}
        >
            <p
                aria-label={`${start} to ${end}`}
                className="font-mono text-sm leading-6 text-(--welcome-fg)/60 tabular-nums"
            >
                {formatTimeRange(start, end)}
            </p>

            <div
                className={cn(
                    'text-sm leading-6 sm:text-base sm:leading-7',
                    scheduleItemKindClassNames[kind],
                )}
            >
                {showSpeakerRow ? (
                    <div className="flex items-start gap-3">
                        {speakerName ? (
                            <Avatar
                                className="mt-0.5 shrink-0"
                                name={speakerName}
                                size="sm"
                                src={speakerPhotoUrl}
                            />
                        ) : null}
                        <div className="min-w-0">
                            <span>{title}</span>
                            <span aria-hidden="true"> // </span>
                            <span className="font-mono text-xs tracking-[0.08em] text-(--welcome-fg)/70 uppercase sm:text-sm">
                                {speaker}
                            </span>
                        </div>
                    </div>
                ) : (
                    title
                )}
            </div>
        </m.li>
    );
}

export const Schedule = Object.assign(ScheduleRoot, {
    Day: ScheduleDay,
    Item: ScheduleItem,
    List: ScheduleList,
}) as ScheduleComponent;

export type {
    ScheduleDayProps,
    ScheduleItemProps,
    ScheduleListProps,
    ScheduleRootProps,
};
