import { createInertiaApp } from '@inertiajs/react';
import type { ReactElement } from 'react';

import { prepareInitialScrollPosition } from '@/hooks/useInitialScrollPosition';
import { AppProvider } from '@/providers/AppProvider';

const appName = import.meta.env.VITE_APP_NAME || 'Laracon EU 2027';

prepareInitialScrollPosition();

createInertiaApp({
    title: (title) => title || appName,
    progress: {
        color: '#4B5563',
    },
    withApp: (app: ReactElement) => <AppProvider>{app}</AppProvider>,
});
