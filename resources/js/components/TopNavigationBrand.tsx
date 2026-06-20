import { Link } from '@inertiajs/react';
import type { ComponentPropsWithoutRef, ReactElement } from 'react';

import { Button } from '@/components/Button';
import { cn } from '@/lib/utils';

type InertiaLinkProps = ComponentPropsWithoutRef<typeof Link>;

export type TopNavigationBrandProps = InertiaLinkProps & {
    href?: InertiaLinkProps['href'];
};

export function TopNavigationBrand({
    children,
    className,
    href = '/',
    ...props
}: TopNavigationBrandProps): ReactElement {
    return (
        <Button
            asChild
            className={cn(
                'h-14 rounded-none px-4 hover:bg-current/5',
                className,
            )}
            size="medium"
            variant="ghost"
        >
            <Link href={href} {...props}>
                {children}
            </Link>
        </Button>
    );
}
