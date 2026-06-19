import {
    m,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from 'motion/react';
import type { Variants } from 'motion/react';
import { memo, useCallback, useState, useSyncExternalStore } from 'react';
import type { KeyboardEvent, PointerEvent, ReactElement } from 'react';

import {
    createResponsiveImageAsset,
    ResponsiveImage,
} from '@/components/ResponsiveImage';
import type { ResponsiveImageAsset } from '@/components/ResponsiveImage';
import { useFocusVisible } from '@/hooks/useFocusVisible';
import { cn } from '@/lib/utils';

const polaroidPhotoModules = import.meta.glob<string>(
    '../../img/photos/resized/*-{tiny,small,medium,large,huge,mega,original}.jpg',
    {
        eager: true,
        import: 'default',
    },
);

const resizedPhotoPathPattern =
    /\/(?<baseName>.+)-(?<size>tiny|small|medium|large|huge|mega|original)\.jpg$/;

const polaroidPhotoCount = 32;
const polaroidPriorityPhotoCount = 12;
const polaroidDesktopMediaQuery = '(min-width: 72rem)';
const polaroidGalleryTitleId = 'polaroid-gallery-title';
const polaroidGalleryDescriptionId = 'polaroid-gallery-description';

const clearedPolaroidTransforms = [
    { x: -730, y: -420 },
    { x: -520, y: -430 },
    { x: 260, y: -430 },
    { x: 500, y: -395 },
    { x: -750, y: -235 },
    { x: 510, y: -225 },
    { x: -745, y: -20 },
    { x: 520, y: -10 },
    { x: -700, y: 205 },
    { x: 470, y: 215 },
    { x: -480, y: 335 },
    { x: 285, y: 340 },
    { x: -555, y: -320 },
    { x: 305, y: -320 },
    { x: -545, y: 290 },
    { x: 330, y: 285 },
    { x: -675, y: -120 },
    { x: 445, y: -115 },
    { x: -665, y: 95 },
    { x: 430, y: 105 },
    { x: -140, y: -440 },
    { x: 65, y: -440 },
    { x: -150, y: 350 },
    { x: 85, y: 355 },
    { x: -715, y: 115 },
    { x: 485, y: 125 },
    { x: -305, y: -420 },
    { x: 185, y: -420 },
    { x: -305, y: 330 },
    { x: 185, y: 330 },
    { x: -605, y: 20 },
    { x: 380, y: 20 },
] as const satisfies readonly ClearedPolaroidTransform[];

const polaroidLayouts = [
    {
        rotate: -10,
        size: 'w-[14rem] sm:w-[16rem] section:w-[17rem]',
        z: 50,
    },
    {
        rotate: 4,
        size: 'w-[13rem] sm:w-[15rem] section:w-[16rem]',
        z: 80,
    },
    {
        rotate: 11,
        size: 'w-[14rem] sm:w-[16rem] section:w-[17rem]',
        z: 60,
    },
    {
        rotate: 7,
        size: 'w-[14rem] sm:w-[16rem] section:w-[16rem]',
        z: 100,
    },
    {
        rotate: -6,
        size: 'w-[13rem] sm:w-[15rem] section:w-[15rem]',
        z: 90,
    },
    {
        rotate: 9,
        size: 'w-[14rem] sm:w-[16rem] section:w-[17rem]',
        z: 70,
    },
    {
        rotate: 12,
        size: 'w-[13rem] sm:w-[15rem] section:w-[16rem]',
        z: 40,
    },
    {
        rotate: -8,
        size: 'w-[14rem] sm:w-[16rem] section:w-[17rem]',
        z: 110,
    },
    {
        rotate: 3,
        size: 'w-[13rem] sm:w-[15rem] section:w-[16rem]',
        z: 55,
    },
    {
        rotate: -13,
        size: 'w-[12rem] sm:w-[14rem] section:w-[15rem]',
        z: 45,
    },
    {
        rotate: 14,
        size: 'w-[12rem] sm:w-[14rem] section:w-[15rem]',
        z: 35,
    },
    {
        rotate: -2,
        size: 'w-[11rem] sm:w-[13rem] section:w-[14rem]',
        z: 30,
    },
    {
        rotate: -15,
        size: 'w-[10rem] sm:w-[12rem] section:w-[13rem]',
        z: 25,
    },
    {
        rotate: 16,
        size: 'w-[10rem] sm:w-[12rem] section:w-[13rem]',
        z: 20,
    },
    {
        rotate: -12,
        size: 'w-[11rem] sm:w-[13rem] section:w-[14rem]',
        z: 28,
    },
    {
        rotate: -4,
        size: 'w-[10rem] sm:w-[12rem] section:w-[13rem]',
        z: 32,
    },
    {
        rotate: 13,
        size: 'w-[10rem] sm:w-[12rem] section:w-[13rem]',
        z: 38,
    },
    {
        rotate: -16,
        size: 'w-[10rem] sm:w-[12rem] section:w-[13rem]',
        z: 34,
    },
    {
        rotate: 8,
        size: 'w-[11rem] sm:w-[13rem] section:w-[14rem]',
        z: 42,
    },
    {
        rotate: -17,
        size: 'w-[10rem] sm:w-[12rem] section:w-[13rem]',
        z: 26,
    },
    {
        rotate: 18,
        size: 'w-[9rem] sm:w-[11rem] section:w-[12rem]',
        z: 18,
    },
    {
        rotate: -18,
        size: 'w-[9rem] sm:w-[11rem] section:w-[12rem]',
        z: 22,
    },
    {
        rotate: 10,
        size: 'w-[9rem] sm:w-[11rem] section:w-[12rem]',
        z: 24,
    },
    {
        rotate: -11,
        size: 'w-[9rem] sm:w-[11rem] section:w-[12rem]',
        z: 21,
    },
    {
        rotate: 17,
        size: 'w-[9rem] sm:w-[11rem] section:w-[12rem]',
        z: 23,
    },
    {
        rotate: -7,
        size: 'w-[9rem] sm:w-[11rem] section:w-[12rem]',
        z: 19,
    },
    {
        rotate: 6,
        size: 'w-[8rem] sm:w-[10rem] section:w-[11rem]',
        z: 16,
    },
    {
        rotate: -14,
        size: 'w-[8rem] sm:w-[10rem] section:w-[11rem]',
        z: 17,
    },
    {
        rotate: 14,
        size: 'w-[8rem] sm:w-[10rem] section:w-[11rem]',
        z: 14,
    },
    {
        rotate: -19,
        size: 'w-[8rem] sm:w-[10rem] section:w-[11rem]',
        z: 15,
    },
    {
        rotate: 19,
        size: 'w-[8rem] sm:w-[10rem] section:w-[11rem]',
        z: 13,
    },
    {
        rotate: -3,
        size: 'w-[8rem] sm:w-[10rem] section:w-[11rem]',
        z: 12,
    },
] as const satisfies readonly PolaroidLayout[];

const polaroidImageAspectClassNames = [
    'aspect-[4/3]',
    'aspect-[3/2]',
    'aspect-[5/4]',
    'aspect-square',
] as const;

const polaroidTapeClassNames = [
    'left-1/2 -translate-x-1/2 rotate-2',
    'left-5 -rotate-6',
    'right-5 rotate-6',
    'left-1/2 -translate-x-1/2 -rotate-3',
] as const;

const polaroidHeadingVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 18,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            type: 'tween',
        },
        y: 0,
    },
};

