# ABCMYANH Vanilla Mini App Architecture

ABCMYANH is now structured as a reusable vanilla JavaScript template for static mini apps. The architecture keeps app-specific content separate from reusable core behavior.

## Project Structure

```text
index.html
style.css
manifest.json
vercel.json
src/
  app.js
  data/
    letters.js
    numbers.js
  core/
    storage.js
    speech.js
    animations.js
    dom.js
    progress.js
public/
  sw.js
icons/
  app-icon.svg
```

## Module Responsibilities

- `src/app.js`: app bootstrap. Manages state, mode switching, lesson navigation, reset flow, localStorage restore, speech actions, rendering calls, and service worker registration.
- `src/data/letters.js`: ABC letter lesson data.
- `src/data/numbers.js`: generated 1-100 number lessons and compact visual count generation.
- `src/core/storage.js`: reusable state persistence with `getState`, `saveState`, and `resetState`.
- `src/core/speech.js`: reusable speech helpers with unsupported-browser guards and delayed voice loading support.
- `src/core/animations.js`: reusable celebration particles, score animation, reward audio, and reduced-motion support.
- `src/core/dom.js`: safe DOM selectors, event binding, lesson rendering, progress rendering, score updates, focus management, and completion UI.
- `src/core/progress.js`: reusable progress calculations and labels.

## Reuse Pattern

For another mini app, copy the structure and keep the core modules unless the app needs different rendering primitives:

- Keep: `src/core/storage.js`, `src/core/animations.js`, `src/core/progress.js`
- Usually keep or lightly adapt: `src/core/speech.js`
- Adapt: `src/core/dom.js` to match that app's HTML IDs and UI shape
- Replace: `src/data/*` with the app's data model
- Adapt: `src/app.js` state transitions and event handlers
- Update: `manifest.json`, `README.md`, `style.css`, icons

## Migration Notes

### tiktokminiapp

- Replace lesson data with feed/video metadata.
- Reuse `storage.js` for selected category, scroll position, liked/saved IDs, and preferences.
- Adapt `dom.js` to render video cards and filters.
- Reuse `animations.js` for lightweight like/save feedback.

### vinh.paint

- Replace lessons with drawing tools, palettes, and canvas presets.
- Reuse `storage.js` for current tool, brush size, colors, and recent projects.
- Adapt `dom.js` to bind toolbar controls and canvas actions.
- Use `animations.js` only for UI feedback, not drawing operations.

### vinh.tracuutailieu

- Replace lessons with document/search metadata.
- Reuse `storage.js` for recent searches, pinned documents, and filters.
- Adapt `dom.js` for search input, result lists, empty states, and document details.
- Reuse `progress.js` for result counts or reading progress if needed.

### vinh.xemvideo

- Replace lessons with video playlist data.
- Reuse `storage.js` for watch progress, playback settings, and last playlist.
- Adapt `dom.js` for media controls, playlist rendering, and current video state.
- Add media-specific accessibility labels.

### vinhqr

- Replace lessons with QR presets/templates.
- Reuse `storage.js` for QR history, last payload, colors, and export settings.
- Adapt `dom.js` for form inputs, preview rendering, download/share actions.
- Reuse `animations.js` for success states after QR generation.

## Validation Checklist

- `npm run build` succeeds.
- `index.html` loads only `./src/app.js`.
- No old `script.js` or root `app.js` is loaded.
- localStorage restore works after reload.
- Keyboard focus remains visible.
- Reduced motion limits particles and score animation.
- `public/sw.js` appears as `dist/sw.js` after build.
