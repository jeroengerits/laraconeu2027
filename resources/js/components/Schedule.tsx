import { m, useReducedMotion } from 'motion/react';
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';
import {
    Children,
    createContext,
    isValidElement,
    useCallback,
    useContext,
    useMemo,
    useRef,
} from 'react';

import { AnimatedListItem } from '@/components/AnimatedListItem';
import { AnimatedTabs } from '@/components/AnimatedTabs';
import type { AnimatedTabItem } from '@/components/AnimatedTabs';
import { Avatar } from '@/components/Avatar';
import { TimeRange } from '@/components/TimeRange';
import {
    createScheduleSessionAvatarVariants,
    createScheduleSessionContentVariants,
    createScheduleSessionRowVariants,
    createSpeakerItemEnterVariants,
    scheduleItemViewport,
} from '@/lib/motionVariants';
import { cn } from '@/lib/utils';
import type { ScheduleItemKind } from '@/types/schedule';

type ScheduleRootProps = Omit<
    ComponentPropsWithoutRef<typeof AnimatedTabs>,
    'aria-label' | 'tabs'
> & {
    children: ReactNode;
};

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
    contentClassName?: string;
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

const SCHEDULE_AGENDA_CLASS =
    'schedule-agenda-grid grid list-none border-t-2 border-canvas-foreground p-0';

const SCHEDULE_ITEM_BASE_CLASS =
    'schedule-agenda-row grid gap-3 border-b border-canvas-foreground/15 py-5 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-0 sm:py-0';

const SCHEDULE_ITEM_TIME_CLASS =
    'schedule-agenda-time self-start border-canvas-foreground/15 sm:border-r sm:px-0 sm:py-6';

const SCHEDULE_ITEM_CONTENT_CLASS =
    'schedule-agenda-content min-w-0 text-sm leading-6 sm:px-6 sm:py-6 sm:text-base sm:leading-7';

const SCHEDULE_TABS_HEADER_CLASS = 'items-center gap-3 sm:justify-center';

const SCHEDULE_TABS_LIST_CLASS = 'max-w-[26rem] justify-center';

const SCHEDULE_TABS_TRIGGER_CLASS =
    'min-h-10 px-3 py-2 text-sm normal-case sm:min-h-11 sm:px-4 sm:text-base';

const scheduleDayDisplayName = 'ScheduleDay';

const scheduleItemKindClassNames: Record<ScheduleItemKind, string> = {
    break: 'bg-surface text-muted-foreground italic',
    lunch: 'bg-surface text-muted-foreground italic',
    registration: 'text-canvas-foreground',
    session: 'text-canvas-foreground',
    social: 'font-display text-lg font-bold tracking-wide text-accent uppercase sm:text-xl',
};

const scheduleItemEnterVariants = createSpeakerItemEnterVariants(false);

const ScheduleRootContext = createContext<
    Omit<ScheduleRootProps, 'children' | 'className'>
>({});

function scheduleTimeClassName(): string {
    return SCHEDULE_ITEM_TIME_CLASS;
}

