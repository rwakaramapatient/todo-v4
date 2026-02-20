
# Week 2 DOM Projects

## Day 3 — To-Do (DOM)
- Add task from input into a list
- Ignores empty input (trim)
- Prevents duplicates (includes)

### How it works
- `todos` stores tasks as strings
- `render()` clears the `<ul>` and rebuilds it from `todos`
- Clicking Add pushes trimmed text → clears input → calls `render()`
