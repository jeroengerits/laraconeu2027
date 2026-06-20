import {
    createPanelVariants,
    createScheduleItemVariants,
    createScheduleSessionAvatarVariants,
    createSpeakerItemEnterVariants,
    createStaggerItemVariants,
    createTabPanelVariants,
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

        const reducedPanelVariants = createPanelVariants(true);

        expect(reducedPanelVariants.hidden).toEqual(
            expect.any(Function),
        );
        expect(
            (reducedPanelVariants.hidden as (direction: number) => object)(1),
        ).toEqual({
            opacity: 1,
            x: 0,
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
        expect(
            (createTabPanelVariants(false).hidden as (direction: number) => object)(
                1,
            ),
        ).toEqual({
            opacity: 0,
            x: 20,
            y: 6,
        });
    });

    it('removes schedule item motion when reduced motion is preferred', () => {
        expect(createScheduleItemVariants(true).hidden).toEqual({
            opacity: 1,
            scale: 1,
            y: 0,
        });
        expect(createScheduleSessionAvatarVariants(true).hidden).toEqual({
            opacity: 1,
            scale: 1,
        });
    });

    it('uses schedule item offsets when reduced motion is not preferred', () => {
        expect(createScheduleItemVariants(false).hidden).toEqual({
            opacity: 0,
            scale: 0.992,
            y: 12,
        });
        expect(createScheduleSessionAvatarVariants(false).hidden).toEqual({
            opacity: 0,
            scale: 0.88,
        });
    });
});
