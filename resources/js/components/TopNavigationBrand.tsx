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
            className={cn('px-0 hover:bg-transparent', className)}
            size="medium"
            variant="ghost"
        >
            <Link href={href} {...props}>
                {children}
            </Link>
        </Button>
    );
}