const polaroidCardMoveTransition = {
    damping: 32,
    mass: 0.9,
    stiffness: 185,
    type: 'spring',
} as const;

const polaroidCardReducedMotionTransition = {
    duration: 0.01,
    type: 'tween',
} as const;

const polaroidStackVariants: Variants = {
    cleared: {
        transition: {
            delayChildren: 0.03,
            staggerChildren: 0.014,
        },
    },
    scattered: {},
};

const polaroidCardVariants: Variants = {
    cleared: ({
        canAnimateLayout,
        clearX,
        clearY,
        rotate,
        shouldReduceMotion,
    }: PolaroidCardAnimation) => ({
        opacity: 1,
        rotate: shouldReduceMotion ? 0 : rotate,
        scale: 1,
        transition: shouldReduceMotion
            ? polaroidCardReducedMotionTransition
            : polaroidCardMoveTransition,
        x: canAnimateLayout && !shouldReduceMotion ? clearX : 0,
        y: canAnimateLayout && !shouldReduceMotion ? clearY : 0,
    }),
    scattered: ({
        canAnimateLayout,
        scatterRotate,
        scatterX,
        scatterY,
        shouldReduceMotion,
    }: PolaroidCardAnimation) => ({
        opacity: 1,
        rotate: shouldReduceMotion ? 0 : scatterRotate,
        scale: shouldReduceMotion ? 1 : 0.96,
        transition: shouldReduceMotion
            ? polaroidCardReducedMotionTransition
            : polaroidCardMoveTransition,
        x: canAnimateLayout && !shouldReduceMotion ? scatterX : 0,
        y: canAnimateLayout && !shouldReduceMotion ? scatterY : 0,
    }),
};

