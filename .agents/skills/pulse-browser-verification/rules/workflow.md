# Workflow

1. Resolve app URL with Laravel Boost `get-absolute-url`.
2. Prefer a focused Pest Browser test for behaviours that can be automated.
3. Open relevant page only when manual inspection is still needed.
4. Check recent browser logs for client errors.
5. Verify the behaviours tied to the change.
6. For interactions, include keyboard and non-pointer paths.
7. For media, check lazy loading and layout stability.
8. For gestures, distinguish vertical page scrolling from direct horizontal drag or `deltaX` scrolling.
9. Report skipped device classes honestly.
