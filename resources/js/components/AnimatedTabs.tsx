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
    createTabPanelVariants,
    createTabHeaderSubtitleVariants,
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
    listClassName?: string;
    showSubtitleOnTrigger?: boolean;
    tabs: AnimatedTabItem[];
    triggerClassName?: string;
};

const TAB_INDICATOR_LAYOUT_ID = 'animated-tabs-indicator';

function DefaultTabTrigger({
    isActive,
    showSubtitleOnTrigger = true,
    shouldReduceMotion,
    subtitle,
    tab,
    triggerClassName,
}: {
    isActive: boolean;
    showSubtitleOnTrigger?: boolean;
    shouldReduceMotion: boolean | null;
    subtitle?: ReactNode;
    tab: AnimatedTabItem;
    triggerClassName?: string;
}): ReactElement {
    return (
        <Tabs.Trigger asChild value={tab.value}>
            <m.button
                className={cn(
                    'group relative inline-flex items-baseline gap-2 border-b-2 border-transparent pb-1 font-display text-xl leading-none font-bold tracking-wide uppercase transition-color-mode',
                    focusVisibleClassName,
                    triggerClassName,
                )}
                type="button"
                whileHover={
                    shouldReduceMotion || isActive
                        ? undefined
                        : { opacity: 0.78, y: -1 }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                transition={tabTapTransition}
            >
                <m.span
                    animate={{ opacity: isActive ? 1 : 0.45 }}
                    className="text-(--welcome-fg)"
                    transition={tabLabelTransition}
                >
                    {tab.label}
                </m.span>
                {showSubtitleOnTrigger && subtitle ? (
                    <>
                        <span
                            aria-hidden="true"
                            className="text-(--welcome-fg)/30 group-data-[state=active]:text-(--welcome-fg)/50"
                        >
                            //
                        </span>
                        <m.span
                            animate={{ opacity: isActive ? 0.8 : 0.6 }}
                            className="text-base font-medium tracking-[0.12em] text-(--welcome-fg)/60 uppercase"
                            transition={tabLabelTransition}
                        >
                            {subtitle}
                        </m.span>
                    </>
                ) : null}
                {isActive ? (
                    shouldReduceMotion ? (
                        <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-accent" />
                    ) : (
                        <m.span
                            className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-accent"
                            layoutId={TAB_INDICATOR_LAYOUT_ID}
                            transition={tabIndicatorTransition}
                        />
                    )
                ) : null}
            </m.button>
        </Tabs.Trigger>
    );
}

export function AnimatedTabs({
    'aria-label': ariaLabel,
    className,
    defaultValue,
    listClassName,
    onValueChange,
    showSubtitleOnTrigger = true,
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
            className={cn('grid gap-6', className)}
            onValueChange={handleValueChange}
            value={resolvedActiveTab}
        >
            <div
                className={cn(
                    'flex flex-wrap items-end justify-between gap-x-6 gap-y-3',
                    !showSubtitleOnTrigger && 'pb-1',
                )}
            >
                <LayoutGroup id={ariaLabel}>
                    <Tabs.List
                        aria-label={ariaLabel}
                        className={cn(
                            'flex flex-wrap gap-x-6 gap-y-2',
                            showSubtitleOnTrigger &&
                                'border-b border-(--welcome-fg)/15 pb-4',
                            listClassName,
                        )}
                    >
                        {tabs.map((tab) => (
                            <DefaultTabTrigger
                                isActive={resolvedActiveTab === tab.value}
                                key={tab.value}
                                shouldReduceMotion={shouldReduceMotion}
                                showSubtitleOnTrigger={showSubtitleOnTrigger}
                                subtitle={tab.subtitle}
                                tab={tab}
                                triggerClassName={triggerClassName}
                            />
                        ))}
                    </Tabs.List>
                </LayoutGroup>

                <AnimatePresence custom={transitionDirection} initial={false} mode="wait">
                    {!showSubtitleOnTrigger && activeTabItem?.subtitle ? (
                        <m.p
                            animate="visible"
                            className="font-mono text-sm tracking-[0.12em] text-(--welcome-fg)/60 uppercase"
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

            <AnimatePresence custom={transitionDirection} initial={false} mode="wait">
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
                                className="grid outline-none focus-visible:outline-none"
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
