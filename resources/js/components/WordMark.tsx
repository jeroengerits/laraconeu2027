import type { HTMLMotionProps, Transition } from 'motion/react';
import { m, useReducedMotion } from 'motion/react';
import type { ComponentPropsWithoutRef, ReactElement } from 'react';

import { cn } from '@/lib/utils';

export type WordMarkSize =
    | 'hero'
    | 'huge'
    | 'large'
    | 'medium'
    | 'small'
    | 'tiny';

type WordMarkProps = HTMLMotionProps<'h1'> & {
    fit?: boolean;
    size?: WordMarkSize;
};

type WordMarkSvgProps = ComponentPropsWithoutRef<'svg'>;

const WORDMARK_LABEL = 'LARACON.EU';
const WORDMARK_VIEWBOX_HEIGHT = 80;
const WORDMARK_VIEWBOX_WIDTH = 456;
const WORDMARK_VIEWPORT_GUTTER = '2rem';

const wordMarkFitMaxHeight = `calc((100vw - ${WORDMARK_VIEWPORT_GUTTER}) * ${WORDMARK_VIEWBOX_HEIGHT} / ${WORDMARK_VIEWBOX_WIDTH})`;

const wordMarkTransition: Transition = {
    filter: {
        duration: 0.3,
        ease: 'easeOut',
        times: [0, 0.36, 1],
        type: 'tween',
    },
    scale: {
        bounce: 0.36,
        type: 'spring',
        visualDuration: 0.28,
    },
};

const wordMarkAnimationState = {
    filter: [
        'brightness(1) saturate(1)',
        'brightness(1.24) saturate(1.4)',
        'brightness(1) saturate(1)',
    ],
    scale: [1, 1.04, 1],
};

const wordMarkSizeHeights: Record<WordMarkSize, string> = {
    hero: '128px',
    huge: '90px',
    large: '60px',
    medium: '24px',
    small: '18px',
    tiny: '14px',
};

const LARACON_PATH =
    'M200.5,23.4c-.6,4-1,9.4-1,16.2s.3,12.3,1,16.4c.7,4.2,1.7,7.2,3.1,9.1,1.4,1.9,3.1,2.8,5.1,2.8s4.7-1.6,6-4.9c1.4-3.2,2-8.1,2-14.7h15.2c0,6.6-.9,12.3-2.8,17-1.8,4.7-4.5,8.3-8,10.9-3.5,2.5-7.7,3.8-12.6,3.8s-7.5-.9-10.6-2.6c-3.1-1.7-5.7-4.3-7.8-7.7-2.1-3.4-3.7-7.6-4.7-12.5-1.1-5-1.6-10.7-1.6-17.2s.5-12.2,1.6-17.2c1.1-5,2.7-9.2,4.8-12.5,2.1-3.4,4.7-5.9,7.9-7.7C201.4.9,205,0,209,0s9,1.2,12.5,3.7c3.4,2.5,6,6.1,7.8,10.8,1.8,4.7,2.7,10.4,2.7,17.2h-15.1c0-6.8-.7-11.7-2-14.9-1.4-3.1-3.4-4.7-6.1-4.7s-3.8.9-5.2,2.6c-1.4,1.8-2.4,4.6-3,8.6ZM169.9,1l15.1,78h-15.3l-2.6-16.8h-15.2l-2.6,16.8h-14.3L150.1,1h19.7ZM165.2,50.3l-5.7-36.9-5.7,36.9h11.5ZM71.9,1l15.1,78h-15.3l-2.6-16.8h-15.2l-2.6,16.8h-14.3L52.1,1h19.7ZM67.2,50.3l-5.7-36.9-5.7,36.9h11.5ZM15.7,1H0v78h34v-11.9H15.7V1ZM285.1,17.8c2,5.9,2.9,13.2,2.9,21.9s-.6,12.3-1.7,17.4c-1.1,5-2.8,9.2-5,12.6-2.2,3.4-4.9,5.9-8.1,7.7-3.2,1.7-7,2.6-11.2,2.6s-8-.9-11.2-2.6c-3.2-1.7-6-4.3-8.1-7.7-2.2-3.4-3.8-7.6-5-12.6-1.1-5-1.7-10.8-1.7-17.4s1-15.9,2.9-21.8c2-5.9,4.9-10.3,8.7-13.4C251.5,1.5,256.3,0,261.9,0s10.6,1.5,14.4,4.5c3.9,3,6.8,7.4,8.7,13.4ZM272.3,39.6c0-6.5-.4-11.7-1.1-15.8-.7-4-1.9-7-3.4-8.9-1.5-1.9-3.5-2.8-5.9-2.8s-4.3.9-5.8,2.8c-1.5,1.9-2.6,4.8-3.3,8.8-.7,4-1,9.3-1,15.8s.4,11.9,1.1,16.1c.7,4.2,1.8,7.3,3.3,9.2,1.5,2,3.4,3,5.7,3s4.4-1,5.9-3c1.5-2,2.7-5.1,3.4-9.2.7-4.2,1.1-9.5,1.1-16.1ZM324.7,1v51.8L311.4,1h-18.4v78h14.3V27.2l13.3,51.8h18.4V1h-14.3ZM124.4,39.3c1.8.9,3.2,2.1,4.2,3.5,2,2.8,3,6.4,3,10.8v25.3h-15.4v-24.8c0-2.5-.6-4.4-1.7-5.7-1.2-1.3-2.8-1.9-4.9-1.9h-3.4v32.4h-15.4V1h21.4c4.6,0,8.4,1,11.5,2.9,3,2,5.3,4.5,6.8,7.7,1.5,3.2,2.3,6.7,2.3,10.6s-1.4,9.6-4.2,13.1c-1.2,1.5-2.7,2.9-4.4,4ZM117.6,23.3c0-3.6-.6-6.4-1.9-8.2-1.3-1.9-3.1-2.8-5.4-2.8h-3.9v22.2h3.9c2.3,0,4.1-.9,5.4-2.8,1.3-1.9,1.9-4.7,1.9-8.3Z';