const polaroidCardInteractionTransition = {
    damping: 22,
    stiffness: 260,
    type: 'spring',
} as const;

const polaroidGalleryRevealViewport = {
    amount: 0.28,
    margin: '0px 0px -12% 0px',
    once: true,
} as const;

const polaroidGalleryRevealTransition = {
    duration: 0.7,
    ease: [0.16, 1, 0.3, 1],
    type: 'tween',
} as const;

const polaroidPointerSpringOptions = {
    damping: 34,
    stiffness: 180,
} as const;

type PolaroidLayout = {
    rotate: number;
    size: string;
    z: number;
};

type ClearedPolaroidTransform = {
    x: number;
    y: number;
};

type PolaroidGalleryItem = {
    photo: PolaroidPhoto;
    scatterRotate: number;
    scatterX: number;
    scatterY: number;
};

type PolaroidPhoto = {
    alt: string;
    image: ResponsiveImageAsset;
    name: string;
};

type PolaroidCardAnimation = {
    canAnimateLayout: boolean;
    clearX: number;
    clearY: number;
    rotate: number;
    scatterRotate: number;
    scatterX: number;
    scatterY: number;
    shouldReduceMotion: boolean;
};

type PolaroidPhotoSize =
    | 'huge'
    | 'large'
    | 'medium'
    | 'mega'
    | 'original'
    | 'small'
    | 'tiny';

type PolaroidPhotoSources = Record<PolaroidPhotoSize, string>;

const polaroidPhotoPool = createPolaroidPhotos();

