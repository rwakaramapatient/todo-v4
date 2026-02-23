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
todos = todos.map(t => (typeof t === "string" ? { text: t, done: false } : t));

const saveToDisk = () =>{
   const stringifiedData = JSON.stringify(todos);
   localStorage.setItem("myTodos",stringifiedData);
}

function render() {

let filteredList;
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
          newItem.appendChild(newButton);
          newItem.appendChild(span);
          newItem.appendChild(dltBtn);
    list.appendChild(newItem);
}); 
}
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
    todos.push({text : plan, done : false});
    saveToDisk()
    input.value = ""; 
    render();
}
addBtn.addEventListener("click", adding);
render();