// create the form element
const form = document.createElement('form');
form.setAttribute('id', 'formLogin');
form.setAttribute('method', 'post');
form.setAttribute('name', 'myform');

// create the userPass div element
const userPass = document.createElement('div');
userPass.classList.add('userPass');

// create the username label element
const usernameLabel = document.createElement('label');
usernameLabel.setAttribute('for', 'username');
usernameLabel.setAttribute('id', 'username');

// create the username input element
const usernameInput = document.createElement('input');
usernameInput.setAttribute('type', 'text');
usernameInput.setAttribute('id', 'username1');
usernameInput.setAttribute('name', 'username');
usernameInput.setAttribute('value', '');
usernameInput.setAttribute('required', 'true');

// create the password label element
const passwordLabel = document.createElement('label');
passwordLabel.setAttribute('for', 'password');
passwordLabel.setAttribute('id', 'password');

// create the password input element
const passwordInput = document.createElement('input');
passwordInput.setAttribute('type', 'password');
passwordInput.setAttribute('id', 'password1');
passwordInput.setAttribute('name', 'password');
passwordInput.setAttribute('value', '');
passwordInput.setAttribute('required', 'true');

// append the username and password elements to the userPass div element
userPass.appendChild(usernameLabel);
userPass.appendChild(document.createElement('br'));
userPass.appendChild(usernameInput);
userPass.appendChild(document.createElement('br'));
userPass.appendChild(passwordLabel);
userPass.appendChild(document.createElement('br'));
userPass.appendChild(passwordInput);

// append the userPass div element to the form element
form.appendChild(userPass);

// create the modal-btns div element
const modalBtns = document.createElement('div');
modalBtns.classList.add('modal-btns');

// create the login button element
const loginBtn = document.createElement('button');
loginBtn.setAttribute('type', 'submit');
loginBtn.setAttribute('class', 'btn-login');
loginBtn.setAttribute('id', 'lBtn');

// append the login button element to the modal-btns div element
modalBtns.appendChild(loginBtn);

// append the modal-btns div element to the form element
form.appendChild(modalBtns);

document.body.appendChild(form);