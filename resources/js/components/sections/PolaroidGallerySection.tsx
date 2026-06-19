import type { ReactElement } from 'react';

import { PolaroidGallery } from '@/components/PolaroidGallery';

export function PolaroidGallerySection(): ReactElement {
    return (
        <section
            aria-label="Polaroid Gallery"
            className="relative isolate scroll-mt-24 overflow-x-clip bg-cream-200 text-black-950 transition-colors duration-500 dark:bg-black-900 dark:text-cream-50"
            id="polaroid-gallery"
        >
            <PolaroidGallery />
        </section>
    );
}
