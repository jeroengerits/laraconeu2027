import type { ReactElement } from 'react';

import desktopHeroImage from '../../../img/desktop-hero.png';
import mobileHeroImage from '../../../img/mobile-hero.png';
import tabletHeroImage from '../../../img/tablet-hero.png';

export function HeroSection(): ReactElement {
    return (
        <section
            className="relative grid aspect-2/3 scroll-mt-24 place-items-center overflow-hidden bg-cream-50 px-4 py-12 text-center text-black-950 transition-color-mode sm:px-6 md:aspect-4/3 lg:px-8 section:aspect-video dark:bg-black-950 dark:text-cream-50"
            id="hero"
        >
            <picture className="absolute inset-0">
                <source media="(min-width: 72rem)" srcSet={desktopHeroImage} />
                <source media="(min-width: 48rem)" srcSet={tabletHeroImage} />
                <img
                    alt="Laracon EU, 5, 6, 7 April, Amsterdam"
                    className="size-full object-cover invert transition-color-mode dark:invert-0"
                    src={mobileHeroImage}
                />
            </picture>
        </section>
    );
}
