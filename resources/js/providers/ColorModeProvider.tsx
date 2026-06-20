import type { ReactElement, ReactNode } from 'react';
import { useCallback, useMemo, useSyncExternalStore } from 'react';

import type {
    ColorModeDispatcherContextValue,
    ColorModeStateContextValue,
} from '@/providers/context/ColorModeContext';
import {
    ColorModeDispatcherContext,
    ColorModeStateContext,
} from '@/providers/context/ColorModeContext';
import { useNotificationDispatcher } from '@/providers/context/NotificationContext';

type ColorMode = 'dark' | 'light';

type ColorModeProviderProps = {
    children: ReactNode;
};

const COLOR_MODE_STORAGE_KEY = 'laraconeu-color-mode:v1';
const LEGACY_COLOR_MODE_STORAGE_KEY = 'laraconeu-color-mode';
const COLOR_MODE_VALUES = new Set<ColorMode>(['dark', 'light']);
const colorModeNotifications = {
    dark: {
        title: 'Dark Mode On',
    },
    light: {
        title: 'Light Mode On',
    },
} as const;

const colorModeListeners = new Set<() => void>();

function isColorMode(value: string | null): value is ColorMode {
    return COLOR_MODE_VALUES.has(value as ColorMode);
}

function applyColorMode(colorMode: ColorMode): void {
    document.documentElement.classList.toggle('dark', colorMode === 'dark');
}

function documentColorMode(): ColorMode {
    if (typeof document === 'undefined') {
        return 'light';
    }

    return document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light';
}

function systemColorMode(): ColorMode {
    if (typeof window === 'undefined') {
        return 'light';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}

function readInitialColorMode(): ColorMode {
    const currentDocumentColorMode = documentColorMode();

    if (typeof window === 'undefined') {
        return currentDocumentColorMode;
    }

    try {
        const storedColorMode =
            window.localStorage.getItem(COLOR_MODE_STORAGE_KEY) ??
            window.localStorage.getItem(LEGACY_COLOR_MODE_STORAGE_KEY);

        if (isColorMode(storedColorMode)) {
            return storedColorMode;
        }
    } catch {
        return currentDocumentColorMode;
    }

    return currentDocumentColorMode === 'dark'
        ? currentDocumentColorMode
        : systemColorMode();
}

function writeStoredColorMode(colorMode: ColorMode): void {
    try {
        window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, colorMode);
        window.localStorage.removeItem(LEGACY_COLOR_MODE_STORAGE_KEY);
    } catch {
        //
    }
}

function emitColorModeChange(): void {
    colorModeListeners.forEach((listener) => {
        listener();
    });
}

function subscribeToColorMode(listener: () => void): () => void {
    colorModeListeners.add(listener);

    function handleStorage(event: StorageEvent): void {
        if (
            event.key !== COLOR_MODE_STORAGE_KEY &&
            event.key !== LEGACY_COLOR_MODE_STORAGE_KEY
        ) {
            return;
        }

        if (!isColorMode(event.newValue)) {
            return;
        }

        applyColorMode(event.newValue);
        listener();
    }

    window.addEventListener('storage', handleStorage);

    return () => {
        colorModeListeners.delete(listener);
        window.removeEventListener('storage', handleStorage);
    };
}

function serverColorModeSnapshot(): ColorMode {
    return 'light';
}

export function ColorModeProvider({
    children,
}: ColorModeProviderProps): ReactElement {
    const { notify } = useNotificationDispatcher();
    const colorMode = useSyncExternalStore(
        subscribeToColorMode,
        readInitialColorMode,
        serverColorModeSnapshot,
    );
    const isDarkMode = colorMode === 'dark';

    const setColorMode = useCallback(
        (nextColorMode: ColorMode): void => {
            applyColorMode(nextColorMode);
            writeStoredColorMode(nextColorMode);
            emitColorModeChange();
            notify(colorModeNotifications[nextColorMode]);
        },
        [notify],
    );

    const setIsDarkMode = useCallback(
        (nextIsDarkMode: boolean) => {
            setColorMode(nextIsDarkMode ? 'dark' : 'light');
        },
        [setColorMode],
    );

    const stateContextValue = useMemo<ColorModeStateContextValue>(
        () => ({
            isDarkMode,
        }),
        [isDarkMode],
    );

    const dispatcherContextValue = useMemo<ColorModeDispatcherContextValue>(
        () => ({
            setIsDarkMode,
        }),
        [setIsDarkMode],
    );

    return (
        <ColorModeDispatcherContext.Provider value={dispatcherContextValue}>
            <ColorModeStateContext.Provider value={stateContextValue}>
                {children}
            </ColorModeStateContext.Provider>
        </ColorModeDispatcherContext.Provider>
    );
}
