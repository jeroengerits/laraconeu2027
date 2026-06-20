import type { ReactElement, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type SectionProps = {
    children?: ReactNode;
    id: string;
};

type SectionHeadingProps = {
    children: ReactNode;
};

type SectionIntroProps = {
    eyebrow: ReactNode;
    meta?: ReactNode;
    title: ReactNode;
};

export function Section({ children, id }: SectionProps): ReactElement {
    return (
        <section
            className="grid min-h-[400px] scroll-mt-24 content-start px-4 py-12 text-canvas-foreground transition-color-mode sm:px-6 lg:px-8"
            id={id}
        >
            {children}
        </section>
    );
}

export function SectionFrame({
    children,
}: {
    children: ReactNode;
}): ReactElement {
    return (
        <div className="mx-auto mt-10 grid w-full max-w-7xl gap-10">
            {children}
        </div>
    );
}

export function SectionHeading({
    children,
}: SectionHeadingProps): ReactElement {
    return (
        <h2 className="mx-auto text-center font-display text-3xl leading-none font-bold text-balance text-canvas-foreground">
            {children}
        </h2>
    );
}

export function SectionIntro({
    eyebrow,
    meta,
    title,
}: SectionIntroProps): ReactElement {
    return (
        <div className="grid gap-6 border-t-4 border-canvas-foreground pt-5 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-start">
            <div className="grid gap-4">
                <p className="font-mono text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                    {eyebrow}
                </p>
                <h2 className="max-w-[8ch] font-display text-5xl leading-[0.9] font-bold text-canvas-foreground uppercase sm:text-6xl lg:text-7xl">
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
