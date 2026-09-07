import { act, render, screen, waitFor } from '@testing-library/react';
import type { ReactElement } from 'react';
import { useRef } from 'react';

import { useVisibleItemKeys } from '@/hooks/useVisibleItemKeys';

type TestItem = {
    id: string;
};

type ObserverEntry = Pick<
    IntersectionObserverEntry,
    'isIntersecting' | 'target'
>;

let latestIntersectionObserverCallback: IntersectionObserverCallback | null =
    null;

class IntersectionObserverHarnessMock implements IntersectionObserver {
    readonly root = null;

    readonly rootMargin = '';

    readonly thresholds = [];

    constructor(callback: IntersectionObserverCallback) {
        latestIntersectionObserverCallback = callback;
    }

    disconnect(): void {}

    observe(): void {}

    takeRecords(): IntersectionObserverEntry[] {
        return [];
    }

    unobserve(): void {}
}

function HookHarness({ items }: { items: readonly TestItem[] }): ReactElement {
    const containerRef = useRef<HTMLDivElement>(null);
    const visibleItemKeys = useVisibleItemKeys(containerRef, {
        getElementKey: (element) => element.dataset.itemKey,
        getItemKey: (item) => item.id,
        items,
        selector: '[data-item-key]',
    });

    return (
        <div>
            <div ref={containerRef}>
                {items.map((item) => (
                    <div data-item-key={item.id} key={item.id}>
                        {item.id}
                    </div>
                ))}
            </div>
            <output data-testid="visible-item-keys">
                {Array.from(visibleItemKeys).toSorted().join(',')}
            </output>
        </div>
    );
}

function emitVisibleEntries(entries: readonly ObserverEntry[]): void {
    if (latestIntersectionObserverCallback === null) {
        throw new Error('IntersectionObserver callback not registered.');
    }

    latestIntersectionObserverCallback(
        entries as IntersectionObserverEntry[],
        {} as IntersectionObserver,
    );
}

describe('useVisibleItemKeys', () => {
    const originalIntersectionObserver = global.IntersectionObserver;

    beforeEach(() => {
        latestIntersectionObserverCallback = null;
        global.IntersectionObserver =
            IntersectionObserverHarnessMock as unknown as typeof IntersectionObserver;
    });

    afterEach(() => {
        global.IntersectionObserver = originalIntersectionObserver;
    });

    it('makes the current items visible without IntersectionObserver', async () => {
        Reflect.deleteProperty(global, 'IntersectionObserver');

        const { rerender } = render(
            <HookHarness items={[{ id: 'alpha' }, { id: 'beta' }]} />,
        );

        await waitFor(() => {
            expect(screen.getByTestId('visible-item-keys')).toHaveTextContent(
                'alpha,beta',
            );
        });

        rerender(<HookHarness items={[{ id: 'gamma' }]} />);

        await waitFor(() => {
            expect(screen.getByTestId('visible-item-keys').textContent).toBe(
                'gamma',
            );
        });
    });

    it('removes stale visible keys when the observed item set changes', async () => {
        const { rerender } = render(
            <HookHarness items={[{ id: 'alpha' }, { id: 'beta' }]} />,
        );

        act(() => {
            emitVisibleEntries([
                {
                    isIntersecting: true,
                    target: screen.getByText('alpha'),
                },
            ]);
        });

        expect(screen.getByTestId('visible-item-keys')).toHaveTextContent(
            'alpha',
        );

        rerender(<HookHarness items={[{ id: 'gamma' }, { id: 'delta' }]} />);

        await waitFor(() => {
            expect(screen.getByTestId('visible-item-keys').textContent).toBe(
                '',
            );
        });

        act(() => {
            emitVisibleEntries([
                {
                    isIntersecting: true,
                    target: screen.getByText('gamma'),
                },
            ]);
        });

        expect(screen.getByTestId('visible-item-keys')).toHaveTextContent(
            'gamma',
        );
    });
});
