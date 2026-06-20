import type { ReactElement } from 'react';

import { Section, SectionHeading } from '@/components/sections/Section';

export function LocationSection(): ReactElement {
    return (
        <Section id="location">
            <SectionHeading>Location</SectionHeading>
        </Section>
    );
}
