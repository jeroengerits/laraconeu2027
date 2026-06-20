import type { ReactElement } from 'react';

import {
    Section,
    SectionFrame,
    SectionIntro,
} from '@/components/sections/Section';

export function SponsorsSection(): ReactElement {
    return (
        <Section id="sponsors">
            <SectionFrame>
                <SectionIntro
                    eyebrow="Partners / ecosystem"
                    meta={
                        <>
                            Support
                            <br />
                            Visibility
                            <br />
                            Community
                        </>
                    }
                    title="Sponsors"
                />
            </SectionFrame>
        </Section>
    );
}
