import { Cross2Icon } from '@radix-ui/react-icons';
import { AnimatePresence, m } from 'motion/react';
import type { Variants } from 'motion/react';
import { Dialog, VisuallyHidden } from 'radix-ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import type {
    Mesh,
    MeshBasicMaterial,
    ShapeGeometry,
    Texture,
    Vector2,
    Vector3,
} from 'three';
import type * as Three from 'three';

import { Button } from '@/components/Button';
import {
    createResponsiveImageAsset,
    ResponsiveImage,
} from '@/components/ResponsiveImage';
import type { ResponsiveImageAsset } from '@/components/ResponsiveImage';

const impressionPhotoModules = import.meta.glob<string>(
    '../../../img/photos/resized/*-{tiny,small,medium,large,huge,mega,original}.jpg',
    {
        import: 'default',
    },
);

const landscapeImageDimensions = {
    height: 2401,
    width: 3600,
} as const;

const portraitImageDimensions = {
    height: 3600,
    width: 2401,
} as const;

const impressionItemVariants: Variants = {
    hidden: {
        opacity: 0,
        transform: 'translate3d(0, 18px, 0)',
    },
    visible: {
        opacity: 1,
        transform: 'translate3d(0, 0, 0)',
        transition: {
            duration: 0.62,
            ease: [0.16, 1, 0.3, 1],
            type: 'tween',
        },
    },
};

const impressionItemViewport = {
    amount: 0.18,
    once: true,
} as const;

const landscapeAltTexts = [
    'Laracon EU attendees gathering between conference sessions',
    'Conference audience listening during a technical Laracon EU talk',
    'People connecting in the bright Laracon EU venue',
    'Speaker presenting practical ideas on the Laracon EU stage',
    'Attendees sharing a conversation near the conference floor',
    'Laracon EU audience focused on a live coding session',
    'Friends meeting in the hallway between talks',
    'Community members watching a speaker from the front rows',
    'Attendees moving through the venue during the event',
    'Speaker and audience energy inside the main hall',
] as const;

const portraitPhotoBaseNames = new Set(['LaraconEU26©NIELSLUIGJES-02022']);

const resizedPhotoPathPattern =
    /\/(?<baseName>.+)-(?<size>tiny|small|medium|large|huge|mega|original)\.jpg$/;

const impressionPhotoSourceGroups = createImpressionPhotoSourceGroups();

type ImpressionPhotoSize =
    | 'huge'
    | 'large'
    | 'medium'
    | 'mega'
    | 'original'
    | 'small'
    | 'tiny';

type ImpressionPhotoSourceGroup = {
    baseName: string;
    loaders: Record<ImpressionPhotoSize, () => Promise<string>>;
};

type ImpressionPhoto = {
    alt: string;
    image: ResponsiveImageAsset;
    isPortrait: boolean;
    textureSrc: string;
};

type ThreeModule = typeof Three;

type ImpressionMesh = Mesh<ShapeGeometry, MeshBasicMaterial> & {
    userData: {
        basePosition: Vector3;
        baseRotation: number;
        baseSize: Vector2;
        targetOpacity: number;
        targetScale: number;
        targetZ: number;
        photo: ImpressionPhoto;
        texture: Texture | null;
    };
};

export function ImpressionSection(): ReactElement {
    const [impressionPhotos, setImpressionPhotos] = useState<ImpressionPhoto[]>(
        [],
    );
    const [selectedPhoto, setSelectedPhoto] = useState<ImpressionPhoto | null>(
        null,
    );
    const handlePhotoSelect = useCallback((photo: ImpressionPhoto): void => {
        setSelectedPhoto(photo);
    }, []);

    useEffect(() => {
        let isCancelled = false;

        loadImpressionPhotos().then((photos) => {
            if (!isCancelled) {
                setImpressionPhotos(photos);
            }
        });

        return () => {
            isCancelled = true;
        };
    }, []);

    return (
        <section
            aria-label="Impression"
            className="relative isolate scroll-mt-24 overflow-hidden bg-cream-100 px-3 py-14 text-black-950 transition-colors duration-500 sm:px-5 md:py-16 lg:px-6 section:py-20 dark:bg-black-950 dark:text-cream-50"
            id="impression"
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-(--welcome-bg) to-transparent" />
            <m.div
                className="relative mx-auto grid min-h-[78vh] max-w-[112rem] place-items-center overflow-visible"
                initial="hidden"
                variants={impressionItemVariants}
                viewport={impressionItemViewport}
                whileInView="visible"
            >
                <ThreeImpressionGrid
                    onPhotoSelect={handlePhotoSelect}
                    photos={impressionPhotos}
                />
                <ResponsiveImageFallback photos={impressionPhotos} />
            </m.div>
            <ImpressionPhotoDialog
                onOpenChange={(isOpen) => {
                    if (!isOpen) {
                        setSelectedPhoto(null);
                    }
                }}
                photo={selectedPhoto}
            />
        </section>
    );
}

