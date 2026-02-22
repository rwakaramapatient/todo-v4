# Week 2 Day 4 — To-Do v2 (Actions + localStorage)

## Goal
Upgrade the To-Do app to use object-based todos, support toggle + delete, and persist data with `localStorage`.

## Requirements
- Todos are objects:
  - `{ text: "sleep", done: false }`
- Render rules:
  - done = `☑️` + faded text (`.done`)
  - not done = `⬜️` + normal
- Click toggles `done` true/false
- Delete button removes the todo from state
- `localStorage`:
  - load on start
  - save after add/toggle/delete
- Guardrail:
  - HTML contains: `<!-- TODO-APP-PAGE -->`
  - `app.js` logs:
    - `console.log("TODO app loaded")`
    - `console.log(document.body.innerHTML.includes("TODO-APP-PAGE"))`

## How to run
1. Open `index.html` in the browser (or use Live Server).
2. Open DevTools Console:
   - You should see:
     - `TODO app loaded`
     - `true`
   - No red errors.

## Features (what works)
- Add todo (trimmed input, blocks empty)
- Blocks duplicates (same text)
- Toggle done (☑️/⬜️)
- Delete todo
- Persist todos in `localStorage` under key: `myTodos`

## Data format (localStorage)
Example:
```json
[
  { "text": "sleep", "done": false },
  { "text": "code", "done": true }
]