import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { m, useReducedMotion } from 'motion/react';
import type { PanInfo, Variants } from 'motion/react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactElement } from 'react';

import { Button } from '@/components/Button';
import {
    createResponsiveImageAsset,
    ResponsiveImage,
} from '@/components/ResponsiveImage';
import type { ResponsiveImageAsset } from '@/components/ResponsiveImage';
import { useFocusVisible } from '@/hooks/useFocusVisible';
import { cn } from '@/lib/utils';

const polaroidTransitionPhotoModules = import.meta.glob<string>(
    '../../img/photos/resized/{LaraconEU26©NIELSLUIGJES-06807,LaraconEU26©NIELSLUIGJES-01557,LaraconEU26©NIELSLUIGJES-08586,LaraconEU26©NIELSLUIGJES-00697,LaraconEU26©NIELSLUIGJES-06895,LaraconEU26©NIELSLUIGJES-06545,LaraconEU26©NIELSLUIGJES-02079,LaraconEU26©NIELSLUIGJES-07471,LaraconEU26©NIELSLUIGJES-01143,LaraconEU26©NIELSLUIGJES-07334,LaraconEU26©NIELSLUIGJES-02453}-{tiny,small,medium,large,huge,mega,original}.jpg',
    {
        eager: true,
        import: 'default',
    },
);

const resizedPhotoPathPattern =
    /\/(?<baseName>.+)-(?<size>tiny|small|medium|large|huge|mega|original)\.jpg$/;

const polaroidTransitionPhotoCount = 11;
const polaroidTransitionAutoplayDelay = 3600;
const polaroidTransitionTitleId = 'polaroid-transitions-gallery-title';
const polaroidTransitionDescriptionId =
    'polaroid-transitions-gallery-description';

const polaroidTransitionCardLayouts = [
    {
        opacity: 0,
        rotate: -17,
        scale: 0.72,
        x: -520,
        y: 42,
        z: 0,
    },
    {
        opacity: 0.58,
        rotate: -12,
        scale: 0.78,
        x: -350,
        y: 16,
        z: 20,
    },
    {
        opacity: 0.86,
        rotate: -7,
        scale: 0.88,
        x: -188,
        y: -6,
        z: 50,
    },
    {
        opacity: 1,
        rotate: 0,
        scale: 1,
        x: 0,
        y: -28,
        z: 120,
    },
    {
        opacity: 0.86,
        rotate: 7,
        scale: 0.88,
        x: 188,
        y: -6,
        z: 50,
    },
    {
        opacity: 0.58,
        rotate: 12,
        scale: 0.78,
        x: 350,
        y: 16,
        z: 20,
    },
    {
        opacity: 0,
        rotate: 17,
        scale: 0.72,
        x: 520,
        y: 42,
        z: 0,
    },
] as const satisfies readonly PolaroidTransitionCardLayout[];

const polaroidTransitionViewport = {
    amount: 0.28,
    margin: '0px 0px -12% 0px',
    once: true,
} as const;

const polaroidTransitionCardTransition = {
    damping: 32,
    mass: 0.9,
    stiffness: 210,
    type: 'spring',
} as const;

const polaroidTransitionReducedMotionTransition = {
    duration: 0.01,
    type: 'tween',
} as const;

const polaroidTransitionStageVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 28,
    },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.08,
            staggerChildren: 0.04,
        },
        y: 0,
    },
};

const polaroidTransitionHeadingVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 18,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.62,
            ease: [0.16, 1, 0.3, 1],
            type: 'tween',
        },
        y: 0,
    },
};

const polaroidTransitionPhotoPool = createPolaroidTransitionPhotos();

type PolaroidTransitionCardLayout = {
    opacity: number;
    rotate: number;
    scale: number;
    x: number;
    y: number;
    z: number;
};

type PolaroidTransitionPhoto = {
    alt: string;
    image: ResponsiveImageAsset;
    name: string;
};

type PolaroidTransitionPhotoSize =
    | 'huge'
    | 'large'
    | 'medium'
    | 'mega'
    | 'original'
    | 'small'
    | 'tiny';

type PolaroidTransitionPhotoSources = Record<
    PolaroidTransitionPhotoSize,
    string
>;

type PolaroidTransitionCardProps = {
    activeIndex: number;
    index: number;
    isActive: boolean;
    onDragEnd: (
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo,
    ) => void;
    photo: PolaroidTransitionPhoto;
    photoCount: number;
    shouldReduceMotion: boolean;
};