function ThreeImpressionGrid({
    onPhotoSelect,
    photos,
}: {
    onPhotoSelect: (photo: ImpressionPhoto) => void;
    photos: readonly ImpressionPhoto[];
}): ReactElement {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        let cleanupThreeScene: (() => void) | undefined;
        let isCancelled = false;

        if (container === null || photos.length === 0) {
            return;
        }

        import('three').then((three) => {
            if (!isCancelled) {
                cleanupThreeScene = createThreeImpressionScene(
                    three,
                    container,
                    photos,
                    onPhotoSelect,
                );
            }
        });

        return () => {
            isCancelled = true;
            cleanupThreeScene?.();
        };
    }, [onPhotoSelect, photos]);

    return (
        <div
            aria-hidden="true"
            className="absolute inset-0 z-0 cursor-zoom-in overflow-visible"
            ref={containerRef}
        />
    );
}

function ImpressionPhotoDialog({
    onOpenChange,
    photo,
}: {
    onOpenChange: (isOpen: boolean) => void;
    photo: ImpressionPhoto | null;
}): ReactElement {
    return (
        <Dialog.Root onOpenChange={onOpenChange} open={photo !== null}>
            <AnimatePresence>
                {photo !== null ? (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild forceMount>
                            <m.div
                                className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm"
                                exit={{ opacity: 0 }}
                                initial={{ opacity: 0 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                animate={{ opacity: 1 }}
                            />
                        </Dialog.Overlay>
                        <Dialog.Content asChild forceMount>
                            <m.div
                                className="fixed inset-0 z-[90] flex items-center justify-center p-3 outline-none sm:p-6"
                                exit={{
                                    opacity: 0,
                                    scale: 0.96,
                                    y: 10,
                                }}
                                initial={{
                                    opacity: 0,
                                    scale: 0.96,
                                    y: 10,
                                }}
                                transition={{
                                    duration: 0.24,
                                    ease: [0.16, 1, 0.3, 1],
                                    type: 'tween',
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                }}
                            >
                                <VisuallyHidden.Root asChild>
                                    <Dialog.Title>{photo.alt}</Dialog.Title>
                                </VisuallyHidden.Root>
                                <ResponsiveImage
                                    alt={photo.alt}
                                    className="h-full w-full object-contain shadow-2xl shadow-black/50"
                                    containerClassName="flex h-[84vh] w-[94vw] max-w-[96rem] items-center justify-center overflow-hidden bg-black"
                                    image={photo.image}
                                    priority
                                    reveal={false}
                                    sizes="min(94vw, 1536px)"
                                />
                                <Dialog.Close asChild>
                                    <Button
                                        aria-label="Close photo"
                                        className="absolute top-5 right-5 bg-black/60 text-white backdrop-blur-md hover:bg-black/75"
                                        size="icon"
                                        variant="ghost"
                                    >
                                        <Cross2Icon
                                            aria-hidden="true"
                                            className="size-5"
                                        />
                                    </Button>
                                </Dialog.Close>
                            </m.div>
                        </Dialog.Content>
                    </Dialog.Portal>
                ) : null}
            </AnimatePresence>
        </Dialog.Root>
    );
}

function ResponsiveImageFallback({
    photos,
}: {
    photos: readonly ImpressionPhoto[];
}): ReactElement {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 grid grid-cols-4 gap-2 opacity-0 md:grid-cols-8"
        >
            {photos.map((photo) => (
                <ResponsiveImage
                    alt={photo.alt}
                    className="aspect-square object-cover"
                    containerClassName="overflow-hidden"
                    image={photo.image}
                    key={photo.image.src}
                    reveal={false}
                    sizes="12vw"
                />
            ))}
        </div>
    );
}

function createThreeImpressionScene(
    three: ThreeModule,
    container: HTMLDivElement,
    photos: readonly ImpressionPhoto[],
    onPhotoSelect: (photo: ImpressionPhoto) => void,
): () => void {
    const {
        ACESFilmicToneMapping,
        ClampToEdgeWrapping,
        Color,
        LinearFilter,
        Mesh,
        MeshBasicMaterial,
        OrthographicCamera,
        Raycaster,
        Scene,
        Shape,
        ShapeGeometry,
        SRGBColorSpace,
        TextureLoader,
        Vector2,
        Vector3,
        WebGLRenderer,
    } = three;
    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
    const renderer = new WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
    });
    const raycaster = new Raycaster();
    const pointer = new Vector2(10, 10);
    const pointerWorld = new Vector3(999, 999, 0);
    const textureLoader = new TextureLoader();
    const meshes: ImpressionMesh[] = [];
    let animationFrame = 0;
    let activeMesh: ImpressionMesh | null = null;
    let hasPointer = false;
    let photoSelectTimeout = 0;

    renderer.setClearAlpha(0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.domElement.className = 'size-full';
    renderer.domElement.style.touchAction = 'manipulation';
    container.appendChild(renderer.domElement);

    camera.position.z = 10;
    const roundedGeometry = createRoundedPhotoGeometry({
        Shape,
        ShapeGeometry,
    });

    for (const [index, photo] of photos.entries()) {
        const geometry = roundedGeometry.clone();
        const material = new MeshBasicMaterial({
            color: new Color(0xffffff),
            opacity: 0.62,
            transparent: true,
        });
        const mesh = new Mesh(geometry, material) as ImpressionMesh;

        mesh.userData = {
            basePosition: new Vector3(),
            baseRotation: getBaseRotation(index),
            baseSize: new Vector2(1, 1),
            targetOpacity: 0.62,
            targetScale: 1,
            targetZ: 0,
            photo,
            texture: null,
        };
        mesh.rotation.z = mesh.userData.baseRotation;
        scene.add(mesh);
        meshes.push(mesh);

        textureLoader.load(photo.textureSrc, (texture) => {
            prepareTexture(texture, {
                ClampToEdgeWrapping,
                LinearFilter,
                SRGBColorSpace,
            });
            mesh.userData.texture = texture;
            material.map = texture;
            material.needsUpdate = true;
            fitTextureToMesh(texture, mesh);
        });
    }

    function resize(): void {
        const { height, width } = container.getBoundingClientRect();
        const viewportHeight = 10;
        const viewportWidth = viewportHeight * (width / Math.max(height, 1));

        camera.left = viewportWidth / -2;
        camera.right = viewportWidth / 2;
        camera.top = viewportHeight / 2;
        camera.bottom = viewportHeight / -2;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        layoutMeshes(meshes, viewportWidth, viewportHeight);
    }

    function updatePointerInteraction(event: PointerEvent): void {
        const bounds = renderer.domElement.getBoundingClientRect();

        pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
        pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
        pointerWorld.set(
            pointer.x * ((camera.right - camera.left) / 2),
            pointer.y * ((camera.top - camera.bottom) / 2),
            0,
        );
        hasPointer = true;

        raycaster.setFromCamera(pointer, camera);
        const [intersection] = raycaster.intersectObjects(meshes);

        activeMesh =
            (intersection?.object as ImpressionMesh | undefined) ?? null;
    }

    function handlePointerDown(event: PointerEvent): void {
        updatePointerInteraction(event);
        renderer.domElement.setPointerCapture(event.pointerId);
    }

    function handlePointerMove(event: PointerEvent): void {
        updatePointerInteraction(event);
    }

    function handlePointerLeave(): void {
        hasPointer = false;
        activeMesh = null;
    }

    function handlePointerCancel(): void {
        hasPointer = false;
        activeMesh = null;
        window.clearTimeout(photoSelectTimeout);
    }

    function handlePointerUp(event: PointerEvent): void {
        updatePointerInteraction(event);

        if (activeMesh !== null) {
            const selectedPhoto = activeMesh.userData.photo;
            const openDelay = event.pointerType === 'mouse' ? 0 : 170;

            window.clearTimeout(photoSelectTimeout);
            photoSelectTimeout = window.setTimeout(() => {
                onPhotoSelect(selectedPhoto);
            }, openDelay);
        }

        if (renderer.domElement.hasPointerCapture(event.pointerId)) {
            renderer.domElement.releasePointerCapture(event.pointerId);
        }
    }

    function render(): void {
        animationFrame = requestAnimationFrame(render);

        for (const mesh of meshes) {
            updateMeshInteraction(mesh, pointerWorld, activeMesh, hasPointer);
        }

        renderer.render(scene, camera);
    }

    resize();
    render();
    window.addEventListener('resize', resize);
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    renderer.domElement.addEventListener('pointermove', handlePointerMove);
    renderer.domElement.addEventListener('pointercancel', handlePointerCancel);
    renderer.domElement.addEventListener('pointerleave', handlePointerLeave);
    renderer.domElement.addEventListener('pointerup', handlePointerUp);

    return () => {
        cancelAnimationFrame(animationFrame);
        window.clearTimeout(photoSelectTimeout);
        window.removeEventListener('resize', resize);
        renderer.domElement.removeEventListener(
            'pointerdown',
            handlePointerDown,
        );
        renderer.domElement.removeEventListener(
            'pointermove',
            handlePointerMove,
        );
        renderer.domElement.removeEventListener(
            'pointercancel',
            handlePointerCancel,
        );
        renderer.domElement.removeEventListener(
            'pointerleave',
            handlePointerLeave,
        );
        renderer.domElement.removeEventListener('pointerup', handlePointerUp);
        renderer.dispose();
        container.replaceChildren();

        for (const mesh of meshes) {
            mesh.geometry.dispose();
            mesh.material.map?.dispose();
            mesh.material.dispose();
        }
    };
}

