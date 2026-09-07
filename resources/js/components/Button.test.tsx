import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';

import { Button } from '@/components/Button';

describe('Button', () => {
    it('renders its children as the accessible name', () => {
        render(<Button>Save</Button>);

        expect(
            screen.getByRole('button', { name: 'Save' }),
        ).toBeInTheDocument();
    });

    it('calls onClick when activated', async () => {
        const user = userEvent.setup();
        const handleClick = jest.fn();

        render(<Button onClick={handleClick}>Save</Button>);
        await user.click(screen.getByRole('button', { name: 'Save' }));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
        const user = userEvent.setup();
        const handleClick = jest.fn();

        render(
            <Button disabled onClick={handleClick}>
                Save
            </Button>,
        );
        await user.click(screen.getByRole('button', { name: 'Save' }));

        expect(handleClick).not.toHaveBeenCalled();
    });

    it('defaults to type="button" so it does not submit a surrounding form', async () => {
        const user = userEvent.setup();
        const handleSubmit = jest.fn((event) => event.preventDefault());

        render(
            <form onSubmit={handleSubmit}>
                <Button>Action</Button>
            </form>,
        );
        await user.click(screen.getByRole('button', { name: 'Action' }));

        expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('submits a form when type="submit" is requested', async () => {
        const user = userEvent.setup();
        const handleSubmit = jest.fn((event) => event.preventDefault());

        render(
            <form onSubmit={handleSubmit}>
                <Button type="submit">Send</Button>
            </form>,
        );
        await user.click(screen.getByRole('button', { name: 'Send' }));

        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('renders the provided child element when asChild is set', () => {
        render(
            <Button asChild>
                <a href="/tickets">Tickets</a>
            </Button>,
        );

        const link = screen.getByRole('link', { name: 'Tickets' });

        expect(link).toHaveAttribute('href', '/tickets');
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('forwards a ref to the underlying button element', () => {
        const ref = createRef<HTMLButtonElement>();

        render(<Button ref={ref}>Save</Button>);

        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('preserves explicit tab order and skips disabled buttons', async () => {
        const user = userEvent.setup();

        render(
            <>
                <Button tabIndex={-1}>Programmatic focus only</Button>
                <Button disabled>Unavailable</Button>
                <Button asChild>
                    <a href="#next" tabIndex={-1}>
                        Skipped link
                    </a>
                </Button>
                <Button>Continue</Button>
            </>,
        );
        await user.tab();

        expect(screen.getByRole('button', { name: 'Continue' })).toHaveFocus();
    });

    it('merges a consumer className onto the rendered element', () => {
        render(<Button className="custom-class">Save</Button>);

        expect(screen.getByRole('button', { name: 'Save' })).toHaveClass(
            'custom-class',
        );
    });

    it('supports semantic color pair variants', () => {
        render(<Button variant="surface">Filter</Button>);

        expect(screen.getByRole('button', { name: 'Filter' })).toHaveClass(
            'pair-surface',
        );
    });
});
