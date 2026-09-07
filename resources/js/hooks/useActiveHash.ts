import { useEffect, useState } from 'react';

function readLocationHash(): string {
    if (typeof window === 'undefined') {
        return '';
    }

    return window.location.hash;
}

export function useActiveHash(sectionIds: readonly string[]): string {
    const [activeHash, setActiveHash] = useState(readLocationHash);

    useEffect(() => {
        function updateActiveHash(): void {
            const marker = window.innerHeight * 0.28;
            let nextHash = '';

            for (const sectionId of sectionIds) {
                const section = document.getElementById(sectionId);

                if (section === null) {
                    continue;
                }

                const bounds = section.getBoundingClientRect();

                if (bounds.top <= marker && bounds.bottom > marker) {
                    nextHash = `#${sectionId}`;
                    break;
                }

                if (bounds.top <= marker) {
                    nextHash = `#${sectionId}`;
                }
            }

            setActiveHash(nextHash);
        }

        updateActiveHash();
        window.addEventListener('hashchange', updateActiveHash);
        window.addEventListener('popstate', updateActiveHash);
        window.addEventListener('resize', updateActiveHash);
        window.addEventListener('scroll', updateActiveHash, { passive: true });

        return () => {
            window.removeEventListener('hashchange', updateActiveHash);
            window.removeEventListener('popstate', updateActiveHash);
            window.removeEventListener('resize', updateActiveHash);
            window.removeEventListener('scroll', updateActiveHash);
        };
    }, [sectionIds]);

    return activeHash;
}