function createRoundedPhotoGeometry({
    Shape,
    ShapeGeometry,
}: Pick<ThreeModule, 'Shape' | 'ShapeGeometry'>): ShapeGeometry {
    const width = 1;
    const height = 1;
    const radius = 0.08;
    const x = width / -2;
    const y = height / -2;
    const shape = new Shape();

    shape.moveTo(x + radius, y);
    shape.lineTo(x + width - radius, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + radius);
    shape.lineTo(x + width, y + height - radius);
    shape.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius,
        y + height,
    );
    shape.lineTo(x + radius, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);

    return new ShapeGeometry(shape, 8);
}

async function loadImpressionPhotos(): Promise<ImpressionPhoto[]> {
    const selectedGroups = impressionPhotoSourceGroups.map(loadImpressionPhoto);

    return Promise.all(selectedGroups);
}

async function loadImpressionPhoto(
    group: ImpressionPhotoSourceGroup,
    index: number,
): Promise<ImpressionPhoto> {
    const isPortrait = portraitPhotoBaseNames.has(group.baseName);
    const dimensions = isPortrait
        ? portraitImageDimensions
        : landscapeImageDimensions;
    const [huge, large, medium, mega, original, small, tiny] =
        await Promise.all([
            group.loaders.huge(),
            group.loaders.large(),
            group.loaders.medium(),
            group.loaders.mega(),
            group.loaders.original(),
            group.loaders.small(),
            group.loaders.tiny(),
        ]);

    return {
        alt: landscapeAltTexts[index % landscapeAltTexts.length],
        image: createResponsiveImageAsset(
            {
                huge,
                large,
                medium,
                mega,
                original,
                small,
                tiny,
            },
            {
                ...dimensions,
                originalWidth: dimensions.width,
            },
        ),
        isPortrait,
        textureSrc: tiny,
    };
}

