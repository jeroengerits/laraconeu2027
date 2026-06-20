import { useCallback } from 'react';
import type { KeyboardEvent, RefObject } from 'react';

type UseHorizontalKeyboardScrollOptions = {
    pause: () => void;
    reduceMotion: boolean;
    resume: () => void;
    step?: number;
};

export function useHorizontalKeyboardScroll(
    rowRef: RefObject<HTMLDivElement | null>,
    {
        pause,
        reduceMotion,
        resume,
        step = 280,
    }: UseHorizontalKeyboardScrollOptions,
) {
    return useCallback(
        (event: KeyboardEvent<HTMLDivElement>): void => {
            const row = rowRef.current;

            if (row === null) {
                return;
            }

            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault();
                pause();
                row.scrollBy({
                    behavior: reduceMotion ? 'auto' : 'smooth',
                    left: event.key === 'ArrowLeft' ? -step : step,
                });
                resume();
            }

            if (event.key === 'Home' || event.key === 'End') {
                event.preventDefault();
                pause();
                row.scrollTo({
                    behavior: reduceMotion ? 'auto' : 'smooth',
                    left: event.key === 'Home' ? 0 : row.scrollWidth,
                });
                resume();
            }
        },
        [pause, reduceMotion, resume, rowRef, step],
    );
}
