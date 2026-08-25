<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="bg-paper">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Light theme. Declaring it stops the UA painting a dark canvas first
             and tints mobile browser chrome to match the page. --}}
        <meta name="color-scheme" content="light">
        <meta name="theme-color" content="#fbf8f2">

        <title inertia>{{ config('app.name', 'RAW LIQUEUR') }}</title>

        {{-- Typefaces — see the @theme block in resources/css/app.css for what
             each one is responsible for.
               cormorant-garamond  Latin display (light weights do the work)
               noto-serif-bengali  Bangla display
               hind-siliguri       Bangla body copy
               inter               Latin UI + every small-caps run --}}
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
        <link
            href="https://fonts.bunny.net/css?family=cormorant-garamond:300,300i,400,400i,500,600,700|hind-siliguri:300,400,500,600|inter:300,400,500,600|noto-serif-bengali:400,500,600,700,800&display=swap"
            rel="stylesheet"
        />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="bg-paper font-sans text-ink antialiased">
        @inertia
    </body>
</html>
