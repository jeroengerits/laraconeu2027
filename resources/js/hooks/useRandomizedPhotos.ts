import { useEffect, useState } from 'react';

export function useRandomizedPhotos<T>(photos: readonly T[]): readonly T[] {
    const [randomizedPhotos, setRandomizedPhotos] = useState<readonly T[]>(
        () => photos,
    );

    useEffect(() => {
        const animationFrame = window.requestAnimationFrame(() => {
            setRandomizedPhotos(createRandomizedItems(photos));
        });

        return () => {
            window.cancelAnimationFrame(animationFrame);
        };
    }, [photos]);

    return randomizedPhotos;
}

function createRandomizedItems<T>(items: readonly T[]): T[] {
    const randomizedItems = [...items];

    for (let index = randomizedItems.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        const item = randomizedItems[index];

        randomizedItems[index] = randomizedItems[randomIndex];
        randomizedItems[randomIndex] = item;
    }

    return randomizedItems;
}
