// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add new task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTaskToList(taskText);
        saveTask(taskText);
        taskInput.value = ''; // clear input
    }
});

// Add task to UI
function addTaskToList(taskText, isCompleted = false) {
    const li = document.createElement('li');

    // Create a span for the task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    if (isCompleted) {
        taskSpan.classList.add('completed');
    }

    // Create a div to hold the buttons
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');

    // Complete Button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.classList.add('complete-btn');
    completeBtn.addEventListener('click', () => {
        taskSpan.classList.toggle('completed');
        toggleTaskCompletion(taskText);
    });

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        li.remove();
        removeTask(taskText);
    });

    // Append task span and buttons to the li
    buttonsDiv.appendChild(completeBtn);
    buttonsDiv.appendChild(deleteBtn);
    li.appendChild(taskSpan);
    li.appendChild(buttonsDiv);

    taskList.appendChild(li);
}

// Local Storage Functions
function saveTask(taskText) {
    let tasks = getTasksFromStorage();
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(taskText) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleTaskCompletion(taskText) {
    let tasks = getTasksFromStorage();
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}

function loadTasks() {
    let tasks = getTasksFromStorage();
    tasks.forEach(task => addTaskToList(task.text, task.completed));
}