function createImpressionPhotoSourceGroups(): ImpressionPhotoSourceGroup[] {
    const groupedSources = new Map<
        string,
        Partial<Record<ImpressionPhotoSize, () => Promise<string>>>
    >();

    for (const [path, loader] of Object.entries(impressionPhotoModules)) {
        const match = resizedPhotoPathPattern.exec(path);
        const groups = match?.groups;

        if (groups === undefined) {
            continue;
        }

        const baseName = groups.baseName;
        const size = groups.size as ImpressionPhotoSize;
        const loaders = groupedSources.get(baseName) ?? {};

        loaders[size] = loader;
        groupedSources.set(baseName, loaders);
    }

    return Array.from(groupedSources.entries())
        .flatMap(([baseName, loaders]) => {
            if (!hasCompleteResponsiveLoaders(loaders)) {
                return [];
            }

            return [{ baseName, loaders }];
        })
        .toSorted((a, b) => a.baseName.localeCompare(b.baseName));
}

function hasCompleteResponsiveLoaders(
    loaders: Partial<Record<ImpressionPhotoSize, () => Promise<string>>>,
): loaders is Record<ImpressionPhotoSize, () => Promise<string>> {
    return (
        loaders.huge !== undefined &&
        loaders.large !== undefined &&
        loaders.medium !== undefined &&
        loaders.mega !== undefined &&
        loaders.original !== undefined &&
        loaders.small !== undefined &&
        loaders.tiny !== undefined
    );
}

