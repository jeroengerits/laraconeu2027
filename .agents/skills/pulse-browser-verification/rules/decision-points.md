# Decision Points

- Use Pest Browser first for browser-verifiable behaviour.
- Use manual/browser-log verification to supplement Pest Browser for native scrolling, gestures, rendering, hydration, and media loading that cannot be automated locally.
- If browser logs show unrelated old entries, ignore them.
- If a device class cannot be tested locally, report the gap and the expected manual check.
