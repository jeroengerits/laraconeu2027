import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef, useState } from 'react';

import { PolaroidWallLightbox } from '@/components/PolaroidWallLightbox';

function LightboxExample({ loaded = false }: { loaded?: boolean }) {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            <button ref={triggerRef} onClick={() => setOpen(true)}>
                Enlarge archive photo
            </button>
            <a href="#outside">Outside link</a>
            <PolaroidWallLightbox
                onClose={() => setOpen(false)}
                onCloseAutoFocus={() => triggerRef.current?.focus()}
                selectedPhoto={
                    open
                        ? {
                              image: loaded
                                  ? {
                                        src: '/archive.jpg',
                                        width: 1536,
                                        height: 1024,
                                    }
                                  : null,
                              photo: { alt: 'Archive photo 1' },
                          }
                        : null
                }
            />
        </>
    );
}

it('contains keyboard focus, hides the background, and returns focus after Escape', async () => {
    const user = userEvent.setup();
    render(<LightboxExample />);
    const trigger = screen.getByRole('button', {
        name: 'Enlarge archive photo',
    });
    await user.click(trigger);

    expect(
        screen.getByRole('dialog', {
            name: 'Enlarged memory photo: Archive photo 1',
        }),
    ).toBeVisible();
    expect(screen.getByRole('status')).toHaveTextContent('Loading photo...');
    expect(
        screen.queryByRole('link', { name: 'Outside link' }),
    ).not.toBeInTheDocument();
    const close = screen.getByRole('button', { name: 'Close photo' });
    expect(close).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
    await user.tab({ shift: true });
    expect(close).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(screen.getByRole('link', { name: 'Outside link' })).toBeVisible();
});

it('closes with the close button and restores focus', async () => {
    const user = userEvent.setup();
    render(<LightboxExample />);
    const trigger = screen.getByRole('button', {
        name: 'Enlarge archive photo',
    });
    await user.click(trigger);
    await user.click(screen.getByRole('button', { name: 'Close photo' }));
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

it('shows the loaded image without remounting the dialog or moving focus', () => {
    const props = { onClose: jest.fn(), onCloseAutoFocus: jest.fn() };
    const photo = { alt: 'Archive photo 1' };
    const { rerender } = render(
        <PolaroidWallLightbox
            {...props}
            selectedPhoto={{ image: null, photo }}
        />,
    );
    const close = screen.getByRole('button', { name: 'Close photo' });
    rerender(
        <PolaroidWallLightbox
            {...props}
            selectedPhoto={{
                image: { src: '/archive.jpg', width: 1536, height: 1024 },
                photo,
            }}
        />,
    );
    expect(screen.getByRole('img', { name: photo.alt })).toHaveAttribute(
        'src',
        '/archive.jpg',
    );
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(close).toHaveFocus();
});

it.each(['backdrop', 'empty dialog space'])(
    'closes on %s clicks but not image clicks and restores focus',
    async (target) => {
        const user = userEvent.setup();
        render(<LightboxExample loaded />);
        const trigger = screen.getByRole('button', {
            name: 'Enlarge archive photo',
        });
        await user.click(trigger);
        const dialog = screen.getByRole('dialog');

        await user.click(screen.getByRole('img', { name: 'Archive photo 1' }));
        expect(dialog).toBeVisible();

        await user.click(
            target === 'backdrop' ? dialog.parentElement! : dialog,
        );

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        await waitFor(() => expect(trigger).toHaveFocus());
    },
);
