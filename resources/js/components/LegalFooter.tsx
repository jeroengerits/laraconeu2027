import type { ReactElement } from 'react';

export function LegalFooter(): ReactElement {
    return (
        <footer className="grid gap-2 px-4 py-8 font-mono text-xs leading-5 tracking-[0.08em] text-muted-foreground uppercase transition-color-mode sm:px-6 lg:px-8">
            <p className="text-balance">
                Laracon EU is a registered trademark of Human Music B.V.
            </p>
            <p className="text-balance">
                Laravel is a registered trademark of Laravel Holdings, Inc.
            </p>
        </footer>
    );
}
