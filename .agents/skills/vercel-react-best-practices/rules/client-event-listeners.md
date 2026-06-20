---
title: Deduplicate Global Event Listeners
impact: LOW
impactDescription: single listener for N components
tags: client, swr, event-listeners, subscription
---

## Deduplicate Global Event Listeners

Share global event listeners across component instances. Prefer a small local subscription helper or module-level registry in this project; use `useSWRSubscription()` only if SWR is already installed or the user explicitly approves adding it.

**Incorrect (N instances = N listeners):**

```tsx
function useKeyboardShortcut(key: string, callback: () => void) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.metaKey && e.key === key) {
                callback();
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [key, callback]);
}
```

When using the `useKeyboardShortcut` hook multiple times, each instance will register a new listener.

**Correct (N instances = 1 listener, no new dependency):**

```tsx
const keyCallbacks = new Map<string, Set<() => void>>();
let unsubscribeGlobalKeydown: (() => void) | null = null;

function ensureGlobalKeydownListener() {
    if (unsubscribeGlobalKeydown) return;

    const handler = (e: KeyboardEvent) => {
        if (e.metaKey && keyCallbacks.has(e.key)) {
            keyCallbacks.get(e.key)!.forEach((cb) => cb());
        }
    };

    window.addEventListener('keydown', handler);
    unsubscribeGlobalKeydown = () =>
        window.removeEventListener('keydown', handler);
}

function useKeyboardShortcut(key: string, callback: () => void) {
    useEffect(() => {
        ensureGlobalKeydownListener();

        if (!keyCallbacks.has(key)) {
            keyCallbacks.set(key, new Set());
        }
        keyCallbacks.get(key)!.add(callback);

        return () => {
            const set = keyCallbacks.get(key);
            if (set) {
                set.delete(callback);
                if (set.size === 0) {
                    keyCallbacks.delete(key);
                }
            }

            if (keyCallbacks.size === 0 && unsubscribeGlobalKeydown) {
                unsubscribeGlobalKeydown();
                unsubscribeGlobalKeydown = null;
            }
        };
    }, [key, callback]);
}

function Profile() {
    // Multiple shortcuts will share the same listener
    useKeyboardShortcut('p', () => {
        /* ... */
    });
    useKeyboardShortcut('k', () => {
        /* ... */
    });
    // ...
}
```
