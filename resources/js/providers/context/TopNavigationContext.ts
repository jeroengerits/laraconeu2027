import type { RefObject } from 'react';
import { createContext, useContext } from 'react';

export type TopNavigationContextValue = {
    closeMobileMenu: () => void;
    focusMobileMenuButton: () => void;
    isMobileMenuOpen: boolean;
    mobileNavigationId: string;
    mobileMenuButtonRef: RefObject<HTMLButtonElement | null>;
    toggleMobileMenu: () => void;
};

export const TopNavigationContext =
    createContext<TopNavigationContextValue | null>(null);

export function useTopNavigation(): TopNavigationContextValue {
    const context = useContext(TopNavigationContext);

    if (!context) {
        throw new Error(
            'TopNavigation compound components must be used inside <TopNavigation>.',
        );
    }

    return context;
}
