import { useSyncExternalStore } from 'react';

function readLocationHash(): string {
    if (typeof window === 'undefined') {
        return '';
    }

    return window.location.hash;
}

function subscribeToLocationHash(onStoreChange: () => void): () => void {
    window.addEventListener('hashchange', onStoreChange);
    window.addEventListener('popstate', onStoreChange);

    return () => {
        window.removeEventListener('hashchange', onStoreChange);
        window.removeEventListener('popstate', onStoreChange);
    };
}

function getServerLocationHash(): string {
    return '';
}

export function useActiveHash(): string {
    return useSyncExternalStore(
        subscribeToLocationHash,
        readLocationHash,
        getServerLocationHash,
    );
}
