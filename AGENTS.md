# AGENTS.md

## Stack

- **Backend**: Laravel 13 (PHP 8.3+), SQLite (default), Inertia.js v2
- **Frontend**: React 18, Vite 8, Tailwind CSS v4 (via `@tailwindcss/vite` plugin), Ziggy for route generation
- **Auth**: Laravel Breeze with Inertia/React stack, Sanctum for API tokens

## Commands

```bash
# Dev (run both in separate terminals)
php artisan serve          # Backend at :8000
npm run dev                # Frontend Vite dev server

# Production build
npm run build

# Test
composer test              # Clears config cache then runs PHPUnit

# Single test
php artisan test --filter=TestName

# Lint/format (PHP)
./vendor/bin/pint

# Migrate
php artisan migrate
```

## Project Structure

```
app/                          # Laravel PHP backend
  Http/Middleware/
    HandleInertiaRequests.php  # Shares auth data to all Inertia pages
  Http/Controllers/
routes/web.php                 # Routes: / → Home, /dashboard, /profile
resources/js/
  app.jsx                      # Inertia entry point (resolves ./Pages/*.jsx)
  bootstrap.js                 # Axios setup
  Pages/                       # Inertia page components (mapped by route)
    Home.jsx                   # Landing page (hero slider, talent, videos)
    Dashboard.jsx              # Auth dashboard
    Auth/                      # Login, Register, etc.
    Profile/                   # Profile management
  Layouts/
    PublicLayout.jsx           # Public site layout (Header + Footer, lang toggle)
    AuthenticatedLayout.jsx    # Dashboard layout
    GuestLayout.jsx            # Unauthenticated layout
  Components/                  # Shared React components
    Header.jsx                 # Site nav with BN/EN language toggle
    HeroSlider.jsx             # Auto-rotating hero carousel
    Footer.jsx                 # Site footer
    TalentCard.jsx             # Talent display card
    LatestVideos.jsx           # YouTube video grid
    Modal.jsx, Dropdown.jsx, etc. # UI primitives
```

## Key Patterns

- **Inertia page resolution**: `resources/js/app.jsx` resolves pages via `./Pages/${name}.jsx`. Page component name must match the route's `Inertia::render()` call.
- **Language toggle**: `Header.jsx` and `Footer.jsx` accept `lang` prop (`'bn'` | `'en'`). The `Home.jsx` page manages `lang` state and passes it down. All user-facing text is conditionally rendered based on `lang`.
- **Tailwind v4**: Uses `@import "tailwindcss"` in CSS (NOT `@tailwind` directives). Config is in `vite.config.js` via `@tailwindcss/vite` plugin, NOT a separate `tailwind.config.js`.
- **Ziggy**: `route()` helper available in JS for Laravel named routes.

## Gotchas

- No `postcss.config.js` or `tailwind.config.js` — Tailwind v4 is fully Vite-plugin driven
- `npm run build` must succeed before committing frontend changes
- `HandleInertiaRequests` middleware shares `auth.user` globally — don't re-fetch auth in every page component
- Page props from controllers are accessed via `usePage().props` in React
- Tests use in-memory SQLite (`phpunit.xml` overrides DB settings)
