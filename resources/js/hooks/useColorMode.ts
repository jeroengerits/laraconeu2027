import { createContext, useContext } from 'react';

export type ColorModeStateContextValue = {
    isDarkMode: boolean;
};

export type ColorModeDispatcherContextValue = {
    setIsDarkMode: (isDarkMode: boolean) => void;
};

export const ColorModeStateContext =
    createContext<ColorModeStateContextValue | null>(null);
export const ColorModeDispatcherContext =
    createContext<ColorModeDispatcherContextValue | null>(null);

export function useColorMode(): ColorModeStateContextValue {
    const context = useContext(ColorModeStateContext);

    if (!context) {
        throw new Error(
            'useColorMode must be used within a ColorModeProvider.',
        );
    }

    return context;
}

export function useColorModeDispatcher(): ColorModeDispatcherContextValue {
    const context = useContext(ColorModeDispatcherContext);

    if (!context) {
        throw new Error(
            'useColorModeDispatcher must be used within a ColorModeProvider.',
        );
    }

    return context;
}
