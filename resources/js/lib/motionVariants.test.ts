import {
    createPanelVariants,
    createSpeakerItemEnterVariants,
    createStaggerItemVariants,
} from '@/lib/motionVariants';

describe('motionVariants', () => {
    it('removes motion offsets when reduced motion is preferred', () => {
        expect(createStaggerItemVariants(true).hidden).toEqual({
            opacity: 1,
            y: 0,
        });
        expect(createSpeakerItemEnterVariants(true).hidden).toEqual({
            opacity: 1,
            y: 0,
        });
        expect(createPanelVariants(true).hidden).toEqual({
            opacity: 1,
            y: 0,
        });
    });

    it('uses hidden offsets when reduced motion is not preferred', () => {
        expect(createStaggerItemVariants(false).hidden).toEqual({
            opacity: 0,
            y: 8,
        });
        expect(createSpeakerItemEnterVariants(false).hidden).toEqual({
            opacity: 0,
            y: 8,
        });
    });
});
