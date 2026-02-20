let input = document.getElementById("actionInput");
let addBtn = document.getElementById("addButton");
let updatedList = document.getElementById("list");
if (!input || !addBtn ||!updatedList){
    throw new Error("Missing element");   
}
let todos =[];
const render = () => {
    updatedList.textContent = "";
 todos.forEach(task => {
        const plan = document.createElement("li");
        updatedList.appendChild(plan);
        plan.textContent = task; 
    });
}
const adding = () =>{
    if (input.value.trim() === ""){
        return;
    } 
    if(todos.includes(input.value.trim())){
        return;
    }
    const text =input.value.trim();
    todos.push(text);
    input.value = "";
    render();
}
addBtn.addEventListener("click", adding);

render();

