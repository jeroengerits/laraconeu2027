import type { RefObject } from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useLatestValue } from '@/hooks/useLatestValue';

export type MarqueeScrollDirection = 'left' | 'right';

type UseMarqueeScrollOptions = {
    direction: MarqueeScrollDirection;
    initialScrollRatio?: number;
    reduceMotion: boolean;
    resumeDelay: number;
    speed: number;
};

export function useMarqueeScroll(
    rowRef: RefObject<HTMLDivElement | null>,
    {
        direction,
        initialScrollRatio = 0.5,
        reduceMotion,
        resumeDelay,
        speed,
    }: UseMarqueeScrollOptions,
) {
    const directionRef = useLatestValue(direction);
    const initialScrollRatioRef = useLatestValue(initialScrollRatio);
    const speedRef = useLatestValue(speed);
    const pauseTimeoutRef = useRef<number | null>(null);
    const isPausedRef = useRef(false);
    const isInitializedRef = useRef(false);
    const isProgrammaticScrollRef = useRef(false);
    const scrollPositionRef = useRef(0);

    const pause = useCallback((): void => {
        isPausedRef.current = true;

        if (pauseTimeoutRef.current !== null) {
            window.clearTimeout(pauseTimeoutRef.current);
            pauseTimeoutRef.current = null;
        }
    }, []);

    const resume = useCallback((): void => {
        if (pauseTimeoutRef.current !== null) {
            window.clearTimeout(pauseTimeoutRef.current);
        }

        pauseTimeoutRef.current = window.setTimeout(() => {
            isPausedRef.current = false;
            pauseTimeoutRef.current = null;
        }, resumeDelay);
    }, [resumeDelay]);

    const scrollToPosition = useCallback(
        (row: HTMLDivElement, nextScrollLeft: number): void => {
            scrollPositionRef.current = nextScrollLeft;
            isProgrammaticScrollRef.current = true;
            row.scrollLeft = nextScrollLeft;
        },
        [],
    );

    useEffect(() => {
        if (reduceMotion) {
            return;
        }

        let animationFrame = 0;
        let previousTimestamp = 0;

        function scrollFrame(timestamp: number): void {
            const row = rowRef.current;

            if (row !== null) {
                const loopWidth = row.scrollWidth / 2;
                const canAutoScroll = loopWidth > row.clientWidth;

                if (!canAutoScroll) {
                    scrollPositionRef.current = row.scrollLeft;
                    previousTimestamp = timestamp;
                    animationFrame = window.requestAnimationFrame(scrollFrame);

                    return;
                }

                if (!isInitializedRef.current) {
                    scrollToPosition(
                        row,
                        loopWidth * initialScrollRatioRef.current,
                    );
                    isInitializedRef.current = true;
                }

                if (isPausedRef.current) {
                    scrollPositionRef.current = row.scrollLeft;
                } else if (isInitializedRef.current && previousTimestamp > 0) {
                    const delta = timestamp - previousTimestamp;
                    const direction = directionRef.current;
                    let nextScrollLeft =
                        scrollPositionRef.current +
                        (direction === 'left' ? 1 : -1) *
                            speedRef.current *
                            delta;

                    if (direction === 'left' && nextScrollLeft >= loopWidth) {
                        nextScrollLeft -= loopWidth;
                    }

                    if (direction === 'right' && nextScrollLeft <= 0) {
                        nextScrollLeft += loopWidth;
                    }

                    scrollToPosition(row, nextScrollLeft);
                }
            }

            previousTimestamp = timestamp;
            animationFrame = window.requestAnimationFrame(scrollFrame);
        }

        animationFrame = window.requestAnimationFrame(scrollFrame);

        return () => {
            window.cancelAnimationFrame(animationFrame);

            if (pauseTimeoutRef.current !== null) {
                window.clearTimeout(pauseTimeoutRef.current);
            }
        };
    }, [
        directionRef,
        initialScrollRatioRef,
        reduceMotion,
        rowRef,
        scrollToPosition,
        speedRef,
    ]);

    return useMemo(
        () => ({
            isProgrammaticScrollRef,
            pause,
            resume,
            scrollPositionRef,
            scrollToPosition,
        }),
        [pause, resume, scrollToPosition],
    );
}
