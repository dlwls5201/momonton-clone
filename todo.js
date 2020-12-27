const toDoForm = document.querySelector('.js-todo-form');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('.js-todo-list');

const toDos = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    const index = toDos.findIndex(function(item) { return item.id == li.id });
    toDos.splice(index, 1);
    
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const span = document.createElement("span");
    span.className = "todo-item-title";
    span.innerText = text;

    const delBtn = document.createElement("button");
    delBtn.className = "todo-item-btn";
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo);

    const li = document.createElement("li");
    li.className = "todo-item-container"

    const newId = toDos.length + 1;

    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;

    toDoList.appendChild(li);

    const toDoObj = {
        id: newId,
        text: text
    }

    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = '';
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const paresedToDos = JSON.parse(loadedToDos);
        paresedToDos.forEach(function(todo) {
            paintToDo(todo.text);
        });
    } 
}

function init() {
    loadToDos();
    toDoForm.addEventListener('submit', handleSubmit);
}

init();