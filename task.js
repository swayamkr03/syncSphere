document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');
    const completionPercentage = document.getElementById('completion-percentage');
    const ctx = document.getElementById('pie-chart').getContext('2d');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Completed', 'Not Completed'],
            datasets: [{
                data: [0, 1],
                backgroundColor: ['#28a745', '#dc3545']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    function updateChart() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        const notCompletedTasks = totalTasks - completedTasks;
        chart.data.datasets[0].data = [completedTasks, notCompletedTasks];
        chart.update();
        updateCompletionPercentage(completedTasks, totalTasks);
    }

    function updateCompletionPercentage(completed, total) {
        const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
        completionPercentage.textContent = ${percentage}% of tasks completed;
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        tasks.forEach(task => {
            addTaskToDOM(task);
        });
        updateChart();
    }

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            if (task.completed) {
                li.classList.add('completed');
            } else {
                li.classList.remove('completed');
            }
            saveTasks();
            updateChart();
        });
        li.appendChild(checkbox);

        const taskTextSpan = document.createElement('span');
        taskTextSpan.className = 'task-text';
        taskTextSpan.textContent = task.text;
        li.appendChild(taskTextSpan);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li);
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            updateChart();
        });
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    }

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(task);
        addTaskToDOM(task);
        saveTasks();
        updateChart();
        taskInput.value = '';
    });

    loadTasks();
});