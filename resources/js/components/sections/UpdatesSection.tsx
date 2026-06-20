import type { ReactElement } from 'react';

import { Section, SectionHeading } from '@/components/sections/Section';

export function UpdatesSection(): ReactElement {
    return (
        <Section id="updates">
            <SectionHeading>Updates</SectionHeading>
        </Section>
    );
}
