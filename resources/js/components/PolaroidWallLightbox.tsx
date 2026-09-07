import { Cross1Icon } from '@radix-ui/react-icons';
import { Dialog } from 'radix-ui';
import type { ReactElement } from 'react';

import { Button } from '@/components/Button';
import type { ResponsiveImageAsset } from '@/components/ResponsiveImage';

export function PolaroidWallLightbox({
    onClose,
    onCloseAutoFocus,
    selectedPhoto,
}: {
    onClose: () => void;
    onCloseAutoFocus: () => void;
    selectedPhoto: {
        image: ResponsiveImageAsset | null;
        photo: { alt: string };
    } | null;
}): ReactElement {
    return (
        <Dialog.Root
            open={selectedPhoto !== null}
            onOpenChange={(open) => {
                if (!open) {
                    onClose();
                }
            }}
        >
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 sm:p-8">
                    <Dialog.Content
                        aria-describedby={undefined}
                        className="relative flex max-h-full max-w-full items-center justify-center text-canvas-foreground"
                        onCloseAutoFocus={(event) => {
                            event.preventDefault();
                            onCloseAutoFocus();
                        }}
                    >
                        <Dialog.Title className="sr-only">
                            Enlarged memory photo: {selectedPhoto?.photo.alt}
                        </Dialog.Title>
                        {selectedPhoto?.image ? (
                            <img
                                alt={selectedPhoto.photo.alt}
                                className="block max-h-[calc(100dvh-4rem)] max-w-full object-contain sm:max-h-[calc(100dvh-8rem)]"
                                decoding="async"
                                height={selectedPhoto.image.height}
                                src={selectedPhoto.image.src}
                                srcSet={selectedPhoto.image.srcSet}
                                sizes="100vw"
                                width={selectedPhoto.image.width}
                            />
                        ) : (
                            <p
                                className="p-16 font-mono text-xs text-white"
                                role="status"
                            >
                                Loading photo...
                            </p>
                        )}
                        <Dialog.Close asChild>
                            <Button
                                aria-label="Close photo"
                                className="absolute top-0 right-0 bg-canvas/90"
                                size="icon"
                                variant="ghost"
                            >
                                <Cross1Icon aria-hidden="true" />
                            </Button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
