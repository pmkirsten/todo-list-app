var btnAddtask = document.getElementById("add-task-btn");
var input = document.getElementById("add-task-input");
var toDoContainer = document.getElementById("to-do-container");
btnAddtask.addEventListener('click', addTask);

function addTask() {
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.appendChild(createMarkAsDoneIcon());
    taskDiv.appendChild(createTaskName(input.value));
    taskDiv.appendChild(createTrashIcon());
    input.value = '';
    toDoContainer.appendChild(taskDiv)
}

function createMarkAsDoneIcon() {
    let span = document.createElement("span");
    span.className = "material-symbols-outlined mark-as-done"
    span.innerText = "radio_button_unchecked";
    return span
}

function createTaskName(taskName) {
    let span = document.createElement("span");
    span.className = "task_name"
    span.innerText = taskName;
    return span;
}

function createTrashIcon() {
    let span = document.createElement("span");
    span.className = "material-symbols-outlined trash"
    span.innerText = "delete";
    return span;
}