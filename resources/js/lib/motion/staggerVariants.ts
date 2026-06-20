import type { Variants } from 'motion/react';

const panelTransition = {
    duration: 0.24,
    ease: [0.16, 1, 0.3, 1],
} as const;

const itemTransition = {
    duration: 0.22,
    ease: 'easeOut',
} as const;

export const tabTapTransition = {
    duration: 0.18,
    ease: 'easeOut',
} as const;

export function createPanelVariants(
    shouldReduceMotion: boolean | null,
): Variants {
    return {
        hidden: {
            opacity: shouldReduceMotion ? 1 : 0,
            y: shouldReduceMotion ? 0 : 12,
        },
        visible: {
            opacity: 1,
            transition: shouldReduceMotion ? { duration: 0 } : panelTransition,
            y: 0,
        },
    };
}

export function createStaggerListVariants(
    shouldReduceMotion: boolean | null,
): Variants {
    return {
        hidden: {},
        visible: {
            transition: shouldReduceMotion
                ? { duration: 0 }
                : {
                      delayChildren: 0.04,
                      staggerChildren: 0.04,
                  },
        },
    };
}

export function createStaggerItemVariants(
    shouldReduceMotion: boolean | null,
): Variants {
    return {
        hidden: {
            opacity: shouldReduceMotion ? 1 : 0,
            y: shouldReduceMotion ? 0 : 8,
        },
        visible: {
            opacity: 1,
            transition: shouldReduceMotion ? { duration: 0 } : itemTransition,
            y: 0,
        },
    };
}
