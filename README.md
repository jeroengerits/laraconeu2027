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

## Frontend Notes

The schedule UI is a compound React component in `resources/js/components/Schedule.tsx`. It uses `AnimatedTabs` for Radix-backed tab behavior and `AnimatedListItem` for reduced-motion-aware row animation. When a schedule tab is activated, the schedule scrolls back to its top using smooth scrolling unless the user prefers reduced motion.
