var btnAddtask = document.getElementById("add-task-btn");
var input = document.getElementById("add-task-input");
var toDoContainer = document.getElementById("to-do-container");
var doneContainer = document.getElementById("done-container");
btnAddtask.addEventListener('click', addTask);

function addTask() {
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";
    let mark = createMarkAsDoneIcon()
    taskDiv.appendChild(mark);
    mark.addEventListener('click', function () {
        this.classList.toggle("hidden");
        doneContainer.appendChild(this.parentNode);
        this.parentNode.children[1].classList.toggle("hidden");
    })
    let unmark = createMarkAsToDoIcon()
    taskDiv.appendChild(unmark);
    unmark.addEventListener('click', function () {
        this.classList.toggle("hidden");
        toDoContainer.appendChild(this.parentNode);
        this.parentNode.children[0].classList.toggle("hidden");
    })
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

function createMarkAsToDoIcon() {
    let span = document.createElement("span");
    span.className = "material-symbols-outlined mark-as-to-do hidden"
    span.innerText = "check_circle";
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