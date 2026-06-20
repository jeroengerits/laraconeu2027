import { Head } from '@inertiajs/react';
import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';
import type { ReactElement, ReactNode } from 'react';

import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { focusVisibleClassName } from '@/lib/focusVisible';
import { cn } from '@/lib/utils';

type Shade = {
    name: string;
    value: string;
};

type ColorFamily = {
    name: string;
    token: string;
    shades: Shade[];
};

type SemanticColorToken = {
    name: string;
    source: string;
    token: string;
    usage: string;
};

type SemanticColorRole = {
    name: string;
    background: string;
    foreground: string;
    className: string;
    usage: string;
};

type ModeSwatch = {
    accent: string;
    accentForeground: string;
    background: string;
    foreground: string;
    surface: string;
    surfaceForeground: string;
};

type ThemeModeExample = {
    dark: ModeSwatch;
    description: string;
    light: ModeSwatch;
    name: string;
};

type ThemeModeKey = 'dark' | 'light';

type SummaryMetric = {
    label: string;
    value: () => number;
};

type TypeRole = {
    className: string;
    description: string;
    name: string;
    sample: string;
    token: string;
};

const displayFontWeights = [
    { label: 'Regular', tracking: '0.02em', value: 400 },
    { label: 'Medium', tracking: '0.015em', value: 500 },
    { label: 'Semi Bold', tracking: '0.01em', value: 600 },
    { label: 'Bold', tracking: '0', value: 700 },
];

const typeRoles: TypeRole[] = [
    {
        className: 'font-display text-4xl leading-none font-bold',
        description:
            'Short event marks, compact hero words, and poster-style labels.',
        name: 'Display',
        sample: 'Laracon EU',
        token: 'font-display',
    },
    {
        className: 'font-sans text-lg leading-7 font-semibold',
        description:
            'Inter-backed interface headings, navigation, controls, and dense page UI.',
        name: 'Interface',
        sample: 'Conference schedule',
        token: 'font-sans',
    },
    {
        className: 'font-sans text-base leading-7 font-normal',
        description:
            'Longer reading copy with a comfortable line length and quiet rhythm.',
        name: 'Body',
        sample: 'April in Amsterdam brings the community together for talks, workshops, and hallway conversations.',
        token: 'font-sans',
    },
    {
        className: 'font-mono text-sm leading-6 font-normal',
        description:
            'Commit Mono-backed design tokens, class names, route names, and implementation labels.',
        name: 'Token',
        sample: '--color-cream-200',
        token: 'font-mono',
    },
];

