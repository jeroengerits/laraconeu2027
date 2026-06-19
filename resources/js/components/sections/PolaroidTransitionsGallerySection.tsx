import type { ReactElement } from 'react';

import { PolaroidTransitionsGallery } from '@/components/PolaroidTransitionsGallery';

export function PolaroidTransitionsGallerySection(): ReactElement {
    return (
        <section
            aria-label="Polaroid Transitions Gallery"
            className="relative isolate scroll-mt-24 overflow-x-clip bg-cream-100 text-black-950 transition-colors duration-500 dark:bg-black-950 dark:text-cream-50"
            id="polaroid-transitions-gallery"
        >
            <PolaroidTransitionsGallery />
        </section>
    );
}
