var btn_add_task = document.getElementById("add-task-btn");
var input = document.getElementById("add-task-input");
var toDoContainer = document.getElementById("to-do-container");
btn_add_task.addEventListener('click', addTask);

function addTask() {
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.innerText = input.value;
    input.value = '';
    toDoContainer.appendChild(taskDiv)
}

