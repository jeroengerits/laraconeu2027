import type { ReactElement } from 'react';

import { Button } from '@/components/Button';
import {
    Section,
    SectionFrame,
    SectionIntro,
} from '@/components/sections/Section';

export function CallForSpeakersSection(): ReactElement {
    return (
        <Section id="call-for-speakers">
            <SectionFrame>
                <SectionIntro
                    eyebrow="Contribute / share your craft"
                    meta={
                        <>
                            Laravel
                            <br />
                            Community
                            <br />
                            2027
                        </>
                    }
                    title="Call for speakers"
                />
                <div className="grid gap-8 border-t-2 border-canvas-foreground pt-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-10">
                    <p className="max-w-3xl text-xl leading-8 text-muted-foreground sm:text-2xl sm:leading-9">
                        Have a hard-earned lesson, a useful pattern, or a fresh
                        perspective to share? Tell the Laravel community what
                        you are building, testing, and learning.
                    </p>
                    <div className="grid content-start gap-4">
                        <p className="text-sm leading-6 text-muted-foreground">
                            Session details and submission dates will be
                            announced soon.
                        </p>
                        <Button
                            asChild
                            className="justify-self-start rounded-none font-mono text-xs tracking-[0.12em] uppercase"
                            size="small"
                            variant="highlight"
                        >
                            <a href="mailto:speakers@laracon.eu">
                                Submit your talk
                            </a>
                        </Button>
                    </div>
                </div>
            </SectionFrame>
        </Section>
    );
}
