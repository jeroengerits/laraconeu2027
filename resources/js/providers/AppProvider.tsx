import type { ReactNode } from 'react';

import { ColorModeProvider } from '@/providers/ColorModeProvider';
import { MotionProvider } from '@/providers/MotionProvider';
import { NotificationProvider } from '@/providers/NotificationProvider';

type AppProviderProps = {
    children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
    return (
        <MotionProvider>
            <NotificationProvider>
                <ColorModeProvider>{children}</ColorModeProvider>
            </NotificationProvider>
        </MotionProvider>
    );
}