const colorFamilies: ColorFamily[] = [
    {
        name: 'Cream',
        token: 'cream',
        shades: [
            { name: '50', value: '#fffdf0' },
            { name: '100', value: '#fff8df' },
            { name: '200', value: '#f8efd1' },
            { name: '300', value: '#ead9ad' },
            { name: '400', value: '#d9bd80' },
            { name: '500', value: '#c59c4f' },
            { name: '600', value: '#9f7835' },
            { name: '700', value: '#765525' },
            { name: '800', value: '#4f3718' },
            { name: '900', value: '#2b1c0c' },
            { name: '950', value: '#1d1207' },
        ],
    },
    {
        name: 'Orange',
        token: 'orange',
        shades: [
            { name: '50', value: '#fff0e6' },
            { name: '100', value: '#ffdcc2' },
            { name: '200', value: '#ffb783' },
            { name: '300', value: '#ff8d45' },
            { name: '400', value: '#ff620f' },
            { name: '500', value: '#ff4b00' },
            { name: '600', value: '#cc3900' },
            { name: '700', value: '#992900' },
            { name: '800', value: '#661a00' },
            { name: '900', value: '#330c00' },
            { name: '950', value: '#220800' },
        ],
    },
    {
        name: 'Gold',
        token: 'gold',
        shades: [
            { name: '50', value: '#fff8dc' },
            { name: '100', value: '#ffefb3' },
            { name: '200', value: '#ffde75' },
            { name: '300', value: '#ffca3d' },
            { name: '400', value: '#f6b915' },
            { name: '500', value: '#d89608' },
            { name: '600', value: '#ad7304' },
            { name: '700', value: '#7f5103' },
            { name: '800', value: '#543302' },
            { name: '900', value: '#2f1b01' },
            { name: '950', value: '#201100' },
        ],
    },
    {
        name: 'Blue',
        token: 'blue',
        shades: [
            { name: '50', value: '#e6f5ff' },
            { name: '100', value: '#ccebff' },
            { name: '200', value: '#99d6ff' },
            { name: '300', value: '#66bdff' },
            { name: '400', value: '#2fa3f4' },
            { name: '500', value: '#0a83d8' },
            { name: '600', value: '#0069ad' },
            { name: '700', value: '#005082' },
            { name: '800', value: '#003757' },
            { name: '900', value: '#001d2e' },
            { name: '950', value: '#001421' },
        ],
    },
    {
        name: 'Teal',
        token: 'teal',
        shades: [
            { name: '50', value: '#eef8f5' },
            { name: '100', value: '#d7ebe5' },
            { name: '200', value: '#acd4cb' },
            { name: '300', value: '#82bdb2' },
            { name: '400', value: '#5c9f93' },
            { name: '500', value: '#4f837a' },
            { name: '600', value: '#3f685f' },
            { name: '700', value: '#304d47' },
            { name: '800', value: '#21332f' },
            { name: '900', value: '#111c1a' },
            { name: '950', value: '#0b1211' },
        ],
    },
    {
        name: 'Olive',
        token: 'olive',
        shades: [
            { name: '50', value: '#f5f4dc' },
            { name: '100', value: '#e8e5b8' },
            { name: '200', value: '#d3cc78' },
            { name: '300', value: '#b7b33f' },
            { name: '400', value: '#8d9722' },
            { name: '500', value: '#687a14' },
            { name: '600', value: '#4f5d0f' },
            { name: '700', value: '#38430a' },
            { name: '800', value: '#252d06' },
            { name: '900', value: '#141904' },
            { name: '950', value: '#0d1102' },
        ],
    },
    {
        name: 'Violet',
        token: 'violet',
        shades: [
            { name: '50', value: '#f3edff' },
            { name: '100', value: '#e4d6ff' },
            { name: '200', value: '#c9adff' },
            { name: '300', value: '#ad86ff' },
            { name: '400', value: '#936dff' },
            { name: '500', value: '#7f5cf2' },
            { name: '600', value: '#6444c5' },
            { name: '700', value: '#4b3293' },
            { name: '800', value: '#332161' },
            { name: '900', value: '#1c1032' },
            { name: '950', value: '#130b23' },
        ],
    },
    {
        name: 'Walnut',
        token: 'walnut',
        shades: [
            { name: '50', value: '#fff0e0' },
            { name: '100', value: '#ffd9b8' },
            { name: '200', value: '#ffb57a' },
            { name: '300', value: '#f1843f' },
            { name: '400', value: '#c65a16' },
            { name: '500', value: '#8c3503' },
            { name: '600', value: '#6a2502' },
            { name: '700', value: '#4a1701' },
            { name: '800', value: '#2c0c00' },
            { name: '900', value: '#170500' },
            { name: '950', value: '#0d0300' },
        ],
    },
    {
        name: 'Black',
        token: 'black',
        shades: [
            { name: '50', value: '#f4f1df' },
            { name: '100', value: '#e8dfc4' },
            { name: '200', value: '#c9bd96' },
            { name: '300', value: '#9d916e' },
            { name: '400', value: '#726749' },
            { name: '500', value: '#4b422d' },
            { name: '600', value: '#302817' },
            { name: '700', value: '#1b160b' },
            { name: '800', value: '#0f0c05' },
            { name: '900', value: '#050402' },
            { name: '950', value: '#000000' },
        ],
    },
];

const colorByToken = new Map(
    colorFamilies.flatMap((family) =>
        family.shades.map((shade) => [
            `${family.token}-${shade.name}`,
            {
                family,
                shade,
            },
        ]),
    ),
);

