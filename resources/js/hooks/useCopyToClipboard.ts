import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useNotificationDispatcher } from '@/providers/context/NotificationContext';

type UseCopyToClipboardOptions = {
    errorTitle?: string;
    resetDelay?: number;
    successTitle?: string;
};

type UseCopyToClipboardValue = {
    copiedText: string | null;
    copy: (text: string) => Promise<boolean>;
};

const COPY_RESET_DELAY = 1400;

async function writeClipboardText(text: string): Promise<void> {
    if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);

        return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.cssText = 'position:fixed;top:-9999px;opacity:0';

    document.body.append(textarea);
    textarea.select();

    const didCopy = document.execCommand('copy');
    textarea.remove();

    if (!didCopy) {
        throw new Error('Clipboard copy failed.');
    }
}

export function useCopyToClipboard({
    errorTitle = 'Copy Failed',
    resetDelay = COPY_RESET_DELAY,
    successTitle = 'Copied',
}: UseCopyToClipboardOptions = {}): UseCopyToClipboardValue {
    const { notify } = useNotificationDispatcher();
    const [copiedText, setCopiedText] = useState<string | null>(null);
    const resetTimerRef = useRef(0);

    useEffect(() => {
        return () => {
            window.clearTimeout(resetTimerRef.current);
        };
    }, []);

    const copy = useCallback(
        async (text: string): Promise<boolean> => {
            try {
                await writeClipboardText(text);

                setCopiedText(text);
                window.clearTimeout(resetTimerRef.current);
                resetTimerRef.current = window.setTimeout(() => {
                    setCopiedText(null);
                }, resetDelay);

                notify({
                    description: text,
                    title: successTitle,
                });

                return true;
            } catch {
                notify({
                    description: 'The clipboard is not available.',
                    title: errorTitle,
                });

                return false;
            }
        },
        [errorTitle, notify, resetDelay, successTitle],
    );

    return useMemo(
        () => ({
            copiedText,
            copy,
        }),
        [copiedText, copy],
    );
}
