import { m, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';
import type { ComponentPropsWithoutRef, ReactElement } from 'react';

import { cn } from '@/lib/utils';

const defaultResponsiveImageSizes = '100cqw';

const responsiveImageWidthsBySize = {
    tiny: 480,
    small: 768,
    medium: 1024,
    large: 1536,
    huge: 2048,
    mega: 2880,
} as const;

const responsiveImageSourceOrder = [
    'small',
    'tiny',
    'medium',
    'large',
    'huge',
    'mega',
    'original',
] as const satisfies readonly ResponsiveImageSource[];

const responsiveImageSourceSetOrder = [
    'tiny',
    'small',
    'medium',
    'large',
    'huge',
    'mega',
    'original',
] as const satisfies readonly ResponsiveImageSource[];

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

type AtLeastOne<T> = {
    [Key in keyof T]-?: Required<Pick<T, Key>> & Partial<Omit<T, Key>>;
}[keyof T];

export type ResponsiveImageSize = keyof typeof responsiveImageWidthsBySize;

export type ResponsiveImageSource = ResponsiveImageSize | 'original';

export type ResponsiveImageSources = AtLeastOne<
    Record<ResponsiveImageSource, string>
>;

export type ResponsiveImageAsset = {
    height?: number;
    src: string;
    srcSet?: string;
    width?: number;
};

type ResponsiveImageAssetOptions = {
    height?: number;
    originalWidth?: number;
    width?: number;
};

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

export function createResponsiveImageAsset(
    sources: ResponsiveImageSources,
    options: ResponsiveImageAssetOptions = {},
): ResponsiveImageAsset {
    const sourceSetParts: string[] = [];

    for (const sourceName of responsiveImageSourceSetOrder) {
        const source = sources[sourceName];
        const width =
            sourceName === 'original'
                ? options.originalWidth
                : responsiveImageWidthsBySize[sourceName];

        if (source !== undefined && width !== undefined) {
            sourceSetParts.push(`${source} ${width}w`);
        }
    }

    return {
        height: options.height,
        src: getFallbackSource(sources),
        srcSet: getOptionalSourceSet(sourceSetParts),
        width: options.width,
    };
}

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

function getOptionalSourceSet(
    sourceSetParts: readonly string[],
): string | undefined {
    if (sourceSetParts.length === 0) {
        return undefined;
    }

    return sourceSetParts.join(', ');
}

function getFallbackSource(sources: ResponsiveImageSources): string {
    for (const source of responsiveImageSourceOrder) {
        const fallbackSource = sources[source];

        if (fallbackSource !== undefined) {
            return fallbackSource;
        }
    }

    throw new Error('ResponsiveImage requires at least one source.');
}