export function PolaroidTransitionsGallery(): ReactElement {
    const focusVisibleClassName = useFocusVisible();
    const shouldReduceMotion = useReducedMotion() ?? false;
    const photos = useMemo(
        () =>
            polaroidTransitionPhotoPool.slice(0, polaroidTransitionPhotoCount),
        [],
    );
    const [activeIndex, setActiveIndex] = useState(0);
    const activePhoto = photos[activeIndex];

    const showPreviousPhoto = useCallback((): void => {
        setActiveIndex((currentIndex) =>
            getWrappedIndex(currentIndex - 1, photos.length),
        );
    }, [photos.length]);

    const showNextPhoto = useCallback((): void => {
        setActiveIndex((currentIndex) =>
            getWrappedIndex(currentIndex + 1, photos.length),
        );
    }, [photos.length]);

    const showPhoto = useCallback((index: number): void => {
        setActiveIndex(index);
    }, []);

    const handleActiveCardDragEnd = useCallback(
        (
            _event: MouseEvent | TouchEvent | PointerEvent,
            info: PanInfo,
        ): void => {
            if (info.offset.x <= -72 || info.velocity.x <= -420) {
                showNextPhoto();

                return;
            }

            if (info.offset.x >= 72 || info.velocity.x >= 420) {
                showPreviousPhoto();
            }
        },
        [showNextPhoto, showPreviousPhoto],
    );

    useEffect(() => {
        if (shouldReduceMotion || photos.length <= 1) {
            return;
        }

        const interval = window.setInterval(
            showNextPhoto,
            polaroidTransitionAutoplayDelay,
        );

        return () => {
            window.clearInterval(interval);
        };
    }, [photos.length, shouldReduceMotion, showNextPhoto]);

    return (
        <m.div
            aria-describedby={polaroidTransitionDescriptionId}
            aria-labelledby={polaroidTransitionTitleId}
            className="relative isolate mx-auto grid min-h-[48rem] max-w-[112rem] overflow-hidden px-4 py-16 sm:min-h-[54rem] sm:px-6 sm:py-20 lg:min-h-[60rem] section:px-8 section:py-24"
            initial={shouldReduceMotion ? false : 'hidden'}
            variants={polaroidTransitionStageVariants}
            viewport={polaroidTransitionViewport}
            whileInView="visible"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-4 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_50%_35%,rgba(204,57,0,0.16),transparent_30%),linear-gradient(135deg,rgba(255,253,240,0.72),rgba(248,239,209,0.24)_52%,rgba(79,131,122,0.12))] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] ring-1 ring-black-950/5 sm:inset-6 section:inset-10 dark:bg-[radial-gradient(circle_at_50%_35%,rgba(255,98,15,0.18),transparent_30%),linear-gradient(135deg,rgba(29,18,7,0.82),rgba(5,4,2,0.44)_52%,rgba(79,131,122,0.14))] dark:shadow-[inset_0_1px_0_rgba(255,253,240,0.08)] dark:ring-cream-50/8"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[18%] bottom-16 -z-10 h-28 rounded-[100%] bg-black-950/12 blur-3xl dark:bg-black-950/55"
            />

            <div className="relative grid content-center gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-12">
                <m.div
                    className="mx-auto max-w-[34rem] text-center lg:mx-0 lg:text-left"
                    variants={polaroidTransitionHeadingVariants}
                >
                    <p className="font-mono text-xs tracking-[0.24em] text-orange-600 uppercase dark:text-orange-300">
                        Polaroid Transitions
                    </p>
                    <h2
                        className="mt-4 font-display text-5xl leading-none font-bold text-balance sm:text-6xl"
                        id={polaroidTransitionTitleId}
                    >
                        A reel of moments
                    </h2>
                    <p
                        className="mt-5 max-w-[32rem] text-base leading-relaxed font-medium text-black-950/68 sm:text-lg dark:text-cream-50/72"
                        id={polaroidTransitionDescriptionId}
                    >
                        Swipe, tap, or let the stack move through scenes from
                        the event floor.
                    </p>

                    <div className="mt-7 flex items-center justify-center gap-3 lg:justify-start">
                        <Button
                            aria-label="Show previous polaroid"
                            className="bg-cream-50/42 backdrop-blur-md dark:bg-cream-50/8"
                            onClick={showPreviousPhoto}
                            size="icon"
                            variant="outline"
                        >
                            <ArrowLeftIcon aria-hidden="true" />
                        </Button>
                        <Button
                            aria-label="Show next polaroid"
                            className="bg-cream-50/42 backdrop-blur-md dark:bg-cream-50/8"
                            onClick={showNextPhoto}
                            size="icon"
                            variant="outline"
                        >
                            <ArrowRightIcon aria-hidden="true" />
                        </Button>
                    </div>
                </m.div>

                <div className="relative mx-auto h-[24rem] w-full max-w-[44rem] sm:h-[32rem] lg:h-[38rem]">
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-[12%] top-1/2 h-px bg-linear-to-r from-transparent via-black-950/14 to-transparent dark:via-cream-50/14"
                    />

                    {photos.map((photo, index) => (
                        <PolaroidTransitionCard
                            activeIndex={activeIndex}
                            index={index}
                            isActive={index === activeIndex}
                            key={photo.name}
                            onDragEnd={handleActiveCardDragEnd}
                            photo={photo}
                            photoCount={photos.length}
                            shouldReduceMotion={shouldReduceMotion}
                        />
                    ))}
                </div>
            </div>

            <div
                aria-label={`Selected photo ${activeIndex + 1} of ${photos.length}: ${activePhoto?.alt ?? 'event photo'}`}
                className="mt-6 flex justify-center gap-2"
                role="tablist"
            >
                {photos.map((photo, index) => (
                    <button
                        aria-label={`Show photo ${index + 1}`}
                        aria-selected={index === activeIndex}
                        className={cn(
                            'h-3 rounded-full border border-current/20',
                            'data-[selected=false]:w-3 data-[selected=true]:w-8',
                            'data-[selected=false]:bg-current/16 data-[selected=true]:bg-orange-600',
                            focusVisibleClassName,
                        )}
                        data-selected={index === activeIndex}
                        key={photo.name}
                        onClick={() => {
                            showPhoto(index);
                        }}
                        role="tab"
                        type="button"
                    />
                ))}
            </div>
        </m.div>
    );
}

