import { useEffect } from 'react';

function hasLocationHash(): boolean {
    return window.location.hash !== '';
}

function scrollToTopWithoutAnchor(): void {
    if (!hasLocationHash()) {
        window.scrollTo(0, 0);
    }
}

export function prepareInitialScrollPosition(): void {
    if (typeof window === 'undefined') {
        return;
    }

    if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
    }

    scrollToTopWithoutAnchor();
}

export function useInitialScrollPosition(): void {
    useEffect(() => {
        scrollToTopWithoutAnchor();
    }, []);
}
