import type { ReactElement } from 'react';

import desktopHeroImage from '../../../img/desktop-hero.png';
import mobileHeroImage from '../../../img/mobile-hero.png';
import tabletHeroImage from '../../../img/tablet-hero.png';

export function HeroSection(): ReactElement {
    return (
        <section
            className="relative grid aspect-2/3 scroll-mt-24 place-items-center overflow-hidden bg-black-950 px-4 py-12 text-center text-cream-50 sm:px-6 md:aspect-4/3 lg:px-8 section:aspect-video"
            id="hero"
        >
            <picture className="absolute inset-0">
                <source media="(min-width: 72rem)" srcSet={desktopHeroImage} />
                <source media="(min-width: 48rem)" srcSet={tabletHeroImage} />
                <img
                    alt="Laracon EU, 5, 6, 7 April, Amsterdam"
                    className="size-full object-cover"
                    src={mobileHeroImage}
                />
            </picture>
        </section>
    );
}
