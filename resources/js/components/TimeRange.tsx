import type { ReactElement } from 'react';

import { formatTimeRange } from '@/lib/formatTimeRange';
import { cn } from '@/lib/utils';

type TimeRangeProps = {
    className?: string;
    end: string;
    start: string;
};

export function TimeRange({
    className,
    end,
    start,
}: TimeRangeProps): ReactElement {
    return (
        <p
            aria-label={`${start} to ${end}`}
            className={cn(
                'font-mono text-sm leading-6 text-(--welcome-fg)/60 tabular-nums',
                className,
            )}
        >
            {formatTimeRange(start, end)}
        </p>
    );
}

export type { TimeRangeProps };
