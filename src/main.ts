

const todoList = document.getElementById('todo-list') as HTMLUListElement;
const todoInput = document.querySelector('input') as HTMLInputElement;


interface Todo {
  text: string,
  completed: boolean,
  id: string
}
// initialize id to keep track of todo
let countId = 0;

let todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]')
console.log(todos)

todoInput.addEventListener('keyup', (event) => {
  const inputValue = todoInput.value.trim();

  if (inputValue === '') return;

  if (event.key === 'Enter' || event.code === 'Enter') {
    const newTodo: Todo = {
      completed: false,
      id: crypto.randomUUID(),
      text: inputValue,

    };

    todos.push(newTodo);

    // save todo to localstorage
    saveTodo()
    renderContent(newTodo); // Render the newly added todo

    todoInput.value = '';
  }

})


window.addEventListener('DOMContentLoaded', () => {
  todos.forEach((todoContent) => {
    renderContent(todoContent)
  })
})

const saveTodo = () => {
  localStorage.setItem('todos', JSON.stringify(todos))
}

function renderContent(newTodo: Todo) {
  // Create a new html elements
  const deleteSymbol = document.createElement('button') as HTMLButtonElement;
  const radio = document.createElement('input') as HTMLInputElement;
  const newLi = document.createElement('li') as HTMLLIElement;
  const pTagText = document.createElement('p') as HTMLElement;
  const pTagCompleted = document.createElement('p') as HTMLElement;
  const div = document.createElement('div') as HTMLDivElement;
  const borderDiv = document.createElement('div') as HTMLDivElement;

  radio.type = 'checkbox';
  radio.id = `${newTodo.id}`;
  radio.onchange = () => {
    newTodo.completed = radio.checked
    saveTodo()

    // change color if newTodo is completed
    newTodo['completed'] ? pTagText.style.color = '#D1D2DA' : pTagText.style.color = '#494C6B'
  }

  pTagText.textContent = newTodo.text;
  deleteSymbol.id = newTodo['id']
  deleteSymbol.textContent = 'X'

  // delete task
  deleteSymbol.addEventListener('click', () => {
    deleteSymbol?.parentElement?.parentElement?.remove()
    saveTodo()
  });


  newLi.append(radio, pTagText, deleteSymbol);
  div.appendChild(newLi)
  div.appendChild(borderDiv)

  // Append the list item to the todo list
  todoList.prepend(div, pTagCompleted);

  // styles
  div.style.height = '24px'
  borderDiv.style.height = '1px'
  borderDiv.style.backgroundColor = '#E3E4F1'
  deleteSymbol.style.borderRadius = '9px'
  deleteSymbol.style.paddingInline = '3px'
}