export function PolaroidGallery(): ReactElement {
    const focusVisibleClassName = useFocusVisible();
    const shouldReduceMotion = useReducedMotion() ?? false;
    const canAnimateLayout = useMediaQuery(polaroidDesktopMediaQuery);
    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const springPointerX = useSpring(pointerX, polaroidPointerSpringOptions);
    const springPointerY = useSpring(pointerY, polaroidPointerSpringOptions);
    const headingX = useTransform(springPointerX, [-1, 1], [-8, 8]);
    const headingY = useTransform(springPointerY, [-1, 1], [-6, 6]);
    const atmosphereX = useTransform(springPointerX, [-1, 1], [-16, 16]);
    const atmosphereY = useTransform(springPointerY, [-1, 1], [-10, 10]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [items] = useState(() => getRandomPolaroidItems());

    const clearPolaroids = useCallback((): void => {
        setIsExpanded(true);
    }, []);

    const scatterPolaroids = useCallback((): void => {
        setIsExpanded(false);
    }, []);

    const resetPointerDepth = useCallback((): void => {
        pointerX.set(0);
        pointerY.set(0);
    }, [pointerX, pointerY]);

    const updatePointerDepth = useCallback(
        (event: PointerEvent<HTMLDivElement>): void => {
            if (
                event.pointerType === 'touch' ||
                shouldReduceMotion ||
                !canAnimateLayout
            ) {
                return;
            }

            const bounds = event.currentTarget.getBoundingClientRect();
            const nextX =
                ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
            const nextY =
                ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

            pointerX.set(nextX);
            pointerY.set(nextY);
        },
        [canAnimateLayout, pointerX, pointerY, shouldReduceMotion],
    );

    const clearPolaroidsOnPointerEnter = useCallback(
        (event: PointerEvent<HTMLDivElement>): void => {
            if (event.pointerType !== 'touch') {
                clearPolaroids();
            }
        },
        [clearPolaroids],
    );

    const scatterPolaroidsOnPointerLeave = useCallback(
        (event: PointerEvent<HTMLDivElement>): void => {
            if (event.pointerType !== 'touch') {
                scatterPolaroids();
                resetPointerDepth();
            }
        },
        [resetPointerDepth, scatterPolaroids],
    );

    const togglePolaroidsOnPointerDown = useCallback(
        (event: PointerEvent<HTMLDivElement>): void => {
            if (event.pointerType === 'touch') {
                setIsExpanded((currentIsExpanded) => !currentIsExpanded);

                return;
            }

            clearPolaroids();
        },
        [clearPolaroids],
    );

    const toggleKeyboardPolaroids = useCallback(
        (event: KeyboardEvent<HTMLDivElement>): void => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setIsExpanded((currentIsExpanded) => !currentIsExpanded);
            }
        },
        [],
    );

    return (
        <m.div
            aria-describedby={polaroidGalleryDescriptionId}
            aria-labelledby={polaroidGalleryTitleId}
            aria-pressed={isExpanded}
            className={cn(
                'relative isolate mx-auto max-w-[112rem] cursor-pointer touch-pan-y overflow-hidden px-4 py-16 [contain-intrinsic-size:80rem] [content-visibility:auto] sm:px-6 sm:py-20 section:min-h-[82rem] section:px-8 section:py-24',
                focusVisibleClassName,
            )}
            initial={
                shouldReduceMotion
                    ? false
                    : {
                          opacity: 0,
                          y: 28,
                      }
            }
            onBlur={scatterPolaroids}
            onFocus={clearPolaroids}
            onKeyDown={toggleKeyboardPolaroids}
            onPointerDown={togglePolaroidsOnPointerDown}
            onPointerEnter={clearPolaroidsOnPointerEnter}
            onPointerLeave={scatterPolaroidsOnPointerLeave}
            onPointerMove={updatePointerDepth}
            role="button"
            tabIndex={0}
            transition={polaroidGalleryRevealTransition}
            viewport={polaroidGalleryRevealViewport}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
        >
            <m.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-4 -z-10 rounded-[2rem] bg-[linear-gradient(135deg,rgba(255,253,240,0.72),rgba(248,239,209,0.18)_48%,rgba(204,57,0,0.12))] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] ring-1 ring-black-950/5 sm:inset-6 section:inset-10 dark:bg-[linear-gradient(135deg,rgba(29,18,7,0.78),rgba(5,4,2,0.2)_52%,rgba(204,57,0,0.14))] dark:shadow-[inset_0_1px_0_rgba(255,253,240,0.08)] dark:ring-cream-50/8"
                style={{
                    x: atmosphereX,
                    y: atmosphereY,
                }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 top-1/2 -z-10 hidden h-px bg-linear-to-r from-transparent via-black-950/10 to-transparent section:block dark:via-cream-50/12"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[16%] bottom-24 -z-10 hidden h-24 rounded-[100%] bg-black-950/10 blur-3xl section:block dark:bg-black-950/45"
            />

            <m.div
                className="pointer-events-none relative z-[160] mx-auto mb-10 max-w-[42rem] rounded-[1.35rem] border border-black-950/8 bg-cream-50/78 px-6 py-7 text-center shadow-[0_28px_70px_-45px_rgba(12,10,9,0.7),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-md sm:px-8 sm:py-8 section:absolute section:top-1/2 section:left-1/2 section:mb-0 section:-translate-x-1/2 section:-translate-y-1/2 dark:border-cream-50/10 dark:bg-black-900/62 dark:shadow-[0_28px_70px_-45px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,253,240,0.08)]"
                animate="visible"
                initial={false}
                style={{
                    x: shouldReduceMotion ? 0 : headingX,
                    y: shouldReduceMotion ? 0 : headingY,
                }}
                variants={polaroidHeadingVariants}
            >
                <p className="font-mono text-xs tracking-[0.24em] text-orange-600 uppercase dark:text-orange-300">
                    Polaroid Gallery
                </p>
                <h2
                    className="mt-4 font-display text-5xl leading-none font-bold text-balance sm:text-6xl"
                    id={polaroidGalleryTitleId}
                >
                    Unforgetable Memories
                </h2>
                <p
                    className="mx-auto mt-4 max-w-[22rem] text-base leading-relaxed font-medium text-black-950/68 sm:text-lg dark:text-cream-50/72"
                    id={polaroidGalleryDescriptionId}
                >
                    Where ideas meet people
                </p>
            </m.div>

            <m.div
                animate={isExpanded ? 'cleared' : 'scattered'}
                className="relative z-10 grid justify-items-center gap-x-4 gap-y-5 sm:grid-cols-2 sm:gap-6 section:block"
                initial="scattered"
                variants={polaroidStackVariants}
            >
                {items.map((item, index) => (
                    <PolaroidCard
                        canAnimateLayout={canAnimateLayout}
                        item={item}
                        index={index}
                        key={item.photo.name}
                        layout={polaroidLayouts[index % polaroidLayouts.length]}
                        shouldReduceMotion={shouldReduceMotion}
                    />
                ))}
            </m.div>
        </m.div>
    );
}

