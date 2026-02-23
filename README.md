# Week 2 Day 5 — To-Do v3 (Filters + Stats)

## Goal
Add filtering (All / Active / Completed), persist the selected filter, and show live stats (Total / Active / Completed).

## Requirements
### Data model
Todos are objects:
- `{ text: "Task", done: false }`

### Persistence (localStorage)
- Load todos on startup from key: `myTodos`
- Save todos after: **Add / Toggle / Delete / Clear completed**
- Load filter on startup from key: `todoFilter`
- Save filter after: **filter button click**

### Render rules
- done = `☑️` + faded text (class `.done`)
- not done = `⬜️` + normal text
- Filter views:
  - **All**: show all todos
  - **Active**: show `done === false`
  - **Completed**: show `done === true`

### Stats
Display counts computed from the full `todos` array:
- Total
- Active
- Completed

### Guardrail
In `app.js`:
- `console.log("TODO app loaded");`
- `console.log(document.body.innerHTML.includes("TODO-APP-PAGE"));`

## How to run
1. Open `index.html` in the browser (or use Live Server).
2. Open DevTools Console:
   - Expect:
     - `TODO app loaded`
     - `true`
   - No red errors.
3. Test persistence:
   - Click **Completed** (or **Active**)
   - Refresh the page
   - The same filter view should still be active
   - Todos and stats should still be correct

## Features (what works)
- Add todo (trim input, block empty)
- Duplicate prevention (blocks same text)
- Toggle done (☑️/⬜️) + `.done` styling
- Delete a todo
- Clear completed
- Filters: All / Active / Completed
- Highlight active filter button (variation)
- Live stats: Total / Active / Completed
- Persistence: todos + filter survive refresh

## localStorage format
### `myTodos`
```json
[
  { "text": "Learn JavaScript", "done": true },
  { "text": "Build Todo App", "done": false }
]