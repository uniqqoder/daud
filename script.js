document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    function loadTasks() {
        taskList.innerHTML = "";
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <button data-index="${index}" class="complete">✔</button>
                <button data-index="${index}" class="delete">❌</button>
            `;
            taskList.appendChild(li);
        });
    }

    function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    addTaskBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if(taskInput.value==""){
            alert("no task to add")
        }
        else{

        
        if (!taskText) return;
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ text: taskText, completed: false });
        saveTasks(tasks);
        loadTasks();
        taskInput.value = "";
        }
    });

    taskList.addEventListener("click", function (event) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const index = event.target.getAttribute("data-index");

        if (event.target.classList.contains("complete")) {
            tasks[index].completed = !tasks[index].completed;
        } else if (event.target.classList.contains("delete")) {
            tasks.splice(index, 1);
        }

        saveTasks(tasks);
        loadTasks();
    });

    loadTasks();
});