```js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('new-todo');
  const list = document.getElementById('todo-list');

  // Load saved todos from localStorage
  const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  savedTodos.forEach(addTodoToDOM);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
      addTodoToDOM(text);
      saveTodo(text, false);
      input.value = '';
    }
  });

  function addTodoToDOM(text, completed = false) {
    const li = document.createElement('li');
    li.textContent = text;
    if (completed) li.classList.add('completed');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.title = 'Delete';
    deleteBtn.addEventListener('click', () => {
      li.remove();
      removeTodoFromStorage(text);
    });

    li.addEventListener('click', (e) => {
      // Prevent toggle when clicking delete button
      if (e.target === deleteBtn) return;
      li.classList.toggle('completed');
      updateTodoInStorage(text, li.classList.contains('completed'));
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
  }

  function saveTodo(text, completed) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push({ text, completed });
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function updateTodoInStorage(text, completed) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todo = todos.find(t => t.text === text);
    if (todo) todo.completed = completed;
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function removeTodoFromStorage(text) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(t => t.text !== text);
    localStorage.setItem('todos', JSON.stringify(todos));
  }
});
```