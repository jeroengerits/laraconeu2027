import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { m } from 'motion/react';
import { Toggle } from 'radix-ui';

import { cn, focusVisibleClassName } from '@/lib/utils';

type ToggleColorModeProps = {
    className?: string;
    isDarkMode: boolean;
    onDarkModeChange: (isDarkMode: boolean) => void;
};

const TOGGLE_COLOR_MODE_CLASS_NAME =
    'relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full text-current';

const COLOR_MODE_LABELS = {
    dark: 'Switch to Light',
    light: 'Switch to Dark',
} as const;

const ICON_TRANSITION = {
    duration: 0.48,
    ease: 'easeOut',
} as const;

const TOGGLE_INTERACTION_TRANSITION = {
    duration: 0.2,
    ease: 'easeOut',
} as const;

const overlayVisibleState = {
    opacity: 0.1,
} as const;

const overlayHiddenState = {
    opacity: 0,
} as const;

const overlayVariants = {
    hover: overlayVisibleState,
} as const;

const toggleTapState = {
    scale: 0.94,
} as const;

const visibleIconState = {
    rotate: 0,
    scale: 1,
} as const;

const inactiveIconState = {
    rotate: 45,
    scale: 0.82,
} as const;

export function ToggleColorMode({
    className,
    isDarkMode,
    onDarkModeChange,
}: ToggleColorModeProps) {
    const label = isDarkMode ? COLOR_MODE_LABELS.dark : COLOR_MODE_LABELS.light;

    return (
        <Toggle.Root
            aria-label={label}
            onPressedChange={onDarkModeChange}
            pressed={isDarkMode}
            asChild
        >
            <m.button
                className={cn(
                    TOGGLE_COLOR_MODE_CLASS_NAME,
                    focusVisibleClassName,
                    className,
                )}
                type="button"
                whileHover="hover"
                whileTap={toggleTapState}
            >
                <m.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-current"
                    initial={overlayHiddenState}
                    transition={TOGGLE_INTERACTION_TRANSITION}
                    variants={overlayVariants}
                />
                <m.span
                    animate={isDarkMode ? visibleIconState : inactiveIconState}
                    className="absolute hidden dark:inline-flex"
                    initial={false}
                    transition={ICON_TRANSITION}
                >
                    <SunIcon aria-hidden="true" />
                </m.span>
                <m.span
                    animate={isDarkMode ? inactiveIconState : visibleIconState}
                    className="relative inline-flex dark:hidden"
                    initial={inactiveIconState}
                    transition={ICON_TRANSITION}
                >
                    <MoonIcon aria-hidden="true" />
                </m.span>
            </m.button>
        </Toggle.Root>
    );
}