const PolaroidCard = memo(function PolaroidCard({
    canAnimateLayout,
    item,
    index,
    layout,
    shouldReduceMotion,
}: {
    canAnimateLayout: boolean;
    item: PolaroidGalleryItem;
    index: number;
    layout: PolaroidLayout;
    shouldReduceMotion: boolean;
}): ReactElement {
    const { photo } = item;
    const clearedTransform = getClearedPolaroidTransform(index);

    return (
        <m.figure
            custom={
                {
                    canAnimateLayout,
                    clearX: clearedTransform.x,
                    clearY: clearedTransform.y,
                    rotate: layout.rotate,
                    scatterRotate: item.scatterRotate,
                    scatterX: item.scatterX,
                    scatterY: item.scatterY,
                    shouldReduceMotion,
                } satisfies PolaroidCardAnimation
            }
            className={cn(
                'relative cursor-pointer rounded-[0.45rem] bg-cream-50/96 p-2.5 pb-9 shadow-[0_24px_58px_-30px_rgba(12,10,9,0.72),0_8px_18px_-14px_rgba(12,10,9,0.45)] ring-1 shadow-black/20 ring-black/10 backdrop-blur-[2px] will-change-transform select-none [backface-visibility:hidden] [transform-style:preserve-3d] sm:p-3 sm:pb-10 section:absolute section:top-1/2 section:left-1/2 dark:bg-cream-100/96 dark:text-black-950',
                layout.size,
            )}
            layout
            style={{
                zIndex: layout.z,
            }}
            transition={{
                layout: polaroidCardInteractionTransition,
            }}
            variants={polaroidCardVariants}
            whileHover={{
                rotate: 0,
                scale: 1.1,
                transition: polaroidCardInteractionTransition,
                y: -14,
                zIndex: 150,
            }}
            whileTap={{
                rotate: 0,
                scale: 1.07,
                transition: polaroidCardInteractionTransition,
                y: -8,
                zIndex: 150,
            }}
        >
            <span
                aria-hidden="true"
                className={cn(
                    'absolute -top-3 z-10 h-6 w-16 rounded-[0.08rem] bg-cream-50/42 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_2px_10px_-8px_rgba(12,10,9,0.6)] ring-1 ring-cream-50/35 backdrop-blur-[1px]',
                    getPolaroidTapeClassName(index),
                )}
            />
            <ResponsiveImage
                alt={photo.alt}
                className={cn(
                    'rounded-[0.22rem] object-cover saturate-[1.04]',
                    getPolaroidImageAspectClassName(index),
                )}
                containerClassName="overflow-hidden rounded-[0.22rem] bg-black-950/10 ring-1 ring-black/8 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]"
                image={photo.image}
                priority={index < polaroidPriorityPhotoCount}
                reveal={false}
                sizes="(min-width: 72rem) 18vw, (min-width: 40rem) 36vw, 64vw"
            />
            <span className="pointer-events-none absolute inset-x-3 top-3 h-10 rounded-t-[0.22rem] bg-linear-to-b from-white/24 to-transparent" />
            <figcaption className="absolute inset-x-3 bottom-3 truncate font-mono text-[0.66rem] tracking-[0.18em] text-black-950/55 uppercase">
                {getPolaroidCaption(index)}
            </figcaption>
        </m.figure>
    );
});

