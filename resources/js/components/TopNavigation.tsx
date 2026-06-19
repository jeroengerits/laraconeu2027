import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import { useId, useMemo, useRef } from 'react';

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
import { TopNavigationContext } from '@/providers/context/TopNavigationContext';
import type { TopNavigationContextValue } from '@/providers/context/TopNavigationContext';

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

    const contextValue = useMemo<TopNavigationContextValue>(
        () => ({
            closeMobileMenu: mobileMenu.close,
            focusMobileMenuButton: () => {
                mobileMenuButtonRef.current?.focus();
            },
            isMobileMenuOpen: mobileMenu.isOpen,
            mobileMenuButtonRef,
            mobileNavigationId,
            toggleMobileMenu: mobileMenu.toggle,
        }),
        [
            mobileMenu.close,
            mobileMenu.isOpen,
            mobileMenu.toggle,
            mobileNavigationId,
        ],
    );

    return (
        <TopNavigationContext.Provider value={contextValue}>
            <header
                className={cn(
                    'fixed inset-x-0 top-0 z-20 grid w-full max-w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-4 gap-y-3 bg-[color-mix(in_oklch,var(--welcome-bg)_72%,transparent)] px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8',
                    className,
                )}
                {...props}
            >
                {children}
            </header>
        </TopNavigationContext.Provider>
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
