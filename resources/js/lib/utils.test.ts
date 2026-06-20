import { cn } from '@/lib/utils';

describe('cn', () => {
    it('merges conditional class names and resolves Tailwind conflicts', () => {
        const isHidden = false;

        expect(cn('px-2', isHidden && 'hidden', ['text-sm', 'px-4'])).toBe(
            'text-sm px-4',
        );
    });
});
