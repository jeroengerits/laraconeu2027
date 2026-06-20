import { Head } from '@inertiajs/react';
import type { ReactElement } from 'react';

import { Button } from '@/components/Button';
import { ColorModeToggle, ColorModeTransition } from '@/components/ColorMode';
import { LegalFooter } from '@/components/LegalFooter';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { LocationSection } from '@/components/sections/LocationSection';
import { PolaroidWallSection } from '@/components/sections/PolaroidWallSection';
import { SpeakersSection } from '@/components/sections/SpeakersSection';
import { SponsorsSection } from '@/components/sections/SponsorsSection';
import { TicketsSection } from '@/components/sections/TicketsSection';
import { UpdatesSection } from '@/components/sections/UpdatesSection';
import { SocialLinkBar } from '@/components/SocialLinkBar';
import { TopNavigation } from '@/components/TopNavigation';
import type { TopNavigationItem } from '@/components/TopNavigation';
import { WordMark } from '@/components/WordMark';
import { useActiveHash } from '@/hooks/useActiveHash';
import { useSmoothAnchorNavigation } from '@/hooks/useSmoothAnchorNavigation';

const laraconNavigationItems: readonly TopNavigationItem[] = [
    { href: '#about', label: 'Experience' },
    { href: '#location', label: 'Location' },
    { href: '#speakers', label: 'Speakers' },
    { href: '#sponsors', label: 'Sponsors' },
] as const;

function LaraconTopNavigation(): ReactElement {
    const activeHref = useActiveHash();
    const handleAnchorNavigation = useSmoothAnchorNavigation();

    return (
        <TopNavigation>
            <TopNavigation.Start>
                <TopNavigation.MenuButton />
                <TopNavigation.Brand aria-label="Laracon EU home">
                    <WordMark size="medium" />
                </TopNavigation.Brand>
            </TopNavigation.Start>

            <TopNavigation.Primary>
                <TopNavigation.Items
                    activeHref={activeHref}
                    items={laraconNavigationItems}
                />
            </TopNavigation.Primary>

            <TopNavigation.End>
                <ColorModeToggle />
                <Button asChild size="medium" variant="primary">
                    <a href="#tickets" onClick={handleAnchorNavigation}>
                        Tickets
                    </a>
                </Button>
            </TopNavigation.End>

            <TopNavigation.MobileMenu>
                <TopNavigation.MobileItems
                    activeHref={activeHref}
                    items={laraconNavigationItems}
                />
            </TopNavigation.MobileMenu>
        </TopNavigation>
    );
}

function WelcomeContent(): ReactElement {
    return (
        <>
            <Head title="Welcome" />
            <main className="relative flex min-h-screen flex-col bg-(--welcome-bg) text-(--welcome-fg)">
                <ColorModeTransition />
                <LaraconTopNavigation />
                <HeroSection />
                <ExperienceSection />
                <PolaroidWallSection />
                <LocationSection />
                <SpeakersSection />
                <SponsorsSection />
                <UpdatesSection />
                <TicketsSection />
                <SocialLinkBar className="mt-auto pt-10" />
                <LegalFooter />
            </main>
        </>
    );
}

export default function Welcome(): ReactElement {
    return <WelcomeContent />;
}
