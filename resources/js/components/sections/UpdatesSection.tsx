import type { ReactElement } from 'react';

import {
    Section,
    SectionFrame,
    SectionIntro,
} from '@/components/sections/Section';

export function UpdatesSection(): ReactElement {
    return (
        <Section id="updates">
            <SectionFrame>
                <SectionIntro
                    eyebrow="News / releases"
                    meta={
                        <>
                            Stay
                            <br />
                            In
                            <br />
                            Sync
                        </>
                    }
                    title="Updates"
                />
            </SectionFrame>
        </Section>
    );
}
