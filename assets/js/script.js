var btnAddtask = document.getElementById("add-task-btn");
var input = document.getElementById("add-task-input");
var toDoContainer = document.getElementById("to-do-container");
btnAddtask.addEventListener('click', addTask);

function addTask() {
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.innerText = input.value;
    input.value = '';
    toDoContainer.appendChild(taskDiv)
}

