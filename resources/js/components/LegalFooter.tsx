import type { ReactElement } from 'react';

export function LegalFooter(): ReactElement {
    return (
        <footer className="flex flex-col items-center gap-1 border-t border-canvas-foreground/10 px-4 py-10 text-center text-sm text-muted-foreground transition-color-mode sm:px-6 lg:px-8">
            <p className="text-balance">
                Laracon EU is a registered trademark of Human Music B.V.
            </p>
            <p className="text-balance">
                Laravel is a registered trademark of Laravel Holdings, Inc.
            </p>
        </footer>
    );
}
