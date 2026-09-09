import { createResponsiveImageAsset } from '@/components/ResponsiveImage';
import { createLazyPhotoAssets } from '@/lib/photos';

describe('responsive image assets', () => {
    it('prefers the small fallback while ordering srcset by width', () => {
        expect(
            createResponsiveImageAsset(
                {
                    original: '/original.jpg',
                    small: '/small.jpg',
                    tiny: '/tiny.jpg',
                },
                { height: 800, originalWidth: 3200, width: 1200 },
            ),
        ).toEqual({
            height: 800,
            src: '/small.jpg',
            srcSet: '/tiny.jpg 480w, /small.jpg 768w, /original.jpg 3200w',
            width: 1200,
        });
    });

    it('uses an original-only fallback without inventing its width', () => {
        expect(
            createResponsiveImageAsset({ original: '/original.jpg' }),
        ).toEqual({
            height: undefined,
            src: '/original.jpg',
            srcSet: undefined,
            width: undefined,
        });
    });
});

describe('createLazyPhotoAssets', () => {
    it('filters incomplete groups and sorts photos before generating alt text', () => {
        const loadImage = jest.fn(async () => '/photo.jpg');
        const photos = createLazyPhotoAssets(
            {
                '/zebra-small.jpg': loadImage,
                '/alpha-small.jpg': loadImage,
                '/incomplete-tiny.jpg': loadImage,
                '/ignored-unknown.jpg': loadImage,
            },
            {
                alt: (name, index) => `${index}: ${name}`,
                requiredSizes: ['small'],
            },
        );

        expect(photos.map(({ name, alt }) => ({ name, alt }))).toEqual([
            { name: 'alpha', alt: '0: alpha' },
            { name: 'zebra', alt: '1: zebra' },
        ]);
        expect(loadImage).not.toHaveBeenCalled();
    });

    it('loads all available sizes once and shares concurrent and cached results', async () => {
        const smallLoader = jest.fn(async () => '/small.jpg');
        const originalLoader = jest.fn(async () => '/original.jpg');
        const [photo] = createLazyPhotoAssets(
            {
                '/photo-small.jpg': smallLoader,
                '/photo-original.jpg': originalLoader,
            },
            { requiredSizes: ['small'], originalWidth: 3200 },
        );

        const firstLoad = photo.loadImage();
        expect(photo.loadImage()).toBe(firstLoad);

        const image = await firstLoad;
        expect(image.srcSet).toBe('/small.jpg 768w, /original.jpg 3200w');
        expect(await photo.loadImage()).toBe(image);
        expect(smallLoader).toHaveBeenCalledTimes(1);
        expect(originalLoader).toHaveBeenCalledTimes(1);
    });
});
