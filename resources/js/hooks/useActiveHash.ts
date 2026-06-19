import { useEffect, useState } from 'react';

function readLocationHash(): string {
    if (typeof window === 'undefined') {
        return '';
    }

    return window.location.hash;
}

export function useActiveHash(): string {
    const [activeHash, setActiveHash] = useState('');

    useEffect(() => {
        const updateActiveHash = (): void => {
            setActiveHash(readLocationHash());
        };

        updateActiveHash();
        window.addEventListener('hashchange', updateActiveHash);
        window.addEventListener('popstate', updateActiveHash);

        return () => {
            window.removeEventListener('hashchange', updateActiveHash);
            window.removeEventListener('popstate', updateActiveHash);
        };
    }, []);

    return activeHash;
}
