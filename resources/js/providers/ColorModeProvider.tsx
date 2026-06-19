import {
    createContext,
    useCallback,
    useMemo,
    useSyncExternalStore,
} from 'react';
import type { ReactNode } from 'react';

type ColorMode = 'dark' | 'light';

type ColorModeProviderProps = {
    children: ReactNode;
};

export type ColorModeContextValue = {
    isDarkMode: boolean;
    setIsDarkMode: (isDarkMode: boolean) => void;
};

const COLOR_MODE_STORAGE_KEY = 'laraconeu-color-mode:v1';
const LEGACY_COLOR_MODE_STORAGE_KEY = 'laraconeu-color-mode';
const COLOR_MODE_VALUES = new Set<ColorMode>(['dark', 'light']);

export const ColorModeContext = createContext<ColorModeContextValue | null>(
    null,
);
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

export function ColorModeProvider({ children }: ColorModeProviderProps) {
    const colorMode = useSyncExternalStore(
        subscribeToColorMode,
        readInitialColorMode,
        serverColorModeSnapshot,
    );
    const isDarkMode = colorMode === 'dark';

    const setColorMode = useCallback((nextColorMode: ColorMode): void => {
        applyColorMode(nextColorMode);
        writeStoredColorMode(nextColorMode);
        emitColorModeChange();
    }, []);

    const setIsDarkMode = useCallback(
        (nextIsDarkMode: boolean) => {
            setColorMode(nextIsDarkMode ? 'dark' : 'light');
        },
        [setColorMode],
    );

    const contextValue = useMemo<ColorModeContextValue>(
        () => ({
            isDarkMode,
            setIsDarkMode,
        }),
        [isDarkMode, setIsDarkMode],
    );

    return (
        <ColorModeContext.Provider value={contextValue}>
            {children}
        </ColorModeContext.Provider>
    );
}
