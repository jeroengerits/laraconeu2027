import type { UseInViewOptions, Variants } from 'motion/react';
import { m, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import type { ReactElement, ReactNode } from 'react';

type AnimatedListItemProps = {
    children: ReactNode;
    className?: string;
    variants: Variants;
    viewport?: UseInViewOptions;
};

export function AnimatedListItem({
    children,
    variants,
    viewport,
    ...props
}: AnimatedListItemProps): ReactElement {
    const itemRef = useRef<HTMLLIElement>(null);
    const isInView = useInView(itemRef, viewport);
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return (
            <li ref={itemRef} {...props}>
                {children}
            </li>
        );
    }

    return (
        <m.li
            ref={itemRef}
            animate={isInView ? 'visible' : 'hidden'}
            initial="hidden"
            variants={variants}
            {...props}
        >
            {children}
        </m.li>
    );
}
