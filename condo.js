let todos =[];
const adding = () => {
    newItem = input.value;
    todos.push(newItem);
    render();
    input.value = "";
}