function scheduleItemTitle(children: ReactNode): string {
    return typeof children === 'string' ? children : String(children ?? '');
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

function ScheduleSessionContent({
    className,
    speaker,
    speakerName,
    speakerPhotoUrl,
    title,
}: {
    className?: string;
    speaker: string;
    speakerName?: string;
    speakerPhotoUrl?: string;
    title: string;
}): ReactElement {
    const shouldReduceMotion = useReducedMotion();
    const sessionClassName = cn(
        'grid items-start gap-4 sm:grid-cols-[4rem_minmax(0,1fr)]',
        className,
    );

    if (shouldReduceMotion) {
        return (
            <div className={sessionClassName}>
                <Avatar name={speakerName} size="lg" src={speakerPhotoUrl} />
                <div className="grid min-w-0 gap-1">
                    <p className="font-display text-xl leading-none font-bold text-balance text-canvas-foreground sm:text-2xl lg:text-3xl">
                        {title}
                    </p>
                    <p className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase sm:text-sm">
                        {speaker}
                    </p>
                </div>
            </div>
        );
    }

    const avatarVariants =
        createScheduleSessionAvatarVariants(shouldReduceMotion);
    const contentVariants =
        createScheduleSessionContentVariants(shouldReduceMotion);
    const rowVariants = createScheduleSessionRowVariants(shouldReduceMotion);

    return (
        <m.div className={sessionClassName} variants={rowVariants}>
            <m.div className="shrink-0" variants={avatarVariants}>
                <Avatar name={speakerName} size="lg" src={speakerPhotoUrl} />
            </m.div>
            <m.div className="grid min-w-0 gap-1" variants={contentVariants}>
                <p className="font-display text-xl leading-none font-bold text-balance text-canvas-foreground sm:text-2xl lg:text-3xl">
                    {title}
                </p>
                <p className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase sm:text-sm">
                    {speaker}
                </p>
            </m.div>
        </m.div>
    );
}

function ScheduleRoot({
    children,
    className,
    onValueChange,
    ...tabProps
}: ScheduleRootProps): ReactElement {
    const rootRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const handleValueChange = useCallback(
        (nextValue: string): void => {
            onValueChange?.(nextValue);
            rootRef.current?.scrollIntoView({
                behavior: shouldReduceMotion ? 'auto' : 'smooth',
                block: 'start',
            });
        },
        [onValueChange, shouldReduceMotion],
    );
    const contextValue = {
        ...tabProps,
        onValueChange: handleValueChange,
    };

    return (
        <ScheduleRootContext.Provider value={contextValue}>
            <div className={cn('grid gap-6', className)} ref={rootRef}>
                {children}
            </div>
        </ScheduleRootContext.Provider>
    );
}

function ScheduleList({
    'aria-label': ariaLabel,
    children,
    className,
}: ScheduleListProps): ReactElement {
    const { headerClassName, ...tabProps } = useContext(ScheduleRootContext);
    const days = useMemo(() => parseScheduleDays(children), [children]);
    const tabs = useMemo<AnimatedTabItem[]>(
        () =>
            days.map((day) => ({
                value: day.value,
                label: day.label,
                content: (
                    <ol className={SCHEDULE_AGENDA_CLASS}>{day.children}</ol>
                ),
            })),
        [days],
    );

    return (
        <AnimatedTabs
            {...tabProps}
            aria-label={ariaLabel}
            headerClassName={cn(SCHEDULE_TABS_HEADER_CLASS, headerClassName)}
            listClassName={cn(SCHEDULE_TABS_LIST_CLASS, className)}
            stickyHeader
            tabs={tabs}
            triggerClassName={SCHEDULE_TABS_TRIGGER_CLASS}
        />
    );
}

function ScheduleDay(props: ScheduleDayProps): null {
    void props;

    return null;
}

ScheduleDay.displayName = scheduleDayDisplayName;

function ScheduleItem({
    children,
    className,
    contentClassName,
    end,
    kind = 'session',
    speaker,
    speakerName,
    speakerPhotoUrl,
    start,
}: ScheduleItemProps): ReactElement {
    const title = scheduleItemTitle(children);
    const showSpeakerRow = kind === 'session' && Boolean(speaker);
    const itemClassName = cn(
        SCHEDULE_ITEM_BASE_CLASS,
        scheduleItemKindClassNames[kind],
        className,
    );
    const contentClassNames = cn(SCHEDULE_ITEM_CONTENT_CLASS, contentClassName);
    const content = (
        <>
            <TimeRange
                className={scheduleTimeClassName()}
                end={end}
                start={start}
            />
            {showSpeakerRow && speaker ? (
                <ScheduleSessionContent
                    className={contentClassNames}
                    speaker={speaker}
                    speakerName={speakerName}
                    speakerPhotoUrl={speakerPhotoUrl}
                    title={title}
                />
            ) : (
                <div className={contentClassNames}>{title}</div>
            )}
        </>
    );

    return (
        <AnimatedListItem
            className={itemClassName}
            variants={scheduleItemEnterVariants}
            viewport={scheduleItemViewport}
        >
            {content}
        </AnimatedListItem>
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
