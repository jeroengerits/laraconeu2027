import type { ReactElement } from 'react';

import { Section, SectionHeading } from '@/components/sections/Section';

export function TicketsSection(): ReactElement {
    return (
        <Section id="tickets">
            <SectionHeading>Tickets</SectionHeading>
        </Section>
    );
}
