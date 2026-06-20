import {
    AnimatePresence,
    LayoutGroup,
    m,
    useReducedMotion,
} from 'motion/react';
import { Tabs } from 'radix-ui';
import { useMemo, useRef, useState } from 'react';
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';

import { focusVisibleClassName } from '@/lib/focusVisible';
import {
    createTabHeaderSubtitleVariants,
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
    'flex flex-col gap-4 bg-canvas transition-color-mode sm:flex-row sm:items-center sm:justify-between';

const animatedTabsStickyHeaderClassName =
    'animated-tabs-sticky-header -mx-4 px-4 py-3 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8';

const animatedTabsListClassName =
    'flex flex-wrap gap-1 rounded-lg p-1 animated-tabs-track';

const animatedTabsTriggerClassName =
    'group relative isolate inline-flex min-h-10 items-center gap-2 rounded-md px-3 py-2 font-display text-sm font-bold tracking-wide uppercase transition-color-mode sm:px-4 sm:text-base';

const animatedTabsTriggerLabelClassName =
    'relative z-10 text-canvas-foreground';

const animatedTabsTriggerSubtitleClassName =
    'relative z-10 font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase sm:text-sm';

const animatedTabsTriggerSeparatorClassName =
    'relative z-10 text-canvas-foreground/25 group-data-[state=active]:text-canvas-foreground/40';

const animatedTabsMetaClassName =
    'animated-tabs-meta shrink-0 pl-4 text-xs sm:text-sm';

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
                className="animated-tabs-trigger-surface absolute inset-0 rounded-md"
            />
        );
    }

    return (
        <m.span
            aria-hidden="true"
            className="animated-tabs-trigger-surface absolute inset-0 rounded-md"
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
            <m.button
                className={cn(
                    animatedTabsTriggerClassName,
                    'text-muted-foreground data-[state=active]:text-canvas-foreground',
                    focusVisibleClassName,
                    triggerClassName,
                )}
                type="button"
                whileHover={
                    shouldReduceMotion || isActive
                        ? undefined
                        : { opacity: 0.82, y: -1 }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                transition={tabTapTransition}
            >
                <AnimatedTabTriggerSurface
                    isActive={isActive}
                    layoutId={layoutId}
                    shouldReduceMotion={shouldReduceMotion}
                />
                <m.span
                    animate={{ opacity: isActive ? 1 : 0.72 }}
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
                            animate={{ opacity: isActive ? 0.85 : 0.55 }}
                            className={animatedTabsTriggerSubtitleClassName}
                            transition={tabLabelTransition}
                        >
                            {subtitle}
                        </m.span>
                    </>
                ) : null}
            </m.button>
        </Tabs.Trigger>
    );
}

type AnimatedTabsHeaderProps = {
    activeTabItem?: AnimatedTabItem;
    ariaLabel: string;
    headerClassName?: string;
    headerSubtitleVariants: ReturnType<typeof createTabHeaderSubtitleVariants>;
    layoutId: string;
    listClassName?: string;
    resolvedActiveTab: string;
    shouldReduceMotion: boolean | null;
    showSubtitleOnTrigger: boolean;
    stickyHeader: boolean;
    tabs: AnimatedTabItem[];
    transitionDirection: number;
    triggerClassName?: string;
};

function AnimatedTabsHeader({
    activeTabItem,
    ariaLabel,
    headerClassName,
    headerSubtitleVariants,
    layoutId,
    listClassName,
    resolvedActiveTab,
    shouldReduceMotion,
    showSubtitleOnTrigger,
    stickyHeader,
    tabs,
    transitionDirection,
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

            <AnimatePresence
                custom={transitionDirection}
                initial={false}
                mode="wait"
            >
                {!showSubtitleOnTrigger && activeTabItem?.subtitle ? (
                    <m.p
                        animate="visible"
                        className={animatedTabsMetaClassName}
                        custom={transitionDirection}
                        exit="exit"
                        initial="hidden"
                        key={activeTabItem.value}
                        variants={headerSubtitleVariants}
                    >
                        {activeTabItem.subtitle}
                    </m.p>
                ) : null}
            </AnimatePresence>
        </div>
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
    const headerSubtitleVariants = useMemo(
        () => createTabHeaderSubtitleVariants(shouldReduceMotion),
        [shouldReduceMotion],
    );
    const isControlled = value !== undefined;
    const [enablePanelEnterAnimation, setEnablePanelEnterAnimation] =
        useState(false);
    const resolvedActiveTab = isControlled ? (value ?? '') : activeTab;
    const activeTabItem = tabs.find((tab) => tab.value === resolvedActiveTab);
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
            setTransitionDirection(
                nextIndex > activeIndexRef.current ? 1 : -1,
            );
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
                activeTabItem={activeTabItem}
                ariaLabel={ariaLabel}
                headerClassName={headerClassName}
                headerSubtitleVariants={headerSubtitleVariants}
                layoutId={indicatorLayoutId}
                listClassName={listClassName}
                resolvedActiveTab={resolvedActiveTab}
                shouldReduceMotion={shouldReduceMotion}
                showSubtitleOnTrigger={showSubtitleOnTrigger}
                stickyHeader={stickyHeader}
                tabs={tabs}
                transitionDirection={transitionDirection}
                triggerClassName={triggerClassName}
            />

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
        </Tabs.Root>
    );
}

export type { AnimatedTabsProps };
