import type { ReactElement } from 'react';

import {
    Section,
    SectionFrame,
    SectionIntro,
} from '@/components/sections/Section';

export function LocationSection(): ReactElement {
    return (
        <Section id="location">
            <SectionFrame>
                <SectionIntro
                    eyebrow="Venue / city"
                    meta={
                        <>
                            Amsterdam
                            <br />
                            Netherlands
                            <br />
                            EU
                        </>
                    }
                    title="Location"
                />
            </SectionFrame>
        </Section>
    );
}
