import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import { useCallback, useId, useMemo, useRef } from 'react';

import { TopNavigationBrand } from '@/components/TopNavigationBrand';
import type { TopNavigationBrandProps } from '@/components/TopNavigationBrand';
import {
    TopNavigationEnd,
    TopNavigationPrimary,
    TopNavigationStart,
} from '@/components/TopNavigationLayout';
import type {
    TopNavigationPrimaryProps,
    TopNavigationSectionProps,
} from '@/components/TopNavigationLayout';
import {
    TopNavigationItems,
    TopNavigationMobileItems,
} from '@/components/TopNavigationLinks';
import type { TopNavigationItemsProps } from '@/components/TopNavigationLinks';
import {
    TopNavigationMenuButton,
    TopNavigationMobileMenu,
} from '@/components/TopNavigationMenu';
import type {
    TopNavigationMenuButtonProps,
    TopNavigationMobileMenuProps,
} from '@/components/TopNavigationMenu';
import { useToggleState } from '@/hooks/useToggleState';
import { cn } from '@/lib/utils';
import {
    TopNavigationActionsContext,
    TopNavigationStateContext,
} from '@/providers/context/TopNavigationContext';
import type {
    TopNavigationActionsContextValue,
    TopNavigationStateContextValue,
} from '@/providers/context/TopNavigationContext';

export type { TopNavigationItem } from '@/components/TopNavigationLinks';

type TopNavigationRootProps = ComponentPropsWithoutRef<'header'>;

type TopNavigationComponent = {
    (props: TopNavigationRootProps): ReactElement;
    Brand: (props: TopNavigationBrandProps) => ReactElement;
    Center: (props: TopNavigationPrimaryProps) => ReactElement;
    End: (props: TopNavigationSectionProps) => ReactElement;
    Items: (props: TopNavigationItemsProps) => ReactElement;
    MenuButton: (props: TopNavigationMenuButtonProps) => ReactElement;
    MobileItems: (props: TopNavigationItemsProps) => ReactElement;
    MobileMenu: (props: TopNavigationMobileMenuProps) => ReactElement | null;
    Primary: (props: TopNavigationPrimaryProps) => ReactElement;
    Start: (props: TopNavigationSectionProps) => ReactElement;
};

function TopNavigationRoot({
    children,
    className,
    ...props
}: TopNavigationRootProps): ReactElement {
    const mobileMenu = useToggleState();
    const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
    const generatedMobileNavigationId = useId();
    const mobileNavigationId = `top-navigation-mobile-menu-${generatedMobileNavigationId}`;

    const focusMobileMenuButton = useCallback(() => {
        mobileMenuButtonRef.current?.focus();
    }, []);

    const stateContextValue = useMemo<TopNavigationStateContextValue>(
        () => ({
            isMobileMenuOpen: mobileMenu.isOpen,
            mobileMenuButtonRef,
            mobileNavigationId,
        }),
        [mobileMenu.isOpen, mobileNavigationId],
    );

    const actionsContextValue = useMemo<TopNavigationActionsContextValue>(
        () => ({
            closeMobileMenu: mobileMenu.close,
            focusMobileMenuButton,
            toggleMobileMenu: mobileMenu.toggle,
        }),
        [focusMobileMenuButton, mobileMenu.close, mobileMenu.toggle],
    );

    return (
        <TopNavigationActionsContext.Provider value={actionsContextValue}>
            <TopNavigationStateContext.Provider value={stateContextValue}>
                <header
                    className={cn(
                        'fixed inset-x-0 top-0 z-20 grid w-full max-w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-4 gap-y-3 bg-canvas/72 px-4 py-4 backdrop-blur-xl transition-color-mode sm:px-6 lg:px-8',
                        className,
                    )}
                    {...props}
                >
                    {children}
                </header>
            </TopNavigationStateContext.Provider>
        </TopNavigationActionsContext.Provider>
    );
}

export const TopNavigation = Object.assign(TopNavigationRoot, {
    Brand: TopNavigationBrand,
    Center: TopNavigationPrimary,
    End: TopNavigationEnd,
    Items: TopNavigationItems,
    MenuButton: TopNavigationMenuButton,
    MobileItems: TopNavigationMobileItems,
    MobileMenu: TopNavigationMobileMenu,
    Primary: TopNavigationPrimary,
    Start: TopNavigationStart,
}) satisfies TopNavigationComponent;
