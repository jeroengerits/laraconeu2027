import type { ReactElement } from 'react';

import { PolaroidWall } from '@/components/PolaroidWall';

export function PolaroidWallSection(): ReactElement {
    return (
        <section aria-label="Polaroid Wall" className="transition-color-mode" id="polaroid-wall">
            <div className="mx-auto mb-5 max-w-3xl px-5 text-center sm:mb-6 sm:px-8 section:mb-8">
                <h2 className="font-display text-3xl leading-none font-bold text-balance text-canvas-foreground sm:text-4xl section:text-5xl">
                    Last Year Memories
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-balance text-muted-foreground sm:text-base section:text-lg">
                    A look back at the faces, talks, and hallway moments that
                    made last year's Laracon EU feel unforgettable.
                </p>
            </div>
            <PolaroidWall />
        </section>
    );
}
