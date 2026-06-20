import type { ComponentPropsWithoutRef } from 'react';
import type { ReactElement } from 'react';

import { Button } from '@/components/Button';
import { useSmoothAnchorNavigation } from '@/hooks/useSmoothAnchorNavigation';
import { cn } from '@/lib/utils';
import { useTopNavigationActions } from '@/providers/context/TopNavigationContext';

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
                'h-14 rounded-none px-4 font-mono text-[0.6875rem] font-semibold tracking-[0.14em] text-current/68 uppercase hover:bg-current/5 hover:text-current aria-[current=location]:bg-current/8 aria-[current=location]:text-current',
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
    const { closeMobileMenu } = useTopNavigationActions();
    const handleAnchorNavigation = useSmoothAnchorNavigation();

    return (
        <Button
            asChild
            className={cn(
                'h-12 w-full justify-start rounded-none px-4 font-mono text-[0.6875rem] font-semibold tracking-[0.14em] text-current/68 uppercase hover:bg-current/5 hover:text-current aria-[current=location]:bg-current/8 aria-[current=location]:text-current',
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
