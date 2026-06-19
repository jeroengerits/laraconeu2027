import { m, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
    KeyboardEvent,
    PointerEvent,
    ReactElement,
    RefObject,
} from 'react';

import { ResponsiveImage } from '@/components/ResponsiveImage';
import { useFocusVisible } from '@/hooks/useFocusVisible';
import { useRandomizedPhotos } from '@/hooks/useRandomizedPhotos';
import { createPhotoAssets, type PhotoAsset } from '@/lib/photos';
import { cn } from '@/lib/utils';

const polaroidWallPhotoModules = import.meta.glob<string>(
    '../../img/photos/resized/*-{tiny,small,medium,large}.jpg',
    {
        eager: true,
        import: 'default',
    },
);

const polaroidWallRowCount = 3;
const scrollResumeDelay = 300;
const polaroidWallImageSizes =
    '(min-width: 72rem) 11rem, (min-width: 40rem) 9.5rem, 8rem';
const polaroidWallImageClassName =
    'aspect-[4/3] select-none rounded-[0.22rem] object-cover saturate-[1.04]';
const polaroidWallImageContainerClassName =
    'overflow-hidden rounded-[0.22rem] bg-black-950/10 ring-1 ring-black/8 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]';

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

const polaroidWallPhotos = createPhotoAssets(polaroidWallPhotoModules, {
    alt: (_, index) => getPolaroidWallAlt(index),
    height: 1024,
    width: 1536,
});

type PolaroidWallPhoto = PhotoAsset;

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
};

type PolaroidWallDirection = 'left' | 'right';

