var btnAddtask = document.getElementById("add-task-btn");
var input = document.getElementById("add-task-input");
var toDoContainer = document.getElementById("to-do-container");
var doneContainer = document.getElementById("done-container");
var limitDateInput = document.getElementById("limit-date-input");
btnAddtask.addEventListener('click', addTask);
input.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});


function addTask() {
    if (input.value.length > 0) {
        let taskDiv = document.createElement("div");
        taskDiv.className = "task";
        let mark = createMarkAsDoneIcon()
        taskDiv.appendChild(mark);
        mark.addEventListener('click', function () {
            this.classList.toggle("hidden");
            doneContainer.appendChild(this.parentNode);
            this.parentNode.children[1].classList.toggle("hidden");
        });
        let unmark = createMarkAsToDoIcon()
        taskDiv.appendChild(unmark);
        unmark.addEventListener('click', function () {
            this.classList.toggle("hidden");
            toDoContainer.appendChild(this.parentNode);
            this.parentNode.children[0].classList.toggle("hidden");
        });
        taskDiv.appendChild(createTaskName(input.value));
        if (limitDateInput.value.length > 0) {
            let limit = createLimitDate(limitDateInput)
            taskDiv.appendChild(limit);
        }
        let erase = createTrashIcon();
        taskDiv.appendChild(erase);
        erase.addEventListener('click', function () {
            this.parentNode.remove();
        })

        let task = new Task(input.value, limitDateInput.value, false);
        input.value = '';
        limitDateInput.value = '';
        localStorage.setItem(task.id, JSON.stringify(task));
        taskDiv.id = task.id;
        toDoContainer.appendChild(taskDiv)
    }
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

function createLimitDate(dateLimit) {
    let div = document.createElement('div');
    div.className = "limit-date-container";
    let icon = document.createElement('span');
    icon.className = "material-symbols-outlined limit-date-icon";
    icon.innerText = "event";
    div.appendChild(icon);
    let date = document.createElement('span');
    date.className = "limit-date";
    let inputDate = new Date(dateLimit.value);
    date.innerText = inputDate.toLocaleDateString();
    div.appendChild(date)
    let actualDate = new Date();
    inputDate.setDate(inputDate.getDate() + 1);
    if (inputDate < actualDate) {
        icon.classList.toggle("limit-date-exceed");
        date.classList.toggle("limit-date-exceed");
    }
    return div;
}

function createTrashIcon() {
    let span = document.createElement("span");
    span.className = "material-symbols-outlined trash";
    span.innerText = "delete";
    return span;
}

function Task(taskName, taskLimit, taskDone) {
    this.taskName = taskName;
    this.taskLimit = taskLimit;
    this.taskDone = taskDone;
    this.taskCreate = new Date();
    this.id = crypto.randomUUID();

    // this.getName = function () {
    //     return this.taskName;
    // };
    // this.getLimitDate = function () {
    //     return this.taskLimit;
    // };
    // this.isDone = function () {
    //     return this.taskDone
    // };
    // this.getCreationDate = function () {
    //     return this.taskCreate;
    // }
    // this.markAsDone = function () {
    //     this.taskDone = true;
    // }
    // this.markAsNotDone = function () {
    //     this.taskDone = false;
    // }
    // this.getID = function () {
    //     return this.id;
    // }
}