import type { ReactElement } from 'react';

import {
    Section,
    SectionFrame,
    SectionIntro,
} from '@/components/sections/Section';

export function ExperienceSection(): ReactElement {
    return (
        <Section id="about">
            <SectionFrame>
                <SectionIntro
                    eyebrow="Why come / community"
                    meta={
                        <>
                            Amsterdam
                            <br />
                            April
                            <br />
                            Laravel
                        </>
                    }
                    title="Experience"
                />
            </SectionFrame>
        </Section>
    );
}
