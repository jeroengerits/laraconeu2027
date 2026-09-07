import type { ComponentPropsWithoutRef, ReactElement } from 'react';

import { Button } from '@/components/Button';
import { cn } from '@/lib/utils';

export type TopNavigationBrandProps = ComponentPropsWithoutRef<'a'>;

export function TopNavigationBrand({
    children,
    className,
    href = '/',
    onClick,
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
            <a
                href={href}
                onClick={(event) => {
                    window.scrollTo(0, 0);
                    onClick?.(event);
                }}
                {...props}
            >
                {children}
            </a>
        </Button>
    );
}
