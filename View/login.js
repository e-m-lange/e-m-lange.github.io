const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent the form from submitting

    // get the username and password values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // check if the username and password are correct
    if (username === 'user' && password === 'password') {
        alert('Login successful!');
    } else {
        alert('Incorrect username or password.');
    }
});