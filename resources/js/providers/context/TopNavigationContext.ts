import type { RefObject } from 'react';
import { createContext, useContext } from 'react';

export type TopNavigationStateContextValue = {
    isMobileMenuOpen: boolean;
    mobileMenuButtonRef: RefObject<HTMLButtonElement | null>;
    mobileNavigationId: string;
};

export type TopNavigationActionsContextValue = {
    closeMobileMenu: () => void;
    focusMobileMenuButton: () => void;
    toggleMobileMenu: () => void;
};

export const TopNavigationStateContext =
    createContext<TopNavigationStateContextValue | null>(null);

export const TopNavigationActionsContext =
    createContext<TopNavigationActionsContextValue | null>(null);

export function useTopNavigationState(): TopNavigationStateContextValue {
    const context = useContext(TopNavigationStateContext);

    if (!context) {
        throw new Error(
            'useTopNavigationState must be used within <TopNavigation>.',
        );
    }

    return context;
}

export function useTopNavigationActions(): TopNavigationActionsContextValue {
    const context = useContext(TopNavigationActionsContext);

    if (!context) {
        throw new Error(
            'useTopNavigationActions must be used within <TopNavigation>.',
        );
    }

    return context;
}