const semanticColorTokens: SemanticColorToken[] = [
    {
        name: 'Canvas',
        token: 'canvas',
        source: 'cream-50',
        usage: 'Default application background.',
    },
    {
        name: 'Canvas Foreground',
        token: 'canvas-foreground',
        source: 'black-950',
        usage: 'Primary text on the default canvas.',
    },
    {
        name: 'Surface',
        token: 'surface',
        source: 'cream-100',
        usage: 'Panels, cards, and grouped content.',
    },
    {
        name: 'Surface Foreground',
        token: 'surface-foreground',
        source: 'black-900',
        usage: 'Text on raised or grouped surfaces.',
    },
    {
        name: 'Muted',
        token: 'muted',
        source: 'black-50',
        usage: 'Subtle fills and quiet interface bands.',
    },
    {
        name: 'Muted Foreground',
        token: 'muted-foreground',
        source: 'black-600',
        usage: 'Secondary text, metadata, and supporting labels.',
    },
    {
        name: 'Inverse',
        token: 'inverse',
        source: 'black-950',
        usage: 'Dark sections and reversed surfaces.',
    },
    {
        name: 'Inverse Foreground',
        token: 'inverse-foreground',
        source: 'cream-50',
        usage: 'Text on inverse backgrounds.',
    },
    {
        name: 'Link',
        token: 'link',
        source: 'blue-700',
        usage: 'Links, selected states, and navigational markers.',
    },
    {
        name: 'Link Foreground',
        token: 'link-foreground',
        source: 'cream-50',
        usage: 'Text on link-colored fills.',
    },
    {
        name: 'Accent',
        token: 'accent',
        source: 'orange-600',
        usage: 'Primary accent fills and action markers.',
    },
    {
        name: 'Accent Foreground',
        token: 'accent-foreground',
        source: 'cream-50',
        usage: 'Text on accent backgrounds.',
    },
    {
        name: 'Highlight',
        token: 'highlight',
        source: 'gold-300',
        usage: 'Highlighted notices, selected data, and callouts.',
    },
    {
        name: 'Highlight Foreground',
        token: 'highlight-foreground',
        source: 'black-950',
        usage: 'Text on highlight backgrounds.',
    },
    {
        name: 'Info',
        token: 'info',
        source: 'blue-800',
        usage: 'Informational states and system feedback.',
    },
    {
        name: 'Info Foreground',
        token: 'info-foreground',
        source: 'cream-50',
        usage: 'Text on informational backgrounds.',
    },
    {
        name: 'Support',
        token: 'support',
        source: 'teal-700',
        usage: 'Helper states and secondary labels.',
    },
    {
        name: 'Support Foreground',
        token: 'support-foreground',
        source: 'cream-50',
        usage: 'Text on support backgrounds.',
    },
    {
        name: 'Earth',
        token: 'earth',
        source: 'olive-700',
        usage: 'Grounded thematic accents.',
    },
    {
        name: 'Earth Foreground',
        token: 'earth-foreground',
        source: 'cream-50',
        usage: 'Text on earth backgrounds.',
    },
    {
        name: 'Emphasis',
        token: 'emphasis',
        source: 'violet-600',
        usage: 'Special emphasis and display labels.',
    },
    {
        name: 'Emphasis Foreground',
        token: 'emphasis-foreground',
        source: 'cream-50',
        usage: 'Text on emphasis backgrounds.',
    },
    {
        name: 'Warmth',
        token: 'warmth',
        source: 'walnut-600',
        usage: 'Warm supporting accents.',
    },
    {
        name: 'Warmth Foreground',
        token: 'warmth-foreground',
        source: 'cream-50',
        usage: 'Text on warmth backgrounds.',
    },
];

const semanticColorSourceByToken = new Map(
    semanticColorTokens.map((token) => [token.token, token.source]),
);

