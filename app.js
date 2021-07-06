// Selectors
let form = document.querySelector('#task-form');
let taskInput = document.querySelector('#task');
let filterInput = document.querySelector('#filter');
let clearBtn = document.querySelector('.clear-tasks');
let taskList = document.querySelector('.collection');

// Load Event Listeners 
loadEventListeners();

function loadEventListeners() {
    //DOM Content Loader
    document.addEventListener('DOMContentLoaded', getTasks);

    //Add Tasks
    form.addEventListener('submit', addTask);

    //Clear Tasks
    clearBtn.addEventListener('click', clearTasks);

    //Delete Tasks
    taskList.addEventListener('click', deleteTasks);

    //Filter Tasks
    filterInput.addEventListener('keyup', filterTasks);
}

//getTasks Function
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task) => {
        //Create li
        let li = document.createElement('li');
        li.className = 'collection-item';

        //Append text value to li
        li.appendChild(document.createTextNode(task));

        //Create link element
        let link = document.createElement('a');
        link.innerHTML = '<i class="fas fa-trash-alt"></i>';
        link.className = 'delete-item secondary-content';

        //Append the link to li
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li);
    })
}

//Add Task Function
function addTask(e) {
    if (taskInput.value === '') {
        alert("Please add task!");
    }

    //Create li
    let li = document.createElement('li');
    li.className = 'collection-item';

    //Append text value to li
    li.appendChild(document.createTextNode(taskInput.value));

    //Create link element
    let link = document.createElement('a');
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    link.className = 'delete-item secondary-content';

    //Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //Add element to Local Storage
    addToLocalStorage(taskInput.value);

    //Clear Input
    taskInput.value = '';

    e.preventDefault();
}

//addToLocalStorage Function
function addToLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Delete Tasks Function
function deleteTasks(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm("Are you sure ?")) {
            e.target.parentElement.parentElement.remove();

            //Remove From LS
            deleteFromLS(e.target.parentElement.parentElement);
        }
    }
}

//Delete task from local storage function
function deleteFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((task, index) => {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

//Filter Tasks Function
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach((task) => {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })

}

//Clear Tasks Function
function clearTasks() {
    //taskList.innerHTML = '';

    //Faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    //Clear Task from LS
    clearFromLS();
}

//Clear Task from LS function
function clearFromLS() {
    localStorage.clear();
}