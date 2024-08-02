"use strict";
const todoList = document.getElementById('todo-list');
const todoInput = document.querySelector('input');
// initialize id to keep track of todo
let countId = 0;
let todos = JSON.parse(localStorage.getItem('todos') || '[]');
console.log(todos);
todoInput.addEventListener('keyup', (event) => {
    const inputValue = todoInput.value.trim();
    if (inputValue === '')
        return;
    if (event.key === 'Enter' || event.code === 'Enter') {
        const newTodo = {
            completed: false,
            id: crypto.randomUUID(),
            text: inputValue,
        };
        todos.push(newTodo);
        // save todo to localstorage
        saveTodo();
        renderContent(newTodo); // Render the newly added todo
        todoInput.value = '';
    }
});
window.addEventListener('DOMContentLoaded', () => {
    todos.forEach((todoContent) => {
        renderContent(todoContent);
    });
});
const saveTodo = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};
function renderContent(newTodo) {
    // Create a new html elements
    const deleteSymbol = document.createElement('button');
    const radio = document.createElement('input');
    const newLi = document.createElement('li');
    const pTagText = document.createElement('p');
    const pTagCompleted = document.createElement('p');
    const div = document.createElement('div');
    const borderDiv = document.createElement('div');
    radio.type = 'checkbox';
    radio.id = `${newTodo.id}`;
    radio.onchange = () => {
        newTodo.completed = radio.checked;
        saveTodo();
        // change color if newTodo is completed
        newTodo['completed'] ? pTagText.style.color = '#D1D2DA' : pTagText.style.color = '#494C6B';
    };
    pTagText.textContent = newTodo.text;
    deleteSymbol.id = newTodo['id'];
    deleteSymbol.textContent = 'X';
    // delete task
    deleteSymbol.addEventListener('click', () => {
        var _a, _b;
        (_b = (_a = deleteSymbol === null || deleteSymbol === void 0 ? void 0 : deleteSymbol.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.remove();
        saveTodo();
    });
    newLi.append(radio, pTagText, deleteSymbol);
    div.appendChild(newLi);
    div.appendChild(borderDiv);
    // Append the list item to the todo list
    todoList.prepend(div, pTagCompleted);
    // styles
    div.style.height = '24px';
    borderDiv.style.height = '1px';
    borderDiv.style.backgroundColor = '#E3E4F1';
    deleteSymbol.style.borderRadius = '9px';
    deleteSymbol.style.paddingInline = '3px';
}
