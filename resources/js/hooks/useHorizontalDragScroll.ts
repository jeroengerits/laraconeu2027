import type { MutableRefObject, PointerEvent, RefObject } from 'react';
import { useCallback, useMemo, useRef } from 'react';

type UseHorizontalDragScrollOptions = {
    isDraggingRef: MutableRefObject<boolean>;
    pause: () => void;
    resume: () => void;
    scrollPositionRef: MutableRefObject<number>;
    scrollToPosition: (row: HTMLDivElement, nextScrollLeft: number) => void;
};

export function useHorizontalDragScroll(
    rowRef: RefObject<HTMLDivElement | null>,
    {
        isDraggingRef,
        pause,
        resume,
        scrollPositionRef,
        scrollToPosition,
    }: UseHorizontalDragScrollOptions,
) {
    const dragStartXRef = useRef(0);
    const dragStartScrollLeftRef = useRef(0);

    const onPointerDown = useCallback(
        (event: PointerEvent<HTMLDivElement>): void => {
            const row = rowRef.current;

            if (row === null) {
                return;
            }

            pause();

            if (event.pointerType === 'touch' || event.button !== 0) {
                return;
            }

            isDraggingRef.current = true;
            dragStartXRef.current = event.clientX;
            dragStartScrollLeftRef.current = row.scrollLeft;
            scrollPositionRef.current = row.scrollLeft;
            row.setPointerCapture(event.pointerId);
        },
        [isDraggingRef, pause, rowRef, scrollPositionRef],
    );

    const onPointerMove = useCallback(
        (event: PointerEvent<HTMLDivElement>): void => {
            const row = rowRef.current;

            if (row === null || !isDraggingRef.current) {
                return;
            }

            event.preventDefault();
            const nextScrollLeft =
                dragStartScrollLeftRef.current -
                (event.clientX - dragStartXRef.current);

            scrollToPosition(row, nextScrollLeft);
        },
        [isDraggingRef, rowRef, scrollToPosition],
    );

    const onPointerEnd = useCallback(
        (event: PointerEvent<HTMLDivElement>): void => {
            const row = rowRef.current;

            if (
                row !== null &&
                isDraggingRef.current &&
                row.hasPointerCapture(event.pointerId)
            ) {
                row.releasePointerCapture(event.pointerId);
            }

            isDraggingRef.current = false;
            resume();
        },
        [isDraggingRef, resume, rowRef],
    );

    return useMemo(
        () => ({
            onLostPointerCapture: onPointerEnd,
            onPointerCancel: onPointerEnd,
            onPointerDown,
            onPointerMove,
            onPointerUp: onPointerEnd,
        }),
        [onPointerDown, onPointerEnd, onPointerMove],
    );
}
