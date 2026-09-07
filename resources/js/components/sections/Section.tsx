import { m, useInView, useReducedMotion } from 'motion/react';
import type { ReactElement, ReactNode } from 'react';
import { useRef } from 'react';

import { cn } from '@/lib/utils';

type SectionProps = {
    children?: ReactNode;
    id: string;
};

type SectionIntroProps = {
    eyebrow: ReactNode;
    meta?: ReactNode;
    title: ReactNode;
};

export function Section({ children, id }: SectionProps): ReactElement {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, {
        amount: 0.12,
        margin: '0px 0px -10% 0px',
        once: true,
    });
    const shouldReduceMotion = useReducedMotion();

    return (
        <m.section
            animate={{
                opacity: shouldReduceMotion || isInView ? 1 : 0,
                y: shouldReduceMotion || isInView ? 0 : 20,
            }}
            className="grid min-h-[400px] scroll-mt-24 content-start px-4 py-10 text-canvas-foreground transition-color-mode sm:px-6 sm:py-12 lg:px-8"
            id={id}
            initial={{ opacity: 0, y: 20 }}
            ref={sectionRef}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </m.section>
    );
}

export function SectionFrame({
    children,
}: {
    children: ReactNode;
}): ReactElement {
    return (
        <div className="mx-auto mt-8 grid w-full max-w-7xl gap-8 sm:mt-10 sm:gap-10">
            {children}
        </div>
    );
}

export function SectionIntro({
    eyebrow,
    meta,
    title,
}: SectionIntroProps): ReactElement {
    return (
        <div className="grid gap-5 border-t-4 border-canvas-foreground pt-5 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-start">
            <div className="grid gap-3 sm:gap-4">
                <p className="font-mono text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                    {eyebrow}
                </p>
                <h2 className="max-w-[8ch] font-display text-5xl leading-[0.95] font-bold text-canvas-foreground uppercase sm:text-6xl sm:leading-[0.9] lg:text-7xl">
                    {title}
                </h2>
            </div>
            {meta ? (
                <div
                    className={cn(
                        'border-t border-canvas-foreground/15 pt-4 font-mono text-xs leading-6 tracking-[0.14em] text-muted-foreground uppercase',
                        'lg:border-t-0 lg:pt-0 lg:text-right',
                    )}
                >
                    {meta}
                </div>
            ) : null}
        </div>
    );
}
