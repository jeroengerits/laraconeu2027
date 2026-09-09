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

export const responsiveImageSourceSizes = [
    'tiny',
    'small',
    'medium',
    'large',
    'huge',
    'mega',
    'original',
] as const satisfies readonly ResponsiveImageSource[];

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

export type ResponsiveImageAssetOptions = {
    height?: number;
    originalWidth?: number;
    width?: number;
};

export function createResponsiveImageAsset(
    sources: ResponsiveImageSources,
    options: ResponsiveImageAssetOptions = {},
): ResponsiveImageAsset {
    const sourceSetParts: string[] = [];

    for (const sourceName of responsiveImageSourceSizes) {
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
        srcSet:
            sourceSetParts.length > 0 ? sourceSetParts.join(', ') : undefined,
        width: options.width,
    };
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
