import { m } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';
import { Slot } from 'radix-ui';
import { forwardRef } from 'react';
import type { ReactElement, Ref } from 'react';

import { useFocusVisible } from '@/hooks/useFocusVisible';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'ghost' | 'outline' | 'primary' | 'secondary';

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
    ghost: 'text-current hover:bg-current/10',
    outline:
        'border border-current/20 text-current hover:border-current/35 hover:bg-current/10',
    primary: 'pair-accent hover:brightness-95',
    secondary: 'pair-inverse hover:brightness-110',
};

const buttonSizeClassNames: Record<ButtonSize, string> = {
    huge: 'h-14 px-6 text-lg',
    icon: 'h-10 w-10 p-0 text-sm',
    large: 'h-12 px-5 text-base',
    medium: 'h-10 px-3 text-sm',
    small: 'h-9 px-2.5 text-sm',
    tiny: 'h-8 px-2 text-xs',
};

const buttonHoverState = {
    y: -1,
} as const;

const buttonTapState = {
    scale: 0.97,
} as const;

const buttonTransition = {
    duration: 0.18,
    ease: 'easeOut',
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
    const focusVisibleClassName = useFocusVisible();
    const buttonClassName = cn(
        buttonBaseClassName,
        buttonVariantClassNames[variant],
        buttonSizeClassNames[size],
        focusVisibleClassName,
        className,
    );

    if (asChild) {
        return (
            <MotionSlot
                className={buttonClassName}
                ref={ref}
                transition={buttonTransition}
                whileHover={buttonHoverState}
                whileTap={buttonTapState}
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
            transition={buttonTransition}
            type={type}
            whileHover={buttonHoverState}
            whileTap={buttonTapState}
            {...props}
        >
            {children}
        </m.button>
    );
}

export const Button = forwardRef(ButtonComponent);
