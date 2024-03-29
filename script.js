const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const allTasksBtn = document.getElementById('allTasksBtn');
const completedTasksBtn = document.getElementById('completedTasksBtn');
const yetToBeDoneTasksBtn = document.getElementById('yetToBeDoneTasksBtn');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

// Load tasks from local storage
function loadTasks() {
    taskList.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToList(task.task, task.completed));
}

// Add task to the list
function addTaskToList(task, completed) {
    const li = document.createElement('li');
    li.dataset.completed = completed;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', function () {
        updateTaskStatus(li, task, this.checked);
    });
    li.appendChild(checkbox);

    const taskText = document.createElement('span');
    taskText.textContent = task;
    li.appendChild(taskText);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function () {
        deleteTask(task);
    });
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    if (completed) {
        li.classList.add('completed');
    }
}

// Add task
function addTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const lowerCaseTask = task.toLowerCase();
    const existingTaskIndex = tasks.findIndex(item => item.task.toLowerCase() === lowerCaseTask);
    if (existingTaskIndex === -1) {
        tasks.push({ task: task, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        addTaskToList(task, false);
    } else {
        alert("Task already exists!");
    }
}

// Update task status
function updateTaskStatus(li, task, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(item => {
        if (item.task === task) {
            item.completed = completed;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    li.dataset.completed = completed;
    if (completed) {
        li.classList.add('completed');
    } else {
        li.classList.remove('completed');
    }
}

// Delete task
function deleteTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = tasks.findIndex(item => item.task === task);
    if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }
}

// Form submission
taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const task = taskInput.value.trim();
    if (task) {
        addTask(task);
        taskInput.value = '';
    }
});

// Load tasks on page load
loadTasks();

// Filter buttons
allTasksBtn.addEventListener('click', function () {
    loadTasks();
});

completedTasksBtn.addEventListener('click', function () {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const completedTasks = tasks.filter(task => task.completed);
    taskList.innerHTML = '';
    completedTasks.forEach(task => addTaskToList(task.task, true));
});

yetToBeDoneTasksBtn.addEventListener('click', function () {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const yetToBeDoneTasks = tasks.filter(task => !task.completed);
    taskList.innerHTML = '';
    yetToBeDoneTasks.forEach(task => addTaskToList(task.task, false));
});


clearCompletedBtn.addEventListener('click', function () {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => !task.completed);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    loadTasks();
});
