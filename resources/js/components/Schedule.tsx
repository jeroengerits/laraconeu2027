import {
    Children,
    createContext,
    isValidElement,
    useContext,
    useMemo,
} from 'react';
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';

import {
    AnimatedTabs,
    type AnimatedTabItem,
} from '@/components/AnimatedTabs';
import { Avatar } from '@/components/Avatar';
import { Timeline } from '@/components/Timeline';
import { TimeRange } from '@/components/TimeRange';
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

const ScheduleRootContext = createContext<
    Omit<ScheduleRootProps, 'children' | 'className'>
>({});

const scheduleDayDisplayName = 'ScheduleDay';

const scheduleItemKindClassNames: Record<ScheduleItemKind, string> = {
    break: 'text-(--welcome-fg)/50 italic',
    lunch: 'text-(--welcome-fg)/50 italic',
    registration: 'text-(--welcome-fg)',
    session: 'text-(--welcome-fg)',
    social: 'font-display text-lg font-bold tracking-wide text-accent uppercase',
};

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
                content: <Timeline>{day.children}</Timeline>,
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
    const title =
        typeof children === 'string' ? children : String(children ?? '');
    const showSpeakerRow = kind === 'session' && speaker;

    return (
        <Timeline.Item
            align={showSpeakerRow ? 'start' : 'baseline'}
            className={className}
            contentClassName={cn(
                'text-sm leading-6 sm:text-base sm:leading-7',
                scheduleItemKindClassNames[kind],
                contentClassName,
            )}
            meta={<TimeRange end={end} start={start} />}
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
        </Timeline.Item>
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
