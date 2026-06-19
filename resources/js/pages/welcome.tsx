import { Head, Link } from '@inertiajs/react';

import { ColorModeTransition } from '@/components/ColorMode';
import { ToggleColorMode } from '@/components/ToggleColorMode';
import { WordMark } from '@/components/WordMark';
import { useColorMode, useColorModeDispatcher } from '@/hooks/useColorMode';
import { useNotificationDispatcher } from '@/hooks/useNotifications';
import { focusVisibleClassName } from '@/lib/utils';

const colorModeNotifications = {
    dark: {
        title: 'Dark Mode On',
    },
    light: {
        title: 'Light Mode On',
    },
} as const;

function WelcomeToolbar() {
    const { isDarkMode } = useColorMode();
    const { setIsDarkMode } = useColorModeDispatcher();
    const { notify } = useNotificationDispatcher();

    function handleDarkModeChange(nextIsDarkMode: boolean): void {
        setIsDarkMode(nextIsDarkMode);
        notify(
            nextIsDarkMode
                ? colorModeNotifications.dark
                : colorModeNotifications.light,
        );
    }

    return (
        <header className="relative z-10 flex w-full flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Link
                href="/"
                className={`inline-flex rounded-sm py-1 ${focusVisibleClassName}`}
            >
                <WordMark size="medium" />
            </Link>
            <ToggleColorMode
                isDarkMode={isDarkMode}
                onDarkModeChange={handleDarkModeChange}
            />
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
