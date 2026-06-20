import { createResponsiveImageAsset } from '@/components/ResponsiveImage';
import type {
    ResponsiveImageAsset,
    ResponsiveImageSource,
    ResponsiveImageSources,
} from '@/components/ResponsiveImage';

const defaultPhotoAssetPathPattern =
    /\/(?<baseName>.+)-(?<size>tiny|small|medium|large|huge|mega|original)\.jpg$/;
const photoAssetSizes = [
    'tiny',
    'small',
    'medium',
    'large',
    'huge',
    'mega',
    'original',
] as const satisfies readonly ResponsiveImageSource[];
const defaultPhotoAssetSizes = [
    'tiny',
    'small',
    'medium',
    'large',
] as const satisfies readonly ResponsiveImageSource[];

export type PhotoAssetSize = ResponsiveImageSource;

export type PhotoAssetSources = ResponsiveImageSources;

export type PhotoAsset = {
    alt: string;
    image: ResponsiveImageAsset;
    name: string;
};

export type LazyPhotoAsset = {
    alt: string;
    loadImage: () => Promise<ResponsiveImageAsset>;
    name: string;
};

type CreatePhotoAssetsOptions = {
    alt?: (name: string, index: number) => string;
    height?: number;
    originalWidth?: number;
    pathPattern?: RegExp;
    requiredSizes?: readonly PhotoAssetSize[];
    width?: number;
};

type LoadResponsiveImageAssetOptions = Pick<
    CreatePhotoAssetsOptions,
    'height' | 'originalWidth' | 'width'
> & {
    requiredSizes: readonly PhotoAssetSize[];
};

type PhotoAssetLoader = () => Promise<string>;

type PhotoAssetLoaders = Record<PhotoAssetSize, PhotoAssetLoader>;

export function createPhotoAssets(
    modules: Record<string, string>,
    {
        alt = (name) => name,
        height,
        originalWidth,
        pathPattern = defaultPhotoAssetPathPattern,
        requiredSizes = defaultPhotoAssetSizes,
        width,
    }: CreatePhotoAssetsOptions = {},
): PhotoAsset[] {
    return createPhotoAssetSourceGroups(
        modules,
        pathPattern,
        requiredSizes,
    ).map(({ baseName, sources }, index) => {
        const altText = alt(baseName, index);

        return {
            alt: altText,
            image: createResponsiveImageAsset(sources, {
                height,
                originalWidth,
                width,
            }),
            name: baseName,
        };
    });
}

export function createLazyPhotoAssets(
    modules: Record<string, PhotoAssetLoader>,
    {
        alt = (name) => name,
        height,
        originalWidth,
        pathPattern = defaultPhotoAssetPathPattern,
        requiredSizes = defaultPhotoAssetSizes,
        width,
    }: CreatePhotoAssetsOptions = {},
): LazyPhotoAsset[] {
    return createLazyPhotoAssetLoaderGroups(
        modules,
        pathPattern,
        requiredSizes,
    ).map(({ baseName, loaders }, index) => {
        const altText = alt(baseName, index);
        let image: ResponsiveImageAsset | undefined;
        let imagePromise: Promise<ResponsiveImageAsset> | undefined;

        return {
            alt: altText,
            loadImage: () => {
                if (image !== undefined) {
                    return Promise.resolve(image);
                }

                imagePromise ??= loadResponsiveImageAsset(loaders, {
                    height,
                    originalWidth,
                    requiredSizes,
                    width,
                }).then((loadedImage) => {
                    image = loadedImage;

                    return loadedImage;
                });

                return imagePromise;
            },
            name: baseName,
        };
    });
}

function createPhotoAssetSourceGroups(
    modules: Record<string, string>,
    pathPattern: RegExp,
    requiredSizes: readonly PhotoAssetSize[],
): { baseName: string; sources: PhotoAssetSources }[] {
    const groupedSources = new Map<
        string,
        Partial<Record<PhotoAssetSize, string>>
    >();

    for (const [path, src] of Object.entries(modules)) {
        const match = pathPattern.exec(path);
        const groups = match?.groups;

        if (groups === undefined) {
            continue;
        }

        const size = groups.size;

        if (!isPhotoAssetSize(size)) {
            continue;
        }

        const baseName = groups.baseName;
        const sources = groupedSources.get(baseName) ?? {};

        sources[size] = src;
        groupedSources.set(baseName, sources);
    }

    return Array.from(groupedSources.entries())
        .flatMap(([baseName, sources]) => {
            if (!hasCompletePhotoAssetSources(sources, requiredSizes)) {
                return [];
            }

            return [{ baseName, sources }];
        })
        .toSorted((firstGroup, secondGroup) =>
            firstGroup.baseName.localeCompare(secondGroup.baseName),
        );
}

function createLazyPhotoAssetLoaderGroups(
    modules: Record<string, PhotoAssetLoader>,
    pathPattern: RegExp,
    requiredSizes: readonly PhotoAssetSize[],
): { baseName: string; loaders: PhotoAssetLoaders }[] {
    const groupedLoaders = new Map<
        string,
        Partial<Record<PhotoAssetSize, PhotoAssetLoader>>
    >();

    for (const [path, loader] of Object.entries(modules)) {
        const match = pathPattern.exec(path);
        const groups = match?.groups;

        if (groups === undefined) {
            continue;
        }

        const size = groups.size;

        if (!isPhotoAssetSize(size)) {
            continue;
        }

        const baseName = groups.baseName;
        const loaders = groupedLoaders.get(baseName) ?? {};

        loaders[size] = loader;
        groupedLoaders.set(baseName, loaders);
    }

    return Array.from(groupedLoaders.entries())
        .flatMap(([baseName, loaders]) => {
            if (!hasCompletePhotoAssetLoaders(loaders, requiredSizes)) {
                return [];
            }

            return [{ baseName, loaders }];
        })
        .toSorted((firstGroup, secondGroup) =>
            firstGroup.baseName.localeCompare(secondGroup.baseName),
        );
}

function hasCompletePhotoAssetSources(
    sources: Partial<Record<PhotoAssetSize, string>>,
    requiredSizes: readonly PhotoAssetSize[],
): sources is PhotoAssetSources {
    return requiredSizes.every((size) => sources[size] !== undefined);
}

function hasCompletePhotoAssetLoaders(
    loaders: Partial<Record<PhotoAssetSize, PhotoAssetLoader>>,
    requiredSizes: readonly PhotoAssetSize[],
): loaders is PhotoAssetLoaders {
    return requiredSizes.every((size) => loaders[size] !== undefined);
}

async function loadResponsiveImageAsset(
    loaders: PhotoAssetLoaders,
    {
        height,
        originalWidth,
        requiredSizes,
        width,
    }: LoadResponsiveImageAssetOptions,
): Promise<ResponsiveImageAsset> {
    const sourceEntries = await Promise.all(
        requiredSizes.map(
            async (size) => [size, await loaders[size]()] as const,
        ),
    );
    const sources = Object.fromEntries(sourceEntries) as PhotoAssetSources;

    return createResponsiveImageAsset(sources, {
        height,
        originalWidth,
        width,
    });
}

function isPhotoAssetSize(size: string | undefined): size is PhotoAssetSize {
    return (
        size !== undefined && photoAssetSizes.includes(size as PhotoAssetSize)
    );
}
