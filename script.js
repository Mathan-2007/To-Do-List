// script.js

let taskListData = [];

document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTask(task.text, task.priority, task.completed, task.dueDate, task.category);
    });
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(taskListData));
}

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    let prioritySelect = document.getElementById("prioritySelect");
    let priority = prioritySelect.value;
    let categorySelect = document.getElementById("categorySelect");
    let category = categorySelect.value;
    let dueDate = document.getElementById("dueDate").value;

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    let newTask = {
        text: taskText,
        priority: priority,
        completed: false,
        dueDate: dueDate,
        category: category
    };

    taskListData.push(newTask);
    createTask(taskText, priority, false, dueDate, category);
    saveTasks();

    taskInput.value = "";
    document.getElementById("dueDate").value = "";
}

function createTask(text, priority, completed, dueDate, category) {
    let taskList = document.getElementById("taskList");

    let taskItem = document.createElement("li");
    taskItem.classList.add(priority, category);
    if (completed) taskItem.classList.add("completed");

    taskItem.setAttribute('draggable', 'true');
    taskItem.setAttribute('ondragstart', 'drag(event)');

    let taskTextNode = document.createTextNode(`${text} - Due: ${dueDate}`);
    taskItem.appendChild(taskTextNode);

    let completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.onclick = function() {
        taskItem.classList.toggle("completed");
        saveTasks();
    };

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.onclick = function() {
        taskItem.remove();
        taskListData = taskListData.filter(task => task.text !== text);
        saveTasks();
    };

    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
}

function searchTasks() {
    let searchText = document.getElementById("searchInput").value.toLowerCase();
    let tasks = document.querySelectorAll("li");

    tasks.forEach(task => {
        let taskText = task.textContent.toLowerCase();
        if (taskText.includes(searchText)) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
}

function clearCompleted() {
    let tasks = document.querySelectorAll('li.completed');
    tasks.forEach(task => task.remove());
    taskListData = taskListData.filter(task => !task.completed);
    saveTasks();
}

// Drag-and-Drop Functionality
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.innerText);
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    let draggedTask = document.querySelector(`[draggable="true"][data-text="${data}"]`);
    event.target.appendChild(draggedTask);
}
