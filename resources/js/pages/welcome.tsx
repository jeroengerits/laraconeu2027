import { Head } from '@inertiajs/react';
import type { ReactElement } from 'react';

import { Button } from '@/components/Button';
import { ColorModeToggle, ColorModeTransition } from '@/components/ColorMode';
import { LegalFooter } from '@/components/LegalFooter';
import { CallForSpeakersSection } from '@/components/sections/CallForSpeakersSection';
import { ConferenceFactsSection } from '@/components/sections/ConferenceFactsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { LocationSection } from '@/components/sections/LocationSection';
import { PolaroidWallSection } from '@/components/sections/PolaroidWallSection';
import { SponsorsSection } from '@/components/sections/SponsorsSection';
import { TicketsSection } from '@/components/sections/TicketsSection';
import { SocialLinkBar } from '@/components/SocialLinkBar';
import type { TopNavigationItem } from '@/components/TopNavigation';
import { TopNavigation } from '@/components/TopNavigation';
import { WordMark } from '@/components/WordMark';
import { useActiveHash } from '@/hooks/useActiveHash';
import { useSmoothAnchorNavigation } from '@/hooks/useSmoothAnchorNavigation';

const laraconNavigationItems: readonly TopNavigationItem[] = [
    { href: '#about', label: 'Experience' },
    { href: '#location', label: 'Location' },
    { href: '#polaroid-wall', label: 'Memories' },
    { href: '#call-for-speakers', label: 'Speakers' },
    { href: '#sponsors', label: 'Sponsors' },
] as const;
const laraconNavigationSectionIds = laraconNavigationItems.map((item) =>
    item.href.slice(1),
);

function LaraconTopNavigation(): ReactElement {
    const activeHref = useActiveHash(laraconNavigationSectionIds);
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
                <Button asChild size="medium" variant="highlight">
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

export default function Welcome(): ReactElement {
    return (
        <>
            <Head title="Laracon EU 2027 | Amsterdam PHP Conference">
                <meta
                    head-key="description"
                    name="description"
                    content="Join the Laracon EU 2027 community in Amsterdam for three days of Laravel, PHP, and frontend talks, workshops, and connection."
                />
            </Head>
            <main className="relative flex min-h-screen flex-col bg-canvas text-canvas-foreground transition-color-mode">
                <ColorModeTransition />
                <LaraconTopNavigation />
                <HeroSection />
                <ConferenceFactsSection />
                <ExperienceSection />
                <LocationSection />
                <TicketsSection />
                <PolaroidWallSection />
                <CallForSpeakersSection />
                <SponsorsSection />
                <SocialLinkBar className="mt-auto pt-10" />
                <LegalFooter />
            </main>
        </>
    );
}
