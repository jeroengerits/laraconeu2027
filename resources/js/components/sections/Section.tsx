import type { ReactElement, ReactNode } from 'react';

type SectionProps = {
    children?: ReactNode;
    id: string;
    title: string;
};

export function Section({ children, id, title }: SectionProps): ReactElement {
    return (
        <section
            className="grid min-h-[400px] scroll-mt-24 content-start px-4 py-12 sm:px-6 lg:px-8"
            id={id}
        >
            <h2 className="font-display text-4xl leading-none font-bold text-balance">
                {title}
            </h2>
            {children}
        </section>
    );
}