const PolaroidTransitionCard = memo(function PolaroidTransitionCard({
    activeIndex,
    index,
    isActive,
    onDragEnd,
    photo,
    photoCount,
    shouldReduceMotion,
}: PolaroidTransitionCardProps): ReactElement {
    const offset = getCircularOffset(index, activeIndex, photoCount);
    const layout = getPolaroidTransitionLayout(offset);
    const isVisible = Math.abs(offset) <= 3;

    return (
        <m.figure
            aria-hidden={!isActive}
            animate={{
                opacity: shouldReduceMotion && !isActive ? 0 : layout.opacity,
                rotate: shouldReduceMotion ? 0 : layout.rotate,
                scale: shouldReduceMotion && !isActive ? 0.94 : layout.scale,
                x: shouldReduceMotion ? 0 : layout.x,
                y: shouldReduceMotion ? 0 : layout.y,
            }}
            className={cn(
                'absolute top-1/2 left-1/2 w-[15.5rem] -translate-x-1/2 -translate-y-1/2 rounded-[0.55rem] bg-cream-50/96 p-2.5 pb-9 shadow-[0_28px_70px_-34px_rgba(12,10,9,0.76),0_8px_22px_-16px_rgba(12,10,9,0.44)] ring-1 ring-black/10 backdrop-blur-[2px] [backface-visibility:hidden] [transform-style:preserve-3d] sm:w-[21rem] sm:p-3 sm:pb-10 dark:bg-cream-100/96 dark:text-black-950',
                isActive
                    ? 'cursor-grab active:cursor-grabbing'
                    : 'pointer-events-none',
                isVisible ? 'block' : 'hidden',
            )}
            drag={isActive && !shouldReduceMotion ? 'x' : false}
            dragConstraints={{
                left: 0,
                right: 0,
            }}
            dragElastic={0.22}
            onDragEnd={isActive ? onDragEnd : undefined}
            style={{
                zIndex: layout.z,
            }}
            transition={
                shouldReduceMotion
                    ? polaroidTransitionReducedMotionTransition
                    : polaroidTransitionCardTransition
            }
            whileHover={
                isActive && !shouldReduceMotion
                    ? {
                          rotate: 0,
                          scale: 1.04,
                          y: layout.y - 8,
                      }
                    : undefined
            }
            whileTap={
                isActive && !shouldReduceMotion
                    ? {
                          rotate: 0,
                          scale: 1.02,
                      }
                    : undefined
            }
        >
            <span
                aria-hidden="true"
                className="absolute -top-3 left-1/2 z-10 h-6 w-16 -translate-x-1/2 rotate-2 rounded-[0.08rem] bg-cream-50/42 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_2px_10px_-8px_rgba(12,10,9,0.6)] ring-1 ring-cream-50/35 backdrop-blur-[1px]"
            />
            <ResponsiveImage
                alt={photo.alt}
                className="aspect-[4/3] rounded-[0.22rem] object-cover saturate-[1.04]"
                containerClassName="overflow-hidden rounded-[0.22rem] bg-black-950/10 ring-1 ring-black/8 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]"
                image={photo.image}
                priority={isActive}
                reveal={false}
                sizes="(min-width: 72rem) 28rem, (min-width: 40rem) 21rem, 16rem"
            />
            <span className="pointer-events-none absolute inset-x-3 top-3 h-10 rounded-t-[0.22rem] bg-linear-to-b from-white/24 to-transparent" />
            <figcaption className="absolute inset-x-3 bottom-3 truncate font-mono text-[0.66rem] tracking-[0.18em] text-black-950/55 uppercase">
                {getPolaroidTransitionCaption(index)}
            </figcaption>
        </m.figure>
    );
});

