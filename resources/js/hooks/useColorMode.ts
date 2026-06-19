import { useContext, useMemo } from 'react';

import { ColorModeContext } from '@/providers/ColorModeProvider';
import type { ColorModeContextValue } from '@/providers/ColorModeProvider';

type ColorModeDispatcherValue = Pick<ColorModeContextValue, 'setIsDarkMode'>;

export function useColorMode(): ColorModeContextValue {
    const context = useContext(ColorModeContext);

    if (!context) {
        throw new Error(
            'useColorMode must be used within a ColorModeProvider.',
        );
    }

    return context;
}

export function useColorModeDispatcher(): ColorModeDispatcherValue {
    const { setIsDarkMode } = useColorMode();

    return useMemo(
        () => ({
            setIsDarkMode,
        }),
        [setIsDarkMode],
    );
}
