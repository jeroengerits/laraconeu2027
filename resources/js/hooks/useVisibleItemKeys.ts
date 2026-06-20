import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

import { useLatestValue } from '@/hooks/useLatestValue';

type UseVisibleItemKeysOptions<TItem> = {
    getItemKey: (item: TItem, index: number) => string;
    getElementKey: (element: HTMLElement) => string | undefined;
    items: readonly TItem[];
    root?: Element | Document | null;
    rootMargin?: string;
    selector: string;
    threshold?: number;
};

export function useVisibleItemKeys<TItem>(
    containerRef: RefObject<HTMLElement | null>,
    {
        getElementKey,
        getItemKey,
        items,
        root,
        rootMargin = '0px',
        selector,
        threshold = 0.01,
    }: UseVisibleItemKeysOptions<TItem>,
): ReadonlySet<string> {
    const getElementKeyRef = useLatestValue(getElementKey);
    const getItemKeyRef = useLatestValue(getItemKey);
    const [visibleItemKeys, setVisibleItemKeys] = useState<ReadonlySet<string>>(
        () => new Set(),
    );

    useEffect(() => {
        const container = containerRef.current;
        const nextItemKeySet = new Set(
            items.map((item, index) => getItemKeyRef.current(item, index)),
        );

        if (container === null) {
            return;
        }

        setVisibleItemKeys((currentItemKeys) => {
            let hasStaleItemKey = false;

            for (const itemKey of currentItemKeys) {
                if (!nextItemKeySet.has(itemKey)) {
                    hasStaleItemKey = true;
                    break;
                }
            }

            if (!hasStaleItemKey) {
                return currentItemKeys;
            }

            return new Set(
                [...currentItemKeys].filter((itemKey) =>
                    nextItemKeySet.has(itemKey),
                ),
            );
        });

        if (typeof IntersectionObserver === 'undefined') {
            const fallbackTimeout = window.setTimeout(() => {
                setVisibleItemKeys(
                    new Set(
                        items.map((item, index) =>
                            getItemKeyRef.current(item, index),
                        ),
                    ),
                );
            }, 0);

            return () => {
                window.clearTimeout(fallbackTimeout);
            };
        }

        const observedElements = Array.from(
            container.querySelectorAll<HTMLElement>(selector),
        );
        const resolvedRoot = root === undefined ? container : root;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) {
                        continue;
                    }

                    const itemKey = getElementKeyRef.current(
                        entry.target as HTMLElement,
                    );

                    if (itemKey !== undefined) {
                        setVisibleItemKeys((currentItemKeys) => {
                            if (currentItemKeys.has(itemKey)) {
                                return currentItemKeys;
                            }

                            return new Set(currentItemKeys).add(itemKey);
                        });
                    }

                    observer.unobserve(entry.target);
                }
            },
            {
                root: resolvedRoot,
                rootMargin,
                threshold,
            },
        );

        for (const element of observedElements) {
            observer.observe(element);
        }

        return () => {
            observer.disconnect();
        };
    }, [
        containerRef,
        getElementKeyRef,
        getItemKeyRef,
        items,
        root,
        rootMargin,
        selector,
        threshold,
    ]);

    return visibleItemKeys;
}
