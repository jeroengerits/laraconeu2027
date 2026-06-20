import { useEffect, useState } from 'react';

import type { ResponsiveImageAsset } from '@/components/ResponsiveImage';
import type { LazyPhotoAsset } from '@/lib/photos';

export function useLazyPhotoImage(
    photo: LazyPhotoAsset,
    shouldLoad: boolean,
): ResponsiveImageAsset | null {
    const [image, setImage] = useState<ResponsiveImageAsset | null>(null);

    useEffect(() => {
        if (!shouldLoad || image !== null) {
            return;
        }

        let isCancelled = false;

        photo.loadImage().then((loadedImage) => {
            if (!isCancelled) {
                setImage(loadedImage);
            }
        });

        return () => {
            isCancelled = true;
        };
    }, [image, photo, shouldLoad]);

    return image;
}
