document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

addTaskButton.addEventListener('click', addTask);
clearTasksButton.addEventListener('click', clearTasks);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.textContent = taskText;
    li.addEventListener('click', toggleTask);
    li.addEventListener('dblclick', removeTask);
    taskList.appendChild(li);
    taskInput.value = '';

    saveTasks();
}

function toggleTask(event) {
    event.target.classList.toggle('completed');
    saveTasks();
}

function removeTask(event) {
    event.target.remove();
    saveTasks();
}

function clearTasks() {
    taskList.innerHTML = '';
    localStorage.removeItem('tasks');
}

function saveTasks() {
    const tasks = [];
    for (let li of taskList.children) {
        tasks.push({
            text: li.textContent,
            completed: li.classList.contains('completed')
        });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }
        li.addEventListener('click', toggleTask);
        li.addEventListener('dblclick', removeTask);
        taskList.appendChild(li);
    });
}