const EU_PATH =
    'M385.4,67.1h20.6v11.9h-36V1h35.1v11.9h-19.7v20h18.7v11.7h-18.7v22.4ZM440.6,1v59.1c0,2.6-.6,4.5-1.7,5.8-1.2,1.3-2.8,1.9-4.9,1.9s-3.6-.6-4.8-1.9c-1.2-1.3-1.8-3.2-1.8-5.8V1h-15.4v55.5c0,7.2,1.9,12.9,5.6,17.2,3.7,4.2,9.2,6.3,16.4,6.3s12.7-2.1,16.4-6.3c3.7-4.2,5.6-9.9,5.6-17.2V1h-15.4Z';

function WordMarkSvg({
    'aria-label': ariaLabel = WORDMARK_LABEL,
    className,
    role = 'img',
    ...props
}: WordMarkSvgProps): ReactElement {
    return (
        <svg
            aria-label={ariaLabel}
            className={cn('block h-full w-auto select-none', className)}
            role={role}
            viewBox="0 0 456 80"
            {...props}
        >
            <path d={LARACON_PATH} fill="currentColor" />
            <rect fill="currentColor" height="18" width="18" x="346" y="61" />
            <path d={EU_PATH} fill="currentColor" />
        </svg>
    );
}

export function WordMark({
    className,
    fit = false,
    size = 'medium',
    style,
    ...props
}: WordMarkProps): ReactElement {
    const shouldReduceMotion = useReducedMotion();
    const wordMarkStyle: WordMarkProps['style'] = {
        height: wordMarkSizeHeights[size],
        maxHeight: fit ? wordMarkFitMaxHeight : undefined,
        ...style,
    };

    return (
        <m.h1
            animate={shouldReduceMotion ? undefined : wordMarkAnimationState}
            className={cn('inline-flex min-w-0 px-2', className)}
            style={wordMarkStyle}
            transition={shouldReduceMotion ? undefined : wordMarkTransition}
            {...props}
        >
            <WordMarkSvg />
        </m.h1>
    );
}
