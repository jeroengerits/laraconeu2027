---
title: Deduplicate Client Requests
impact: MEDIUM-HIGH
impactDescription: automatic deduplication
tags: client, swr, deduplication, data-fetching
---

## Deduplicate Client Requests

SWR enables request deduplication, caching, and revalidation across component instances. In this Laravel Inertia project, use SWR only if it is already installed or the user explicitly approves adding it. Otherwise prefer Inertia's `useHttp`, shared page props, or a local request cache that matches existing project conventions.

**Incorrect (no deduplication, each instance fetches):**

```tsx
function UserList() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('/api/users')
            .then((r) => r.json())
            .then(setUsers);
    }, []);
}
```

**Correct when SWR is already installed or approved:**

```tsx
import useSWR from 'swr';

function UserList() {
    const { data: users } = useSWR('/api/users', fetcher);
}
```

**For immutable data:**

```tsx
import { useImmutableSWR } from '@/lib/swr';

function StaticContent() {
    const { data } = useImmutableSWR('/api/config', fetcher);
}
```

**For mutations:**

```tsx
import { useSWRMutation } from 'swr/mutation';

function UpdateButton() {
    const { trigger } = useSWRMutation('/api/user', updateUser);
    return <button onClick={() => trigger()}>Update</button>;
}
```

Reference: [https://swr.vercel.app](https://swr.vercel.app)