function getWrappedIndex(index: number, length: number): number {
    return (index + length) % length;
}

function getCircularOffset(
    index: number,
    activeIndex: number,
    length: number,
): number {
    const rawOffset = index - activeIndex;
    const halfLength = Math.floor(length / 2);

    if (rawOffset > halfLength) {
        return rawOffset - length;
    }

    if (rawOffset < -halfLength) {
        return rawOffset + length;
    }

    return rawOffset;
}

function getPolaroidTransitionLayout(
    offset: number,
): PolaroidTransitionCardLayout {
    return polaroidTransitionCardLayouts[
        Math.min(
            Math.max(offset + 3, 0),
            polaroidTransitionCardLayouts.length - 1,
        )
    ];
}

function createPolaroidTransitionPhotos(): PolaroidTransitionPhoto[] {
    return createPolaroidTransitionPhotoSourceGroups().map(
        ({ baseName, sources }, index) => ({
            alt: getPolaroidTransitionAlt(index),
            image: createResponsiveImageAsset(sources, {
                height: 2401,
                originalWidth: 3600,
                width: 3600,
            }),
            name: baseName,
        }),
    );
}

function createPolaroidTransitionPhotoSourceGroups(): {
    baseName: string;
    sources: PolaroidTransitionPhotoSources;
}[] {
    const groupedSources = new Map<
        string,
        Partial<Record<PolaroidTransitionPhotoSize, string>>
    >();

    for (const [path, src] of Object.entries(polaroidTransitionPhotoModules)) {
        const match = resizedPhotoPathPattern.exec(path);
        const groups = match?.groups;

        if (groups === undefined) {
            continue;
        }

        const baseName = groups.baseName;
        const size = groups.size as PolaroidTransitionPhotoSize;
        const sources = groupedSources.get(baseName) ?? {};

        sources[size] = src;
        groupedSources.set(baseName, sources);
    }

    return Array.from(groupedSources.entries())
        .flatMap(([baseName, sources]) => {
            if (!hasCompletePolaroidTransitionPhotoSources(sources)) {
                return [];
            }

            return [{ baseName, sources }];
        })
        .toSorted((firstGroup, secondGroup) =>
            firstGroup.baseName.localeCompare(secondGroup.baseName),
        );
}

function hasCompletePolaroidTransitionPhotoSources(
    sources: Partial<Record<PolaroidTransitionPhotoSize, string>>,
): sources is PolaroidTransitionPhotoSources {
    return (
        sources.huge !== undefined &&
        sources.large !== undefined &&
        sources.medium !== undefined &&
        sources.mega !== undefined &&
        sources.original !== undefined &&
        sources.small !== undefined &&
        sources.tiny !== undefined
    );
}

function getPolaroidTransitionAlt(index: number): string {
    const altTexts = [
        'Laracon EU attendees sharing a candid event moment',
        'Community members talking between conference sessions',
        'People gathered around the Laracon EU venue',
        'A speaker moment from the Laracon EU stage',
        'Audience members watching a session together',
        'Attendees moving through the event floor',
    ] as const;

    return altTexts[index % altTexts.length];
}

function getPolaroidTransitionCaption(index: number): string {
    const captions = [
        'Frame one',
        'In motion',
        'Side stage',
        'Between talks',
        'New ideas',
        'After hours',
    ] as const;

    return captions[index % captions.length];
}