function getInitialMarqueeScrollLeft(loopWidth: number): number {
    return loopWidth / 2;
}

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
            whileInView="visible"
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
    const pauseTimeoutRef = useRef<number | null>(null);
    const isPausedRef = useRef(false);
    const isDraggingRef = useRef(false);
    const isInitializedRef = useRef(false);
    const isProgrammaticScrollRef = useRef(false);
    const scrollPositionRef = useRef(0);
    const dragStartXRef = useRef(0);
    const dragStartScrollLeftRef = useRef(0);
    const focusVisibleClassName = useFocusVisible();
    const loopedPhotos = useMemo(() => [...photos, ...photos], [photos]);
    const visibleCardKeys = useVisiblePolaroidCardKeys(rowRef, loopedPhotos);

    const pause = useCallback((): void => {
        isPausedRef.current = true;

        if (pauseTimeoutRef.current !== null) {
            window.clearTimeout(pauseTimeoutRef.current);
            pauseTimeoutRef.current = null;
        }
    }, []);

    const resume = useCallback((): void => {
        if (pauseTimeoutRef.current !== null) {
            window.clearTimeout(pauseTimeoutRef.current);
        }

        pauseTimeoutRef.current = window.setTimeout(() => {
            isPausedRef.current = false;
            pauseTimeoutRef.current = null;
        }, scrollResumeDelay);
    }, []);

    const scrollToPosition = useCallback(
        (row: HTMLDivElement, nextScrollLeft: number): void => {
            scrollPositionRef.current = nextScrollLeft;
            isProgrammaticScrollRef.current = true;
            row.scrollLeft = nextScrollLeft;
        },
        [],
    );

    const pauseForManualScroll = useCallback((): void => {
        const row = rowRef.current;

        if (row === null) {
            return;
        }

        const currentScrollLeft = row.scrollLeft;

        if (
            isProgrammaticScrollRef.current &&
            Math.abs(currentScrollLeft - scrollPositionRef.current) < 1
        ) {
            isProgrammaticScrollRef.current = false;

            return;
        }

        isProgrammaticScrollRef.current = false;
        scrollPositionRef.current = currentScrollLeft;
        pause();

        if (!isDraggingRef.current) {
            resume();
        }
    }, [pause, resume]);

    const pauseForHover = useCallback(
        (event: PointerEvent<HTMLDivElement>): void => {
            if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
                pause();
            }
        },
        [pause],
    );

    const resumeAfterHover = useCallback(
        (event: PointerEvent<HTMLDivElement>): void => {
            if (
                (event.pointerType === 'mouse' ||
                    event.pointerType === 'pen') &&
                !isDraggingRef.current
            ) {
                resume();
            }
        },
        [resume],
    );

    const scrollByKeyboard = useCallback(
        (event: KeyboardEvent<HTMLDivElement>): void => {
            const row = rowRef.current;

            if (row === null) {
                return;
            }

            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault();
                pause();
                row.scrollBy({
                    behavior: shouldReduceMotion ? 'auto' : 'smooth',
                    left: event.key === 'ArrowLeft' ? -280 : 280,
                });
                resume();
            }

            if (event.key === 'Home' || event.key === 'End') {
                event.preventDefault();
                pause();
                row.scrollTo({
                    behavior: shouldReduceMotion ? 'auto' : 'smooth',
                    left: event.key === 'Home' ? 0 : row.scrollWidth,
                });
                resume();
            }
        },
        [pause, resume, shouldReduceMotion],
    );

    const startPointerDrag = useCallback(
        (event: PointerEvent<HTMLDivElement>): void => {
            const row = rowRef.current;

            if (row === null) {
                return;
            }

            pause();

            if (event.pointerType === 'touch' || event.button !== 0) {
                return;
            }

            isDraggingRef.current = true;
            dragStartXRef.current = event.clientX;
            dragStartScrollLeftRef.current = row.scrollLeft;
            scrollPositionRef.current = row.scrollLeft;
            row.setPointerCapture(event.pointerId);
        },
        [pause],
    );

    const scrollByPointerDrag = useCallback(
        (event: PointerEvent<HTMLDivElement>): void => {
            const row = rowRef.current;

            if (row === null || !isDraggingRef.current) {
                return;
            }

            event.preventDefault();
            const nextScrollLeft =
                dragStartScrollLeftRef.current -
                (event.clientX - dragStartXRef.current);

            scrollToPosition(row, nextScrollLeft);
        },
        [scrollToPosition],
    );

    const endPointerDrag = useCallback(
        (event: PointerEvent<HTMLDivElement>): void => {
            const row = rowRef.current;

            if (
                row !== null &&
                isDraggingRef.current &&
                row.hasPointerCapture(event.pointerId)
            ) {
                row.releasePointerCapture(event.pointerId);
            }

            isDraggingRef.current = false;
            resume();
        },
        [resume],
    );

    useEffect(() => {
        if (shouldReduceMotion) {
            return;
        }

        let animationFrame = 0;
        let previousTimestamp = 0;

        function scrollFrame(timestamp: number): void {
            const row = rowRef.current;

            if (row !== null) {
                const loopWidth = row.scrollWidth / 2;
                const canAutoScroll = loopWidth > row.clientWidth;

                if (!canAutoScroll) {
                    scrollPositionRef.current = row.scrollLeft;
                    previousTimestamp = timestamp;
                    animationFrame = window.requestAnimationFrame(scrollFrame);

                    return;
                }

                if (!isInitializedRef.current) {
                    scrollToPosition(
                        row,
                        getInitialMarqueeScrollLeft(loopWidth),
                    );
                    isInitializedRef.current = true;
                }

                if (isPausedRef.current) {
                    scrollPositionRef.current = row.scrollLeft;
                } else if (isInitializedRef.current && previousTimestamp > 0) {
                    const delta = timestamp - previousTimestamp;
                    let nextScrollLeft =
                        scrollPositionRef.current +
                        (direction === 'left' ? 1 : -1) * speed * delta;

                    if (direction === 'left' && nextScrollLeft >= loopWidth) {
                        nextScrollLeft -= loopWidth;
                    }

                    if (direction === 'right' && nextScrollLeft <= 0) {
                        nextScrollLeft += loopWidth;
                    }

                    scrollToPosition(row, nextScrollLeft);
                }
            }

            previousTimestamp = timestamp;
            animationFrame = window.requestAnimationFrame(scrollFrame);
        }

        animationFrame = window.requestAnimationFrame(scrollFrame);

        return () => {
            window.cancelAnimationFrame(animationFrame);

            if (pauseTimeoutRef.current !== null) {
                window.clearTimeout(pauseTimeoutRef.current);
            }
        };
    }, [direction, scrollToPosition, shouldReduceMotion, speed]);

    return (
        <m.div className="relative min-w-0" variants={polaroidWallRowVariants}>
            <div
                aria-label={`Polaroid wall row ${rowIndex + 1}. Scroll horizontally to browse photos.`}
                className={cn(
                    'flex w-full max-w-full min-w-0 cursor-grab [touch-action:pan-x_pan-y] [scrollbar-width:none] gap-3 overflow-x-scroll overflow-y-hidden overscroll-x-contain px-5 py-2 [-webkit-overflow-scrolling:touch] active:cursor-grabbing sm:gap-4 sm:px-8 sm:py-3 section:gap-5 section:px-14 section:py-4 [&::-webkit-scrollbar]:hidden',
                    focusVisibleClassName,
                )}
                onKeyDown={scrollByKeyboard}
                onLostPointerCapture={endPointerDrag}
                onPointerCancel={endPointerDrag}
                onPointerDown={startPointerDrag}
                onPointerEnter={pauseForHover}
                onPointerLeave={resumeAfterHover}
                onPointerMove={scrollByPointerDrag}
                onPointerUp={endPointerDrag}
                onScroll={pauseForManualScroll}
                onTouchCancel={resume}
                onTouchEnd={resume}
                onTouchStart={pause}
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
}: PolaroidWallCardProps): ReactElement {
    return (
        <m.figure
            className={cn(
                'group relative w-[8rem] shrink-0 rounded-[0.4rem] bg-cream-50/96 p-1 shadow-[0_18px_42px_-28px_rgba(12,10,9,0.7),0_4px_14px_-12px_rgba(12,10,9,0.4)] ring-1 ring-black/10 backdrop-blur-[2px] will-change-transform [backface-visibility:hidden] sm:w-[9.5rem] sm:p-1.5 section:w-[11rem] section:p-2 dark:bg-cream-100/96 dark:text-black-950',
                getPolaroidWallRotationClassName(index, rowIndex),
            )}
            data-polaroid-card-key={itemKey}
            transition={polaroidWallCardTransition}
            whileFocus={{
                rotate: 0,
                scale: 1.04,
                y: -8,
                zIndex: 30,
            }}
            whileHover={{
                rotate: 0,
                scale: 1.045,
                y: -10,
                zIndex: 30,
            }}
            whileTap={{
                rotate: 0,
                scale: 1.02,
                y: -5,
            }}
        >
            {isImageInViewport ? (
                <ResponsiveImage
                    alt={photo.alt}
                    className={polaroidWallImageClassName}
                    containerClassName={polaroidWallImageContainerClassName}
                    draggable={false}
                    image={photo.image}
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

function useVisiblePolaroidCardKeys(
    rowRef: RefObject<HTMLDivElement | null>,
    photos: readonly PolaroidWallPhoto[],
): ReadonlySet<string> {
    const [visibleCardKeys, setVisibleCardKeys] = useState<ReadonlySet<string>>(
        () => new Set(),
    );

    useEffect(() => {
        const row = rowRef.current;

        if (row === null) {
            return;
        }

        if (typeof IntersectionObserver === 'undefined') {
            const fallbackTimeout = window.setTimeout(() => {
                setVisibleCardKeys(
                    new Set(
                        photos.map((photo, index) =>
                            getPolaroidWallItemKey(photo, index),
                        ),
                    ),
                );
            }, 0);

            return () => {
                window.clearTimeout(fallbackTimeout);
            };
        }

        const observedElements = Array.from(
            row.querySelectorAll<HTMLElement>('[data-polaroid-card-key]'),
        );

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) {
                        continue;
                    }

                    const cardKey = (entry.target as HTMLElement).dataset
                        .polaroidCardKey;

                    if (cardKey !== undefined) {
                        setVisibleCardKeys((currentCardKeys) => {
                            if (currentCardKeys.has(cardKey)) {
                                return currentCardKeys;
                            }

                            return new Set(currentCardKeys).add(cardKey);
                        });
                    }

                    observer.unobserve(entry.target);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.01,
            },
        );

        for (const element of observedElements) {
            observer.observe(element);
        }

        return () => {
            observer.disconnect();
        };
    }, [photos, rowRef]);

    return visibleCardKeys;
}

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
