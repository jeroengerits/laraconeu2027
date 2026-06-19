import type { ReactElement, ReactNode } from 'react';

import { ColorModeProvider } from '@/providers/ColorModeProvider';
import { MotionProvider } from '@/providers/MotionProvider';
import { NotificationProvider } from '@/providers/NotificationProvider';

type AppProviderProps = {
    children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps): ReactElement {
    return (
        <MotionProvider>
            <NotificationProvider>
                <ColorModeProvider>{children}</ColorModeProvider>
            </NotificationProvider>
        </MotionProvider>
    );
}
