import type { Variants } from 'motion/react';
import { m, useInView, useReducedMotion } from 'motion/react';
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';
import {
    Children,
    createContext,
    isValidElement,
    memo,
    useContext,
    useMemo,
    useRef,
} from 'react';

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

type ScheduleMotionContextValue = {
    avatarVariants: Variants;
    contentVariants: Variants;
    rowVariants: Variants;
    shouldReduceMotion: boolean | null;
};

type ScheduleComponent = {
    (props: ScheduleRootProps): ReactElement;
    Day: (props: ScheduleDayProps) => ReactElement | null;
    Item: (props: ScheduleItemProps) => ReactElement;
    List: (props: ScheduleListProps) => ReactElement;
};

const SCHEDULE_AGENDA_CLASS =
    'grid list-none divide-y divide-canvas-foreground/10 p-0';

const SCHEDULE_ITEM_BASE_CLASS =
    'grid gap-1 py-4 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:items-start sm:gap-x-6 sm:gap-y-0';

const SCHEDULE_ITEM_CONTENT_CLASS =
    'min-w-0 text-sm leading-6 sm:text-base sm:leading-7';

const scheduleDayDisplayName = 'ScheduleDay';

const scheduleItemKindClassNames: Record<ScheduleItemKind, string> = {
    break: 'text-muted-foreground italic',
    lunch: 'text-muted-foreground italic',
    registration: 'text-canvas-foreground',
    session: 'text-canvas-foreground',
    social: 'font-display text-lg font-bold tracking-wide text-accent uppercase',
};

const ScheduleRootContext = createContext<
    Omit<ScheduleRootProps, 'children' | 'className'>
>({});

const ScheduleMotionContext = createContext<ScheduleMotionContextValue>({
    avatarVariants: {},
    contentVariants: {},
    rowVariants: {},
    shouldReduceMotion: null,
});

function scheduleTimeClassName(
    kind: ScheduleItemKind,
    showSpeakerRow: boolean,
): string {
    if (showSpeakerRow) {
        return 'self-start sm:pt-2';
    }

    if (kind === 'social') {
        return 'self-start sm:pt-1';
    }

    return 'self-start sm:pt-0.5';
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
    avatarVariants,
    className,
    contentVariants,
    rowVariants,
    shouldReduceMotion,
    speaker,
    speakerName,
    speakerPhotoUrl,
    title,
}: {
    avatarVariants: Variants;
    className?: string;
    contentVariants: Variants;
    rowVariants: Variants;
    shouldReduceMotion: boolean | null;
    speaker: string;
    speakerName?: string;
    speakerPhotoUrl?: string;
    title: string;
}): ReactElement {
    const sessionClassName = cn(
        'flex items-start gap-3 sm:gap-4',
        className,
    );

    if (shouldReduceMotion) {
        return (
            <div className={sessionClassName}>
                <Avatar name={speakerName} size="lg" src={speakerPhotoUrl} />
                <div className="min-w-0 grid gap-1">
                    <p className="text-base leading-snug font-bold text-canvas-foreground sm:text-lg">
                        {title}
                    </p>
                    <p className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase sm:text-sm">
                        {speaker}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <m.div className={sessionClassName} variants={rowVariants}>
            <m.div className="shrink-0" variants={avatarVariants}>
                <Avatar name={speakerName} size="lg" src={speakerPhotoUrl} />
            </m.div>
            <m.div className="min-w-0 grid gap-1" variants={contentVariants}>
                <p className="text-base leading-snug font-bold text-canvas-foreground sm:text-lg">
                    {title}
                </p>
                <p className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase sm:text-sm">
                    {speaker}
                </p>
            </m.div>
        </m.div>
    );
}

function ScheduleAgenda({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}): ReactElement {
    const shouldReduceMotion = useReducedMotion();
    const motionContext = useMemo<ScheduleMotionContextValue>(
        () => ({
            avatarVariants:
                createScheduleSessionAvatarVariants(shouldReduceMotion),
            contentVariants:
                createScheduleSessionContentVariants(shouldReduceMotion),
            rowVariants: createScheduleSessionRowVariants(shouldReduceMotion),
            shouldReduceMotion,
        }),
        [shouldReduceMotion],
    );
    const agendaClassName = cn(SCHEDULE_AGENDA_CLASS, className);

    return (
        <ScheduleMotionContext.Provider value={motionContext}>
            <ol className={agendaClassName}>{children}</ol>
        </ScheduleMotionContext.Provider>
    );
}

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
    const tabs = useMemo<AnimatedTabItem[]>(
        () =>
            days.map((day) => ({
                value: day.value,
                label: day.label,
                subtitle: day.date,
                content: <ScheduleAgenda>{day.children}</ScheduleAgenda>,
            })),
        [days],
    );

    return (
        <AnimatedTabs
            {...tabProps}
            aria-label={ariaLabel}
            listClassName={className}
            showSubtitleOnTrigger={false}
            stickyHeader
            tabs={tabs}
        />
    );
}

function ScheduleDay(props: ScheduleDayProps): null {
    void props;

    return null;
}

ScheduleDay.displayName = scheduleDayDisplayName;

const ScheduleItem = memo(function ScheduleItem({
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
    const itemRef = useRef<HTMLLIElement>(null);
    const isInView = useInView(itemRef, scheduleItemViewport);
    const {
        avatarVariants,
        contentVariants,
        rowVariants,
        shouldReduceMotion,
    } = useContext(ScheduleMotionContext);
    const itemVariants = useMemo(
        () => createSpeakerItemEnterVariants(shouldReduceMotion),
        [shouldReduceMotion],
    );
    const title = scheduleItemTitle(children);
    const showSpeakerRow = kind === 'session' && Boolean(speaker);
    const itemClassName = cn(SCHEDULE_ITEM_BASE_CLASS, className);
    const contentClassNames = cn(
        SCHEDULE_ITEM_CONTENT_CLASS,
        scheduleItemKindClassNames[kind],
        contentClassName,
    );
    const content = (
        <>
            <TimeRange
                className={scheduleTimeClassName(kind, showSpeakerRow)}
                end={end}
                start={start}
            />
            {showSpeakerRow && speaker ? (
                <ScheduleSessionContent
                    avatarVariants={avatarVariants}
                    className={contentClassNames}
                    contentVariants={contentVariants}
                    rowVariants={rowVariants}
                    shouldReduceMotion={shouldReduceMotion}
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

    if (shouldReduceMotion) {
        return (
            <li className={itemClassName} ref={itemRef}>
                {content}
            </li>
        );
    }

    return (
        <m.li
            ref={itemRef}
            animate={isInView ? 'visible' : 'hidden'}
            className={itemClassName}
            initial="hidden"
            variants={itemVariants}
        >
            {content}
        </m.li>
    );
});

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
