import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { Tabs } from 'radix-ui';
import { useMemo, useState } from 'react';
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';

import { focusVisibleClassName } from '@/lib/focusVisible';
import {
    createPanelVariants,
    tabTapTransition,
} from '@/lib/motion/staggerVariants';
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
    tabs: AnimatedTabItem[];
    triggerClassName?: string;
};

function DefaultTabTrigger({
    isActive: _isActive,
    subtitle,
    tab,
    triggerClassName,
}: {
    isActive: boolean;
    subtitle?: ReactNode;
    tab: AnimatedTabItem;
    triggerClassName?: string;
}): ReactElement {
    const shouldReduceMotion = useReducedMotion();

    return (
        <Tabs.Trigger asChild value={tab.value}>
            <m.button
                className={cn(
                    'group inline-flex items-baseline gap-2 border-b-2 border-transparent pb-1 font-display text-xl leading-none font-bold tracking-wide text-(--welcome-fg)/45 uppercase transition-colors data-[state=active]:border-accent data-[state=active]:text-(--welcome-fg)',
                    focusVisibleClassName,
                    triggerClassName,
                )}
                type="button"
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                transition={tabTapTransition}
            >
                <span>{tab.label}</span>
                {subtitle ? (
                    <>
                        <span
                            aria-hidden="true"
                            className="text-(--welcome-fg)/30 group-data-[state=active]:text-(--welcome-fg)/50"
                        >
                            //
                        </span>
                        <span className="text-base font-medium tracking-[0.12em] text-(--welcome-fg)/60 group-data-[state=active]:text-(--welcome-fg)/80">
                            {subtitle}
                        </span>
                    </>
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
    tabs,
    triggerClassName,
    value,
    ...props
}: AnimatedTabsProps): ReactElement {
    const defaultActiveTab =
        value ?? defaultValue ?? tabs[0]?.value ?? '';
    const [activeTab, setActiveTab] = useState(defaultActiveTab);
    const shouldReduceMotion = useReducedMotion();
    const panelVariants = useMemo(
        () => createPanelVariants(shouldReduceMotion),
        [shouldReduceMotion],
    );
    const isControlled = value !== undefined;

    function handleValueChange(nextValue: string): void {
        if (!isControlled) {
            setActiveTab(nextValue);
        }

        onValueChange?.(nextValue);
    }

    const resolvedActiveTab = isControlled ? value ?? '' : activeTab;

    return (
        <Tabs.Root
            {...props}
            className={cn('grid gap-6', className)}
            onValueChange={handleValueChange}
            value={resolvedActiveTab}
        >
            <Tabs.List
                aria-label={ariaLabel}
                className={cn(
                    'flex flex-wrap gap-x-6 gap-y-2 border-b border-(--welcome-fg)/15 pb-4',
                    listClassName,
                )}
            >
                {tabs.map((tab) => (
                    <DefaultTabTrigger
                        isActive={resolvedActiveTab === tab.value}
                        key={tab.value}
                        subtitle={tab.subtitle}
                        tab={tab}
                        triggerClassName={triggerClassName}
                    />
                ))}
            </Tabs.List>

            <AnimatePresence initial={false} mode="wait">
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
                                exit="hidden"
                                initial="hidden"
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
