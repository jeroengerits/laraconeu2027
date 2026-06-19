import { Head } from '@inertiajs/react';

import { ColorModeToggle, ColorModeTransition } from '@/components/ColorMode';
import { TopNavigation } from '@/components/TopNavigation';

const navigationItems = [
    { href: '#about', label: 'Experience' },
    { href: '#speakers', label: 'Speakers' },
    { href: '#location', label: 'Location' },
    { href: '#schedule', label: 'Schedule' },
    { href: '#sponsors', label: 'Sponsors' },
] as const;

function renderNavigationItems(
    LinkComponent: typeof TopNavigation.Link | typeof TopNavigation.MobileLink,
) {
    return navigationItems.map((item) => (
        <LinkComponent href={item.href} key={item.href}>
            {item.label}
        </LinkComponent>
    ));
}

function WelcomeTopNavigation() {
    return (
        <TopNavigation>
            <TopNavigation.Start>
                <TopNavigation.MenuButton />
                <TopNavigation.Brand />
            </TopNavigation.Start>

            <TopNavigation.Center>
                {renderNavigationItems(TopNavigation.Link)}
            </TopNavigation.Center>

            <TopNavigation.End>
                <ColorModeToggle />
                <TopNavigation.TicketLink href="#tickets">
                    Tickets
                </TopNavigation.TicketLink>
            </TopNavigation.End>

            <TopNavigation.MobileMenu>
                {renderNavigationItems(TopNavigation.MobileLink)}
            </TopNavigation.MobileMenu>
        </TopNavigation>
    );
}

function WelcomeContent() {
    return (
        <>
            <Head title="Welcome" />
            <main className="relative flex min-h-screen min-w-[480px] flex-col overflow-hidden bg-(--welcome-bg) text-(--welcome-fg)">
                <ColorModeTransition />
                <WelcomeTopNavigation />
            </main>
        </>
    );
}

export default function Welcome() {
    return <WelcomeContent />;
}
