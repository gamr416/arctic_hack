# Detailed Architecture

## Purpose
Static single-page educational web app about marine litter flow from Northern Dvina to the White Sea.

## Tech Stack
- HTML5
- CSS3 (mobile first)
- JavaScript ES Modules
- Leaflet.js (map)

## File Responsibilities
- `index.html`: semantic sections, static placeholders, mount points for dynamic blocks
- `css/style.css`: layout, theme, responsiveness, accessibility, modal visuals
- `js/data.js`: centralized content and datasets (stats, gallery, map, game)
- `js/main.js`: app bootstrap, reusable modal controls, global interactions
- `js/map.js`: Leaflet setup (Carto Light), scripted location markers, layer toggles, canvas particle animation
- `js/gallery.js`: gallery card rendering, filtering, item modal
- `js/game.js`: game rendering, drag/touch/keyboard sorting logic, feedback and educational cards
- `README.md`: run instructions, sources and attribution

## Runtime Data Flow
1. `main.js` imports modules and starts feature initializers on `DOMContentLoaded`.
2. `gallery.js`, `game.js`, `map.js` import constants from `data.js`.
3. `main.js` fills static dynamic parts: global facts and stats cards.
4. `gallery.js` renders cards and applies material filters, then delegates modal opening to callback from `main.js`.
5. `game.js` creates bins/items, starts rounds, handles drag/drop + pointer + keyboard sorting and result states.
6. `map.js` initializes Leaflet, creates marker layers from scripted `LOCATIONS`, binds detailed popups and type badges.
7. `map.js` overlays `#map-canvas` and animates particles along simplified routes.

## Accessibility Baseline
- Semantic landmarks
- Keyboard focus styles
- Modal close via `Esc` and overlay click
- Alt texts for all images

## Implemented Sections
- Hero with CTA external article link and right-side image (`bg.jpg`)
- Global problem with scale slider and canvas particle animation
- White Sea statistics and infographic image (`infografic.png`)
- Interactive map with layer toggles and animated particles
- Gallery (8 required items) with modal details
- Game section "Очисти побережье" with:
  - Start/restart flow
  - Wave-like item appearance
  - Mouse/touch drag and drop
  - Keyboard sorting shortcuts (1-4)
  - Correct/wrong container feedback
  - Educational card after each correct sort
  - Final completion summary
  - Monotone game field background (no photo in play area)
- Volunteer CTA button and volunteer photo block

## Map Notes
- Base layer switched to Carto Light (`light_all`) with `minZoom: 6` and `maxZoom: 13`
- Marker categories:
  - Sources: city, village, hotspot
  - Cleanup/beach points: type `beach`
- Popups include findings, pollution source, details and category badge

## Asset Strategy
- Mixed local assets in `assets/images` (SVG placeholders + provided JPG/PNG photos)
- No build pipeline required; files are directly loaded by browser

## Acceptance Mapping
- Map interactivity: popups, layer toggles, animated paths
- Gallery: grid, material filters, modal details
- Game: item sorting by category with educational feedback cards
- Recommendations: volunteer CTA with contextual image
- Responsive behavior: mobile-first with `768px` and `1200px` breakpoints

## Recent Fixes
- Game start button wiring hardened with explicit click handlers and default prevention
- Game layer z-index raised to ensure spawned items are visible above the field background
