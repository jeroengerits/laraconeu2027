import type { Variants } from 'motion/react';
import { m, useInView } from 'motion/react';
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

import {  AnimatedTabs } from '@/components/AnimatedTabs';
import type {AnimatedTabItem} from '@/components/AnimatedTabs';
import { Avatar } from '@/components/Avatar';
import { TimeRange } from '@/components/TimeRange';
import { scheduleItemViewport, useStaggerMotion } from '@/lib/motionVariants';
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
    animate: boolean;
    itemVariants: Variants;
    shouldReduceMotion: boolean | null;
    speakerItemVariants: Variants;
};

type ScheduleComponent = {
    (props: ScheduleRootProps): ReactElement;
    Day: (props: ScheduleDayProps) => ReactElement | null;
    Item: (props: ScheduleItemProps) => ReactElement;
    List: (props: ScheduleListProps) => ReactElement;
};

const SCHEDULE_AGENDA_CLASS = 'grid divide-y divide-(--welcome-fg)/10';

const SCHEDULE_ITEM_BASE_CLASS =
    'grid gap-2 py-4 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-6';

const SCHEDULE_ITEM_CONTENT_CLASS =
    'min-w-0 text-sm leading-6 sm:text-base sm:leading-7';

const scheduleDayDisplayName = 'ScheduleDay';

const scheduleItemKindClassNames: Record<ScheduleItemKind, string> = {
    break: 'text-(--welcome-fg)/50 italic',
    lunch: 'text-(--welcome-fg)/50 italic',
    registration: 'text-(--welcome-fg)',
    session: 'text-(--welcome-fg)',
    social: 'font-display text-lg font-bold tracking-wide text-accent uppercase',
};

const ScheduleRootContext = createContext<
    Omit<ScheduleRootProps, 'children' | 'className'>
>({});

const ScheduleMotionContext = createContext<ScheduleMotionContextValue>({
    animate: false,
    itemVariants: {},
    shouldReduceMotion: null,
    speakerItemVariants: {},
});

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

const ScheduleSessionContent = memo(function ScheduleSessionContent({
    isVisible,
    speaker,
    speakerName,
    speakerPhotoUrl,
    title,
}: {
    isVisible: boolean;
    speaker: string;
    speakerName?: string;
    speakerPhotoUrl?: string;
    title: string;
}): ReactElement {
    const { animate, shouldReduceMotion, speakerItemVariants } = useContext(
        ScheduleMotionContext,
    );

    const content = (
        <>
            <Avatar
                className="mt-0.5 shrink-0"
                name={speakerName}
                size="sm"
                src={speakerPhotoUrl}
            />
            <div className="min-w-0">
                <span>{title}</span>
                <span aria-hidden="true"> // </span>
                <span className="font-mono text-xs tracking-[0.08em] text-(--welcome-fg)/70 uppercase sm:text-sm">
                    {speaker}
                </span>
            </div>
        </>
    );

    if (shouldReduceMotion || !animate) {
        return <div className="flex items-start gap-3">{content}</div>;
    }

    return (
        <m.div
            animate={isVisible ? 'visible' : 'hidden'}
            className="flex items-start gap-3"
            initial="hidden"
            variants={speakerItemVariants}
        >
            {content}
        </m.div>
    );
});

function ScheduleAgenda({
    children,
    className,
    stagger = true,
}: {
    children: ReactNode;
    className?: string;
    stagger?: boolean;
}): ReactElement {
    const { itemVariants, shouldReduceMotion, speakerItemVariants } =
        useStaggerMotion();
    const motionContext = useMemo<ScheduleMotionContextValue>(
        () => ({
            animate: stagger,
            itemVariants,
            shouldReduceMotion,
            speakerItemVariants,
        }),
        [itemVariants, shouldReduceMotion, speakerItemVariants, stagger],
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
            tabs={tabs}
        />
    );
}

function ScheduleDay(_props: ScheduleDayProps): null {
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
    const { animate, itemVariants, shouldReduceMotion } = useContext(
        ScheduleMotionContext,
    );
    const itemRef = useRef<HTMLLIElement>(null);
    const isInView = useInView(itemRef, scheduleItemViewport);
    const title = scheduleItemTitle(children);
    const showSpeakerRow = kind === 'session' && Boolean(speaker);
    const itemClassName = cn(
        SCHEDULE_ITEM_BASE_CLASS,
        showSpeakerRow ? 'sm:items-start' : 'sm:items-baseline',
        className,
    );
    const content = (
        <>
            <TimeRange end={end} start={start} />
            <div
                className={cn(
                    SCHEDULE_ITEM_CONTENT_CLASS,
                    scheduleItemKindClassNames[kind],
                    contentClassName,
                )}
            >
                {showSpeakerRow && speaker ? (
                    <ScheduleSessionContent
                        isVisible={shouldReduceMotion || isInView}
                        speaker={speaker}
                        speakerName={speakerName}
                        speakerPhotoUrl={speakerPhotoUrl}
                        title={title}
                    />
                ) : (
                    title
                )}
            </div>
        </>
    );

    if (!animate || showSpeakerRow) {
        return (
            <li className={itemClassName} ref={itemRef}>
                {content}
            </li>
        );
    }

    return (
        <m.li
            ref={itemRef}
            animate={shouldReduceMotion || isInView ? 'visible' : 'hidden'}
            className={itemClassName}
            initial={shouldReduceMotion ? false : 'hidden'}
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
