import {
    AnimatePresence,
    LayoutGroup,
    m,
    useReducedMotion,
} from 'motion/react';
import { Tabs } from 'radix-ui';
import { useMemo, useRef, useState } from 'react';
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';

import { Button } from '@/components/Button';
import {
    createTabPanelVariants,
    tabIndicatorTransition,
    tabLabelTransition,
    tabTapTransition,
} from '@/lib/motionVariants';
import { cn } from '@/lib/utils';

export type AnimatedTabItem = {
    content: ReactNode;
    label: ReactNode;
    subtitle?: ReactNode;
    value: string;
};

type AnimatedTabsProps = Omit<
    ComponentPropsWithoutRef<typeof Tabs.Root>,
    'children'
> & {
    'aria-label': string;
    headerClassName?: string;
    listClassName?: string;
    showSubtitleOnTrigger?: boolean;
    stickyHeader?: boolean;
    tabs: AnimatedTabItem[];
    triggerClassName?: string;
};

const TAB_INDICATOR_LAYOUT_ID = 'animated-tabs-indicator';

const animatedTabsRootClassName = 'grid gap-8';

const animatedTabsHeaderClassName =
    'grid justify-items-center gap-4 bg-canvas transition-color-mode';

const animatedTabsStickyHeaderClassName =
    'animated-tabs-sticky-header -mx-4 px-4 py-3 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8';

const animatedTabsListClassName =
    'animated-tabs-track animated-tabs-editorial-track grid w-full max-w-3xl grid-flow-col auto-cols-fr overflow-hidden border-y-2 border-canvas-foreground bg-canvas';

const animatedTabsTriggerClassName =
    'group relative isolate h-auto min-h-16 w-full gap-2 rounded-none border-r border-canvas-foreground/15 px-4 py-4 font-display text-xl leading-none font-bold tracking-normal normal-case transition-color-mode last:border-r-0 sm:min-h-20 sm:px-8 sm:text-2xl';

const animatedTabsTriggerLabelClassName = 'relative z-10 text-current';

const animatedTabsTriggerSubtitleClassName =
    'relative z-10 font-mono text-xs tracking-[0.12em] text-current/70 uppercase sm:text-sm';

const animatedTabsTriggerSeparatorClassName =
    'relative z-10 text-current/35 group-data-[state=active]:text-current/45';

const animatedTabsPanelClassName =
    'grid outline-none focus-visible:outline-none';

type AnimatedTabTriggerProps = {
    isActive: boolean;
    layoutId: string;
    showSubtitleOnTrigger?: boolean;
    shouldReduceMotion: boolean | null;
    subtitle?: ReactNode;
    tab: AnimatedTabItem;
    triggerClassName?: string;
};

function AnimatedTabTriggerSurface({
    isActive,
    layoutId,
    shouldReduceMotion,
}: {
    isActive: boolean;
    layoutId: string;
    shouldReduceMotion: boolean | null;
}): ReactElement | null {
    if (!isActive) {
        return null;
    }

    if (shouldReduceMotion) {
        return (
            <span
                aria-hidden="true"
                className="absolute inset-0 pair-inverse animated-tabs-trigger-surface"
            />
        );
    }

    return (
        <m.span
            aria-hidden="true"
            className="absolute inset-0 pair-inverse animated-tabs-trigger-surface"
            layoutId={layoutId}
            transition={tabIndicatorTransition}
        />
    );
}

function AnimatedTabTrigger({
    isActive,
    layoutId,
    showSubtitleOnTrigger = true,
    shouldReduceMotion,
    subtitle,
    tab,
    triggerClassName,
}: AnimatedTabTriggerProps): ReactElement {
    return (
        <Tabs.Trigger asChild value={tab.value}>
            <Button
                className={cn(
                    animatedTabsTriggerClassName,
                    'text-muted-foreground data-[state=active]:text-inverse-foreground',
                    triggerClassName,
                )}
                size="medium"
                transition={tabTapTransition}
                variant="ghost"
                whileHover={
                    shouldReduceMotion || isActive
                        ? undefined
                        : { opacity: 0.9 }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.998 }}
            >
                <AnimatedTabTriggerSurface
                    isActive={isActive}
                    layoutId={layoutId}
                    shouldReduceMotion={shouldReduceMotion}
                />
                <m.span
                    animate={{ opacity: isActive ? 1 : 0.82 }}
                    className={animatedTabsTriggerLabelClassName}
                    transition={tabLabelTransition}
                >
                    {tab.label}
                </m.span>
                {showSubtitleOnTrigger && subtitle ? (
                    <>
                        <span
                            aria-hidden="true"
                            className={animatedTabsTriggerSeparatorClassName}
                        >
                            //
                        </span>
                        <m.span
                            animate={{ opacity: isActive ? 0.82 : 0.68 }}
                            className={animatedTabsTriggerSubtitleClassName}
                            transition={tabLabelTransition}
                        >
                            {subtitle}
                        </m.span>
                    </>
                ) : null}
            </Button>
        </Tabs.Trigger>
    );
}

type AnimatedTabsHeaderProps = {
    ariaLabel: string;
    headerClassName?: string;
    layoutId: string;
    listClassName?: string;
    resolvedActiveTab: string;
    shouldReduceMotion: boolean | null;
    showSubtitleOnTrigger: boolean;
    stickyHeader: boolean;
    tabs: AnimatedTabItem[];
    triggerClassName?: string;
};

