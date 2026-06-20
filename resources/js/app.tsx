import { createInertiaApp } from '@inertiajs/react';
import type { ReactElement } from 'react';

import { prepareInitialScrollPosition } from '@/hooks/useInitialScrollPosition';
import { AppProvider } from '@/providers/AppProvider';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

prepareInitialScrollPosition();

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    progress: {
        color: '#4B5563',
    },
    withApp: (app: ReactElement) => <AppProvider>{app}</AppProvider>,
});
