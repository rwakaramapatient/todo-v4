## Week 2 Day 6 — To-Do v4 (Edit + Enter + Event Delegation)

### What changed
- Todos now have stable IDs: `{ id, text, done }` (migration included).
- Event delegation: one click listener on `#list` handles toggle/delete/edit using `data-id`.
- Enter key adds a todo.
- Edit todo text with validation (trim + block duplicates).
- Variation: save edit on blur.

### How to test
- Add 3 todos, toggle 1 done.
- Click ✏️ to edit: change text → Enter saves.
- Try editing to a duplicate → should alert and stay in edit mode.
- Click outside edit input → saves (blur).
- Refresh page → todos + filter persist and actions still work.