function layoutMeshes(
    meshes: readonly ImpressionMesh[],
    viewportWidth: number,
    viewportHeight: number,
): void {
    const columnCount = Math.max(12, Math.floor(viewportWidth / 0.42));
    const rowCount = Math.ceil(meshes.length / columnCount);
    const gap = 0.08;
    const tileWidth = Math.min(
        (viewportWidth - gap * (columnCount - 1)) / columnCount,
        0.54,
    );
    const tileHeight = Math.min(
        (viewportHeight - gap * (rowCount - 1)) / rowCount,
        tileWidth * 1.2,
    );
    const totalWidth = columnCount * tileWidth + (columnCount - 1) * gap;
    const totalHeight = rowCount * tileHeight + (rowCount - 1) * gap;

    for (const [index, mesh] of meshes.entries()) {
        const column = index % columnCount;
        const row = Math.floor(index / columnCount);
        const x = column * (tileWidth + gap) - totalWidth / 2 + tileWidth / 2;
        const y = totalHeight / 2 - row * (tileHeight + gap) - tileHeight / 2;

        mesh.scale.set(tileWidth, tileHeight, 1);
        mesh.userData.baseSize.set(tileWidth, tileHeight);
        mesh.userData.basePosition.set(x, y, 0);
        mesh.position.copy(mesh.userData.basePosition);

        if (mesh.userData.texture !== null) {
            fitTextureToMesh(mesh.userData.texture, mesh);
        }
    }
}

function updateMeshInteraction(
    mesh: ImpressionMesh,
    pointerWorld: Vector3,
    activeMesh: ImpressionMesh | null,
    hasPointer: boolean,
): void {
    const distance = hasPointer
        ? mesh.userData.basePosition.distanceTo(pointerWorld)
        : Number.POSITIVE_INFINITY;
    const influence = Math.max(0, 1 - distance / 1.9);
    const isActive = activeMesh === mesh;
    const targetScale = isActive ? 4.6 : 0.82 + influence * 1.7;
    const targetOpacity = hasPointer
        ? 0.34 + (isActive ? 0.66 : influence * 0.45)
        : 0.74;
    const targetZ = isActive ? 7 : influence * 3.2;

    mesh.userData.targetScale +=
        (targetScale - mesh.userData.targetScale) * 0.12;
    mesh.userData.targetOpacity +=
        (targetOpacity - mesh.userData.targetOpacity) * 0.1;
    mesh.userData.targetZ += (targetZ - mesh.userData.targetZ) * 0.12;

    mesh.position.x += (mesh.userData.basePosition.x - mesh.position.x) * 0.08;
    mesh.position.y += (mesh.userData.basePosition.y - mesh.position.y) * 0.08;
    mesh.position.z = mesh.userData.targetZ;
    mesh.scale.x +=
        (mesh.userData.baseSize.x * mesh.userData.targetScale - mesh.scale.x) *
        0.08;
    mesh.scale.y +=
        (mesh.userData.baseSize.y * mesh.userData.targetScale - mesh.scale.y) *
        0.08;
    mesh.rotation.z +=
        (mesh.userData.baseRotation * (1 + (isActive ? 1 : influence) * 0.2) -
            mesh.rotation.z) *
        0.08;
    mesh.material.opacity +=
        (mesh.userData.targetOpacity - mesh.material.opacity) * 0.12;
}

function prepareTexture(
    texture: Texture,
    settings: Pick<
        ThreeModule,
        'ClampToEdgeWrapping' | 'LinearFilter' | 'SRGBColorSpace'
    >,
): void {
    texture.colorSpace = settings.SRGBColorSpace;
    texture.minFilter = settings.LinearFilter;
    texture.magFilter = settings.LinearFilter;
    texture.wrapS = settings.ClampToEdgeWrapping;
    texture.wrapT = settings.ClampToEdgeWrapping;
}

function fitTextureToMesh(texture: Texture, mesh: ImpressionMesh): void {
    fitTextureToPlane(
        texture,
        mesh.userData.baseSize.x / Math.max(mesh.userData.baseSize.y, 0.01),
    );
}

function fitTextureToPlane(texture: Texture, planeAspect: number): void {
    const image = texture.image as { height?: number; width?: number };
    const width = image.width ?? 1;
    const height = image.height ?? 1;
    const imageAspect = width / height;

    texture.repeat.set(1, 1);
    texture.offset.set(0, 0);

    if (imageAspect > planeAspect) {
        texture.repeat.x = planeAspect / imageAspect;
        texture.offset.x = (1 - texture.repeat.x) / 2;
    } else {
        texture.repeat.y = imageAspect / planeAspect;
        texture.offset.y = (1 - texture.repeat.y) / 2;
    }

    texture.needsUpdate = true;
}

function getBaseRotation(index: number): number {
    return (((index % 9) - 4) * Math.PI) / 360;
}
