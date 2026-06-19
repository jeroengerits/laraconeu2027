import type { Transition } from 'motion/react';
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import type { ReactNode } from 'react';

type MotionProviderProps = {
    children: ReactNode;
};

const motionDefaultTransition: Transition = {
    duration: 0.48,
    ease: 'easeOut',
    type: 'tween',
};

export function MotionProvider({ children }: MotionProviderProps) {
    return (
        <LazyMotion features={domAnimation}>
            <MotionConfig
                reducedMotion="user"
                transition={motionDefaultTransition}
            >
                {children}
            </MotionConfig>
        </LazyMotion>
    );
}