function AnimatedTabsHeader({
    ariaLabel,
    headerClassName,
    layoutId,
    listClassName,
    resolvedActiveTab,
    shouldReduceMotion,
    showSubtitleOnTrigger,
    stickyHeader,
    tabs,
    triggerClassName,
}: AnimatedTabsHeaderProps): ReactElement {
    return (
        <div
            className={cn(
                animatedTabsHeaderClassName,
                stickyHeader && animatedTabsStickyHeaderClassName,
                headerClassName,
            )}
        >
            <LayoutGroup id={ariaLabel}>
                <Tabs.List
                    aria-label={ariaLabel}
                    className={cn(animatedTabsListClassName, listClassName)}
                >
                    {tabs.map((tab) => (
                        <AnimatedTabTrigger
                            isActive={resolvedActiveTab === tab.value}
                            key={tab.value}
                            layoutId={layoutId}
                            shouldReduceMotion={shouldReduceMotion}
                            showSubtitleOnTrigger={showSubtitleOnTrigger}
                            subtitle={tab.subtitle}
                            tab={tab}
                            triggerClassName={triggerClassName}
                        />
                    ))}
                </Tabs.List>
            </LayoutGroup>
        </div>
    );
}

type AnimatedTabsPanelsProps = {
    enablePanelEnterAnimation: boolean;
    panelVariants: ReturnType<typeof createTabPanelVariants>;
    resolvedActiveTab: string;
    tabs: AnimatedTabItem[];
    transitionDirection: number;
};

function AnimatedTabsPanels({
    enablePanelEnterAnimation,
    panelVariants,
    resolvedActiveTab,
    tabs,
    transitionDirection,
}: AnimatedTabsPanelsProps): ReactElement {
    return (
        <AnimatePresence
            custom={transitionDirection}
            initial={false}
            mode="wait"
        >
            {tabs.map((tab) =>
                resolvedActiveTab === tab.value ? (
                    <Tabs.Content
                        asChild
                        forceMount
                        key={tab.value}
                        tabIndex={-1}
                        value={tab.value}
                    >
                        <m.div
                            animate="visible"
                            className={animatedTabsPanelClassName}
                            custom={transitionDirection}
                            exit="exit"
                            initial={
                                enablePanelEnterAnimation ? 'hidden' : false
                            }
                            variants={panelVariants}
                        >
                            {tab.content}
                        </m.div>
                    </Tabs.Content>
                ) : null,
            )}
        </AnimatePresence>
    );
}

export function AnimatedTabs({
    'aria-label': ariaLabel,
    className,
    defaultValue,
    headerClassName,
    listClassName,
    onValueChange,
    showSubtitleOnTrigger = true,
    stickyHeader = false,
    tabs,
    triggerClassName,
    value,
    ...props
}: AnimatedTabsProps): ReactElement {
    const defaultActiveTab = value ?? defaultValue ?? tabs[0]?.value ?? '';
    const [activeTab, setActiveTab] = useState(defaultActiveTab);
    const shouldReduceMotion = useReducedMotion();
    const panelVariants = useMemo(
        () => createTabPanelVariants(shouldReduceMotion),
        [shouldReduceMotion],
    );
    const isControlled = value !== undefined;
    const [enablePanelEnterAnimation, setEnablePanelEnterAnimation] =
        useState(false);
    const resolvedActiveTab = isControlled ? (value ?? '') : activeTab;
    const activeIndexRef = useRef(
        tabs.findIndex((tab) => tab.value === defaultActiveTab),
    );
    const [transitionDirection, setTransitionDirection] = useState(0);
    const indicatorLayoutId = `${TAB_INDICATOR_LAYOUT_ID}-${ariaLabel}`;

    function handleValueChange(nextValue: string): void {
        const nextIndex = tabs.findIndex((tab) => tab.value === nextValue);

        if (
            nextIndex !== -1 &&
            activeIndexRef.current !== -1 &&
            nextIndex !== activeIndexRef.current
        ) {
            setTransitionDirection(nextIndex > activeIndexRef.current ? 1 : -1);
            activeIndexRef.current = nextIndex;
        }

        if (!isControlled) {
            setActiveTab(nextValue);
        }

        setEnablePanelEnterAnimation(true);
        onValueChange?.(nextValue);
    }

    return (
        <Tabs.Root
            {...props}
            className={cn(animatedTabsRootClassName, className)}
            onValueChange={handleValueChange}
            value={resolvedActiveTab}
        >
            <AnimatedTabsHeader
                ariaLabel={ariaLabel}
                headerClassName={headerClassName}
                layoutId={indicatorLayoutId}
                listClassName={listClassName}
                resolvedActiveTab={resolvedActiveTab}
                shouldReduceMotion={shouldReduceMotion}
                showSubtitleOnTrigger={showSubtitleOnTrigger}
                stickyHeader={stickyHeader}
                tabs={tabs}
                triggerClassName={triggerClassName}
            />

            <AnimatedTabsPanels
                enablePanelEnterAnimation={enablePanelEnterAnimation}
                panelVariants={panelVariants}
                resolvedActiveTab={resolvedActiveTab}
                tabs={tabs}
                transitionDirection={transitionDirection}
            />
        </Tabs.Root>
    );
}

export type { AnimatedTabsProps };
