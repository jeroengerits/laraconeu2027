import {
    m,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
} from 'motion/react';
import type { MotionValue } from 'motion/react';
import { useMemo, useRef } from 'react';
import type { PointerEvent, ReactElement } from 'react';

import {
    createResponsiveImageAsset,
    ResponsiveImage,
} from '@/components/ResponsiveImage';
import type { ResponsiveImageAsset } from '@/components/ResponsiveImage';
import { cn } from '@/lib/utils';

const depthGalleryPhotoModules = import.meta.glob<string>(
    '../../img/photos/resized/*-{tiny,small,medium,large,huge,mega,original}.jpg',
    {
        eager: true,
        import: 'default',
    },
);

const resizedPhotoPathPattern =
    /\/(?<baseName>.+)-(?<size>tiny|small|medium|large|huge|mega|original)\.jpg$/;

const depthGalleryLayouts = [
    {
        className: 'top-[6%] left-[5%] w-[42%] sm:w-[30%] lg:w-[24%]',
        depth: 36,
        rotate: -7,
        scrollX: -84,
        scrollY: -116,
        z: 120,
    },
    {
        className: 'top-[3%] right-[6%] w-[46%] sm:w-[34%] lg:w-[27%]',
        depth: 30,
        rotate: 5,
        scrollX: 92,
        scrollY: -92,
        z: 80,
    },
    {
        className:
            'top-[28%] left-[20%] w-[58%] sm:left-[28%] sm:w-[38%] lg:w-[30%]',
        depth: 48,
        rotate: 1,
        scrollX: 0,
        scrollY: -58,
        z: 180,
    },
    {
        className: 'top-[43%] left-[3%] w-[44%] sm:w-[31%] lg:w-[24%]',
        depth: 24,
        rotate: 8,
        scrollX: -106,
        scrollY: 28,
        z: 20,
    },
    {
        className: 'top-[42%] right-[4%] w-[43%] sm:w-[31%] lg:w-[24%]',
        depth: 40,
        rotate: -5,
        scrollX: 112,
        scrollY: -10,
        z: 140,
    },
    {
        className: 'bottom-[9%] left-[12%] w-[45%] sm:w-[32%] lg:w-[25%]',
        depth: 28,
        rotate: -3,
        scrollX: -62,
        scrollY: 106,
        z: 60,
    },
    {
        className: 'right-[16%] bottom-[6%] w-[48%] sm:w-[34%] lg:w-[26%]',
        depth: 44,
        rotate: 6,
        scrollX: 84,
        scrollY: 118,
        z: 160,
    },
    {
        className: 'top-[19%] left-[48%] hidden w-[20%] section:block',
        depth: 20,
        rotate: -10,
        scrollX: 34,
        scrollY: -128,
        z: 40,
    },
] as const satisfies readonly DepthGalleryLayout[];

const depthGalleryViewport = {
    amount: 0.25,
    once: true,
} as const;

type DepthGalleryLayout = {
    className: string;
    depth: number;
    rotate: number;
    scrollX: number;
    scrollY: number;
    z: number;
};

type DepthGalleryPhoto = {
    alt: string;
    image: ResponsiveImageAsset;
    name: string;
};

type DepthGalleryPhotoSize =
    | 'huge'
    | 'large'
    | 'medium'
    | 'mega'
    | 'original'
    | 'small'
    | 'tiny';

type DepthGalleryPhotoSources = Record<DepthGalleryPhotoSize, string>;

type DepthGalleryCardProps = {
    index: number;
    layout: DepthGalleryLayout;
    photo: DepthGalleryPhoto;
    scrollYProgress: MotionValue<number>;
};

const depthGalleryPhotos = createDepthGalleryPhotos();

export function DepthGallery(): ReactElement {
    const galleryRef = useRef<HTMLDivElement>(null);
    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const springPointerX = useSpring(pointerX, {
        damping: 28,
        stiffness: 180,
    });
    const springPointerY = useSpring(pointerY, {
        damping: 28,
        stiffness: 180,
    });
    const rotateX = useTransform(springPointerY, [-1, 1], [4, -4]);
    const rotateY = useTransform(springPointerX, [-1, 1], [-5, 5]);
    const { scrollYProgress } = useScroll({
        offset: ['start end', 'end start'],
        target: galleryRef,
    });
    const photos = useMemo(
        () => depthGalleryPhotos.slice(0, depthGalleryLayouts.length),
        [],
    );

    function handlePointerMove(event: PointerEvent<HTMLDivElement>): void {
        const bounds = event.currentTarget.getBoundingClientRect();

        pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
        pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
    }

    function handlePointerLeave(): void {
        pointerX.set(0);
        pointerY.set(0);
    }

    return (
        <div
            className="relative mx-auto min-h-[46rem] max-w-[112rem] overflow-hidden px-3 py-10 sm:min-h-[52rem] sm:px-5 lg:min-h-[58rem] lg:px-6"
            onPointerLeave={handlePointerLeave}
            onPointerMove={handlePointerMove}
            ref={galleryRef}
        >
            <div className="absolute inset-x-4 top-1/2 h-px bg-black-950/15 dark:bg-cream-50/15" />
            <m.div
                className="relative h-[44rem] sm:h-[50rem] lg:h-[56rem]"
                style={{
                    perspective: 1200,
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
            >
                <m.div
                    className="absolute inset-x-0 top-[38%] z-10 mx-auto grid max-w-[42rem] place-items-center px-6 text-center"
                    initial={{ opacity: 0, y: 24 }}
                    viewport={depthGalleryViewport}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1],
                        type: 'tween',
                    }}
                >
                    <p className="font-mono text-xs tracking-[0.24em] text-orange-600 uppercase dark:text-orange-300">
                        Depth Gallery
                    </p>
                    <h2 className="mt-4 font-display text-5xl leading-none font-bold text-balance sm:text-6xl lg:text-7xl">
                        Moments with dimension
                    </h2>
                </m.div>

                {photos.map((photo, index) => (
                    <DepthGalleryCard
                        index={index}
                        key={photo.name}
                        layout={depthGalleryLayouts[index]}
                        photo={photo}
                        scrollYProgress={scrollYProgress}
                    />
                ))}
            </m.div>
        </div>
    );
}

