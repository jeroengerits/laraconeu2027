import type { ReactElement } from 'react';

import { DepthGallery } from '@/components/DepthGallery';

export function DepthGallerySection(): ReactElement {
    return (
        <section
            aria-label="Depth Gallery"
            className="relative isolate scroll-mt-24 overflow-x-clip bg-cream-100 text-black-950 transition-colors duration-500 dark:bg-black-950 dark:text-cream-50"
            id="depth-gallery"
        >
            <DepthGallery />
        </section>
    );
}
