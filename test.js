// Check if user is logged in
if (localStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'login.html';
}

// Existing code to handle video conferencing button click
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

document.addEventListener('DOMContentLoaded', function () {
    var userMenuButton = document.getElementById('user-menu-button');
    var userMenu = document.getElementById('user-menu');

    userMenuButton.addEventListener('click', function () {
        userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Close the menu if clicked outside
    document.addEventListener('click', function (event) {
        if (!userMenu.contains(event.target) && event.target !== userMenuButton) {
            userMenu.style.display = 'none';
        }
    });
});