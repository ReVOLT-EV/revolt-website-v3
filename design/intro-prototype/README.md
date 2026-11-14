# Intro game prototype

Standalone prototype of the 8-bit intro (garage → Calgary → Rockies → volt light takeover).
This is the reference for porting into `frontend/src/features/intro/`.

- `game.js` — engine. Has no DOM dependencies: `createGame()` returns `{ buffer, state, input, resize, reset, update, draw, onPhase, onWheelie }`.
- `game.src.html` — page shell: HUD, prompts, touch pad, fixed overlay, scroll lock. `/*GAME_JS*/` marks where `game.js` gets inlined, and `IMG:name` placeholders point at images in `frontend/public/home_page_media/`.
- `harness2.js` — Node script that renders frames to PNG so you can check the art without a browser.

Phases: `wait → walk → convert → ride → finish → done`.
