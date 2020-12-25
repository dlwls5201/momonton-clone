const form = document.querySelector('.js-form');
const input = form.querySelector('input');
const greeting = document.querySelector('.js-greeting');

const CURRENT_USER = 'current_user';
const SHOW_CLASS_NAME = 'showing';

function saveName(text) {
    localStorage.setItem(CURRENT_USER, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOW_CLASS_NAME);
    form.addEventListener('submit', handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOW_CLASS_NAME)
    greeting.classList.add(SHOW_CLASS_NAME);
    greeting.innerHTML = `Hello ${text}`;

}

function loadName() {
    const currentUser = localStorage.getItem(CURRENT_USER);
    console.log(`currentUser : ${currentUser}`);

    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName() 
}

init();