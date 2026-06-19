import type { ComponentPropsWithoutRef } from 'react';
import type { ReactElement } from 'react';

import { Button } from '@/components/Button';
import { useSmoothAnchorNavigation } from '@/hooks/useSmoothAnchorNavigation';
import { cn } from '@/lib/utils';
import { useTopNavigation } from '@/providers/context/TopNavigationContext';

type TopNavigationLinkProps = ComponentPropsWithoutRef<'a'>;

export type TopNavigationItem = {
    href: string;
    label: string;
};

export type TopNavigationItemsProps = {
    activeHref?: string;
    items: readonly TopNavigationItem[];
};

function TopNavigationLink({
    className,
    onClick,
    ...props
}: TopNavigationLinkProps): ReactElement {
    const handleAnchorNavigation = useSmoothAnchorNavigation();

    return (
        <Button
            asChild
            className={cn(
                'font-medium text-current/70 uppercase hover:bg-transparent hover:text-current aria-[current=location]:text-current',
                className,
            )}
            size="medium"
            variant="ghost"
        >
            <a
                {...props}
                onClick={(event) => {
                    onClick?.(event);
                    handleAnchorNavigation(event);
                }}
            />
        </Button>
    );
}

function TopNavigationMobileLink({
    className,
    onClick,
    ...props
}: TopNavigationLinkProps): ReactElement {
    const { closeMobileMenu } = useTopNavigation();
    const handleAnchorNavigation = useSmoothAnchorNavigation();

    return (
        <Button
            asChild
            className={cn(
                'w-full justify-start font-medium text-current/70 uppercase hover:bg-transparent hover:text-current aria-[current=location]:text-current',
                className,
            )}
            size="medium"
            variant="ghost"
        >
            <a
                {...props}
                onClick={(event) => {
                    onClick?.(event);
                    const wasDefaultPrevented = event.defaultPrevented;

                    handleAnchorNavigation(event);

                    if (!wasDefaultPrevented) {
                        closeMobileMenu();
                    }
                }}
            />
        </Button>
    );
}

function ariaCurrentForItem(
    item: TopNavigationItem,
    activeHref: string | undefined,
): 'location' | undefined {
    return item.href === activeHref ? 'location' : undefined;
}

export function TopNavigationItems({
    activeHref,
    items,
}: TopNavigationItemsProps): ReactElement {
    return (
        <>
            {items.map((item) => (
                <TopNavigationLink
                    aria-current={ariaCurrentForItem(item, activeHref)}
                    href={item.href}
                    key={item.href}
                >
                    {item.label}
                </TopNavigationLink>
            ))}
        </>
    );
}

export function TopNavigationMobileItems({
    activeHref,
    items,
}: TopNavigationItemsProps): ReactElement {
    return (
        <>
            {items.map((item) => (
                <TopNavigationMobileLink
                    aria-current={ariaCurrentForItem(item, activeHref)}
                    href={item.href}
                    key={item.href}
                >
                    {item.label}
                </TopNavigationMobileLink>
            ))}
        </>
    );
}
