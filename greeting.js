const welcomeContainer = document.querySelector('.js-welcome-container');
const welcomeForm = document.querySelector('.js-welcome-form');
const welcomeInput = document.querySelector('.js-welcome-input');

const clock = document.querySelector('.js-clock');
const greetingContainer= document.querySelector('.js-greeting-container');
const greetingTitle = document.querySelector('.js-greeting-title');

const SHOW_CLASS_NAME = 'show';
const HIDE_CLASS_NAME = 'hide';

function saveName(text) {
    localStorage.setItem(CURRENT_USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = welcomeInput.value;
    console.log(currentValue);

    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    welcomeContainer.classList.add(SHOW_CLASS_NAME);
    greetingContainer.classList.add(HIDE_CLASS_NAME);
    
    welcomeForm.addEventListener('submit', handleSubmit);
}

function paintGreeting(text) {
    welcomeContainer.classList.remove(SHOW_CLASS_NAME);
    welcomeContainer.classList.add(HIDE_CLASS_NAME);

    greetingContainer.classList.remove(HIDE_CLASS_NAME);
    greetingContainer.classList.add(SHOW_CLASS_NAME);

    greetingTitle.innerHTML = `Hello, ${text}`;

}

function loadName() {
    const currentUser = localStorage.getItem(CURRENT_USER_LS);

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