import { m, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';
import type { ComponentPropsWithoutRef, ReactElement } from 'react';

import type { ResponsiveImageAsset } from '@/lib/responsiveImage';
import { cn } from '@/lib/utils';

export { createResponsiveImageAsset } from '@/lib/responsiveImage';
export type {
    ResponsiveImageAsset,
    ResponsiveImageSize,
    ResponsiveImageSource,
    ResponsiveImageSources,
} from '@/lib/responsiveImage';

const defaultResponsiveImageSizes = '100cqw';

const responsiveImageRevealVariants = {
    hidden: {
        opacity: 0,
        transform: 'translateY(12px)',
    },
    visible: {
        opacity: 1,
        transform: 'translateY(0px)',
    },
} as const;

const responsiveImageRevealViewport = {
    amount: 0.2,
    margin: '0px 0px -10% 0px',
    once: true,
} as const;

type ResponsiveImageProps = Omit<
    ComponentPropsWithoutRef<'img'>,
    'alt' | 'sizes' | 'src' | 'srcSet'
> & {
    alt: string;
    containerClassName?: string;
    image: ResponsiveImageAsset;
    priority?: boolean;
    reveal?: boolean;
    sizes?: string;
};

export function ResponsiveImage({
    alt,
    className,
    containerClassName,
    decoding = 'async',
    fetchPriority,
    image,
    height = image.height,
    loading,
    priority = false,
    reveal,
    sizes = defaultResponsiveImageSizes,
    width = image.width,
    ...props
}: ResponsiveImageProps): ReactElement {
    const imageRef = useRef<HTMLImageElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const resolvedFetchPriority =
        fetchPriority ?? (priority ? 'high' : undefined);
    const resolvedLoading = loading ?? (priority ? 'eager' : 'lazy');
    const shouldReveal = (reveal ?? !priority) && !shouldReduceMotion;

    useEffect(() => {
        const imageElement = imageRef.current;

        if (imageElement === null) {
            return;
        }

        if (image.srcSet === undefined) {
            imageElement.removeAttribute('srcset');

            return;
        }

        imageElement.setAttribute('srcset', image.srcSet);
    }, [image.srcSet]);

    return (
        <m.div
            className={cn('@container', containerClassName)}
            initial={shouldReveal ? 'hidden' : false}
            variants={responsiveImageRevealVariants}
            viewport={responsiveImageRevealViewport}
            whileInView={shouldReveal ? 'visible' : undefined}
        >
            <img
                alt={alt}
                className={cn('block w-full object-cover', className)}
                decoding={decoding}
                fetchPriority={resolvedFetchPriority}
                height={height}
                loading={resolvedLoading}
                ref={imageRef}
                sizes={sizes}
                src={image.src}
                width={width}
                {...props}
            />
        </m.div>
    );
}
