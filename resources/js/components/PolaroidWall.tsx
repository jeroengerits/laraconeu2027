import { m, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import { memo, useMemo, useRef } from 'react';
import type { ReactElement } from 'react';

import { ResponsiveImage } from '@/components/ResponsiveImage';
import { useHorizontalDragScroll } from '@/hooks/useHorizontalDragScroll';
import { useHorizontalKeyboardScroll } from '@/hooks/useHorizontalKeyboardScroll';
import { useHorizontalScrollPause } from '@/hooks/useHorizontalScrollPause';
import { useLazyPhotoImage } from '@/hooks/useLazyPhotoImage';
import { useMarqueeScroll } from '@/hooks/useMarqueeScroll';
import { useRandomizedPhotos } from '@/hooks/useRandomizedPhotos';
import { useVisibleItemKeys } from '@/hooks/useVisibleItemKeys';
import { focusVisibleClassName } from '@/lib/focusVisible';
import { createLazyPhotoAssets } from '@/lib/photos';
import type { LazyPhotoAsset } from '@/lib/photos';
import { cn } from '@/lib/utils';

const polaroidWallPhotoModules = import.meta.glob<string>(
    '../../img/photos/resized/*-{tiny,small}.jpg',
    {
        import: 'default',
    },
);

const polaroidWallPhotoSizes = ['tiny', 'small'] as const;
const polaroidWallRowCount = 3;
const scrollResumeDelay = 300;
const polaroidWallImageSizes =
    '(min-width: 72rem) 11rem, (min-width: 40rem) 9.5rem, 8rem';
const polaroidWallImageClassName =
    'aspect-[4/3] select-none object-cover saturate-[1.04]';
const polaroidWallImageContainerClassName =
    'overflow-hidden bg-canvas-foreground/10 ring-1 ring-canvas-foreground/10 shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--color-canvas-foreground)_4%,transparent)]';

const polaroidWallViewport = {
    amount: 0.22,
    margin: '0px 0px -12% 0px',
    once: true,
} as const;

const polaroidWallSectionVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.08,
            staggerChildren: 0.08,
        },
        y: 0,
    },
};

const polaroidWallRowVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 24,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.64,
            ease: [0.16, 1, 0.3, 1],
            type: 'tween',
        },
        y: 0,
    },
};

const polaroidWallCardTransition = {
    damping: 22,
    stiffness: 260,
    type: 'spring',
} as const;

const polaroidWallCardFocusState = {
    rotate: 0,
    scale: 1.04,
    y: -8,
    zIndex: 30,
} as const;

const polaroidWallCardHoverState = {
    rotate: 0,
    scale: 1.045,
    y: -10,
    zIndex: 30,
} as const;

const polaroidWallCardTapState = {
    rotate: 0,
    scale: 1.02,
    y: -5,
} as const;

const polaroidWallPhotos = createLazyPhotoAssets(polaroidWallPhotoModules, {
    alt: (_, index) => getPolaroidWallAlt(index),
    height: 1024,
    requiredSizes: polaroidWallPhotoSizes,
    width: 1536,
});

type PolaroidWallPhoto = LazyPhotoAsset;

type PolaroidWallRowProps = {
    direction: PolaroidWallDirection;
    photos: readonly PolaroidWallPhoto[];
    rowIndex: number;
    shouldReduceMotion: boolean;
    speed: number;
};

type PolaroidWallCardProps = {
    index: number;
    isImageInViewport: boolean;
    itemKey: string;
    photo: PolaroidWallPhoto;
    rowIndex: number;
    shouldReduceMotion: boolean;
};

type PolaroidWallDirection = 'left' | 'right';

export function PolaroidWall(): ReactElement {
    const shouldReduceMotion = useReducedMotion() ?? false;
    const photos = useRandomizedPhotos(polaroidWallPhotos);
    const rows = useMemo(() => createPolaroidWallRows(photos), [photos]);

    return (
        <m.div
            aria-label="Polaroid photo wall"
            initial={shouldReduceMotion ? false : 'hidden'}
            variants={polaroidWallSectionVariants}
            viewport={polaroidWallViewport}
            whileInView={shouldReduceMotion ? undefined : 'visible'}
        >
            <div className="grid gap-1">
                {rows.map((photos, rowIndex) => (
                    <PolaroidWallRow
                        direction={rowIndex % 2 === 0 ? 'left' : 'right'}
                        key={rowIndex}
                        photos={photos}
                        rowIndex={rowIndex}
                        shouldReduceMotion={shouldReduceMotion}
                        speed={0.016 + rowIndex * 0.003}
                    />
                ))}
            </div>
        </m.div>
    );
}

