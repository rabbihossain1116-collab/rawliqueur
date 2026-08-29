# AGENTS.md

## Stack

- **Backend**: Laravel 13 (PHP 8.3+), SQLite (default), Inertia.js v3
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
routes/web.php                 # Routes: / → Home, /about, /artists, /winners, /blog, /contact, POST /submit-talent
resources/js/
  app.jsx                      # Inertia entry point (resolves ./Pages/*.jsx)
  bootstrap.js                 # Axios setup
  Pages/                       # Inertia page components (mapped by route)
    Home.jsx                   # Landing page (hero slider, talent, videos)
    About.jsx                  # About page (Voice of Bengal, Journey, Values)
    Artists.jsx                # Artists grid with filter/search
    Winners.jsx                # Winners hall of fame, seasonal champions
    Blog.jsx                   # Blog with articles, newsletter, sidebar
    Contact.jsx                # Contact form, FAQ, location info
  Layouts/
    PublicLayout.jsx           # Public site layout (Header + Footer)
  Components/
    Header.jsx                 # Site nav with logo + submit button
    Footer.jsx                 # Site footer
    TalentForm.jsx             # Talent submission modal form
```

## Key Patterns

- **Inertia page resolution**: `resources/js/app.jsx` resolves pages via `./Pages/${name}.jsx`. Page component name must match the route's `Inertia::render()` call.
- **Tailwind v4**: Uses `@import "tailwindcss"` in CSS (NOT `@tailwind` directives). Theme config is in `resources/css/app.css` via `@theme` block, NOT a separate `tailwind.config.js`.
- **Tailwind custom colors**: `pink` (#ec1e63), `orange` (#f7941e), `purple` (#8b2fc9), `ink` (#1a1425), `muted` (#7a7488), `cream` (#fff9f4).
- **Ziggy**: `route()` helper available in JS for Laravel named routes (loaded via `@routes` in Blade).
- **Google Fonts**: Poppins, Hind Siliguri, Playfair Display loaded in `app.blade.php`.
- **Modal pattern**: `Home.jsx` manages `modalVideoId` and `showTalentForm` state. `PublicLayout` accepts `onSubmitTalent` prop passed to `Header`.

## Gotchas

- No `postcss.config.js` or `tailwind.config.js` — Tailwind v4 is fully Vite-plugin driven
- `npm run build` must succeed before committing frontend changes
- `HandleInertiaRequests` middleware is registered in `bootstrap/app.php` (not `Kernel.php`) — shares `auth.user` globally
- Page props from controllers are accessed via `usePage().props` in React
- Tests use in-memory SQLite (`phpunit.xml` overrides DB settings)
- `resources/js/app.jsx` must import `../css/app.css` — missing import breaks all Tailwind styles
- `resources/views/app.blade.php` must include CSS in `@vite` directive: `@vite(['resources/css/app.css', 'resources/js/app.jsx', ...])`
- Images served from `public/images/` and `public/image/` — accessed via `/images/` or `/image/` URL paths
- YouTube embeds: use thumbnail images + click-to-modal pattern (not live iframes in grid) to avoid embed restrictions

## Routes

| Method | URI | Page |
|--------|-----|------|
| GET | `/` | `Home.jsx` |
| GET | `/about` | `About.jsx` |
| GET | `/artists` | `Artists.jsx` |
| GET | `/winners` | `Winners.jsx` |
| GET | `/blog` | `Blog.jsx` |
| GET | `/contact` | `Contact.jsx` |
| POST | `/submit-talent` | `TalentSubmissionController@store` (JSON response) |
