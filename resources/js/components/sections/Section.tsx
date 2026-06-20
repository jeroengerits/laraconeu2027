import type { ReactElement, ReactNode } from 'react';

type SectionProps = {
    children?: ReactNode;
    id: string;
};

type SectionHeadingProps = {
    children: ReactNode;
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

export function SectionHeading({
    children,
}: SectionHeadingProps): ReactElement {
    return (
        <h2 className="mx-auto text-center font-display text-4xl leading-none font-bold text-balance text-canvas-foreground">
            {children}
        </h2>
    );
}
