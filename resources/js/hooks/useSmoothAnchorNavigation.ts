import { animate, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';

const anchorScrollTransition = {
    duration: 0.62,
    ease: [0.16, 1, 0.3, 1],
} as const;

function isPlainLeftClick(event: MouseEvent<HTMLAnchorElement>): boolean {
    return (
        event.button === 0 &&
        !event.altKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.shiftKey
    );
}

function targetElementFromHref(href: string): HTMLElement | null {
    if (!href.startsWith('#') || href === '#') {
        return null;
    }

    return document.getElementById(decodeURIComponent(href.slice(1)));
}

function targetScrollTop(target: HTMLElement): number {
    const scrollMarginTop = Number.parseFloat(
        window.getComputedStyle(target).scrollMarginTop,
    );

    return Math.max(
        0,
        target.getBoundingClientRect().top +
            window.scrollY -
            (Number.isNaN(scrollMarginTop) ? 0 : scrollMarginTop),
    );
}

function updateLocationHash(hash: string): void {
    window.history.pushState(null, '', hash);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
}

export function useSmoothAnchorNavigation(): (
    event: MouseEvent<HTMLAnchorElement>,
) => void {
    const shouldReduceMotion = useReducedMotion();
    const scrollAnimationRef = useRef<ReturnType<typeof animate> | null>(null);

    useEffect(() => {
        return () => {
            scrollAnimationRef.current?.stop();
        };
    }, []);

    return useCallback(
        (event: MouseEvent<HTMLAnchorElement>): void => {
            if (!isPlainLeftClick(event) || event.defaultPrevented) {
                return;
            }

            const href = event.currentTarget.getAttribute('href');

            if (!href) {
                return;
            }

            const target = targetElementFromHref(href);

            if (!target) {
                return;
            }

            event.preventDefault();
            scrollAnimationRef.current?.stop();

            if (shouldReduceMotion) {
                window.scrollTo(0, targetScrollTop(target));
                updateLocationHash(href);

                return;
            }

            scrollAnimationRef.current = animate(
                window.scrollY,
                targetScrollTop(target),
                {
                    ...anchorScrollTransition,
                    onComplete: () => {
                        updateLocationHash(href);
                    },
                    onUpdate: (latestScrollTop) => {
                        window.scrollTo(0, latestScrollTop);
                    },
                },
            );
        },
        [shouldReduceMotion],
    );
}