const semanticColorRoles: SemanticColorRole[] = [
    {
        name: 'Canvas',
        background: 'canvas',
        foreground: 'canvas-foreground',
        className: 'pair-canvas',
        usage: 'Default page background and primary reading text.',
    },
    {
        name: 'Surface',
        background: 'surface',
        foreground: 'surface-foreground',
        className: 'pair-surface',
        usage: 'Raised panels, grouped content, and quiet UI surfaces.',
    },
    {
        name: 'Muted',
        background: 'muted',
        foreground: 'muted-foreground',
        className: 'pair-muted',
        usage: 'Subtle bands, metadata blocks, and low-emphasis containers.',
    },
    {
        name: 'Inverse',
        background: 'inverse',
        foreground: 'inverse-foreground',
        className: 'pair-inverse',
        usage: 'Poster-style dark sections and high-impact hero treatments.',
    },
    {
        name: 'Link',
        background: 'link',
        foreground: 'link-foreground',
        className: 'pair-link',
        usage: 'Accessible link chips, selected states, and navigational markers.',
    },
    {
        name: 'Accent',
        background: 'accent',
        foreground: 'accent-foreground',
        className: 'pair-accent',
        usage: 'Primary accent badges and short action labels.',
    },
    {
        name: 'Highlight',
        background: 'highlight',
        foreground: 'highlight-foreground',
        className: 'pair-highlight',
        usage: 'Highlighted notices, selected data, and callout fills.',
    },
    {
        name: 'Info',
        background: 'info',
        foreground: 'info-foreground',
        className: 'pair-info',
        usage: 'Informational states and compact system feedback.',
    },
    {
        name: 'Support',
        background: 'support',
        foreground: 'support-foreground',
        className: 'pair-support',
        usage: 'Supporting UI, helper states, and secondary labels.',
    },
    {
        name: 'Earth',
        background: 'earth',
        foreground: 'earth-foreground',
        className: 'pair-earth',
        usage: 'Grounded secondary panels and quieter thematic accents.',
    },
    {
        name: 'Emphasis',
        background: 'emphasis',
        foreground: 'emphasis-foreground',
        className: 'pair-emphasis',
        usage: 'Special emphasis moments and decorative-but-readable labels.',
    },
    {
        name: 'Warmth',
        background: 'warmth',
        foreground: 'warmth-foreground',
        className: 'pair-warmth',
        usage: 'Warm supporting accents and image-adjacent interface blocks.',
    },
];

const themeModeExamples: ThemeModeExample[] = [
    {
        name: 'Editorial Page',
        description:
            'Default reading layout with a quiet light canvas and poster-like dark mode.',
        light: {
            background: 'cream-50',
            foreground: 'black-950',
            surface: 'cream-100',
            surfaceForeground: 'black-900',
            accent: 'blue-700',
            accentForeground: 'cream-50',
        },
        dark: {
            background: 'black-950',
            foreground: 'cream-50',
            surface: 'black-800',
            surfaceForeground: 'cream-100',
            accent: 'orange-500',
            accentForeground: 'black-950',
        },
    },
    {
        name: 'Operational Panel',
        description:
            'Dense information blocks with strong contrast and restrained accent color.',
        light: {
            background: 'cream-100',
            foreground: 'black-900',
            surface: 'cream-50',
            surfaceForeground: 'black-950',
            accent: 'teal-700',
            accentForeground: 'cream-50',
        },
        dark: {
            background: 'black-900',
            foreground: 'cream-100',
            surface: 'black-700',
            surfaceForeground: 'cream-50',
            accent: 'gold-300',
            accentForeground: 'black-950',
        },
    },
    {
        name: 'Event Highlight',
        description:
            'High-energy treatment for schedule, venue, and promotional moments.',
        light: {
            background: 'gold-300',
            foreground: 'black-950',
            surface: 'cream-50',
            surfaceForeground: 'black-950',
            accent: 'orange-700',
            accentForeground: 'cream-50',
        },
        dark: {
            background: 'blue-950',
            foreground: 'cream-50',
            surface: 'blue-900',
            surfaceForeground: 'cream-100',
            accent: 'violet-300',
            accentForeground: 'black-950',
        },
    },
];

const summaryMetrics: SummaryMetric[] = [
    { label: 'Families', value: () => colorFamilies.length },
    { label: 'Raw tokens', value: () => colorByToken.size },
    { label: 'Semantic', value: () => semanticColorTokens.length },
    { label: 'Pairs', value: () => semanticColorRoles.length },
];

const themeModeKeys: { key: ThemeModeKey; name: string }[] = [
    { key: 'light', name: 'Light' },
    { key: 'dark', name: 'Dark' },
];

function colorFor(token: string): Shade {
    const color = colorByToken.get(token);

    if (!color) {
        throw new Error(`Unknown color token: ${token}`);
    }

    return color.shade;
}

function colorVariable(token: string): string {
    return `--color-${token}`;
}

function semanticColorSource(token: string): string {
    const source = semanticColorSourceByToken.get(token);

    if (!source) {
        throw new Error(`Unknown semantic color token: ${token}`);
    }

    return source;
}

function pairToken(role: string): string {
    return `--pair-${role}`;
}

