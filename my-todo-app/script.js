```js
// ---------- Helper Functions ----------
const STORAGE_KEY = 'my-todo-items';

// Load todos from localStorage (or start with empty array)
function loadTodos() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

// Save current todos array to localStorage
function saveTodos(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// Render the whole list based on the current state
function renderTodos() {
    const listEl = document.getElementById('todo-list');
    listEl.innerHTML = ''; // clear previous UI

    todos.forEach((todo, idx) => {
        const li = document.createElement('li');
        li.className = 'todo-item';

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleComplete(idx));

        // Text
        const span = document.createElement('span');
        span.className = 'todo-text';
        if (todo.completed) span.classList.add('completed');
        span.textContent = todo.text;

        // Action buttons (delete)
        const actions = document.createElement('div');
        actions.className = 'todo-actions';
        const delBtn = document.createElement('button');
        delBtn.innerHTML = '✖';
        delBtn.title = 'Delete';
        delBtn.addEventListener('click', () => deleteTodo(idx));
        actions.appendChild(delBtn);

        // Assemble item
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(actions);
        listEl.appendChild(li);
    });
}

// ---------- Core Logic ----------
let todos = loadTodos(); // initial load

function addTodo(text) {
    todos.push({ text, completed: false });
    saveTodos(todos);
    renderTodos();
}

function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos(todos);
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos(todos);
    renderTodos();
}

function clearCompleted() {
    todos = todos.filter(t => !t.completed);
    saveTodos(todos);
    renderTodos();
}

// ---------- Event Listeners ----------
document.getElementById('todo-form').addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('new-todo');
    const text = input.value.trim();
    if (text) {
        addTodo(text);
        input.value = '';
        input.focus();
    }
});

document.getElementById('clear-completed').addEventListener('click', clearCompleted);

// Initial render
renderTodos();
```

Feel free to copy the three files into a folder named **my-todo-app** and open `index.html` in a browser. The app lets you add tasks, mark them as completed, delete individual items, and clear all completed tasks. All data persists via `localStorage`. Enjoy!