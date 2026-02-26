editInput.addEventListener("keydown",(event) => {
    if (event.key === "Enter")
    saveEdit();
})
editInput.addEventListener("blur",() => {
    saveEdit();
})
const saveEdit = () => {
    task.text = editInput.value;
    task.isEditing = false;
    saveToDisk();
    render();
}