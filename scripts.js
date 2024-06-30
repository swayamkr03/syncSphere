document.addEventListener('DOMContentLoaded', function () {
    // Redirect to login if not logged in
    if (localStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'login.html';
    }

    // User Menu Toggle
    var userMenuButton = document.getElementById('user-menu-button');
    var userMenu = document.getElementById('user-menu');

    userMenuButton.addEventListener('click', function () {
        userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function (event) {
        if (!userMenu.contains(event.target) && event.target !== userMenuButton) {
            userMenu.style.display = 'none';
        }
    });

    // Task Management Section Toggle
    document.getElementById('task-management-button').addEventListener('click', function() {
        var taskManagementSection = document.getElementById('task-management');
        taskManagementSection.style.display = 'block';
    });

    // Add Task
    document.getElementById('add-task').addEventListener('click', function() {
        var taskInput = document.getElementById('task-input');
        var taskList = document.getElementById('task-list');
        var taskText = taskInput.value.trim();

        if (taskText !== '') {
            var listItem = document.createElement('li');
            
            // Create checkbox for task
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';
            checkbox.addEventListener('change', function() {
                listItem.classList.toggle('completed');
                updatePieChart();
            });

            var taskTextSpan = document.createElement('span');
            taskTextSpan.className = 'task-text';
            taskTextSpan.textContent = taskText;

            var deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'Delete';

            listItem.appendChild(checkbox);
            listItem.appendChild(taskTextSpan);
            listItem.appendChild(deleteButton);
            taskList.appendChild(listItem);

            deleteButton.addEventListener('click', function() {
                taskList.removeChild(listItem);
                updatePieChart();
            });

            taskInput.value = '';
            updatePieChart();
        }
    });

    // Pie Chart Setup
    var ctx = document.getElementById('pie-chart').getContext('2d');
    var pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Completed', 'Incomplete'],
            datasets: [{
                data: [0, 0],
                backgroundColor: ['#4caf50', '#f44336']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Update Pie Chart
    function updatePieChart() {
        var taskItems = document.querySelectorAll('#task-list li');
        var completedTasks = document.querySelectorAll('#task-list li.completed').length;
        var incompleteTasks = taskItems.length - completedTasks;
        var completionPercentage = (taskItems.length > 0) ? (completedTasks / taskItems.length) * 100 : 0;

        pieChart.data.datasets[0].data = [completedTasks, incompleteTasks];
        pieChart.update();

        document.getElementById('completion-percentage').textContent = 'Completion: ' + completionPercentage.toFixed(2) + '%';
    }

    // Video Conferencing Section
    document.getElementById('video-conferencing-button').addEventListener('click', function() {
        var videoConferencingSection = document.getElementById('video-conferencing');
        var roomCode = generateRoomCode();
        var roomCodeDiv = document.getElementById('room-code');
        var jitsiIframe = document.getElementById('jitsi-iframe');

        // Display the room code
        roomCodeDiv.innerHTML = 'Room Code: ' + roomCode;

        // Set the Jitsi Meet URL with the room code
        jitsiIframe.src = 'https://meet.jit.si/' + roomCode;

        // Show the video conferencing section
        videoConferencingSection.style.display = 'block';
    });

    // Version Control Redirection
    document.getElementById('version-control-button').addEventListener('click', function() {
        window.location.href = 'https://github.com';
    });

        // Function to generate a random room code
        function generateRoomCode() {
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var roomCode = '';
            for (var i = 0; i < 8; i++) {
                var randomIndex = Math.floor(Math.random() * characters.length);
                roomCode += characters[randomIndex];
            }
            return roomCode;
        }
    });