function pairRole(className: string): string {
    return className.replace('pair-', '');
}

function channelToLinear(channel: number): number {
    const value = channel / 255;

    return value <= 0.03928
        ? value / 12.92
        : Math.pow((value + 0.055) / 1.055, 2.4);
}

function hexToRgb(hex: string): [number, number, number] {
    const value = hex.replace('#', '');

    return [
        Number.parseInt(value.slice(0, 2), 16),
        Number.parseInt(value.slice(2, 4), 16),
        Number.parseInt(value.slice(4, 6), 16),
    ];
}

function relativeLuminance(hex: string): number {
    const [red, green, blue] = hexToRgb(hex).map(channelToLinear);

    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(foreground: string, background: string): number {
    const foregroundLuminance = relativeLuminance(foreground);
    const backgroundLuminance = relativeLuminance(background);
    const lighter = Math.max(foregroundLuminance, backgroundLuminance);
    const darker = Math.min(foregroundLuminance, backgroundLuminance);

    return (lighter + 0.05) / (darker + 0.05);
}

function wcagStatus(ratio: number): string {
    if (ratio >= 7) {
        return 'AAA normal text';
    }

    if (ratio >= 4.5) {
        return 'AA normal text';
    }

    if (ratio >= 3) {
        return 'AA large text / UI only';
    }

    return 'Decorative only';
}

function ratioForPair(
    foregroundToken: string,
    backgroundToken: string,
): number {
    return contrastRatio(
        colorFor(foregroundToken).value,
        colorFor(backgroundToken).value,
    );
}

function textFromReactNode(children: ReactNode): string {
    if (typeof children === 'string' || typeof children === 'number') {
        return String(children);
    }

    if (Array.isArray(children)) {
        return children.map(textFromReactNode).join('');
    }

    return '';
}

type PanelProps = {
    children: ReactNode;
    className?: string;
};

type SectionHeaderProps = {
    children: ReactNode;
    eyebrow: string;
    id: string;
    title: string;
};

function Panel({ children, className = '' }: PanelProps): ReactElement {
    return (
        <article
            className={`rounded-lg border border-canvas-foreground/10 bg-surface shadow-sm ${className}`}
        >
            {children}
        </article>
    );
}

function TokenCode({ children }: { children: ReactNode }): ReactElement {
    const copyText = textFromReactNode(children);
    const { copiedText, copy } = useCopyToClipboard();
    const isCopied = copiedText === copyText;

    return (
        <button
            aria-label={`Copy ${copyText}`}
            className={cn(
                'inline-flex w-fit items-center gap-1.5 rounded-sm font-mono text-xs leading-5 text-muted-foreground transition-colors hover:text-canvas-foreground',
                focusVisibleClassName,
            )}
            onClick={() => {
                void copy(copyText);
            }}
            type="button"
        >
            {isCopied ? (
                <CheckIcon aria-hidden="true" className="size-3 shrink-0" />
            ) : (
                <CopyIcon aria-hidden="true" className="size-3 shrink-0" />
            )}
            {children}
        </button>
    );
}

function SectionHeader({
    children,
    eyebrow,
    id,
    title,
}: SectionHeaderProps): ReactElement {
    return (
        <div className="grid gap-2">
            <p className="text-xs font-semibold tracking-[0.16em] text-link uppercase">
                {eyebrow}
            </p>
            <h2
                className="text-2xl font-semibold tracking-normal text-canvas-foreground"
                id={id}
            >
                {title}
            </h2>
            <p className="max-w-[72ch] text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                {children}
            </p>
        </div>
    );
}

function ContrastBadge({ ratio }: { ratio: number }): ReactElement {
    return (
        <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-inverse px-2 py-1 text-xs font-semibold text-inverse-foreground">
                {ratio.toFixed(2)}:1
            </span>
            <span className="rounded-full border border-canvas-foreground/15 px-2 py-1 text-xs font-semibold text-surface-foreground">
                {wcagStatus(ratio)}
            </span>
        </div>
    );
}

export default function Styleguide(): ReactElement {
    return (
        <>
            <Head title="Laracon EU 2027 Styleguide" />
            <main className="min-h-screen bg-canvas text-canvas-foreground">
                <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-6 sm:px-6 lg:px-8">
                    <header className="grid gap-5 border-b border-canvas-foreground/10 pb-6 lg:grid-cols-[1fr_28rem] lg:items-end">
                        <div className="grid gap-3">
                            <p className="text-xs font-semibold tracking-[0.16em] text-link uppercase">
                                Styleguide
                            </p>
                            <div className="grid gap-2">
                                <h1 className="text-3xl font-semibold tracking-normal text-canvas-foreground sm:text-4xl">
                                    Laracon EU 2027 Design System
                                </h1>
                                <p className="max-w-[72ch] text-base leading-7 text-muted-foreground">
                                    Tokens, type, semantic color roles, and mode
                                    specimens sourced from
                                    resources/css/app.css.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
                            {summaryMetrics.map((metric) => (
                                <div
                                    className="rounded-lg border border-canvas-foreground/10 bg-surface p-3"
                                    key={metric.label}
                                >
                                    <div className="font-mono text-2xl font-semibold">
                                        {metric.value()}
                                    </div>
                                    <div className="text-xs font-medium text-muted-foreground">
                                        {metric.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </header>

                    <section
                        aria-labelledby="typography-heading"
                        className="grid gap-4"
                    >
                        <SectionHeader
                            eyebrow="Typography"
                            id="typography-heading"
                            title="Font Roles"
                        >
                            Local Inter, Instrument Sans, and Commit Mono files
                            are loaded from resources/fonts and exposed as
                            Tailwind font utilities with distinct jobs.
                        </SectionHeader>

                        <div className="grid gap-3 lg:grid-cols-[1.15fr_1fr]">
                            <Panel className="grid min-h-80 content-between gap-8 bg-inverse p-5 text-inverse-foreground">
                                <div className="grid gap-1">
                                    <TokenCode>--font-display</TokenCode>
                                    <p className="max-w-[34ch] text-sm leading-6 text-inverse-foreground/75">
                                        Instrument Sans is reserved for short,
                                        uppercase event marks and poster-like
                                        moments.
                                    </p>
                                </div>
                                <div className="grid gap-3">
                                    <p className="max-w-[8ch] font-display text-6xl leading-none font-bold text-balance sm:text-7xl">
                                        Laracon EU
                                    </p>
                                    <p className="max-w-[20ch] font-display text-2xl leading-7 font-medium text-balance text-inverse-foreground/80">
                                        5 6 7 April Amsterdam
                                    </p>
                                </div>
                            </Panel>

                            <div className="grid gap-3">
                                {typeRoles.map((role) => (
                                    <Panel
                                        className="grid gap-4 p-4"
                                        key={role.name}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h3 className="text-sm font-semibold">
                                                    {role.name}
                                                </h3>
                                                <p className="max-w-[42ch] text-sm leading-6 text-muted-foreground">
                                                    {role.description}
                                                </p>
                                            </div>
                                            <TokenCode>{role.token}</TokenCode>
                                        </div>
                                        <p
                                            className={`${role.className} text-balance`}
                                        >
                                            {role.sample}
                                        </p>
                                    </Panel>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                            {displayFontWeights.map((weight) => (
                                <Panel
                                    className="grid min-h-32 content-between gap-4 p-4"
                                    key={weight.value}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <h3 className="text-sm font-semibold">
                                            {weight.label}
                                        </h3>
                                        <TokenCode>{weight.value}</TokenCode>
                                    </div>

                                    <p
                                        className="font-display text-4xl leading-none text-balance text-canvas-foreground"
                                        style={{
                                            letterSpacing: weight.tracking,
                                            fontWeight: weight.value,
                                        }}
                                    >
                                        Title
                                    </p>
                                </Panel>
                            ))}
                        </div>
                    </section>

                    <section
                        aria-labelledby="palette-heading"
                        className="grid gap-4 border-t border-canvas-foreground/10 pt-6"
                    >
                        <SectionHeader
                            eyebrow="Palette"
                            id="palette-heading"
                            title="Raw Color Families"
                        >
                            The primitive palette is arranged by family and
                            shade. Semantic roles below consume these values
                            through CSS variables.
                        </SectionHeader>

                        <div className="grid gap-3">
                            {colorFamilies.map((family) => (
                                <Panel
                                    className="grid gap-4 p-4 lg:grid-cols-[10rem_1fr]"
                                    key={family.token}
                                >
                                    <div className="grid content-start gap-1">
                                        <h3 className="text-base font-semibold">
                                            {family.name}
                                        </h3>
                                        <TokenCode>
                                            --color-{family.token}-*
                                        </TokenCode>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
                                        {family.shades.map((shade) => (
                                            <div
                                                className="grid min-w-0 gap-2"
                                                key={shade.name}
                                            >
                                                <div
                                                    aria-label={`${family.name} ${shade.name}`}
                                                    className="aspect-[4/3] min-h-20 rounded-md border border-canvas-foreground/10 shadow-sm"
                                                    style={{
                                                        backgroundColor:
                                                            shade.value,
                                                    }}
                                                />
                                                <div className="grid gap-0.5">
                                                    <TokenCode>
                                                        --color-{family.token}-
                                                        {shade.name}
                                                    </TokenCode>
                                                    <TokenCode>
                                                        {shade.value}
                                                    </TokenCode>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Panel>
                            ))}
                        </div>
                    </section>

                    <section
                        aria-labelledby="semantic-heading"
                        className="grid gap-4 border-t border-canvas-foreground/10 pt-6"
                    >
                        <SectionHeader
                            eyebrow="Semantics"
                            id="semantic-heading"
                            title="Tokens And Role Pairs"
                        >
                            Semantic aliases turn primitive colors into reusable
                            UI roles. Pair utilities package the background and
                            foreground values together.
                        </SectionHeader>

                        <div className="grid gap-3 lg:grid-cols-[1fr_1.2fr]">
                            <div className="grid content-start gap-3 sm:grid-cols-2">
                                {semanticColorTokens.map((token) => {
                                    const source = colorFor(token.source);

                                    return (
                                        <Panel
                                            className="grid overflow-hidden"
                                            key={token.token}
                                        >
                                            <div
                                                aria-label={token.name}
                                                className="h-14 border-b border-canvas-foreground/10"
                                                style={{
                                                    backgroundColor:
                                                        source.value,
                                                }}
                                            />
                                            <div className="grid gap-2 p-3">
                                                <div>
                                                    <h3 className="text-sm font-semibold">
                                                        {token.name}
                                                    </h3>
                                                    <p className="text-xs leading-5 text-muted-foreground">
                                                        {token.usage}
                                                    </p>
                                                </div>
                                                <div className="grid gap-1">
                                                    <TokenCode>
                                                        {colorVariable(
                                                            token.token,
                                                        )}
                                                    </TokenCode>
                                                    <TokenCode>
                                                        {colorVariable(
                                                            token.source,
                                                        )}
                                                    </TokenCode>
                                                </div>
                                            </div>
                                        </Panel>
                                    );
                                })}
                            </div>

                            <div className="grid content-start gap-3 md:grid-cols-2">
                                {semanticColorRoles.map((role) => {
                                    const foreground = colorFor(
                                        semanticColorSource(role.foreground),
                                    );
                                    const background = colorFor(
                                        semanticColorSource(role.background),
                                    );
                                    const roleName = pairRole(role.className);
                                    const ratio = contrastRatio(
                                        foreground.value,
                                        background.value,
                                    );

                                    return (
                                        <Panel
                                            className="overflow-hidden"
                                            key={role.name}
                                        >
                                            <div
                                                className={`flex min-h-36 flex-col justify-between gap-5 p-4 ${role.className}`}
                                            >
                                                <div className="flex flex-col gap-2">
                                                    <h3 className="text-xl font-semibold tracking-normal">
                                                        {role.name}
                                                    </h3>
                                                    <p className="max-w-80 text-sm leading-6 opacity-80">
                                                        {role.usage}
                                                    </p>
                                                </div>
                                                <code className="w-fit rounded-full border border-current/20 px-2.5 py-1 font-mono text-xs">
                                                    {role.className}
                                                </code>
                                            </div>
                                            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-canvas-foreground/10 px-4 py-3">
                                                <code className="font-mono text-sm">
                                                    {pairToken(roleName)}
                                                </code>
                                                <ContrastBadge ratio={ratio} />
                                            </div>
                                        </Panel>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    <section
                        aria-labelledby="theme-mode-heading"
                        className="grid gap-4 border-t border-canvas-foreground/10 pt-6"
                    >
                        <SectionHeader
                            eyebrow="Light / Dark"
                            id="theme-mode-heading"
                            title="Mode Specimens"
                        >
                            Light and dark examples use the same poster palette
                            with checked foreground, background, surface, and
                            accent pairs.
                        </SectionHeader>

                        <div className="grid gap-3 xl:grid-cols-3">
                            {themeModeExamples.map((example) => (
                                <Panel
                                    className="grid gap-3 p-3"
                                    key={example.name}
                                >
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-lg font-semibold">
                                            {example.name}
                                        </h3>
                                        <p className="text-xs leading-5 text-muted-foreground">
                                            {example.description}
                                        </p>
                                    </div>

                                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                                        {themeModeKeys.map((themeMode) => {
                                            const mode = example[themeMode.key];
                                            const foreground = colorFor(
                                                mode.foreground,
                                            );
                                            const background = colorFor(
                                                mode.background,
                                            );
                                            const surface = colorFor(
                                                mode.surface,
                                            );
                                            const surfaceForeground = colorFor(
                                                mode.surfaceForeground,
                                            );
                                            const accent = colorFor(
                                                mode.accent,
                                            );
                                            const accentForeground = colorFor(
                                                mode.accentForeground,
                                            );
                                            const bodyRatio = ratioForPair(
                                                mode.foreground,
                                                mode.background,
                                            );
                                            const accentRatio = ratioForPair(
                                                mode.accentForeground,
                                                mode.accent,
                                            );

                                            return (
                                                <div
                                                    className="flex min-h-56 flex-col gap-3 rounded-md border border-canvas-foreground/10 p-3 shadow-sm"
                                                    key={themeMode.key}
                                                    style={{
                                                        backgroundColor:
                                                            background.value,
                                                        color: foreground.value,
                                                    }}
                                                >
                                                    <div className="flex items-center justify-between gap-3">
                                                        <span className="text-xs font-semibold tracking-[0.14em] uppercase">
                                                            {themeMode.name}
                                                        </span>
                                                        <span
                                                            className="rounded-full px-2.5 py-1 text-xs font-semibold"
                                                            style={{
                                                                backgroundColor:
                                                                    accent.value,
                                                                color: accentForeground.value,
                                                            }}
                                                        >
                                                            AA
                                                        </span>
                                                    </div>

                                                    <div className="flex flex-1 flex-col justify-between gap-5">
                                                        <div className="flex flex-col gap-2">
                                                            <h4 className="text-2xl font-semibold">
                                                                Laracon.EU
                                                            </h4>
                                                            <p className="text-xs leading-5">
                                                                5, 6, 7 April in
                                                                Amsterdam.
                                                                Speaker slots,
                                                                side events, and
                                                                venue notes stay
                                                                readable in this
                                                                mode.
                                                            </p>
                                                        </div>

                                                        <div
                                                            className="grid gap-2 rounded-md p-2.5"
                                                            style={{
                                                                backgroundColor:
                                                                    surface.value,
                                                                color: surfaceForeground.value,
                                                            }}
                                                        >
                                                            <div className="flex items-center justify-between gap-3">
                                                                <span className="text-sm font-semibold">
                                                                    Schedule
                                                                </span>
                                                                <span
                                                                    className="rounded px-2 py-1 text-xs font-semibold"
                                                                    style={{
                                                                        backgroundColor:
                                                                            accent.value,
                                                                        color: accentForeground.value,
                                                                    }}
                                                                >
                                                                    Live
                                                                </span>
                                                            </div>
                                                            <p className="text-xs leading-5">
                                                                Surface text
                                                                uses a checked
                                                                pair.
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <dl className="grid grid-cols-2 gap-2 text-xs">
                                                        <div className="rounded border border-current/20 p-2">
                                                            <dt className="font-semibold">
                                                                Body
                                                            </dt>
                                                            <dd>
                                                                {bodyRatio.toFixed(
                                                                    2,
                                                                )}
                                                                :1
                                                            </dd>
                                                        </div>
                                                        <div className="rounded border border-current/20 p-2">
                                                            <dt className="font-semibold">
                                                                Accent
                                                            </dt>
                                                            <dd>
                                                                {accentRatio.toFixed(
                                                                    2,
                                                                )}
                                                                :1
                                                            </dd>
                                                        </div>
                                                    </dl>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </Panel>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
