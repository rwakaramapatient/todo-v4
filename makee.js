console.log("TODO app loaded");
console.log(document.body.innerHTML.includes("TODO-APP-PAGE"));
let input = document.getElementById("input");
let addBtn = document.getElementById("addBtn");
let list = document.getElementById("list");
let clear = document.getElementById("Clear");
let all = document.getElementById("all");
let active = document.getElementById("active");
let completed = document.getElementById("completed");
let currentFilter =localStorage.getItem("todoFilter") || "all";
let stats = document.getElementById("stats");
if (!input || !addBtn || !list || !clear || !all || !active || !completed || !stats) {
  throw new Error("Missing element");
}
let todos = JSON.parse(localStorage.getItem("myTodos")) || [];
todos = todos.map(t => {
    if (typeof t === "string") {
        return { 
            id: crypto.randomUUID(), 
            text: t, 
            done: false, 
            isEditing: false 
        };
    }

        if (!t.id) {
        t.id = crypto.randomUUID();
    }
    
    if (typeof t.isEditing === "undefined") {
        t.isEditing = false;
    }

    return t; 
});

const saveToDisk = () =>{
   const stringifiedData = JSON.stringify(todos);
   localStorage.setItem("myTodos",stringifiedData);
}

function render() {

let filteredList;
all.classList.remove("selected");
active.classList.remove("selected");
completed.classList.remove("selected");

if (currentFilter === "all") all.classList.add("selected");
if (currentFilter === "active") active.classList.add("selected");
if (currentFilter === "completed") completed.classList.add("selected");
switch (currentFilter) {
    case "active": 
        filteredList = todos.filter(t => t.done !== true);;
        break;
case "completed" :
    filteredList = todos.filter(t => t.done === true);
    break;
    default:
        filteredList = todos;
        break;
}
const allStats= todos.length;
  const completedStats= todos.filter(t => t.done).length;;
const activeStats = todos.filter(t => !t.done).length;
stats.textContent = `Total = ${allStats}   Active : ${activeStats}  Completed : ${completedStats}`;   
list.textContent = "";
filteredList.forEach(task => {
const newItem = document.createElement("li");
        newItem.dataset.id = task.id; 
    if (task.isEditing){
        const editInput = document.createElement("input");
        let isSaving = false;
const saveEdit = () => {
    const nextText = editInput.value.trim();

if (nextText === "") {
  task.isEditing = false;
  saveToDisk();
  render();
  return;
}

if (todos.some(t => t.id !== task.id && t.text === nextText)) {
  alert("Already exists!");
  isSaving = false; // stay in edit mode and allow retry
  editInput.focus();
  return;
}

task.text = nextText;
task.isEditing = false;
saveToDisk();
render();
}

editInput.addEventListener("keydown",(event) => {
    if (event.key === "Enter")
    saveEdit();
})
editInput.addEventListener("blur",() => {
    saveEdit();
})
        editInput.value = task.text;
        editInput.classList.add("edit-input");
        newItem.appendChild(editInput);
    }
    else{
    const newButton = document.createElement("button");
     const span = document.createElement("span");
     const dltBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
editBtn.classList.add("btn-edit");
     newButton.textContent = task.done ? "☑️" : "⬜️";
    newButton.classList.add("toggle-btn");
    dltBtn.textContent = "del";
    dltBtn.classList.add("btn-del");
    span.textContent = task.text;
    if (task.done) {
            span.classList.add("done");}
            newItem.dataset.id = task.id;
  newItem.appendChild(newButton);
          newItem.appendChild(span);
          newItem.appendChild(editBtn);
          newItem.appendChild(dltBtn);
    }
          list.appendChild(newItem);
}); }
list.addEventListener("click",(event) => {
    let hasChanged = false;
    const li = event.target.closest("li");
    if (!li) return; // Exit if we didn't click an item
    const id = li.dataset.id;
    if (event.target.classList.contains("btn-del")){
        todos = todos.filter(todo => todo.id !== id);
    hasChanged = true;
    }
    if (event.target.classList.contains("toggle-btn")){
        const todo = todos.find(t => t.id === id);
        if(todo){
            todo.done = !todo.done;
        }
        hasChanged = true;
    }
if (event.target.classList.contains("btn-edit")) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.isEditing = true; 
    }
    hasChanged = true;
}
if(hasChanged){
    saveToDisk();
    render();
}
})
clear.addEventListener("click", () => {
todos = todos.filter(todo =>!todo.done);
saveToDisk();
render();
})
all.addEventListener("click",() => {
   currentFilter = "all";
   localStorage.setItem("todoFilter", currentFilter);
    render();
})

active.addEventListener("click",() => {
    currentFilter = "active";
    localStorage.setItem("todoFilter", currentFilter);
    render();
})

completed.addEventListener("click",() => {
    currentFilter = "completed"
    localStorage.setItem("todoFilter", currentFilter);
    render();
})
const adding = () => {
      const plan = input.value.trim();
    if (input.value.trim() === "") {
        return;
    }
    if (todos.some(t => t.text === plan)){
        alert("Already exists!");
        return;
    }
    todos.push({ id:crypto.randomUUID(), text : plan, done : false, isEditing : false});
    saveToDisk()
    input.value = ""; 
    render();
}
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter"){
        adding();
    }
})
addBtn.addEventListener("click", adding);
render();