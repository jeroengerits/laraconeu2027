import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import type { Transition } from 'motion/react';
import { m, useReducedMotion } from 'motion/react';
import { Toggle } from 'radix-ui';
import type { ReactElement } from 'react';

import { Button } from '@/components/Button';
import { cn } from '@/lib/utils';
import {
    useColorMode,
    useColorModeDispatcher,
} from '@/providers/context/ColorModeContext';

type ColorModeToggleProps = {
    className?: string;
};

type ColorModeToggleControlProps = {
    className?: string;
    isDarkMode: boolean;
    onDarkModeChange: (isDarkMode: boolean) => void;
};

const flashTransition: Transition = {
    duration: 0.4,
    ease: [0.22, 1, 0.36, 1],
    times: [0, 0.22, 1],
    type: 'tween',
};

const flashInitialState = {
    opacity: 0,
    x: '-120%',
} as const;

const flashAnimationState = {
    opacity: [0, 0.72, 0],
    x: ['-120%', '0%', '120%'],
};

const colorModeToggleClassName = 'relative overflow-hidden';

const colorModeLabels = {
    dark: 'Switch to Light',
    light: 'Switch to Dark',
} as const;

const iconTransition = {
    duration: 0.28,
    ease: [0.22, 1, 0.36, 1],
} as const;

const reducedMotionIconTransition = {
    duration: 0,
} as const;

const visibleIconState = {
    rotate: 0,
    scale: 1,
} as const;

const inactiveIconState = {
    rotate: 45,
    scale: 0.82,
} as const;

export function ColorModeTransition(): ReactElement {
    const { isDarkMode } = useColorMode();
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <></>;
    }

    return (
        <m.div
            aria-hidden="true"
            animate={flashAnimationState}
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-full skew-x-[-14deg] [background:var(--welcome-flash-bg)]"
            initial={flashInitialState}
            key={isDarkMode ? 'dark-flash' : 'light-flash'}
            transition={flashTransition}
        />
    );
}

function ColorModeToggleControl({
    className,
    isDarkMode,
    onDarkModeChange,
}: ColorModeToggleControlProps): ReactElement {
    const label = isDarkMode ? colorModeLabels.dark : colorModeLabels.light;
    const shouldReduceMotion = useReducedMotion();
    const activeIconTransition = shouldReduceMotion
        ? reducedMotionIconTransition
        : iconTransition;

    return (
        <Toggle.Root
            aria-label={label}
            asChild
            onPressedChange={onDarkModeChange}
            pressed={isDarkMode}
        >
            <Button
                className={cn(colorModeToggleClassName, className)}
                size="icon"
                variant="ghost"
            >
                <m.span
                    animate={isDarkMode ? visibleIconState : inactiveIconState}
                    className="absolute hidden dark:inline-flex"
                    initial={false}
                    transition={activeIconTransition}
                >
                    <SunIcon aria-hidden="true" />
                </m.span>
                <m.span
                    animate={isDarkMode ? inactiveIconState : visibleIconState}
                    className="relative inline-flex dark:hidden"
                    initial={inactiveIconState}
                    transition={activeIconTransition}
                >
                    <MoonIcon aria-hidden="true" />
                </m.span>
            </Button>
        </Toggle.Root>
    );
}

export function ColorModeToggle({
    className,
}: ColorModeToggleProps): ReactElement {
    const { isDarkMode } = useColorMode();
    const { setIsDarkMode } = useColorModeDispatcher();

    return (
        <ColorModeToggleControl
            className={className}
            isDarkMode={isDarkMode}
            onDarkModeChange={setIsDarkMode}
        />
    );
}
