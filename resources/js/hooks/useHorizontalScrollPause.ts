import type { MutableRefObject, PointerEvent, RefObject } from 'react';
import { useCallback, useMemo } from 'react';

type UseHorizontalScrollPauseOptions = {
    isDraggingRef: MutableRefObject<boolean>;
    isProgrammaticScrollRef: MutableRefObject<boolean>;
    pause: () => void;
    resume: () => void;
    scrollPositionRef: MutableRefObject<number>;
};

export function useHorizontalScrollPause(
    rowRef: RefObject<HTMLDivElement | null>,
    {
        isDraggingRef,
        isProgrammaticScrollRef,
        pause,
        resume,
        scrollPositionRef,
    }: UseHorizontalScrollPauseOptions,
) {
    const onScroll = useCallback((): void => {
        const row = rowRef.current;

        if (row === null) {
            return;
        }

        const currentScrollLeft = row.scrollLeft;

        if (
            isProgrammaticScrollRef.current &&
            Math.abs(currentScrollLeft - scrollPositionRef.current) < 1
        ) {
            isProgrammaticScrollRef.current = false;

            return;
        }

        isProgrammaticScrollRef.current = false;
        scrollPositionRef.current = currentScrollLeft;
        pause();

        if (!isDraggingRef.current) {
            resume();
        }
    }, [
        isDraggingRef,
        isProgrammaticScrollRef,
        pause,
        resume,
        rowRef,
        scrollPositionRef,
    ]);

    const onPointerEnter = useCallback(
        (event: PointerEvent<HTMLDivElement>): void => {
            if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
                pause();
            }
        },
        [pause],
    );

    const onPointerLeave = useCallback(
        (event: PointerEvent<HTMLDivElement>): void => {
            if (
                (event.pointerType === 'mouse' ||
                    event.pointerType === 'pen') &&
                !isDraggingRef.current
            ) {
                resume();
            }
        },
        [isDraggingRef, resume],
    );

    return useMemo(
        () => ({
            onPointerEnter,
            onPointerLeave,
            onScroll,
            onTouchCancel: resume,
            onTouchEnd: resume,
            onTouchStart: pause,
        }),
        [onPointerEnter, onPointerLeave, onScroll, pause, resume],
    );
}
