import type { ReactElement } from 'react';

import { PolaroidWall } from '@/components/PolaroidWall';
import { SectionFrame, SectionIntro } from '@/components/sections/Section';

export function PolaroidWallSection(): ReactElement {
    return (
        <section
            aria-label="Polaroid Wall"
            className="px-4 py-12 text-canvas-foreground transition-color-mode sm:px-6 lg:px-8"
            id="polaroid-wall"
        >
            <SectionFrame>
                <SectionIntro
                    eyebrow="Archive / atmosphere"
                    meta={
                        <>
                            Last year
                            <br />
                            People
                            <br />
                            Moments
                        </>
                    }
                    title="Memories"
                />
                <p className="max-w-2xl border-t border-canvas-foreground/15 pt-4 text-sm leading-6 text-balance text-muted-foreground">
                    A look back at the faces, talks, and hallway moments that
                    made last year's Laracon EU feel unforgettable.
                </p>
                <PolaroidWall />
            </SectionFrame>
        </section>
    );
}
