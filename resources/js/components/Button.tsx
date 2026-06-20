import type { HTMLMotionProps } from 'motion/react';
import { m, useReducedMotion } from 'motion/react';
import { Slot } from 'radix-ui';
import type { ReactElement, Ref } from 'react';
import { forwardRef } from 'react';

import { focusVisibleClassName } from '@/lib/focusVisible';
import { cn } from '@/lib/utils';

export type ButtonPairVariant =
    | 'accent'
    | 'canvas'
    | 'earth'
    | 'emphasis'
    | 'highlight'
    | 'info'
    | 'inverse'
    | 'link'
    | 'muted'
    | 'support'
    | 'surface'
    | 'warmth';

export type ButtonVariant =
    | 'ghost'
    | 'outline'
    | 'primary'
    | 'secondary'
    | ButtonPairVariant;

export type ButtonSize =
    | 'huge'
    | 'icon'
    | 'large'
    | 'medium'
    | 'small'
    | 'tiny';

export type ButtonProps = Omit<HTMLMotionProps<'button'>, 'className'> & {
    asChild?: boolean;
    className?: string;
    size?: ButtonSize;
    variant?: ButtonVariant;
};

const MotionSlot = m.create(Slot.Root);

const buttonBaseClassName =
    'inline-flex shrink-0 items-center justify-center rounded-sm font-sans font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50';

const buttonVariantClassNames: Record<ButtonVariant, string> = {
    accent: 'pair-accent hover:brightness-95',
    canvas: 'pair-canvas hover:brightness-95',
    earth: 'pair-earth hover:brightness-95',
    emphasis: 'pair-emphasis hover:brightness-95',
    ghost: 'text-current hover:bg-current/10',
    highlight: 'pair-highlight hover:brightness-95',
    info: 'pair-info hover:brightness-95',
    inverse: 'pair-inverse hover:brightness-110',
    link: 'pair-link hover:brightness-95',
    muted: 'pair-muted hover:brightness-95',
    outline:
        'border border-current/20 text-current hover:border-current/35 hover:bg-current/10',
    primary: 'pair-accent hover:brightness-95',
    secondary: 'pair-inverse hover:brightness-110',
    support: 'pair-support hover:brightness-95',
    surface: 'pair-surface hover:brightness-95',
    warmth: 'pair-warmth hover:brightness-95',
};

const buttonSizeClassNames: Record<ButtonSize, string> = {
    huge: 'h-14 px-6 text-lg',
    icon: 'h-10 w-10 p-0 text-sm',
    large: 'h-12 px-5 text-base',
    medium: 'h-10 px-3 text-sm',
    small: 'h-9 px-2.5 text-sm',
    tiny: 'h-8 px-2 text-xs',
};

const interactiveMotionProps = {
    transition: { duration: 0.18, ease: 'easeOut' },
    whileHover: { y: -1 },
    whileTap: { scale: 0.97 },
} as const;

function ButtonComponent(
    {
        asChild = false,
        children,
        className,
        size = 'medium',
        type = 'button',
        variant = 'primary',
        ...props
    }: ButtonProps,
    ref: Ref<HTMLButtonElement>,
): ReactElement {
    const shouldReduceMotion = useReducedMotion();
    const buttonClassName = cn(
        buttonBaseClassName,
        buttonVariantClassNames[variant],
        buttonSizeClassNames[size],
        focusVisibleClassName,
        className,
    );
    const motionProps = shouldReduceMotion ? undefined : interactiveMotionProps;

    if (asChild) {
        return (
            <MotionSlot
                className={buttonClassName}
                ref={ref}
                {...motionProps}
                {...props}
            >
                {children}
            </MotionSlot>
        );
    }

    return (
        <m.button
            className={buttonClassName}
            ref={ref}
            type={type}
            {...motionProps}
            {...props}
        >
            {children}
        </m.button>
    );
}

export const Button = forwardRef(ButtonComponent);

Button.displayName = 'Button';
