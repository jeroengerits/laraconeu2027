import type { ReactElement } from 'react';

import {
    Section,
    SectionFrame,
    SectionIntro,
} from '@/components/sections/Section';

export function TicketsSection(): ReactElement {
    return (
        <Section id="tickets">
            <SectionFrame>
                <SectionIntro
                    eyebrow="Access / registration"
                    meta={
                        <>
                            Three days
                            <br />
                            Talks
                            <br />
                            Community
                        </>
                    }
                    title="Tickets"
                />
            </SectionFrame>
        </Section>
    );
}
