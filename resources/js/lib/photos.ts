import type {
    ResponsiveImageAsset,
    ResponsiveImageAssetOptions,
    ResponsiveImageSource,
    ResponsiveImageSources,
} from '@/lib/responsiveImage';
import {
    createResponsiveImageAsset,
    responsiveImageSourceSizes,
} from '@/lib/responsiveImage';

const defaultPhotoAssetPathPattern =
    /\/(?<baseName>.+)-(?<size>tiny|small|medium|large|huge|mega|original)\.jpg$/;
const defaultPhotoAssetSizes = [
    'tiny',
    'small',
    'medium',
    'large',
] as const satisfies readonly ResponsiveImageSource[];

export type PhotoAssetSize = ResponsiveImageSource;

export type PhotoAssetSources = ResponsiveImageSources;

export type LazyPhotoAsset = {
    alt: string;
    loadImage: () => Promise<ResponsiveImageAsset>;
    name: string;
};

type CreatePhotoAssetsOptions = ResponsiveImageAssetOptions & {
    alt?: (name: string, index: number) => string;
    pathPattern?: RegExp;
    requiredSizes?: readonly PhotoAssetSize[];
};

type PhotoAssetLoader = () => Promise<string>;

type PhotoAssetLoaders = Partial<Record<PhotoAssetSize, PhotoAssetLoader>>;

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

function createLazyPhotoAssetLoaderGroups(
    modules: Record<string, PhotoAssetLoader>,
    pathPattern: RegExp,
    requiredSizes: readonly PhotoAssetSize[],
): { baseName: string; loaders: PhotoAssetLoaders }[] {
    const groupedLoaders = new Map<string, PhotoAssetLoaders>();

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

function hasCompletePhotoAssetLoaders(
    loaders: PhotoAssetLoaders,
    requiredSizes: readonly PhotoAssetSize[],
): boolean {
    return requiredSizes.every((size) => loaders[size] !== undefined);
}

async function loadResponsiveImageAsset(
    loaders: PhotoAssetLoaders,
    options: ResponsiveImageAssetOptions,
): Promise<ResponsiveImageAsset> {
    const sourceSizes = responsiveImageSourceSizes.filter(
        (size) => loaders[size] !== undefined,
    );
    const sourceEntries = await Promise.all(
        sourceSizes.map(
            async (size) => [size, await loaders[size]!()] as const,
        ),
    );
    const sources = Object.fromEntries(sourceEntries) as PhotoAssetSources;

    return createResponsiveImageAsset(sources, options);
}

function isPhotoAssetSize(size: string | undefined): size is PhotoAssetSize {
    return (
        size !== undefined &&
        responsiveImageSourceSizes.includes(size as PhotoAssetSize)
    );
}
