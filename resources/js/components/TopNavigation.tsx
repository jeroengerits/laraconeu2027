import { Link } from '@inertiajs/react';
import { Cross2Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import { createContext, useContext, useId, useMemo } from 'react';

import { WordMark } from '@/components/WordMark';
import { useToggleState } from '@/hooks/useToggleState';
import { cn, focusVisibleClassName } from '@/lib/utils';

type TopNavigationContextValue = {
    closeMobileMenu: () => void;
    isMobileMenuOpen: boolean;
    mobileNavigationId: string;
    toggleMobileMenu: () => void;
};

type TopNavigationRootProps = ComponentPropsWithoutRef<'header'>;

type TopNavigationSectionProps = ComponentPropsWithoutRef<'div'>;

type TopNavigationCenterProps = ComponentPropsWithoutRef<'nav'>;

type TopNavigationMenuButtonProps = Omit<
    ComponentPropsWithoutRef<'button'>,
    'aria-controls' | 'aria-expanded' | 'aria-label' | 'onClick' | 'type'
>;

type InertiaLinkProps = ComponentPropsWithoutRef<typeof Link>;

type TopNavigationBrandProps = Omit<InertiaLinkProps, 'children' | 'href'> & {
    href?: InertiaLinkProps['href'];
};

type TopNavigationLinkProps = ComponentPropsWithoutRef<'a'>;

type TopNavigationMobileMenuProps = ComponentPropsWithoutRef<'nav'>;

type TopNavigationTicketLinkProps = ComponentPropsWithoutRef<'a'>;

type TopNavigationComponent = {
    (props: TopNavigationRootProps): ReactElement;
    Brand: (props: TopNavigationBrandProps) => ReactElement;
    Center: (props: TopNavigationCenterProps) => ReactElement;
    End: (props: TopNavigationSectionProps) => ReactElement;
    Link: (props: TopNavigationLinkProps) => ReactElement;
    MenuButton: (props: TopNavigationMenuButtonProps) => ReactElement;
    MobileLink: (props: TopNavigationLinkProps) => ReactElement;
    MobileMenu: (props: TopNavigationMobileMenuProps) => ReactElement | null;
    Start: (props: TopNavigationSectionProps) => ReactElement;
    TicketLink: (props: TopNavigationTicketLinkProps) => ReactElement;
};

const TopNavigationContext = createContext<TopNavigationContextValue | null>(
    null,
);

const navigationLinkClassName = cn(
    'inline-flex h-10 items-center rounded-sm px-2 font-sans text-sm font-medium text-current/70 uppercase transition-colors hover:text-current',
    focusVisibleClassName,
);

const ticketLinkClassName = cn(
    'inline-flex h-10 items-center rounded-sm pair-accent px-3 text-sm font-semibold transition-colors hover:brightness-95',
    focusVisibleClassName,
);

const mobileNavigationLinkClassName = cn(
    'inline-flex h-10 w-full items-center rounded-sm px-2 font-sans text-sm font-medium text-current/70 uppercase transition-colors hover:text-current',
    focusVisibleClassName,
);

const mobileMenuButtonClassName = cn(
    'inline-flex h-10 w-10 items-center justify-center rounded-sm text-current transition-colors hover:text-current/70 lg:hidden',
    focusVisibleClassName,
);

function useTopNavigation() {
    const context = useContext(TopNavigationContext);

    if (!context) {
        throw new Error(
            'TopNavigation compound components must be used inside <TopNavigation>.',
        );
    }

    return context;
}

function TopNavigationRoot({
    children,
    className,
    ...props
}: TopNavigationRootProps) {
    const mobileMenu = useToggleState();
    const generatedMobileNavigationId = useId();
    const mobileNavigationId = `top-navigation-mobile-menu-${generatedMobileNavigationId}`;

    const contextValue = useMemo<TopNavigationContextValue>(
        () => ({
            closeMobileMenu: mobileMenu.close,
            isMobileMenuOpen: mobileMenu.isOpen,
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
                    'relative z-10 grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-4 gap-y-3 px-4 py-4 sm:px-6 lg:px-8',
                    className,
                )}
                {...props}
            >
                {children}
            </header>
        </TopNavigationContext.Provider>
    );
}

function TopNavigationStart({
    children,
    className,
    ...props
}: TopNavigationSectionProps) {
    return (
        <div
            className={cn(
                'col-start-1 flex min-w-0 items-center gap-2 justify-self-start',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}

function TopNavigationCenter({
    children,
    className,
    ...props
}: TopNavigationCenterProps) {
    return (
        <nav
            aria-label="Primary"
            className={cn(
                'col-start-2 hidden items-center justify-center gap-x-2 justify-self-center lg:flex',
                className,
            )}
            {...props}
        >
            {children}
        </nav>
    );
}

function TopNavigationEnd({
    children,
    className,
    ...props
}: TopNavigationSectionProps) {
    return (
        <div
            className={cn(
                'col-start-3 flex items-center gap-2 justify-self-end',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}

function TopNavigationMenuButton({
    className,
    ...props
}: TopNavigationMenuButtonProps) {
    const { isMobileMenuOpen, mobileNavigationId, toggleMobileMenu } =
        useTopNavigation();

    return (
        <button
            aria-controls={mobileNavigationId}
            aria-expanded={isMobileMenuOpen}
            aria-label={
                isMobileMenuOpen
                    ? 'Close navigation menu'
                    : 'Open navigation menu'
            }
            className={cn(mobileMenuButtonClassName, className)}
            onClick={toggleMobileMenu}
            type="button"
            {...props}
        >
            {isMobileMenuOpen ? (
                <Cross2Icon aria-hidden="true" className="size-6" />
            ) : (
                <HamburgerMenuIcon aria-hidden="true" className="size-6" />
            )}
        </button>
    );
}

function TopNavigationBrand({
    className,
    href = '/',
    ...props
}: TopNavigationBrandProps) {
    return (
        <Link
            aria-label="Laracon EU home"
            className={cn(
                'inline-flex h-10 shrink-0 items-center rounded-sm',
                focusVisibleClassName,
                className,
            )}
            href={href}
            {...props}
        >
            <WordMark size="medium" />
        </Link>
    );
}

function TopNavigationLink({ className, ...props }: TopNavigationLinkProps) {
    return <a className={cn(navigationLinkClassName, className)} {...props} />;
}

function TopNavigationMobileMenu({
    children,
    className,
    ...props
}: TopNavigationMobileMenuProps) {
    const { isMobileMenuOpen, mobileNavigationId } = useTopNavigation();

    return isMobileMenuOpen ? (
        <nav
            aria-label="Primary"
            className={cn(
                'col-span-3 grid w-full grid-cols-1 gap-1 sm:grid-cols-2 lg:hidden',
                className,
            )}
            id={mobileNavigationId}
            {...props}
        >
            {children}
        </nav>
    ) : null;
}

function TopNavigationMobileLink({
    className,
    onClick,
    ...props
}: TopNavigationLinkProps) {
    const { closeMobileMenu } = useTopNavigation();

    return (
        <a
            className={cn(mobileNavigationLinkClassName, className)}
            onClick={(event) => {
                onClick?.(event);

                if (!event.defaultPrevented) {
                    closeMobileMenu();
                }
            }}
            {...props}
        />
    );
}

function TopNavigationTicketLink({
    className,
    ...props
}: TopNavigationTicketLinkProps) {
    return <a className={cn(ticketLinkClassName, className)} {...props} />;
}

export const TopNavigation = Object.assign(TopNavigationRoot, {
    Brand: TopNavigationBrand,
    Center: TopNavigationCenter,
    End: TopNavigationEnd,
    Link: TopNavigationLink,
    MenuButton: TopNavigationMenuButton,
    MobileLink: TopNavigationMobileLink,
    MobileMenu: TopNavigationMobileMenu,
    Start: TopNavigationStart,
    TicketLink: TopNavigationTicketLink,
}) satisfies TopNavigationComponent;
