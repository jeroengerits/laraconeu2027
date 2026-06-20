# Laracon EU 2027

Conference site for Laracon EU 2027, built with Laravel, Inertia, React, Motion, and Tailwind CSS.

## Stack

- Laravel 13
- Inertia v3 with React 19
- Tailwind CSS 4
- Motion for React animations
- Pest for PHP tests
- Jest and React Testing Library for frontend component tests

## Local Development

This project is configured for Laravel Herd and is available at the Herd site URL for the project directory.

Install dependencies:

```bash
composer install
npm install
```

Run frontend assets:

```bash
npm run dev
```

Build production assets:

```bash
npm run build
```

## Verification

Run frontend checks:

```bash
npm test
npm run types:check
npm run lint:check
npm run format:check
```

Run Laravel checks:

```bash
composer test
```

## Frontend Structure

- `resources/js/pages` contains Inertia page entries.
- `resources/js/components` contains reusable UI components and page sections.
- `resources/js/hooks` contains reusable React hooks. Keep hooks in this directory rather than under feature or provider folders.
- `resources/js/lib` contains framework-agnostic helpers, motion variants, formatting utilities, and static data helpers.
- `resources/js/providers` contains application-level React providers and their context definitions.

## Motion And Accessibility

Motion behavior should respect reduced-motion preferences. Reusable animated list rows use `AnimatedListItem`, which renders plain list items when reduced motion is enabled and Motion-powered list items otherwise.

The schedule UI is a compound React component in `resources/js/components/Schedule.tsx`. It uses `AnimatedTabs` for Radix-backed tab behavior and `AnimatedListItem` for reduced-motion-aware row animation. When a schedule tab is activated, the schedule scrolls back to its top using smooth scrolling unless the user prefers reduced motion.
