var input = document.getElementById("add-task-input");
var addLimitBtn = document.getElementById("add-limit-btn")
var addLimitContainer = document.getElementById("task-input-date")
var addTaskBtn = document.getElementById("add-task-btn")
var toDoContainer = document.getElementById("to-do-container");
var doneContainer = document.getElementById("done-container");
var limitDateInput = document.getElementById("limit-date-input");
var calendarCustomBtn = document.getElementById("calendar-month-icon");

addTaskBtn.addEventListener('click', addTask);

calendarCustomBtn.addEventListener('click', function () {
    var event = new KeyboardEvent('keydown', { key: ' ' });
    limitDateInput.dispatchEvent(event);
});

addLimitBtn.addEventListener('click', function () {
    addLimitContainer.classList.toggle("hidden");
});

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
        mark.addEventListener('click', markAsDone);
        let unmark = createMarkAsToDoIcon()
        taskDiv.appendChild(unmark);
        unmark.addEventListener('click', markAsNotDone);
        taskDiv.appendChild(createTaskName(input.value));
        if (limitDateInput.value.length > 0) {
            let limit = createLimitDate(limitDateInput.value)
            taskDiv.appendChild(limit);
        }
        let erase = createTrashIcon();
        taskDiv.appendChild(erase);
        erase.addEventListener('click', deleteTask);

        let task = new Task(input.value, limitDateInput.value, false);
        input.value = '';
        limitDateInput.value = '';
        localStorage.setItem(task.id, JSON.stringify(task));
        taskDiv.id = task.id;
        toDoContainer.appendChild(taskDiv)
        if (!addLimitContainer.classList.contains("hidden")) {
            addLimitContainer.classList.toggle("hidden");
        }
    }
}

function markAsDone() {
    this.classList.toggle("hidden");
    doneContainer.appendChild(this.parentNode);
    this.parentNode.children[1].classList.toggle("hidden");
    let taskId = this.parentNode.id;
    let taskString = localStorage.getItem(taskId);
    let taskObj = JSON.parse(taskString);
    taskObj.taskDone = true;
    localStorage.setItem(taskId, JSON.stringify(taskObj));
}

function markAsNotDone() {
    this.classList.toggle("hidden");
    toDoContainer.appendChild(this.parentNode);
    this.parentNode.children[0].classList.toggle("hidden");
    let taskId = this.parentNode.id;
    let taskString = localStorage.getItem(taskId);
    let taskObj = JSON.parse(taskString);
    taskObj.taskDone = false;
    localStorage.setItem(taskId, JSON.stringify(taskObj));
}

function deleteTask() {
    this.parentNode.remove();
    let taskId = this.parentNode.id;
    localStorage.removeItem(taskId);
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
    let inputDate = new Date(dateLimit);
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

function recoverTaskFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        let taskObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
        let taskHTML = createRecoveredTaskFromLocalStorage(taskObj);
        if (taskObj.taskDone) {
            doneContainer.appendChild(taskHTML);
        } else {
            toDoContainer.appendChild(taskHTML);
        }
    }
}

function createRecoveredTaskFromLocalStorage(taskObj) {
    let div = document.createElement('div');
    div.className = "task";
    div.id = taskObj.id;
    let mark = createMarkAsDoneIcon()
    div.appendChild(mark);
    mark.addEventListener('click', markAsDone);
    let unmark = createMarkAsToDoIcon()
    div.appendChild(unmark);
    unmark.addEventListener('click', markAsNotDone);
    if (taskObj.taskDone != false) {
        mark.classList.toggle("hidden");
        unmark.classList.toggle("hidden");
    }
    div.appendChild(createTaskName(taskObj.taskName));
    if (taskObj.taskLimit != '') {
        let limit = createLimitDate(taskObj.taskLimit)
        div.appendChild(limit);
    }
    let erase = createTrashIcon();
    div.appendChild(erase);
    erase.addEventListener('click', deleteTask);
    return div;
}