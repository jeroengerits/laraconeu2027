import type { Transition } from 'motion/react';
import { m } from 'motion/react';

import { useColorMode } from '@/hooks/useColorMode';

const flashTransition: Transition = {
    duration: 0.68,
    ease: [0.16, 1, 0.3, 1],
    times: [0, 0.2, 1],
    type: 'tween',
};

export function ColorModeTransition() {
    const { isDarkMode } = useColorMode();

    return (
        <m.div
            animate={{
                opacity: [0, 0.92, 0],
                x: ['-120%', '0%', '120%'],
            }}
            className="pointer-events-none absolute inset-y-0 left-0 z-0 w-full skew-x-[-14deg] [background:var(--welcome-flash-bg)]"
            initial={{ opacity: 0, x: '-120%' }}
            key={isDarkMode ? 'dark-flash' : 'light-flash'}
            transition={flashTransition}
        />
    );
}