function createPolaroidPhotos(): PolaroidPhoto[] {
    return createPolaroidPhotoSourceGroups().map(
        ({ baseName, sources }, index) => ({
            alt: getPolaroidAlt(index),
            image: createResponsiveImageAsset(sources, {
                height: 2401,
                originalWidth: 3600,
                width: 3600,
            }),
            name: baseName,
        }),
    );
}

function getRandomPolaroidItems(): PolaroidGalleryItem[] {
    return shufflePolaroidPhotos(polaroidPhotoPool)
        .slice(0, polaroidPhotoCount)
        .map((photo) => ({
            photo,
            scatterRotate: getRandomNumber(-22, 22),
            scatterX: getRandomNumber(-360, 200),
            scatterY: getRandomNumber(-260, 180),
        }));
}

function shufflePolaroidPhotos<T>(items: readonly T[]): T[] {
    const shuffledItems = [...items];

    for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        const currentItem = shuffledItems[index];

        shuffledItems[index] = shuffledItems[swapIndex];
        shuffledItems[swapIndex] = currentItem;
    }

    return shuffledItems;
}

function getRandomNumber(minimum: number, maximum: number): number {
    return Math.round(Math.random() * (maximum - minimum) + minimum);
}

function getClearedPolaroidTransform(index: number): ClearedPolaroidTransform {
    return clearedPolaroidTransforms[index % clearedPolaroidTransforms.length];
}

function getPolaroidImageAspectClassName(index: number): string {
    return polaroidImageAspectClassNames[
        index % polaroidImageAspectClassNames.length
    ];
}

function getPolaroidTapeClassName(index: number): string {
    return polaroidTapeClassNames[index % polaroidTapeClassNames.length];
}

function useMediaQuery(query: string): boolean {
    const subscribe = useCallback(
        (onStoreChange: () => void) => {
            if (typeof window === 'undefined') {
                return noop;
            }

            const mediaQueryList = window.matchMedia(query);

            mediaQueryList.addEventListener('change', onStoreChange);

            return () => {
                mediaQueryList.removeEventListener('change', onStoreChange);
            };
        },
        [query],
    );

    const getSnapshot = useCallback(() => getMediaQueryMatches(query), [query]);

    return useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerMediaQuerySnapshot,
    );
}

function getMediaQueryMatches(query: string): boolean {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia(query).matches;
}

function getServerMediaQuerySnapshot(): boolean {
    return false;
}

function noop(): void {}

function createPolaroidPhotoSourceGroups(): {
    baseName: string;
    sources: PolaroidPhotoSources;
}[] {
    const groupedSources = new Map<
        string,
        Partial<Record<PolaroidPhotoSize, string>>
    >();

    for (const [path, src] of Object.entries(polaroidPhotoModules)) {
        const match = resizedPhotoPathPattern.exec(path);
        const groups = match?.groups;

        if (groups === undefined) {
            continue;
        }

        const baseName = groups.baseName;
        const size = groups.size as PolaroidPhotoSize;
        const sources = groupedSources.get(baseName) ?? {};

        sources[size] = src;
        groupedSources.set(baseName, sources);
    }

    return Array.from(groupedSources.entries())
        .flatMap(([baseName, sources]) => {
            if (!hasCompletePolaroidPhotoSources(sources)) {
                return [];
            }

            return [{ baseName, sources }];
        })
        .toSorted((firstGroup, secondGroup) =>
            firstGroup.baseName.localeCompare(secondGroup.baseName),
        );
}

function hasCompletePolaroidPhotoSources(
    sources: Partial<Record<PolaroidPhotoSize, string>>,
): sources is PolaroidPhotoSources {
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

function getPolaroidAlt(index: number): string {
    const altTexts = [
        'Laracon EU attendees captured in a candid conference moment',
        'People sharing a conversation on the Laracon EU event floor',
        'Audience members watching a session from the conference hall',
        'A speaker moment from the Laracon EU stage',
        'Community members meeting between conference talks',
        'Attendees moving through the Laracon EU venue',
    ] as const;

    return altTexts[index % altTexts.length];
}

function getPolaroidCaption(index: number): string {
    const captions = [
        'Hallway',
        'Main stage',
        'Meetup',
        'Coffee break',
        'Front row',
        'After talk',
    ] as const;

    return captions[index % captions.length];
}
