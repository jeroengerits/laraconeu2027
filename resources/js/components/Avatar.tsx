import { PersonIcon } from '@radix-ui/react-icons';
import { Avatar as AvatarPrimitive } from 'radix-ui';
import type { ComponentPropsWithoutRef, ReactElement } from 'react';

import { speakerInitials } from '@/lib/speakerInitials';
import { cn } from '@/lib/utils';

export type AvatarSize = 'lg' | 'md' | 'sm';

type AvatarRootProps = {
    className?: string;
    name?: string;
    size?: AvatarSize;
    src?: string;
};

type AvatarImageProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;

type AvatarFallbackProps = ComponentPropsWithoutRef<
    typeof AvatarPrimitive.Fallback
>;

type AvatarGroupProps = ComponentPropsWithoutRef<'div'> & {
    'aria-label': string;
};

type AvatarComponent = {
    (props: AvatarRootProps): ReactElement;
    Fallback: (props: AvatarFallbackProps) => ReactElement;
    Group: (props: AvatarGroupProps) => ReactElement;
    Image: (props: AvatarImageProps) => ReactElement;
};

const avatarSizeClassNames: Record<AvatarSize, string> = {
    sm: 'size-8 text-xs',
    md: 'size-12 text-sm',
    lg: 'size-16 text-base',
};

const avatarIconSizeClassNames: Record<AvatarSize, string> = {
    sm: 'size-4',
    md: 'size-5',
    lg: 'size-6',
};

function AvatarRoot({
    className,
    name,
    size = 'md',
    src,
}: AvatarRootProps): ReactElement {
    const initials = name ? speakerInitials(name) : undefined;
    const alt = name ? `${name}` : '';

    return (
        <AvatarPrimitive.Root
            className={cn(
                'relative inline-flex shrink-0 overflow-hidden rounded-full bg-muted',
                avatarSizeClassNames[size],
                className,
            )}
        >
            {src ? (
                <AvatarPrimitive.Image
                    alt={alt}
                    className="aspect-square size-full object-cover"
                    loading="lazy"
                    src={src}
                />
            ) : null}
            <AvatarPrimitive.Fallback
                className="flex size-full items-center justify-center bg-muted font-semibold text-muted-foreground uppercase"
                delayMs={src ? 600 : undefined}
            >
                {initials ? (
                    initials
                ) : (
                    <PersonIcon
                        aria-hidden="true"
                        className={avatarIconSizeClassNames[size]}
                    />
                )}
            </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
    );
}

function AvatarImage({
    className,
    ...props
}: AvatarImageProps): ReactElement {
    return (
        <AvatarPrimitive.Image
            className={cn('aspect-square size-full object-cover', className)}
            loading="lazy"
            {...props}
        />
    );
}

function AvatarFallback({
    children,
    className,
    ...props
}: AvatarFallbackProps): ReactElement {
    return (
        <AvatarPrimitive.Fallback
            className={cn(
                'flex size-full items-center justify-center bg-muted font-semibold text-muted-foreground uppercase',
                className,
            )}
            {...props}
        >
            {children}
        </AvatarPrimitive.Fallback>
    );
}

function AvatarGroup({
    'aria-label': ariaLabel,
    children,
    className,
    ...props
}: AvatarGroupProps): ReactElement {
    return (
        <div
            aria-label={ariaLabel}
            className={cn('flex flex-wrap items-center gap-3', className)}
            role="group"
            {...props}
        >
            {children}
        </div>
    );
}

export const Avatar = Object.assign(AvatarRoot, {
    Fallback: AvatarFallback,
    Group: AvatarGroup,
    Image: AvatarImage,
}) as AvatarComponent;

export type {
    AvatarFallbackProps,
    AvatarGroupProps,
    AvatarImageProps,
    AvatarRootProps,
};