const PolaroidWallRow = memo(function PolaroidWallRow({
    direction,
    photos,
    rowIndex,
    shouldReduceMotion,
    speed,
}: PolaroidWallRowProps): ReactElement {
    const rowRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const loopedPhotos = useMemo(() => [...photos, ...photos], [photos]);
    const visibleCardKeys = useVisibleItemKeys(rowRef, {
        getElementKey: getPolaroidWallElementKey,
        getItemKey: getPolaroidWallItemKey,
        items: loopedPhotos,
        selector: '[data-polaroid-card-key]',
    });
    const {
        isProgrammaticScrollRef,
        pause,
        resume,
        scrollPositionRef,
        scrollToPosition,
    } = useMarqueeScroll(rowRef, {
        direction,
        reduceMotion: shouldReduceMotion,
        resumeDelay: scrollResumeDelay,
        speed,
    });
    const scrollPauseHandlers = useHorizontalScrollPause(rowRef, {
        isDraggingRef,
        isProgrammaticScrollRef,
        pause,
        resume,
        scrollPositionRef,
    });
    const dragHandlers = useHorizontalDragScroll(rowRef, {
        isDraggingRef,
        pause,
        resume,
        scrollPositionRef,
        scrollToPosition,
    });
    const scrollByKeyboard = useHorizontalKeyboardScroll(rowRef, {
        pause,
        reduceMotion: shouldReduceMotion,
        resume,
    });

    return (
        <m.div className="relative min-w-0" variants={polaroidWallRowVariants}>
            <div
                aria-label={`Polaroid wall row ${rowIndex + 1}. Scroll horizontally to browse photos.`}
                className={cn(
                    'flex w-full max-w-full min-w-0 cursor-grab [touch-action:pan-x_pan-y] [scrollbar-width:none] gap-3 overflow-x-scroll overflow-y-hidden overscroll-x-contain px-5 py-2 [-webkit-overflow-scrolling:touch] active:cursor-grabbing sm:gap-4 sm:px-8 sm:py-3 section:gap-5 section:px-14 section:py-4 [&::-webkit-scrollbar]:hidden',
                    focusVisibleClassName,
                )}
                onKeyDown={scrollByKeyboard}
                {...scrollPauseHandlers}
                {...dragHandlers}
                ref={rowRef}
                role="region"
                tabIndex={0}
            >
                {loopedPhotos.map((photo, index) => {
                    const itemKey = getPolaroidWallItemKey(photo, index);

                    return (
                        <PolaroidWallCard
                            index={index}
                            isImageInViewport={visibleCardKeys.has(itemKey)}
                            itemKey={itemKey}
                            key={itemKey}
                            photo={photo}
                            rowIndex={rowIndex}
                            shouldReduceMotion={shouldReduceMotion}
                        />
                    );
                })}
            </div>
        </m.div>
    );
});

const PolaroidWallCard = memo(function PolaroidWallCard({
    index,
    isImageInViewport,
    itemKey,
    photo,
    rowIndex,
    shouldReduceMotion,
}: PolaroidWallCardProps): ReactElement {
    const image = useLazyPhotoImage(photo, isImageInViewport);

    return (
        <m.figure
            className={cn(
                'group relative w-[8rem] shrink-0 border border-canvas-foreground/15 bg-surface/96 p-1 text-surface-foreground shadow-[0_10px_24px_-18px_color-mix(in_oklch,var(--color-canvas-foreground)_52%,transparent),0_2px_8px_-7px_color-mix(in_oklch,var(--color-canvas-foreground)_30%,transparent)] backdrop-blur-[2px] will-change-transform [backface-visibility:hidden] sm:w-[9.5rem] sm:p-1.5 section:w-[11rem] section:p-2',
                getPolaroidWallRotationClassName(index, rowIndex),
            )}
            data-polaroid-card-key={itemKey}
            transition={
                shouldReduceMotion ? undefined : polaroidWallCardTransition
            }
            whileFocus={
                shouldReduceMotion ? undefined : polaroidWallCardFocusState
            }
            whileHover={
                shouldReduceMotion ? undefined : polaroidWallCardHoverState
            }
            whileTap={shouldReduceMotion ? undefined : polaroidWallCardTapState}
        >
            {image !== null ? (
                <ResponsiveImage
                    alt={photo.alt}
                    className={polaroidWallImageClassName}
                    containerClassName={polaroidWallImageContainerClassName}
                    draggable={false}
                    image={image}
                    loading="lazy"
                    reveal={false}
                    sizes={polaroidWallImageSizes}
                />
            ) : (
                <div
                    aria-hidden="true"
                    className={cn(
                        '@container',
                        polaroidWallImageContainerClassName,
                        'aspect-[4/3]',
                    )}
                />
            )}
        </m.figure>
    );
});

function createPolaroidWallRows(
    photos: readonly PolaroidWallPhoto[],
): PolaroidWallPhoto[][] {
    const rows = Array.from<unknown, PolaroidWallPhoto[]>(
        { length: polaroidWallRowCount },
        () => [],
    );

    photos.forEach((photo, index) => {
        rows[index % polaroidWallRowCount].push(photo);
    });

    return rows;
}

function getPolaroidWallItemKey(
    photo: PolaroidWallPhoto,
    index: number,
): string {
    return `${photo.name}-${index}`;
}

function getPolaroidWallElementKey(element: HTMLElement): string | undefined {
    return element.dataset.polaroidCardKey;
}

function getPolaroidWallRotationClassName(
    index: number,
    rowIndex: number,
): string {
    const rotations = [
        '-rotate-3',
        'rotate-2',
        '-rotate-1',
        'rotate-3',
        '-rotate-2',
        'rotate-1',
    ] as const;

    return rotations[(index + rowIndex * 2) % rotations.length];
}

function getPolaroidWallAlt(index: number): string {
    const altTexts = [
        'Laracon EU attendees sharing a candid event moment',
        'People connecting between conference sessions',
        'Audience members watching a talk together',
        'A speaker moment from the Laracon EU stage',
        'Community members gathered on the event floor',
        'Attendees moving through the conference venue',
    ] as const;

    return altTexts[index % altTexts.length];
}
