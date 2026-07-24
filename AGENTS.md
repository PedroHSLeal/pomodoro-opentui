# Agents

## Dev
```sh
bun dev        # Run src/index.tsx
bun build --compile src/index.tsx --outfile pomodorozin  # Build binary
```

## Architecture
- Entry: `src/index.tsx` - initializes @opentui/core renderer + audio, then mounts the React tree via `createRoot(renderer).render(<App />)`
- UI: React (`@opentui/react`) with intrinsic elements (`<box>`, `<text>`, `<input>`, `<textarea>`, `<scrollbox>`, `<ascii-font>`)
- State: `src/state/` — `useCountdown` (timer), `DraftsContext` (files/active/errors), `useBreakpoint` (responsive layout)
- Audio files bundled via `with { type: "file" }` import (Bun-specific)
- Config persisted to `~/.config/pomodorozin/config.json`

## Notes
- Uses Bun runtime with `bun:` imports and top-level await
- `@opentui/core` provides the TUI renderer (not web-related)
- `playground/` is gitignored; contains scratch code only
- DO NOT run tests of any kind, the user will run the tests by hand