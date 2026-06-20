import { render, screen, waitFor } from '@testing-library/react';

import { Avatar } from '@/components/Avatar';

describe('Avatar', () => {
    it('renders initials when no photo is provided but a name is given', () => {
        render(<Avatar name="Dan Harrin" size="md" />);

        expect(screen.getByText('DH')).toBeInTheDocument();
    });

    it('renders a placeholder icon when no photo or name is provided', () => {
        render(<Avatar size="md" />);

        expect(screen.queryByText(/[A-Z]{1,2}/)).not.toBeInTheDocument();
        expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('falls back to initials when the photo fails to load', async () => {
        render(
            <Avatar
                name="Dan Harrin"
                size="md"
                src="/speakers/missing.jpg"
            />,
        );

        await waitFor(() => {
            expect(screen.getByText('DH')).toBeInTheDocument();
        });
    });

    it('applies size classes for each variant', () => {
        const { container, rerender } = render(
            <Avatar name="Dan Harrin" size="sm" />,
        );

        expect(container.firstChild).toHaveClass('size-8');

        rerender(<Avatar name="Dan Harrin" size="lg" />);

        expect(container.firstChild).toHaveClass('size-16');
    });

    it('groups multiple avatars with an accessible label', () => {
        render(
            <Avatar.Group aria-label="Conference speakers">
                <Avatar name="Dan Harrin" size="sm" />
                <Avatar name="Taylor Otwell" size="sm" />
            </Avatar.Group>,
        );

        expect(
            screen.getByRole('group', { name: 'Conference speakers' }),
        ).toBeInTheDocument();
    });
});
