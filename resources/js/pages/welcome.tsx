import { Head, Link } from '@inertiajs/react';

import { ColorModeToggle, ColorModeTransition } from '@/components/ColorMode';
import { WordMark } from '@/components/WordMark';
import { focusVisibleClassName } from '@/lib/utils';

function WelcomeToolbar() {
    return (
        <header className="relative z-10 flex w-full flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Link
                href="/"
                className={`inline-flex rounded-sm py-1 ${focusVisibleClassName}`}
            >
                <WordMark size="medium" />
            </Link>
            <ColorModeToggle />
        </header>
    );
}

function WelcomeContent() {
    return (
        <>
            <Head title="Welcome" />
            <main className="relative flex min-h-screen flex-col overflow-hidden bg-(--welcome-bg) text-(--welcome-fg)">
                <ColorModeTransition />
                <WelcomeToolbar />
            </main>
        </>
    );
}

export default function Welcome() {
    return <WelcomeContent />;
}
