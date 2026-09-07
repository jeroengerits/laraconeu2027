import { Cross2Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';
import type { KeyboardEvent, ReactElement } from 'react';
import { useEffect, useRef } from 'react';

import { Button } from '@/components/Button';
import { cn } from '@/lib/utils';
import {
    useTopNavigationActions,
    useTopNavigationState,
} from '@/providers/context/TopNavigationContext';

export type TopNavigationMenuButtonProps = Omit<
    HTMLMotionProps<'button'>,
    'aria-controls' | 'aria-expanded' | 'aria-label' | 'onClick' | 'type'
>;

export type TopNavigationMobileMenuProps = HTMLMotionProps<'nav'>;

const mobileMenuButtonClassName =
    'relative h-14 w-14 overflow-hidden rounded-none hover:bg-current/5 hover:text-current/70 lg:hidden';

const menuIconInitialState = {
    opacity: 0,
    rotate: -45,
    scale: 0.82,
} as const;

const menuIconVisibleState = {
    opacity: 1,
    rotate: 0,
    scale: 1,
} as const;

const menuIconExitState = {
    opacity: 0,
    rotate: 45,
    scale: 0.82,
} as const;

const menuIconTransition = {
    duration: 0.18,
    ease: 'easeOut',
} as const;

const reducedMotionMenuIconTransition = {
    duration: 0,
} as const;

const mobileMenuInitialState = {
    opacity: 0,
    y: -8,
} as const;

const mobileMenuVisibleState = {
    opacity: 1,
    y: 0,
} as const;

const mobileMenuExitState = {
    opacity: 0,
    y: -6,
} as const;

const mobileMenuTransition = {
    duration: 0.2,
    ease: 'easeOut',
} as const;

const reducedMotionMobileMenuTransition = {
    duration: 0,
} as const;

export function TopNavigationMenuButton({
    className,
    ...props
}: TopNavigationMenuButtonProps): ReactElement {
    const { isMobileMenuOpen, mobileMenuButtonRef, mobileNavigationId } =
        useTopNavigationState();
    const { toggleMobileMenu } = useTopNavigationActions();
    const shouldReduceMotion = useReducedMotion();
    const activeIconTransition = shouldReduceMotion
        ? reducedMotionMenuIconTransition
        : menuIconTransition;

    return (
        <Button
            aria-controls={mobileNavigationId}
            aria-expanded={isMobileMenuOpen}
            aria-label={
                isMobileMenuOpen
                    ? 'Close navigation menu'
                    : 'Open navigation menu'
            }
            className={cn(mobileMenuButtonClassName, className)}
            onClick={toggleMobileMenu}
            ref={mobileMenuButtonRef}
            size="icon"
            variant="ghost"
            {...props}
        >
            <AnimatePresence initial={false} mode="wait">
                {isMobileMenuOpen ? (
                    <m.span
                        animate={menuIconVisibleState}
                        className="absolute inline-flex"
                        exit={menuIconExitState}
                        initial={menuIconInitialState}
                        key="close-menu"
                        transition={activeIconTransition}
                    >
                        <Cross2Icon aria-hidden="true" className="size-5" />
                    </m.span>
                ) : (
                    <m.span
                        animate={menuIconVisibleState}
                        className="absolute inline-flex"
                        exit={menuIconExitState}
                        initial={menuIconInitialState}
                        key="open-menu"
                        transition={activeIconTransition}
                    >
                        <HamburgerMenuIcon
                            aria-hidden="true"
                            className="size-5"
                        />
                    </m.span>
                )}
            </AnimatePresence>
        </Button>
    );
}

export function TopNavigationMobileMenu({
    children,
    className,
    onKeyDown,
    ...props
}: TopNavigationMobileMenuProps): ReactElement | null {
    const { isMobileMenuOpen, mobileNavigationId } = useTopNavigationState();
    const { closeMobileMenu, focusMobileMenuButton } =
        useTopNavigationActions();
    const shouldReduceMotion = useReducedMotion();
    const mobileMenuRef = useRef<HTMLElement>(null);
    const activeMenuTransition = shouldReduceMotion
        ? reducedMotionMobileMenuTransition
        : mobileMenuTransition;

    useEffect(() => {
        if (!isMobileMenuOpen) {
            return;
        }

        mobileMenuRef.current
            ?.querySelector<HTMLElement>(
                'a, button, [tabindex]:not([tabindex="-1"])',
            )
            ?.focus();
    }, [isMobileMenuOpen]);

    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        onKeyDown?.(event);

        if (event.defaultPrevented || event.key !== 'Escape') {
            return;
        }

        event.preventDefault();
        closeMobileMenu();
        focusMobileMenuButton();
    };

    return (
        <AnimatePresence initial={false}>
            {isMobileMenuOpen ? (
                <m.nav
                    animate={mobileMenuVisibleState}
                    aria-label="Primary"
                    className={cn(
                        'col-span-3 grid w-full grid-cols-1 bg-canvas/96 sm:grid-cols-2 lg:hidden',
                        className,
                    )}
                    exit={mobileMenuExitState}
                    id={mobileNavigationId}
                    initial={mobileMenuInitialState}
                    key={mobileNavigationId}
                    onKeyDown={handleKeyDown}
                    ref={mobileMenuRef}
                    transition={activeMenuTransition}
                    {...props}
                >
                    {children}
                </m.nav>
            ) : null}
        </AnimatePresence>
    );
}