function DepthGalleryCard({
    index,
    layout,
    photo,
    scrollYProgress,
}: DepthGalleryCardProps): ReactElement {
    const x = useTransform(
        scrollYProgress,
        [0, 1],
        [layout.scrollX * -0.6, layout.scrollX],
    );
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        [layout.scrollY * -0.55, layout.scrollY],
    );
    const z = useTransform(
        scrollYProgress,
        [0, 1],
        [layout.z * -0.25, layout.z],
    );
    const scale = useTransform(scrollYProgress, [0, 0.52, 1], [0.92, 1, 0.96]);

    return (
        <m.figure
            className={cn('absolute z-20', layout.className)}
            initial={{
                opacity: 0,
                transform: 'translate3d(0, 26px, 0)',
            }}
            style={{
                rotateZ: layout.rotate,
                scale,
                transformStyle: 'preserve-3d',
                x,
                y,
                z,
            }}
            transition={{
                delay: index * 0.045,
                duration: 0.68,
                ease: [0.16, 1, 0.3, 1],
                type: 'tween',
            }}
            viewport={depthGalleryViewport}
            whileHover={{
                scale: 1.06,
                z: layout.z + layout.depth,
            }}
            whileInView={{
                opacity: 1,
                transform: 'translate3d(0, 0, 0)',
            }}
            whileTap={{
                scale: 1.04,
                z: layout.z + layout.depth,
            }}
        >
            <ResponsiveImage
                alt={photo.alt}
                className="aspect-[4/3] rounded-md object-cover shadow-2xl ring-1 shadow-black/25 ring-black/10 dark:shadow-black/70 dark:ring-cream-50/10"
                containerClassName="overflow-hidden rounded-md bg-black-950/10 dark:bg-cream-50/10"
                image={photo.image}
                reveal={false}
                sizes="(min-width: 72rem) 28vw, (min-width: 40rem) 36vw, 54vw"
            />
        </m.figure>
    );
}

function createDepthGalleryPhotos(): DepthGalleryPhoto[] {
    return createDepthGalleryPhotoSourceGroups().map(
        ({ baseName, sources }, index) => ({
            alt: getDepthGalleryAlt(index),
            image: createResponsiveImageAsset(sources, {
                height: 2401,
                originalWidth: 3600,
                width: 3600,
            }),
            name: baseName,
        }),
    );
}

function createDepthGalleryPhotoSourceGroups(): {
    baseName: string;
    sources: DepthGalleryPhotoSources;
}[] {
    const groupedSources = new Map<
        string,
        Partial<Record<DepthGalleryPhotoSize, string>>
    >();

    for (const [path, src] of Object.entries(depthGalleryPhotoModules)) {
        const match = resizedPhotoPathPattern.exec(path);
        const groups = match?.groups;

        if (groups === undefined) {
            continue;
        }

        const baseName = groups.baseName;
        const size = groups.size as DepthGalleryPhotoSize;
        const sources = groupedSources.get(baseName) ?? {};

        sources[size] = src;
        groupedSources.set(baseName, sources);
    }

    return Array.from(groupedSources.entries())
        .flatMap(([baseName, sources]) => {
            if (!hasCompleteDepthGalleryPhotoSources(sources)) {
                return [];
            }

            return [{ baseName, sources }];
        })
        .toSorted((firstGroup, secondGroup) =>
            firstGroup.baseName.localeCompare(secondGroup.baseName),
        );
}

function hasCompleteDepthGalleryPhotoSources(
    sources: Partial<Record<DepthGalleryPhotoSize, string>>,
): sources is DepthGalleryPhotoSources {
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

function getDepthGalleryAlt(index: number): string {
    const altTexts = [
        'Laracon EU attendees in conversation at the event',
        'Conference moment with people gathered around the venue',
        'Audience members watching a Laracon EU session',
        'Speaker and attendees sharing the energy of the event',
        'Community members connecting between sessions',
        'Laracon EU atmosphere with people moving through the space',
        'Attendees exchanging ideas during the conference',
        'A candid moment from the Laracon EU community',
    ] as const;

    return altTexts[index % altTexts.length];
}
