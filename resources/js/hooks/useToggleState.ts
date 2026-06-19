import { useCallback, useMemo, useState } from 'react';

type UseToggleStateValue = {
    close: () => void;
    isOpen: boolean;
    toggle: () => void;
};

export function useToggleState(defaultIsOpen = false): UseToggleStateValue {
    const [isOpen, setIsOpen] = useState(defaultIsOpen);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggle = useCallback(() => {
        setIsOpen((currentIsOpen) => !currentIsOpen);
    }, []);

    return useMemo(
        () => ({
            close,
            isOpen,
            toggle,
        }),
        [close, isOpen, toggle],
    );
}
