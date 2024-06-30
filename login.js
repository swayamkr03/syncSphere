document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simulate login validation
        if (username === 'admin' && password === 'password') {
            // Store login state
            localStorage.setItem('loggedIn', 'true');
            // Redirect to the main page
            window.location.href = 'index.html';
        } else {
            errorMessage.textContent = 'Invalid username or password';
        }
    });
});