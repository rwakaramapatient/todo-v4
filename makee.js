console.log("TODO app loaded");
console.log(document.body.innerHTML.includes("TODO-APP-PAGE"));
let input = document.getElementById("input");
let addBtn = document.getElementById("addBtn");
let list = document.getElementById("list");
let clear = document.getElementById("Clear");
if (!input || !addBtn ||!list|| !clear){
    throw new Error("Missing element");
}
let todos = JSON.parse(localStorage.getItem("myTodos")) || [];
todos = todos.map(t => (typeof t === "string" ? { text: t, done: false } : t));
render();
const saveToDisk = () =>{
   const stringifiedData = JSON.stringify(todos);
   localStorage.setItem("myTodos",stringifiedData);
}

function render() {
list.textContent = "";
todos.forEach(task => {
    const newButton = document.createElement("button");
     const newItem = document.createElement("li");
     const span = document.createElement("span");
     const dltBtn = document.createElement("button");
    newButton.textContent = task.done ? "☑️" : "⬜️";
    dltBtn.textContent = "del";
    span.textContent = task.text;
    if (task.done) {
            span.classList.add("done");}
  newButton.addEventListener("click", () => {
        task.done = !task.done;
        saveToDisk();
        render();
      })
      dltBtn.addEventListener("click", () => {
        todos = todos.filter(t => t !== task);
        saveToDisk();
        render();
      })

clear.addEventListener("click", () => {
todos = todos.filter(todo =>!todo.done);
saveToDisk();
render();
})
          newItem.appendChild(newButton);
          newItem.appendChild(span);
          newItem.appendChild(dltBtn);
    list.appendChild(newItem);
});    
}
const adding = () => {
      const plan = input.value.trim();
    if (input.value.trim() === "") {
        return;
    }
    if (todos.some(t => t.text === plan)){
        alert("Already exists!");
        return;
    }
    todos.push({text : plan, done : false});
    saveToDisk()
    input.value = ""; 
    render();
}
addBtn.addEventListener("click", adding);
render();