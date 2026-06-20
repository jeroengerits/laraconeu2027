import type { Variants } from 'motion/react';

const motionEase = [0.22, 1, 0.36, 1] as const;

const panelTransition = {
    duration: 0.3,
    ease: motionEase,
} as const;

const tabPanelExitTransition = {
    duration: 0.2,
    ease: [0.4, 0, 1, 1],
} as const;

const scheduleContentTransition = {
    delay: 0.04,
    duration: 0.3,
    ease: motionEase,
} as const;

const scheduleAvatarTransition = {
    delay: 0.08,
    duration: 0.28,
    ease: motionEase,
} as const;

const itemTransition = {
    duration: 0.34,
    ease: motionEase,
} as const;

export const tabTapTransition = {
    duration: 0.2,
    ease: motionEase,
} as const;

export const tabIndicatorTransition = {
    duration: 0.32,
    ease: motionEase,
} as const;

export const tabLabelTransition = {
    duration: 0.24,
    ease: motionEase,
} as const;

export const tabHeaderSubtitleTransition = {
    duration: 0.26,
    ease: motionEase,
} as const;

export function createTabHeaderSubtitleVariants(
    shouldReduceMotion: boolean | null,
): Variants {
    return {
        exit: (direction: number) => ({
            opacity: shouldReduceMotion ? 1 : 0,
            transition: shouldReduceMotion
                ? { duration: 0 }
                : tabHeaderSubtitleTransition,
            x: shouldReduceMotion ? 0 : direction * -10,
            y: shouldReduceMotion ? 0 : -3,
        }),
        hidden: (direction: number) => ({
            opacity: shouldReduceMotion ? 1 : 0,
            x: shouldReduceMotion ? 0 : direction * 10,
            y: shouldReduceMotion ? 0 : 3,
        }),
        visible: {
            opacity: 1,
            transition: shouldReduceMotion
                ? { duration: 0 }
                : tabHeaderSubtitleTransition,
            x: 0,
            y: 0,
        },
    };
}

export function createTabPanelVariants(
    shouldReduceMotion: boolean | null,
): Variants {
    return {
        exit: (direction: number) => ({
            opacity: shouldReduceMotion ? 1 : 0,
            transition: shouldReduceMotion
                ? { duration: 0 }
                : tabPanelExitTransition,
            x: shouldReduceMotion ? 0 : direction * -16,
        }),
        hidden: (direction: number) => ({
            opacity: shouldReduceMotion ? 1 : 0,
            x: shouldReduceMotion ? 0 : direction * 20,
            y: shouldReduceMotion ? 0 : 6,
        }),
        visible: {
            opacity: 1,
            transition: shouldReduceMotion
                ? { duration: 0 }
                : {
                      ...panelTransition,
                      delayChildren: 0.06,
                      staggerChildren: 0.045,
                  },
            x: 0,
            y: 0,
        },
    };
}

export function createScheduleSessionRowVariants(
    shouldReduceMotion: boolean | null,
): Variants {
    return {
        hidden: {},
        visible: {
            transition: shouldReduceMotion
                ? { duration: 0 }
                : {
                      delayChildren: 0.03,
                      staggerChildren: 0.05,
                  },
        },
    };
}

export function createScheduleSessionContentVariants(
    shouldReduceMotion: boolean | null,
): Variants {
    return {
        hidden: {
            opacity: shouldReduceMotion ? 1 : 0,
            y: shouldReduceMotion ? 0 : 6,
        },
        visible: {
            opacity: 1,
            transition: shouldReduceMotion
                ? { duration: 0 }
                : scheduleContentTransition,
            y: 0,
        },
    };
}

export function createScheduleSessionAvatarVariants(
    shouldReduceMotion: boolean | null,
): Variants {
    return {
        hidden: {
            opacity: shouldReduceMotion ? 1 : 0,
            scale: shouldReduceMotion ? 1 : 0.88,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: shouldReduceMotion
                ? { duration: 0 }
                : scheduleAvatarTransition,
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

export const createSpeakerItemEnterVariants = createStaggerItemVariants;

export const scheduleItemViewport = {
    amount: 0.2,
    margin: '0px 0px -8% 0px',
    once: true,
} as const;
